import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const InvitationForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        // Couple Details
        brideName: '',
        groomName: '',
        coupleDisplayName: '',
        couplePhoto: '',

        // Wedding Details
        weddingDate: '',
        weddingTime: '',
        venueName: '',
        venueAddress: '',
        venueCity: '',
        venueState: '',
        googleMapsLink: '',

        // Events
        events: [
            { name: 'Engagement', date: '', time: '', description: '', image: '' },
            { name: 'Mehndi', date: '', time: '', description: '', image: '' },
            { name: 'Haldi', date: '', time: '', description: '', image: '' },
            { name: 'Wedding', date: '', time: '', description: '', image: '' },
            { name: 'Reception', date: '', time: '', description: '', image: '' },
        ],

        // Media
        coverImage: '',
        galleryImages: [],
        backgroundMusic: '',

        // Theme Settings
        theme: 'Royal Maroon & Gold',
        fontStyle: 'Playfair Display',
        primaryColor: '#7A1E2D',
        secondaryColor: '#D4AF37',

        // Status
        status: 'draft',
    });

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isEditMode) {
            fetchInvitation();
        }
    }, [id]);

    useEffect(() => {
        // Auto-generate couple display name
        if (formData.groomName && formData.brideName && !formData.coupleDisplayName) {
            setFormData(prev => ({
                ...prev,
                coupleDisplayName: `${prev.groomName} & ${prev.brideName}`
            }));
        }
    }, [formData.groomName, formData.brideName]);

    const fetchInvitation = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('adminToken');
            const response = await axios.get(`/api/admin/invitations/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            const data = response.data.data;
            // Format dates for input fields
            if (data.weddingDate) {
                data.weddingDate = new Date(data.weddingDate).toISOString().split('T')[0];
            }
            if (data.events) {
                data.events = data.events.map(event => ({
                    ...event,
                    date: event.date ? new Date(event.date).toISOString().split('T')[0] : ''
                }));
            }
            
            setFormData(data);
        } catch (error) {
            console.error('Error fetching invitation:', error);
            alert('Failed to load invitation');
            navigate('/admin/invitations');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleEventChange = (index, field, value) => {
        const updatedEvents = [...formData.events];
        updatedEvents[index] = { ...updatedEvents[index], [field]: value };
        setFormData(prev => ({ ...prev, events: updatedEvents }));
    };

    const addEvent = () => {
        setFormData(prev => ({
            ...prev,
            events: [...prev.events, { name: '', date: '', time: '', description: '', image: '' }]
        }));
    };

    const removeEvent = (index) => {
        setFormData(prev => ({
            ...prev,
            events: prev.events.filter((_, i) => i !== index)
        }));
    };

    const handleImageUpload = (field, files) => {
        // For now, we'll use URLs. In production, upload to cloud storage
        if (field === 'galleryImages') {
            const urls = Array.from(files).map(file => URL.createObjectURL(file));
            setFormData(prev => ({
                ...prev,
                galleryImages: [...prev.galleryImages, ...urls]
            }));
        } else {
            const url = URL.createObjectURL(files[0]);
            setFormData(prev => ({ ...prev, [field]: url }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.groomName.trim()) newErrors.groomName = 'Groom name is required';
        if (!formData.brideName.trim()) newErrors.brideName = 'Bride name is required';
        if (!formData.weddingDate) newErrors.weddingDate = 'Wedding date is required';
        if (!formData.weddingTime.trim()) newErrors.weddingTime = 'Wedding time is required';
        if (!formData.venueName.trim()) newErrors.venueName = 'Venue name is required';
        if (!formData.venueAddress.trim()) newErrors.venueAddress = 'Venue address is required';
        if (!formData.venueCity.trim()) newErrors.venueCity = 'City is required';
        if (!formData.venueState.trim()) newErrors.venueState = 'State is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            alert('Please fix the errors before submitting');
            return;
        }

        setSaving(true);
        try {
            const token = localStorage.getItem('adminToken');
            const url = isEditMode 
                ? `/api/admin/invitations/${id}`
                : '/api/admin/invitations';
            
            const method = isEditMode ? 'put' : 'post';
            
            // Convert date strings to Date objects
            const submitData = {
                ...formData,
                weddingDate: new Date(formData.weddingDate),
                events: formData.events.map(event => ({
                    ...event,
                    date: event.date ? new Date(event.date) : new Date()
                }))
            };

            await axios[method](url, submitData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert(`Invitation ${isEditMode ? 'updated' : 'created'} successfully!`);
            navigate('/admin/invitations');
        } catch (error) {
            console.error('Error saving invitation:', error);
            alert(error.response?.data?.message || 'Failed to save invitation');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="card-wedding bg-white border-2 border-border-gold p-8">
                    <div className="animate-spin w-12 h-12 border-4 border-gold border-t-transparent rounded-full mx-auto" />
                    <p className="text-text-primary mt-4 font-poppins">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-cinzel text-4xl font-bold text-gold mb-2">
                        {isEditMode ? 'Edit Invitation' : 'Create New Invitation'}
                    </h1>
                    <p className="text-text-secondary font-poppins">
                        {isEditMode ? 'Update invitation details' : 'Fill in the details to create a new invitation'}
                    </p>
                </div>
                <button
                    onClick={() => navigate('/admin/invitations')}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-wedding font-poppins font-semibold hover:bg-gray-300 transition-colors"
                >
                    Cancel
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Couple Details Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card-wedding bg-white border-2 border-border-gold p-8"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-gold to-saffron rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-maroon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </div>
                        <h2 className="font-playfair text-3xl font-bold text-maroon">Couple Details</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-text-primary font-poppins text-sm mb-2 font-medium">
                                Groom Name *
                            </label>
                            <input
                                type="text"
                                name="groomName"
                                value={formData.groomName}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-wedding border-2 font-poppins bg-ivory/50 ${
                                    errors.groomName ? 'border-red-500' : 'border-border-gold focus:border-gold'
                                } focus:outline-none focus:ring-2 focus:ring-gold/20`}
                                placeholder="Enter groom name"
                            />
                            {errors.groomName && (
                                <p className="mt-1 text-sm text-red-600 font-poppins">{errors.groomName}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-text-primary font-poppins text-sm mb-2 font-medium">
                                Bride Name *
                            </label>
                            <input
                                type="text"
                                name="brideName"
                                value={formData.brideName}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-wedding border-2 font-poppins bg-ivory/50 ${
                                    errors.brideName ? 'border-red-500' : 'border-border-gold focus:border-gold'
                                } focus:outline-none focus:ring-2 focus:ring-gold/20`}
                                placeholder="Enter bride name"
                            />
                            {errors.brideName && (
                                <p className="mt-1 text-sm text-red-600 font-poppins">{errors.brideName}</p>
                            )}
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-text-primary font-poppins text-sm mb-2 font-medium">
                                Couple Display Name
                            </label>
                            <input
                                type="text"
                                name="coupleDisplayName"
                                value={formData.coupleDisplayName}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-wedding border-2 border-border-gold font-poppins bg-ivory/50 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                                placeholder="Auto-generated from names"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-text-primary font-poppins text-sm mb-2 font-medium">
                                Couple Photo URL
                            </label>
                            <input
                                type="url"
                                name="couplePhoto"
                                value={formData.couplePhoto}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-wedding border-2 border-border-gold font-poppins bg-ivory/50 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                                placeholder="https://example.com/photo.jpg"
                            />
                            {formData.couplePhoto && (
                                <img src={formData.couplePhoto} alt="Couple" className="mt-4 w-48 h-48 object-cover rounded-wedding-lg border-2 border-border-gold" />
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Wedding Details Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="card-wedding bg-white border-2 border-border-gold p-8"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-gold to-saffron rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-maroon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h2 className="font-playfair text-3xl font-bold text-maroon">Wedding Details</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-text-primary font-poppins text-sm mb-2 font-medium">
                                Wedding Date *
                            </label>
                            <input
                                type="date"
                                name="weddingDate"
                                value={formData.weddingDate}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-wedding border-2 font-poppins bg-ivory/50 ${
                                    errors.weddingDate ? 'border-red-500' : 'border-border-gold focus:border-gold'
                                } focus:outline-none focus:ring-2 focus:ring-gold/20`}
                            />
                            {errors.weddingDate && (
                                <p className="mt-1 text-sm text-red-600 font-poppins">{errors.weddingDate}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-text-primary font-poppins text-sm mb-2 font-medium">
                                Wedding Time *
                            </label>
                            <input
                                type="time"
                                name="weddingTime"
                                value={formData.weddingTime}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-wedding border-2 font-poppins bg-ivory/50 ${
                                    errors.weddingTime ? 'border-red-500' : 'border-border-gold focus:border-gold'
                                } focus:outline-none focus:ring-2 focus:ring-gold/20`}
                            />
                            {errors.weddingTime && (
                                <p className="mt-1 text-sm text-red-600 font-poppins">{errors.weddingTime}</p>
                            )}
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-text-primary font-poppins text-sm mb-2 font-medium">
                                Venue Name *
                            </label>
                            <input
                                type="text"
                                name="venueName"
                                value={formData.venueName}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-wedding border-2 font-poppins bg-ivory/50 ${
                                    errors.venueName ? 'border-red-500' : 'border-border-gold focus:border-gold'
                                } focus:outline-none focus:ring-2 focus:ring-gold/20`}
                                placeholder="The Grand Palace"
                            />
                            {errors.venueName && (
                                <p className="mt-1 text-sm text-red-600 font-poppins">{errors.venueName}</p>
                            )}
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-text-primary font-poppins text-sm mb-2 font-medium">
                                Full Address *
                            </label>
                            <textarea
                                name="venueAddress"
                                value={formData.venueAddress}
                                onChange={handleChange}
                                rows="3"
                                className={`w-full px-4 py-3 rounded-wedding border-2 font-poppins bg-ivory/50 resize-none ${
                                    errors.venueAddress ? 'border-red-500' : 'border-border-gold focus:border-gold'
                                } focus:outline-none focus:ring-2 focus:ring-gold/20`}
                                placeholder="123 Royal Avenue, Mumbai, Maharashtra, India - 400001"
                            />
                            {errors.venueAddress && (
                                <p className="mt-1 text-sm text-red-600 font-poppins">{errors.venueAddress}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-text-primary font-poppins text-sm mb-2 font-medium">
                                City *
                            </label>
                            <input
                                type="text"
                                name="venueCity"
                                value={formData.venueCity}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-wedding border-2 font-poppins bg-ivory/50 ${
                                    errors.venueCity ? 'border-red-500' : 'border-border-gold focus:border-gold'
                                } focus:outline-none focus:ring-2 focus:ring-gold/20`}
                                placeholder="Mumbai"
                            />
                            {errors.venueCity && (
                                <p className="mt-1 text-sm text-red-600 font-poppins">{errors.venueCity}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-text-primary font-poppins text-sm mb-2 font-medium">
                                State *
                            </label>
                            <input
                                type="text"
                                name="venueState"
                                value={formData.venueState}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-wedding border-2 font-poppins bg-ivory/50 ${
                                    errors.venueState ? 'border-red-500' : 'border-border-gold focus:border-gold'
                                } focus:outline-none focus:ring-2 focus:ring-gold/20`}
                                placeholder="Maharashtra"
                            />
                            {errors.venueState && (
                                <p className="mt-1 text-sm text-red-600 font-poppins">{errors.venueState}</p>
                            )}
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-text-primary font-poppins text-sm mb-2 font-medium">
                                Google Maps Link
                            </label>
                            <input
                                type="url"
                                name="googleMapsLink"
                                value={formData.googleMapsLink}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-wedding border-2 border-border-gold font-poppins bg-ivory/50 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                                placeholder="https://maps.google.com/..."
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Events Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="card-wedding bg-white border-2 border-border-gold p-8"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-gold to-saffron rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-maroon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h2 className="font-playfair text-3xl font-bold text-maroon">Events</h2>
                        </div>
                        <button
                            type="button"
                            onClick={addEvent}
                            className="px-4 py-2 bg-gold text-maroon rounded-wedding font-poppins font-semibold hover:bg-saffron transition-colors"
                        >
                            + Add Event
                        </button>
                    </div>

                    <div className="space-y-6">
                        {formData.events.map((event, index) => (
                            <div key={index} className="p-6 bg-gradient-to-br from-ivory to-white rounded-wedding-lg border-2 border-border-gold/50">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-playfair text-xl font-bold text-maroon">Event {index + 1}</h3>
                                    {formData.events.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeEvent(index)}
                                            className="px-3 py-1 bg-red-100 text-red-700 rounded-wedding font-poppins text-sm font-semibold hover:bg-red-200 transition-colors"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-text-primary font-poppins text-sm mb-2 font-medium">Event Name</label>
                                        <input
                                            type="text"
                                            value={event.name}
                                            onChange={(e) => handleEventChange(index, 'name', e.target.value)}
                                            className="w-full px-4 py-2 rounded-wedding border-2 border-border-gold font-poppins bg-white focus:border-gold focus:outline-none"
                                            placeholder="e.g., Engagement"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-text-primary font-poppins text-sm mb-2 font-medium">Date</label>
                                        <input
                                            type="date"
                                            value={event.date}
                                            onChange={(e) => handleEventChange(index, 'date', e.target.value)}
                                            className="w-full px-4 py-2 rounded-wedding border-2 border-border-gold font-poppins bg-white focus:border-gold focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-text-primary font-poppins text-sm mb-2 font-medium">Time</label>
                                        <input
                                            type="time"
                                            value={event.time}
                                            onChange={(e) => handleEventChange(index, 'time', e.target.value)}
                                            className="w-full px-4 py-2 rounded-wedding border-2 border-border-gold font-poppins bg-white focus:border-gold focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-text-primary font-poppins text-sm mb-2 font-medium">Image URL</label>
                                        <input
                                            type="url"
                                            value={event.image}
                                            onChange={(e) => handleEventChange(index, 'image', e.target.value)}
                                            className="w-full px-4 py-2 rounded-wedding border-2 border-border-gold font-poppins bg-white focus:border-gold focus:outline-none"
                                            placeholder="https://example.com/image.jpg"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-text-primary font-poppins text-sm mb-2 font-medium">Description</label>
                                        <textarea
                                            value={event.description}
                                            onChange={(e) => handleEventChange(index, 'description', e.target.value)}
                                            rows="2"
                                            className="w-full px-4 py-2 rounded-wedding border-2 border-border-gold font-poppins bg-white resize-none focus:border-gold focus:outline-none"
                                            placeholder="Event description..."
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Media Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="card-wedding bg-white border-2 border-border-gold p-8"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-gold to-saffron rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-maroon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h2 className="font-playfair text-3xl font-bold text-maroon">Media</h2>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-text-primary font-poppins text-sm mb-2 font-medium">Cover Image URL</label>
                            <input
                                type="url"
                                name="coverImage"
                                value={formData.coverImage}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-wedding border-2 border-border-gold font-poppins bg-ivory/50 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                                placeholder="https://example.com/cover.jpg"
                            />
                            {formData.coverImage && (
                                <img src={formData.coverImage} alt="Cover" className="mt-4 w-full max-w-md h-64 object-cover rounded-wedding-lg border-2 border-border-gold" />
                            )}
                        </div>

                        <div>
                            <label className="block text-text-primary font-poppins text-sm mb-2 font-medium">Background Music URL (Optional)</label>
                            <input
                                type="url"
                                name="backgroundMusic"
                                value={formData.backgroundMusic}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-wedding border-2 border-border-gold font-poppins bg-ivory/50 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                                placeholder="https://example.com/music.mp3"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Theme Settings */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="card-wedding bg-white border-2 border-border-gold p-8"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-gold to-saffron rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-maroon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                            </svg>
                        </div>
                        <h2 className="font-playfair text-3xl font-bold text-maroon">Theme Settings</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-text-primary font-poppins text-sm mb-2 font-medium">Theme</label>
                            <select
                                name="theme"
                                value={formData.theme}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-wedding border-2 border-border-gold font-poppins bg-ivory/50 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                            >
                                <option value="Royal Maroon & Gold">Royal Maroon & Gold</option>
                                <option value="Floral Pastel">Floral Pastel</option>
                                <option value="South Indian Traditional">South Indian Traditional</option>
                                <option value="Modern Minimal">Modern Minimal</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-text-primary font-poppins text-sm mb-2 font-medium">Font Style</label>
                            <select
                                name="fontStyle"
                                value={formData.fontStyle}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-wedding border-2 border-border-gold font-poppins bg-ivory/50 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                            >
                                <option value="Playfair Display">Playfair Display</option>
                                <option value="Cinzel">Cinzel</option>
                                <option value="Great Vibes">Great Vibes</option>
                                <option value="Poppins">Poppins</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-text-primary font-poppins text-sm mb-2 font-medium">Primary Color</label>
                            <input
                                type="color"
                                name="primaryColor"
                                value={formData.primaryColor}
                                onChange={handleChange}
                                className="w-full h-12 rounded-wedding border-2 border-border-gold cursor-pointer"
                            />
                        </div>

                        <div>
                            <label className="block text-text-primary font-poppins text-sm mb-2 font-medium">Secondary Color</label>
                            <input
                                type="color"
                                name="secondaryColor"
                                value={formData.secondaryColor}
                                onChange={handleChange}
                                className="w-full h-12 rounded-wedding border-2 border-border-gold cursor-pointer"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Status */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="card-wedding bg-white border-2 border-border-gold p-8"
                >
                    <div>
                        <label className="block text-text-primary font-poppins text-sm mb-2 font-medium">Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-wedding border-2 border-border-gold font-poppins bg-ivory/50 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                        >
                            <option value="draft">Draft</option>
                            <option value="active">Active (Published)</option>
                        </select>
                    </div>
                </motion.div>

                {/* Submit Buttons */}
                <div className="flex gap-4">
                    <button
                        type="submit"
                        disabled={saving}
                        className="btn-wedding-primary font-poppins font-semibold px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {saving ? 'Saving...' : isEditMode ? 'Update Invitation' : 'Create Invitation'}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/admin/invitations')}
                        className="px-8 py-4 bg-gray-200 text-gray-700 rounded-wedding-xl font-poppins font-semibold hover:bg-gray-300 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default InvitationForm;
