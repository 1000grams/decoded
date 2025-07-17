import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import './Dashboard.css';

import SpotifyModule from './SpotifyModule.js';
import CatalogPanel from './catalog/CatalogPanel.jsx';
import AnalyticsPanel from './AnalyticsPanel.js';
import MarketingHub from '../pages/MarketingHub.js';
import LogoutButton from '../components/LogoutButton.jsx';

import * as jwtDecode from 'jwt-decode';
import { getArtistId } from '../state/ArtistManager.js';
import { useAuth } from '../context/AuthContext.js';
import { DashboardAPI } from '../api/apiconfig.js';

const CognitoDomain = 'https://auth.decodedmusic.com';
const ClientId = '5pb29tja8gkqm3jb43oimd5qjt';

const Dashboard = ({ username, onSignOut }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);

  const { user } = useAuth();
  const artistId = getArtistId(user?.id);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      fetch("https://decodedmusic.com/api/auth/exchange", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("authToken", data.access_token);
          window.location.replace("/dashboard");
        });
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await DashboardAPI.getAnalytics({ artistId });
        setDashboardData(data);
        setApiResponse(data);
      } catch (err) {
        console.error("Dashboard data error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (artistId) fetchData();
  }, [artistId]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  if (!localStorage.getItem('cognito_id_token')) {
    const redirectUri = encodeURIComponent("https://decodedmusic.com/dashboard");
    return <Navigate to={`${CognitoDomain}/login?client_id=${ClientId}&response_type=code&scope=openid+email+profile&redirect_uri=${redirectUri}`} />;
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
      <button onClick={handleLogout} className="logout-button">Logout</button>
      <div className="artist-banner">
        <h2>👤 {user?.name || 'Unknown Artist'}</h2>
        <p><strong>Artist ID:</strong> {artistId}</p>
        <p><strong>Spotify:</strong> <a href={user?.spotifyUrl} target="_blank" rel="noreferrer">View Profile</a></p>
        <div className="user-controls">
          <button onClick={onSignOut} className="sign-out-btn">Sign Out</button>
        </div>
      </div>

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

      <div className="dashboard-grid">
        <div className="catalog-column">
          <CatalogPanel artistId={artistId} />
        </div>
        <div className="analytics-column">
          <AnalyticsPanel artistId={artistId} />
        </div>
        <div className="spotify-column">
          <SpotifyModule artistId={artistId} />
        </div>
      </div>

      <div className="marketing-hub">
        <MarketingHub artistId={artistId} />
      </div>

      {apiResponse && (
        <div>
          <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
