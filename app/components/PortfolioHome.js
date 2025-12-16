'use client';
import React, { useState, useEffect } from 'react';
import { ArrowRight, Github, Linkedin, Mail, Terminal, Sparkles, ChevronDown, Facebook, Instagram } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function PortfolioHome() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState('');
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const { theme } = useTheme();

  const roles = [
    'Full Stack Developer',
    'UI/UX Designer',
    'Social Impact Advocate',
    'Future Doctor',
    'Problem Solver',
    'Reader & Learner'
  ];

  // Mouse tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const typeSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (typedText.length < currentRole.length) {
          setTypedText(currentRole.slice(0, typedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (typedText.length > 0) {
          setTypedText(typedText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, currentRoleIndex]);

  const skills = [
    { name: 'React', color: 'from-cyan-400 to-blue-500' },
    { name: 'Next.js', color: 'from-gray-400 to-gray-600' },
    { name: 'Node.js', color: 'from-green-400 to-emerald-500' },
    { name: 'TypeScript', color: 'from-blue-400 to-blue-600' },
    { name: 'Firebase', color: 'from-yellow-400 to-orange-500' },
  ];

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${theme === 'dark'
      ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'
      : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'
      }`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <div
          className={`absolute w-96 h-96 md:w-[600px] md:h-[600px] rounded-full blur-3xl ${theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-400/30'}`}
          style={{
            top: '10%',
            left: '10%',
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            animation: 'float 6s ease-in-out infinite'
          }}
        />
        <div
          className={`absolute w-80 h-80 md:w-[500px] md:h-[500px] rounded-full blur-3xl ${theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-400/30'}`}
          style={{
            bottom: '10%',
            right: '10%',
            transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)`,
            animation: 'float 8s ease-in-out infinite',
            animationDelay: '2s'
          }}
        />
        <div
          className={`absolute w-64 h-64 md:w-[400px] md:h-[400px] rounded-full blur-3xl ${theme === 'dark' ? 'bg-emerald-500/10' : 'bg-emerald-400/20'}`}
          style={{
            top: '50%',
            left: '50%',
            animation: 'float 10s ease-in-out infinite',
            animationDelay: '4s'
          }}
        />

        {/* Grid pattern */}
        <div className={`absolute inset-0 ${theme === 'dark'
          ? 'bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)]'
          : 'bg-[linear-gradient(rgba(59,130,246,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.08)_1px,transparent_1px)]'
          } bg-[size:60px_60px]`} />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-7xl mx-auto w-full z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left side - Text Content */}
            <div className="text-center lg:text-left">
              {/* Status badge */}
              <div className="opacity-0" style={{ animation: 'fadeInDown 0.6s ease-out 0.2s forwards' }}>
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${theme === 'dark'
                  ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                  : 'bg-emerald-100 border border-emerald-300 text-emerald-700'
                  }`}>
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  Available for projects
                </span>
              </div>

              {/* Main heading */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 opacity-0" style={{ animation: 'fadeInUp 0.6s ease-out 0.4s forwards' }}>
                <span className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>Hi, I'm </span>
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent" style={{ backgroundSize: '200% auto', animation: 'gradient 3s ease infinite' }}>
                  Sushant
                </span>
              </h1>

              {/* Terminal-style role display */}
              <div className="opacity-0" style={{ animation: 'fadeInUp 0.6s ease-out 0.6s forwards' }}>
                <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-xl font-mono text-base md:text-lg mb-6 ${theme === 'dark'
                  ? 'bg-slate-800/50 border border-slate-700'
                  : 'bg-white/80 border border-slate-300 shadow-lg'
                  }`}>
                  <Terminal size={20} className="text-emerald-500" />
                  <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>A</span>
                  <span className="text-blue-500">{typedText}</span>
                  <span className="w-0.5 h-6 bg-blue-500" style={{ animation: 'blink 1s step-end infinite' }} />
                </div>
              </div>

              {/* Description */}
              <p className={`text-base md:text-lg mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed opacity-0 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`} style={{ animation: 'fadeInUp 0.6s ease-out 0.8s forwards' }}>
                Passionate about creating beautiful, functional digital experiences that make a difference.
                Bridging the gap between design, development, and social impact.
              </p>

              {/* Skills pills */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-8 opacity-0" style={{ animation: 'fadeInUp 0.6s ease-out 1s forwards' }}>
                {skills.map((skill, index) => (
                  <span
                    key={skill.name}
                    className={`px-3 py-1.5 bg-gradient-to-r ${skill.color} rounded-full text-white text-sm font-medium shadow-lg hover:scale-110 transition-transform cursor-default`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center opacity-0" style={{ animation: 'fadeInUp 0.6s ease-out 1.2s forwards' }}>
                <a
                  href="#work"
                  className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium hover:shadow-2xl hover:shadow-blue-500/30 hover:scale-105 transition-all duration-300 flex items-center gap-2"
                >
                  <Sparkles size={18} />
                  View My Work
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#contact"
                  className={`px-8 py-4 rounded-full font-medium hover:scale-105 transition-all duration-300 border ${theme === 'dark'
                    ? 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700'
                    : 'bg-white text-slate-900 border-slate-300 hover:bg-slate-50 shadow-lg'
                    }`}
                >
                  Get In Touch
                </a>
              </div>

              {/* Social Links */}
              <div className="flex gap-3 justify-center lg:justify-start mt-8 opacity-0" style={{ animation: 'fadeInUp 0.6s ease-out 1.4s forwards' }}>
                {[
                  { icon: Github, href: '#', label: 'GitHub' },
                  { icon: Linkedin, href: '#', label: 'LinkedIn' },
                  { icon: Mail, href: '#', label: 'Email' },
                  { icon: Facebook, href: '#', label: 'Facebook' },
                  { icon: Instagram, href: '#', label: 'Instagram' }
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${theme === 'dark'
                      ? 'bg-slate-800/50 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 hover:border-blue-500/50'
                      : 'bg-white border border-slate-300 text-slate-500 hover:text-slate-900 hover:bg-slate-50 hover:border-blue-400 shadow-md'
                      }`}
                    title={social.label}
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Right side - Profile Picture with 3D Effect */}
            <div className="flex justify-center lg:justify-end opacity-0" style={{ animation: 'fadeInRight 0.8s ease-out 0.6s forwards' }}>
              <div className="relative group">
                {/* Animated rings */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-75 blur-xl group-hover:opacity-100 transition-opacity duration-500" style={{ animation: 'pulse 3s ease-in-out infinite' }} />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" style={{ animation: 'spinSlow 20s linear infinite' }}>
                  <div className={`absolute inset-1 rounded-full ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'}`} />
                </div>

                {/* Profile container */}
                <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1 group-hover:scale-105 transition-transform duration-500">
                  <div className={`w-full h-full rounded-full overflow-hidden ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}`}>
                    <img
                      src="/profile.jpg"
                      alt="Sushant Kumar"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white text-6xl md:text-8xl font-bold">
                            SK
                          </div>
                        `;
                      }}
                    />
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white font-bold shadow-xl" style={{ animation: 'float 3s ease-in-out infinite' }}>
                  <Sparkles size={32} />
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold shadow-xl" style={{ animation: 'float 4s ease-in-out infinite', animationDelay: '1s' }}>
                  <Terminal size={24} />
                </div>
                <div className="absolute top-1/2 -right-6 w-14 h-14 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-xl" style={{ animation: 'float 3.5s ease-in-out infinite', animationDelay: '0.5s' }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"></path>
                    <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"></path>
                    <circle cx="20" cy="10" r="2"></circle>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0" style={{ animation: 'fadeIn 0.6s ease-out 2s forwards' }}>
          <a href="#about" className={`flex flex-col items-center gap-2 transition-colors ${theme === 'dark' ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'
            }`}>
            <span className="text-sm">Scroll to explore</span>
            <ChevronDown size={20} style={{ animation: 'bounceSoft 1s ease-in-out infinite' }} />
          </a>
        </div>
      </section>

    </div>
  );
}