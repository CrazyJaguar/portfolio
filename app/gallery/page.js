'use client';
import React, { useState } from 'react';
import { X, Camera, Award, Heart, Calendar, ExternalLink, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function GalleryPage() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedImage, setSelectedImage] = useState(null);
    const [galleryItems, setGalleryItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [imageIndices, setImageIndices] = useState({});
    const { theme } = useTheme();

    // Fetch gallery data from JSON file
    React.useEffect(() => {
        fetch('/gallery/gallery.json')
            .then(res => res.json())
            .then(data => {
                setGalleryItems(data);
                // Initialize image indices
                const indices = {};
                data.forEach(item => {
                    indices[item.id] = 0;
                });
                setImageIndices(indices);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to load gallery items:', err);
                setLoading(false);
            });
    }, []);

    // Auto-rotate images in grid view
    React.useEffect(() => {
        if (galleryItems.length === 0) return;

        const intervals = [];
        galleryItems.forEach(item => {
            if (item.images && item.images.length > 1) {
                const interval = setInterval(() => {
                    setImageIndices(prev => ({
                        ...prev,
                        [item.id]: (prev[item.id] + 1) % item.images.length
                    }));
                }, 4000); // Change image every 4 seconds
                intervals.push(interval);
            }
        });

        return () => intervals.forEach(interval => clearInterval(interval));
    }, [galleryItems]);

    // Auto-rotate images in lightbox
    React.useEffect(() => {
        if (!selectedImage || !selectedImage.images || selectedImage.images.length <= 1) return;

        const interval = setInterval(() => {
            setImageIndices(prev => ({
                ...prev,
                [selectedImage.id]: (prev[selectedImage.id] + 1) % selectedImage.images.length
            }));
        }, 4000);

        return () => clearInterval(interval);
    }, [selectedImage]);

    const goToPreviousImage = (itemId, totalImages) => {
        setImageIndices(prev => ({
            ...prev,
            [itemId]: (prev[itemId] - 1 + totalImages) % totalImages
        }));
    };

    const goToNextImage = (itemId, totalImages) => {
        setImageIndices(prev => ({
            ...prev,
            [itemId]: (prev[itemId] + 1) % totalImages
        }));
    };

    const filters = [
        { id: 'all', label: 'All', icon: Camera },
        { id: 'social', label: 'Social Work', icon: Heart },
        { id: 'certificate', label: 'Certificates', icon: Award },
        { id: 'event', label: 'Events', icon: Calendar },
    ];

    const filteredItems = activeFilter === 'all'
        ? galleryItems
        : galleryItems.filter(item => item.category === activeFilter);

    return (
        <div className={`min-h-screen pt-24 pb-16 px-6 transition-colors duration-500 ${theme === 'dark'
                ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'
                : 'bg-gradient-to-br from-slate-50 via-pink-50 to-indigo-50'
            }`}>
            {/* Background */}
            <div className={`fixed inset-0 pointer-events-none ${theme === 'dark'
                    ? 'bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)]'
                    : 'bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)]'
                } bg-[size:60px_60px]`} />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fadeInDown ${theme === 'dark'
                            ? 'bg-pink-500/10 border border-pink-500/30 text-pink-400'
                            : 'bg-pink-100 border border-pink-300 text-pink-700'
                        }`}>
                        <Camera size={16} />
                        <span>Gallery</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fadeInUp">
                        <span className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>Moments & </span>
                        <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                            Achievements
                        </span>
                    </h1>
                    <p className={`text-xl max-w-3xl mx-auto animate-fadeInUp ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`} style={{ animationDelay: '0.2s' }}>
                        A showcase of my social work, certifications, and memorable events
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {filters.map(filter => (
                        <button
                            key={filter.id}
                            onClick={() => setActiveFilter(filter.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeFilter === filter.id
                                    ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg shadow-pink-500/25 scale-105'
                                    : theme === 'dark'
                                        ? 'bg-slate-800/50 text-slate-300 border border-slate-700 hover:border-slate-600 hover:text-white'
                                        : 'bg-white text-slate-600 border border-slate-300 hover:border-slate-400 hover:text-slate-900 shadow-md'
                                }`}
                        >
                            <filter.icon size={16} />
                            {filter.label}
                        </button>
                    ))}
                </div>

                {/* Masonry Grid */}
                {!loading && (
                <div className="masonry-grid">
                    {filteredItems.map((item, index) => {
                        const currentImageIndex = imageIndices[item.id] || 0;
                        const currentImage = item.images[currentImageIndex];
                        const hasMultipleImages = item.images && item.images.length > 1;

                        return (
                            <div key={item.id} className="masonry-item animate-revealUp" style={{ animationDelay: `${index * 50}ms` }}>
                                <div
                                    className={`group relative rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer ${theme === 'dark'
                                            ? 'bg-slate-800/30 border border-slate-700/50 hover:border-slate-600'
                                            : 'bg-white border border-slate-200 hover:border-slate-300 shadow-lg'
                                        }`}
                                    onClick={() => setSelectedImage(item)}
                                >
                                    {/* Image Container */}
                                    <div className="bg-slate-700 relative overflow-hidden">
                                        {/* Image with fade transition */}
                                        <div className="relative w-full">
                                            <img 
                                                src={currentImage} 
                                                alt={item.title}
                                                className="w-full h-auto block group-hover:scale-110 transition-all duration-500"
                                            />
                                        </div>

                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                                            <ZoomIn size={32} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>

                                        {/* Image indicator dots */}
                                        {hasMultipleImages && (
                                            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
                                                {item.images.map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className={`h-1.5 rounded-full transition-all ${
                                                            i === currentImageIndex
                                                                ? 'w-6 bg-white'
                                                                : 'w-1.5 bg-white/50'
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-5">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={`text-xs ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>{item.date}</span>
                                            <span className={`w-1 h-1 rounded-full ${theme === 'dark' ? 'bg-slate-600' : 'bg-slate-400'}`} />
                                            <span className="text-xs text-pink-500">{item.stats}</span>
                                            {hasMultipleImages && (
                                                <>
                                                    <span className={`w-1 h-1 rounded-full ${theme === 'dark' ? 'bg-slate-600' : 'bg-slate-400'}`} />
                                                    <span className="text-xs text-blue-500">{currentImageIndex + 1}/{item.images.length}</span>
                                                </>
                                            )}
                                        </div>
                                        <h3 className={`text-lg font-bold mb-2 group-hover:text-pink-500 transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                            {item.title}
                                        </h3>
                                        <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                )}

                {/* Empty state */}
                {filteredItems.length === 0 && (
                    <div className="text-center py-20">
                        <Camera size={64} className={theme === 'dark' ? 'text-slate-700' : 'text-slate-300'} />
                        <p className={theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}>No items found in this category</p>
                    </div>
                )}
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black/90 z-50 flex items-start justify-center p-4 overflow-y-auto py-8 animate-fadeIn"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-40"
                        onClick={() => setSelectedImage(null)}
                    >
                        <X size={24} />
                    </button>

                    <div
                        className={`flex flex-col rounded-3xl overflow-hidden animate-scaleIn max-w-4xl max-h-[95vh] ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'
                            }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Image Carousel */}
                        {selectedImage.images && selectedImage.images.length > 0 && (
                            <div className="relative bg-slate-700 overflow-auto flex items-center justify-center flex-1">
                                {/* Image with smooth transition */}
                                <img 
                                    src={selectedImage.images[imageIndices[selectedImage.id] || 0]} 
                                    alt={selectedImage.title}
                                    className="max-w-full max-h-full object-contain transition-opacity duration-500"
                                />

                                {/* Navigation Arrows - Only show if multiple images */}
                                {selectedImage.images.length > 1 && (
                                    <>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                goToPreviousImage(selectedImage.id, selectedImage.images.length);
                                            }}
                                            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors z-20"
                                        >
                                            <ChevronLeft size={20} />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                goToNextImage(selectedImage.id, selectedImage.images.length);
                                            }}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors z-20"
                                        >
                                            <ChevronRight size={20} />
                                        </button>

                                        {/* Image Counter and Indicator Dots */}
                                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3">
                                            {/* Dots */}
                                            <div className="flex gap-2">
                                                {selectedImage.images.map((_, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setImageIndices(prev => ({
                                                                ...prev,
                                                                [selectedImage.id]: i
                                                            }));
                                                        }}
                                                        className={`h-2 rounded-full transition-all ${
                                                            i === (imageIndices[selectedImage.id] || 0)
                                                                ? 'w-6 bg-white'
                                                                : 'w-2 bg-white/50 hover:bg-white/70'
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                            {/* Counter */}
                                            <span className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
                                                {(imageIndices[selectedImage.id] || 0) + 1} / {selectedImage.images.length}
                                            </span>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}

                        {/* Details */}
                        <div className="p-8 bg-gradient-to-t from-slate-900 to-transparent">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 bg-pink-500/20 text-pink-500 rounded-full text-sm">
                                    {selectedImage.category === 'social' ? 'Social Work' : selectedImage.category === 'certificate' ? 'Certificate' : 'Event'}
                                </span>
                                <span className={theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}>{selectedImage.date}</span>
                            </div>
                            <h2 className={`text-2xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{selectedImage.title}</h2>
                            <p className={`text-base mb-4 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{selectedImage.description}</p>
                            <div className="flex items-center gap-4">
                                <span className={`px-4 py-2 rounded-lg font-medium ${theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-900'
                                    }`}>
                                    {selectedImage.stats}
                                </span>
                                <button className="px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg font-medium flex items-center gap-2 hover:shadow-lg transition-shadow">
                                    <ExternalLink size={16} />
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
