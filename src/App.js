import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'; // From AuthContext.js

import CatalogService from './services/CatalogService';
import AnalyticsService from './services/AnalyticsService';
import SpotifyService from './services/SpotifyService.js';

import LandingPage from './components/LandingPage.js';
import Dashboard from './components/Dashboard.js';
import CognitoLogin from './components/CognitoLogin.js';
import MarketingPanel from './components/MarketingPanel.jsx';
import CatalogPanel from './components/catalog/CatalogPanel.jsx';
import AnalyticsPanel from './components/AnalyticsPanel.jsx';
import BuzzPage from './pages/BuzzPage';
import MarketingHub from './pages/MarketingHub.jsx';
import PrivateRoute from './components/PrivateRoute';
import SpotifyModule from './components/SpotifyModule.js';

import './index.css';
import './App.css';

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
  const { user, login, logout, authorized, loading } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          await CatalogService.getUserCatalog(user.id);
          await AnalyticsService.getUserAnalytics(user.id);
          await SpotifyService.getUserPlaylists(user.id);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
    fetchData();
  }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);

    try {
      const userObj = { email: loginForm.email };
      await login(userObj);
      setShowLoginModal(false);
      setLoginForm({ email: '', password: '' });
      navigate('/dashboard');
    } catch (err) {
      setLoginError('Login failed');
    } finally {
      setLoginLoading(false);
    }
  };

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
          <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>🎵</span>
            <span style={{ marginLeft: '0.5rem', fontSize: '1.2rem', fontWeight: 'bold', color: '#ffffff' }}>
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
                    onClick={logout} 
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
                  onClick={() => setShowLoginModal(true)} 
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

      {/* Login Modal */}
      {showLoginModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.9)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2000
        }}>
          <div style={{
            background: '#1a1a1a',
            padding: '2rem',
            borderRadius: '1rem',
            width: '400px',
            maxWidth: '90vw',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#fff' }}>
              🔑 Login to decodedmusic
            </h2>

            {loginError && (
              <div style={{
                background: 'rgba(255,0,0,0.1)',
                border: '1px solid rgba(255,0,0,0.3)',
                color: '#ff6b6b',
                padding: '1rem',
                borderRadius: '0.5rem',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="✉️ Email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  marginBottom: '1rem',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: '0.5rem',
                  color: '#fff',
                  boxSizing: 'border-box'
                }}
                required
                disabled={loginLoading}
              />
              <input
                type="password"
                placeholder="🔒 Password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  marginBottom: '2rem',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: '0.5rem',
                  color: '#fff',
                  boxSizing: 'border-box'
                }}
                required
                disabled={loginLoading}
              />
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button 
                  type="submit" 
                  disabled={loginLoading}
                  style={{
                    flex: 1,
                    background: loginLoading ? 'rgba(0,255,136,0.5)' : 'linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)',
                    border: 'none',
                    color: '#000',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    cursor: loginLoading ? 'not-allowed' : 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  {loginLoading ? '🔄 Logging in...' : '🚀 Login'}
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowLoginModal(false)} 
                  disabled={loginLoading}
                  style={{
                    flex: 1,
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    color: '#fff',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    cursor: loginLoading ? 'not-allowed' : 'pointer'
                  }}
                >
                  ❌ Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/buzz" element={
          <div>
            <h1>Testing Buzz Page</h1>
            <BuzzPage />
          </div>
        } />
        <Route path="/login" element={!user ? <CognitoLogin /> : <Navigate to="/dashboard" replace />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/marketing"
          element={
            <PrivateRoute>
              <MarketingPanel user={user} />
            </PrivateRoute>
          }
        />
        <Route
          path="/catalog"
          element={
            <PrivateRoute>
              <CatalogPanel />
            </PrivateRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <PrivateRoute>
              <AnalyticsPanel user={user} />
            </PrivateRoute>
          }
        />
        <Route
          path="/marketing-hub"
          element={
            <PrivateRoute>
              <MarketingHub user={user} />
            </PrivateRoute>
          }
        />
        <Route
          path="/spotify"
          element={
            <PrivateRoute>
              <SpotifyModule user={user} />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/buzz" replace />} />
      </Routes>
    </div>
  );
}

export default App;
