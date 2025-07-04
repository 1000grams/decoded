import { getCognitoTokenFromUrl } from '../utils/getCognitoToken';
import { API_ENDPOINTS } from '../config/api-endpoints';

class DynamoDBService {
    // No constructor needed for fetch-based service

    // Get artist portfolio data
    async getArtistPortfolio(artistId) {
        // Ensure token is captured
        getCognitoTokenFromUrl();
        const token = localStorage.getItem('cognito_id_token');
        const response = await fetch(`${API_ENDPOINTS.DASHBOARD_BASE}/artist/portfolio`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ artistId }),
        });
        const result = await response.json();
        return result;
    }

    // Get track analytics
    async getTrackAnalytics(artistId) {
        getCognitoTokenFromUrl();
        const token = localStorage.getItem('cognito_id_token');
        const response = await fetch(`${API_ENDPOINTS.DASHBOARD_BASE}/track/analytics`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ artistId }),
        });
        return await response.json();
    }

    // Get AI recommendations
    async getAIRecommendations(artistId) {
        getCognitoTokenFromUrl();
        const token = localStorage.getItem('cognito_id_token');
        const response = await fetch(`${API_ENDPOINTS.DASHBOARD_BASE}/artist/recommendations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ artistId }),
        });
        return await response.json();
    }

    // Update artist data
    async updateArtistData(artistId, data) {
        getCognitoTokenFromUrl();
        const token = localStorage.getItem('cognito_id_token');
        const response = await fetch(`${API_ENDPOINTS.DASHBOARD_BASE}/artist/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ artistId, data }),
        });
        return await response.json();
    }
}

export default new (class DynamoDBService {})();