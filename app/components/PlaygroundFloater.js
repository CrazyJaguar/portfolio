'use client';
import React, { useState } from 'react';
import { Gamepad2, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '../context/ThemeContext';

export default function PlaygroundFloater() {
    const { theme } = useTheme();
    const [isHovered, setIsHovered] = useState(false);
    const [expanded, setExpanded] = useState(false);

    // Position it above the theme toggle (which is bottom-6 right-6)
    // We'll attach this to the right edge
    return (
        <div
            className="fixed bottom-24 right-0 z-40 flex items-center justify-end"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* The Blob Container */}
            <div
                className={`relative flex items-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${expanded ? 'translate-x-0 mr-4' : 'translate-x-[calc(100%-24px)]'
                    }`}
            >
                {/* Main Action Button (Gamepad) */}
                {expanded && (
                    <Link
                        href="/playground"
                        className={`mr-3 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 hover:scale-110 active:scale-95 ${theme === 'dark'
                            ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-pink-500/30'
                            : 'bg-gradient-to-r from-pink-100 to-rose-100 text-rose-600 shadow-pink-200'
                            }`}
                        title="Go to Playground"
                    >
                        <Gamepad2 size={24} className="animate-pulse" />
                    </Link>
                )}

                {/* The "Handle" or Arrow Bubble */}
                <button
                    onClick={() => setExpanded(!expanded)}
                    className={`h-12 flex items-center justify-center transition-all duration-300 shadow-lg ${expanded
                        ? 'w-10 rounded-full'
                        : 'w-12 rounded-l-full pr-1' // pr-1 to push arrow slightly left when retracted
                        } ${theme === 'dark'
                            ? 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 hover:text-white'
                            : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                    style={{
                        backdropFilter: 'blur(8px)',
                    }}
                >
                    {expanded ? <ChevronRight size={20} /> : <ChevronLeft size={20} className="animate-bounce-left" />}
                </button>
            </div>
        </div>
    );
}
