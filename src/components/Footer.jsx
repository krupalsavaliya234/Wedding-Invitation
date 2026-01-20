import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();
    const websiteUrl = window.location.origin;

    return (
        <footer className="py-16 px-6 bg-gradient-to-b from-maroon to-maroon/90 text-center relative overflow-hidden">
            {/* Decorative Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-20 h-20 border-2 border-gold rounded-full"></div>
                <div className="absolute bottom-10 right-10 w-24 h-24 border-2 border-gold rounded-full"></div>
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* QR Code Section */}
                <div className="mb-12">
                    <h3 className="font-playfair text-2xl md:text-3xl font-bold text-gold mb-4">
                        {t('scan_to_view')}
                    </h3>
                    <p className="font-poppins text-gold/90 text-sm md:text-base mb-8">
                        {t('qr_subtitle')}
                    </p>

                    <div className="inline-block bg-white p-6 md:p-8 rounded-wedding-lg shadow-wedding-gold border-2 border-border-gold">
                        <QRCodeSVG
                            value={websiteUrl}
                            size={150}
                            level="H"
                            includeMargin={true}
                            fgColor="#7A1E2D"
                            bgColor="#FFF8ED"
                        />
                    </div>
                </div>

                {/* Floral Divider */}
                <div className="flex items-center justify-center my-10">
                    <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
                    <div className="mx-4">
                        <svg className="w-8 h-8 text-gold" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    </div>
                    <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
                </div>

                {/* Wedding Message */}
                <p className="font-poppins text-gold/90 text-sm md:text-base mb-3 leading-relaxed">
                    {t('footer_message')}
                </p>

                <p className="font-great-vibes text-gold text-3xl md:text-4xl font-normal mb-8">
                    {t('wedding_title')}
                </p>

                {/* Copyright */}
                <p className="font-poppins text-gold/70 text-xs md:text-sm">
                    {t('made_with_love')}
                </p>
            </div>
        </footer>
    );
};

export default Footer;
