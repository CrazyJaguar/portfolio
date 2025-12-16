'use client';
import React, { useState } from 'react';
import { ExternalLink, Github, Layers, Globe, Smartphone, Database, Zap, Star, ArrowUpRight, Search, Code2, X, Maximize2, AlertCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function PortfolioPage() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState(null);
    const [iframeError, setIframeError] = useState({});
    const { theme } = useTheme();

    // Fetch projects from JSON file
    React.useEffect(() => {
        fetch('/projects/projects.json')
            .then(res => res.json())
            .then(data => {
                setProjects(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to load projects:', err);
                setLoading(false);
            });
    }, []);

    const filters = [
        { id: 'all', label: 'All Projects' },
        { id: 'fullstack', label: 'Full Stack' },
        { id: 'frontend', label: 'Frontend' },
        { id: 'backend', label: 'Backend' },
        { id: 'mobile', label: 'Mobile' },
    ];

    const filteredProjects = projects.filter(project => {
        const matchesFilter = activeFilter === 'all' || project.category === activeFilter;
        const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesFilter && matchesSearch;
    });

    const featuredProjects = filteredProjects.filter(p => p.featured);
    const regularProjects = filteredProjects.filter(p => !p.featured);

    const handleIframeError = (id) => {
        setIframeError(prev => ({ ...prev, [id]: true }));
    };

    const openPreview = (project, e) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedProject(project);
    };

    const closePreview = () => {
        setSelectedProject(null);
    };

    return (
        <div className={`min-h-screen pt-24 pb-16 px-6 transition-colors duration-500 ${theme === 'dark'
                ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'
                : 'bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50'
            }`}>
            {/* Background */}
            <div className={`fixed inset-0 pointer-events-none ${theme === 'dark'
                    ? 'bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)]'
                    : 'bg-[linear-gradient(rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.05)_1px,transparent_1px)]'
                } bg-[size:60px_60px]`} />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fadeInDown ${theme === 'dark'
                            ? 'bg-purple-500/10 border border-purple-500/30 text-purple-400'
                            : 'bg-purple-100 border border-purple-300 text-purple-700'
                        }`}>
                        <Layers size={16} />
                        <span>Portfolio</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fadeInUp">
                        <span className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>My </span>
                        <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                            Complete Work
                        </span>
                    </h1>
                    <p className={`text-xl max-w-3xl mx-auto animate-fadeInUp ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`} style={{ animationDelay: '0.2s' }}>
                        A comprehensive showcase of projects, from concept to deployment
                    </p>
                </div>

                {/* Search & Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-12">
                    {/* Search */}
                    <div className="relative flex-1 max-w-md mx-auto md:mx-0">
                        <Search size={20} className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`} />
                        <input
                            type="text"
                            placeholder="Search projects or technologies..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={`w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none transition-colors ${theme === 'dark'
                                    ? 'bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:border-purple-500'
                                    : 'bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-purple-500 shadow-md'
                                }`}
                        />
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {filters.map(filter => (
                            <button
                                key={filter.id}
                                onClick={() => setActiveFilter(filter.id)}
                                className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-300 ${activeFilter === filter.id
                                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25'
                                        : theme === 'dark'
                                            ? 'bg-slate-800/50 text-slate-400 border border-slate-700 hover:border-slate-600 hover:text-white'
                                            : 'bg-white text-slate-600 border border-slate-300 hover:border-slate-400 hover:text-slate-900 shadow-md'
                                    }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Featured Projects */}
                {!loading && featuredProjects.length > 0 && (
                    <div className="mb-16">
                        <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                            <Star size={18} className="text-amber-500" />
                            Featured Projects
                        </h2>
                        <div className="grid lg:grid-cols-2 gap-6">
                            {featuredProjects.map((project, index) => (
                                <div
                                    key={project.id}
                                    className={`group rounded-2xl overflow-hidden transition-all duration-500 animate-revealUp cursor-pointer ${theme === 'dark'
                                            ? 'bg-slate-800/30 border border-slate-700/50 hover:border-purple-500/50'
                                            : 'bg-white border border-slate-200 hover:border-purple-400 shadow-xl'
                                        }`}
                                    style={{ animationDelay: `${index * 100}ms` }}
                                    onClick={(e) => openPreview(project, e)}
                                >
                                    <div className="grid md:grid-cols-2">
                                        {/* Image */}
                                        <div className="h-48 md:h-full bg-slate-700 relative min-h-[200px] overflow-hidden">
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute top-4 left-4 px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-500 text-xs font-medium flex items-center gap-1">
                                                <Star size={12} />
                                                Featured
                                            </div>
                                            <div className="absolute top-4 right-4">
                                                <Maximize2 className="w-5 h-5 text-white/70" />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className={`text-xs ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>{project.year}</span>
                                                <span className={`px-2 py-0.5 rounded text-xs capitalize ${theme === 'dark' ? 'bg-slate-700/50 text-slate-400' : 'bg-slate-100 text-slate-600'
                                                    }`}>
                                                    {project.category}
                                                </span>
                                            </div>
                                            <h3 className={`text-xl font-bold mb-3 group-hover:text-purple-500 transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                                {project.title}
                                            </h3>
                                            <p className={`text-sm mb-4 line-clamp-3 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                                                {project.longDescription || project.description}
                                            </p>

                                            {/* Tech Stack */}
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {project.tech.slice(0, 4).map((tech) => (
                                                    <span key={tech} className={`px-2 py-1 rounded text-xs ${theme === 'dark' ? 'bg-purple-500/10 text-purple-300' : 'bg-purple-100 text-purple-700'
                                                        }`}>
                                                        {tech}
                                                    </span>
                                                ))}
                                                {project.tech.length > 4 && (
                                                    <span className={`px-2 py-1 rounded text-xs ${theme === 'dark' ? 'bg-slate-700/50 text-slate-400' : 'bg-slate-100 text-slate-600'
                                                        }`}>
                                                        +{project.tech.length - 4} more
                                                    </span>
                                                )}
                                            </div>

                                            {/* Actions */}
                                            <div className="flex gap-3">
                                                <button 
                                                    onClick={(e) => openPreview(project, e)}
                                                    className="flex-1 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:shadow-lg transition-shadow">
                                                    <Maximize2 size={14} />
                                                    Preview
                                                </button>
                                                <a 
                                                    href={project.githubUrl} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    onClick={(e) => e.stopPropagation()}
                                                    className={`px-4 py-2 rounded-lg transition-colors ${theme === 'dark'
                                                        ? 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                                    }`}>
                                                    <Github size={18} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* All Projects Grid */}
                <div>
                    <h2 className={`text-xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>All Projects</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {regularProjects.map((project, index) => (
                            <div
                                key={project.id}
                                onClick={(e) => openPreview(project, e)}
                                className={`group rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 animate-revealUp cursor-pointer ${theme === 'dark'
                                        ? 'bg-slate-800/30 border border-slate-700/50 hover:border-slate-600'
                                        : 'bg-white border border-slate-200 hover:border-slate-300 shadow-lg'
                                    }`}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Header */}
                                <div className="h-40 bg-slate-700 relative overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-3 right-3">
                                        <Maximize2 className="w-4 h-4 text-white/70" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`text-xs ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>{project.year}</span>
                                        <span className={`px-2 py-0.5 rounded text-xs capitalize ${theme === 'dark' ? 'bg-slate-700/50 text-slate-400' : 'bg-slate-100 text-slate-600'
                                            }`}>
                                            {project.category}
                                        </span>
                                    </div>
                                    <h3 className={`text-lg font-bold mb-2 group-hover:text-purple-500 transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                        {project.title}
                                    </h3>
                                    <p className={`text-sm mb-4 line-clamp-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                                        {project.description}
                                    </p>

                                    {/* Tech */}
                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                        {project.tech.slice(0, 3).map((tech) => (
                                            <span key={tech} className={`px-2 py-0.5 rounded text-xs ${theme === 'dark' ? 'bg-slate-700/50 text-slate-400' : 'bg-slate-100 text-slate-600'
                                                }`}>
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={(e) => openPreview(project, e)}
                                            className={`flex-1 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors ${theme === 'dark'
                                                ? 'bg-slate-700/50 text-white hover:bg-slate-700'
                                                : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                                            }`}>
                                            <Maximize2 size={14} />
                                            Preview
                                        </button>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); window.open(project.githubUrl, '_blank'); }}
                                            className={`px-3 py-2 rounded-lg transition-colors ${theme === 'dark'
                                                ? 'bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-white'
                                                : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900'
                                            }`}>
                                            <Github size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                    <div className="text-center py-20">
                        <Layers size={64} className={theme === 'dark' ? 'text-slate-700' : 'text-slate-300'} />
                        <p className={`mb-2 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>No projects found</p>
                        <button
                            onClick={() => { setActiveFilter('all'); setSearchQuery(''); }}
                            className="text-purple-500 hover:text-purple-400 transition-colors"
                        >
                            Clear filters
                        </button>
                    </div>
                )}
            </div>

            {/* Large Preview Modal */}
            {selectedProject && (
                <div 
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={closePreview}
                >
                    <div 
                        className={`rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-t-2xl flex items-center justify-between">
                            <div className="flex-1">
                                <h2 className="text-white font-bold text-2xl">{selectedProject.title}</h2>
                                <p className="text-purple-100 text-sm">{selectedProject.description}</p>
                            </div>
                            <button
                                onClick={closePreview}
                                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors ml-4"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Large Preview Area */}
                        <div className="flex-1 bg-slate-100 relative overflow-hidden">
                            {!iframeError[selectedProject.id] ? (
                                <iframe
                                    src={selectedProject.liveUrl}
                                    className="w-full h-full border-0"
                                    title={selectedProject.title}
                                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                                    onError={() => handleIframeError(selectedProject.id)}
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
                        <div className={`p-4 border-t flex gap-3 ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                            <button
                                onClick={closePreview}
                                className={`flex-1 font-medium py-3 px-6 rounded-lg transition-colors ${theme === 'dark'
                                    ? 'bg-slate-700 hover:bg-slate-600 text-white'
                                    : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                                }`}
                            >
                                Close Preview
                            </button>
                            <a
                                href={selectedProject.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                            >
                                <span>Visit Website</span>
                                <ExternalLink className="w-5 h-5" />
                            </a>
                            <a
                                href={selectedProject.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`px-6 py-3 rounded-lg transition-colors flex items-center gap-2 ${theme === 'dark'
                                    ? 'bg-slate-700 hover:bg-slate-600 text-white'
                                    : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                                }`}
                            >
                                <Github className="w-5 h-5" />
                                <span className="hidden sm:inline">Code</span>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 