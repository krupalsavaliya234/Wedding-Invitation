import React from 'react';
import { motion } from 'framer-motion';

const StatsCard = ({ title, value, icon, color = 'gold', trend }) => {
    const colorClasses = {
        gold: 'bg-gradient-to-br from-gold to-saffron text-maroon',
        maroon: 'bg-gradient-to-br from-maroon to-maroon/80 text-gold',
        saffron: 'bg-gradient-to-br from-saffron to-gold text-maroon',
    };

    return (
        <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            className="card-wedding bg-white border-2 border-border-gold p-6 relative overflow-hidden group hover:shadow-wedding-gold"
        >
            {/* Content */}
            <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-wedding-lg shadow-wedding-gold ${colorClasses[color] || colorClasses.gold}`}>
                        {icon}
                    </div>
                    {trend && (
                        <div className={`text-sm font-poppins font-semibold ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
                        </div>
                    )}
                </div>

                <h3 className="text-text-secondary font-poppins text-sm mb-2 font-medium">{title}</h3>
                <p className="text-4xl font-cinzel font-bold text-gold">{value}</p>
            </div>
        </motion.div>
    );
};

export default StatsCard;
