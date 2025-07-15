import React, { useEffect, useState } from 'react';
import { DashboardAPI } from '../api/dashboard';

function Accounting() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    async function fetchAccounting() {
      try {
        const data = await DashboardAPI.getAccounting({ artistId: 'RueDeVivre' });
        setSummary(data);
      } catch (err) {
        console.error('fetch accounting error', err);
      }
    }
    fetchAccounting();
  }, []);

  const downloadCsv = () => {
    window.location.href = `${DashboardAPI.API_ENDPOINTS.DASHBOARD_BASE}/accounting/export?artist_id=RueDeVivre`;
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Accounting</h1>
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
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}

export default Accounting;
