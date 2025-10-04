import React from 'react';
import Globe from './components/Globe';

const dataOptions = [
  {
    title: 'About Terra',
    description: 'An introduction to the database and the project\'s mission to provide accessible environmental insights.',
  },
  {
    title: 'Vegetation Shifts',
    description: 'Explore dynamic visualizations of changing global vegetation patterns and understand their climatic impact.',
  },
  {
    title: 'Land Temperature Trends',
    description: 'Analyze historical and current land temperature variations across the globe with detailed heatmaps.',
  },
  {
    title: 'Annual Extremes',
    description: 'Focus on yearly high and low temperature records and other significant climatic events.',
  },
];

const App: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-black text-white font-sans overflow-hidden">
      <div className="w-full md:w-1/2 lg:w-2/5 p-8 md:p-12 z-10">
        <header className="mb-8 text-center md:text-left">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300">
            From Space to Earth
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Journey from a cosmic perspective to detailed terrestrial data. Select a dataset to begin your exploration of Terra's environmental insights.
          </p>
        </header>

        <nav className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {dataOptions.map((option) => (
            <div
              key={option.title}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-5 cursor-pointer transition-all hover:border-teal-400 hover:bg-gray-800/60"
              role="button"
              tabIndex={0}
              aria-label={`Explore ${option.title}`}
            >
              <h2 className="text-xl font-bold text-teal-300">{option.title}</h2>
              <p className="mt-2 text-gray-400 text-sm">{option.description}</p>
            </div>
          ))}
        </nav>
      </div>

      <main className="w-full md:w-1/2 lg:w-3/5 h-screen flex items-center justify-center -ml-0 md:-ml-24 lg:-ml-32">
        <Globe />
      </main>
    </div>
  );
};

export default App;
