import React, { useEffect, useState } from 'react';
import { DashboardAPI } from '../api/apiconfig.js';
import { getCognitoTokenFromUrl } from '../utils/getCognitoToken.js';
import SpotifyModule from '../components/SpotifyModule.js';
import LogoutButton from '../components/LogoutButton.jsx';

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_SPOTIFY_REDIRECT_URI ||
  window.location.origin + '/dashboard';
const SCOPES = ['user-read-private', 'user-read-email'];
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';

const buildAuthUrl = () => {
  return `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${SCOPES.join('%20')}&response_type=code&show_dialog=true`;
};

function ArtistDashboard() {
  const [accounting, setAccounting] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = getCognitoTokenFromUrl();
    if (token) {
      DashboardAPI.getAccounting({ artistId: 'RueDeVivre' })
        .then((data) => setAccounting(data))
        .catch((err) => setError(err.message));
    }
  }, []);

  const spotifyToken = window.localStorage.getItem('spotify_token');
  const cognitoToken = window.localStorage.getItem('cognito_id_token');
  const token = spotifyToken || cognitoToken;

  if (!token) {
    const loginUrl = buildAuthUrl();
    return (
      <div style={{ padding: '2rem' }}>
        <h1>Artist Dashboard Login</h1>
        <button onClick={() => window.location.href = loginUrl} style={{ padding: '0.5rem 1rem', background: '#1db954', color: '#fff', borderRadius: '4px', marginRight: '0.5rem', border: 'none', cursor: 'pointer' }}>
          Log in with Spotify
        </button>
        <a href="/signin" style={{ padding: '0.5rem 1rem', background: '#2563eb', color: '#fff', borderRadius: '4px', textDecoration: 'none' }}>
          Sign in with Email
        </a>
        {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', display: 'flex', gap: '1rem' }}>
      <div style={{ flex: '0 0 280px' }}>
        <SpotifyModule />
      </div>
      <div style={{ flex: 1 }}>
        <h1>Artist Dashboard</h1>
        <p>You are logged in.</p>
        <LogoutButton />
        {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
        {accounting ? (
          <div style={{ marginTop: '1rem' }}>
            <div>Total Revenue: {(accounting.totalRevenue / 100).toFixed(2)}</div>
            <div>Total Expenses: {(accounting.totalExpenses / 100).toFixed(2)}</div>
            <div>Net Revenue: {(accounting.netRevenue / 100).toFixed(2)}</div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default ArtistDashboard;
