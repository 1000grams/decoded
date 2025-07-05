import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import CognitoLogin from './components/CognitoLogin';
import MarketingPanel from './components/MarketingPanel';
import CatalogPanel from './components/CatalogPanel';
import AnalyticsPanel from './components/AnalyticsPanel';
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
        console.log('Authentication successful for:', userEmail);
    };

    const handleSignOut = async () => {
        await cognitoAuthService.signOut();
        setIsAuthenticated(false);
        setUser(null);
        setUsername('');
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading DecodedMusic...</p>
            </div>
        );
    }

    return (
        <Router>
            <div className="App">
                {/* top‐level nav */}
                <nav className="main-nav">
                    <Link to="/"><button>Home</button></Link>
                    {isAuthenticated && (
                        <>
                            <Link to="/dashboard"><button>Dashboard</button></Link>
                            <Link to="/marketing"><button>Marketing</button></Link>
                            <Link to="/catalog"><button>Catalog</button></Link>
                            <Link to="/analytics"><button>Analytics</button></Link>
                            <button onClick={handleSignOut}>Sign Out</button>
                        </>
                    )}
                </nav>

                <Routes>
                    {/* Public landing page route */}
                    <Route path="/" element={<LandingPage />} />

                    {/* Login route */}
                    <Route 
                        path="/login" 
                        element={
                            isAuthenticated ? 
                            <Navigate to="/dashboard" replace /> : 
                            <CognitoLogin onAuthSuccess={handleAuthSuccess} />
                        } 
                    />

                    {/* Protected dashboard route */}
                    <Route 
                        path="/dashboard" 
                        element={
                            isAuthenticated ? 
                            <Dashboard user={user} username={username} onSignOut={handleSignOut} /> : 
                            <Navigate to="/login" replace />
                        } 
                    />

                    {/* Protected marketing panel */}
                    <Route 
                        path="/marketing" 
                        element={
                            isAuthenticated ? 
                            <MarketingPanel user={user} /> : 
                            <Navigate to="/login" replace />
                        } 
                    />

                    {/* Protected catalog panel */}
                    <Route 
                        path="/catalog" 
                        element={
                            isAuthenticated ? 
                            <CatalogPanel user={user} /> : 
                            <Navigate to="/login" replace />
                        } 
                    />

                    {/* Protected analytics panel */}
                    <Route 
                        path="/analytics" 
                        element={
                            isAuthenticated ? 
                            <AnalyticsPanel user={user} /> : 
                            <Navigate to="/login" replace />
                        } 
                    />

                    {/* Redirect unknown routes to home */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
