onst fs = require('fs');
const path = require('path');

function integrateDashboard() {
  console.log('🔧 Integrating Dashboard with React Build...');
  
  try {
    // Copy generated files from parent directory to public folder
    const generatedFiles = [
      { from: '../dashboard.html', to: 'public/dashboard-standalone.html' },
      { from: '../dashboard.js', to: 'public/dashboard-standalone.js' },
      { from: '../dashboard.css', to: 'public/dashboard-standalone.css' },
      { from: '../test-dashboard.html', to: 'public/test-dashboard.html' }
    ];
    
    generatedFiles.forEach(file => {
      if (fs.existsSync(file.from)) {
        const targetDir = path.dirname(file.to);
        if (!fs.existsSync(targetDir)) {
          fs.mkdirSync(targetDir, { recursive: true });
        }
        fs.copyFileSync(file.from, file.to);
        console.log(`✅ Copied ${file.from} to ${file.to}`);
      } else {
        console.log(`⚠️ Source file not found: ${file.from}`);
      }
    });
    
    // Create React API service for backend integration
    const servicesDir = 'src/services';
    if (!fs.existsSync(servicesDir)) {
      fs.mkdirSync(servicesDir, { recursive: true });
    }
    
    const rueDeVivreAPIPath = path.join(servicesDir, 'RueDeVivreAPI.js');
    if (!fs.existsSync(rueDeVivreAPIPath)) {
      const apiServiceContent = `// Rue de Vivre Analytics API Service
class RueDeVivreAPI {
  constructor() {
    this.baseURL = process.env.REACT_APP_DASHBOARD_API || 'https://2h2oj7u446.execute-api.eu-central-1.amazonaws.com/prod';
  }

  async makeRequest(endpoint, options = {}) {
    const token = localStorage.getItem('cognito_access_token') || localStorage.getItem('decodedmusic_user');
    
    try {
      const response = await fetch(\`\${this.baseURL}\${endpoint}\`, {
        headers: {
          'Authorization': \`Bearer \${token}\`,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          ...options.headers
        },
        ...options
      });

      if (!response.ok) {
        throw new Error(\`API Error: \${response.status} - \${response.statusText}\`);
      }

      return await response.json();
    } catch (error) {
      console.error(\`RueDeVivre API Error (\${endpoint}):\`, error);
      throw error;
    }
  }

  async loadPortfolioData() {
    try {
      return await this.makeRequest('/accounting?artistId=RueDeVivre');
    } catch (error) {
      return {
        executiveSummary: {
          portfolioValue: '45,782.33',
          growthRate: '+15.3%',
          monthlyRevenue: '1,247.89',
          riskProfile: 'Medium-Low'
        },
        totalTracks: 40,
        topPerformers: [
          { title: 'Hump Day', revenue: '2,847', roi: '+24.5%' },
          { title: 'Friday Flex', revenue: '2,234', roi: '+18.2%' },
          { title: 'Big Fish', revenue: '1,956', roi: '+15.7%' }
        ]
      };
    }
  }

  async loadSpotifyData() {
    try {
      return await this.makeRequest('/spotify');
    } catch (error) {
      return { 
        monthlyListeners: 0, 
        followers: 0, 
        recentStreams: { thisMonth: 0 } 
      };
    }
  }

  async loadTrendsData() {
    try {
      return await this.makeRequest('/trends');
    } catch (error) {
      return {
        viralPredictions: { 
          platformReadiness: { 
            tiktok_ready: [], 
            instagram_ready: [], 
            youtube_ready: [] 
          } 
        },
        marketTrends: { 
          marketSaturation: { opportunityScore: 0 } 
        },
        actionableInsights: {
          immediateActions: [
            'Connect real Spotify account',
            'Verify API Gateway endpoints',
            'Check DynamoDB table permissions'
          ]
        }
      };
    }
  }

  async checkBackendHealth() {
    const endpoints = [
      { name: 'Portfolio API', url: '/accounting?artistId=RueDeVivre' },
      { name: 'Spotify API', url: '/spotify' },
      { name: 'Trends API', url: '/trends' }
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

export default new RueDeVivreAPI();`;
      
      fs.writeFileSync(rueDeVivreAPIPath, apiServiceContent);
      console.log('✅ Created RueDeVivreAPI.js');
    }
    
    console.log('🎉 Dashboard integration complete!');
    
  } catch (error) {
    console.error('❌ Integration failed:', error);
  }
}

if (require.main === module) {
  integrateDashboard();
}

module.exports = { integrateDashboard };
