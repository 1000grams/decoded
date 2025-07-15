import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import './Dashboard.css';
import SpotifyModule from './SpotifyModule';
import * as jwtDecode from 'jwt-decode';
import { getArtistId } from '../state/ArtistManager';

const CognitoDomain = 'https://auth.decodedmusic.com';
const ClientId = '5pb29tja8gkqm3jb43oimd5qjt';

const Dashboard = ({ username, onSignOut }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use artistId in API calls or data-fetching logic
  const artistId = getArtistId();

  useEffect(() => {
    const token = localStorage.getItem('cognito_id_token');
    if (token) {
      const decoded = jwtDecode(token);
      console.log("Token expires at:", new Date(decoded.exp * 1000));
    }
  }, []);

  // Added Cognito group verification
  useEffect(() => {
    const token = localStorage.getItem("cognito_id_token");
    if (token) {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      console.log("Cognito groups:", decoded["cognito:groups"]);

      // Check if user belongs to the 'artist' group
      if (!decoded["cognito:groups"]?.includes("artist")) {
        console.error("User is not in the required Cognito group: artist");
        setError("Access denied: You are not authorized to view this dashboard.");
        setLoading(false);
        return;
      }

      // Further check if 'rue_de_vivre' is associated with the 'artist' group
      if (!decoded["cognito:groups"]?.includes("rue_de_vivre")) {
        console.error("User is not in the required subgroup: rue_de_vivre");
        setError("Access denied: You are not authorized to view this dashboard.");
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('cognito_id_token');

      if (!token) {
        setError("No Cognito token found. Redirecting to login...");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`https://2h2oj7u446.execute-api.eu-central-1.amazonaws.com/prod/dashboard`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        const data = await res.json();

        setDashboardData(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!localStorage.getItem('cognito_id_token')) {
    // Ensure proper encoding of redirectUri in Cognito login URL
    const redirectUri = encodeURIComponent("https://decodedmusic.com/dashboard");
    const loginUrl = `https://${CognitoDomain}/login?client_id=${ClientId}&response_type=code&scope=openid+email+profile&redirect_uri=${redirectUri}`;

    return <Navigate to={loginUrl} />;
  }

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
            <h1>Comprehensive Growth Dashboard</h1>
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
          <h2>Spotify Insights</h2>
          <div className="spotify-summary">
            <div className="metric-card">
              <h3>Followers</h3>
              <span className="value">{dashboardData?.spotify?.profile?.followers}</span>
            </div>
            <div className="metric-card">
              <h3>Popularity</h3>
              <span className="value">{dashboardData?.spotify?.profile?.popularity}/100</span>
            </div>
          </div>
        </section>

        <section className="catalog-card">
          <h2>Catalog Overview</h2>
          <div className="catalog-summary">
            <div className="metric-card">
              <h3>Total Works</h3>
              <span className="value">{dashboardData?.catalog?.totalWorks}</span>
            </div>
            <div className="metric-card">
              <h3>Spotify Linked</h3>
              <span className="value">{dashboardData?.catalog?.spotifyLinked}</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;