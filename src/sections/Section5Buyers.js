import React from 'react';
import styles from '../styles/Section5Buyers.module.css';
import Button from '../components/Button';
import FeatureBlock from '../components/FeatureBlock';
import content from '../content/landingPage.json'; // Import content

function Section5Buyers() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h3 className={styles.headline}>{content.buyers.headline}</h3>
        <p className={styles.introText}>
          {content.buyers.introText}
        </p>
        <div className={styles.featuresGrid}>
          {content.buyers.features.map((feature, index) => (
            <FeatureBlock
              key={index}
              iconName={feature.iconName}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
        <div className={styles.cta}>
          <Button variant="fill" color="accent" href={content.buyers.ctaHref}>
            {content.buyers.ctaText}
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Section5Buyers;
