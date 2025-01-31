import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import './Dashboard.css';

Chart.register(...registerables);

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [goals, setGoals] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  // useEffect(() => {
  //   axios.get('/get')
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

  // Render pie chart for expense categories
  useEffect(() => {
    if (expenses.length > 0) {
      const ctx = document.getElementById('expenseChart').getContext('2d');
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: expenses.map(e => e.category),
          datasets: [{
            data: expenses.map(e => e.amount),
            backgroundColor: [
              '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
            ],
          }],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'bottom' },
          },
        },
      });
    }
  }, [expenses]);

  // Render bar chart for monthly spending trends
  useEffect(() => {
    if (expenses.length > 0) {
      const ctx = document.getElementById('trendChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          datasets: [{
            label: 'Monthly Spending',
            data: [300, 400, 500, 450, 600, 700, 800], // Replace with actual data
            backgroundColor: '#36A2EB',
          }],
        },
        options: {
          responsive: true,
          scales: {
            y: { beginAtZero: true },
          },
        },
      });
    }
  }, [expenses]);

  return (
    <div className="dashboard">
      <h1>Expense Portfolio</h1>

      {/* Overview Section */}
      <div className="overview">
        <div className="overview-card">
          <h3>Total Income</h3>
          <p>${totalIncome}</p>
        </div>
        <div className="overview-card">
          <h3>Total Expenses</h3>
          <p>${totalExpenses}</p>
        </div>
        <div className="overview-card">
          <h3>Savings</h3>
          <p>${totalIncome - totalExpenses}</p>
        </div>
      </div>

      {/* Spending Analysis */}
      <div className="charts">
        <div className="chart-container">
          <h3>Expense Categories</h3>
          <canvas id="expenseChart" width="400" height="400"></canvas>
        </div>
        <div className="chart-container">
          <h3>Monthly Spending Trends</h3>
          <canvas id="trendChart" width="400" height="400"></canvas>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="recent-transactions">
        <h3>Recent Transactions</h3>
        <ul>
          {expenses.slice(0, 5).map((expense, index) => (
            <li key={index}>
              <span>{expense.category}</span>
              <span>${expense.amount}</span>
              <span>{new Date(expense.date).toLocaleDateString()}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Saving Goals */}
      <div className="saving-goals">
        <h3>Saving Goals</h3>
        {goals.map((goal, index) => (
          <div key={index} className="goal">
            <h4>{goal.name}</h4>
            <p>Target: ${goal.targetAmount}</p>
            <p>Saved: ${goal.savedAmount}</p>
            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: `${(goal.savedAmount / goal.targetAmount) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;