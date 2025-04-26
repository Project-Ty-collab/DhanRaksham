import React from 'react';
import './Budget.css';
import Header from '../../components/Header';

const Budget = () => {
  return (
    <div className="budget-container">
      <Header />
      <div className="budget-box">
        <h2>FinanceOptimizer</h2>

        <div className="section">
          <h3>Personal Status</h3>
          <div className="grid-3">
            <div className="row">
              <label>Number of Dependents</label>
              <input type="number" />
            </div>
            <div className="row">
              <label>Occupation</label>
              <select>
                <option value="Student">Student</option>
                <option value="Employee">Employee</option>
                <option value="Freelancer">Freelancer</option>
              </select>
            </div>
            <div className="row">
              <label>City Tier</label>
              <select>
                <option value="Tier_1">Tier 1</option>
                <option value="Tier_2">Tier 2</option>
                <option value="Tier_3">Tier 3</option>
              </select>
            </div>
          </div>
        </div>

        <div className="section">
          <h3>Monthly Fixed Expenses</h3>
          <div className="grid-3">
            <div className="row">
              <label>Rent/Housing</label>
              <input type="number" />
            </div>
            <div className="row">
              <label>Loan Repayment</label>
              <input type="number" />
            </div>
            <div className="row">
              <label>Insurance</label>
              <input type="number" />
            </div>
          </div>
        </div>

        <button className="optimize-button">Optimize My Budget</button>
      </div>
    </div>
  );
};

export default Budget;
