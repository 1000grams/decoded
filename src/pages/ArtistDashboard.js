import React, { useEffect } from 'react';

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_SPOTIFY_REDIRECT_URI || window.location.origin + '/dashboard';
const SCOPES = ['user-read-email'];

function buildAuthUrl() {
  const params = new URLSearchParams({
    client_id: CLIENT_ID || '',
    response_type: 'token',
    redirect_uri: REDIRECT_URI,
    scope: SCOPES.join(' '),
  });
  return `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function ArtistDashboard() {
  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get('access_token');
    if (accessToken) {
      window.localStorage.setItem('spotify_token', accessToken);
      window.location.hash = '';
    }
  }, []);

  const token = window.localStorage.getItem('spotify_token');

  if (!token) {
    return (
      <div style={{ padding: '2rem' }}>
        <h1>Artist Dashboard Login</h1>
        <p>Sign in with Spotify to continue.</p>
        <a href={buildAuthUrl()} style={{ padding: '0.5rem 1rem', background: '#1DB954', color: '#fff', borderRadius: '4px' }}>
          Log in with Spotify
        </a>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Artist Dashboard</h1>
      <p>You are logged in with Spotify.</p>
    </div>
  );
}

export default ArtistDashboard;
