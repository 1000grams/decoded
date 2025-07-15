import React from 'react';
import { getArtistId } from '../state/ArtistManager';

export default function AnalyticsPanel({ user }) {
  // Use artistId in API calls or data-fetching logic
  const artistId = getArtistId();

  return <div>📊 Analytics for {user?.username || 'Guest'}</div>;
}