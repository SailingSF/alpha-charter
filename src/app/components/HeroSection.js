export default function HeroSection() {
  return (
    <div className="relative overflow-hidden pb-16">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 mix-blend-multiply" />
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pt-12 pb-4 lg:max-w-2xl lg:w-full">
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