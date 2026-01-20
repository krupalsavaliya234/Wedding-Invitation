import React, { useState } from 'react';

const FloatingActionButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { id: 'events', label: 'Events', icon: '📅', href: '#events' },
        { id: 'gallery', label: 'Gallery', icon: '📸', href: '#gallery' },
        { id: 'venue', label: 'Venue', icon: '📍', href: '#venue' },
        { id: 'rsvp', label: 'RSVP', icon: '✉️', href: '#rsvp' },
    ];

    const handleMenuClick = (href) => {
        setIsOpen(false);
        // Smooth scroll to section
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden animate-fade-in"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            {/* Menu Items */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 z-50 flex flex-col gap-3 md:hidden">
                    {menuItems.map((item, index) => (
                        <button
                            key={item.id}
                            onClick={() => handleMenuClick(item.href)}
                            className="flex items-center gap-3 bg-white text-maroon px-5 py-3 rounded-wedding-xl shadow-wedding-gold border-2 border-border-gold hover:bg-gold hover:text-maroon transition-all duration-300 transform hover:scale-105 animate-slide-up"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <span className="text-2xl">{item.icon}</span>
                            <span className="font-poppins font-semibold">{item.label}</span>
                        </button>
                    ))}
                </div>
            )}

            {/* FAB Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-wedding-gold border-2 border-border-gold flex items-center justify-center transition-all duration-300 transform md:hidden ${isOpen
                        ? 'bg-gradient-to-br from-maroon to-maroon/90 rotate-45 scale-110 text-gold'
                        : 'bg-gradient-to-br from-maroon to-gold hover:scale-110 text-gold'
                    }`}
                aria-label="Menu"
            >
                {isOpen ? (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                )}
            </button>
        </>
    );
};

export default FloatingActionButton;
