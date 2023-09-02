import numpy as np
from flask import Flask, jsonify, request, render_template
from joblib import load
from flask_cors import CORS
import pandas as pd

#  & c:/Users/King/Desktop/Personal_Projects/HeartBuddy_Demo/.venv/Scripts/Activate.ps1
app = Flask(__name__)
CORS(app)
# , origins='http://localhost:5173
# Load the saved model
model = load('./predictorModel.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    # Get the data from the request
    data = request.get_json()

    # Create a DataFrame from the request data
    df = pd.DataFrame(data, index=[0])
    
    # Convert the feature values to the appropriate types
    df['age'] = df['age'].astype(int)
    df['gender'] = pd.to_numeric(df['gender'], errors='coerce', downcast='integer')
    df['height'] = df['height'].astype(int)
    df['weight'] = df['weight'].astype(int)
    df['diastolicPressure'] = df['diastolicPressure'].astype(int)
    df['systolicPressure'] = df['systolicPressure'].astype(int)
    df['cholesterol'] = df['cholesterol'].astype(int)
    df['glucose'] = df['glucose'].astype(int)
    df['smokes'] = df['smokes'].astype(int)
    df['takesAlcohol'] = df['takesAlcohol'].astype(int)
    df['isActive'] = df['isActive'].astype(int)

    # Extract the necessary features from the DataFrame
    AGE = df['age'].values[0]
    GENDER = df['gender'].values[0]
    CHOLESTEROL = df['cholesterol'].values[0]
    AP_LOW = df['diastolicPressure'].values[0]
    AP_HIGH = df['systolicPressure'].values[0]
    GLUCOSE = df['glucose'].values[0]
    HEIGHT = df['height'].values[0]
    WEIGHT = df['weight'].values[0]
    SMOKE = df['smokes'].values[0]
    ALCOHOL = df['takesAlcohol'].values[0]
    PHYSICAL_ACTIVITY = df['isActive'].values[0]

    # Convert the input features into a numpy array
    input_data = np.array([AGE, GENDER, HEIGHT, WEIGHT, AP_HIGH, AP_LOW, CHOLESTEROL, GLUCOSE, SMOKE, ALCOHOL, PHYSICAL_ACTIVITY])
    input_data_reshaped = input_data.reshape(1, -1)

    # Perform prediction using the loaded model
    prediction = model.predict(input_data_reshaped)

    # Convert the prediction to a Python list
    prediction_list = prediction.tolist()
    
    prediction_list = [str(item) for item in prediction_list]

    # Return the prediction as a JSON response
    return jsonify({'prediction': prediction_list})


if __name__ == '__main__':
    app.run(host='localhost', port=5173, debug=True)
