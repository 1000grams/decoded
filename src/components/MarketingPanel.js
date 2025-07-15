import React from 'react';
import { getArtistId } from '../state/ArtistManager';

const MarketingPanel = ({ user }) => {
  // Use artistId in API calls or data-fetching logic
  const artistId = getArtistId();

  return (
    <div>
      <h1>Marketing Panel</h1>
      <p>Welcome, {user ? user.name : 'Guest'}!</p>
      <p>Here you can view your marketing data.</p>
    </div>
  );
};

export default MarketingPanel;
