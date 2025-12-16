'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, BookOpen, Palette, Users, Award, Code2, Database, Smartphone, Globe } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function AboutSection() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { label: "Projects Completed", value: "5+", icon: Award },
    { label: "People Impacted", value: "80+", icon: Users },
    { label: "Technologies", value: "9+", icon: Code2 },
    { label: "Years Learning", value: "3+", icon: BookOpen }
  ];

  const techStack = [
    { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"], icon: Globe, color: "from-blue-500 to-cyan-500" },
    { category: "Backend", items: ["Node.js", "Express", "Python", "Firebase"], icon: Database, color: "from-green-500 to-emerald-500" },
    { category: "Mobile", items: ["React Native", "Android"], icon: Smartphone, color: "from-purple-500 to-pink-500" },
    { category: "Design", items: [ "Adobe XD", "Photoshop", "Illustrator", "Canva"], icon: Palette, color: "from-orange-500 to-red-500" },
  ];

  const journey = [
    { year: "2021", title: "Full Stack Journey", desc: "Dove into web development, learnt React, Node.js, and modern frameworks, made discord bots" },
    { year: "2022", title: "Discovered Design", desc: "Started exploring UI/UX and fell in love with creating digital experiences" },
    { year: "2023", title: "Social Impact", desc: "Worked as volunteer in many community initiatives to give back and create meaningful change" },
    { year: "2025", title: "Medical Path", desc: "Began MBBS preparation, combining tech skills with healthcare aspirations" },
    { year: "2026+", title: "The Future", desc: "Building at the intersection of design, technology, and healthcare" }
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`min-h-screen py-24 px-6 relative transition-colors duration-500 ${theme === 'dark'
          ? 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950'
          : 'bg-gradient-to-b from-white via-blue-50 to-white'
        }`}
    >
      {/* Background decoration */}
      <div className={`absolute inset-0 ${theme === 'dark'
          ? 'bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)]'
          : 'bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)]'
        } bg-[size:60px_60px]`} />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${theme === 'dark'
              ? 'bg-blue-500/10 border border-blue-500/30 text-blue-400'
              : 'bg-blue-100 border border-blue-300 text-blue-700'
            } ${inView ? 'animate-fadeInDown' : 'opacity-0'}`}>
            <Sparkles size={16} />
            <span>About Me</span>
          </div>
          <h2 className={`text-4xl md:text-6xl font-bold mb-6 ${inView ? 'animate-fadeInUp' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            <span className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>A Journey of </span>
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Many Passions
            </span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} ${inView ? 'animate-fadeInUp' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
            I believe in breaking boundaries and pursuing multiple dreams simultaneously
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group p-6 backdrop-blur-sm rounded-2xl transition-all duration-500 hover:-translate-y-2 ${theme === 'dark'
                  ? 'bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/50 hover:bg-slate-800'
                  : 'bg-white/80 border border-slate-200 hover:border-blue-400 hover:bg-white shadow-lg'
                } ${inView ? 'animate-fadeInUp' : 'opacity-0'}`}
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <stat.icon className="text-blue-500 mb-4 group-hover:scale-110 transition-transform" size={32} />
              <div className={`text-3xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{stat.value}</div>
              <div className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="mb-24">
          <h3 className={`text-2xl font-bold mb-8 text-center ${theme === 'dark' ? 'text-white' : 'text-slate-900'} ${inView ? 'animate-fadeIn' : 'opacity-0'}`}>
            Tech Stack
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((tech, index) => (
              <div
                key={tech.category}
                className={`group p-6 rounded-2xl transition-all duration-300 ${theme === 'dark'
                    ? 'bg-slate-800/30 border border-slate-700/50 hover:border-slate-600'
                    : 'bg-white/80 border border-slate-200 hover:border-slate-300 shadow-lg'
                  } ${inView ? 'animate-revealUp' : 'opacity-0'}`}
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${tech.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <tech.icon size={24} className="text-white" />
                </div>
                <h4 className={`text-lg font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{tech.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {tech.items.map((item) => (
                    <span key={item} className={`px-2 py-1 rounded-md text-sm ${theme === 'dark'
                        ? 'bg-slate-700/50 text-slate-300'
                        : 'bg-slate-100 text-slate-700'
                      }`}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Story & Timeline */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Story */}
          <div className={inView ? 'animate-fadeInLeft' : 'opacity-0'} style={{ animationDelay: '0.6s' }}>
            <h3 className={`text-3xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>My Story</h3>
            <div className={`space-y-6 leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
              <p>
                I'm <strong className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>Sushant Raj Mishra</strong>, an undergraduate student who refuses to choose just one path.
                While most people pick a single lane, I've chosen to race on multiple tracks simultaneously.
              </p>
              <p>
                As a <strong className="text-blue-500">full-stack developer</strong>, I craft digital experiences that not only look beautiful
                but solve real problems. From concept to code, I bring ideas to life with React, Next.js, and modern design tools. I've completed multiple projects.
              </p>
              <p>
                My <strong className="text-purple-500">social work</strong> keeps me grounded, reminding me that technology should serve humanity.
                I've worked on community projects and some as a volunteering that have impacted many lives.
              </p>
              <p>
                Now, I'm preparing for <strong className="text-emerald-500">MBBS</strong>, driven by a vision to merge technology with healthcare.
                Imagine AI-powered diagnostics, beautifully designed health apps, and patient care that's both data-driven and deeply human.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className={`relative ${inView ? 'animate-fadeInRight' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500" />
            {journey.map((item, index) => (
              <div key={index} className="relative pl-20 pb-10 last:pb-0">
                <div className={`absolute left-5 w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full border-4 shadow-lg ${theme === 'dark' ? 'border-slate-900' : 'border-white'
                  }`} />
                <div className={`p-6 rounded-xl transition-colors ${theme === 'dark'
                    ? 'bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/30'
                    : 'bg-white border border-slate-200 hover:border-blue-400 shadow-lg'
                  }`}>
                  <div className="text-sm font-bold text-blue-500 mb-2">{item.year}</div>
                  <h4 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{item.title}</h4>
                  <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}