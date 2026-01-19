import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAudio } from '../contexts/AudioContext';

const EntryScreen = ({ onOpenInvitation }) => {
    const { t } = useTranslation();
    const { play } = useAudio();
    const [showToast, setShowToast] = useState(false);

    const handleOpenClick = async () => {
        const played = await play();

        if (!played) {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }

        onOpenInvitation();
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden perspective-2000">
            {/* Toast Notification */}
            {showToast && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="fixed top-24 right-6 z-50 glass-card px-6 py-3 rounded-lg shadow-glow-coral"
                >
                    <p className="font-poppins text-sm text-cream">Click the music icon to play 🎵</p>
                </motion.div>
            )}

            {/* Floating Decorative Orbs */}
            <motion.div
                className="absolute top-20 left-20 w-32 h-32 rounded-full glow-sage opacity-20"
                animate={{
                    y: [0, -30, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                style={{ transform: 'translateZ(50px)' }}
            />
            <motion.div
                className="absolute bottom-20 right-20 w-40 h-40 rounded-full glow-coral opacity-20"
                animate={{
                    y: [0, 25, 0],
                    scale: [1, 1.15, 1],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                style={{ transform: 'translateZ(30px)' }}
            />

            {/* Main Glass Container with Scalloped Border */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="text-center z-10 px-6 max-w-4xl preserve-3d relative"
                style={{ transform: 'translateZ(100px)' }}
            >
                {/* Ornate Floral Border Container */}
                <div className="relative">
                    {/* Top Left Floral Corner */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="absolute -top-8 -left-8 w-24 h-24 z-10"
                    >
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                            <path d="M10,90 Q10,10 90,10" fill="none" stroke="#E8A598" strokeWidth="2" opacity="0.6" />
                            <circle cx="50" cy="30" r="8" fill="#E8A598" opacity="0.8" />
                            <circle cx="30" cy="50" r="6" fill="#D4AF37" opacity="0.7" />
                            <path d="M20,70 Q30,60 40,70 Q30,80 20,70" fill="#8B9D83" opacity="0.6" />
                        </svg>
                    </motion.div>

                    {/* Top Right Floral Corner */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="absolute -top-8 -right-8 w-24 h-24 z-10 transform scale-x-[-1]"
                    >
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                            <path d="M10,90 Q10,10 90,10" fill="none" stroke="#E8A598" strokeWidth="2" opacity="0.6" />
                            <circle cx="50" cy="30" r="8" fill="#E8A598" opacity="0.8" />
                            <circle cx="30" cy="50" r="6" fill="#D4AF37" opacity="0.7" />
                            <path d="M20,70 Q30,60 40,70 Q30,80 20,70" fill="#8B9D83" opacity="0.6" />
                        </svg>
                    </motion.div>

                    {/* Bottom Left Floral Corner */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="absolute -bottom-8 -left-8 w-24 h-24 z-10 transform scale-y-[-1]"
                    >
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                            <path d="M10,90 Q10,10 90,10" fill="none" stroke="#E8A598" strokeWidth="2" opacity="0.6" />
                            <circle cx="50" cy="30" r="8" fill="#E8A598" opacity="0.8" />
                            <circle cx="30" cy="50" r="6" fill="#D4AF37" opacity="0.7" />
                            <path d="M20,70 Q30,60 40,70 Q30,80 20,70" fill="#8B9D83" opacity="0.6" />
                        </svg>
                    </motion.div>

                    {/* Bottom Right Floral Corner */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="absolute -bottom-8 -right-8 w-24 h-24 z-10 transform scale-[-1]"
                    >
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                            <path d="M10,90 Q10,10 90,10" fill="none" stroke="#E8A598" strokeWidth="2" opacity="0.6" />
                            <circle cx="50" cy="30" r="8" fill="#E8A598" opacity="0.8" />
                            <circle cx="30" cy="50" r="6" fill="#D4AF37" opacity="0.7" />
                            <path d="M20,70 Q30,60 40,70 Q30,80 20,70" fill="#8B9D83" opacity="0.6" />
                        </svg>
                    </motion.div>

                    {/* Scalloped Glass Card */}
                    <div className="glass-card-ultra rounded-3xl p-12 md:p-16 relative overflow-hidden"
                        style={{
                            clipPath: 'polygon(0 3%, 3% 0, 97% 0, 100% 3%, 100% 97%, 97% 100%, 3% 100%, 0 97%)'
                        }}>
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 shimmer-gold pointer-events-none" />

                        {/* Sanskrit Blessing */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="mb-6"
                        >
                            <p className="font-hind text-gold text-sm">॥ ॐ गणपतये नमः ॥</p>
                        </motion.div>

                        {/* Decorative Top Divider */}
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="flex items-center justify-center mb-8"
                        >
                            <div className="h-px w-20 bg-gradient-to-r from-transparent via-coral-pink to-transparent" />
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="mx-4"
                            >
                                <svg className="w-10 h-10 text-gold glow-gold" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C12 2 10 6 10 8C10 10 11 11 12 11C13 11 14 10 14 8C14 6 12 2 12 2Z M12 11C12 11 8 12 8 14C8 16 10 17 12 17C14 17 16 16 16 14C16 12 12 11 12 11Z M12 17C12 17 10 18 10 20C10 22 11 23 12 23C13 23 14 22 14 20C14 18 12 17 12 17Z M6 8C6 8 4 10 4 12C4 14 5 15 6 15C7 15 8 14 8 12C8 10 6 8 6 8Z M18 8C18 8 16 10 16 12C16 14 17 15 18 15C19 15 20 14 20 12C20 10 18 8 18 8Z" />
                                </svg>
                            </motion.div>
                            <div className="h-px w-20 bg-gradient-to-r from-transparent via-sage-green to-transparent" />
                        </motion.div>

                        {/* Welcome Text */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="font-cinzel text-3xl md:text-5xl font-semibold text-coral-pink mb-6 tracking-wide"
                            style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}
                        >
                            {t('welcome')}
                        </motion.h1>

                        {/* Invitation Message */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="font-poppins text-base md:text-lg text-cream/80 mb-10 leading-relaxed"
                        >
                            {t('invite_message')}
                        </motion.p>

                        {/* Couple Names - Signature Font */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.7 }}
                            className="mb-12 relative"
                        >
                            <h2 className="font-signature text-7xl md:text-9xl text-gradient-coral mb-6 animate-pulse-glow leading-tight">
                                {t('wedding_title')}
                            </h2>

                            {/* Lotus Divider */}
                            <div className="flex items-center justify-center mt-8">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '100px' }}
                                    transition={{ duration: 0.8, delay: 1 }}
                                    className="h-px bg-gradient-to-r from-transparent via-gold to-transparent"
                                />
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="mx-4"
                                >
                                    <svg className="w-8 h-8 text-coral-pink glow-coral" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C12 2 10 6 10 8C10 10 11 11 12 11C13 11 14 10 14 8C14 6 12 2 12 2Z M12 11C12 11 8 12 8 14C8 16 10 17 12 17C14 17 16 16 16 14C16 12 12 11 12 11Z M12 17C12 17 10 18 10 20C10 22 11 23 12 23C13 23 14 22 14 20C14 18 12 17 12 17Z M6 8C6 8 4 10 4 12C4 14 5 15 6 15C7 15 8 14 8 12C8 10 6 8 6 8Z M18 8C18 8 16 10 16 12C16 14 17 15 18 15C19 15 20 14 20 12C20 10 18 8 18 8Z" />
                                    </svg>
                                </motion.div>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '100px' }}
                                    transition={{ duration: 0.8, delay: 1 }}
                                    className="h-px bg-gradient-to-r from-transparent via-gold to-transparent"
                                />
                            </div>
                        </motion.div>

                        {/* Open Invitation Button */}
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.9 }}
                            whileHover={{
                                scale: 1.05,
                                rotateX: -5,
                                boxShadow: "0 20px 60px rgba(232, 165, 152, 0.4)",
                            }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleOpenClick}
                            className="group relative px-14 py-5 glass-card-premium rounded-full overflow-hidden transition-all duration-300 preserve-3d border-2 border-gold/30"
                        >
                            <div className="absolute inset-0 shimmer-teal opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <span className="relative z-10 font-cinzel text-xl md:text-2xl font-semibold text-gradient-coral tracking-wider">
                                {t('open_invitation')}
                            </span>

                            <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-coral-pink/50 transition-all duration-300" />
                        </motion.button>

                        {/* Decorative Bottom Border */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1.2 }}
                            className="flex items-center justify-center mt-12"
                        >
                            <div className="h-px w-20 bg-gradient-to-r from-transparent via-sage-green to-transparent" />
                            <div className="mx-4">
                                <svg className="w-6 h-6 text-coral-pink glow-coral" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                </svg>
                            </div>
                            <div className="h-px w-20 bg-gradient-to-r from-transparent via-sage-green to-transparent" />
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default EntryScreen;
