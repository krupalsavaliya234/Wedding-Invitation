import React from 'react';
import { useTranslation } from 'react-i18next';

const EntryScreen = ({ onOpenInvitation }) => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-maroon via-cream to-gold mandala-pattern relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-10 left-10 w-32 h-32 border-4 border-gold rounded-full opacity-20 animate-pulse-slow"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 border-4 border-maroon rounded-full opacity-20 animate-pulse-slow"></div>

            {/* Main content */}
            <div className="text-center z-10 animate-fade-in px-6">
                {/* Decorative top border */}
                <div className="flex items-center justify-center mb-8">
                    <div className="h-px w-20 bg-gold"></div>
                    <div className="mx-4">
                        <svg className="w-12 h-12 text-gold" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L9.5 8.5L3 9.5L7.5 14L6.5 21L12 17.5L17.5 21L16.5 14L21 9.5L14.5 8.5L12 2Z" />
                        </svg>
                    </div>
                    <div className="h-px w-20 bg-gold"></div>
                </div>

                {/* Welcome text */}
                <h1 className="font-playfair text-5xl md:text-7xl font-bold text-maroon mb-6 animate-slide-up">
                    {t('welcome')}
                </h1>

                <p className="font-poppins text-xl md:text-2xl text-gold mb-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                    {t('invite_message')}
                </p>

                {/* Couple names */}
                <div className="mb-12 animate-slide-up" style={{ animationDelay: '0.6s' }}>
                    <h2 className="font-playfair text-6xl md:text-8xl font-bold text-gradient mb-4">
                        {t('wedding_title')}
                    </h2>
                    <div className="flex items-center justify-center mt-6">
                        <div className="h-px w-24 bg-gold"></div>
                        <span className="mx-4 text-gold text-2xl">❖</span>
                        <div className="h-px w-24 bg-gold"></div>
                    </div>
                </div>

                {/* Open invitation button */}
                <button
                    onClick={onOpenInvitation}
                    className="group relative px-12 py-4 bg-maroon text-cream font-playfair text-xl font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-slide-up"
                    style={{ animationDelay: '0.9s' }}
                >
                    <span className="relative z-10">{t('open_invitation')}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-gold to-maroon opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

                {/* Decorative bottom border */}
                <div className="flex items-center justify-center mt-12 animate-slide-up" style={{ animationDelay: '1.2s' }}>
                    <div className="h-px w-20 bg-gold"></div>
                    <div className="mx-4">
                        <svg className="w-8 h-8 text-gold" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    </div>
                    <div className="h-px w-20 bg-gold"></div>
                </div>
            </div>
        </div>
    );
};

export default EntryScreen;
