<<<<<<< HEAD
import React from 'react';

const Header = ({ user, onLogout }) => {
  const clientId = '5pb29tja8gkqm3jb43oimd5qjt';
  const redirectUri = 'https://decodedmusic.com/dashboard';
  const cognitoDomain = 'https://auth.decodedmusic.com';

  const loginUrl = `${cognitoDomain}/login?client_id=${clientId}&response_type=code&scope=openid+email+profile&redirect_uri=${redirectUri}`;
  const signupUrl = `${cognitoDomain}/signup?client_id=${clientId}&response_type=code&scope=openid+email+profile&redirect_uri=${redirectUri}`;

  return (
    <header style={{
      background: 'rgba(0,0,0,0.9)',
      padding: '15px 20px',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255,255,255,0.1)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <h1 style={{ margin: 0, color: '#4ade80', fontSize: '24px' }}>decodedmusic</h1>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>Created by artist, for artists</span>
        </div>

        <nav style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <a href="https://decodedmusic.com/dashboard" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>Dashboard</a>
          <a href="https://decodedmusic.com/analytics" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>Analytics</a>
          <a href="https://decodedmusic.com/catalog-upload" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>Uploads</a>
          <a href="https://decodedmusic.com" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>Pricing</a>
        </nav>

        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          {user ? (
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <span style={{ color: '#4ade80' }}>Welcome, {user.name || user.email}</span>
              <button onClick={onLogout} style={{
                background: 'rgba(239, 68, 68, 0.2)',
                color: 'white',
                border: '1px solid #ef4444',
                padding: '8px 16px',
                borderRadius: '20px',
                cursor: 'pointer'
              }}>
                Logout
              </button>
            </div>
          ) : (
            <>
              <button onClick={() => window.location.href = loginUrl} style={{
                background: 'transparent',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                padding: '8px 20px',
                borderRadius: '20px',
                cursor: 'pointer'
              }}>
                Login
              </button>
              <button onClick={() => window.location.href = signupUrl} style={{
                background: 'linear-gradient(135deg, #4ade80, #22d3ee)',
                color: 'white',
                border: 'none',
                padding: '8px 20px',
                borderRadius: '20px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}>
                Start Creating
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
=======
import React, { useState, useEffect } from 'react';
import decodedMusicLogo from '../assets/decoded-music-logo.png';
import styles from '../styles/Header.module.css';
import Button from './Button.js';
import content from '../content/landingPage.json';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Inject Google Tag Manager and Snap Pixel once on mount
  useEffect(() => {
    // Google Tag Manager
    if (!document.getElementById('gtag-js')) {
      const gtagScript = document.createElement('script');
      gtagScript.id = 'gtag-js';
      gtagScript.async = true;
      gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-11CHYW3K6Z';
      document.head.appendChild(gtagScript);

      const gtagInline = document.createElement('script');
      gtagInline.innerHTML = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-11CHYW3K6Z');`;
      document.head.appendChild(gtagInline);
    }

    // Snap Pixel
    if (!document.getElementById('snap-pixel')) {
      const snapScript = document.createElement('script');
      snapScript.id = 'snap-pixel';
      snapScript.type = 'text/javascript';
      snapScript.innerHTML = `
(function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function()
{a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
a.queue=[];var s='script';r=t.createElement(s);r.async=!0;
r.src=n;var u=t.getElementsByTagName(s)[0];
u.parentNode.insertBefore(r,u);})(window,document,
'https://sc-static.net/scevent.min.js');

snaptr('init', '0e29f2de-37c1-4e4f-8274-c4d2f40d4bd7', {
'user_email': '__INSERT_USER_EMAIL__'
});

snaptr('track', 'PAGE_VIEW');
`;
      document.head.appendChild(snapScript);
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <a href="/" onClick={handleNavLinkClick}>
            <img src={decodedMusicLogo} alt="Decoded Music Logo" className="h-10 w-auto" />
          </a>
        </div>
        <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.mobileNavOpen : ''}`}>
          <ul>
            {content.header.navLinks.map((link, index) => (
              <li key={index}>
                <a href={link.href} onClick={handleNavLinkClick}>{link.text}</a>
              </li>
            ))}
          </ul>
          <div className={styles.authButtons}>
            <Button
              variant="outline"
              color="accent"
              href={content.header.signInButtonHref}
              onClick={handleNavLinkClick}
            >
              {content.header.signInButtonText}
            </Button>
            <Button
              variant="fill"
              color="accent"
              href={content.header.signUpButtonHref}
              onClick={handleNavLinkClick}
            >
              {content.header.signUpButtonText}
            </Button>
          </div>
        </nav>
        <button className={styles.burgerMenu} onClick={toggleMobileMenu} aria-label="Toggle navigation menu">
          {/* Replace with burger icon SVG/image */}
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
  );
}
>>>>>>> 23d180db33d9b8ccfbbae5c78a31eb4c3edf3d9e

export default Header;
