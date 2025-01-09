import React from 'react';
import { ArrowLeft, PlayCircle, Share2 } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gray-900 border-b border-gray-700">
      <div className="max-w-full px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-white">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-white text-lg font-medium">Post-Production Workflow Hub</h1>
              <p className="text-gray-400 text-sm">Project: Interstellar</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
              <PlayCircle size={16} />
              Preview
            </button>
            <button className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600">
              <Share2 size={16} />
              Share
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}