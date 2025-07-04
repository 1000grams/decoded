onst API_CONFIG = {
  baseURL: 'https://y1zthsd7l0.execute-api.eu-central-1.amazonaws.com/prod',
  endpoints: {
    login: '/auth/login',
    signup: '/auth/signup',
    subscription: '/subscription'
  },
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
};

export default API_CONFIG;
