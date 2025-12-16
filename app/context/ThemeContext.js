'use client';
import React, { createContext, useContext, useState, useEffect, useLayoutEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    // Initialize with default theme to match server rendering and prevent hydration mismatch
    const [theme, setTheme] = useState('dark');
    const [mounted, setMounted] = useState(false);

    useLayoutEffect(() => {
        // Apply theme class synchronously before paint to avoid flash
        try {
            if (theme === 'light') {
                document.documentElement.classList.add('light');
                document.documentElement.classList.remove('dark');
            } else {
                document.documentElement.classList.add('dark');
                document.documentElement.classList.remove('light');
            }
        } catch (e) { }
    }, [theme]);

    useEffect(() => {
        try {
            const stored = localStorage.getItem('portfolio-theme');
            if (stored && stored !== 'dark') {
                setTheme(stored);
            }
            setMounted(true);
        } catch (e) { }
    }, []);

    useEffect(() => {
        if (!mounted) return;
        try {
            localStorage.setItem('portfolio-theme', theme);
        } catch (e) { }
    }, [theme, mounted]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
