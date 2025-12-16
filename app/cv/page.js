'use client';
import React, { useRef } from 'react';
import { Download, Mail, Phone, MapPin, Briefcase, Book, Code, Award, Linkedin, Github, User, Heart, Trophy, Globe, Dna } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function CVPage() {
    const { theme } = useTheme();
    const cvRef = useRef(null);

    const handleDownloadPDF = () => {
        const link = document.createElement('a');
        link.href = '/sushantCV.pdf';
        link.download = 'SushantCV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const skills = {
        technical: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Git/Github', 'Firebase', 'UI/UX Basics'],
        soft: ['Interpersonal Communication', 'Leadership', 'Teamwork', 'Collaboration', 'Time-Management', 'Adaptability'],
        sports: ['Basketball', 'Cricket', 'Football', 'Table Tennis', 'Badminton']
    };

    const languages = [
        { name: 'Maithili', level: 'Native' },
        { name: 'Nepali', level: 'Fluent' },
        { name: 'English', level: 'Professional' },
        { name: 'Hindi', level: 'Fluent' },
        { name: 'Bhojpuri', level: 'Fluent' }
    ];

    return (
        <div className={`min-h-screen pt-32 pb-20 transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-950 text-slate-200' : 'bg-slate-50 text-slate-800'
            }`}>
            <div className="max-w-5xl mx-auto px-4 sm:px-6">

                {/* Header Actions */}
                <div className="flex justify-between items-center mb-12 animate-fadeInDown">
                    <h1 className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${theme === 'dark' ? 'from-blue-400 to-purple-400' : 'from-blue-600 to-purple-600'
                        }`}>
                        Curriculum Vitae
                    </h1>
                    <button
                        onClick={handleDownloadPDF}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg ${theme === 'dark'
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-blue-500/25'
                                : 'bg-white text-slate-800 border border-slate-200 hover:border-blue-300 hover:text-blue-600'
                            }`}
                    >
                        <Download size={18} />
                        <span>Download PDF</span>
                    </button>
                </div>

                {/* CV Content Container */}
                <div
                    ref={cvRef}
                    className={`relative overflow-hidden rounded-3xl transition-all duration-500 ${theme === 'dark'
                            ? 'bg-slate-900/50 border border-slate-800 backdrop-blur-sm'
                            : 'bg-white border border-slate-200 shadow-xl'
                        }`}
                >
                    {/* Decorative Top Banner */}
                    <div className={`h-32 w-full absolute top-0 left-0 opacity-20 ${theme === 'dark'
                            ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600'
                            : 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400'
                        }`} />

                    <div className="relative p-8 md:p-12">

                        {/* Header Profile */}
                        <div className="flex flex-col md:flex-row gap-8 mb-12 animate-fadeIn">
                            <div className="flex-shrink-0 relative">
                                <div className={`w-40 h-40 rounded-full p-1 ${theme === 'dark' ? 'bg-slate-800' : 'bg-white shadow-lg'
                                    }`}>
                                    <div className="w-full h-full rounded-full overflow-hidden relative group">
                                        <img
                                            src="/profile.jpg"
                                            alt="Sushant Raj Mishra"
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white text-4xl font-bold">SM</div>';
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className={`absolute bottom-2 right-2 p-2 rounded-full ${theme === 'dark' ? 'bg-slate-900 text-green-400' : 'bg-white text-green-500 shadow-md'
                                    }`}>
                                    <div className="w-3 h-3 bg-current rounded-full animate-pulse" />
                                </div>
                            </div>

                            <div className="flex-1 pt-4">
                                <h1 className={`text-4xl md:text-5xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'
                                    }`}>
                                    Sushant Raj Mishra
                                </h1>
                                <p className={`text-xl font-medium mb-6 flex flex-wrap gap-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                                    }`}>
                                    Tech Enthusiast <span>•</span> CEE & NEET Aspirant
                                </p>

                                <div className="flex flex-wrap gap-4 text-sm">
                                    <a href="mailto:sushantrm4367@gmail.com" className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                                        }`}>
                                        <Mail size={16} className="text-blue-500" />
                                        sushantrm4367@gmail.com
                                    </a>
                                    <span className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${theme === 'dark' ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
                                        }`}>
                                        <Phone size={16} className="text-emerald-500" />
                                        +977 9746575954
                                    </span>
                                    <span className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${theme === 'dark' ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
                                        }`}>
                                        <MapPin size={16} className="text-purple-500" />
                                        Janakpur, Nepal
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-12">
                            {/* Left Column (Main Content) */}
                            <div className="lg:col-span-2 space-y-12">

                                {/* Experience & Projects */}
                                <section className="animate-slideUp delay-100">
                                    <h2 className={`text-xl font-bold mb-6 flex items-center gap-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'
                                        }`}>
                                        <span className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-100 text-blue-600'
                                            }`}><Briefcase size={20} /></span>
                                        Experience & Projects
                                    </h2>

                                    <div className={`relative pl-8 border-l-2 ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>

                                        {/* Deraa */}
                                        <div className="mb-10 relative">
                                            <span className={`absolute -left-[37px] top-0 w-4 h-4 rounded-full border-2 ${theme === 'dark' ? 'bg-slate-900 border-blue-500' : 'bg-white border-blue-600'
                                                }`} />
                                            <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
                                                Founder, Developer
                                            </h3>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className={`font-medium ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>Deraa</span>
                                            </div>
                                            <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                                                Deraa is a digital room-renting platform built for Nepal, aimed at simplifying the process of finding and listing rooms.
                                            </p>
                                            <ul className={`list-disc list-outside ml-4 space-y-1 text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                                                }`}>
                                                <li>Reduces time, confusion, and middlemen by directly connecting renters and landlords.</li>
                                                <li>Built a modern web-based solution for efficient room finding.</li>
                                            </ul>
                                        </div>

                                        {/* MTBUS */}
                                        <div className="mb-10 relative">
                                            <span className={`absolute -left-[37px] top-0 w-4 h-4 rounded-full border-2 ${theme === 'dark' ? 'bg-slate-900 border-purple-500' : 'bg-white border-purple-600'
                                                }`} />
                                            <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'}`}>
                                                Tech Intern
                                            </h3>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className={`font-medium ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>Mahila Tatha Bal Balika Utthan Samaj</span>
                                            </div>
                                            <ul className={`list-disc list-outside ml-4 space-y-1 text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                                                }`}>
                                                <li>Designed and developed the official website for the non-profit organization.</li>
                                                <li>Supported the mission of improving welfare of women and children in rural communities through a functional web platform.</li>
                                            </ul>
                                        </div>

                                        {/* Janakpur Art Festival */}
                                        <div className="mb-10 relative">
                                            <span className={`absolute -left-[37px] top-0 w-4 h-4 rounded-full border-2 ${theme === 'dark' ? 'bg-slate-900 border-pink-500' : 'bg-white border-pink-600'
                                                }`} />
                                            <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-pink-300' : 'text-pink-700'}`}>
                                                Volunteer
                                            </h3>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className={`font-medium ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>Janakpur Art Literature Festival</span>
                                            </div>
                                            <ul className={`list-disc list-outside ml-4 space-y-1 text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                                                }`}>
                                                <li>1st Day: Managed Registration Desk.</li>
                                                <li>2nd Day: Handled Ground Work operations.</li>
                                                <li>3rd Day: Coordinated Guest Management.</li>
                                            </ul>
                                        </div>

                                        {/* US Book Bus */}
                                        <div className="relative">
                                            <span className={`absolute -left-[37px] top-0 w-4 h-4 rounded-full border-2 ${theme === 'dark' ? 'bg-slate-900 border-emerald-500' : 'bg-white border-emerald-600'
                                                }`} />
                                            <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-emerald-300' : 'text-emerald-700'}`}>
                                                Volunteer
                                            </h3>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className={`font-medium ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>U.S Book Bus</span>
                                            </div>
                                            <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                                                Volunteered as a book distributer and participated in all team meetings and virtual book club activities.
                                            </p>
                                        </div>
                                    </div>
                                </section>

                                {/* Education */}
                                <section className="animate-slideUp delay-200">
                                    <h2 className={`text-xl font-bold mb-6 flex items-center gap-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'
                                        }`}>
                                        <span className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-100 text-indigo-600'
                                            }`}><Book size={20} /></span>
                                        Education
                                    </h2>

                                    <div className="space-y-4">
                                        <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-slate-800/30 border-slate-700/50' : 'bg-white border-slate-200'
                                            }`}>
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className={`font-bold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
                                                        Mithila Institute of Technology
                                                    </h3>
                                                    <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                                                        High School
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <span className={`block text-xs font-medium py-1 px-2 rounded mb-1 w-fit ml-auto ${theme === 'dark' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-700'
                                                        }`}>
                                                        2023 - 2025
                                                    </span>
                                                    <span className={`text-xs font-bold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>GPA: 3.03/4</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-slate-800/30 border-slate-700/50' : 'bg-white border-slate-200'
                                            }`}>
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className={`font-bold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
                                                        General B.C Joshi Army Public School
                                                    </h3>
                                                    <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                                                        Class 10th
                                                    </p>
                                                    <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>
                                                        School Prefect, Bhagat House
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <span className={`block text-xs font-medium py-1 px-2 rounded mb-1 w-fit ml-auto ${theme === 'dark' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-700'
                                                        }`}>
                                                        2019 - 2023
                                                    </span>
                                                    <span className={`text-xs font-bold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>84%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                            </div>

                            {/* Right Column (Sidebar) */}
                            <div className="space-y-10">

                                {/* Skills */}
                                <section className="animate-slideUp delay-300">
                                    <h2 className={`text-lg font-bold mb-6 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'
                                        }`}>
                                        <Code size={18} className="text-blue-500" />
                                        Skills
                                    </h2>
                                    <div className="space-y-6">
                                        {Object.entries(skills).map(([category, items]) => (
                                            <div key={category}>
                                                <h3 className={`text-xs font-bold uppercase tracking-wider mb-3 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
                                                    }`}>
                                                    {category}
                                                </h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {items.map(skill => (
                                                        <span key={skill} className={`px-2.5 py-1 rounded-md text-xs font-medium border ${theme === 'dark'
                                                                ? 'bg-slate-800/50 border-slate-700 text-slate-300'
                                                                : 'bg-white border-slate-200 text-slate-700'
                                                            }`}>
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* Languages */}
                                <section className="animate-slideUp delay-400">
                                    <h2 className={`text-lg font-bold mb-6 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'
                                        }`}>
                                        <Globe size={18} className="text-cyan-500" />
                                        Languages
                                    </h2>
                                    <div className="grid grid-cols-2 gap-3">
                                        {languages.map((lang) => (
                                            <div key={lang.name} className={`px-3 py-2 rounded-lg border ${theme === 'dark' ? 'bg-slate-800/30 border-slate-700' : 'bg-white border-slate-200'
                                                }`}>
                                                <div className={`font-medium text-sm ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>{lang.name}</div>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* Achievements */}
                                <section className="animate-slideUp delay-500">
                                    <h2 className={`text-lg font-bold mb-6 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'
                                        }`}>
                                        <Award size={18} className="text-orange-500" />
                                        Achievements
                                    </h2>
                                    <ul className={`space-y-3 text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                                        <li className="flex gap-2">
                                            <Trophy size={14} className="text-orange-500 flex-shrink-0 mt-0.5" />
                                            <span>Certified participant, Inter-School Level Basketball Tournament, Pithoragarh, India</span>
                                        </li>
                                        <li className="flex gap-2">
                                            <Trophy size={14} className="text-orange-500 flex-shrink-0 mt-0.5" />
                                            <span>Certified participant, Inter-District Level Basketball Tournament, Haridwar, India</span>
                                        </li>
                                        <li className="flex gap-2">
                                            <Heart size={14} className="text-pink-500 flex-shrink-0 mt-0.5" />
                                            <span>Art & Music Workshop Participant, Gen. B.C. Joshi Army Public School</span>
                                        </li>
                                        <li className="flex gap-2">
                                            <Dna size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                                            <span>Active learner in technology and programming; Participated in self-initiated projects</span>
                                        </li>
                                    </ul>
                                </section>

                            </div>
                        </div>

                        {/* Footer decorative */}
                        <div className="mt-16 text-center border-t pt-8 border-slate-200 dark:border-slate-800">
                            <p className={`text-sm italic ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
                                "Active learner in technology and programming, participating in self-initiated projects and online learning."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}