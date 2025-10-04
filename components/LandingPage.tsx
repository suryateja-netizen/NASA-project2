import React from 'react';

const LandingPage: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* Starfield Background */}
      <div className="stars absolute inset-0"></div>
      <div className="twinkling absolute inset-0"></div>

      {/* Animated NASA Logo */}
      <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center animate-[nasa-intro_2s_ease-out_forwards]">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg" 
          alt="NASA Logo" 
          className="w-full h-full" 
        />
      </div>
      
      {/* App Title */}
      <h1 className="mt-8 text-3xl lg:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300 animate-[fade-in-up_1.5s_ease-out_forwards] opacity-0" style={{ animationDelay: '1s' }}>
        From Space to Earth
      </h1>
    </div>
  );
};

export default LandingPage;