import './App.css';
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.js';
import BuzzPage from './pages/BuzzPage.js';
import ArtistDashboard from './pages/ArtistDashboard.js';
import MarketingHub from './pages/MarketingHub.jsx';
import Accounting from './pages/Accounting.jsx';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';

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
