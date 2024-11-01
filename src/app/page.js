'use client';

import HeroSection from './components/HeroSection';
import NewsletterSignup from './components/NewsletterSignup';
import FeatureSection from './components/FeatureSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f1116]">
      <HeroSection />
      <NewsletterSignup />
      <FeatureSection />
    </div>
  );
}
