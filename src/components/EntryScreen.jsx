import React, { useState } from 'react';
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
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-cream">
            {/* Toast Notification */}
            {showToast && (
                <div className="fixed top-24 right-6 z-50 bg-white px-6 py-3 rounded-lg shadow-lg border border-gold/30">
                    <p className="font-poppins text-sm text-maroon">Click the music icon to play 🎵</p>
                </div>
            )}

            {/* Main Content Container - NO ANIMATIONS */}
            <div className="text-center z-10 px-6 max-w-4xl">
                {/* Gold Star Divider */}
                <div className="flex items-center justify-center mb-8">
                    <div className="h-px w-20 bg-gold/40" />
                    <svg className="w-8 h-8 mx-4 text-gold" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" />
                    </svg>
                    <div className="h-px w-20 bg-gold/40" />
                </div>

                {/* Sanskrit Blessing */}
                <div className="mb-6">
                    <p className="font-hind text-maroon/60 text-sm">॥ ॐ गणपतये नमः ॥</p>
                </div>

                {/* Welcome Text */}
                <h1 className="font-playfair text-5xl md:text-7xl font-bold text-maroon mb-6">
                    {t('welcome')}
                </h1>

                {/* Invitation Message */}
                <p className="font-poppins text-base md:text-lg text-gold mb-10">
                    {t('invite_message')}
                </p>

                {/* Couple Names - Clean Typography */}
                <div className="mb-12">
                    <h2 className="font-playfair text-6xl md:text-8xl font-bold mb-4">
                        <span className="text-gold">{t('wedding_title').split('&')[0]}</span>
                        <span className="text-maroon"> & </span>
                        <span className="text-maroon">{t('wedding_title').split('&')[1]}</span>
                    </h2>

                    {/* Simple Divider */}
                    <div className="flex items-center justify-center mt-8">
                        <div className="h-px w-24 bg-gold/40" />
                        <svg className="w-6 h-6 mx-4 text-gold" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C12 2 10 6 10 8C10 10 11 11 12 11C13 11 14 10 14 8C14 6 12 2 12 2Z M12 11C12 11 8 12 8 14C8 16 10 17 12 17C14 17 16 16 16 14C16 12 12 11 12 11Z" />
                        </svg>
                        <div className="h-px w-24 bg-gold/40" />
                    </div>
                </div>

                {/* Open Invitation Button - Simple, No Animation */}
                <button
                    onClick={handleOpenClick}
                    className="px-12 py-4 bg-maroon text-cream rounded-lg font-poppins text-lg font-semibold hover:bg-maroon/90 transition-colors duration-200"
                >
                    {t('open_invitation')}
                </button>

                {/* Bottom Decorative Element */}
                <div className="flex items-center justify-center mt-12">
                    <svg className="w-6 h-6 text-gold" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default EntryScreen;
