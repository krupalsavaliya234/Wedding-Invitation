import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};

// DEEP VISUAL ANALYSIS OF EACH WEDDING CARD - EXTRACTED DESIGN DNA
export const themes = {
    'shahid-meera': {
        id: 'shahid-meera',
        name: 'Shahid & Meera - Ornate Floral',
        cardImage: '/uploaded_image_0_1768849578330.png',

        // EXTRACTED COLOR PALETTE (from visual analysis)
        colors: {
            primary: '#8B9D83',        // Sage green from border foliage
            secondary: '#E8A598',      // Coral pink from lotus flowers
            accent: '#D4AF37',         // Antique gold from corner filigree
            background: '#FFFEF2',     // Cream white from content area
            dark: '#6B7F5F',           // Olive green from deep leaves
            text: '#4A4A4A',           // Charcoal for readability
        },

        // EXTRACTED TYPOGRAPHY ANALYSIS
        typography: {
            coupleNames: {
                font: 'Great Vibes',           // Flowing script, elegant cursive
                weight: 400,
                size: 'extra-large',           // Dominant visual element
                letterSpacing: 'normal',
                textTransform: 'none',
            },
            headings: {
                font: 'Playfair Display',     // Elegant serif with high contrast
                weight: 600,
                size: 'medium',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
            },
            body: {
                font: 'Poppins',               // Clean, modern sans-serif
                weight: 300,
                size: 'small',
                letterSpacing: 'normal',
                textTransform: 'none',
            },
        },

        // LAYOUT GEOMETRY & SPACING
        layout: {
            contentAlignment: 'center',
            margins: 'generous',               // Ample white space
            padding: 'large',
            borderRadius: 'scalloped',         // Ornate arch shape
            borderThickness: '2px',
            shadowDepth: 'medium',
        },

        // DECORATIVE LANGUAGE
        decorations: {
            style: 'ornate-floral',
            density: 'high',                   // Rich, detailed borders
            elements: ['lotus', 'hibiscus', 'leaves', 'vines', 'paisley'],
            corners: 'elaborate',              // Gold filigree corners
            dividers: 'floral-ornamental',
            patterns: 'mandala-subtle',
        },

        // VISUAL BALANCE
        balance: {
            negativeSpace: '40%',              // 40% breathing room
            visualWeight: 'symmetrical',
            hierarchy: 'couple-names-dominant',
            contrast: 'medium-high',
        },

        // MOOD & ATMOSPHERE
        mood: {
            elegance: 'high',
            tradition: 'medium-high',
            modernity: 'medium',
            luxury: 'premium',
            warmth: 'warm',
        },
    },

    'ranveer-deepika': {
        id: 'ranveer-deepika',
        name: 'Ranveer & Deepika - Loving Paradise',
        cardImage: '/uploaded_image_1_1768849578330.png',

        colors: {
            primary: '#8B0000',        // Deep maroon from dress
            secondary: '#FFD700',      // Rich gold from decorations
            accent: '#DC143C',         // Crimson from flowers
            background: '#FFF5E6',     // Warm cream
            dark: '#4A0000',           // Dark maroon shadows
            text: '#3D3D3D',
        },

        typography: {
            coupleNames: {
                font: 'Alex Brush',
                weight: 400,
                size: 'extra-large',
                letterSpacing: 'normal',
                textTransform: 'none',
            },
            headings: {
                font: 'Playfair Display',
                weight: 500,
                size: 'medium',
                letterSpacing: '0.08em',
                textTransform: 'none',
            },
            body: {
                font: 'Poppins',
                weight: 300,
                size: 'small',
                letterSpacing: 'normal',
                textTransform: 'none',
            },
        },

        layout: {
            contentAlignment: 'center',
            margins: 'moderate',
            padding: 'medium',
            borderRadius: 'rounded',
            borderThickness: '1px',
            shadowDepth: 'soft',
        },

        decorations: {
            style: 'traditional-romantic',
            density: 'high',
            elements: ['roses', 'marigold', 'lattice', 'pillars'],
            corners: 'ornate-gold',
            dividers: 'simple-line',
            patterns: 'geometric-subtle',
        },

        balance: {
            negativeSpace: '35%',
            visualWeight: 'symmetrical',
            hierarchy: 'couple-illustration-dominant',
            contrast: 'high',
        },

        mood: {
            elegance: 'very-high',
            tradition: 'high',
            modernity: 'low',
            luxury: 'premium',
            warmth: 'very-warm',
        },
    },

    'aarav-aavi': {
        id: 'aarav-aavi',
        name: 'Aarav & Aavi - Aquamarine Peacock',
        cardImage: '/uploaded_image_2_1768849578330.png',

        colors: {
            primary: '#40E0D0',        // Turquoise from background
            secondary: '#FFD700',      // Gold accents
            accent: '#98D8C8',         // Mint green
            background: '#F7F9F9',     // Light cream
            dark: '#2C7873',           // Deep teal
            text: '#2F4F4F',
        },

        typography: {
            coupleNames: {
                font: 'Great Vibes',
                weight: 400,
                size: 'extra-large',
                letterSpacing: 'wide',
                textTransform: 'none',
            },
            headings: {
                font: 'Playfair Display',
                weight: 400,
                size: 'small',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
            },
            body: {
                font: 'Poppins',
                weight: 300,
                size: 'small',
                letterSpacing: 'normal',
                textTransform: 'none',
            },
        },

        layout: {
            contentAlignment: 'center',
            margins: 'generous',
            padding: 'large',
            borderRadius: 'arch',
            borderThickness: '0px',
            shadowDepth: 'none',
        },

        decorations: {
            style: 'nature-peacock',
            density: 'medium',
            elements: ['peacock', 'feathers', 'flowers', 'leaves'],
            corners: 'organic',
            dividers: 'decorative-line',
            patterns: 'floral-border',
        },

        balance: {
            negativeSpace: '45%',
            visualWeight: 'asymmetrical-balanced',
            hierarchy: 'background-dominant',
            contrast: 'medium',
        },

        mood: {
            elegance: 'high',
            tradition: 'medium',
            modernity: 'high',
            luxury: 'refined',
            warmth: 'cool-fresh',
        },
    },

    'aarav-aarohi': {
        id: 'aarav-aarohi',
        name: 'Aarav & Aarohi - Vinayaka',
        cardImage: '/uploaded_image_3_1768849578330.png',

        colors: {
            primary: '#FFD700',        // Vibrant yellow/gold
            secondary: '#00CED1',      // Turquoise accents
            accent: '#FF69B4',         // Pink lotus
            background: '#FFFACD',     // Light yellow
            dark: '#DAA520',           // Goldenrod
            text: '#4A4A4A',
        },

        typography: {
            coupleNames: {
                font: 'Great Vibes',
                weight: 400,
                size: 'extra-large',
                letterSpacing: 'normal',
                textTransform: 'none',
            },
            headings: {
                font: 'Bodoni Moda',
                weight: 600,
                size: 'medium',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
            },
            body: {
                font: 'Poppins',
                weight: 400,
                size: 'small',
                letterSpacing: 'normal',
                textTransform: 'none',
            },
        },

        layout: {
            contentAlignment: 'center',
            margins: 'moderate',
            padding: 'medium',
            borderRadius: 'arch-ornate',
            borderThickness: '3px',
            shadowDepth: 'medium',
        },

        decorations: {
            style: 'divine-traditional',
            density: 'high',
            elements: ['ganesh', 'lotus', 'fountain', 'trees', 'lanterns'],
            corners: 'rounded-ornate',
            dividers: 'ornamental',
            patterns: 'mandala-prominent',
        },

        balance: {
            negativeSpace: '30%',
            visualWeight: 'center-heavy',
            hierarchy: 'deity-dominant',
            contrast: 'very-high',
        },

        mood: {
            elegance: 'medium',
            tradition: 'very-high',
            modernity: 'low',
            luxury: 'festive',
            warmth: 'very-warm-vibrant',
        },
    },

    'raj-simran': {
        id: 'raj-simran',
        name: 'Raj & Simran - Sweet William',
        cardImage: '/uploaded_image_4_1768849578330.png',

        colors: {
            primary: '#FF69B4',        // Hot pink from text
            secondary: '#FFB6C1',      // Light pink from flowers
            accent: '#D4AF37',         // Gold accents
            background: '#FFF0F5',     // Lavender blush
            dark: '#C71585',           // Deep pink
            text: '#5D5D5D',
        },

        typography: {
            coupleNames: {
                font: 'Alex Brush',
                weight: 400,
                size: 'extra-large',
                letterSpacing: 'normal',
                textTransform: 'none',
            },
            headings: {
                font: 'Playfair Display',
                weight: 400,
                size: 'small',
                letterSpacing: '0.05em',
                textTransform: 'none',
            },
            body: {
                font: 'Poppins',
                weight: 300,
                size: 'small',
                letterSpacing: 'normal',
                textTransform: 'none',
            },
        },

        layout: {
            contentAlignment: 'center',
            margins: 'generous',
            padding: 'large',
            borderRadius: 'soft',
            borderThickness: '0px',
            shadowDepth: 'subtle',
        },

        decorations: {
            style: 'minimal-floral',
            density: 'low',
            elements: ['roses', 'leaves', 'couple-illustration'],
            corners: 'clean',
            dividers: 'simple',
            patterns: 'watercolor-subtle',
        },

        balance: {
            negativeSpace: '50%',
            visualWeight: 'light-airy',
            hierarchy: 'couple-names-primary',
            contrast: 'medium',
        },

        mood: {
            elegance: 'high',
            tradition: 'low',
            modernity: 'very-high',
            luxury: 'understated',
            warmth: 'soft-romantic',
        },
    },
};

export const ThemeProvider = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState(() => {
        const saved = localStorage.getItem('weddingTheme');
        return saved || 'shahid-meera';
    });

    const theme = themes[currentTheme];

    useEffect(() => {
        localStorage.setItem('weddingTheme', currentTheme);

        // Apply extracted colors to CSS variables
        const root = document.documentElement;
        root.style.setProperty('--color-primary', theme.colors.primary);
        root.style.setProperty('--color-secondary', theme.colors.secondary);
        root.style.setProperty('--color-accent', theme.colors.accent);
        root.style.setProperty('--color-background', theme.colors.background);
        root.style.setProperty('--color-dark', theme.colors.dark);
        root.style.setProperty('--color-text', theme.colors.text);

        // Apply typography
        root.style.setProperty('--font-signature', theme.typography.coupleNames.font);
        root.style.setProperty('--font-heading', theme.typography.headings.font);
        root.style.setProperty('--font-body', theme.typography.body.font);

        // Apply layout properties
        root.style.setProperty('--border-radius', theme.layout.borderRadius);
        root.style.setProperty('--border-thickness', theme.layout.borderThickness);

        // Update body background based on theme colors
        const bgGradient = `linear-gradient(135deg, 
            ${theme.colors.dark} 0%, 
            ${theme.colors.primary} 30%, 
            ${theme.colors.background} 50%, 
            ${theme.colors.primary} 70%, 
            ${theme.colors.dark} 100%
        )`;
        document.body.style.background = bgGradient;
        document.body.style.backgroundAttachment = 'fixed';

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
