'use client';

import HeroSection from './components/HeroSection';
import NewsletterSignup from './components/NewsletterSignup';
import FeatureSection from './components/FeatureSection';

export default function Home() {
  return (
    <div className="relative pb-24">
      <HeroSection />
      <NewsletterSignup />
      <FeatureSection />
    </div>
  );
}
