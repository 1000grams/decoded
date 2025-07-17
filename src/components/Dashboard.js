<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import './Dashboard.css';

import SpotifyModule from './SpotifyModule.js';
import CatalogPanel from './catalog/CatalogPanel.jsx';
import AnalyticsPanel from './AnalyticsPanel.jsx';
import MarketingHub from '../pages/MarketingHub.jsx';

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
=======
﻿import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = ({ user, username, onSignOut }) => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [spotifyConnected, setSpotifyConnected] = useState(false);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        setLoading(true);
        console.log(' Loading dashboard data...');

        try {
            // Use fallback data for demo
            const fallbackData = {
                catalog: {
                    artist: 'Rue De Vivre',
                    totalTracks: 40,
                    totalStreams: 125000,
                    monthlyRevenue: 1247.89
                },
                analytics: {
                    portfolioValue: '45,782.33',
                    monthlyRevenue: '1,247.89',
                    growthRate: '+15.3%',
                    riskProfile: 'Medium-Low',
                    spotify: {
                        monthlyListeners: 8500,
                        followers: 1250,
                        recentStreams: { thisMonth: 15000 }
                    },
                    topPerformers: [
                        { title: 'Hump Day', revenue: '2,847', roi: '+18.5%' },
                        { title: 'Friday Flex', revenue: '2,234', roi: '+12.3%' },
                        { title: 'Big Fish', revenue: '1,956', roi: '+9.8%' }
                    ],
                    recommendations: [
                        {
                            priority: 'High',
                            action: 'Focus on TikTok marketing for viral potential',
                            timeline: '2-4 weeks',
                            investment: '$500-1000',
                            expectedROI: '15-25%'
                        },
                        {
                            priority: 'Medium',
                            action: 'Expand Spotify playlist placements',
                            timeline: '1-2 months',
                            investment: '$300-600',
                            expectedROI: '10-18%'
                        }
                    ]
                }
            };

            setDashboardData(fallbackData);
            console.log(' Dashboard data loaded');
        } catch (error) {
            console.error(' Failed to load dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSpotifyConnect = () => {
        setSpotifyConnected(true);
        console.log(' Spotify connected (UI simulation)');
    };

    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="loading-spinner"></div>
                <p>Loading your analytics dashboard...</p>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            {/* Dashboard Header */}
            <header className="dashboard-header">
                <div className="dashboard-nav">
                    <div className="dashboard-logo">
                        <h1> Rue De Vivre Analytics</h1>
                    </div>
                    <div className="user-controls">
                        <span className="welcome-text">Welcome, {username}</span>
                        {!spotifyConnected ? (
                            <button 
                                onClick={handleSpotifyConnect}
                                className="spotify-connect-btn"
                            >
                                 Connect Spotify
                            </button>
                        ) : (
                            <div className="spotify-status">
                                 Spotify Connected
                            </div>
                        )}
                        <button onClick={onSignOut} className="sign-out-btn">
                            Sign Out
                        </button>
                    </div>
                </div>
            </header>

            {/* Dashboard Grid */}
            <main className="analytics-grid">
                {/* Portfolio Overview */}
                <section className="portfolio-card">
                    <h2> Portfolio Overview</h2>
                    <div className="portfolio-summary">
                        <div className="metric-card">
                            <h3>Portfolio Value</h3>
                            <span className="value">${dashboardData?.analytics?.portfolioValue}</span>
                            <span className="growth positive">{dashboardData?.analytics?.growthRate}</span>
                        </div>
                        <div className="metric-card">
                            <h3>Monthly Revenue</h3>
                            <span className="value">${dashboardData?.analytics?.monthlyRevenue}</span>
                        </div>
                        <div className="metric-card">
                            <h3>Total Tracks</h3>
                            <span className="value">{dashboardData?.catalog?.totalTracks}</span>
                        </div>
                        <div className="metric-card">
                            <h3>Risk Profile</h3>
                            <span className="value">{dashboardData?.analytics?.riskProfile}</span>
                        </div>
                    </div>
                    
                    <div className="top-performers">
                        <h4> Top Performing Tracks</h4>
                        <div className="tracks-list">
                            {dashboardData?.analytics?.topPerformers?.map((track, index) => (
                                <div key={index} className="track-item">
                                    <span className="track-name">{track.title}</span>
                                    <span className="track-revenue">${track.revenue}</span>
                                    <span className="track-roi positive">
                                        {track.roi}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Spotify Analytics */}
                <section className="spotify-card">
                    <h2> Spotify Analytics</h2>
                    <div className="spotify-metrics">
                        <div className="metric-card">
                            <h3>Monthly Listeners</h3>
                            <span className="value">
                                {dashboardData?.analytics?.spotify?.monthlyListeners?.toLocaleString()}
                            </span>
                        </div>
                        <div className="metric-card">
                            <h3>Followers</h3>
                            <span className="value">
                                {dashboardData?.analytics?.spotify?.followers?.toLocaleString()}
                            </span>
                        </div>
                        <div className="metric-card">
                            <h3>This Month Streams</h3>
                            <span className="value">
                                {dashboardData?.analytics?.spotify?.recentStreams?.thisMonth?.toLocaleString()}
                            </span>
                        </div>
                    </div>
                </section>

                {/* Market Trends */}
                <section className="trends-card">
                    <h2> Market Trends</h2>
                    <div className="trends-overview">
                        <div className="trend-metric">
                            <h4> Viral Predictions</h4>
                            <div className="platform-readiness">
                                <div className="platform">TikTok: 3 tracks ready</div>
                                <div className="platform">Instagram: 2 tracks ready</div>
                                <div className="platform">YouTube: 4 tracks ready</div>
                            </div>
                        </div>
                        
                        <div className="trend-metric">
                            <h4> Market Analysis</h4>
                            <div className="market-score">
                                Opportunity Score: <strong>75/100</strong>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Investment Recommendations */}
                <section className="recommendations-card">
                    <h2> Investment Recommendations</h2>
                    <div className="recommendations-list">
                        {dashboardData?.analytics?.recommendations?.map((rec, index) => (
                            <div key={index} className={`recommendation-card priority-${rec.priority.toLowerCase()}`}>
                                <div className="rec-header">
                                    <span className="priority">{rec.priority} Priority</span>
                                    <span className="timeline">{rec.timeline}</span>
                                </div>
                                <div className="rec-action">{rec.action}</div>
                                <div className="rec-metrics">
                                    <span className="investment">Investment: {rec.investment}</span>
                                    <span className="roi">Expected ROI: {rec.expectedROI}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
>>>>>>> 23d180db33d9b8ccfbbae5c78a31eb4c3edf3d9e
