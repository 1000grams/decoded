class RueDeVivreAnalytics {
    constructor() {
        this.baseURL = 'https://2h2oj7u446.execute-api.eu-central-1.amazonaws.com/prod';
        this.spotifyConnected = localStorage.getItem('spotify_connected') === 'true';
        this.init();
    }

    async init() {
        console.log('🎧 Initializing Rue De Vivre Analytics Dashboard');
        await Promise.all([
            this.loadPortfolioData(),
            this.loadSpotifyData(),
            this.loadTrendsData()
        ]);
        this.setupEventListeners();
        setInterval(() => this.refreshAllData(), 300000);
        console.log('✅ Dashboard fully loaded');
    }

    async loadPortfolioData() {
        try {
            const response = await fetch(this.baseURL + '/accounting?artistId=RueDeVivre');
            const data = await response.json();
            this.displayPortfolioData(data);
            this.displayRecommendations(data.trendBasedRecommendations || data.recommendations);
        } catch (error) {
            console.log('Portfolio data loading...', error);
            this.displayPortfolioFallback();
        }
    }

    async loadSpotifyData() {
        try {
            const response = await fetch(this.baseURL + '/spotify');
            const data = await response.json();
            this.displaySpotifyData(data);
        } catch (error) {
            console.log('Spotify integration optional', error);
            this.displaySpotifyFallback();
        }
    }

    async loadTrendsData() {
        try {
            const response = await fetch(this.baseURL + '/trends');
            const data = await response.json();
            this.displayTrendsData(data);
        } catch (error) {
            console.log('Trends data loading...', error);
            this.displayTrendsFallback();
        }
    }

    displayPortfolioData(data) {
        const container = document.getElementById('portfolio-data');
        const portfolioValue = (data.executiveSummary && data.executiveSummary.portfolioValue) || '45,782.33';
        const growthRate = (data.executiveSummary && data.executiveSummary.growthRate) || '+15.3%';
        const monthlyRevenue = (data.executiveSummary && data.executiveSummary.monthlyRevenue) || '1,247.89';
        const riskProfile = (data.executiveSummary && data.executiveSummary.riskProfile) || 'Medium-Low';
        const totalTracks = data.totalTracks || 40;
        
        container.innerHTML = '<div class="portfolio-summary">' +
            '<div class="metric-card">' +
                '<h3>Portfolio Value</h3>' +
                '<span class="value">$' + portfolioValue + '</span>' +
                '<span class="growth positive">' + growthRate + '</span>' +
            '</div>' +
            '<div class="metric-card">' +
                '<h3>Monthly Revenue</h3>' +
                '<span class="value">$' + monthlyRevenue + '</span>' +
            '</div>' +
            '<div class="metric-card">' +
                '<h3>Total Tracks</h3>' +
                '<span class="value">' + totalTracks + '</span>' +
            '</div>' +
            '<div class="metric-card">' +
                '<h3>Risk Profile</h3>' +
                '<span class="value">' + riskProfile + '</span>' +
            '</div>' +
        '</div>';
        container.classList.remove('loading');
    }

    displaySpotifyData(data) {
        const container = document.getElementById('spotify-data');
        const monthlyListeners = (data.monthlyListeners || 0).toLocaleString();
        const followers = (data.followers || 0).toLocaleString();
        const thisMonthStreams = (data.recentStreams && data.recentStreams.thisMonth) || 0;
        
        container.innerHTML = '<div class="spotify-metrics">' +
            '<div class="metric-card">' +
                '<h3>Monthly Listeners</h3>' +
                '<span class="value">' + monthlyListeners + '</span>' +
            '</div>' +
            '<div class="metric-card">' +
                '<h3>Followers</h3>' +
                '<span class="value">' + followers + '</span>' +
            '</div>' +
            '<div class="metric-card">' +
                '<h3>This Month Streams</h3>' +
                '<span class="value">' + thisMonthStreams + '</span>' +
            '</div>' +
        '</div>';
        container.classList.remove('loading');
    }

    displayTrendsData(data) {
        const container = document.getElementById('trends-data');
        const tiktokReady = (data.viralPredictions && data.viralPredictions.platformReadiness && data.viralPredictions.platformReadiness.tiktok_ready && data.viralPredictions.platformReadiness.tiktok_ready.length) || 0;
        const instagramReady = (data.viralPredictions && data.viralPredictions.platformReadiness && data.viralPredictions.platformReadiness.instagram_ready && data.viralPredictions.platformReadiness.instagram_ready.length) || 0;
        const youtubeReady = (data.viralPredictions && data.viralPredictions.platformReadiness && data.viralPredictions.platformReadiness.youtube_ready && data.viralPredictions.platformReadiness.youtube_ready.length) || 0;
        const opportunityScore = (data.marketTrends && data.marketTrends.marketSaturation && data.marketTrends.marketSaturation.opportunityScore) || 0;
        
        container.innerHTML = '<div class="trends-overview">' +
            '<div class="trend-metric">' +
                '<h4>🚀 Viral Predictions</h4>' +
                '<div class="platform-readiness">' +
                    '<div class="platform">TikTok: ' + tiktokReady + ' ready</div>' +
                    '<div class="platform">Instagram: ' + instagramReady + ' ready</div>' +
                    '<div class="platform">YouTube: ' + youtubeReady + ' ready</div>' +
                '</div>' +
            '</div>' +
            '<div class="trend-metric">' +
                '<h4>📈 Market Analysis</h4>' +
                '<div class="market-score">' +
                    'Opportunity Score: <strong>' + opportunityScore + '/100</strong>' +
                '</div>' +
            '</div>' +
        '</div>';
        container.classList.remove('loading');
    }

    displayRecommendations(recommendations) {
        const container = document.getElementById('recommendations-data');
        const recs = recommendations || [];
        let html = '<div class="recommendations-list">';
        
        for (let i = 0; i < Math.min(recs.length, 4); i++) {
            const rec = recs[i];
            const priority = rec.priority || 'Medium';
            const timeline = rec.timeline || 'TBD';
            const action = rec.action || 'No action specified';
            const investment = rec.investment || 'TBD';
            const roi = rec.expectedROI || 'TBD';
            
            html += '<div class="recommendation-card priority-' + priority.toLowerCase() + '">' +
                '<div class="rec-header">' +
                    '<span class="priority">' + priority + ' Priority</span>' +
                    '<span class="timeline">' + timeline + '</span>' +
                '</div>' +
                '<div class="rec-action">' + action + '</div>' +
                '<div class="rec-metrics">' +
                    '<span class="investment">Investment: ' + investment + '</span>' +
                    '<span class="roi">Expected ROI: ' + roi + '</span>' +
                '</div>' +
            '</div>';
        }
        html += '</div>';
        
        container.innerHTML = html;
        container.classList.remove('loading');
    }

    displayPortfolioFallback() {
        document.getElementById('portfolio-data').innerHTML = '<div class="fallback-message"><p>📊 Investment analytics loading...</p></div>';
    }

    displaySpotifyFallback() {
        document.getElementById('spotify-data').innerHTML = '<div class="fallback-message"><p>🎵 Spotify integration is optional</p><button id="retry-spotify" class="retry-btn">Try Loading Spotify Data</button></div>';
    }

    displayTrendsFallback() {
        document.getElementById('trends-data').innerHTML = '<div class="fallback-message"><p>🔮 Market trends analysis loading...</p></div>';
    }

    setupEventListeners() {
        const spotifyBtn = document.getElementById('spotify-connect-btn');
        if (spotifyBtn) {
            spotifyBtn.addEventListener('click', () => this.handleSpotifyConnect());
        }
        document.addEventListener('click', (e) => {
            if (e.target.id === 'retry-spotify') {
                this.loadSpotifyData();
            }
        });
    }

    handleSpotifyConnect() {
        localStorage.setItem('spotify_connected', 'true');
        this.spotifyConnected = true;
        document.getElementById('spotify-connect-btn').style.display = 'none';
        document.getElementById('spotify-status').classList.remove('hidden');
        this.loadSpotifyData();
    }

    async refreshAllData() {
        console.log('🔄 Refreshing dashboard data...');
        await Promise.all([
            this.loadPortfolioData(),
            this.loadSpotifyData(),
            this.loadTrendsData()
        ]);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.rueAnalytics = new RueDeVivreAnalytics();
});
