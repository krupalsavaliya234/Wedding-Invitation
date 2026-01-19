import React from 'react';
import { useTranslation } from 'react-i18next';

const VenueSection = () => {
    const { t } = useTranslation();
    // Venue details - replace with actual venue information
    const venue = {
        name: 'The Grand Palace',
        address: '123 Royal Avenue, Mumbai, Maharashtra, India - 400001',
        phone: '+91 22 1234 5678',
        // Replace with actual Google Maps embed URL
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709657!3d19.082177513865436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin',
        directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=The+Grand+Palace+Mumbai'
    };

    return (
        <section id="venue" className="py-16 px-6 bg-white">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center mb-6">
                        <div className="h-px w-16 md:w-24 bg-gold"></div>
                        <span className="mx-3 md:mx-4 text-gold text-2xl md:text-3xl">❖</span>
                        <div className="h-px w-16 md:w-24 bg-gold"></div>
                    </div>

                    <h2 className="font-playfair text-3xl md:text-5xl font-bold text-maroon mb-4">
                        Venue
                    </h2>
                    <p className="font-poppins text-base md:text-lg text-gray-700">
                        Join us at this beautiful location
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-start">
                    {/* Venue Details */}
                    <div className="bg-gradient-to-br from-cream to-white p-6 md:p-8 rounded-lg shadow-lg border-2 border-gold/30">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="flex-shrink-0 w-12 h-12 bg-maroon rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-gold" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-playfair text-2xl md:text-3xl font-bold text-maroon mb-2">
                                    {venue.name}
                                </h3>
                                <p className="font-poppins text-gray-700 text-sm md:text-base leading-relaxed">
                                    {venue.address}
                                </p>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="flex items-center gap-3 mb-6 p-4 bg-white rounded-lg">
                            <svg className="w-5 h-5 text-gold flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                            </svg>
                            <a href={`tel:${venue.phone}`} className="font-poppins text-maroon hover:text-gold transition-colors">
                                {venue.phone}
                            </a>
                        </div>

                        {/* Large Get Directions Button - Thumb Friendly */}
                        <a
                            href={venue.directionsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full bg-gradient-to-r from-maroon to-maroon/90 hover:from-gold hover:to-gold/90 text-cream font-playfair text-lg md:text-xl font-semibold py-5 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-center transform hover:scale-105"
                        >
                            <div className="flex items-center justify-center gap-3">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                </svg>
                                <span>{t('get_directions')}</span>
                            </div>
                        </a>

                        {/* Additional Info */}
                        <div className="mt-6 p-4 bg-gold/10 rounded-lg">
                            <p className="font-poppins text-sm text-gray-700 text-center">
                                <span className="font-semibold text-maroon">{t('parking_available')}</span> • {t('free_valet')}
                            </p>
                        </div>
                    </div>

                    {/* Google Maps - w-full and h-64 */}
                    <div className="rounded-lg overflow-hidden shadow-lg border-4 border-gold/30">
                        <iframe
                            src={venue.mapUrl}
                            className="w-full h-64 md:h-96"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Venue Location"
                        ></iframe>
                    </div>
                </div>

                {/* Directions Note for Mobile */}
                <div className="mt-8 text-center md:hidden">
                    <p className="font-poppins text-sm text-gray-600 bg-cream px-4 py-3 rounded-lg inline-block">
                        💡 Tap the map to open in Google Maps app
                    </p>
                </div>
            </div>
        </section>
    );
};

export default VenueSection;
