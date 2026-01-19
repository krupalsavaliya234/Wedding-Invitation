import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslation from '../public/locales/en/translation.json';
import hiTranslation from '../public/locales/hi/translation.json';
import guTranslation from '../public/locales/gu/translation.json';

i18n
    // Detect user language
    .use(LanguageDetector)
    // Pass the i18n instance to react-i18next
    .use(initReactI18next)
    // Initialize i18next
    .init({
        resources: {
            en: {
                translation: enTranslation
            },
            hi: {
                translation: hiTranslation
            },
            gu: {
                translation: guTranslation
            }
        },
        fallbackLng: 'en',
        debug: false,

        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
            lookupLocalStorage: 'i18nextLng',
        },

        interpolation: {
            escapeValue: false // React already escapes values
        }
    });

export default i18n;
