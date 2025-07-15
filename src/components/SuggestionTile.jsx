import React from 'react';
import styles from './SuggestionTile.module.css';

function SuggestionTile({ icon, children, ...props }) {
  return (
    <div className={styles.suggestionTile} {...props}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <div className={styles.content}>{children}</div>
    </div>
  );
}

export default SuggestionTile;
