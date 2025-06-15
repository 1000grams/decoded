import React from 'react';
import styles from '../styles/Section1Hero.module.css';
import Button from '../components/Button';
import content from '../content/landingPage.json'; // Import content
// Import your logo image here
import decodedMusicLogo from '../assets/decoded-music-logo.png';

function Section1Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.videoBackground}>
        <video autoPlay loop muted playsInline className={styles.video}>
          <source src={content.hero.videoSrc} type="video/mp4" />
          {/* Add more source types for broader browser support */}
          Your browser does not support the video tag.
        </video>
        <div className={styles.overlay}></div> {/* Dark overlay */}
      </div>
      <div className={styles.framedContent}> {/* New container for the "framed" look */}
        <img src={decodedMusicLogo} alt="Decoded Music Logo" className="h-10 w-auto" />
        <h1 className={styles.headline}>{content.hero.headline}</h1>
        <p className={styles.tagline}>{content.hero.tagline}</p> {/* Use tagline from JSON */}
        <p className={styles.hypeText}>
          {content.hero.hypeText}
        </p>
        <div className={styles.ctaButtons}>
          <Button variant="fill" color="accent" href={content.hero.primaryCtaHref}>
            {content.hero.primaryCtaText}
          </Button>
          <Button variant="outline" color="accent" href={content.hero.secondaryCtaHref}>
            {content.hero.secondaryCtaText}
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Section1Hero;
