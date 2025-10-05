import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface DataViewProps {
  title: string;
  url: string;
  onBack: () => void;
}

const DataView: React.FC<DataViewProps> = ({ title, url, onBack }) => {
  return (
    <div className="flex flex-col w-full h-screen bg-black text-white font-sans">
      <header className="flex items-center p-4 border-b border-gray-800 z-10 flex-shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-2 rounded-md px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
          aria-label="Go back to main view"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <h1 className="text-xl font-bold text-teal-300 ml-4 truncate">
          {title}
        </h1>
      </header>
      <main className="flex-grow relative bg-gray-900">
        <iframe
          src={url}
          title={title}
          className="absolute top-0 left-0 w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin"
        ></iframe>
      </main>
    </div>
  );
};

export default DataView;
