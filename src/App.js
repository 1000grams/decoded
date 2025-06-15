import Contact from "./pages/Contact";
import About from "./pages/About";
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ArtistDashboard from './pages/ArtistDashboard';
import MarketingHub from './pages/MarketingHub';

function App() {
  return (
    <Routes>
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<ArtistDashboard />} />
      <Route path="/marketing" element={<MarketingHub />} />
    </Routes>
  );
}

export default App;
