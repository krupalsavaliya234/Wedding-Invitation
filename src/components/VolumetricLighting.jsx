import React from 'react';

// Simple static background - NO ANIMATIONS
const VolumetricLighting = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-0">
            {/* Subtle dot pattern background */}
            <div
                className="absolute inset-0 opacity-[0.15]"
                style={{
                    backgroundImage: `radial-gradient(circle, #D4A520 1px, transparent 1px)`,
                    backgroundSize: '30px 30px',
                    backgroundRepeat: 'repeat',
                }}
            />

            {/* Simple decorative circles - NO ANIMATION */}
            <div
                className="absolute top-12 left-12 w-24 h-24 rounded-full border-2 border-gold/30"
            />

            <div
                className="absolute bottom-12 right-12 w-32 h-32 rounded-full border-2 border-maroon/20"
            />
        </div>
    );
};

export default VolumetricLighting;
