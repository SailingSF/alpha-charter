export default function FeatureSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
          <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-blue-500 text-white mx-auto">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <h3 className="mt-6 text-lg font-medium text-white text-center">AI-Powered Analysis</h3>
          <p className="mt-2 text-base text-gray-400 text-center">
            Get personalized market insights powered by advanced AI technology.
          </p>
        </div>

        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
          <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-blue-500 text-white mx-auto">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h3 className="mt-6 text-lg font-medium text-white text-center">Interactive Q&A</h3>
          <p className="mt-2 text-base text-gray-400 text-center">
            Ask questions by replying to the newsletter and receive detailed responses about market trends and investments with sophisticated AI using data tools.
          </p>
        </div>

        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
          <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-blue-500 text-white mx-auto">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="mt-6 text-lg font-medium text-white text-center">Custom Strategies</h3>
          <p className="mt-2 text-base text-gray-400 text-center">
            Receive tailored investment ideas based on your interests and goals.
          </p>
        </div>
      </div>
    </div>
  );
} 