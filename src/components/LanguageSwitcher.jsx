import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const languages = [
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
        { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' }
    ];

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="fixed top-20 right-6 z-40 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border-2 border-gold/30 p-2">
            <div className="flex flex-col gap-2">
                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 font-poppins text-sm ${i18n.language === lang.code
                                ? 'bg-gradient-to-r from-maroon to-gold text-cream shadow-md'
                                : 'bg-cream text-maroon hover:bg-gold/20'
                            }`}
                    >
                        <span className="text-lg">{lang.flag}</span>
                        <span className="font-medium">{lang.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LanguageSwitcher;
