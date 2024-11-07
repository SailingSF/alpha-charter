'use client';

import { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/subscribe/`, {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-blue-400/10">
        <div className="px-6 py-12 sm:px-12 lg:px-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Join Our Smart Newsletter
            </h2>
            <p className="mt-4 text-lg leading-6 text-blue-200">
              Subscribe now to receive financial insights and get answers to your investment questions, all through your email, powered by AI.
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
                  className="block w-full px-4 py-3 rounded-lg border-0 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/90"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="block w-full py-3 px-6 rounded-lg shadow bg-blue-500 text-white font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 disabled:opacity-75 transition-all duration-200"
                >
                  {status === 'sending' ? 'Subscribing...' : 'Get Started'}
                </button>
              </div>
            </form>
            
            {/* Status Messages */}
            {status === 'success' && (
              <p className="mt-4 text-sm text-blue-200 bg-blue-500/20 p-3 rounded-lg">
                Welcome aboard! Check your email to confirm your subscription.
              </p>
            )}
            {status === 'error' && (
              <p className="mt-4 text-sm text-red-200 bg-red-500/20 p-3 rounded-lg">
                Oops! Something went wrong. Please try again later.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 