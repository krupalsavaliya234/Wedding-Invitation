import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};

// Theme configurations based on the 5 uploaded wedding cards - AUTHENTIC INDIAN WEDDING COLORS
export const themes = {
    'shahid-meera': {
        id: 'shahid-meera',
        name: 'Royal Maroon & Gold',
        colors: {
            primary: '#8B0000',      // Deep Maroon (Traditional Bridal)
            secondary: '#FFD700',    // Royal Gold
            accent: '#DC143C',       // Crimson Red
            background: '#FFF5E6',   // Warm Cream
            dark: '#4A0000',         // Dark Maroon
        },
        fonts: {
            signature: 'Great Vibes',
            heading: 'Cinzel',
            body: 'Poppins',
        },
        decorations: 'floral',
    },
    'ranveer-deepika': {
        id: 'ranveer-deepika',
        name: 'Marigold & Saffron',
        colors: {
            primary: '#FF8C00',      // Marigold Orange
            secondary: '#FFD700',    // Golden Yellow
            accent: '#FF6347',       // Vibrant Orange-Red
            background: '#FFFAF0',   // Floral White
            dark: '#CC6600',         // Deep Orange
        },
        fonts: {
            signature: 'Alex Brush',
            heading: 'Playfair Display',
            body: 'Poppins',
        },
        decorations: 'traditional',
    },
    'aarav-aavi': {
        id: 'aarav-aavi',
        name: 'Royal Purple & Gold',
        colors: {
            primary: '#6A0DAD',      // Royal Purple
            secondary: '#FFD700',    // Rich Gold
            accent: '#9370DB',       // Medium Purple
            background: '#FFF8F0',   // Ivory
            dark: '#4B0082',         // Indigo
        },
        fonts: {
            signature: 'Great Vibes',
            heading: 'Playfair Display',
            body: 'Poppins',
        },
        decorations: 'peacock',
    },
    'aarav-aarohi': {
        id: 'aarav-aarohi',
        name: 'Emerald & Gold',
        colors: {
            primary: '#50C878',      // Emerald Green
            secondary: '#FFD700',    // Gold
            accent: '#2E8B57',       // Sea Green
            background: '#F5FFFA',   // Mint Cream
            dark: '#006400',         // Dark Green
        },
        fonts: {
            signature: 'Great Vibes',
            heading: 'Bodoni Moda',
            body: 'Poppins',
        },
        decorations: 'ganesh',
    },
    'raj-simran': {
        id: 'raj-simran',
        name: 'Rose Pink & Gold',
        colors: {
            primary: '#E91E63',      // Vibrant Pink
            secondary: '#FFD700',    // Gold
            accent: '#FF69B4',       // Hot Pink
            background: '#FFF0F5',   // Lavender Blush
            dark: '#C2185B',         // Deep Pink
        },
        fonts: {
            signature: 'Alex Brush',
            heading: 'Playfair Display',
            body: 'Poppins',
        },
        decorations: 'floral-minimal',
    },
};

export const ThemeProvider = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState(() => {
        // Load theme from localStorage or default to first theme
        const saved = localStorage.getItem('weddingTheme');
        return saved || 'shahid-meera';
    });

    const theme = themes[currentTheme];

    useEffect(() => {
        // Save theme to localStorage
        localStorage.setItem('weddingTheme', currentTheme);

        // Apply theme colors to CSS variables
        const root = document.documentElement;
        root.style.setProperty('--color-primary', theme.colors.primary);
        root.style.setProperty('--color-secondary', theme.colors.secondary);
        root.style.setProperty('--color-accent', theme.colors.accent);
        root.style.setProperty('--color-background', theme.colors.background);
        root.style.setProperty('--color-dark', theme.colors.dark);
    }, [currentTheme, theme]);

    const changeTheme = (themeId) => {
        if (themes[themeId]) {
            setCurrentTheme(themeId);
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, currentTheme, changeTheme, themes }}>
            {children}
        </ThemeContext.Provider>
    );
};
