'use client';
import React, { useState } from 'react';
import { ExternalLink, Github, Layers, Globe, Smartphone, Zap, Star, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function WorkSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredProject, setHoveredProject] = useState(null);
  const { theme } = useTheme();

  const projects = [
    {
      id: 1,
      title: "Mahila Tatha Bal-Balika Utthan Samaj",
      category: "web",
      tags: ["React", "Node.js", "NGO", "Next.js"],
      description: "A website for a non-governmental organization to showcase their mission, projects, team and impacts.",
      image: "/pictures/ngo.png",
      url: "https://www.mtbus.org.np",
      stats: { users: "5K+", rating: "4.8" },
      featured: true
    },
    {
      id: 2,
      title: "Deraa",
      category: "web",
      tags: ["React Native", "Firebase", "Next.js", "node.js"],
      description: "Deraa is a room finder website. A website which makes easy for owner and tennants to meet. It is full free, all features are free to use. Check it out!",
      image: "/pictures/deraa.png",
      url: "https://deraa-5c169.web.app/",
      stats: { users: "40+", impact: "2K+" },
      featured: true
    },
    {
      id: 3,
      title: "Sewaa",
      category: "web",
      tags: ["Next.js", "React","TypeScript", "Community", "Social"],
      description: "A Web app where Service provider and customer can contact and connect. It makes easier for new people to get service from nearby service providers. Currently in Progress.",
      image: "/pictures/sewaa.png",
      stats: { Workers: "__", Customers: "__" },
      featured: true
    }
  ];

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Apps' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'design', label: 'Design' }
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="work" className={`min-h-screen py-24 px-6 relative transition-colors duration-500 ${theme === 'dark'
        ? 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950'
        : 'bg-gradient-to-b from-blue-50 via-white to-blue-50'
      }`}>
      {/* Background */}
      <div className={`absolute inset-0 ${theme === 'dark'
          ? 'bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)]'
          : 'bg-[linear-gradient(rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.05)_1px,transparent_1px)]'
        } bg-[size:60px_60px]`} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${theme === 'dark'
              ? 'bg-purple-500/10 border border-purple-500/30 text-purple-400'
              : 'bg-purple-100 border border-purple-300 text-purple-700'
            }`}>
            <Layers size={16} />
            <span>Featured Work</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>Projects That </span>
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Make a Difference
            </span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            From healthcare to social impact, here's how I'm using design and technology to solve real problems
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeFilter === filter.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 scale-105'
                  : theme === 'dark'
                    ? 'bg-slate-800/50 text-slate-300 border border-slate-700 hover:border-slate-600 hover:text-white'
                    : 'bg-white text-slate-600 border border-slate-300 hover:border-slate-400 hover:text-slate-900 shadow-md'
                }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 animate-revealUp block ${theme === 'dark'
                  ? 'bg-slate-800/30 border border-slate-700/50 hover:border-slate-600'
                  : 'bg-white border border-slate-200 hover:border-slate-300 shadow-lg'
                }`}
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Featured badge */}
              {project.featured && (
                <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-500 text-xs font-medium flex items-center gap-1">
                  <Star size={12} />
                  Featured
                </div>
              )}

              {/* Project Image */}
              <div className="h-48 bg-slate-700 relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                {/* Hover overlay with links */}
                <div className={`absolute inset-0 bg-slate-900/90 flex items-center justify-center gap-4 transition-opacity duration-300 ${hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                  <button
                    onClick={(e) => { e.preventDefault(); window.open(project.url, '_blank'); }}
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                    title="Visit website"
                  >
                    <ExternalLink size={20} />
                  </button>
                  <button
                    onClick={(e) => { e.preventDefault(); window.open(`${project.url}/repo`, '_blank'); }}
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                    title="View repository"
                  >
                    <Github size={20} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-3 group-hover:text-blue-500 transition-colors flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                  {project.title}
                  <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className={`mb-4 text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${theme === 'dark'
                          ? 'bg-slate-700/50 text-slate-300'
                          : 'bg-slate-100 text-slate-700'
                        }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex gap-4 text-sm">
                  {Object.entries(project.stats).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-1">
                      <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{value}</span>
                      <span className={theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}>{key}</span>
                    </div>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* View More CTA */}
        <div className="mt-16 text-center">
          <a
            href="/portfolio"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium hover:shadow-2xl hover:shadow-blue-500/30 hover:scale-105 transition-all duration-300"
          >
            <Layers size={18} />
            View Full Portfolio
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}