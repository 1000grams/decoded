import AWS from 'aws-sdk';

AWS.config.update({ region: 'us-east-1' }); // Update with your region
const dynamodb = new AWS.DynamoDB.DocumentClient();
const DYNAMO_TABLE = 'prod-DecodedCatalog-decodedmusic-backend';

class CognitoAuthService {
    constructor() {
        this.currentUser = null;
        this.jwtToken = null;
    }

    async signIn(email, password) {
        try {
            console.log(' Mock sign-in for demo purposes');
            
            this.currentUser = { username: email };
            this.jwtToken = 'mock-jwt-token-' + Date.now();
            
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

    async getArtistIdFromCognito() {
        try {
            const currentUser = await this.getCurrentUser();
            if (!currentUser.success) {
                throw new Error('No current user found');
            }

            const email = currentUser.user.username;
            const params = {
                TableName: DYNAMO_TABLE,
                Key: {
                    email: email
                }
            };

            const result = await dynamodb.get(params).promise();
            if (!result.Item || !result.Item.artistId) {
                throw new Error('Artist ID not found for the current user');
            }

            return result.Item.artistId;
        } catch (error) {
            console.error('Error fetching artist ID from DynamoDB:', error);
            throw error;
        }
    }
}

const cognitoAuthService = new CognitoAuthService();
export default cognitoAuthService;
export { CognitoAuthService };