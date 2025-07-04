import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import CognitoLogin from './components/CognitoLogin';
import cognitoAuthService from './services/CognitoAuthService';
import './App.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const result = await cognitoAuthService.getCurrentUser();
            if (result.success) {
                setIsAuthenticated(true);
                setUser(result.user);
                setUsername(result.username);
            }
        } catch (error) {
            console.log('No authenticated user');
        }
        setLoading(false);
    };

    const handleAuthSuccess = (authenticatedUser, token, userEmail) => {
        setIsAuthenticated(true);
        setUser(authenticatedUser);
        setUsername(userEmail);
        console.log(' Authentication successful for:', userEmail);
    };

    const handleSignOut = async () => {
        await cognitoAuthService.signOut();
        setIsAuthenticated(false);
        setUser(null);
        setUsername('');
    };

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white'
            }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}></div>
                <p>Loading DecodedMusic...</p>
            </div>
        );
    }

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route 
                        path="/login" 
                        element={
                            isAuthenticated ? 
                            <Navigate to="/dashboard" replace /> : 
                            <CognitoLogin onAuthSuccess={handleAuthSuccess} />
                        } 
                    />
                    <Route 
                        path="/dashboard" 
                        element={
                            isAuthenticated ? 
                            <Dashboard user={user} username={username} onSignOut={handleSignOut} /> : 
                            <Navigate to="/login" replace />
                        } 
                    />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;