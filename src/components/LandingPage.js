import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCognitoTokenFromUrl } from '../utils/getCognitoToken';
import './LandingPage.css';

const LandingPage = () => {
    useEffect(() => { getCognitoTokenFromUrl(); }, []);

    return (
        <div className="landing-page">
            <header className="navbar">
                <div className="nav-container">
                    <div className="logo">
                        <img src="/logo.svg" alt="Decoded Music" className="logo-img" />
                        <span className="logo-text">decoded music</span>
                    </div>
                    <nav className="nav-links">
                        <a href="#features">Why Artists Choose Us</a>
                        <a href="#pricing">Join the Movement</a>
                        <Link to="/login" className="artist-login-btn">Artist Dashboard</Link>
                    </nav>
                </div>
            </header>

            <section className="hero">
                <div className="hero-content">
                    <div className="hero-text">
                        <h1 className="hero-title">
                            <span className="brand-name">decoded music</span>
                            <span className="tagline">created by artists, for artists</span>
                        </h1>
                        
                        <p className="hero-description">
                            <strong>We're artists who got tired of the system.</strong> No more begging playlist curators. 
                            No more gambling on algorithms. No more industry gatekeepers deciding your worth.
                            <br/><br/>
                            This is <strong>your platform</strong>. Built by independent artists who understand the hustle, 
                            the late nights, and the dream. Get AI insights that actually help you eat, not just stream.
                        </p>
                        
                        <div className="hero-cta">
                            <Link to="/login" className="cta-primary">
                                Access Your Artist Dashboard
                            </Link>
                            <a href="#features" className="cta-secondary">
                                See What Artists Are Saying
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
                            <source src="/p1.mp4" type="video/mp4" />
                            <div className="video-fallback">
                                 Video loading...
                            </div>
                        </video>
                    </div>
                </div>
            </section>

            <section id="features" className="features">
                <div className="container">
                    <h2 className="section-title">Why Independent Artists Trust Us</h2>
                    <p className="section-subtitle">
                        We've been where you are. We know what it's like to create amazing music 
                        and watch it get buried. That's why we built this.
                    </p>
                    
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon"></div>
                            <h3>Real Artist Insights</h3>
                            <p>No corporate BS. Our AI understands independent artists because it was trained by independent artists. Get insights that actually help you grow your fanbase and income.</p>
                        </div>
                        
                        <div className="feature-card">
                            <div className="feature-icon"></div>
                            <h3>Multiple Revenue Streams</h3>
                            <p>Streaming pennies won't pay rent. Discover sync opportunities, brand partnerships, direct fan monetization, and merch strategies that actually work for indie artists.</p>
                        </div>
                        
                        <div className="feature-card">
                            <div className="feature-icon"></div>
                            <h3>Viral Potential Tracking</h3>
                            <p>Know which tracks are ready for TikTok, Instagram, and YouTube before you waste money on promotion. Our AI predicts viral potential based on real data, not hype.</p>
                        </div>
                        
                        <div className="feature-card">
                            <div className="feature-icon"></div>
                            <h3>Artist-First Philosophy</h3>
                            <p>Keep your creative control. Keep your rights. Keep your dignity. We're here to amplify your voice, not change it. No label politics, no industry politics, just artists helping artists.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="pricing" className="pricing">
                <div className="container">
                    <h2 className="section-title">Join the Independent Artist Revolution</h2>
                    <p className="section-subtitle">
                        Connect with fellow artists who are taking control of their careers.
                        Follow our journey and be part of the movement that's changing the game.
                    </p>
                    
                    <div className="pricing-cta">
                        <a 
                            href="https://hoodiepeeps.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hoodie-peeps-btn"
                        >
                             Follow Our Artist Journey
                        </a>
                        
                        <Link to="/login" className="get-started-btn">
                             Start Your Artist Dashboard
                        </Link>
                    </div>
                    
                    <div className="artist-testimonial">
                        <p>"Finally, a platform that gets it. Built by artists who actually understand the struggle." - Independent Artist</p>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-brand">
                            <span className="footer-logo">decoded music</span>
                            <span className="footer-tagline">created by artists, for artists</span>
                        </div>
                        
                        <div className="footer-links">
                            <a href="/privacy">Privacy</a>
                            <a href="/terms">Terms</a>
                            <a href="/contact">Contact Us</a>
                            <a href="https://hoodiepeeps.com" target="_blank" rel="noopener noreferrer">Our Story</a>
                        </div>
                    </div>
                    
                    <div className="footer-bottom">
                        <p> 2024 Decoded Music. Built with love by Avril Hue and independent artists worldwide.</p>
                        <p className="footer-motto"> By artists, for artists, always.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;