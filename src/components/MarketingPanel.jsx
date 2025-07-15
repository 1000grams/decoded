import React, { useEffect, useState } from 'react';
import { getArtistId } from '../state/ArtistManager';
import axios from 'axios';

export default function MarketingPanel({ user }) {
  const artistId = getArtistId();
  const [trendData, setTrendData] = useState(null);

  useEffect(() => {
    const fetchTrendData = async () => {
      try {
        const response = await axios.get('https://6msaiqit9j.execute-api.us-east-1.amazonaws.com/DecodedMusicBackend', {
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