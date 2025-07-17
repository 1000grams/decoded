import React from 'react';
import styles from '../styles/Section4DynamicPricing.module.css';
import Button from '../components/Button.js';
import Icon from '../components/Icon.js';
import content from '../content/landingPage.json'; // Import content
import SuggestionTile from '../components/SuggestionTile.jsx';
import { FaDollarSign, FaChartLine, FaGem } from 'react-icons/fa';

<<<<<<< HEAD
const subscriptionTiers = [
  { name: 'Artist Starter', price: 19, description: 'Perfect for emerging artists.' },
  { name: 'Pro Creator', price: 89, description: 'Ideal for professional creators.' },
  { name: 'Industry Pro', price: 249, description: 'For industry professionals.' },
];

const brandPricingTiers = [
  { name: 'Basic License', price: 49, description: 'Access to 10 tracks per month.' },
  { name: 'Premium License', price: 149, description: 'Unlimited track access with premium support.' },
  { name: 'Enterprise License', price: 499, description: 'Custom solutions for large-scale needs.' },
];

=======
>>>>>>> 23d180db33d9b8ccfbbae5c78a31eb4c3edf3d9e
function Section4DynamicPricing() {
  return (
    <section className={styles.section} id="pricing-section">
      <div className={styles.container}>
        <h2 className={styles.headline}>{content.dynamicPricing.headline}</h2>
        <p className={styles.introText}>
          {content.dynamicPricing.introText}
        </p>

        <div className={styles.howItWorksGrid}>
          {content.dynamicPricing.howItWorksItems.map((item, index) => (
             <div key={index} className={`${styles.howItWorksItem} card`}>
                <Icon name={item.icon} size="32px" color="var(--accent-color)" />
                <p>{item.text}</p>
             </div>
          ))}
        </div>

        <div className={styles.priceCalloutBlock}>
            <p className={styles.priceCallout}>{content.dynamicPricing.priceCalloutText} <span className={styles.minPrice}>{content.dynamicPricing.minPrice}</span></p>
             <p className={styles.disclaimer}>{content.dynamicPricing.priceDisclaimer}</p>
        </div>

        {/* Optional: Add Use Cases Headline if needed */}
        {/* <h3 className={styles.useCasesHeadline}>{content.dynamicPricing.useCasesHeadline}</h3> */}

        <div className={styles.useCasesGrid}>
          {content.dynamicPricing.useCases.map((useCase, index) => (
            <div key={index} className={`${styles.useCaseBlock} card`}>
              <Icon name={useCase.icon} size="40px" color="var(--accent-color)" />
              <h4 className={styles.useCaseTitle}>{useCase.title}</h4>
              <p className={styles.useCaseDescription}>{useCase.description}</p>
              <Button variant="outline" color="accent" href={useCase.link}>
                {useCase.cta}
              </Button>
            </div>
          ))}
        </div>

        <div className={styles.beyondBasics}>
             <h4 className={styles.beyondBasicsTitle}>{content.dynamicPricing.beyondBasicsTitle}</h4>
             <ul className={styles.beyondBasicsList}>
                {content.dynamicPricing.beyondBasicsList.map((item, index) => (
                    <li key={index}>
                        <Icon name={item.icon} size="20px" /> {item.text}
                    </li>
                ))}
             </ul>
        </div>

<<<<<<< HEAD
        {/* Artist Subscription Plans */}
        <div className={styles.subscriptionTiers}>
          <h3 className={styles.headline}>For Artists</h3>
          <div className={styles.tiersGrid}>
            {subscriptionTiers.map((tier, index) => (
              <div key={index} className={`${styles.tierCard} card`}>
                <h4 className={styles.tierName}>{tier.name}</h4>
                <p className={styles.tierPrice}>${tier.price}/month</p>
                <p className={styles.tierDescription}>{tier.description}</p>
                <Button variant="outline" color="accent">Choose {tier.name}</Button>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Licensing Plans */}
        <div className={styles.brandPricingTiers}>
          <h3 className={styles.headline}>For Brands</h3>
          <div className={styles.tiersGrid}>
            {brandPricingTiers.map((tier, index) => (
              <div key={index} className={`${styles.tierCard} card`}>
                <h4 className={styles.tierName}>{tier.name}</h4>
                <p className={styles.tierPrice}>${tier.price}/month</p>
                <p className={styles.tierDescription}>{tier.description}</p>
                <Button variant="outline" color="accent">Explore {tier.name}</Button>
              </div>
            ))}
          </div>
        </div>

        {/* Sample Tracks Section */}
        <div className={styles.sampleTracks}>
          <h3 className={styles.headline}>Sample Tracks</h3>
          <p>Explore a curated selection of tracks available for licensing.</p>
          <div className={styles.trackList}>
            {/* Replace with dynamic track data */}
            <div className={styles.trackItem}>Track 1 - Artist Name</div>
            <div className={styles.trackItem}>Track 2 - Artist Name</div>
            <div className={styles.trackItem}>Track 3 - Artist Name</div>
          </div>
        </div>
=======
>>>>>>> 23d180db33d9b8ccfbbae5c78a31eb4c3edf3d9e

        <div className={styles.finalCta}>
           <Button variant="fill" color="accent" href={content.dynamicPricing.finalCtaHref}>
             {content.dynamicPricing.finalCtaText}
           </Button>
        </div>
        <div style={{ display: 'flex', gap: '1.2rem', marginTop: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
          <SuggestionTile icon={<FaDollarSign />}>
            Dynamic pricing, fair for all
          </SuggestionTile>
          <SuggestionTile icon={<FaChartLine />}>
            Transparent, real-time rates
          </SuggestionTile>
          <SuggestionTile icon={<FaGem />}>
            Premium value, no compromise
          </SuggestionTile>
        </div>
      </div>
    </section>
  );
}

export default Section4DynamicPricing;
