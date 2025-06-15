import { render, screen } from '@testing-library/react';
import App from './App';

test('renders hero headline', () => {
  render(<App />);
  const headline = screen.getByRole('heading', { name: /Decoded Music/i });
  expect(headline).toBeInTheDocument();
});
