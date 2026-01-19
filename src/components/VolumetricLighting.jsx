import React from 'react';
import { motion } from 'framer-motion';

const VolumetricLighting = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Sky Blue Light Source - Top Left */}
            <motion.div
                className="absolute w-[600px] h-[600px] rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(135, 206, 235, 0.18) 0%, transparent 70%)',
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

            {/* Coral Pink Light Source - Top Right */}
            <motion.div
                className="absolute w-[500px] h-[500px] rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(244, 168, 150, 0.15) 0%, transparent 70%)',
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

            {/* Chocolate Brown Light Source - Center */}
            <motion.div
                className="absolute w-[700px] h-[700px] rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(111, 78, 55, 0.1) 0%, transparent 70%)',
                    filter: 'blur(90px)',
                    top: '40%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                }}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.15, 0.1],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Sky Blue Light Source - Bottom Right */}
            <motion.div
                className="absolute w-[550px] h-[550px] rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(135, 206, 235, 0.14) 0%, transparent 70%)',
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

            {/* Coral Pink Light Source - Bottom Left */}
            <motion.div
                className="absolute w-[480px] h-[480px] rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(244, 168, 150, 0.12) 0%, transparent 70%)',
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

            {/* Moroccan Pattern Overlay */}
            <div
                className="absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%236F4E37' fill-opacity='1'%3E%3Cpath d='M40 0 L45 15 L60 15 L48 25 L53 40 L40 30 L27 40 L32 25 L20 15 L35 15 Z'/%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat',
                }}
            />
        </div>
    );
};

export default VolumetricLighting;
