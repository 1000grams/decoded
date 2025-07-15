import React, { useState, useEffect } from 'react';
import cognitoAuthService from '../services/CognitoAuthService.js';

const CognitoLogin = ({ onAuthSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const checkCurrentUser = async () => {
            try {
                const result = await cognitoAuthService.getCurrentUser();
                if (result.success) {
                    console.log("✅ Current user detected:", result);
                    onAuthSuccess(result.user, result.token, result.username);
                }
            } catch (error) {
                console.log('No current user found');
            }
        };

        checkCurrentUser();
    }, [onAuthSuccess]);

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const result = await cognitoAuthService.signIn(email, password);
            console.log("✅ Logged in:", result);
            
            if (result.success) {
                onAuthSuccess(result.user, result.token, result.username);
            } else {
                setError(result.error);
            }
        } catch (error) {
            setError('Login failed. Please try again.');
        }
        
        setLoading(false);
    };

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}>
            <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '15px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                width: '100%',
                maxWidth: '400px'
            }}>
                <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}> DecodedMusic</h1>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Artist Login</h2>
                
                <form onSubmit={handleSignIn}>
                    <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '15px',
                            marginBottom: '1rem',
                            border: '2px solid #e2e8f0',
                            borderRadius: '10px',
                            fontSize: '1rem',
                            boxSizing: 'border-box'
                        }}
                    />
                    
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '15px',
                            marginBottom: '1.5rem',
                            border: '2px solid #e2e8f0',
                            borderRadius: '10px',
                            fontSize: '1rem',
                            boxSizing: 'border-box'
                        }}
                    />
                    
                    <button 
                        type="submit" 
                        disabled={loading || !email || !password}
                        style={{
                            width: '100%',
                            padding: '15px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            cursor: loading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
                
                {error && (
                    <div style={{
                        color: '#e53e3e',
                        textAlign: 'center',
                        marginTop: '1rem',
                        padding: '1rem',
                        background: '#fed7d7',
                        borderRadius: '8px'
                    }}>
                        {error}
                    </div>
                )}
                
                <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: '#718096' }}>
                    <p>Demo Mode: Use any email/password to access dashboard</p>
                </div>
            </div>
        </div>
    );
};

export default CognitoLogin;