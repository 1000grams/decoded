import React, { useEffect, useState } from 'react';
import { getArtistId, REACT_APP_BACKEND_API_URL } from '../state/ArtistManager.js';
import axios from 'axios';

export default function MarketingPanel({ user }) {
  const artistId = getArtistId();
  const [trendData, setTrendData] = useState(null);

  useEffect(() => {
    const fetchTrendData = async () => {
      try {
        const response = await axios.get(`${REACT_APP_BACKEND_API_URL}/spotify-data`, {
          params: { artistId },
        });
        setTrendData(response.data);
      } catch (error) {
        console.error('Error fetching trend prediction data:', error.message);
      }
    };

    fetchTrendData();
  }, [artistId]);

  return (
    <div>
      <h1>👋 Marketing data for {user?.username || 'Guest'}</h1>
      <h2>Trend Predictions:</h2>
      <pre>{trendData ? JSON.stringify(trendData, null, 2) : 'Loading trend data...'}</pre>
    </div>
  );
}