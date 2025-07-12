import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import CognitoLogin from './components/CognitoLogin';
import MarketingPanel from './components/MarketingPanel';
import CatalogPanel from './components/catalog/CatalogPanel';
import AnalyticsPanel from './components/AnalyticsPanel';
import SpotifyModule from './components/SpotifyModule';
import BuzzPage from './pages/BuzzPage';
import ContactForm from './components/ContactForm';
import About from './pages/About';
import MarketingHub from './pages/MarketingHub';

import './App.css';
import './index.css';

const Header = () => {
  const { user, logout } = useAuth();

  return (
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
        <div className="logo" style={{ cursor: 'pointer' }}>
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>🎵</span>
          <span style={{ marginLeft: '0.5rem', fontSize: '1.2rem', fontWeight: 'bold', color: '#ffffff' }}>
            decodedmusic
          </span>
        </div>
        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {user ? (
            <>
              <Link to="/dashboard"><button>📊 Dashboard</button></Link>
              <Link to="/analytics"><button>📈 Analytics</button></Link>
              <Link to="/catalog"><button>🎵 Catalog</button></Link>
              <Link to="/marketing"><button>📈 Marketing</button></Link>
              <Link to="/spotify"><button>🎧 Spotify</button></Link>
              <Link to="/buzz"><button>🐝 Buzz</button></Link>
              <Link to="/marketing-hub"><button>📚 Marketing Hub</button></Link>
              <button onClick={logout}>🚪 Logout</button>
            </>
          ) : (
            <Link to="/login"><button>🔑 Login</button></Link>
          )}
        </nav>
      </div>
    </header>
  );
};

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading DecodedMusic...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/buzz" element={<BuzzPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" replace /> : <CognitoLogin />}
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/catalog"
          element={user ? <CatalogPanel /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/analytics"
          element={user ? <AnalyticsPanel /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/marketing"
          element={user ? <MarketingPanel /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/spotify"
          element={user ? <SpotifyModule /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/marketing-hub"
          element={user ? <MarketingHub /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;