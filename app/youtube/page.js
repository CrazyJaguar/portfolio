'use client';
import React, { useState, useEffect } from 'react';
import { Youtube, Play, ExternalLink, Eye, Clock, TrendingUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function YouTubeShowcase() {
  const { theme } = useTheme();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeTab, setActiveTab] = useState('featured');

  // OPTION 1: Manual video list (no API needed)
  const manualVideos = [
    {
      id: 'FT3-EG7XkH0',
      title: 'How to download NCERT books for free',
      thumbnail: 'https://i.ytimg.com/vi/FT3-EG7XkH0/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCX5WJaapBDnvcB0Na7nA9uI1OEHg',
      views: '80',
      duration: '3:54',
      featured: false
    },
    {
      id: 'ZFTUTtKlZZ0',
      title: 'How to download latest movies in full HD from websites?.',
      thumbnail: 'https://i.ytimg.com/vi/ZFTUTtKlZZ0/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLADBw5VR877Cpu4nb5R5rQn8hu02A',
      views: '78',
      duration: '3:58',
      featured: false
    },
    {
      id: 'fpoo1l6DjJA',
      title: 'How to see password of saved networks?',
      thumbnail: 'https://i.ytimg.com/vi/fpoo1l6DjJA/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLC41Juyk7XL6LUFqHhEKF2wfjh2FQ',
      views: '64',
      duration: '1:28',
      featured: false
    },
    {
      id: 'KmbuDiVT3Qc',
      title: 'How to add two pic in one using photoshop?(No one could believe it.)',
      thumbnail: 'https://i.ytimg.com/vi/KmbuDiVT3Qc/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDFyYdh04vYV8XxR8WxBhKBbrk3fQ',
      views: '96',
      duration: '9:04',
      featured: true
    },
    {
      id: 'ZvxwXG1mdkY',
      title: 'How to see saved wlan or networks password using CMD?',
      thumbnail: 'https://i.ytimg.com/vi/ZvxwXG1mdkY/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCD1yZAkCWDXuxGc2HqTBMK_RVCuQ',
      views: '84',
      duration: '2:55',
      featured: false
    },
    {
      id: 'hAHG2a04SY8',
      title: 'How to watch movie online for free?',
      thumbnail: 'https://i.ytimg.com/vi/hAHG2a04SY8/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLB-uGS7ZhYO4gUVUzuOh24ucyjNGw',
      views: '112',
      duration: '2:47',
      featured: false
    },
    {
      id: 'Wxquz5TyjYU',
      title: 'Self made Project of Sketchup....',
      thumbnail: 'https://i.ytimg.com/vi/Wxquz5TyjYU/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAIuKjwrY4WILPma-y16fv_Ipe2eQ',
      views: '103',
      duration: '1:50',
      featured: true
    },
    {
      id: 'eqq0s_7P9pI',
      title: 'How to make house using sketchup?(for beginner 1st tutorial....)',
      thumbnail: 'https://i.ytimg.com/vi/eqq0s_7P9pI/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCXl7TdeDDuoJvZj0FJxXHU_KP28g',
      views: '99',
      duration: '14:17',
      featured: false
    },
    {
      id: 'cu7SKDouUAY',
      title: 'How to make house using sketchup?(for beginner 2nd tutorial....)',
      thumbnail: 'https://i.ytimg.com/vi/cu7SKDouUAY/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCPLSJyPZ3qBMWcZNRPNF0YB0BN7w',
      views: '118',
      duration: '5:08',
      featured: false
    }
  ];

  const channelInfo = {
    name: 'Mr. Sansar Soul',
    subscribers: '77',
    totalViews: '834',
    videoCount: '9',
    channelUrl: 'https://www.youtube.com/@mr.sansarsoul5756'
  };

  const filteredVideos = activeTab === 'featured'
    ? manualVideos.filter(v => v.featured)
    : manualVideos;

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme === 'dark'
      ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'
      : 'bg-gradient-to-br from-slate-50 via-red-50 to-orange-50'
      }`}>
      {/* Background Grid */}
      <div className={`fixed inset-0 pointer-events-none ${theme === 'dark'
        ? 'bg-[linear-gradient(rgba(239,68,68,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.02)_1px,transparent_1px)]'
        : 'bg-[linear-gradient(rgba(239,68,68,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.05)_1px,transparent_1px)]'
        } bg-[size:60px_60px]`} />

      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${theme === 'dark'
            ? 'bg-red-500/10 border border-red-500/30 text-red-400'
            : 'bg-red-100 border border-red-300 text-red-700'
            }`}>
            <Youtube size={16} />
            <span>YouTube Channel</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>Watch My </span>
            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-pink-500 bg-clip-text text-transparent">
              Video Content
            </span>
          </h1>

          <p className={`text-xl max-w-3xl mx-auto mb-8 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>
            Tutorials, demos, and insights on web development
          </p>

          {/* Channel Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className={`px-6 py-3 rounded-xl ${theme === 'dark'
              ? 'bg-slate-800/50 border border-slate-700'
              : 'bg-white border border-slate-200 shadow-md'
              }`}>
              <div className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                {channelInfo.subscribers}
              </div>
              <div className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                Subscribers
              </div>
            </div>

            <div className={`px-6 py-3 rounded-xl ${theme === 'dark'
              ? 'bg-slate-800/50 border border-slate-700'
              : 'bg-white border border-slate-200 shadow-md'
              }`}>
              <div className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                {channelInfo.totalViews}
              </div>
              <div className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                Total Views
              </div>
            </div>

            <div className={`px-6 py-3 rounded-xl ${theme === 'dark'
              ? 'bg-slate-800/50 border border-slate-700'
              : 'bg-white border border-slate-200 shadow-md'
              }`}>
              <div className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                {channelInfo.videoCount}
              </div>
              <div className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                Videos
              </div>
            </div>
          </div>

          {/* Subscribe Button */}
          <a
            href={channelInfo.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold rounded-full transition-all shadow-lg shadow-red-500/25 hover:shadow-red-500/40"
          >
            <Youtube size={20} />
            Subscribe on YouTube
            <ExternalLink size={16} />
          </a>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('featured')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'featured'
              ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg'
              : theme === 'dark'
                ? 'bg-slate-800/50 text-slate-400 border border-slate-700 hover:text-white'
                : 'bg-white text-slate-600 border border-slate-300 hover:text-slate-900 shadow-md'
              }`}
          >
            <TrendingUp size={16} className="inline mr-2" />
            Featured Videos
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'all'
              ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg'
              : theme === 'dark'
                ? 'bg-slate-800/50 text-slate-400 border border-slate-700 hover:text-white'
                : 'bg-white text-slate-600 border border-slate-300 hover:text-slate-900 shadow-md'
              }`}
          >
            All Videos
          </button>
        </div>

        {/* Video Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video, index) => (
            <div
              key={index}
              onClick={() => setSelectedVideo(video)}
              className={`group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 cursor-pointer ${theme === 'dark'
                ? 'bg-slate-800/30 border border-slate-700/50 hover:border-red-500/50'
                : 'bg-white border border-slate-200 hover:border-red-400 shadow-lg hover:shadow-xl'
                }`}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-slate-700 overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Play Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
                    <Play size={28} className="text-white ml-1" fill="white" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs font-medium rounded">
                  {video.duration}
                </div>
              </div>

              {/* Video Info */}
              <div className="p-4">
                <h3 className={`font-bold mb-2 line-clamp-2 group-hover:text-red-500 transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                  {video.title}
                </h3>

                <div className={`flex items-center gap-4 text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                  <span className="flex items-center gap-1">
                    <Eye size={14} />
                    {video.views} views
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className={`rounded-2xl shadow-2xl w-full max-w-5xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'
              }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-red-600 to-orange-600 p-4 rounded-t-2xl flex items-center justify-between">
              <h2 className="text-white font-bold text-xl">{selectedVideo.title}</h2>
              <button
                onClick={() => setSelectedVideo(null)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Video Player */}
            <div className="aspect-video bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={selectedVideo.title}
              />
            </div>

            {/* Modal Footer */}
            <div className={`p-4 flex gap-3 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'
              }`}>
              <button
                onClick={() => setSelectedVideo(null)}
                className={`flex-1 py-3 rounded-lg font-medium ${theme === 'dark'
                  ? 'bg-slate-700 hover:bg-slate-600 text-white'
                  : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                  }`}
              >
                Close
              </button>
              <a
                href={`https://www.youtube.com/watch?v=${selectedVideo.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-medium py-3 rounded-lg"
              >
                <span>Watch on YouTube</span>
                <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}