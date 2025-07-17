const API_BASE = process.env.REACT_APP_API_URL || 'https://2h2oj7u446.execute-api.eu-central-1.amazonaws.com/prod';

<<<<<<< HEAD
const API_ENDPOINTS = {
  AUTH_BASE: 'https://y1zthsd7l0.execute-api.eu-central-1.amazonaws.com/prod',
  DASHBOARD_BASE: API_BASE,
  ARTIST_MANAGER_BASE: 'https://0930nh8tai.execute-api.eu-central-1.amazonaws.com/prod/artistmanager',
  TABLES: {
    CATALOG: 'prod-DecodedCatalog-decodedmusic-backend',
    SPOTIFY_INSIGHTS: 'prod-SpotifyInsights-decodedmusic-backend',
    USERS: 'prod-decodedmusic-users',
    SUBSCRIPTIONS: 'prod-decodedmusic-subscriptions',
  },
  ENDPOINTS: {
    login: '/auth/login',
    signup: '/auth/signup',
    subscription: '/subscription',
  },
};

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

=======
>>>>>>> 23d180db33d9b8ccfbbae5c78a31eb4c3edf3d9e
function getToken() {
  return localStorage.getItem('cognito_id_token') || localStorage.getItem('spotify_token');
}

async function fetchWithAuth(url, options = {}) {
  const token = getToken();
  const headers = {
<<<<<<< HEAD
    ...DEFAULT_HEADERS,
    ...(options.headers || {}),
    Authorization: token ? `Bearer ${token}` : '',
=======
    ...(options.headers || {}),
    Authorization: token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json',
>>>>>>> 23d180db33d9b8ccfbbae5c78a31eb4c3edf3d9e
  };
  const res = await fetch(url, { ...options, headers });
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return await res.json();
}

export const DashboardAPI = {
  getAccounting: async ({ artistId }) => {
    const token = window.localStorage.getItem('cognito_id_token');
    const res = await fetch(
<<<<<<< HEAD
      `${API_ENDPOINTS.DASHBOARD_BASE}/accounting?artistId=${artistId}`,
=======
      `${process.env.REACT_APP_DASHBOARD_ACCOUNTING}?artistId=${artistId}`,
>>>>>>> 23d180db33d9b8ccfbbae5c78a31eb4c3edf3d9e
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) throw new Error('Failed to fetch accounting');
    return res.json();
  },

  getAnalytics: (payload) =>
<<<<<<< HEAD
    fetchWithAuth(`${API_ENDPOINTS.DASHBOARD_BASE}/analytics`, {
=======
    fetchWithAuth(`${API_BASE}/analytics`, {
>>>>>>> 23d180db33d9b8ccfbbae5c78a31eb4c3edf3d9e
      method: 'POST',
      body: JSON.stringify(payload),
    }),

<<<<<<< HEAD
  setArtistId: async (artistId) => {
    return await fetchWithAuth(`${API_ENDPOINTS.ARTIST_MANAGER_BASE}/setArtistId`, {
      method: 'POST',
      body: JSON.stringify({ artistId }),
    });
  },

  getArtistData: async (artistId) => {
    return await fetchWithAuth(`${API_ENDPOINTS.ARTIST_MANAGER_BASE}/getArtistData?artistId=${artistId}`);
  },

  checkBackendHealth: async () => {
    const endpoints = [
      { name: 'Set Artist ID API', url: `${API_ENDPOINTS.ARTIST_MANAGER_BASE}/setArtistId` },
      { name: 'Get Artist Data API', url: `${API_ENDPOINTS.ARTIST_MANAGER_BASE}/getArtistData` },
    ];

    const results = [];
    for (const endpoint of endpoints) {
      try {
        await fetchWithAuth(endpoint.url);
        results.push({ name: endpoint.name, status: 'online' });
      } catch (error) {
        results.push({ name: endpoint.name, status: 'offline', error: error.message });
      }
    }
    return results;
  },
=======
  getCampaigns: (payload) =>
    fetchWithAuth(`${API_BASE}/campaigns`, {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  getTeam: (payload) =>
    fetchWithAuth(`${API_BASE}/team`, {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  getStreams: (payload) =>
    fetchWithAuth(`${API_BASE}/streams`, {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  getStatements: (payload) =>
    fetchWithAuth(`${API_BASE}/statements`, {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  getSpotifyData: (payload) =>
    fetchWithAuth(`${API_BASE}/spotify`, {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
>>>>>>> 23d180db33d9b8ccfbbae5c78a31eb4c3edf3d9e
};
