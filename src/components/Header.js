mport React, { useState } from 'react';

const Header = ({ user, onLogin, onLogout }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });
      const data = await response.json();
      if (data.success) {
        onLogin(data.user, data.token);
        setShowLoginModal(false);
        setLoginForm({ email: '', password: '' });
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupForm)
      });
      const data = await response.json();
      if (data.success) {
        onLogin(data.user, 'new-user-token');
        setShowSignupModal(false);
        setSignupForm({ name: '', email: '', password: '' });
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <>
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
            <h1 style={{ margin: 0, color: '#4ade80', fontSize: '24px' }}> decodedmusic</h1>
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
                }}>Logout</button>
              </div>
            ) : (
              <>
                <button onClick={() => setShowLoginModal(true)} style={{
                  background: 'transparent',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.3)',
                  padding: '8px 20px',
                  borderRadius: '20px',
                  cursor: 'pointer'
                }}>Login</button>
                <button onClick={() => setShowSignupModal(true)} style={{
                  background: 'linear-gradient(135deg, #4ade80, #22d3ee)',
                  color: 'white',
                  border: 'none',
                  padding: '8px 20px',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}>Start Creating</button>
              </>
            )}
          </div>
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
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2000
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '40px',
            borderRadius: '20px',
            width: '400px',
            maxWidth: '90vw'
          }}>
            <h2 style={{ color: 'white', marginBottom: '30px', textAlign: 'center' }}>Login to decodedmusic</h2>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                style={{
                  width: '100%',
                  padding: '15px',
                  margin: '10px 0',
                  borderRadius: '10px',
                  border: 'none',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                style={{
                  width: '100%',
                  padding: '15px',
                  margin: '10px 0',
                  borderRadius: '10px',
                  border: 'none',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
                required
              />
              <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                <button type="submit" style={{
                  flex: 1,
                  background: '#4ade80',
                  color: 'white',
                  border: 'none',
                  padding: '15px',
                  borderRadius: '10px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}>Login</button>
                <button type="button" onClick={() => setShowLoginModal(false)} style={{
                  flex: 1,
                  background: 'transparent',
                  color: 'white',
                  border: '1px solid white',
                  padding: '15px',
                  borderRadius: '10px',
                  fontSize: '16px',
                  cursor: 'pointer'
                }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignupModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2000
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '40px',
            borderRadius: '20px',
            width: '400px',
            maxWidth: '90vw'
          }}>
            <h2 style={{ color: 'white', marginBottom: '30px', textAlign: 'center' }}>Join decodedmusic</h2>
            <form onSubmit={handleSignup}>
              <input
                type="text"
                placeholder="Artist Name"
                value={signupForm.name}
                onChange={(e) => setSignupForm({...signupForm, name: e.target.value})}
                style={{
                  width: '100%',
                  padding: '15px',
                  margin: '10px 0',
                  borderRadius: '10px',
                  border: 'none',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={signupForm.email}
                onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
                style={{
                  width: '100%',
                  padding: '15px',
                  margin: '10px 0',
                  borderRadius: '10px',
                  border: 'none',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={signupForm.password}
                onChange={(e) => setSignupForm({...signupForm, password: e.target.value})}
                style={{
                  width: '100%',
                  padding: '15px',
                  margin: '10px 0',
                  borderRadius: '10px',
                  border: 'none',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
                required
              />
              <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                <button type="submit" style={{
                  flex: 1,
                  background: '#4ade80',
                  color: 'white',
                  border: 'none',
                  padding: '15px',
                  borderRadius: '10px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}>Create Account</button>
                <button type="button" onClick={() => setShowSignupModal(false)} style={{
                  flex: 1,
                  background: 'transparent',
                  color: 'white',
                  border: '1px solid white',
                  padding: '15px',
                  borderRadius: '10px',
                  fontSize: '16px',
                  cursor: 'pointer'
                }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;