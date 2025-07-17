<<<<<<< HEAD
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails
} from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
  ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
};

const userPool = new CognitoUserPool(poolData);

class CognitoAuthService {
  constructor() {
    this.currentUser = null;
    this.jwtToken = null;
  }

  async signIn(email, password) {
    return new Promise((resolve) => {
      const userData = {
        Username: email,
        Pool: userPool,
      };

      const cognitoUser = new CognitoUser(userData);
      const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });

      cognitoUser.authenticateUser(authDetails, {
        onSuccess: (result) => {
          const token = result.getIdToken().getJwtToken();
          this.currentUser = cognitoUser;
          this.jwtToken = token;

          localStorage.setItem('user', JSON.stringify({ username: email }));
          localStorage.setItem('jwtToken', token);

          resolve({
            success: true,
            user: { username: email },
            token,
            username: email
          });
        },

        onFailure: (err) => {
          resolve({ success: false, error: err.message || 'Login failed' });
        },
      });
    });
  }

  async getCurrentUser() {
    const user = userPool.getCurrentUser();

    return new Promise((resolve) => {
      if (!user) {
        return resolve({ success: false, error: 'No current user' });
      }

      user.getSession((err, session) => {
        if (err || !session.isValid()) {
          return resolve({ success: false, error: 'Session invalid' });
        }

        this.jwtToken = session.getIdToken().getJwtToken();
        this.currentUser = user;

        resolve({
          success: true,
          user: { username: user.getUsername() },
          token: this.jwtToken,
          username: user.getUsername()
        });
      });
    });
  }

  async signOut() {
    const user = userPool.getCurrentUser();
    if (user) user.signOut();
    localStorage.removeItem('user');
    localStorage.removeItem('jwtToken');
    this.currentUser = null;
    this.jwtToken = null;
    return { success: true };
  }

  async getJwtToken() {
    if (this.jwtToken) return this.jwtToken;
    const result = await this.getCurrentUser();
    return result.success ? result.token : null;
  }
}

const cognitoAuthService = new CognitoAuthService();
export default cognitoAuthService;
export { CognitoAuthService, cognitoAuthService };
=======
﻿// Simple mock authentication service for demo purposes
class CognitoAuthService {
    constructor() {
        this.currentUser = null;
        this.jwtToken = null;
    }

    async signIn(email, password) {
        try {
            // Mock authentication - accept any email/password for demo
            console.log('🔐 Mock sign-in for demo purposes');
            
            this.currentUser = { username: email };
            this.jwtToken = 'mock-jwt-token-' + Date.now();
            
            // Store in localStorage for persistence
            localStorage.setItem('mockUser', email);
            localStorage.setItem('mockToken', this.jwtToken);
            
            return {
                success: true,
                user: this.currentUser,
                token: this.jwtToken,
                username: email
            };
        } catch (error) {
            return {
                success: false,
                error: 'Authentication failed'
            };
        }
    }

    async getCurrentUser() {
        try {
            const storedUser = localStorage.getItem('mockUser');
            const storedToken = localStorage.getItem('mockToken');
            
            if (storedUser && storedToken) {
                this.currentUser = { username: storedUser };
                this.jwtToken = storedToken;
                
                return {
                    success: true,
                    user: this.currentUser,
                    token: this.jwtToken,
                    username: storedUser
                };
            }
            
            return {
                success: false,
                error: 'No current user'
            };
        } catch (error) {
            return {
                success: false,
                error: 'Session error'
            };
        }
    }

    async signOut() {
        this.currentUser = null;
        this.jwtToken = null;
        localStorage.removeItem('mockUser');
        localStorage.removeItem('mockToken');
        
        return {
            success: true
        };
    }

    async getJwtToken() {
        if (this.jwtToken) {
            return this.jwtToken;
        }
        
        const result = await this.getCurrentUser();
        return result.success ? result.token : null;
    }
}

const cognitoAuthService = new CognitoAuthService();
export default cognitoAuthService;
>>>>>>> 23d180db33d9b8ccfbbae5c78a31eb4c3edf3d9e
