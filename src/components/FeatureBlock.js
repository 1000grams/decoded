import React from 'react';
import styles from '../styles/FeatureBlock.module.css';
<<<<<<< HEAD
import Icon from './Icon.js'; // Added .js extension for strict module resolution
=======
import Icon from './Icon.js';
>>>>>>> 23d180db33d9b8ccfbbae5c78a31eb4c3edf3d9e

function FeatureBlock({ iconName, title, description }) {
  return (
    <div className={styles.featureBlock}>
      <Icon name={iconName} size="40px" />
      <h4 className={styles.title}>{title}</h4>
      <p className={styles.description}>{description}</p>
    </div>
  );
}

export default FeatureBlock;
