import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.js';

import CatalogService from './services/CatalogService.js';
import AnalyticsService from './services/AnalyticsService.js';
import SpotifyService from './services/SpotifyService.js';

import LandingPage from './components/LandingPage.js';
import MarketingPanel from './components/MarketingPanel.jsx';
import CatalogPanel from './components/catalog/CatalogPanel.jsx';
import AnalyticsPanel from './components/AnalyticsPanel.jsx'; // Corrected file extension
import BuzzPage from './pages/BuzzPage.js'; // Added .js extension for strict module resolution
import MarketingHub from './pages/MarketingHub.jsx';
import PrivateRoute from './components/PrivateRoute.jsx'; // Corrected file extension
import SpotifyModule from './components/SpotifyModule.js';
import ArtistDashboard from './pages/ArtistDashboard.js';

import { getArtistId } from './state/ArtistManager.js';

import './index.css';
import './App.css';

const clientId = '5pb29tja8gkqm3jb43oimd5qjt';
const redirectUri = 'https://decodedmusic.com/dashboard';
const cognitoDomain = 'https://auth.decodedmusic.com';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

function AppContent() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const artistId = getArtistId(user.id);
          await CatalogService.getCatalog(artistId);
          await AnalyticsService.getUserAnalytics(artistId);
          await SpotifyService.getUserPlaylists(artistId);
        } catch (error) {
          console.error('Error fetching artist data:', error);
        }
      }
    };
    fetchData();
  }, [user]);

  if (loading) return <div className="loading">Loading DecodedMusic...</div>;

  return (
    <div className="App">
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: 'rgba(0,0,0,0.95)',
        backdropFilter: 'blur(15px)',
        borderBottom: '1px solid rgba(0, 255, 136, 0.2)',
        padding: '1rem 2rem'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <img src="/path-to-logo/logo.png" alt="DecodedMusic Logo" style={{ height: '40px', marginRight: '0.5rem' }} />
            <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#ffffff' }}>
              decodedmusic
            </span>
          </div>

          <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            {user && (
              <>
                <button 
                  onClick={() => navigate('/dashboard')}
                  style={{
                    background: location.pathname === '/dashboard' ? 'rgba(0,255,136,0.2)' : 'transparent',
                    border: 'none',
                    color: '#fff',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    cursor: 'pointer'
                  }}
                >
                  📊 Dashboard
                </button>
                <button 
                  onClick={() => navigate('/analytics')}
                  style={{
                    background: location.pathname === '/analytics' ? 'rgba(0,255,136,0.2)' : 'transparent',
                    border: 'none',
                    color: '#fff',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    cursor: 'pointer'
                  }}
                >
                  📈 Analytics
                </button>
                <button 
                  onClick={() => navigate('/catalog')}
                  style={{
                    background: location.pathname === '/catalog' ? 'rgba(0,255,136,0.2)' : 'transparent',
                    border: 'none',
                    color: '#fff',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    cursor: 'pointer'
                  }}
                >
                  🎵 Catalog
                </button>
              </>
            )}

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              {user ? (
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <span style={{ color: '#00ff88' }}>
                    Welcome, {user.name}
                  </span>
                  <button 
                    onClick={() => navigate('/logout')} 
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      color: '#fff',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.5rem',
                      cursor: 'pointer'
                    }}
                  >
                    🚪 Logout
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => window.location.href = `${cognitoDomain}/login?client_id=${clientId}&response_type=code&scope=openid+email+profile&redirect_uri=${redirectUri}`} 
                  style={{
                    background: 'linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)',
                    border: 'none',
                    color: '#000',
                    padding: '0.5rem 1.5rem',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  🔑 Login
                </button>
              )}
            </div>
          </nav>
        </div>
      </header>

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/buzz" element={<BuzzPage />} />
        <Route path="/login" element={<Navigate to={`${cognitoDomain}/login?client_id=${clientId}&response_type=code&scope=openid+email+profile&redirect_uri=${redirectUri}`} replace />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<PrivateRoute><ArtistDashboard /></PrivateRoute>} />
        <Route path="/marketing" element={<PrivateRoute><MarketingPanel user={user} /></PrivateRoute>} />
        <Route path="/catalog" element={<PrivateRoute><CatalogPanel /></PrivateRoute>} />
        <Route path="/analytics" element={<PrivateRoute><AnalyticsPanel user={user} /></PrivateRoute>} />
        <Route path="/marketing-hub" element={<PrivateRoute><MarketingHub user={user} /></PrivateRoute>} />
        <Route path="/spotify" element={<PrivateRoute><SpotifyModule user={user} /></PrivateRoute>} />
        
      </Routes>
    </div>
  );
}

export default App;
