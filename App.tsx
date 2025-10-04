import React from "react";
import Globe from "./components/Globe";
import {
  Globe2,
  Leaf,
  ThermometerSun,
  Activity,
} from "lucide-react"; // Icon imports

// Data options with icons
const dataOptions = [
  {
    title: "About Terra",
    icon: Globe2,
  },
  {
    title: "Vegetation Shifts",
    icon: Leaf,
  },
  {
    title: "Land Temperature Trends",
    icon: ThermometerSun,
  },
  {
    title: "Annual Extremes",
    icon: Activity,
  },
];

const App: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-black text-white font-sans overflow-hidden">
      {/* Left Panel */}
      <div className="w-full md:w-1/2 lg:w-2/5 p-8 md:p-12 z-10 relative">
        <header className="mb-8 text-center md:text-left">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300">
            From Space to Earth
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Journey from a cosmic perspective to detailed terrestrial data.
            Select a dataset to begin your exploration of Terra’s environmental
            insights.
          </p>
        </header>

        {/* Dataset cards */}
        <nav className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {dataOptions.map((option) => (
            <div
              key={option.title}
              className="group bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-5 cursor-pointer transition-all hover:border-teal-400 hover:bg-gray-800/60 hover:shadow-lg"
              role="button"
              tabIndex={0}
              aria-label={`Explore ${option.title}`}
            >
              <div className="flex items-center gap-3 mb-2">
                <option.icon className="w-6 h-6 text-teal-300 transition-transform duration-300 group-hover:scale-110" />
                <h2 className="text-xl font-bold text-teal-300">
                  {option.title}
                </h2>
              </div>
              <p className="text-gray-400 text-sm">{option.description}</p>
            </div>
          ))}
        </nav>
      </div>

      {/* Right Globe Panel */}
      <main className="w-full md:w-1/2 lg:w-3/5 h-screen flex items-center justify-center -ml-0 md:-ml-24 lg:-ml-32">
        <Globe />
      </main>
    </div>
  );
};

export default App;
