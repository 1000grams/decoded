export const API_ENDPOINTS = {
  // Your real AWS API Gateway endpoints
  AUTH_BASE: 'https://y1zthsd7l0.execute-api.eu-central-1.amazonaws.com/prod',
  DASHBOARD_BASE: 'https://2h2oj7u446.execute-api.eu-central-1.amazonaws.com/prod',
  
  // DynamoDB table names
  TABLES: {
    CATALOG: 'prod-DecodedCatalog-decodedmusic-backend',
    SPOTIFY_INSIGHTS: 'prod-SpotifyInsights-decodedmusic-backend',
    USERS: 'prod-decodedmusic-users',
    SUBSCRIPTIONS: 'prod-decodedmusic-subscriptions'
  }
};
