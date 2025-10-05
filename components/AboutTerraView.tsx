import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface AboutTerraViewProps {
  onBack: () => void;
}

const AboutTerraView: React.FC<AboutTerraViewProps> = ({ onBack }) => {
  const instruments = [
    { name: 'MODIS', description: 'Observes land, ocean, and atmospheric conditions' },
    { name: 'ASTER', description: 'Captures detailed images for surface mapping and environmental monitoring' },
    { name: 'CERES', description: 'Measures Earth’s energy balance and radiation budget' },
    { name: 'MISR', description: 'Collects atmospheric and cloud data from multiple angles' },
    { name: 'MOPITT', description: 'Measures atmospheric carbon monoxide' },
  ];

  return (
    <div className="flex flex-col w-full h-screen bg-black text-white font-sans">
      <header className="flex items-center p-4 border-b border-gray-800 z-20 flex-shrink-0 bg-black/80 backdrop-blur-sm">
        <button
          onClick={onBack}
          className="flex items-center gap-2 rounded-md px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
          aria-label="Go back to main view"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <h1 className="text-xl font-bold text-teal-300 ml-4 truncate">
          About Terra
        </h1>
      </header>
      <main className="flex-grow relative overflow-y-auto">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 opacity-10"
          style={{ backgroundImage: "url('https://climate.nasa.gov/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbHR6IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--cf01b0f19662b254c251a37c449102432a5d2039/terra.jpg')" }}
        ></div>

        <div className="relative z-10 p-8 md:p-12 max-w-4xl mx-auto">
          <p className="text-lg text-gray-300 leading-relaxed mb-8">
            Terra is a NASA flagship Earth-observing satellite launched in December 1999. It orbits the planet in a near-polar, sun-synchronous path about 705 kilometers above Earth’s surface. Terra specializes in collecting comprehensive data on Earth’s land, atmosphere, and oceans using five primary scientific instruments.
          </p>

          <h2 className="text-3xl font-bold text-teal-300 mb-6 border-l-4 border-teal-400 pl-4">
            Key Information
          </h2>

          <div className="space-y-6 text-gray-300">
            <div>
              <h3 className="font-semibold text-white">Launch Date:</h3>
              <p>December 18, 1999</p>
            </div>
            <div>
              <h3 className="font-semibold text-white">Orbit:</h3>
              <p>Around 705 km above Earth in a sun-synchronous, near-polar orbit</p>
            </div>
            <div>
              <h3 className="font-semibold text-white">Mission Purpose:</h3>
              <p>Terra’s observations help scientists understand climate change, vegetation patterns, global temperature dynamics, and air quality on both local and global scales.</p>
            </div>
            <div>
              <h3 className="font-semibold text-white">Applications:</h3>
              <p>Its data is widely used for climate research, disaster management, agriculture, ecosystem health, and environmental policy-making.</p>
            </div>
            <div>
              <h3 className="font-semibold text-white">Legacy:</h3>
              <p>With over twenty years of continuous data, Terra has become fundamental for long-term climate and environmental research, offering insights into trends like deforestation, urbanization, and seasonal cycles of vegetation and temperature.</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3">Main Instruments:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4 border-l-2 border-gray-700">
                {instruments.map(inst => (
                  <div key={inst.name} className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
                    <p className="font-bold text-teal-400">{inst.name}</p>
                    <p className="text-sm text-gray-400">{inst.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 italic">
            Terra continues to play a crucial role in monitoring the health and changes of planet Earth.
          </p>
        </div>
      </main>
    </div>
  );
};

export default AboutTerraView;
