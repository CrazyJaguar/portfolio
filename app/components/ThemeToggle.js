'use client';
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const [disabled, setDisabled] = React.useState(false);

    React.useEffect(() => {
        const handler = (e) => setDisabled(Boolean(e.detail));
        // initialize
        try {
            setDisabled(Boolean(window.__disableThemeToggle));
        } catch (e) { }
        window.addEventListener('themeToggleLock', handler);
        return () => window.removeEventListener('themeToggleLock', handler);
    }, []);

    return (
        <button
            onClick={(e) => { if (!disabled) toggleTheme(); }}
            className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110 active:scale-95 hover:rotate-12'} group`}
            style={{
                background: theme === 'dark'
                    ? 'linear-gradient(135deg, #4f46e5, #9333ea)' // Indigo to Purple
                    : 'linear-gradient(135deg, #fbbf24, #f59e0b)', // Amber to Orange
                boxShadow: theme === 'dark'
                    ? '0 0 20px rgba(79, 70, 229, 0.5), 0 8px 32px rgba(0, 0, 0, 0.3)'
                    : '0 0 20px rgba(251, 191, 36, 0.5), 0 8px 32px rgba(0, 0, 0, 0.1)'
            }}
            title={disabled ? 'Theme toggle disabled in Particle mode' : (theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode')}
            aria-label="Toggle theme"
        >
            <div className="relative w-7 h-7">
                {/* Sun icon */}
                <Sun
                    size={28}
                    className={`absolute inset-0 text-white transition-all duration-700 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] ${theme === 'light'
                            ? 'opacity-100 rotate-0 scale-100'
                            : 'opacity-0 rotate-180 scale-0'
                        }`}
                />
                {/* Moon icon */}
                <Moon
                    size={28}
                    className={`absolute inset-0 text-white transition-all duration-700 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] ${theme === 'dark'
                            ? 'opacity-100 rotate-0 scale-100'
                            : 'opacity-0 -rotate-180 scale-0'
                        }`}
                />
            </div>

            {/* Ripple effect on hover */}
            <span className="absolute inset-0 rounded-full bg-white/30 scale-0 group-hover:scale-110 transition-transform duration-500 ease-out" />
        </button>
    );
}