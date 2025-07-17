import React from 'react';
import styles from '../styles/Icon.module.css'; // Optional: for size/color styling

function Icon({ name, size = '24px', color = 'var(--accent-color)' }) {
  // In a real app, you might use a switch statement or map to render different SVGs
  // or use a library component like <FaIcon name={name} size={size} color={color} />
  return (
    <span
      className={styles.icon}
      style={{ width: size, height: size, color: color, display: 'inline-block' }}
      aria-hidden="true" // Icons are often decorative
    >
      {/* Placeholder: Replace with actual SVG or icon library component */}
      [{name}]
    </span>
  );
}

<<<<<<< HEAD
export default Icon;
=======
export default Icon; 
>>>>>>> 23d180db33d9b8ccfbbae5c78a31eb4c3edf3d9e
