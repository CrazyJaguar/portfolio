'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Terminal, Code2, Sun, Moon, Sparkles, Grid3x3, Type, Brain, Zap, Droplets } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const pathname = usePathname();

    const isPlaygroundPage = pathname === '/playground';
    const [themeToggleDisabled, setThemeToggleDisabled] = useState(false);

    useEffect(() => {
        const handler = (e) => setThemeToggleDisabled(Boolean(e.detail));
        try { setThemeToggleDisabled(Boolean(window.__disableThemeToggle)); } catch (e) { }
        window.addEventListener('themeToggleLock', handler);
        return () => window.removeEventListener('themeToggleLock', handler);
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/portfolio', label: 'Portfolio' },
        { href: '/gallery', label: 'Gallery' },
        { href: '/cv', label: 'CV' },
        { href: '/youtube', label: 'Youtube' }
    ];

    const games = [
        { id: 'particles', name: 'Particle Canvas', icon: Sparkles, href: '/playground?game=particles' },
        { id: '2048', name: '2048', icon: Grid3x3, href: '/playground?game=2048' },
        { id: 'scramble', name: 'Word Scramble', icon: Type, href: '/playground?game=scramble' },
        { id: 'memory', name: 'Memory Match', icon: Brain, href: '/playground?game=memory' },
        { id: 'reaction', name: 'Reaction Test', icon: Zap, href: '/playground?game=reaction' },
    ];

    const particleModes = [
        { id: 'flowing', name: 'Flowing', icon: Droplets },
        { id: 'gravity', name: 'Gravity Wells', icon: Sparkles },
        { id: 'firework', name: 'Fireworks', icon: Sparkles },
        { id: 'paint', name: 'Paint', icon: Droplets },
    ];

    return (
        <>
            <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
                ? theme === 'dark'
                    ? 'bg-slate-900/95 backdrop-blur-lg shadow-2xl shadow-blue-500/10 border-b border-slate-800'
                    : 'bg-white/95 backdrop-blur-lg shadow-xl border-b border-slate-200'
                : 'bg-transparent'
                }`}>
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Terminal size={20} className="text-white" />
                        </div>
                        <span className={`text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent`}>
                            SRM<span className="animate-blink">_</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex gap-1 items-center">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-4 py-2 transition-colors relative group ${theme === 'dark'
                                    ? 'text-slate-300 hover:text-white'
                                    : 'text-slate-600 hover:text-slate-900'
                                    }`}
                            >
                                {link.label}
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300" />
                            </Link>
                        ))}

                        {/* Theme Toggle Button */}
                        <button
                            onClick={(e) => { if (!themeToggleDisabled) toggleTheme(); }}
                            className={`ml-2 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${themeToggleDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110 active:scale-95'} group relative overflow-hidden`}
                            style={{
                                background: theme === 'dark'
                                    ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)'
                                    : 'linear-gradient(135deg, #f59e0b, #ef4444)',
                                boxShadow: theme === 'dark'
                                    ? '0 4px 16px rgba(99, 102, 241, 0.3)'
                                    : '0 4px 16px rgba(245, 158, 11, 0.3)'
                            }}
                            title={themeToggleDisabled ? 'Theme toggle disabled in Particle mode' : (theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode')}
                            aria-label="Toggle theme"
                        >
                            <div className="relative w-5 h-5">
                                <Sun
                                    size={20}
                                    className={`absolute inset-0 text-white transition-all duration-500 ${theme === 'light'
                                        ? 'opacity-100 rotate-0 scale-100'
                                        : 'opacity-0 rotate-90 scale-50'
                                        }`}
                                />
                                <Moon
                                    size={20}
                                    className={`absolute inset-0 text-white transition-all duration-500 ${theme === 'dark'
                                        ? 'opacity-100 rotate-0 scale-100'
                                        : 'opacity-0 -rotate-90 scale-50'
                                        }`}
                                />
                            </div>
                            <span className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg" />
                        </button>

                        <Link
                            href="/#contact"
                            className="ml-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105 transition-all duration-300 flex items-center gap-2"
                        >
                            <Code2 size={16} />
                            Let's Collab
                        </Link>
                    </div>

                    {/* Mobile Menu Buttons */}
                    <div className="md:hidden flex items-center gap-2">
                        {/* Theme Toggle for Mobile */}
                        <button
                            onClick={(e) => { if (!themeToggleDisabled) toggleTheme(); }}
                            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${themeToggleDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110 active:scale-95'} group relative overflow-hidden`}
                            style={{
                                background: theme === 'dark'
                                    ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)'
                                    : 'linear-gradient(135deg, #f59e0b, #ef4444)',
                                boxShadow: theme === 'dark'
                                    ? '0 4px 16px rgba(99, 102, 241, 0.3)'
                                    : '0 4px 16px rgba(245, 158, 11, 0.3)'
                            }}
                            aria-label="Toggle theme"
                        >
                            <div className="relative w-5 h-5">
                                <Sun
                                    size={18}
                                    className={`absolute inset-0 text-white transition-all duration-500 ${theme === 'light'
                                        ? 'opacity-100 rotate-0 scale-100'
                                        : 'opacity-0 rotate-90 scale-50'
                                        }`}
                                />
                                <Moon
                                    size={18}
                                    className={`absolute inset-0 text-white transition-all duration-500 ${theme === 'dark'
                                        ? 'opacity-100 rotate-0 scale-100'
                                        : 'opacity-0 -rotate-90 scale-50'
                                        }`}
                                />
                            </div>
                        </button>

                        {/* Menu Toggle */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className={`transition-colors p-2 ${theme === 'dark'
                                ? 'text-slate-300 hover:text-white'
                                : 'text-slate-600 hover:text-slate-900'
                                }`}
                        >
                            {menuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                    <div className={`px-6 py-4 space-y-2 border-t ${theme === 'dark'
                        ? 'bg-slate-900/95 backdrop-blur-lg border-slate-800'
                        : 'bg-white/95 backdrop-blur-lg border-slate-200'
                        }`}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className={`block py-3 transition-colors border-b ${theme === 'dark'
                                    ? 'text-slate-300 hover:text-white border-slate-800/50'
                                    : 'text-slate-600 hover:text-slate-900 border-slate-200/50'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/#contact"
                            onClick={() => setMenuOpen(false)}
                            className="block py-3 text-blue-500 font-medium"
                        >
                            Let's Talk →
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Side Menu - Only shows on /playground page */}
            <div className={`fixed top-0 right-0 h-full w-80 z-50 transform transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'
                } ${theme === 'dark' ? 'bg-slate-900/95 backdrop-blur-xl border-l border-slate-800' : 'bg-white/95 backdrop-blur-xl border-l border-slate-200 shadow-2xl'}`}>
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                            Playground Games
                        </h2>
                        <button
                            onClick={() => setMenuOpen(false)}
                            className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
                        >
                            <X size={20} className={theme === 'dark' ? 'text-white' : 'text-slate-900'} />
                        </button>
                    </div>

                    <div className="space-y-3">
                        {games.map((game) => (
                            <Link
                                key={game.id}
                                href={game.href}
                                onClick={() => setMenuOpen(false)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${theme === 'dark'
                                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                    }`}
                            >
                                <game.icon size={20} />
                                <span className="font-medium">{game.name}</span>
                            </Link>
                        ))}
                    </div>

                    <h3 className={`text-lg font-bold mt-8 mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        Particle Modes
                    </h3>
                    <div className="space-y-3">
                        {particleModes.map((mode) => (
                            <Link
                                key={mode.id}
                                href={`/playground?game=particles&mode=${mode.id}`}
                                onClick={() => setMenuOpen(false)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${theme === 'dark'
                                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                    }`}
                            >
                                <mode.icon size={18} />
                                <span className="text-sm font-medium">{mode.name}</span>
                            </Link>
                        ))}
                    </div>

                    <div className={`mt-6 p-4 rounded-xl text-sm ${theme === 'dark' ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'
                        }`}>
                        <p className="font-medium mb-2">Instructions:</p>
                        <ul className="space-y-1 text-xs">
                            <li>• <strong>Flowing:</strong> Watch particles flow naturally</li>
                            <li>• <strong>Gravity Wells:</strong> Click to create gravity points</li>
                            <li>• <strong>Fireworks:</strong> Click to launch fireworks</li>
                            <li>• <strong>Paint:</strong> Click and drag to paint</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Overlay when menu is open */}
            {menuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={() => setMenuOpen(false)}
                />
            )}
        </>
    );
}