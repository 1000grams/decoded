import React from 'react';
import { getArtistId } from '../state/ArtistManager.js';

export default function CatalogPanel({ user }) {
  // Use artistId in API calls or data-fetching logic
  const artistId = getArtistId();

  return <div>📚 Catalog items for {user?.username || 'Guest'}</div>;
}