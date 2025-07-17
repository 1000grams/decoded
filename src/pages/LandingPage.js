<<<<<<< HEAD
import React, { useEffect } from 'react';
import { getCognitoTokenFromUrl } from '../utils/getCognitoToken';
import PageLayout from '../layouts/PageLayout.js';
=======
import React from 'react';
import PageLayout from '../layouts/PageLayout.js';
import Section1Hero from '../sections/Section1Hero.js';
>>>>>>> 23d180db33d9b8ccfbbae5c78a31eb4c3edf3d9e
import Section2ProblemSolution from '../sections/Section2ProblemSolution.js';
import Section3ArtistShowcase from '../sections/Section3ArtistShowcase.js';
import Section4DynamicPricing from '../sections/Section4DynamicPricing.js';
import Section5Buyers from '../sections/Section5Buyers.js';
import Section6Artists from '../sections/Section6Artists.js';
import Section7Collaboration from '../sections/Section7Collaboration.js';
import Section8AWS from '../sections/Section8AWS.js';
import Section9CTA from '../sections/Section9CTA.js';
<<<<<<< HEAD
import SignupForm from '../components/SignupForm';

function LandingPage() {
  useEffect(() => {
    getCognitoTokenFromUrl(); // Capture token on load
  }, []);
  return (
    <PageLayout>
      {/* Hero video section */}
      <section className="relative w-full h-screen">
        <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover">
          <source src="/p1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
          <h1 className="text-5xl font-bold">decoded music</h1>
          <p className="mt-4 text-xl">created by artists, for artists</p>
          <button onClick={() => window.location.href='/dashboard'} className="mt-8 px-6 py-3 bg-accent text-white rounded">
            Access Your Artist Dashboard
          </button>
        </div>
      </section>
      <section className="relative w-full py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">Join the Revolution</h2>
          <SignupForm />
        </div>
      </section>
=======

function LandingPage() {
  return (
    <PageLayout>
      <Section1Hero />
>>>>>>> 23d180db33d9b8ccfbbae5c78a31eb4c3edf3d9e
      <Section2ProblemSolution />
      <Section3ArtistShowcase />
      <Section4DynamicPricing />
      <Section5Buyers />
      <Section6Artists />
      <Section7Collaboration />
      <Section8AWS />
      <Section9CTA />
    </PageLayout>
  );
}

export default LandingPage;
