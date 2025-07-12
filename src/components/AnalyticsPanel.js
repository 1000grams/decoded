import React from 'react';

const AnalyticsPanel = ({ user }) => {
  return (
    <div>
      <h1>Analytics Panel</h1>
      <p>Welcome, {user ? user.name : 'Guest'}!</p>
      <p>Here you can view your analytics data.</p>
    </div>
  );
};

export default AnalyticsPanel;
