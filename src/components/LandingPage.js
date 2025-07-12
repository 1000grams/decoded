import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div className="landing-page">
            <header className="navbar">
                <div className="nav-container">
                    <div className="logo">
                        <span className="logo-text">decoded music</span>
                    </div>
                    <nav className="nav-links">
                        <a href="#features">Features</a>
                        <a href="#pricing">Pricing</a>
                        <Link to="/login" className="artist-login-btn">Artist Login</Link>
                    </nav>
                </div>
            </header>

            <section className="hero">
                <div className="hero-content">
                    <div className="hero-text">
                        <h1 className="hero-title">
                            <span className="brand-name">decoded music</span>
                            <span className="tagline">create by artist for artist</span>
                        </h1>
                        
                        <p className="hero-description">
                            Finally, a platform built <strong>BY artists FOR artists</strong>. 
                            No more industry gatekeepers. No more getting lost in the algorithm. 
                            Take control of your music career with AI-powered insights that 
                            actually understand independent artists.
                        </p>
                        
                        <div className="hero-cta">
                            <Link to="/login" className="cta-primary">
                                Start Your Artist Journey
                            </Link>
                            <a href="#features" className="cta-secondary">
                                Learn More
                            </a>
                        </div>
                    </div>
                    
                    <div className="hero-video">
                        <video 
                            autoPlay 
                            muted 
                            loop 
                            playsInline
                            className="hero-video-player"
                        >
                            <source src="/pi.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </section>

            <section id="features" className="features">
                <div className="container">
                    <h2 className="section-title">Built By Artists Who Get It</h2>
                    
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon"></div>
                            <h3>AI That Speaks Artist</h3>
                            <p>Our AI understands the struggle. Get insights that help you grow without selling your soul.</p>
                        </div>
                        
                        <div className="feature-card">
                            <div className="feature-icon"></div>
                            <h3>Real Revenue Strategies</h3>
                            <p>Beyond streaming pennies. Discover sync opportunities, brand partnerships, and direct fan monetization.</p>
                        </div>
                        
                        <div className="feature-card">
                            <div className="feature-icon"></div>
                            <h3>Industry Intelligence</h3>
                            <p>Know what's trending before it trends. Stay ahead of algorithm changes and market shifts.</p>
                        </div>
                        
                        <div className="feature-card">
                            <div className="feature-icon"></div>
                            <h3>Artist Empowerment</h3>
                            <p>Keep your creative control while growing your business. We help you scale without compromise.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="pricing" className="pricing">
                <div className="container">
                    <h2 className="section-title">Join The Artist Revolution</h2>
                    <p className="section-subtitle">
                        Connect with us on HoodiePeeps and be part of the movement
                    </p>
                    
                    <div className="pricing-cta">
                        <a 
                            href="https://hoodiepeeps.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hoodie-peeps-btn"
                        >
                            Follow HoodiePeeps
                        </a>
                        
                        <Link to="/login" className="get-started-btn">
                            Get Started Today
                        </Link>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-brand">
                            <span className="footer-logo">decoded music</span>
                            <span className="footer-tagline">create by artist for artist</span>
                        </div>
                        
                        <div className="footer-links">
                            <a href="/privacy">Privacy</a>
                            <a href="/terms">Terms</a>
                            <a href="/contact">Contact</a>
                        </div>
                    </div>
                    
                    <div className="footer-bottom">
                        <p> 2024 Decoded Music. Built by Avril Hue and artists worldwide.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;