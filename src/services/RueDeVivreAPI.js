// Rue de Vivre Analytics API Service
class RueDeVivreAPI {
  constructor() {
    this.baseURL = 'https://0930nh8tai.execute-api.eu-central-1.amazonaws.com/prod/artistmanager';
  }

  async makeRequest(endpoint, options = {}) {
    const token = localStorage.getItem('cognito_access_token') || localStorage.getItem('decodedmusic_user');

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`RueDeVivre API Error (${endpoint}):`, error);
      throw error;
    }
  }

  async setArtistId(artistId) {
    try {
      return await this.makeRequest('/setArtistId', {
        method: 'POST',
        body: JSON.stringify({ artistId })
      });
    } catch (error) {
      console.error('Error setting artist ID:', error);
      throw error;
    }
  }

  async getArtistData(artistId) {
    try {
      return await this.makeRequest(`/getArtistData?artistId=${artistId}`);
    } catch (error) {
      console.error('Error fetching artist data:', error);
      throw error;
    }
  }

  async checkBackendHealth() {
    const endpoints = [
      { name: 'Set Artist ID API', url: '/setArtistId' },
      { name: 'Get Artist Data API', url: '/getArtistData' }
    ];

    const results = [];
    for (const endpoint of endpoints) {
      try {
        await this.makeRequest(endpoint.url);
        results.push({ name: endpoint.name, status: 'online' });
      } catch (error) {
        results.push({ name: endpoint.name, status: 'offline', error: error.message });
      }
    }
    return results;
  }
}

const rueDeVivreAPIInstance = new RueDeVivreAPI();
export default rueDeVivreAPIInstance;