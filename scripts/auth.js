// Authentication System
class AuthSystem {
    constructor() {
        this.baseURL = 'https://2h2oj7u446.execute-api.eu-central-1.amazonaws.com/prod';
        this.currentUser = null;
        this.subscription = null;
        this.init();
    }

    init() {
        // Check if user is already logged in
        const token = localStorage.getItem('auth_token');
        if (token) {
            this.validateToken(token);
        }
    }

    async handleLogin(email, password) {
        try {
            const response = await fetch(`${this.baseURL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            
            if (response.ok) {
                localStorage.setItem('auth_token', data.token);
                this.currentUser = data.user;
                this.subscription = data.subscription;
                
                // Redirect to dashboard
                window.location.href = '/dashboard.html';
            } else {
                throw new Error(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed: ' + error.message);
        }
    }

    async handleSignup(userData) {
        try {
            const response = await fetch(`${this.baseURL}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });

            const data = await response.json();
            
            if (response.ok) {
                // Show subscription selection
                this.showSubscriptionFlow(data.userId);
            } else {
                throw new Error(data.message || 'Signup failed');
            }
        } catch (error) {
            console.error('Signup error:', error);
            alert('Signup failed: ' + error.message);
        }
    }

    showSubscriptionFlow(userId) {
        const modal = document.getElementById('subscriptionModal');
        const content = document.getElementById('subscriptionContent');
        
        content.innerHTML = `
            <div class="subscription-flow">
                <h3>Complete Your Registration</h3>
                <p>Choose a plan to access your analytics dashboard:</p>
                
                <div class="subscription-plans">
                    <div class="plan-card" data-plan="basic">
                        <h4>Basic Analytics</h4>
                        <div class="plan-price">$29/month</div>
                        <button onclick="selectSubscription('${userId}', 'basic', 29)">
                            Select Basic
                        </button>
                    </div>
                    
                    <div class="plan-card featured" data-plan="pro">
                        <h4>Professional</h4>
                        <div class="plan-price">$79/month</div>
                        <button onclick="selectSubscription('${userId}', 'pro', 79)">
                            Select Professional
                        </button>
                    </div>
                    
                    <div class="plan-card" data-plan="enterprise">
                        <h4>Enterprise</h4>
                        <div class="plan-price">$199/month</div>
                        <button onclick="selectSubscription('${userId}', 'enterprise', 199)">
                            Select Enterprise
                        </button>
                    </div>
                </div>
                
                <div class="trial-option">
                    <p><strong>Or start with a 7-day free trial:</strong></p>
                    <button onclick="startFreeTrial('${userId}')" class="trial-btn">
                        Start Free Trial
                    </button>
                </div>
            </div>
        `;
        
        modal.style.display = 'block';
    }

    async selectSubscription(userId, planType, amount) {
        try {
            const response = await fetch(`${this.baseURL}/subscription/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId,
                    planType,
                    amount
                })
            });

            const data = await response.json();
            
            if (response.ok) {
                // Redirect to payment processing
                window.location.href = data.paymentURL;
            } else {
                throw new Error(data.message || 'Subscription creation failed');
            }
        } catch (error) {
            console.error('Subscription error:', error);
            alert('Subscription failed: ' + error.message);
        }
    }

    async startFreeTrial(userId) {
        try {
            const response = await fetch(`${this.baseURL}/subscription/trial`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId })
            });

            const data = await response.json();
            
            if (response.ok) {
                localStorage.setItem('auth_token', data.token);
                this.currentUser = data.user;
                this.subscription = data.subscription;
                
                // Redirect to dashboard
                window.location.href = '/dashboard.html';
            } else {
                throw new Error(data.message || 'Trial creation failed');
            }
        } catch (error) {
            console.error('Trial error:', error);
            alert('Trial creation failed: ' + error.message);
        }
    }

    async validateToken(token) {
        try {
            const response = await fetch(`${this.baseURL}/auth/validate`, {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json' 
                }
            });

            const data = await response.json();
            
            if (response.ok) {
                this.currentUser = data.user;
                this.subscription = data.subscription;
                return true;
            } else {
                localStorage.removeItem('auth_token');
                return false;
            }
        } catch (error) {
            console.error('Token validation error:', error);
            localStorage.removeItem('auth_token');
            return false;
        }
    }

    logout() {
        localStorage.removeItem('auth_token');
        this.currentUser = null;
        this.subscription = null;
        window.location.href = '/index.html';
    }

    requireAuth() {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            window.location.href = '/index.html';
            return false;
        }
        return true;
    }

    requireSubscription() {
        if (!this.subscription || !this.subscription.active) {
            window.location.href = '/subscription.html';
            return false;
        }
        return true;
    }
}

// Global auth instance
window.authSystem = new AuthSystem();

// Event handlers for forms
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    window.authSystem.handleLogin(email, password);
}

function handleSignup(event) {
    event.preventDefault();
    const userData = {
        name: document.getElementById('signupName').value,
        email: document.getElementById('signupEmail').value,
        password: document.getElementById('signupPassword').value,
        spotifyURL: document.getElementById('spotifyURL').value
    };
    window.authSystem.handleSignup(userData);
}

function selectSubscription(userId, planType, amount) {
    window.authSystem.selectSubscription(userId, planType, amount);
}

function startFreeTrial(userId) {
    window.authSystem.startFreeTrial(userId);
}
