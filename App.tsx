
import React from 'react';
import Globe from './components/Globe';

const App: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white font-sans overflow-hidden">
      <header className="absolute top-0 left-0 right-0 p-6 text-center z-10 pointer-events-none">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300">
          Interactive 3D World Globe
        </h1>
        <p className="mt-2 text-lg text-gray-400">Drag to rotate. Hover over countries to see their names.</p>
      </header>
      <main className="w-full h-screen flex items-center justify-center">
        <Globe />
      </main>
    </div>
  );
};

export default App;
