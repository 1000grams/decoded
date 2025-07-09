import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import SpotifyModule from './SpotifyModule';
#!/bin/bash

# Configuration
API_ID="2h2oj7u446"
STAGE_NAME="prod"

# Get the resource ID for the /api/dashboard path
RESOURCE_ID=$(aws apigateway get-resources --rest-api-id $API_ID --query "items[?path=='/api/dashboard'].id" --output text)

if [ -z "$RESOURCE_ID" ]; then
  echo "Error: Unable to find resource ID for /api/dashboard"
  exit 1
fi

echo "Resource ID for /api/dashboard: $RESOURCE_ID"

# Enable CORS for the OPTIONS method
aws apigateway put-method-response \
  --rest-api-id $API_ID \
  --resource-id $RESOURCE_ID \
  --http-method OPTIONS \
  --status-code 200 \
  --response-parameters "method.response.header.Access-Control-Allow-Origin=true,method.response.header.Access-Control-Allow-Methods=true,method.response.header.Access-Control-Allow-Headers=true"

aws apigateway put-integration-response \
  --rest-api-id $API_ID \
  --resource-id $RESOURCE_ID \
  --http-method OPTIONS \
  --status-code 200 \
  --response-parameters "method.response.header.Access-Control-Allow-Origin='*',method.response.header.Access-Control-Allow-Methods='GET,POST,PUT,DELETE,OPTIONS',method.response.header.Access-Control-Allow-Headers='Content-Type,Authorization'"

# Deploy the API
aws apigateway create-deployment --rest-api-id $API_ID --stage-name $STAGE_NAME

const Dashboard = ({ username, onSignOut }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('cognito_id_token');

    if (token) {
      fetch("https://2h2oj7u446.execute-api.eu-central-1.amazonaws.com/prod/api/dashboard", {
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