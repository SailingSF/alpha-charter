'use client';

import { useState, useEffect } from 'react';

export default function HeroSection() {
  const [svgPath, setSvgPath] = useState('');

  useEffect(() => {
    fetch('/sp500_path.txt')
      .then((response) => response.text())
      .then((data) => {
        setSvgPath(data);
      });
  }, []);

  return (
    <div className="relative pb-16 -mt-20">
      {/* Background SVG with animated path */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="w-full max-w-4xl h-[400px]">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full scale-y-[-1]"
            preserveAspectRatio="none"
          >
            <path
              d={svgPath}
              className="stroke-emerald-400 stroke-[0.4] fill-none animate-drawLineInfinite opacity-30"
            />
          </svg>
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="relative z-20 pt-32 pb-4 lg:max-w-2xl lg:w-full">
          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block font-light">Welcome to</span>
                <span className="block text-blue-400 tracking-wide">Alpha Charter</span>
              </h1>
              <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 font-light leading-relaxed">
                Your personal gateway to expert financial insights. Get ahead with our AI-powered newsletter that delivers market analysis and answers your financial questions.
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
} 