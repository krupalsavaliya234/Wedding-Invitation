import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();
    const websiteUrl = window.location.origin;

    return (
        <footer className="py-12 px-6 bg-maroon text-center">
            <div className="max-w-4xl mx-auto">
                {/* QR Code Section */}
                <div className="mb-8">
                    <h3 className="font-playfair text-2xl md:text-3xl font-bold text-gold mb-4">
                        {t('scan_to_view')}
                    </h3>
                    <p className="font-poppins text-cream/80 text-sm md:text-base mb-6">
                        {t('qr_subtitle')}
                    </p>

                    <div className="inline-block bg-white p-4 md:p-6 rounded-lg shadow-xl">
                        <QRCodeSVG
                            value={websiteUrl}
                            size={150}
                            level="H"
                            includeMargin={true}
                            fgColor="#800000"
                            bgColor="#FFFDD0"
                        />
                    </div>
                </div>

                {/* Divider */}
                <div className="flex items-center justify-center my-8">
                    <div className="h-px w-16 md:w-24 bg-gold"></div>
                    <svg className="w-6 h-6 text-gold mx-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    <div className="h-px w-16 md:w-24 bg-gold"></div>
                </div>

                {/* Wedding Message */}
                <p className="font-poppins text-cream text-sm md:text-base mb-2">
                    {t('footer_message')}
                </p>

                <p className="font-playfair text-gold text-lg md:text-xl font-semibold mb-6">
                    {t('wedding_title')}
                </p>

                {/* Copyright */}
                <p className="font-poppins text-cream/60 text-xs md:text-sm">
                    {t('made_with_love')}
                </p>
            </div>
        </footer>
    );
};

export default Footer;
