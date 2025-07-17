import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
<<<<<<< HEAD
import App from './App.js';
=======
import App from './App';
>>>>>>> 23d180db33d9b8ccfbbae5c78a31eb4c3edf3d9e

test('renders hero headline', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const headline = screen.getByRole('heading', { name: /Decoded Music/i });
  expect(headline).toBeInTheDocument();
});
