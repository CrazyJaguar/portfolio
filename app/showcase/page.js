'use client';
import React, { useState } from 'react';
import { ExternalLink, AlertCircle, X, Maximize2 } from 'lucide-react';

const WebsiteShowcase = () => {
  const [iframeError, setIframeError] = useState({});
  const [selectedSite, setSelectedSite] = useState(null);

  const websites = [
    { 
      id: 1, 
      name: "Mahila tatha bal-balika utthan samaj", 
      url: "https://www.mtbus.org.np",
      description: "A website for a non-governmental organization to showcase their mission, projects, team and impacts."
    },
    { 
      id: 2, 
      name: "deraa", 
      url: "https://deraa-5c169.web.app/",
      description: "Deraa is a room finder website. A website which makes easy for owner and tennants to meet. It is full free, all features are free to use. Check it out!"
    },
    { 
      id: 3, 
      name: "Wikipedia", 
      url: "https://en.wikipedia.org",
      description: "The free encyclopedia"
    }
  ];

  const handleIframeError = (id) => {
    setIframeError(prev => ({ ...prev, [id]: true }));
  };

  const openModal = (site) => {
    setSelectedSite(site);
  };

  const closeModal = () => {
    setSelectedSite(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2 text-center">
          Website Showcase
        </h1>
        <p className="text-slate-300 text-center mb-12">
          Click any card for a larger preview
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {websites.map((site) => (
            <div 
              key={site.id}
              className="bg-white rounded-xl shadow-2xl overflow-hidden hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => openModal(site)}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-bold text-lg">{site.name}</h3>
                    <p className="text-purple-100 text-sm">{site.description}</p>
                  </div>
                  <Maximize2 className="w-5 h-5 text-white/70" />
                </div>
              </div>

              {/* Preview Area */}
              <div className="relative h-64 bg-slate-100">
                {!iframeError[site.id] ? (
                  <iframe
                    src={site.url}
                    className="w-full h-full border-0 pointer-events-none"
                    title={site.name}
                    sandbox="allow-scripts allow-same-origin"
                    onError={() => handleIframeError(site.id)}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-slate-600">
                    <AlertCircle className="w-12 h-12 mb-3 text-slate-400" />
                    <p className="text-sm font-medium">Preview not available</p>
                    <p className="text-xs text-slate-400 mt-1">Click to view in full screen</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 bg-slate-50 border-t">
                <div className="text-center text-sm text-slate-600">
                  Click card to view it live
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Box */}
        
      </div>

      {/* Large Modal View */}
      {selectedSite && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-t-2xl flex items-center justify-between">
              <div>
                <h2 className="text-white font-bold text-2xl">{selectedSite.name}</h2>
                <p className="text-purple-100 text-sm">{selectedSite.description}</p>
              </div>
              <button
                onClick={closeModal}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Large Preview Area */}
            <div className="flex-1 bg-slate-100 relative overflow-hidden">
              {!iframeError[selectedSite.id] ? (
                <iframe
                  src={selectedSite.url}
                  className="w-full h-full border-0"
                  title={selectedSite.name}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-600">
                  <AlertCircle className="w-16 h-16 mb-4 text-slate-400" />
                  <p className="text-lg font-medium">Preview not available</p>
                  <p className="text-sm text-slate-400 mt-2">This site blocks embedding</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t flex gap-3">
              <button
                onClick={closeModal}
                className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Close Preview
              </button>
              <a
                href={selectedSite.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                <span>Visit Website</span>
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebsiteShowcase;