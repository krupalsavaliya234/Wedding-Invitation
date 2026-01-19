import React from 'react';
import { motion } from 'framer-motion';

const VolumetricLighting = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Deep Maroon Light Source - Top Left */}
            <motion.div
                className="absolute w-[600px] h-[600px] rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(139, 0, 0, 0.2) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                    top: '-10%',
                    left: '-10%',
                }}
                animate={{
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Royal Gold Light Source - Top Right */}
            <motion.div
                className="absolute w-[500px] h-[500px] rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(255, 215, 0, 0.15) 0%, transparent 70%)',
                    filter: 'blur(70px)',
                    top: '10%',
                    right: '-5%',
                }}
                animate={{
                    x: [0, -40, 0],
                    y: [0, 40, 0],
                    scale: [1, 1.15, 1],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Crimson Light Source - Center */}
            <motion.div
                className="absolute w-[700px] h-[700px] rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(220, 20, 60, 0.12) 0%, transparent 70%)',
                    filter: 'blur(90px)',
                    top: '40%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                }}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.12, 0.18, 0.12],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Gold Light Source - Bottom Right */}
            <motion.div
                className="absolute w-[550px] h-[550px] rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(255, 215, 0, 0.13) 0%, transparent 70%)',
                    filter: 'blur(75px)',
                    bottom: '5%',
                    right: '10%',
                }}
                animate={{
                    x: [0, -30, 0],
                    y: [0, -25, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 16,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Maroon Light Source - Bottom Left */}
            <motion.div
                className="absolute w-[480px] h-[480px] rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(139, 0, 0, 0.15) 0%, transparent 70%)',
                    filter: 'blur(65px)',
                    bottom: '15%',
                    left: '5%',
                }}
                animate={{
                    x: [0, 35, 0],
                    y: [0, -30, 0],
                    scale: [1, 1.12, 1],
                }}
                transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Traditional Mandala Pattern Overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FFD700' fill-opacity='1'%3E%3Ccircle cx='40' cy='40' r='3'/%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3Ccircle cx='60' cy='60' r='2'/%3E%3Ccircle cx='20' cy='60' r='2'/%3E%3Ccircle cx='60' cy='20' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat',
                }}
            />
        </div>
    );
};

export default VolumetricLighting;
