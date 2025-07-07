import React, { useState, useEffect } from 'react';
import dynamoDBService from '../services/DynamoDBService';
import './Dashboard.css';
import SpotifyModule from './SpotifyModule';

const Dashboard = ({ user, username, onSignOut }) => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [spotifyConnected, setSpotifyConnected] = useState(false);
    const [, setError] = useState(null); // Removed unused 'error' variable

    useEffect(() => {
        loadDashboardData();
        // eslint-disable-next-line
    }, []);

    const loadDashboardData = async () => {
        setLoading(true);
        setError(null);
        console.log(' Loading real artist data from DynamoDB...');

        try {
            // Try to load real data from DynamoDB
            const artistId = username || 'demo-artist';
            
            const [portfolioResult, analyticsResult, recommendationsResult] = await Promise.all([
                dynamoDBService.getArtistPortfolio(artistId),
                dynamoDBService.getTrackAnalytics(artistId),
                dynamoDBService.getAIRecommendations(artistId)
            ]);

            if (portfolioResult.success && portfolioResult.data) {
                // Use real data
                setDashboardData({
                    catalog: portfolioResult.data.catalog,
                    analytics: {
                        ...portfolioResult.data.analytics,
                        trackAnalytics: analyticsResult.success ? analyticsResult.data : [],
                        recommendations: recommendationsResult.success ? recommendationsResult.data?.recommendations : []
                    }
                });
                console.log(' Real data loaded from DynamoDB');
            } else {
                throw new Error('No data found, using fallback');
            }

        } catch (error) {
            console.log(' Using fallback data for demo:', error.message);
            
            // Fallback data with artist-focused language
            const fallbackData = {
                catalog: {
                    artist: username || 'Independent Artist',
                    totalTracks: 40,
                    totalStreams: 125000,
                    monthlyRevenue: 1247.89
                },
                analytics: {
                    portfolioValue: '45,782.33',
                    monthlyRevenue: '1,247.89',
                    growthRate: '+15.3%',
                    riskProfile: 'Growing Steadily',
                    spotify: {
                        monthlyListeners: 8500,
                        followers: 1250,
                        recentStreams: { thisMonth: 15000 }
                    },
                    topPerformers: [
                        { title: 'Late Night Sessions', revenue: '2,847', roi: '+18.5%' },
                        { title: 'City Dreams', revenue: '2,234', roi: '+12.3%' },
                        { title: 'Underground', revenue: '1,956', roi: '+9.8%' }
                    ],
                    recommendations: [
                        {
                            priority: 'High',
                            action: 'Your track "Late Night Sessions" has viral potential on TikTok - create 15-second hooks focusing on the chorus',
                            timeline: '2-4 weeks',
                            investment: '$500-1000',
                            expectedROI: '15-25%',
                            confidence: '85%'
                        },
                        {
                            priority: 'Medium',
                            action: 'Submit "City Dreams" to indie playlist curators - we found 12 playlists that match your sound',
                            timeline: '1-2 months',
                            investment: '$300-600',
                            expectedROI: '10-18%',
                            confidence: '72%'
                        },
                        {
                            priority: 'High',
                            action: 'Your fanbase is ready for limited edition merch - start with 50 unit vinyl test run',
                            timeline: '1-3 months',
                            investment: '$800-1200',
                            expectedROI: '20-35%',
                            confidence: '78%'
                        }
                    ]
                }
            };

            setDashboardData(fallbackData);
        } finally {
            setLoading(false);
        }
    };

    const handleSpotifyConnect = async () => {
        setSpotifyConnected(true);
        console.log(' Spotify connected - syncing your latest tracks...');
        
        // In real implementation, this would sync with Spotify API
        // and update DynamoDB with fresh data
        setTimeout(() => {
            console.log(' Spotify sync complete');
        }, 2000);
    };

    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="loading-spinner"></div>
                <p>Loading your artist dashboard...</p>
                <small>Syncing your latest tracks and fan data...</small>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="dashboard-nav">
                    <div className="dashboard-logo">
                        <h1> {dashboardData?.catalog?.artist} Command Center</h1>
                    </div>
                    <div className="user-controls">
                        <span className="welcome-text">Welcome back, {username}</span>
                        {!spotifyConnected ? (
                            <button 
                                onClick={handleSpotifyConnect}
                                className="spotify-connect-btn"
                            >
                                 Sync Spotify Data
                            </button>
                        ) : (
                            <div className="spotify-status">
                                 Spotify Synced
                            </div>
                        )}
                        <button onClick={onSignOut} className="sign-out-btn">
                            Sign Out
                        </button>
                    </div>
                </div>
            </header>

            <main className="analytics-grid">
                <section className="portfolio-card">
                    <h2> Your Music Business</h2>
                    <div className="portfolio-summary">
                        <div className="metric-card">
                            <h3>Total Portfolio Value</h3>
                            <span className="value">${dashboardData?.analytics?.portfolioValue}</span>
                            <span className="growth positive">{dashboardData?.analytics?.growthRate}</span>
                        </div>
                        <div className="metric-card">
                            <h3>Monthly Income</h3>
                            <span className="value">${dashboardData?.analytics?.monthlyRevenue}</span>
                        </div>
                        <div className="metric-card">
                            <h3>Tracks in Catalog</h3>
                            <span className="value">{dashboardData?.catalog?.totalTracks}</span>
                        </div>
                        <div className="metric-card">
                            <h3>Growth Status</h3>
                            <span className="value">{dashboardData?.analytics?.riskProfile}</span>
                        </div>
                    </div>
                    
                    <div className="top-performers">
                        <h4> Your Top Earning Tracks</h4>
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

                <section className="spotify-card">
                    <h2> Your Spotify Performance</h2>
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

                <section className="trends-card">
                    <h2> Viral Opportunity Scanner</h2>
                    <div className="trends-overview">
                        <div className="trend-metric">
                            <h4> Ready for Social Media</h4>
                            <div className="platform-readiness">
                                <div className="platform">TikTok: 3 tracks have viral hooks</div>
                                <div className="platform">Instagram: 2 tracks perfect for Reels</div>
                                <div className="platform">YouTube: 4 tracks ready for Shorts</div>
                            </div>
                        </div>
                        
                        <div className="trend-metric">
                            <h4> Market Opportunity</h4>
                            <div className="market-score">
                                Your Genre Heat Score: <strong>75/100</strong>
                            </div>
                            <small>Your style is trending up - perfect time to push!</small>
                        </div>
                    </div>
                </section>

                <section className="recommendations-card">
                    <h2> AI-Powered Artist Recommendations</h2>
                    <p className="rec-intro">Based on your music, fanbase, and market trends:</p>
                    <div className="recommendations-list">
                        {dashboardData?.analytics?.recommendations?.map((rec, index) => (
                            <div key={index} className={`recommendation-card priority-${rec.priority.toLowerCase()}`}>
                                <div className="rec-header">
                                    <span className="priority">{rec.priority} Priority</span>
                                    <span className="timeline">{rec.timeline}</span>
                                    <span className="confidence">AI Confidence: {rec.confidence}</span>
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

            {/* Add this where you want the module to appear */}
            {spotifyConnected && <SpotifyModule />}
        </div>
    );
};

export default Dashboard;