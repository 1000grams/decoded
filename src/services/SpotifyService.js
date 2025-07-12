class SpotifyService {
  constructor() {
    this.baseURL = 'https://2h2oj7u446.execute-api.eu-central-1.amazonaws.com/prod';
  }

  async getRealSpotifyData(artistId = '293x3NAIGPR4RCJrFkzs0P') {
    try {
      const token = localStorage.getItem('cognito_access_token') || 'demo-token';
      const response = await fetch(`${this.baseURL}/spotify?artistId=${artistId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Spotify API error: ${text}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching Spotify data:', error);
      return {
        monthlyListeners: 8500,
        followers: 1250,
        recentStreams: { thisMonth: 15000 },
      };
    }
  }
}

const spotifyService = new SpotifyService();
export default spotifyService;
