from catboost import CatBoostRegressor, Pool
import hydra
import os
import pandas as pd

def prepare_data(data):
    data = data.dropna()
    data = data.drop_duplicates()
    data = data.reset_index(drop=True)
    y = data[['y_10_up', 'y_10_down', 'y_60_up', 'y_60_down']].copy()
    X = data.drop(columns=['y_10_up', 'y_10_down', 'y_60_up', 'y_60_down', 'Symbol',
                           'DateTime', 'Open', 'High', 'Low', 'Average', 'Month', 'Day'])
    return X, y


@hydra.main(config_path="conf", config_name="config")
def main(cfg) -> None:
    # Prepare the data
    os.chdir(hydra.utils.get_original_cwd())
    file_path = os.path.join(cfg.paths.train_data, cfg.files.file_name)
    X_train, y_train = prepare_data(pd.read_parquet(file_path))
    X_test, y_test = prepare_data(pd.read_parquet(file_path))
    cat_features = ['Hour', 'Minute', 'Day_of_week']

    # Initialize CatBoostRegressor
    for target in ['y_10_up', 'y_10_down', 'y_60_up', 'y_60_down']:
        model = CatBoostRegressor(loss_function=cfg.params.loss_function, n_estimators=cfg.params.n_estimators,
                              learning_rate=cfg.params.learning_rate,
                              depth=cfg.params.depth,
                              l2_leaf_reg=cfg.params.l2_leaf_reg)

        train_pool = Pool(X_train, label=y_train[target], cat_features=cat_features)
        test_pool = Pool(X_test, label=y_test[target], cat_features=cat_features)

        # Fit model
        model.fit(train_pool, eval_set=test_pool)
        model_path = os.path.join(cfg.paths.model, f'catboost_{target}')
        model.save_model(model_path, format="cbm")


if __name__ == "__main__":
    main()
