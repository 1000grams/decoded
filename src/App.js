import Contact from "./pages/Contact";
import About from "./pages/About";
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import BuzzPage from './pages/BuzzPage';
import ArtistDashboard from './pages/ArtistDashboard';
import MarketingHub from './pages/MarketingHub';
import Accounting from './pages/Accounting';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
  return (
    <Routes>
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/buzz" element={<BuzzPage />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<ArtistDashboard />} />
      <Route path="/marketing" element={<MarketingHub />} />
      <Route path="/accounting" element={<Accounting />} />
    </Routes>
  );
}

export default App;
