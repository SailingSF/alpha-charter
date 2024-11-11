'use client';

import Link from 'next/link';

export default function About() {
  return (
    <div className="relative -mt-20">
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 space-y-20">
          {/* Hero Section - Made more compact and centered */}
          <div className="text-center space-y-4 pt-32 pb-4 max-w-3xl mx-auto">
            <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
              <span className="block font-light text-white">About</span>
              <span className="block text-blue-400 tracking-wide">Alpha Charter</span>
            </h1>
            <p className="text-base text-gray-300 sm:text-lg md:text-xl font-light leading-relaxed">
              A next-generation financial newsletter that combines human insight with AI-powered intelligence
            </p>
          </div>

          {/* Rest of the sections */}
          <div className="py-8 space-y-20">
            {/* Interactive Newsletter Section */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-blue-400">Interactive Intelligence</h2>
                <p className="text-gray-300 text-lg font-light">
                  Unlike traditional newsletters, Alpha Charter enables direct interaction. Ask questions right from your email and receive thoughtful, data-driven responses powered by our AI system.
                </p>
                <ul className="space-y-3 text-gray-300 font-light">
                  <li className="flex items-center gap-3">
                    <span className="text-emerald-400">→</span>
                    Real-time market insights
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-emerald-400">→</span>
                    Personalized analysis
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-emerald-400">→</span>
                    Direct question-answering
                  </li>
                </ul>
              </div>
              <div className="bg-[#0f1116] rounded-xl p-6 border border-gray-800">
                <div className="aspect-video bg-gray-800/50 rounded-lg"></div>
              </div>
            </div>

            {/* AI Agents Section */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="bg-[#0f1116] rounded-xl p-6 border border-gray-800 order-2 md:order-1">
                <div className="aspect-video bg-gray-800/50 rounded-lg"></div>
              </div>
              <div className="space-y-6 order-1 md:order-2">
                <h2 className="text-3xl font-bold text-blue-400">Human-AI Collaboration</h2>
                <p className="text-gray-300 text-lg font-light">
                  Every newsletter is crafted by a human with the assistance of specialized AI agents. This approach combines:
                </p>
                <div className="space-y-4">
                  <div className="p-4 bg-[#0f1116] rounded-lg border border-gray-800">
                    <h3 className="font-semibold mb-2 text-emerald-400">Data Collection Agents</h3>
                    <p className="text-gray-300 font-light">Gathering objective market data and financial insights from reliable sources</p>
                  </div>
                  <div className="p-4 bg-[#0f1116] rounded-lg border border-gray-800">
                    <h3 className="font-semibold mb-2 text-emerald-400">Wiriting Agents</h3>
                    <p className="text-gray-300 font-light">Turning data into visuals and telling a story to make this data more accessible.</p>
                  </div>
                  <div className="p-4 bg-[#0f1116] rounded-lg border border-gray-800">
                    <h3 className="font-semibold mb-2 text-emerald-400">Human Oversight</h3>
                    <p className="text-gray-300 font-light">Curation and validation by a human in the loop ensures quality and relevance</p>
                  </div>
                </div>
              </div>
            </div>

            {/* About the Author Section */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-blue-400">About the Creator/Author</h2>
                <div className="space-y-4">
                  <p className="text-gray-300 text-lg font-light">
                    Hey, I&apos;m Max! I&apos;m passionate about combining AI with financial analysis to create tools that make market insights more accessible and actionable.
                  </p>
                  <p className="text-gray-300 text-lg font-light">
                    Alpha Charter evolved from my work building an AI financial assistant. While developing that app, I realized the power of combining AI capabilities with human expertise to deliver more valuable, contextualized insights to investors. And I also realized people don&apos;t want another app. They want insights in their inbox, and when they want to explore those insights, simply replying to the email is the easiest way to interact with AI and makes the newsletter experience much more powerful.
                  </p>
                  <div className="flex items-center gap-4 pt-4">
                    <Link 
                      href="https://linkedin.com/in/your-profile" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-blue-400 px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      LinkedIn
                    </Link>
                  </div>
                </div>
              </div>
              <div className="bg-[#0f1116] rounded-xl p-6 border border-gray-800">
                <div className="space-y-4">
                  <div className="p-4 bg-gray-800/30 rounded-lg">
                    <h3 className="font-semibold mb-2 text-emerald-400">Background</h3>
                    <p className="text-gray-300 font-light">Financial technology expert with a focus on AI applications in market analysis</p>
                  </div>
                  <div className="p-4 bg-gray-800/30 rounded-lg">
                    <h3 className="font-semibold mb-2 text-emerald-400">The Journey</h3>
                    <p className="text-gray-300 font-light">From AI financial assistant app to a revolutionary newsletter platform</p>
                  </div>
                  <div className="p-4 bg-gray-800/30 rounded-lg">
                    <h3 className="font-semibold mb-2 text-emerald-400">Mission</h3>
                    <p className="text-gray-300 font-light">Democratizing access to sophisticated financial insights through AI-powered tools</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center space-y-6 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-blue-400">Join the Future of Financial Intelligence</h2>
              <p className="text-gray-300 text-lg font-light">
                Experience a newsletter that evolves with your needs and provides deeper insights through the power of AI and human expertise.
              </p>
              <Link 
                href="/"
                className="inline-block bg-blue-400 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Subscribe Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 