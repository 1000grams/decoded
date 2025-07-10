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

            // Hardcoded artist ID for Rue de Vivre
            const artistId = 'rue-de-vivre-id';
            console.log('Using hardcoded artist ID:', artistId);
            return artistId;

            // Uncomment below for dynamic fetching
            // const email = currentUser.user.username;
            // const response = await fetch(`${process.env.REACT_APP_GET_ARTIST_ID_URL}?email=${email}`, {
            //     headers: {
            //         Authorization: `Bearer ${this.jwtToken}`
            //     }
            // });

            // const data = await response.json();

            // if (!data.artistId) throw new Error('Artist ID not found');
            // return data.artistId;
        } catch (error) {
            console.error('Error fetching artist ID:', error);
            throw error;
        }
    }
}

const cognitoAuthService = new CognitoAuthService();
export default cognitoAuthService;
export { CognitoAuthService, cognitoAuthService };