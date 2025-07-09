import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import SpotifyModule from './SpotifyModule';

const Dashboard = ({ username, onSignOut }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('cognito_id_token');

    if (token) {
      fetch("https://2h2oj7u446.execute-api.eu-central-1.amazonaws.com/prod/dashboard", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log("Dashboard Data:", data);
        setDashboardData(data);
      })
      .catch(err => {
        console.error("Dashboard fetch error:", err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
    } else {
      setError("No Cognito token found. Please log in.");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading your artist dashboard...</p>
        <small>Syncing your latest tracks and fan data...</small>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <p>Error loading dashboard data: {error}</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="dashboard-nav">
          <div className="dashboard-logo">
            <h1>{dashboardData?.catalog?.artist} Command Center</h1>
          </div>
          <div className="user-controls">
            <span className="welcome-text">Welcome back, {username}</span>
            <button onClick={onSignOut} className="sign-out-btn">
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="analytics-grid">
        <section className="portfolio-card">
          <h2>Your Music Business</h2>
          <div className="portfolio-summary">
            <div className="metric-card">
              <h3>Total Portfolio Value</h3>
              <span className="value">${dashboardData?.analytics?.portfolioValue}</span>
            </div>
            <div className="metric-card">
              <h3>Monthly Income</h3>
              <span className="value">${dashboardData?.analytics?.monthlyRevenue}</span>
            </div>
          </div>
        </section>

        <section className="spotify-card">
          <SpotifyModule />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;