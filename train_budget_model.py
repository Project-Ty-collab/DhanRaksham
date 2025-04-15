import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.multioutput import MultiOutputRegressor
from sklearn.ensemble import RandomForestRegressor
from sklearn.pipeline import Pipeline
from sklearn.metrics import mean_squared_error, r2_score
import joblib
import numpy as np

df = pd.read_csv("data.csv")

target_columns = ['Groceries', 'Transport', 'Eating_Out', 'Entertainment', 
                  'Utilities', 'Healthcare', 'Education', 'Miscellaneous']

feature_columns = ['Income', 'Age', 'Dependents', 'Occupation', 'City_Tier', 
                  'Rent', 'Loan_Repayment', 'Insurance']

X = df[feature_columns]
y = df[target_columns]

X['Age'] = X['Age'].astype('int64')
X['Dependents'] = X['Dependents'].astype('int64')
X['Income'] = X['Income'].astype('float64')
X['Rent'] = X['Rent'].astype('float64')
X['Loan_Repayment'] = X['Loan_Repayment'].astype('float64')
X['Insurance'] = X['Insurance'].astype('float64')

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

categorical_features = ['Occupation', 'City_Tier']
numerical_features = [col for col in X.columns if col not in categorical_features]

preprocessor = ColumnTransformer([
    ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features),
    ('num', StandardScaler(), numerical_features)
])

pipeline = Pipeline([
    ('preprocessor', preprocessor),
    ('regressor', MultiOutputRegressor(RandomForestRegressor(n_estimators=50, max_depth=10, random_state=42)))
])

print("Training the model...")
pipeline.fit(X_train, y_train)

y_pred = pipeline.predict(X_test)
mse = mean_squared_error(y_test, y_pred, multioutput='raw_values')
rmse = np.sqrt(mse)
r2 = r2_score(y_test, y_pred, multioutput='raw_values')

def calculate_mape(y_true, y_pred):
    return np.mean(np.abs((y_true - y_pred) / y_true)) * 100

print("\n" + "="*50)
print("MODEL EVALUATION METRICS")
print("="*50)
print("\nDetailed Performance by Category:")
print("-"*50)
print(f"{'Category':<15} {'RMSE':>10} {'MSE':>15} {'R²':>10} {'MAPE %':>10}")
print("-"*50)

for i, cat in enumerate(y.columns):
    mape = calculate_mape(y_test[cat].values, y_pred[:, i])
    print(f"{cat:<15} {rmse[i]:>10.2f} {mse[i]:>15.2f} {r2[i]:>10.3f} {mape:>10.2f}")

print("-"*50)

avg_rmse = np.mean(rmse)
avg_mse = np.mean(mse)
avg_r2 = np.mean(r2)
avg_mape = np.mean([calculate_mape(y_test[cat].values, y_pred[:, i]) for i, cat in enumerate(y.columns)])

print("\nOverall Model Performance:")
print("-"*50)
print(f"Average RMSE: {avg_rmse:.2f}")
print(f"Average MSE:  {avg_mse:.2f}")
print(f"Average R²:   {avg_r2:.3f}")
print(f"Average MAPE: {avg_mape:.2f}%")
print("-"*50)

model_info = {
    'pipeline': pipeline,
    'feature_columns': feature_columns,
    'target_columns': target_columns,
    'metrics': {
        'rmse': rmse.tolist(),
        'mse': mse.tolist(),
        'r2': r2.tolist(),
        'avg_rmse': avg_rmse,
        'avg_mse': avg_mse,
        'avg_r2': avg_r2,
        'avg_mape': avg_mape
    }
}

print("\nSaving the model...")
joblib.dump(model_info, 'budget_optimizer_rf.joblib')
print("Model saved successfully as 'budget_optimizer_rf.joblib'")