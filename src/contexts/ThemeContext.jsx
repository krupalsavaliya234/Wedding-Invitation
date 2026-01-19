import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};

// Theme configurations based on the 5 uploaded wedding cards
export const themes = {
    'shahid-meera': {
        id: 'shahid-meera',
        name: 'Shahid & Meera - Ornate Floral',
        colors: {
            primary: '#8B9D83',      // Sage Green
            secondary: '#E8A598',    // Coral Pink
            accent: '#D4AF37',       // Gold
            background: '#FFFEF2',   // Cream
            dark: '#6B7F5F',         // Olive Green
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
        name: 'Ranveer & Deepika - Loving Paradise',
        colors: {
            primary: '#8B0000',      // Deep Maroon
            secondary: '#FFD700',    // Gold
            accent: '#DC143C',       // Crimson
            background: '#FFF5E6',   // Cream
            dark: '#4A0000',         // Dark Maroon
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
        name: 'Aarav & Aavi - Aquamarine Peacock',
        colors: {
            primary: '#40E0D0',      // Turquoise
            secondary: '#FFD700',    // Gold
            accent: '#98D8C8',       // Mint
            background: '#F7F9F9',   // Light Cream
            dark: '#2C7873',         // Teal
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
        name: 'Aarav & Aarohi - Vinayaka',
        colors: {
            primary: '#FFD700',      // Gold/Yellow
            secondary: '#00CED1',    // Turquoise
            accent: '#FF69B4',       // Pink
            background: '#FFFACD',   // Light Yellow
            dark: '#DAA520',         // Goldenrod
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
        name: 'Raj & Simran - Sweet William',
        colors: {
            primary: '#FF69B4',      // Hot Pink
            secondary: '#FFB6C1',    // Light Pink
            accent: '#D4AF37',       // Gold
            background: '#FFF0F5',   // Lavender Blush
            dark: '#C71585',         // Medium Violet Red
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
