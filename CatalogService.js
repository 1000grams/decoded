class CatalogService {
  async getCatalog(artistId = 'ruedevivre') {
    try {
      // Mock catalog data for demo
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return [
        {
          title: 'Summer Nights',
          artistName: 'Rue de Vivre',
          genre: 'Electronic',
          duration: '3:42',
          releaseDate: '2024-06-15'
        },
        {
          title: 'Digital Dreams',
          artistName: 'Rue de Vivre',
          genre: 'Synthwave',
          duration: '4:18',
          releaseDate: '2024-05-20'
        },
        {
          title: 'Neon Lights',
          artistName: 'Rue de Vivre',
          genre: 'Electronic',
          duration: '3:55',
          releaseDate: '2024-04-10'
        },
        {
          title: 'City Pulse',
          artistName: 'Rue de Vivre',
          genre: 'Ambient',
          duration: '5:12',
          releaseDate: '2024-03-25'
        },
        {
          title: 'Midnight Drive',
          artistName: 'Rue de Vivre',
          genre: 'Synthwave',
          duration: '4:33',
          releaseDate: '2024-02-14'
        },
        {
          title: 'Electric Sunset',
          artistName: 'Rue de Vivre',
          genre: 'Electronic',
          duration: '3:27',
          releaseDate: '2024-01-30'
        }
      ];
    } catch (error) {
      console.error('Error fetching catalog:', error);
      return [];
    }
  }

  async getSpotifyData(artistId = 'ruedevivre') {
    try {
      // Mock Spotify data for demo
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return {
        followers: 1250,
        monthlyListeners: 8430,
        topTrack: 'Summer Nights',
        totalStreams: 125000,
        countries: ['France', 'Germany', 'UK', 'Netherlands', 'Belgium']
      };
    } catch (error) {
      console.error('Error fetching Spotify data:', error);
      return { followers: 0, monthlyListeners: 0 };
    }
  }

  async getAccountingData(artistId = 'RueDeVivre') {
    try {
      // Mock accounting data for demo
      await new Promise(resolve => setTimeout(resolve, 400));
      
      return {
        totalRevenue: 2847.50,
        monthlyRevenue: 485.20,
        totalStreams: 125000,
        averagePerStream: 0.0038,
        topEarningTrack: 'Summer Nights',
        platforms: {
          spotify: 1650.30,
          appleMusic: 780.45,
          youtube: 416.75
        }
      };
    } catch (error) {
      console.error('Error fetching accounting data:', error);
      return { totalRevenue: 0, monthlyRevenue: 0 };
    }
  }
}

export default new CatalogService();