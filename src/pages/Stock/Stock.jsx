import React, { useState, useEffect } from 'react';
import './Stock.css';
import Header from '../../components/Header';

const Stock = () => {
  const [amount, setAmount] = useState('');
  const [stocks, setStocks] = useState('');
  const [risk, setRisk] = useState('Low');
  const [prediction, setPrediction] = useState('');

  useEffect(() => {
    if (amount && stocks) {
      const result = `With ₹${amount}, ${stocks} stocks, and ${risk} risk, expected return is ₹${(amount * 1.1).toFixed(2)}`;
      setPrediction(result);
    } else {
      setPrediction('');
    }
  }, [amount, stocks, risk]);

  return (
    
    <div className="stock-section">
      <Header />
      <div className="container stock-container">
        <h2 className="section-title">Stock Predictor</h2>
        <p className="section-subtitle">Enter your details to get a stock return prediction</p>

        <label className="stock-label">Investment Amount (₹)</label>
        <input
          type="number"
          placeholder="Enter amount"
          className="stock-input"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          step="0.01" // Removes up/down arrows from number input
        />

        <label className="stock-label">Number of Stocks</label>
        <input
          type="number"
          placeholder="Enter number of stocks"
          className="stock-input stocks-input" // Added class for "Number of Stocks"
          value={stocks}
          onChange={(e) => setStocks(e.target.value)}
        />

        <label className="stock-label">Risk Factor</label>
        <select
          className="stock-input"
          value={risk}
          onChange={(e) => setRisk(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        {/* Predict Button */}
        <button className="stock-button">
          Predict
        </button>

        {prediction && (
          <div className="stock-prediction">
            <strong>Prediction:</strong>
            <p>{prediction}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stock;
