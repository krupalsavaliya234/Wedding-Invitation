import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import RsvpForm from './RsvpForm';
import PhotoGallery from './PhotoGallery';
import VenueSection from './VenueSection';
import Footer from './Footer';

const MainInvitation = ({ invitation }) => {
    const { t } = useTranslation();
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    // Countdown timer
    useEffect(() => {
        const weddingDate = invitation?.weddingDate 
            ? new Date(invitation.weddingDate).getTime()
            : new Date('2026-02-14T18:00:00').getTime();

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = weddingDate - now;

            if (distance < 0) {
                clearInterval(timer);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000)
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Use invitation events if provided, otherwise use defaults
    const events = invitation?.events && invitation.events.length > 0
        ? invitation.events.map((event, index) => ({
            icon: ['⭕', '⭐', '♪', '♥', '🎁'][index] || '📅',
            title: event.name || t('wedding_ceremony'),
            date: event.date ? new Date(event.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }) : '',
            time: event.time || '',
            description: event.description || '',
            highlighted: index === invitation.events.length - 1
        }))
        : [
            {
                icon: '⭕',
                title: t('haldi_ceremony'),
                date: 'Wednesday, February 11, 2026',
                time: '3:00 PM',
                description: 'Traditional turmeric ceremony',
                highlighted: false
            },
            {
                icon: '⭐',
                title: t('mehendi_ceremony'),
                date: 'Thursday, February 12, 2026',
                time: '4:00 PM',
                description: 'Henna ceremony with music and dance',
                highlighted: false
            },
            {
                icon: '♪',
                title: t('sangeet_night'),
                date: 'Friday, February 13, 2026',
                time: '7:00 PM',
                description: 'An evening of music, dance, and celebration',
                highlighted: false
            },
            {
                icon: '♥',
                title: t('wedding_ceremony'),
                date: 'Saturday, February 14, 2026',
                time: '6:00 PM',
                description: 'Traditional Hindu wedding ceremony followed by dinner',
                highlighted: true
            },
            {
                icon: '🎁',
                title: t('reception'),
                date: 'Sunday, February 15, 2026',
                time: '7:00 PM',
                description: 'Grand reception with dinner and entertainment',
                highlighted: false
            }
        ];

    return (
        <div className="min-h-screen bg-ivory">
            {/* Countdown Timer Section */}
            <section className="py-16 md:py-20 px-6 relative">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center mb-6">
                            <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-border-gold to-transparent" />
                            <span className="mx-4 text-gold text-3xl md:text-4xl">❖</span>
                            <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-border-gold to-transparent" />
                        </div>
                        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gold text-center mb-4">
                            {t('countdown_title')}
                        </h2>
                    </div>

                    {/* Countdown Cards - Premium Design */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
                        {/* Days - Maroon */}
                        <div className="card-wedding bg-gradient-to-br from-maroon to-maroon/90 text-center border-2 border-border-gold">
                            <div className="font-playfair text-5xl md:text-6xl font-bold text-gold mb-3">
                                {timeLeft.days}
                            </div>
                            <div className="font-poppins text-sm md:text-base text-gold/90 uppercase tracking-wider font-semibold">
                                {t('days')}
                            </div>
                        </div>

                        {/* Hours - Gold */}
                        <div className="card-wedding bg-gradient-to-br from-gold to-gold/80 text-center border-2 border-border-gold">
                            <div className="font-playfair text-5xl md:text-6xl font-bold text-maroon mb-3">
                                {timeLeft.hours}
                            </div>
                            <div className="font-poppins text-sm md:text-base text-maroon uppercase tracking-wider font-semibold">
                                {t('hours')}
                            </div>
                        </div>

                        {/* Minutes - Maroon */}
                        <div className="card-wedding bg-gradient-to-br from-maroon to-maroon/90 text-center border-2 border-border-gold">
                            <div className="font-playfair text-5xl md:text-6xl font-bold text-gold mb-3">
                                {timeLeft.minutes}
                            </div>
                            <div className="font-poppins text-sm md:text-base text-gold/90 uppercase tracking-wider font-semibold">
                                {t('minutes')}
                            </div>
                        </div>

                        {/* Seconds - Gold */}
                        <div className="card-wedding bg-gradient-to-br from-gold to-gold/80 text-center border-2 border-border-gold">
                            <div className="font-playfair text-5xl md:text-6xl font-bold text-maroon mb-3">
                                {timeLeft.seconds}
                            </div>
                            <div className="font-poppins text-sm md:text-base text-maroon uppercase tracking-wider font-semibold">
                                {t('seconds')}
                            </div>
                        </div>
                    </div>

                    {/* Wedding Celebration Card */}
                    <div className="max-w-3xl mx-auto card-wedding border-2 border-border-gold">
                        <h3 className="font-playfair text-3xl md:text-4xl font-bold text-gold text-center mb-8">
                            {t('wedding_celebration')}
                        </h3>

                        <div className="bg-gradient-to-br from-ivory to-white rounded-wedding-lg p-8 text-center border border-border-gold/50">
                            {/* Calendar Icon */}
                            <div className="flex justify-center mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-gold to-saffron rounded-full flex items-center justify-center shadow-wedding-gold">
                                    <svg className="w-10 h-10 text-maroon" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
                                    </svg>
                                </div>
                            </div>

                            <p className="font-playfair text-2xl md:text-3xl font-semibold text-maroon mb-3">
                                {invitation?.weddingDate 
                                    ? new Date(invitation.weddingDate).toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })
                                    : 'Saturday, February 14, 2026'
                                }
                            </p>
                            <p className="font-poppins text-lg text-text-secondary font-medium">
                                at {invitation?.weddingTime || '6:00 PM'} onwards
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Wedding Events Section */}
            <section className="py-16 md:py-20 px-6 bg-gradient-to-b from-ivory to-white/50 relative">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center mb-6">
                            <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-border-gold to-transparent" />
                            <span className="mx-4 text-gold text-3xl md:text-4xl">❖</span>
                            <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-border-gold to-transparent" />
                        </div>
                        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gold text-center mb-4">
                            {t('wedding_events')}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {events.map((event, index) => (
                            <div
                                key={index}
                                className={`card-wedding text-center transition-all duration-300 hover:scale-105 ${event.highlighted ? 'border-2 border-gold shadow-wedding-gold ring-2 ring-gold/20' : 'border-2 border-border-gold'
                                    }`}
                            >
                                {/* Icon */}
                                <div className="flex justify-center mb-6">
                                    <div className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold shadow-wedding-gold ${event.highlighted
                                            ? 'bg-gradient-to-br from-gold to-saffron text-maroon'
                                            : event.iconBg === 'bg-gold'
                                                ? 'bg-gradient-to-br from-gold to-gold/80 text-maroon'
                                                : 'bg-gradient-to-br from-maroon to-maroon/80 text-gold'
                                        }`}>
                                        {event.icon}
                                    </div>
                                </div>

                                {/* Event Title */}
                                <h3 className="font-playfair text-xl md:text-2xl font-bold text-maroon mb-4">
                                    {event.title}
                                </h3>

                                {/* Date */}
                                <p className="font-poppins text-sm text-text-secondary font-semibold mb-2">
                                    {event.date}
                                </p>

                                {/* Time */}
                                <p className="font-poppins text-base text-maroon font-medium mb-4">
                                    {event.time}
                                </p>

                                {/* Description */}
                                <p className="font-poppins text-sm text-text-primary/80 leading-relaxed">
                                    {event.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Photo Gallery */}
            <PhotoGallery />

            {/* Venue Section */}
            <VenueSection />

            {/* RSVP Form */}
            <RsvpForm />

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default MainInvitation;
