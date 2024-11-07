'use client';

import HeroSection from './components/HeroSection';
import NewsletterSignup from './components/NewsletterSignup';
import FeatureSection from './components/FeatureSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f1116]">
      <div className="relative bg-gradient-to-b from-black to-gray-900">
        <div className="relative pb-24">
          <HeroSection />
          <NewsletterSignup />
        </div>
        <FeatureSection />
      </div>
    </div>
  );
}
