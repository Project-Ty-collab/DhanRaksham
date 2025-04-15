import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import GradientBoostingRegressor
from scipy.optimize import minimize
from sklearn.metrics import r2_score, mean_absolute_error, mean_squared_error
import joblib

def load_data():
    df = pd.read_csv("data.csv")
    
    expense_columns = ['Groceries', 'Transport', 'Eating_Out', 'Entertainment', 
                      'Utilities', 'Healthcare', 'Education', 'Miscellaneous']
    
    df['Total_Expenses'] = df[expense_columns].sum(axis=1)
    df['Expense_Ratio'] = df['Total_Expenses'] / df['Income']
    
    return df

def prepare_features(df):
    feature_columns = ['Income', 'Age', 'Dependents', 'Occupation', 'City_Tier', 
                      'Expense_Ratio', 'Desired_Savings_Percentage']
    
    target_columns = ['Potential_Savings_Groceries', 'Potential_Savings_Transport',
                     'Potential_Savings_Eating_Out', 'Potential_Savings_Entertainment',
                     'Potential_Savings_Utilities', 'Potential_Savings_Healthcare',
                     'Potential_Savings_Education', 'Potential_Savings_Miscellaneous']
    
    X = df[feature_columns]
    y = df[target_columns]
    
    return X, y

def build_preprocessor():
    numeric_features = ['Income', 'Age', 'Dependents', 'Expense_Ratio', 
                       'Desired_Savings_Percentage']
    categorical_features = ['Occupation', 'City_Tier']
    
    numeric_transformer = StandardScaler()
    categorical_transformer = OneHotEncoder(drop='first', sparse_output=False)
    
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', numeric_transformer, numeric_features),
            ('cat', categorical_transformer, categorical_features)
        ])
    
    return preprocessor

def train_models(X, y):
    preprocessor = build_preprocessor()
    models = {}
    
    for column in y.columns:
        pipeline = Pipeline([
            ('preprocessor', preprocessor),
            ('regressor', GradientBoostingRegressor(
                n_estimators=100,
                learning_rate=0.1,
                max_depth=4,
                random_state=42
            ))
        ])
        
        pipeline.fit(X, y[column])
        models[column] = pipeline
    
    return models

def optimize_budget(models, user_data, min_expenses, income):
    def objective(x):
        total_savings = sum(x)
        return -total_savings
    
    def constraints(x):
        return [
            income - sum(x),
            x[0] - min_expenses['Groceries'],
            x[1] - min_expenses['Transport'],
            x[2] - min_expenses['Eating_Out'],
            x[3] - min_expenses['Entertainment'],
            x[4] - min_expenses['Utilities'],
            x[5] - min_expenses['Healthcare'],
            x[6] - min_expenses['Education'],
            x[7] - min_expenses['Miscellaneous']
        ]
    
    x0 = [user_data[cat] for cat in min_expenses.keys()]
    
    bounds = [(min_expenses[cat], user_data[cat]) for cat in min_expenses.keys()]
    
    result = minimize(objective, x0, constraints=constraints, bounds=bounds)
    
    return result.x

def evaluate_models(models, X_test, y_test):
    evaluation_results = {}
    
    for column in y_test.columns:
        y_pred = models[column].predict(X_test)
        
        r2 = r2_score(y_test[column], y_pred)
        mae = mean_absolute_error(y_test[column], y_pred)
        rmse = np.sqrt(mean_squared_error(y_test[column], y_pred))
        
        evaluation_results[column] = {
            'R2 Score': r2,
            'Mean Absolute Error': mae,
            'Root Mean Squared Error': rmse
        }
    
    return evaluation_results

if __name__ == '__main__':
    print("Loading data...")
    df = load_data()
    
    print("Preparing features...")
    X, y = prepare_features(df)
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print("Training models...")
    models = train_models(X_train, y_train)
    
    print("\nEvaluating models...")
    evaluation_results = evaluate_models(models, X_test, y_test)
    
    print("\nModel Performance Metrics:")
    print("-" * 80)
    for category, metrics in evaluation_results.items():
        print(f"\nCategory: {category}")
        print(f"R2 Score: {metrics['R2 Score']:.4f}")
        print(f"Mean Absolute Error: {metrics['Mean Absolute Error']:.4f}")
        print(f"Root Mean Squared Error: {metrics['Root Mean Squared Error']:.4f}")
    print("-" * 80)

