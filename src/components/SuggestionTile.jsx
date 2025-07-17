<<<<<<< HEAD
﻿import React from 'react';
=======
import React from 'react';
>>>>>>> 23d180db33d9b8ccfbbae5c78a31eb4c3edf3d9e
import styles from './SuggestionTile.module.css';

function SuggestionTile({ icon, children, ...props }) {
  return (
<<<<<<< HEAD
    <div className={styles.suggestionTile} {...props}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <div className={styles.content}>{children}</div>
    </div>
=======
    <span className={styles.suggestionTile} {...props}>
      {icon && <span className={styles.suggestionIcon}>{icon}</span>}
      {children}
    </span>
>>>>>>> 23d180db33d9b8ccfbbae5c78a31eb4c3edf3d9e
  );
}

export default SuggestionTile;
