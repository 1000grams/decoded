import React, { useState } from 'react';
import styles from '../styles/Section3ArtistShowcase.module.css'; // Keep CSS module name for simplicity
import Button from '../components/Button';
import Icon from '../components/Icon';
import content from '../content/landingPage.json'; // Import content
// Placeholder for artist image
import rueDeVivreImage from '../assets/rue-de-vivre-placeholder.jpg';

function Section3ArtistShowcase() {
  const spotifyEmbeds = content.artistShowcase.spotifyEmbeds; // Get embeds from JSON

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % spotifyEmbeds.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + spotifyEmbeds.length) % spotifyEmbeds.length);
  };

  // Add theme=0 to src if it's not already there
  const currentEmbedSrc = spotifyEmbeds[currentIndex].src;
  const finalEmbedSrc = currentEmbedSrc.includes('theme=') ? currentEmbedSrc : `${currentEmbedSrc}&theme=0`;


  return (
    <section className={styles.section}>
      <h3 className={styles.sectionHeadline}>{content.artistShowcase.headline}</h3>
      <div className={styles.frameContainer}>
        <div className={styles.featuredArtistBlock}>
          <img src={rueDeVivreImage} alt="Rue de Vivre" className={styles.artistImage} />
          <h4 className={styles.blockSubHeadline}>{content.artistShowcase.featuredArtistSubHeadline}</h4>
          <p className={styles.blockBody}>
            {content.artistShowcase.featuredArtistBody}
          </p>
          <div className={styles.ctaButtons}>
            <Button variant="outline" color="accent" href={content.artistShowcase.browseCatalogCtaHref}>
              {content.artistShowcase.browseCatalogCtaText}
            </Button>
            <Button variant="fill" color="accent" href={content.artistShowcase.licenseSoundCtaHref}>
               {content.artistShowcase.licenseSoundCtaText}
            </Button>
          </div>
        </div>
        <div className={styles.spotifyBlock}>
           <h4 className={styles.blockSubHeadline}>{content.artistShowcase.spotifyExploreSubHeadline}</h4>

           <div className={styles.carouselContainer}>
               <iframe
                   style={{ borderRadius:'12px' }}
                   src={finalEmbedSrc} // Use the potentially modified src
                   width="100%"
                   height="152"
                   frameBorder="0"
                   allowFullScreen=""
                   allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                   loading="lazy"
                   title={`Spotify Embed ${currentIndex + 1} of ${spotifyEmbeds.length}`}
                ></iframe>

                <button
                    className={`${styles.carouselArrow} ${styles.prev}`}
                    onClick={goToPrevious}
                    aria-label="Previous track/album"
                >
                    <Icon name="arrow-left" size="20px" color="var(--accent-color)" />
                </button>
                 <button
                    className={`${styles.carouselArrow} ${styles.next}`}
                    onClick={goToNext}
                    aria-label="Next track/album"
                >
                     <Icon name="arrow-right" size="20px" color="var(--accent-color)" />
                </button>
           </div>

           <p className={styles.spotifyDisclaimer}>{content.artistShowcase.spotifyDisclaimer}</p>
            <p className={styles.indexIndicator}>
                {currentIndex + 1} / {spotifyEmbeds.length}
            </p>
        </div>
      </div>
    </section>
  );
}

export default Section3ArtistShowcase;
