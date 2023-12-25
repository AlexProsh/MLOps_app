import os

import pandas as pd
from ta.momentum import RSIIndicator, WilliamsRIndicator, pvo_signal
from ta.trend import MACD
from ta.volatility import BollingerBands
from tqdm import tqdm


def rolling_count(df, minutes, direction, cap=0.005):
    if direction == "up":
        df[f"y_{minutes}_{direction}"] = (
            df["Close"]
            .rolling(minutes * 60)
            .apply(
                lambda x: ((x / df["Average"].shift(minutes * 60)) - 1 > cap).sum() / (minutes * 60)
            )
            .shift(-minutes * 60)
        )
    else:
        df[f"y_{minutes}_{direction}"] = (
            df["Close"]
            .rolling(minutes * 60)
            .apply(
                lambda x: ((x / df["Average"].shift(minutes * 60)) - 1 < -cap).sum()
                / (minutes * 60)
            )
            .shift(-minutes * 60)
        )
    return df


def make_features(ds):
    ds.DateTime = pd.to_datetime(ds.DateTime)
    ds.sort_values("DateTime", inplace=True)
    # Add time features
    ds["Month"] = ds.DateTime.dt.month
    ds["Day"] = ds.DateTime.dt.day
    ds["Day_of_week"] = ds.DateTime.dt.day_of_week
    ds["Hour"] = ds.DateTime.dt.hour
    ds["Minute"] = ds.DateTime.dt.minute
    # Add Bollinger Bands features
    indicator_bb = BollingerBands(close=ds["Close"], window=3600, window_dev=2)
    # Add Width Size Bollinger Bands
    ds["bb_bbw"] = indicator_bb.bollinger_wband()
    # Add Percentage Bollinger Bands
    ds["bb_bbp"] = indicator_bb.bollinger_pband()
    # Add MACD features
    indicator_macd = MACD(close=ds["Close"], window_slow=3600, window_fast=1800, window_sign=600)
    # Add MACD divergence
    ds["macd_diverg"] = indicator_macd.macd_diff()
    # Add RSI indicator
    indicator_rsi = RSIIndicator(close=ds["Close"], window=3600)
    # Add RSI features
    ds["rsi"] = indicator_rsi.rsi()
    # Add Williams %R indicator
    indicator_wr = WilliamsRIndicator(high=ds["High"], low=ds["Low"], close=ds["Close"], lbp=3600)
    # Add Williams %R features
    ds["wr"] = indicator_wr.williams_r()
    # Add Percentage Volume Oscillator
    ds["pvo"] = pvo_signal(volume=ds["Volume"], window_slow=3600, window_fast=1800, window_sign=600)
    # Add price change
    ds["cl_t_open"] = ds["Close"] / ds["Open"] - 1
    ds["cl_t_high"] = ds["Close"] / ds["High"] - 1
    ds["cl_t_low"] = ds["Close"] / ds["Low"] - 1
    ds["hi_t_low"] = ds["High"] / ds["Low"] - 1

    # Drop NaN
    ds.dropna(inplace=True)
    return ds


def main(mode):
    for directory in tqdm(os.listdir(f"../data/raw/{mode}")):
        dataset = None
        start = True
        path_dir = os.path.join(f"../data/raw/{mode}", directory)
        for file in tqdm(os.listdir(path_dir)):
            filepath = os.path.join(path_dir, file)
            print(filepath)
            ds = pd.read_csv(filepath)
            ds["Symbol"] = directory
            ds.DateTime = pd.to_datetime(ds.DateTime)
            # Sort by time
            ds.sort_values("DateTime", inplace=True)
            # Add target (percentage of time when close price
            # above current average price by 0.5% for next 10 minutes)
            rolling_count(ds, 10, "up")
            # Add target (percentage of time when close price
            # below current average price by 0.5% for next 10 minute)
            rolling_count(ds, 10, "down")
            # Add target (percentage of time when close price
            # above current average price by 1% for next 60 minutes)
            rolling_count(ds, 60, "up", cap=0.01)
            # Add target (percentage of time when close price
            # below current average price by 1% for next 60 minute)
            rolling_count(ds, 60, "down", cap=0.01)
            if start:
                dataset = ds
                start = False
            else:
                dataset = pd.concat([dataset, ds], axis=0, ignore_index=True)
        dataset = make_features(dataset)
        dataset.to_parquet(f"../data/prepared/{mode}/{directory}.parquet")


if __name__ == "__main__":
    #main("train")
    #main("val")
    main("infer")
