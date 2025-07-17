import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import CatalogService from './services/CatalogService';
import AnalyticsService from './services/AnalyticsService';
import SpotifyService from './services/SpotifyService';
import './index.css';

// Header Component with real authentication
const Header = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await login(loginForm.email, loginForm.password);
      setShowLoginModal(false);
      setLoginForm({ email: '', password: '' });
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
          
          {/* FIXED: Added proper closing </nav> tag */}
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
                    onClick={onLogout} 
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
            
            {error && (
              <div style={{
                background: 'rgba(255,0,0,0.1)',
                border: '1px solid rgba(255,0,0,0.3)',
                color: '#ff6b6b',
                padding: '1rem',
                borderRadius: '0.5rem',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                {error}
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
                disabled={loading}
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
                disabled={loading}
              />
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button 
                  type="submit" 
                  disabled={loading}
                  style={{
                    flex: 1,
                    background: loading ? 'rgba(0,255,136,0.5)' : 'linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)',
                    border: 'none',
                    color: '#000',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  {loading ? '🔄 Logging in...' : '🚀 Login'}
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowLoginModal(false)} 
                  disabled={loading}
                  style={{
                    flex: 1,
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    color: '#fff',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    cursor: loading ? 'not-allowed' : 'pointer'
                  }}
                >
                  ❌ Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

// Homepage Component - FIXED: Only hero video, no demo section
const Homepage = () => {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)'
    }}>
      
      {/* Background Video - ONLY in hero section */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        opacity: 0.4
      }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        >
          <source src="/p1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Dark overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.6)',
        zIndex: 2
      }}></div>

      {/* Hero Content */}
      <div style={{ 
        maxWidth: '900px', 
        position: 'relative', 
        zIndex: 3,
        padding: '2rem'
      }}>
        <h1 style={{ 
          fontSize: '4.5rem', 
          margin: '0 0 1.5rem 0',
          background: 'linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold'
        }}>
          🎵 Welcome to decodedmusic
        </h1>
        <p style={{ 
          fontSize: '1.8rem', 
          margin: '0 0 2rem 0', 
          opacity: 0.95,
          color: '#ffffff',
          fontWeight: '500'
        }}>
          The platform created by artists, for artists
        </p>
        <p style={{ 
          fontSize: '1.2rem', 
          margin: '0 auto 3rem auto',
          opacity: 0.8,
          color: '#ffffff',
          maxWidth: '600px'
        }}>
          Track your music analytics, manage your catalog, and grow your audience 
          with real-time insights from Spotify, Apple Music, and more.
        </p>
      </div>
    </section>
  );
};

// Dashboard Component with REAL backend connections
const Dashboard = ({ user }) => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    catalog: null,
    spotify: null,
    analytics: null,
    accounting: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch REAL data from your AWS backend
        const [catalogData, spotifyData, analyticsData] = await Promise.all([
          CatalogService.getRealCatalog('ruedevivre'),
          SpotifyService.getRealSpotifyData('ruedevivre'),
          AnalyticsService.getRealAnalytics('ruedevivre')
        ]);
        
        setDashboardData({
          catalog: catalogData,
          spotify: spotifyData,
          analytics: analyticsData
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to load dashboard data from AWS backend');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '70vh',
        color: '#fff',
        fontSize: '1.2rem'
      }}>
        🔄 Loading dashboard from AWS backend...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '70vh',
        color: '#ff6b6b',
        fontSize: '1.2rem',
        textAlign: 'center'
      }}>
        ❌ {error}
        <p style={{ fontSize: '1rem', marginTop: '1rem', color: '#fff' }}>
          Check AWS API Gateway endpoints and DynamoDB tables
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '3rem', margin: '0 0 2rem 0', color: '#fff' }}>
        📊 Dashboard - Rue de Vivre
      </h1>
      
      {/* Real Analytics Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
        margin: '3rem 0'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '2rem',
          borderRadius: '1rem',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h3 style={{ color: '#00ff88', fontSize: '2.5rem', margin: '0 0 0.5rem 0' }}>
            {dashboardData.catalog?.totalTracks || 0}
          </h3>
          <p style={{ color: '#fff', margin: 0 }}>Catalog Tracks</p>
        </div>
        
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '2rem',
          borderRadius: '1rem',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h3 style={{ color: '#00ff88', fontSize: '2.5rem', margin: '0 0 0.5rem 0' }}>
            {dashboardData.spotify?.followers || 0}
          </h3>
          <p style={{ color: '#fff', margin: 0 }}>Spotify Followers</p>
        </div>
        
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '2rem',
          borderRadius: '1rem',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h3 style={{ color: '#00ff88', fontSize: '2.5rem', margin: '0 0 0.5rem 0' }}>
            {dashboardData.analytics?.totalStreams || 0}
          </h3>
          <p style={{ color: '#fff', margin: 0 }}>Total Streams</p>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        margin: '3rem 0'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '2rem',
          borderRadius: '1rem',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h3 style={{ color: '#00ff88', margin: '0 0 1rem 0' }}>📈 Analytics</h3>
          <p style={{ color: '#fff', margin: '0 0 1rem 0' }}>
            View detailed streaming analytics and performance metrics
          </p>
          <button 
            onClick={() => navigate('/analytics')}
            style={{
              background: 'linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)',
              border: 'none',
              color: '#000',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            View Analytics
          </button>
        </div>
        
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '2rem',
          borderRadius: '1rem',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h3 style={{ color: '#00ff88', margin: '0 0 1rem 0' }}>🎵 Catalog</h3>
          <p style={{ color: '#fff', margin: '0 0 1rem 0' }}>
            Manage your music catalog and track performance
          </p>
          <button 
            onClick={() => navigate('/catalog')}
            style={{
              background: 'linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)',
              border: 'none',
              color: '#000',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            View Catalog
          </button>
        </div>
      </div>
    </div>
  );
};

// Analytics Page Component
const AnalyticsPage = ({ user }) => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await AnalyticsService.getDetailedAnalytics('ruedevivre');
        setAnalyticsData(data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchAnalytics();
    }
  }, [user]);

  if (loading) {
    return <div style={{ padding: '6rem 2rem', textAlign: 'center', color: '#fff' }}>
      🔄 Loading analytics from AWS...
    </div>;
  }

  return (
    <div style={{ padding: '6rem 2rem 2rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '3rem', margin: '0 0 2rem 0', color: '#fff' }}>
        📈 Analytics - Rue de Vivre
      </h1>
      
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        padding: '2rem',
        borderRadius: '1rem',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <h2 style={{ color: '#00ff88', margin: '0 0 1rem 0' }}>
          🎧 Spotify Analytics
        </h2>
        <p style={{ color: '#fff', margin: 0 }}>
          Detailed streaming data and audience insights coming from AWS DynamoDB
        </p>
      </div>
    </div>
  );
};

// Catalog Page Component
const CatalogPage = ({ user }) => {
  const [catalogData, setCatalogData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const data = await CatalogService.getDetailedCatalog('ruedevivre');
        setCatalogData(data);
      } catch (error) {
        console.error('Error fetching catalog:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchCatalog();
    }
  }, [user]);

  if (loading) {
    return <div style={{ padding: '6rem 2rem', textAlign: 'center', color: '#fff' }}>
      🔄 Loading catalog from AWS...
    </div>;
  }

  return (
    <div style={{ padding: '6rem 2rem 2rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '3rem', margin: '0 0 2rem 0', color: '#fff' }}>
        🎵 Catalog - Rue de Vivre
      </h1>
      
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        padding: '2rem',
        borderRadius: '1rem',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <h2 style={{ color: '#00ff88', margin: '0 0 1rem 0' }}>
          🎶 Music Catalog
        </h2>
        <p style={{ color: '#fff', margin: 0 }}>
          Complete track listing from DynamoDB catalog table
        </p>
      </div>
    </div>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children, user }) => {
  return user ? children : <Navigate to="/" replace />;
};

// Main App Component with Router
function App() {
  const { user, loading, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: '#0a0a0a',
        color: '#fff',
        fontSize: '1.5rem'
      }}>
        🔄 Loading...
      </div>
    );
  }

  return (
    <Router>
      <div style={{ 
        fontFamily: "'Inter', 'Helvetica Neue', 'Arial', sans-serif",
        margin: 0,
        padding: 0,
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
        color: '#ffffff'
      }}>
        <Header user={user} onLogout={handleLogout} />
        
        <main style={{ paddingTop: user ? '80px' : '0' }}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute user={user}>
                  <Dashboard user={user} />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/analytics" 
              element={
                <ProtectedRoute user={user}>
                  <AnalyticsPage user={user} />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/catalog" 
              element={
                <ProtectedRoute user={user}>
                  <CatalogPage user={user} />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;