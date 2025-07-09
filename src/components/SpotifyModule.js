import React, { useEffect, useState } from 'react';

function SpotifyModule() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSpotify() {
      const token = localStorage.getItem('cognito_id_token');
      
      if (!token) {
        setError('No authentication token found');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/spotify`, {
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
        
        // Fallback data for demo purposes
        const fallbackData = {
          name: 'Demo Artist',
          followers: 1000,
          popularity: 75,
          top_tracks: [
            { id: '1', name: 'Demo Track 1' },
            { id: '2', name: 'Demo Track 2' },
          ],
          trending: ['Indie Pop', 'Alternative Rock'],
        };
        setData(fallbackData);
      } finally {
        setLoading(false);
      }
    }
    fetchSpotify();
  }, []);

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
