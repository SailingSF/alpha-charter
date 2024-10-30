'use client';

import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      // TODO: Implement your newsletter subscription API endpoint
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Your Gateway to</span>
                  <span className="block text-blue-600">Financial Insights</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Get ahead of the market with our expert analysis, curated insights, and actionable investment strategies delivered straight to your inbox.
                </p>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Newsletter Subscription Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-blue-700 rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-12 sm:px-12 lg:px-16">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Join Our Newsletter
              </h2>
              <p className="mt-4 text-lg leading-6 text-blue-100">
                Subscribe now and receive our weekly financial insights completely free.
              </p>
              <form onSubmit={handleSubmit} className="mt-8 sm:flex justify-center">
                <div className="min-w-0 flex-1">
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="block w-full px-4 py-3 rounded-md border-0 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="block w-full py-3 px-6 rounded-md shadow bg-blue-500 text-white font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 disabled:opacity-75"
                  >
                    {status === 'sending' ? 'Subscribing...' : 'Subscribe Now'}
                  </button>
                </div>
              </form>
              
              {/* Status Messages */}
              {status === 'success' && (
                <p className="mt-4 text-sm text-blue-100">
                  Thank you for subscribing! Please check your email to confirm your subscription.
                </p>
              )}
              {status === 'error' && (
                <p className="mt-4 text-sm text-red-200">
                  Oops! Something went wrong. Please try again later.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="mt-6 text-lg font-medium text-gray-900">Market Analysis</h3>
            <p className="mt-2 text-base text-gray-500">
              Deep dive into market trends and expert analysis of global financial markets.
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="mt-6 text-lg font-medium text-gray-900">Timely Updates</h3>
            <p className="mt-2 text-base text-gray-500">
              Get real-time insights and breaking news that impacts your investments.
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="mt-6 text-lg font-medium text-gray-900">Investment Strategies</h3>
            <p className="mt-2 text-base text-gray-500">
              Actionable investment strategies and portfolio management tips.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
