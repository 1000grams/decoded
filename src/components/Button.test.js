import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
<<<<<<< HEAD
import Button from './Button.js'; // Added .js extension for strict module resolution
=======
import Button from './Button';
>>>>>>> 23d180db33d9b8ccfbbae5c78a31eb4c3edf3d9e
import styles from '../styles/Button.module.css';

describe('Button component', () => {
  test('renders as an anchor when href is provided', () => {
    render(<Button href="/test">Link</Button>);
    const link = screen.getByRole('link', { name: 'Link' });
    expect(link.tagName).toBe('A');
    expect(link).toHaveClass(styles.button, styles.fill, styles.accent);
  });

  test('renders as a button when onClick is provided', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    const button = screen.getByRole('button', { name: 'Click' });
    expect(button.tagName).toBe('BUTTON');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
    expect(button).toHaveClass(styles.button, styles.fill, styles.accent);
  });

  test('applies variant and color classes', () => {
    render(
      <Button variant="outline" color="accent" href="#">
        Test
      </Button>
    );
    const link = screen.getByRole('link', { name: 'Test' });
    expect(link).toHaveClass(styles.button, styles.outline, styles.accent);
  });
});
