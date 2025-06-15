import React, { useState } from 'react';
import decodedMusicLogo from '../assets/decoded-music-logo.png';
import styles from '../styles/Header.module.css';
import Button from './Button';
import content from '../content/landingPage.json';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

export default Header;
