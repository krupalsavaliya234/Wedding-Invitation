import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const PhotoGallery = () => {
    const { t } = useTranslation();
    const [selectedImage, setSelectedImage] = useState(null);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    // Placeholder images - replace with actual wedding photos
    const photos = [
        { id: 1, url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800', alt: 'Wedding ceremony' },
        { id: 2, url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800', alt: 'Bride and groom' },
        { id: 3, url: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800', alt: 'Wedding rings' },
        { id: 4, url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800', alt: 'Wedding venue' },
        { id: 5, url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800', alt: 'Wedding flowers' },
        { id: 6, url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800', alt: 'Wedding decoration' },
        { id: 7, url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800', alt: 'Wedding celebration' },
        { id: 8, url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800', alt: 'Wedding couple' },
    ];

    // Swipe detection for mobile
    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientY);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientY);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isDownSwipe = distance < -minSwipeDistance;

        if (isDownSwipe) {
            setSelectedImage(null);
        }
    };

    // Close lightbox on Escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setSelectedImage(null);
            }
        };

        if (selectedImage) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [selectedImage]);

    return (
        <section id="gallery" className="py-16 md:py-20 px-6 bg-gradient-to-b from-white to-ivory/50">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center mb-6">
                        <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-border-gold to-transparent"></div>
                        <span className="mx-4 text-gold text-3xl md:text-4xl">❖</span>
                        <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-border-gold to-transparent"></div>
                    </div>

                    <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gold mb-4">
                        {t('our_memories')}
                    </h2>
                    <p className="font-poppins text-base md:text-lg text-text-secondary">
                        {t('gallery_subtitle')}
                    </p>
                </div>

                {/* Masonry Grid - Premium Design */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {photos.map((photo) => (
                        <div
                            key={photo.id}
                            className="relative overflow-hidden rounded-wedding-lg cursor-pointer group shadow-wedding-gold hover:shadow-wedding-maroon transition-all duration-300 border-2 border-border-gold/30 hover:border-gold"
                            onClick={() => setSelectedImage(photo)}
                        >
                            <img
                                src={photo.url}
                                alt={photo.alt}
                                loading="lazy"
                                className="w-full h-48 md:h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-maroon/70 via-maroon/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                                <div className="bg-gold/90 rounded-full p-2">
                                    <svg className="w-6 h-6 text-maroon" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Lightbox with Swipe-to-Close - Premium Design */}
                {selectedImage && (
                    <div
                        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-in backdrop-blur-sm"
                        onClick={() => setSelectedImage(null)}
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                    >
                        {/* Close Button */}
                        <button
                            className="absolute top-4 right-4 md:top-8 md:right-8 text-gold hover:text-saffron transition-colors z-10 bg-maroon/80 rounded-full p-2 hover:bg-maroon"
                            onClick={() => setSelectedImage(null)}
                            aria-label="Close"
                        >
                            <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Swipe Indicator (Mobile) */}
                        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 md:hidden">
                            <div className="flex flex-col items-center text-gold/80">
                                <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                                <span className="text-xs mt-1 font-poppins">Swipe down to close</span>
                            </div>
                        </div>

                        {/* Image */}
                        <img
                            src={selectedImage.url}
                            alt={selectedImage.alt}
                            className="max-w-full max-h-[90vh] object-contain rounded-wedding-lg border-2 border-border-gold shadow-wedding-gold"
                            onClick={(e) => e.stopPropagation()}
                        />

                        {/* Image Caption */}
                        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                            <p className="font-poppins text-gold text-sm md:text-base bg-maroon/90 px-6 py-3 rounded-wedding-xl border border-border-gold">
                                {selectedImage.alt}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default PhotoGallery;
