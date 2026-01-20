import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const InvitationsList = () => {
    const [invitations, setInvitations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchInvitations();
    }, []);

    const fetchInvitations = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await axios.get('/api/admin/invitations', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setInvitations(response.data.data);
        } catch (error) {
            console.error('Error fetching invitations:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('adminToken');
            await axios.delete(`/api/admin/invitations/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchInvitations();
            setDeleteConfirm(null);
        } catch (error) {
            console.error('Error deleting invitation:', error);
            alert('Failed to delete invitation');
        }
    };

    const handleDuplicate = async (id) => {
        try {
            const token = localStorage.getItem('adminToken');
            await axios.post(`/api/admin/invitations/${id}/duplicate`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchInvitations();
        } catch (error) {
            console.error('Error duplicating invitation:', error);
            alert('Failed to duplicate invitation');
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="card-wedding bg-white border-2 border-border-gold p-8">
                    <div className="animate-spin w-12 h-12 border-4 border-gold border-t-transparent rounded-full mx-auto" />
                    <p className="text-text-primary mt-4 font-poppins">Loading invitations...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-cinzel text-4xl font-bold text-gold mb-2">
                        Wedding Invitations
                    </h1>
                    <p className="text-text-secondary font-poppins">
                        Manage all your wedding invitations
                    </p>
                </div>
                <button
                    onClick={() => navigate('/admin/invitations/new')}
                    className="btn-wedding-primary font-poppins font-semibold px-6 py-3"
                >
                    + New Invitation
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card-wedding bg-white border-2 border-border-gold p-6">
                    <p className="text-text-secondary font-poppins text-sm mb-2">Total Invitations</p>
                    <p className="text-4xl font-cinzel font-bold text-gold">{invitations.length}</p>
                </div>
                <div className="card-wedding bg-white border-2 border-border-gold p-6">
                    <p className="text-text-secondary font-poppins text-sm mb-2">Active</p>
                    <p className="text-4xl font-cinzel font-bold text-gold">
                        {invitations.filter(i => i.status === 'active').length}
                    </p>
                </div>
                <div className="card-wedding bg-white border-2 border-border-gold p-6">
                    <p className="text-text-secondary font-poppins text-sm mb-2">Drafts</p>
                    <p className="text-4xl font-cinzel font-bold text-gold">
                        {invitations.filter(i => i.status === 'draft').length}
                    </p>
                </div>
            </div>

            {/* Invitations List */}
            {invitations.length === 0 ? (
                <div className="card-wedding bg-white border-2 border-border-gold p-12 text-center">
                    <svg className="w-16 h-16 text-gold mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="font-playfair text-2xl font-bold text-maroon mb-2">No Invitations Yet</h3>
                    <p className="text-text-secondary font-poppins mb-6">Create your first wedding invitation</p>
                    <button
                        onClick={() => navigate('/admin/invitations/new')}
                        className="btn-wedding-primary font-poppins font-semibold px-8 py-3"
                    >
                        Create Invitation
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {invitations.map((invitation, index) => (
                        <motion.div
                            key={invitation._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="card-wedding bg-white border-2 border-border-gold hover:shadow-wedding-gold transition-all duration-300"
                        >
                            {/* Cover Image */}
                            {invitation.coverImage && (
                                <div className="h-48 overflow-hidden rounded-t-wedding-lg mb-4">
                                    <img
                                        src={invitation.coverImage}
                                        alt={invitation.coupleDisplayName}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <h3 className="font-playfair text-2xl font-bold text-maroon mb-2">
                                            {invitation.coupleDisplayName}
                                        </h3>
                                        <p className="text-text-secondary font-poppins text-sm mb-1">
                                            📅 {formatDate(invitation.weddingDate)}
                                        </p>
                                        <p className="text-text-secondary font-poppins text-sm">
                                            📍 {invitation.venueCity}, {invitation.venueState}
                                        </p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-wedding text-xs font-poppins font-semibold ${
                                        invitation.status === 'active'
                                            ? 'bg-green-100 text-green-700 border-2 border-green-300'
                                            : 'bg-gray-100 text-gray-700 border-2 border-gray-300'
                                    }`}>
                                        {invitation.status === 'active' ? 'Active' : 'Draft'}
                                    </span>
                                </div>

                                {/* Actions */}
                                <div className="grid grid-cols-2 gap-2 mt-6">
                                    <button
                                        onClick={() => window.open(`/invite/${invitation.slug}`, '_blank')}
                                        className="px-4 py-2 bg-gold/20 text-maroon rounded-wedding font-poppins text-sm font-semibold hover:bg-gold/30 transition-colors"
                                    >
                                        View
                                    </button>
                                    <button
                                        onClick={() => navigate(`/admin/invitations/edit/${invitation._id}`)}
                                        className="px-4 py-2 bg-maroon/20 text-maroon rounded-wedding font-poppins text-sm font-semibold hover:bg-maroon/30 transition-colors"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDuplicate(invitation._id)}
                                        className="px-4 py-2 bg-saffron/20 text-maroon rounded-wedding font-poppins text-sm font-semibold hover:bg-saffron/30 transition-colors"
                                    >
                                        Duplicate
                                    </button>
                                    <button
                                        onClick={() => setDeleteConfirm(invitation._id)}
                                        className="px-4 py-2 bg-red-100 text-red-700 rounded-wedding font-poppins text-sm font-semibold hover:bg-red-200 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="card-wedding bg-white border-2 border-border-gold p-8 max-w-md w-full"
                    >
                        <h3 className="font-playfair text-2xl font-bold text-maroon mb-4">
                            Confirm Delete
                        </h3>
                        <p className="text-text-primary font-poppins mb-6">
                            Are you sure you want to delete this invitation? This action cannot be undone.
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setDeleteConfirm(null)}
                                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-wedding font-poppins font-semibold hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(deleteConfirm)}
                                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-wedding font-poppins font-semibold hover:bg-red-700 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default InvitationsList;
