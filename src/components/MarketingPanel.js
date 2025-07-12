import React from 'react';

const MarketingPanel = ({ user }) => {
  return (
    <div>
      <h1>Marketing Panel</h1>
      <p>Welcome, {user ? user.name : 'Guest'}!</p>
      <p>Here you can view your marketing data.</p>
    </div>
  );
};

export default MarketingPanel;
