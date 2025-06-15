import React from 'react';

function Accounting() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Accounting</h1>
      <div style={{ margin: '1rem 0' }}>
        <button style={{ padding: '0.5rem 1rem', background: '#32C1ED', color: '#fff', border: 'none', borderRadius: 4 }}>
          Download CSV
        </button>
      </div>
      <div style={{ border: '1px solid #ccc', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="300" height="150">
          <rect x="10" y="50" width="40" height="80" fill="#32C1ED" />
          <rect x="70" y="30" width="40" height="100" fill="#32C1ED" />
          <rect x="130" y="70" width="40" height="60" fill="#32C1ED" />
        </svg>
      </div>
    </div>
  );
}

export default Accounting;
