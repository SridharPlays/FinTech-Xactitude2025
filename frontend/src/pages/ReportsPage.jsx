import React, { useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';
import './ReportsPage.css';

Chart.register(...registerables);

const ReportsPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [goals, setGoals] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  // Fetch expenses and goals from the backend
  // useEffect(() => {
  //   axios.get('/api/expenses')
  //     .then(response => {
  //       setExpenses(response.data);
  //       calculateTotals(response.data);
  //     })
  //     .catch(error => console.error('Error fetching expenses:', error));

  //   axios.get('/api/goals')
  //     .then(response => setGoals(response.data))
  //     .catch(error => console.error('Error fetching goals:', error));
  // }, []);

  // Calculate total income and expenses
  const calculateTotals = (expenses) => {
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    setTotalExpenses(totalExpenses);
    // Assuming income is fetched or hardcoded for now
    setTotalIncome(5000); // Replace with actual income data
  };

  // Calculate top spending categories
  const calculateTopCategories = () => {
    const categoryTotals = {};
    expenses.forEach(expense => {
      if (categoryTotals[expense.category]) {
        categoryTotals[expense.category] += expense.amount;
      } else {
        categoryTotals[expense.category] = expense.amount;
      }
    });

    return Object.entries(categoryTotals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3); // Top 3 categories
  };

  // Get personalized suggestions
  const getSuggestions = () => {
    const savingsRate = ((totalIncome - totalExpenses) / totalIncome) * 100;
    if (savingsRate < 10) {
      return "You're spending a lot! Try cutting back on non-essential expenses like dining out or entertainment.";
    } else if (savingsRate < 20) {
      return "You're doing okay, but there's room for improvement. Consider setting a stricter budget for next month.";
    } else {
      return "Great job! You're saving a good portion of your income. Keep it up!";
    }
  };

  return (
    <div className="report">
      <h1>Your Monthly Report</h1>

      {/* Monthly Summary */}
      <div className="summary">
        <div className="summary-card">
          <h3>Total Income</h3>
          <p>${totalIncome}</p>
        </div>
        <div className="summary-card">
          <h3>Total Expenses</h3>
          <p>${totalExpenses}</p>
        </div>
        <div className="summary-card">
          <h3>Savings</h3>
          <p>${totalIncome - totalExpenses}</p>
        </div>
      </div>

      {/* Budget Goals Status */}
      <div className="goals-status">
        <h2>Budget Goals</h2>
        {goals.map((goal, index) => {
          const percentage = (goal.savedAmount / goal.targetAmount) * 100;
          return (
            <div key={index} className="goal">
              <h4>{goal.name}</h4>
              <p>Target: ${goal.targetAmount}</p>
              <p>Saved: ${goal.savedAmount}</p>
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <p className="status">
                {percentage >= 100 ? "Goal Met! 🎉" : "Keep Going!"}
              </p>
            </div>
          );
        })}
      </div>

      {/* Top Spending Categories */}
      <div className="top-categories">
        <h2>Top Spending Categories</h2>
        <div className="categories-list">
          {calculateTopCategories().map((category, index) => (
            <div key={index} className="category">
              <h4>{category[0]}</h4>
              <p>${category[1]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Personalized Suggestions */}
      <div className="suggestions">
        <h2>Tips for Next Month</h2>
        <p>{getSuggestions()}</p>
      </div>
    </div>
  );
};

export default ReportsPage;