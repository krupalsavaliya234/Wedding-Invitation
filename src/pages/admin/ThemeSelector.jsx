import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeSelector = () => {
    const { theme, currentTheme, changeTheme, themes } = useTheme();
    const [selectedPreview, setSelectedPreview] = useState(null);

    const themeCards = [
        {
            id: 'shahid-meera',
            name: 'Royal Maroon & Gold',
            description: 'Traditional deep maroon and royal gold - Classic Indian bridal colors',
        },
        {
            id: 'ranveer-deepika',
            name: 'Marigold & Saffron',
            description: 'Vibrant marigold orange and golden yellow - Festival celebration',
        },
        {
            id: 'aarav-aavi',
            name: 'Royal Purple & Gold',
            description: 'Regal purple and rich gold - Royal elegance',
        },
        {
            id: 'aarav-aarohi',
            name: 'Emerald & Gold',
            description: 'Fresh emerald green and gold - Nature-inspired luxury',
        },
        {
            id: 'raj-simran',
            name: 'Rose Pink & Gold',
            description: 'Vibrant rose pink and gold - Modern romantic',
        },
    ];

    const handleThemeChange = (themeId) => {
        changeTheme(themeId);
        setSelectedPreview(null);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="font-cinzel text-3xl font-bold text-gradient-holographic mb-2">
                    Theme Selector
                </h2>
                <p className="text-cream/60 font-poppins">
                    Choose a wedding card design to change the entire website theme
                </p>
            </div>

            {/* Current Theme Display */}
            <div className="glass-card-premium rounded-xl p-6">
                <h3 className="font-cinzel text-xl font-semibold text-cream mb-4">
                    Current Theme
                </h3>
                <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                        <div
                            className="w-12 h-12 rounded-lg shadow-lg"
                            style={{ backgroundColor: theme.colors.primary }}
                        />
                        <div
                            className="w-12 h-12 rounded-lg shadow-lg"
                            style={{ backgroundColor: theme.colors.secondary }}
                        />
                        <div
                            className="w-12 h-12 rounded-lg shadow-lg"
                            style={{ backgroundColor: theme.colors.accent }}
                        />
                    </div>
                    <div>
                        <p className="font-poppins font-semibold text-cream">{theme.name}</p>
                        <p className="text-cream/60 text-sm font-poppins">
                            {theme.fonts.signature} • {theme.fonts.heading}
                        </p>
                    </div>
                </div>
            </div>

            {/* Theme Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {themeCards.map((card) => {
                    const themeConfig = themes[card.id];
                    const isActive = currentTheme === card.id;

                    return (
                        <motion.div
                            key={card.id}
                            whileHover={{ scale: 1.02, y: -4 }}
                            whileTap={{ scale: 0.98 }}
                            className={`glass-card rounded-xl p-6 cursor-pointer transition-all duration-300 relative overflow-hidden
                ${isActive ? 'ring-2 ring-gold shadow-glow-gold' : 'hover:shadow-glow-teal'}`}
                            onClick={() => handleThemeChange(card.id)}
                        >
                            {/* Active Badge */}
                            {isActive && (
                                <div className="absolute top-4 right-4 bg-gold text-obsidian px-3 py-1 rounded-full text-xs font-poppins font-semibold">
                                    Active
                                </div>
                            )}

                            {/* Color Palette */}
                            <div className="flex gap-2 mb-4">
                                <div
                                    className="w-10 h-10 rounded-lg shadow-md"
                                    style={{ backgroundColor: themeConfig.colors.primary }}
                                />
                                <div
                                    className="w-10 h-10 rounded-lg shadow-md"
                                    style={{ backgroundColor: themeConfig.colors.secondary }}
                                />
                                <div
                                    className="w-10 h-10 rounded-lg shadow-md"
                                    style={{ backgroundColor: themeConfig.colors.accent }}
                                />
                            </div>

                            {/* Theme Info */}
                            <h4 className="font-cinzel text-lg font-semibold text-cream mb-2">
                                {card.name}
                            </h4>
                            <p className="text-cream/60 text-sm font-poppins mb-4">
                                {card.description}
                            </p>

                            {/* Font Preview */}
                            <div className="text-cream/40 text-xs font-poppins">
                                <p>Fonts: {themeConfig.fonts.signature}, {themeConfig.fonts.heading}</p>
                            </div>

                            {/* Apply Button */}
                            {!isActive && (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    className="mt-4 w-full py-2 glass-card-premium rounded-lg text-sm font-poppins font-semibold text-gold hover:shadow-glow-gold transition-all"
                                >
                                    Apply Theme
                                </motion.button>
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {/* Theme Preview Modal */}
            {selectedPreview && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6"
                    onClick={() => setSelectedPreview(null)}
                >
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="glass-card-ultra rounded-2xl p-8 max-w-2xl w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="font-cinzel text-2xl font-bold text-cream mb-4">
                            Theme Preview
                        </h3>
                        {/* Preview content would go here */}
                        <button
                            onClick={() => setSelectedPreview(null)}
                            className="mt-6 px-6 py-3 glass-card-premium rounded-lg font-poppins text-cream"
                        >
                            Close
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default ThemeSelector;
