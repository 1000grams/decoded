import React from 'react';
import PageLayout from '../layouts/PageLayout';
import Section1Hero from '../sections/Section1Hero';
import Section2ProblemSolution from '../sections/Section2ProblemSolution';
import Section3ArtistShowcase from '../sections/Section3ArtistShowcase';
import Section4DynamicPricing from '../sections/Section4DynamicPricing';
import Section5Buyers from '../sections/Section5Buyers';
import Section6Artists from '../sections/Section6Artists';
import Section7Collaboration from '../sections/Section7Collaboration';
import Section8AWS from '../sections/Section8AWS';
import Section9CTA from '../sections/Section9CTA';

function LandingPage() {
  return (
    <PageLayout>
      <Section1Hero />
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
