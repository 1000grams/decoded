import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCognitoTokenFromUrl } from '../utils/getCognitoToken';
import './LandingPage.css';

const LandingPage = () => {
  useEffect(() => {
    getCognitoTokenFromUrl();
  }, []);

  return (
    <div className="landing-page" style={{ backgroundColor: '#191970', color: '#ffffff' }}>
      <header className="navbar">
        <div className="nav-container">
          <div className="logo">
            <img src="/logo.svg" alt="Decoded Music Logo" className="logo-img" />
            <span className="logo-text">decoded music</span>
          </div>
          <nav className="nav-links">
            <a href="#features" style={{ color: '#ffffff' }}>Why Artists Choose Us</a>
            <a href="#pricing" style={{ color: '#ffffff' }}>Join the Movement</a>
            <Link to="/login" className="artist-login-btn">Artist Dashboard</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      {/* Hero Section */}
      <section className="hero" style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        {/* Background Video */}
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="hero-video"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -1,
          }}
        >
          <source src="/p1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Hero Content */}
        <div className="hero-content" style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '20px' }}>
          <h1 className="hero-title" style={{ fontSize: '3rem', fontWeight: 'bold' }}>
            <span className="brand-name">decoded music</span>
            <br />
            <span className="tagline">empowering artists to own their journey</span>
          </h1>

          <p className="hero-description" style={{ fontSize: '1.2rem', marginTop: '20px' }}>
            <strong>We’re artists who broke free from the system.</strong> No more begging playlist curators. 
            No more gambling on algorithms. No more gatekeepers deciding your worth.
            <br /><br />
            This is <strong>your platform</strong>. Built by independent artists who understand the grind, 
            the late nights, and the dream. Get insights that help you thrive, not just survive.
          </p>

          <div className="hero-cta" style={{ marginTop: '30px' }}>
            <Link to="/login" className="cta-primary" style={{
              backgroundColor: '#ff4500',
              color: '#ffffff',
              padding: '10px 20px',
              borderRadius: '5px',
              textDecoration: 'none',
              fontWeight: 'bold',
              marginRight: '10px',
            }}>
              Access Your Artist Dashboard
            </Link>
            <a href="#features" className="cta-secondary" style={{
              backgroundColor: '#ffffff',
              color: '#191970',
              padding: '10px 20px',
              borderRadius: '5px',
              textDecoration: 'none',
              fontWeight: 'bold',
            }}>
              See What Artists Are Saying
            </a>
          </div>
        </div>
      </section>

      <section id="features" className="features">
        <div className="container">
          <h2 className="section-title">Why Independent Artists Trust Us</h2>
          <p className="section-subtitle">
            We’ve been where you are. We know what it’s like to create amazing music 
            and watch it get buried. That’s why we built this.
          </p>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon" />
              <h3>Real Artist Insights</h3>
              <p>Get insights that actually help you grow your fanbase and income.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon" />
              <h3>Multiple Revenue Streams</h3>
              <p>Discover sync, brand, fan monetization, and merch opportunities that work for indie artists.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon" />
              <h3>Viral Potential Tracking</h3>
              <p>Know which tracks are ready for TikTok, Instagram, and YouTube based on real data.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon" />
              <h3>Artist-First Philosophy</h3>
              <p>Keep your rights. Keep your dignity. We’re here to amplify your voice, not change it.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="pricing">
        <div className="container">
          <h2 className="section-title">Join the Independent Artist Revolution</h2>
          <p className="section-subtitle">
            Connect with fellow artists who are taking control of their careers.
            Follow our journey and be part of the movement that’s changing the game.
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
            <p>"Finally, a platform that gets it. Built by artists who actually understand the struggle." – Independent Artist</p>
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
            <p>© 2025 Decoded Music. Empowering independent artists worldwide.</p>
            <p className="footer-motto">By artist, for artists.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
