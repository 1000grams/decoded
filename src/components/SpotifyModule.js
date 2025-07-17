import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import { getArtistId } from '../state/ArtistManager.js'; // Added .js extension for strict module resolution

function SpotifyModule() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSpotify() {
      const artistId = getArtistId(); // Get the current artist ID
      const token = localStorage.getItem('cognito_id_token');
      
      if (!token) {
        setError('No authentication token found');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/artist?artistId=${artistId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Spotify fetch failed: ${text}`);
        }
        const spotifyData = await response.json();
        setData(spotifyData);
      } catch (err) {
        console.error('spotify fetch error', err);
        setError(err.message);
      } finally {
        setLoading(false);
=======
import { DashboardAPI } from '../api/dashboard.js';

function SpotifyModule() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchSpotify() {
      try {
        const res = await DashboardAPI.getSpotifyData({ artistId: 'RueDeVivre' });
        setData(res);
      } catch (err) {
        console.error('spotify fetch error', err);
>>>>>>> 23d180db33d9b8ccfbbae5c78a31eb4c3edf3d9e
      }
    }
    fetchSpotify();
  }, []);

<<<<<<< HEAD
  if (loading) {
    return <div style={{ border: '1px solid #ccc', padding: '1rem' }}>Loading Spotify data...</div>;
  }

  if (error) {
    return (
      <div style={{ border: '1px solid #ccc', padding: '1rem' }}>
        <h2>Spotify Profile</h2>
        <div style={{ color: 'red' }}>Error: {error}</div>
      </div>
    );
  }

=======
  if (!data) {
    return <div style={{ border: '1px solid #ccc', padding: '1rem' }}>Loading Spotify data...</div>;
  }

>>>>>>> 23d180db33d9b8ccfbbae5c78a31eb4c3edf3d9e
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem' }}>
      <h2>Spotify Profile</h2>
      <div>{data.name}</div>
      <div>Followers: {data.followers}</div>
      <div>Popularity: {data.popularity}</div>
      {Array.isArray(data.top_tracks) && (
        <div>
          <h3>Top Tracks</h3>
          <ul>
            {data.top_tracks.map(t => (
              <li key={t.id}>{t.name}</li>
            ))}
          </ul>
        </div>
      )}
      {Array.isArray(data.trending) && (
        <div>
          <h3>Trending</h3>
          <ul>
            {data.trending.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SpotifyModule;
