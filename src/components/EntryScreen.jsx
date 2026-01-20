import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAudio } from '../contexts/AudioContext';

const EntryScreen = ({ onOpenInvitation, invitation }) => {
    const { t } = useTranslation();
    const { play } = useAudio();
    const [showToast, setShowToast] = useState(false);
    
    // Use invitation data if provided, otherwise use defaults
    const coupleName = invitation?.coupleDisplayName || t('wedding_title');

    const handleOpenClick = async () => {
        const played = await play();

        if (!played) {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }

        onOpenInvitation();
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-ivory">
            {/* Decorative Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute top-20 left-20 w-32 h-32 border-2 border-gold rounded-full"></div>
                <div className="absolute bottom-20 right-20 w-40 h-40 border-2 border-maroon rounded-full"></div>
                <div className="absolute top-1/2 left-10 w-24 h-24 border-2 border-saffron rounded-full"></div>
            </div>

            {/* Toast Notification */}
            {showToast && (
                <div className="fixed top-24 right-6 z-50 bg-white px-6 py-3 rounded-wedding shadow-wedding-gold border-2 border-border-gold animate-fade-in">
                    <p className="font-poppins text-sm text-text-primary">Click the music icon to play 🎵</p>
                </div>
            )}

            {/* Main Content Container */}
            <div className="text-center z-10 px-6 max-w-4xl relative">
                {/* Floral Divider - Top */}
                <div className="flex items-center justify-center mb-8">
                    <div className="h-px w-20 bg-gradient-to-r from-transparent via-border-gold to-transparent" />
                    <div className="mx-4 w-12 h-12 flex items-center justify-center">
                        <svg className="w-10 h-10 text-gold" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                    </div>
                    <div className="h-px w-20 bg-gradient-to-r from-transparent via-border-gold to-transparent" />
                </div>

                {/* Sanskrit Blessing */}
                <div className="mb-8">
                    <p className="font-cinzel text-text-secondary text-base md:text-lg tracking-wider">॥ ॐ गणपतये नमः ॥</p>
                </div>

                {/* Welcome Text */}
                <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-gold mb-6 tracking-tight">
                    {t('welcome')}
                </h1>

                {/* Invitation Message */}
                <p className="font-poppins text-base md:text-lg text-text-secondary mb-12 max-w-2xl mx-auto leading-relaxed">
                    {t('invite_message')}
                </p>

                {/* Couple Names - Elegant Typography */}
                <div className="mb-16">
                    <h2 className="font-great-vibes text-5xl md:text-7xl lg:text-8xl font-normal mb-6 leading-tight">
                        {invitation ? (
                            <>
                                <span className="text-gold drop-shadow-lg">{invitation.groomName}</span>
                                <span className="text-maroon mx-2">&</span>
                                <span className="text-maroon drop-shadow-lg">{invitation.brideName}</span>
                            </>
                        ) : (
                            <>
                                <span className="text-gold drop-shadow-lg">{t('wedding_title').split('&')[0]}</span>
                                <span className="text-maroon mx-2">&</span>
                                <span className="text-maroon drop-shadow-lg">{t('wedding_title').split('&')[1]}</span>
                            </>
                        )}
                    </h2>

                    {/* Floral Divider */}
                    <div className="flex items-center justify-center mt-10">
                        <div className="h-px w-24 bg-gradient-to-r from-transparent via-border-gold to-transparent" />
                        <div className="mx-4">
                            <svg className="w-8 h-8 text-gold" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C12 2 10 6 10 8C10 10 11 11 12 11C13 11 14 10 14 8C14 6 12 2 12 2Z M12 11C12 11 8 12 8 14C8 16 10 17 12 17C14 17 16 16 16 14C16 12 12 11 12 11Z" />
                            </svg>
                        </div>
                        <div className="h-px w-24 bg-gradient-to-r from-transparent via-border-gold to-transparent" />
                    </div>
                </div>

                {/* Open Invitation Button - Premium Design */}
                <button
                    onClick={handleOpenClick}
                    className="btn-wedding-primary font-poppins text-lg font-semibold px-16 py-4 mb-12"
                >
                    {t('open_invitation')}
                </button>

                {/* Bottom Decorative Element - Diya/Kalash */}
                <div className="flex items-center justify-center mt-16">
                    <svg className="w-8 h-8 text-gold animate-pulse-slow" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default EntryScreen;
