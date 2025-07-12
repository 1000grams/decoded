import React from 'react';

const Header = ({ user, onLogout }) => {
  const clientId = '5pb29tja8gkqm3jb43oimd5qjt';
  const redirectUri = 'https://decodedmusic.com/dashboard';
  const cognitoDomain = 'https://auth.decodedmusic.com';

  const loginUrl = `${cognitoDomain}/login?client_id=${clientId}&response_type=code&scope=openid+email+profile&redirect_uri=${redirectUri}`;
  const signupUrl = `${cognitoDomain}/signup?client_id=${clientId}&response_type=code&scope=openid+email+profile&redirect_uri=${redirectUri}`;

  return (
    <header style={{
      background: 'rgba(0,0,0,0.9)',
      padding: '15px 20px',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255,255,255,0.1)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <h1 style={{ margin: 0, color: '#4ade80', fontSize: '24px' }}>decodedmusic</h1>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>Created by artist, for artists</span>
        </div>

        <nav style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <a href="#dashboard" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>Dashboard</a>
          <a href="#analytics" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>Analytics</a>
          <a href="#uploads" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>Uploads</a>
          <a href="#pricing" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>Pricing</a>
        </nav>

        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          {user ? (
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <span style={{ color: '#4ade80' }}>Welcome, {user.name || user.email}</span>
              <button onClick={onLogout} style={{
                background: 'rgba(239, 68, 68, 0.2)',
                color: 'white',
                border: '1px solid #ef4444',
                padding: '8px 16px',
                borderRadius: '20px',
                cursor: 'pointer'
              }}>
                Logout
              </button>
            </div>
          ) : (
            <>
              <button onClick={() => window.location.href = loginUrl} style={{
                background: 'transparent',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                padding: '8px 20px',
                borderRadius: '20px',
                cursor: 'pointer'
              }}>
                Login
              </button>
              <button onClick={() => window.location.href = signupUrl} style={{
                background: 'linear-gradient(135deg, #4ade80, #22d3ee)',
                color: 'white',
                border: 'none',
                padding: '8px 20px',
                borderRadius: '20px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}>
                Start Creating
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
