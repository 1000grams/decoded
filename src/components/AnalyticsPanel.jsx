import React from 'react';

export default function AnalyticsPanel({ user }) {
  return <div>📊 Analytics for {user?.username || 'Guest'}</div>;
}