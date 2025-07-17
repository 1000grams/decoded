<<<<<<< HEAD
﻿import React, { useEffect, useState } from 'react';
import { DashboardAPI } from '../api/dashboard';
import { getArtistId, getArtistName } from '../state/ArtistManager.js';

function Accounting() {
  const [summary, setSummary] = useState(null);
  const [artistId, setArtistId] = useState(null);
  const [artistName, setArtistName] = useState(null);
=======
import React, { useEffect, useState } from 'react';
import { DashboardAPI } from '../api/dashboard';

const API_BASE = process.env.REACT_APP_API_BASE || '/api/dashboard';

function Accounting() {
  const [summary, setSummary] = useState(null);
>>>>>>> 23d180db33d9b8ccfbbae5c78a31eb4c3edf3d9e

  useEffect(() => {
    async function fetchAccounting() {
      try {
<<<<<<< HEAD
        const id = getArtistId();
        const name = getArtistName();
        setArtistId(id);
        setArtistName(name);

        const data = await DashboardAPI.getAccounting({ artistId: id });
=======
        const data = await DashboardAPI.getAccounting({ artistId: 'RueDeVivre' });
>>>>>>> 23d180db33d9b8ccfbbae5c78a31eb4c3edf3d9e
        setSummary(data);
      } catch (err) {
        console.error('fetch accounting error', err);
      }
    }
    fetchAccounting();
  }, []);

  const downloadCsv = () => {
<<<<<<< HEAD
    window.location.href = `${DashboardAPI.API_ENDPOINTS.DASHBOARD_BASE}/accounting/export?artist_id=${artistId}`;
=======
    window.location.href = `${API_BASE}/accounting/export?artist_id=RueDeVivre`;
>>>>>>> 23d180db33d9b8ccfbbae5c78a31eb4c3edf3d9e
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Accounting</h1>
<<<<<<< HEAD
      <h2>Artist: {artistName || 'Unknown Artist'}</h2>
=======
>>>>>>> 23d180db33d9b8ccfbbae5c78a31eb4c3edf3d9e
      <div style={{ margin: '1rem 0' }}>
        <button
          onClick={downloadCsv}
          style={{ padding: '0.5rem 1rem', background: '#32C1ED', color: '#fff', border: 'none', borderRadius: 4 }}>
          Download CSV
        </button>
      </div>
      <div style={{ border: '1px solid #ccc', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {summary ? (
          <div>
            <div>Total Revenue: ${(summary.totalRevenue / 100).toFixed(2)}</div>
            <div>Total Expenses: ${(summary.totalExpenses / 100).toFixed(2)}</div>
            <div>Net Revenue: ${(summary.netRevenue / 100).toFixed(2)}</div>
          </div>
        ) : (
<<<<<<< HEAD
          <div>Loading...</div>
=======
          <svg width="300" height="150">
            <rect x="10" y="50" width="40" height="80" fill="#32C1ED" />
            <rect x="70" y="30" width="40" height="100" fill="#32C1ED" />
            <rect x="130" y="70" width="40" height="60" fill="#32C1ED" />
          </svg>
>>>>>>> 23d180db33d9b8ccfbbae5c78a31eb4c3edf3d9e
        )}
      </div>
    </div>
  );
}

export default Accounting;
