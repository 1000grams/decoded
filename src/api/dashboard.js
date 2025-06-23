const API_BASE = process.env.REACT_APP_API_BASE;
const ANALYTICS_URL =
  process.env.REACT_APP_ANALYTICS_API_URL || `${API_BASE}/analytics`;

export const DashboardAPI = {
  getAccounting: (payload) =>
    fetch(`${API_BASE}/accounting`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then((res) => res.json()),

  getAnalytics: (payload) =>
    fetch(ANALYTICS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then((res) => res.json()),

  getCampaigns: (payload) =>
    fetch(`${API_BASE}/campaigns`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then((res) => res.json()),

  getTeam: (payload) =>
    fetch(`${API_BASE}/team`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then((res) => res.json()),

  getStreams: (payload) =>
    fetch(`${API_BASE}/streams`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then((res) => res.json()),

  getStatements: (payload) =>
    fetch(`${API_BASE}/statements`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then((res) => res.json()),

  getSpotifyData: (payload) =>
    fetch(`${API_BASE}/spotify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then((res) => res.json()),
};
