import React, { useState } from 'react';
import axios from 'axios';
import confetti from 'canvas-confetti';

const RsvpForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        numberOfGuests: '1',
        attendance: 'yes',
        message: ''
    });

    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showThankYou, setShowThankYou] = useState(false);
    const [errors, setErrors] = useState({});

    // Floating label states
    const [focused, setFocused] = useState({
        name: false,
        email: false,
        phone: false,
        message: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleFocus = (field) => {
        setFocused(prev => ({ ...prev, [field]: true }));
    };

    const handleBlur = (field) => {
        if (!formData[field]) {
            setFocused(prev => ({ ...prev, [field]: false }));
        }
    };

    // Client-side validation
    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Confetti animation
    const triggerConfetti = () => {
        const duration = 3000;
        const end = Date.now() + duration;

        const colors = ['#800000', '#D4AF37', '#FFFDD0'];

        (function frame() {
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
            });
            confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form
        if (!validateForm()) {
            setStatus({
                type: 'error',
                message: 'Please fix the errors before submitting'
            });
            return;
        }

        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await axios.post('/api/rsvp', formData);

            // Trigger confetti
            triggerConfetti();

            // Show thank you popup
            setShowThankYou(true);

            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                numberOfGuests: '1',
                attendance: 'yes',
                message: ''
            });
            setFocused({
                name: false,
                email: false,
                phone: false,
                message: false
            });

            // Hide thank you popup after 5 seconds
            setTimeout(() => {
                setShowThankYou(false);
            }, 5000);

        } catch (error) {
            setStatus({
                type: 'error',
                message: error.response?.data?.message || 'Failed to submit RSVP. Please try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <section className="py-16 md:py-20 px-6 bg-gradient-to-b from-white to-ivory/50">
                <div className="max-w-3xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center mb-6">
                            <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-border-gold to-transparent" />
                            <span className="mx-4 text-gold text-3xl md:text-4xl">❖</span>
                            <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-border-gold to-transparent" />
                        </div>
                        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gold mb-4">
                            RSVP
                        </h2>
                        <p className="font-poppins text-text-secondary text-base md:text-lg">
                            Please confirm your attendance
                        </p>
                    </div>

                    <div className="card-wedding bg-white/95 backdrop-blur-sm border-2 border-border-gold">
                        <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name - Floating Label */}
                    <div className="relative">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onFocus={() => handleFocus('name')}
                            onBlur={() => handleBlur('name')}
                            className={`w-full px-4 py-4 border-2 rounded-wedding focus:outline-none transition-all font-poppins text-base bg-ivory/50 ${errors.name
                                    ? 'border-red-500 focus:border-red-500'
                                    : 'border-border-gold focus:border-gold focus:ring-2 focus:ring-gold/20'
                                }`}
                            placeholder=" "
                        />
                        <label
                            htmlFor="name"
                            className={`absolute left-4 transition-all duration-200 pointer-events-none font-poppins ${focused.name || formData.name
                                    ? '-top-2.5 text-xs bg-white px-2 text-maroon font-medium'
                                    : 'top-4 text-base text-gray-500'
                                }`}
                        >
                            Full Name *
                        </label>
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600 font-poppins">{errors.name}</p>
                        )}
                    </div>

                    {/* Email - Floating Label */}
                    <div className="relative">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onFocus={() => handleFocus('email')}
                            onBlur={() => handleBlur('email')}
                            className={`w-full px-4 py-4 border-2 rounded-wedding focus:outline-none transition-all font-poppins text-base bg-ivory/50 ${errors.email
                                    ? 'border-red-500 focus:border-red-500'
                                    : 'border-border-gold focus:border-gold focus:ring-2 focus:ring-gold/20'
                                }`}
                            placeholder=" "
                        />
                        <label
                            htmlFor="email"
                            className={`absolute left-4 transition-all duration-200 pointer-events-none font-poppins ${focused.email || formData.email
                                    ? '-top-2.5 text-xs bg-white px-2 text-maroon font-medium'
                                    : 'top-4 text-base text-gray-500'
                                }`}
                        >
                            Email Address *
                        </label>
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600 font-poppins">{errors.email}</p>
                        )}
                    </div>

                    {/* Phone - Floating Label with Numeric Keypad */}
                    <div className="relative">
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            inputMode="numeric"
                            value={formData.phone}
                            onChange={handleChange}
                            onFocus={() => handleFocus('phone')}
                            onBlur={() => handleBlur('phone')}
                            className={`w-full px-4 py-4 border-2 rounded-wedding focus:outline-none transition-all font-poppins text-base bg-ivory/50 ${errors.phone
                                    ? 'border-red-500 focus:border-red-500'
                                    : 'border-border-gold focus:border-gold focus:ring-2 focus:ring-gold/20'
                                }`}
                            placeholder=" "
                        />
                        <label
                            htmlFor="phone"
                            className={`absolute left-4 transition-all duration-200 pointer-events-none font-poppins ${focused.phone || formData.phone
                                    ? '-top-2.5 text-xs bg-white px-2 text-maroon font-medium'
                                    : 'top-4 text-base text-gray-500'
                                }`}
                        >
                            Phone Number *
                        </label>
                        {errors.phone && (
                            <p className="mt-1 text-sm text-red-600 font-poppins">{errors.phone}</p>
                        )}
                    </div>

                    {/* Attendance */}
                    <div>
                        <label htmlFor="attendance" className="block font-poppins font-medium text-maroon mb-2">
                            Will you be attending? *
                        </label>
                        <select
                            id="attendance"
                            name="attendance"
                            value={formData.attendance}
                            onChange={handleChange}
                            className="w-full px-4 py-4 border-2 border-border-gold rounded-wedding focus:border-gold focus:outline-none transition-colors font-poppins bg-ivory/50 text-base focus:ring-2 focus:ring-gold/20"
                        >
                            <option value="yes">Joyfully Accept</option>
                            <option value="no">Regretfully Decline</option>
                        </select>
                    </div>

                    {/* Number of Guests */}
                    {formData.attendance === 'yes' && (
                        <div>
                            <label htmlFor="numberOfGuests" className="block font-poppins font-medium text-maroon mb-2">
                                Number of Guests *
                            </label>
                            <input
                                type="number"
                                id="numberOfGuests"
                                name="numberOfGuests"
                                inputMode="numeric"
                                value={formData.numberOfGuests}
                                onChange={handleChange}
                                min="1"
                                max="10"
                                className="w-full px-4 py-4 border-2 border-border-gold rounded-wedding focus:border-gold focus:outline-none transition-colors font-poppins bg-ivory/50 text-base focus:ring-2 focus:ring-gold/20"
                            />
                        </div>
                    )}

                    {/* Message - Floating Label */}
                    <div className="relative">
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            onFocus={() => handleFocus('message')}
                            onBlur={() => handleBlur('message')}
                            rows="4"
                            className="w-full px-4 py-4 border-2 border-border-gold rounded-wedding focus:border-gold focus:outline-none transition-colors font-poppins resize-none text-base bg-ivory/50 focus:ring-2 focus:ring-gold/20"
                            placeholder=" "
                        ></textarea>
                        <label
                            htmlFor="message"
                            className={`absolute left-4 transition-all duration-200 pointer-events-none font-poppins ${focused.message || formData.message
                                    ? '-top-2.5 text-xs bg-white px-2 text-maroon font-medium'
                                    : 'top-4 text-base text-gray-500'
                                }`}
                        >
                            Special Message (Optional)
                        </label>
                    </div>

                    {/* Status Message */}
                    {status.message && (
                        <div className={`p-4 rounded-lg ${status.type === 'success'
                                ? 'bg-green-100 text-green-800 border-2 border-green-300'
                                : 'bg-red-100 text-red-800 border-2 border-red-300'
                            }`}>
                            <p className="font-poppins">{status.message}</p>
                        </div>
                    )}

                    {/* Submit Button - Premium Design */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-wedding-primary w-full font-playfair text-xl font-semibold py-5 px-6 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Submitting...
                            </span>
                        ) : (
                            'Submit RSVP'
                        )}
                        </button>
                </form>
                    </div>
                </div>
            </section>

            {/* Thank You Popup with Confetti */}
            {showThankYou && (
                <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in backdrop-blur-sm">
                    <div className="card-wedding bg-white border-2 border-border-gold p-8 md:p-12 max-w-md w-full text-center shadow-wedding-gold transform animate-slide-up">
                        <div className="mb-6">
                            <div className="w-24 h-24 bg-gradient-to-br from-gold to-saffron rounded-full flex items-center justify-center mx-auto mb-6 shadow-wedding-gold">
                                <svg className="w-12 h-12 text-maroon" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                </svg>
                            </div>
                            <h3 className="font-playfair text-3xl md:text-4xl font-bold text-gold mb-4">
                                Thank You!
                            </h3>
                            <p className="font-poppins text-lg text-text-primary mb-3">
                                Your RSVP has been received successfully.
                            </p>
                            <p className="font-poppins text-base text-text-secondary">
                                We can't wait to celebrate with you! 🎉
                            </p>
                        </div>

                        <button
                            onClick={() => setShowThankYou(false)}
                            className="btn-wedding-primary font-poppins font-semibold py-3 px-8"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default RsvpForm;
