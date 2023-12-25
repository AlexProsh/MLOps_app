import os
import subprocess

import hydra
import mlflow
import pandas as pd
from catboost import CatBoostRegressor, Pool, metrics


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
    file_path = os.path.join(cfg.paths.train_data, cfg.files.file_name)
    X_train, y_train = prepare_data(pd.read_parquet(file_path))
    X_test, y_test = prepare_data(pd.read_parquet(file_path))
    cat_features = ["Hour", "Minute", "Day_of_week"]

    params = {
        "loss_function": cfg.params.loss_function,
        "n_estimators": cfg.params.n_estimators,
        "learning_rate": cfg.params.learning_rate,
        "depth": cfg.params.depth,
        "l2_leaf_reg": cfg.params.l2_leaf_reg,
    }

    # Log the hyperparameters
    mlflow.log_params(params)

    # Initialize CatBoostRegressor
    for target in ["y_10_up", "y_10_down", "y_60_up", "y_60_down"]:
        model = CatBoostRegressor(
            iterations=100,
            loss_function=cfg.params.loss_function,
            # n_estimators=cfg.params.n_estimators,
            learning_rate=cfg.params.learning_rate,
            depth=cfg.params.depth,
            l2_leaf_reg=cfg.params.l2_leaf_reg,
        )

        train_pool = Pool(X_train, label=y_train[target], cat_features=cat_features)
        test_pool = Pool(X_test, label=y_test[target], cat_features=cat_features)

        # Fit model
        model.fit(
            train_pool,
            eval_set=test_pool,
        )
        model_path = os.path.join(cfg.paths.model, f"catboost_{target}")
        model.save_model(model_path, format="cbm")

        train_pred = model.predict(train_pool)
        val_pred = model.predict(test_pool)

        train_RMSE = metrics.RMSE().eval(y_train[target], train_pred)[0]
        val_RMSE = metrics.RMSE().eval(y_test[target], val_pred)[0]

        mlflow.log_metric(f"RMSE_train_{target}", train_RMSE)
        mlflow.log_metric(f"RMSE_val_{target}", val_RMSE)


if __name__ == "__main__":
    subprocess.call(["dvc", "pull"])
    mlflow.set_tracking_uri(uri="http://128.0.1.1:8080")
    with mlflow.start_run():
        main()
    mlflow.end_run()
    subprocess.call(["dvc", "commit"])
    subprocess.call(["dvc", "push"])
