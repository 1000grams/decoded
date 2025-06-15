import React from 'react';
import styles from '../styles/Section9CTA.module.css';
import Button from '../components/Button';
import content from '../content/landingPage.json'; // Import content

function Section9CTA() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h3 className={styles.headline}>{content.finalCta.headline}</h3>
        <div className={styles.ctaButtons}>
          <Button variant="fill" color="accent" href={content.finalCta.cta1Href}>
            {content.finalCta.cta1Text}
          </Button>
          <Button variant="outline" color="accent" href={content.finalCta.cta2Href}>
            {content.finalCta.cta2Text}
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Section9CTA;
