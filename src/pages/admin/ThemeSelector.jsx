import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeSelector = () => {
    const { theme, currentTheme, changeTheme, themes } = useTheme();
    const [selectedPreview, setSelectedPreview] = useState(null);

    const handleThemeChange = (themeId) => {
        changeTheme(themeId);
        setSelectedPreview(null);
    };

    const themeCards = Object.values(themes);

    return (
        <div className="space-y-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h2 className="font-cinzel text-4xl font-bold text-gold mb-3">
                    Wedding Card Theme Selector
                </h2>
                <p className="text-text-secondary font-poppins text-lg">
                    Choose a wedding card design - the entire website will automatically match its colors, fonts, and style
                </p>
            </motion.div>

            {/* Current Theme Display */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card-wedding bg-white border-2 border-border-gold p-8"
            >
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h3 className="font-cinzel text-2xl font-bold text-maroon mb-2">
                            Currently Active Theme
                        </h3>
                        <p className="text-gold font-poppins text-lg font-semibold">
                            {theme.name}
                        </p>
                    </div>
                    <div className="px-4 py-2 bg-gradient-to-r from-gold to-saffron rounded-wedding border-2 border-border-gold">
                        <span className="text-maroon font-poppins text-sm font-semibold">ACTIVE</span>
                    </div>
                </div>

                {/* Color Palette Display */}
                <div className="grid grid-cols-6 gap-3 mb-6">
                    {Object.entries(theme.colors).map(([name, color]) => (
                        <div key={name} className="text-center">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="w-full h-20 rounded-lg shadow-lg mb-2 border-2 border-white/20"
                                style={{ backgroundColor: color }}
                            />
                            <p className="text-cream/60 text-xs font-poppins capitalize">{name}</p>
                            <p className="text-cream/40 text-xs font-mono">{color}</p>
                        </div>
                    ))}
                </div>

                {/* Typography Preview */}
                <div className="bg-gradient-to-br from-ivory to-white rounded-wedding-lg p-6 space-y-4 border border-border-gold/50">
                    <h4 className="text-text-primary font-poppins text-sm font-semibold mb-4">Typography Preview</h4>
                    <div>
                        <p className="text-text-secondary text-xs mb-1">Couple Names Font:</p>
                        <p
                            className="text-3xl text-maroon"
                            style={{ fontFamily: theme.typography.coupleNames.font }}
                        >
                            {theme.typography.coupleNames.font}
                        </p>
                    </div>
                    <div>
                        <p className="text-text-secondary text-xs mb-1">Headings Font:</p>
                        <p
                            className="text-xl text-maroon"
                            style={{ fontFamily: theme.typography.headings.font }}
                        >
                            {theme.typography.headings.font}
                        </p>
                    </div>
                </div>

                {/* Design DNA Summary */}
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-br from-ivory to-white rounded-wedding p-4 border border-border-gold/50">
                        <p className="text-text-secondary text-xs mb-1">Elegance</p>
                        <p className="text-gold font-semibold capitalize">{theme.mood.elegance}</p>
                    </div>
                    <div className="bg-gradient-to-br from-ivory to-white rounded-wedding p-4 border border-border-gold/50">
                        <p className="text-text-secondary text-xs mb-1">Tradition</p>
                        <p className="text-gold font-semibold capitalize">{theme.mood.tradition}</p>
                    </div>
                    <div className="bg-gradient-to-br from-ivory to-white rounded-wedding p-4 border border-border-gold/50">
                        <p className="text-text-secondary text-xs mb-1">Luxury</p>
                        <p className="text-gold font-semibold capitalize">{theme.mood.luxury}</p>
                    </div>
                    <div className="bg-gradient-to-br from-ivory to-white rounded-wedding p-4 border border-border-gold/50">
                        <p className="text-text-secondary text-xs mb-1">Style</p>
                        <p className="text-gold font-semibold capitalize">{theme.decorations.style}</p>
                    </div>
                </div>
            </motion.div>

            {/* Theme Grid */}
            <div>
                <h3 className="font-cinzel text-2xl font-bold text-maroon mb-6">
                    Available Wedding Card Themes ({themeCards.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {themeCards.map((card) => {
                        const isActive = currentTheme === card.id;

                        return (
                            <motion.div
                                key={card.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{ scale: 1.03, y: -8 }}
                                whileTap={{ scale: 0.98 }}
                                className={`card-wedding bg-white border-2 overflow-hidden cursor-pointer transition-all duration-300 relative
                                    ${isActive ? 'ring-4 ring-gold shadow-wedding-gold border-gold' : 'border-border-gold hover:shadow-wedding-gold'}`}
                                onClick={() => !isActive && handleThemeChange(card.id)}
                            >
                                {/* Active Badge */}
                                {isActive && (
                                    <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-gold to-saffron text-maroon px-4 py-2 rounded-wedding-xl text-xs font-poppins font-bold shadow-wedding-gold border-2 border-border-gold">
                                        ✓ ACTIVE
                                    </div>
                                )}

                                {/* Card Preview - Color Gradient */}
                                <div
                                    className="h-40 relative overflow-hidden"
                                    style={{
                                        background: `linear-gradient(135deg, ${card.colors.primary} 0%, ${card.colors.secondary} 50%, ${card.colors.accent} 100%)`
                                    }}
                                >
                                    <div className="absolute inset-0 bg-black/10" />
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <p
                                            className="text-2xl text-white drop-shadow-lg"
                                            style={{ fontFamily: card.typography.coupleNames.font }}
                                        >
                                            {card.name.split(' - ')[0]}
                                        </p>
                                    </div>
                                </div>

                                {/* Card Info */}
                                <div className="p-6">
                                    <h4 className="font-cinzel text-lg font-semibold text-maroon mb-3">
                                        {card.name}
                                    </h4>

                                    {/* Color Palette Mini */}
                                    <div className="flex gap-2 mb-4">
                                        <div
                                            className="w-8 h-8 rounded-wedding shadow-wedding-gold border-2 border-border-gold/30"
                                            style={{ backgroundColor: card.colors.primary }}
                                        />
                                        <div
                                            className="w-8 h-8 rounded-wedding shadow-wedding-gold border-2 border-border-gold/30"
                                            style={{ backgroundColor: card.colors.secondary }}
                                        />
                                        <div
                                            className="w-8 h-8 rounded-wedding shadow-wedding-gold border-2 border-border-gold/30"
                                            style={{ backgroundColor: card.colors.accent }}
                                        />
                                    </div>

                                    {/* Design Attributes */}
                                    <div className="space-y-2 text-xs text-text-secondary font-poppins">
                                        <p>• Style: <span className="text-text-primary capitalize">{card.decorations.style}</span></p>
                                        <p>• Elegance: <span className="text-text-primary capitalize">{card.mood.elegance}</span></p>
                                        <p>• Fonts: <span className="text-text-primary">{card.typography.coupleNames.font}</span></p>
                                    </div>

                                    {/* Apply Button */}
                                    {!isActive && (
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="btn-wedding-primary mt-6 w-full py-3 text-sm font-poppins font-semibold"
                                        >
                                            Apply This Theme
                                        </motion.button>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Info Box */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="card-wedding bg-white border-l-4 border-gold p-6"
            >
                <h4 className="font-cinzel text-lg font-semibold text-gold mb-2">
                    🎨 How It Works
                </h4>
                <p className="text-text-secondary font-poppins text-sm leading-relaxed">
                    Each theme is extracted from a real wedding card design. When you select a theme, the entire website automatically adopts that card's exact color palette, typography style, spacing, decorative elements, and overall aesthetic. The system analyzes the card's visual DNA and applies it consistently across all pages.
                </p>
            </motion.div>
        </div>
    );
};

export default ThemeSelector;
