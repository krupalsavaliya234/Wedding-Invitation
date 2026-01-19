import React from 'react';
import { motion } from 'framer-motion';

const StatsCard = ({ title, value, icon, color = 'teal', trend }) => {
    const colorClasses = {
        teal: 'text-teal-glow shadow-glow-teal',
        violet: 'text-violet-glow shadow-glow-violet',
        gold: 'text-gold shadow-glow-gold',
    };

    return (
        <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            className="glass-card-premium rounded-xl p-6 relative overflow-hidden group"
        >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 shimmer-teal opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Content */}
            <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg glass-card ${colorClasses[color]}`}>
                        {icon}
                    </div>
                    {trend && (
                        <div className={`text-sm font-poppins ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
                        </div>
                    )}
                </div>

                <h3 className="text-cream/60 font-poppins text-sm mb-2">{title}</h3>
                <p className="text-4xl font-cinzel font-bold text-gradient-gold">{value}</p>
            </div>
        </motion.div>
    );
};

export default StatsCard;
