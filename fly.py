import base64
import io
import joblib
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import logging
from sklearn.exceptions import InconsistentVersionWarning
import warnings

warnings.simplefilter("ignore", InconsistentVersionWarning)

app = Flask(__name__)
CORS(app)
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

try:
    insurance_pipeline = joblib.load('insurance_predictor.joblib')
    logger.info("Insurance model loaded successfully")
except Exception as e:
    logger.error(f"Error loading insurance model: {str(e)}")
    insurance_pipeline = None

try:
    budget_model = joblib.load('budget_optimizer_rf.joblib')
    logger.info("Budget optimizer model loaded successfully")
except Exception as e:
    logger.error(f"Error loading budget model: {str(e)}")
    budget_model = None

@app.route('/predict_insurance', methods=['POST'])
def predict_insurance():
    try:
        if not insurance_pipeline:
            return jsonify({'error': 'Insurance model not loaded', 'message': 'Prediction service unavailable'}), 503

        data = request.json
        
        required_fields = ['age', 'sex', 'bmi', 'children', 'smoker', 'region']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields', 'message': 'All fields are required'}), 400

        sample = pd.DataFrame({
            'age': [data['age']],
            'sex': [data['sex']],
            'bmi': [data['bmi']],
            'children': [data['children']],
            'smoker': [data['smoker']],
            'region': [data['region']]
        })

        sample['age_bmi'] = sample['age'] * sample['bmi']
        sample['smoker_age'] = sample['smoker'].map({'yes':1, 'no':0}) * sample['age']

        predicted_log = insurance_pipeline.predict(sample)
        predicted_charge = np.expm1(predicted_log)[0]

        return jsonify({
            'prediction': round(float(predicted_charge), 2),
            'message': 'Insurance premium prediction successful'
        }), 200

    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        return jsonify({'error': str(e), 'message': 'Prediction failed'}), 500

@app.route('/batch_predict', methods=['POST'])
def batch_predict():
    try:
        if not insurance_pipeline:
            return jsonify({'error': 'Model not loaded'}), 503

        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
            
        file = request.files['file']
        if not file.filename.endswith('.csv'):
            return jsonify({'error': 'Only CSV files are supported'}), 400

        df = pd.read_csv(file)
        required_cols = ['age', 'sex', 'bmi', 'children', 'smoker', 'region']
        if not all(col in df.columns for col in required_cols):
            return jsonify({'error': f'CSV must contain columns: {required_cols}'}), 400

        df['age_bmi'] = df['age'] * df['bmi']
        df['smoker_age'] = df['smoker'].map({'yes':1, 'no':0}) * df['age']

        predictions_log = insurance_pipeline.predict(df)
        df['predicted_charge'] = np.expm1(predictions_log)
        
        stats = {
            'mean_prediction': float(df['predicted_charge'].mean()),
            'min_prediction': float(df['predicted_charge'].min()),
            'max_prediction': float(df['predicted_charge'].max()),
            'count': int(len(df))
        }

        return jsonify({
            'predictions': df.to_dict(orient='records'),
            'statistics': stats,
            'message': 'Batch prediction completed'
        }), 200

    except Exception as e:
        logger.error(f"Batch prediction error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/optimize_budget', methods=['POST'])
def optimize_budget():
    try:
        if not budget_model:
            return jsonify({'error': 'Budget model not loaded', 'message': 'Optimization service unavailable'}), 503

        data = request.json
        
        required_fields = ['Income', 'Age', 'Dependents', 'Occupation', 'City_Tier', 
                         'Rent', 'Loan_Repayment', 'Insurance']
        if not all(field in data for field in required_fields):
            return jsonify({
                'error': 'Missing required fields',
                'message': f'Required fields: {", ".join(required_fields)}'
            }), 400

        user_input = pd.DataFrame([{
            'Income': float(data['Income']),
            'Age': int(data['Age']),
            'Dependents': int(data['Dependents']),
            'Occupation': str(data['Occupation']),
            'City_Tier': str(data['City_Tier']),
            'Rent': float(data['Rent']),
            'Loan_Repayment': float(data['Loan_Repayment']),
            'Insurance': float(data['Insurance'])
        }])

        pipeline = budget_model['pipeline']
        target_columns = budget_model['target_columns']
        predicted_spending = pipeline.predict(user_input)[0]
        
        total_fixed_costs = data['Rent'] + data['Loan_Repayment'] + data['Insurance']
        total_predicted_spending = np.sum(predicted_spending)
        potential_savings = data['Income'] - (total_fixed_costs + total_predicted_spending)
        savings_percentage = (potential_savings / data['Income']) * 100 if data['Income'] > 0 else 0

        result = {
            'predicted_spending': dict(zip(target_columns, predicted_spending.tolist())),
            'summary': {
                'total_fixed_costs': round(total_fixed_costs, 2),
                'total_predicted_spending': round(total_predicted_spending, 2),
                'potential_savings': round(potential_savings, 2),
                'savings_percentage': round(savings_percentage, 2)
            },
            'message': 'Budget optimization completed successfully'
        }

        return jsonify(result), 200

    except Exception as e:
        logger.error(f"Budget optimization error: {str(e)}")
        return jsonify({'error': str(e), 'message': 'Budget optimization failed'}), 500

@app.route('/batch_optimize_budget', methods=['POST'])
def batch_optimize_budget():
    try:
        if not budget_model:
            return jsonify({'error': 'Budget model not loaded'}), 503

        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
            
        file = request.files['file']
        if not file.filename.endswith('.csv'):
            return jsonify({'error': 'Only CSV files are supported'}), 400

        df = pd.read_csv(file)
        required_cols = ['Income', 'Age', 'Dependents', 'Occupation', 'City_Tier', 
                        'Rent', 'Loan_Repayment', 'Insurance']
        if not all(col in df.columns for col in required_cols):
            return jsonify({'error': f'CSV must contain columns: {required_cols}'}), 400

        pipeline = budget_model['pipeline']
        target_columns = budget_model['target_columns']
        predictions = pipeline.predict(df)
        
        results = []
        for i, row in df.iterrows():
            predicted_spending = predictions[i]
            total_fixed_costs = row['Rent'] + row['Loan_Repayment'] + row['Insurance']
            total_predicted_spending = np.sum(predicted_spending)
            potential_savings = row['Income'] - (total_fixed_costs + total_predicted_spending)
            savings_percentage = (potential_savings / row['Income']) * 100 if row['Income'] > 0 else 0
            
            results.append({
                'input_data': row.to_dict(),
                'predicted_spending': dict(zip(target_columns, predicted_spending.tolist())),
                'summary': {
                    'total_fixed_costs': round(total_fixed_costs, 2),
                    'total_predicted_spending': round(total_predicted_spending, 2),
                    'potential_savings': round(potential_savings, 2),
                    'savings_percentage': round(savings_percentage, 2)
                }
            })

        stats = {
            'mean_savings': round(np.mean([r['summary']['potential_savings'] for r in results]), 2),
            'mean_savings_percentage': round(np.mean([r['summary']['savings_percentage'] for r in results]), 2),
            'count': len(results)
        }

        return jsonify({
            'predictions': results,
            'statistics': stats,
            'message': 'Batch budget optimization completed'
        }), 200

    except Exception as e:
        logger.error(f"Batch budget optimization error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/model_info', methods=['GET'])
def model_info():
    models_info = {
        'insurance_model': {
            'status': 'loaded' if insurance_pipeline else 'not loaded',
            'type': 'GradientBoostingRegressor',
            'features': ['age', 'sex', 'bmi', 'children', 'smoker', 'region', 'age_bmi', 'smoker_age'],
            'target': 'log(charges)',
            'version': '1.0'
        },
        'budget_model': {
            'status': 'loaded' if budget_model else 'not loaded',
            'type': 'RandomForestRegressor',
            'features': budget_model['feature_columns'] if budget_model else [],
            'targets': budget_model['target_columns'] if budget_model else [],
            'version': '1.0'
        }
    }
    return jsonify(models_info)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)