import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const languages = [
        { code: 'en', name: 'English', nativeName: 'English' },
        { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
        { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' }
    ];

    const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setIsOpen(false);
    };

    return (
        <div className="fixed top-20 right-6 z-40">
            {/* Language Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-maroon to-maroon/90 text-gold rounded-wedding shadow-wedding-gold border-2 border-border-gold hover:bg-gradient-to-r hover:from-gold hover:to-saffron hover:text-maroon transition-all duration-300 font-poppins font-semibold transform hover:scale-105 hover:shadow-wedding-maroon"
                aria-label="Change Language"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                <span className="hidden md:inline">{currentLanguage.nativeName}</span>
                <svg className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-30"
                        onClick={() => setIsOpen(false)}
                    ></div>

                    {/* Dropdown */}
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white/95 backdrop-blur-sm rounded-wedding-lg shadow-wedding-gold border-2 border-border-gold overflow-hidden z-40 animate-slide-up">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => changeLanguage(lang.code)}
                                className={`w-full px-4 py-3 text-left transition-all duration-200 font-poppins ${i18n.language === lang.code
                                        ? 'bg-gradient-to-r from-maroon to-maroon/90 text-gold font-semibold'
                                        : 'text-text-primary hover:bg-gold/20 hover:text-maroon'
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-base">{lang.nativeName}</span>
                                    {i18n.language === lang.code && (
                                        <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                        </svg>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default LanguageSwitcher;
