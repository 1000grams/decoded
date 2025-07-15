import React from 'react';
import { getArtistId } from '../state/ArtistManager';

const AnalyticsPanel = ({ user }) => {
  // Use artistId in API calls or data-fetching logic
  const artistId = getArtistId();

  return (
    <div>
      <h1>Analytics Panel</h1>
      <p>Welcome, {user ? user.name : 'Guest'}!</p>
      <p>Here you can view your analytics data.</p>
    </div>
  );
};

export default AnalyticsPanel;
