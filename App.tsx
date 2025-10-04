import React, { useState } from 'react';
import Globe from './components/Globe';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCountry, setSearchCountry] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchCountry(searchTerm.trim());
    }
  };

  const handleSearchComplete = () => {
    setSearchCountry(null);
    // Keep the search term in the box to show what was searched
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white font-sans overflow-hidden">
      <header className="absolute top-0 left-0 right-0 p-6 text-center z-10">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300">
          TerraAnima: Celebrating a World of Data
        </h1>
        <p className="mt-2 text-lg text-gray-400">Drag to rotate, hover to explore, or search for a country.</p>
        <form onSubmit={handleSearch} className="mt-4 max-w-sm mx-auto flex" role="search">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="e.g., Brazil"
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-teal-400 text-white transition-colors"
            aria-label="Search for a country"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-r-md focus:outline-none focus:ring-2 focus:ring-teal-400 transition-colors"
            aria-label="Search"
          >
            Search
          </button>
        </form>
      </header>
      <main className="w-full h-screen flex items-center justify-center">
        <Globe searchCountry={searchCountry} onSearchComplete={handleSearchComplete} />
      </main>
    </div>
  );
};

export default App;