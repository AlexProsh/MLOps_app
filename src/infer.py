import os

import hydra
import pandas as pd
from catboost import CatBoostRegressor, Pool


def prepare_data(data):
    data = data.dropna()
    data = data.drop_duplicates()
    data = data.reset_index(drop=True)
    y = data[["y_10_up", "y_10_down", "y_60_up", "y_60_down"]].copy()
    X = data.drop(
        columns=[
            "y_10_up",
            "y_10_down",
            "y_60_up",
            "y_60_down",
            "Symbol",
            "DateTime",
            "Open",
            "High",
            "Low",
            "Average",
            "Month",
            "Day",
        ]
    )
    return X, y


@hydra.main(config_path="conf", config_name="config")
def main(cfg) -> None:
    # Prepare the data
    os.chdir(hydra.utils.get_original_cwd())
    file_path = os.path.join(cfg.paths.infer_data, cfg.files.file_name)
    X_infer, y_infer = prepare_data(pd.read_parquet(file_path))
    cat_features = ["Hour", "Minute", "Day_of_week"]

    # Initialize CatBoostRegressor
    for target in ["y_10_up", "y_10_down", "y_60_up", "y_60_down"]:
        model = CatBoostRegressor()
        model_path = os.path.join(cfg.paths.model, f"catboost_{target}")
        model.load_model(model_path)

        infer_pool = Pool(X_infer, cat_features=cat_features)

        # predict
        pred = model.predict(infer_pool)
        pred_path = os.path.join(cfg.paths.infer_data, f'predict_{target}.csv')
        pd.DataFrame(pred).to_csv(pred_path)


if __name__ == "__main__":
    main()
