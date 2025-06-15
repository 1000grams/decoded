import React from 'react';
import styles from '../styles/Section6Artists.module.css';
import Button from '../components/Button';
import FeatureBlock from '../components/FeatureBlock';
import content from '../content/landingPage.json'; // Import content

function Section6Artists() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h3 className={styles.headline}>{content.artists.headline}</h3>
        <p className={styles.tagline}>{content.artists.tagline}</p>
        <p className={styles.introText}>
          {content.artists.introText}
        </p>
        <div className={styles.featuresGrid}>
          {content.artists.features.map((feature, index) => (
            <FeatureBlock
              key={index}
              iconName={feature.iconName}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
        <div className={styles.cta}>
          <Button variant="fill" color="accent" href={content.artists.ctaHref}>
            {content.artists.ctaText}
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Section6Artists;
