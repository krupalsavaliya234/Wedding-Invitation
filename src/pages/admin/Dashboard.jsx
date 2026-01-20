import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import StatsCard from '../../components/admin/StatsCard';

const Dashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalRsvps: 0,
        attending: 0,
        declined: 0,
        totalGuests: 0,
        totalInvitations: 0,
        activeInvitations: 0,
    });
    const [recentActivity, setRecentActivity] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
        fetchRecentActivity();
    }, []);

    const fetchStats = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            
            // Fetch RSVP stats
            const rsvpResponse = await fetch('/api/admin/stats', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const rsvpData = await rsvpResponse.json();
            
            // Fetch invitation stats
            const invResponse = await fetch('/api/admin/invitations', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const invData = await invResponse.json();
            
            setStats({
                ...rsvpData.stats,
                totalInvitations: invData.count || 0,
                activeInvitations: invData.data?.filter(i => i.status === 'active').length || 0,
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
            setStats({
                totalRsvps: 0,
                attending: 0,
                declined: 0,
                totalGuests: 0,
                totalInvitations: 0,
                activeInvitations: 0,
            });
        } finally {
            setLoading(false);
        }
    };

    const fetchRecentActivity = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch('/api/admin/rsvps?limit=5', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await response.json();
            setRecentActivity(data.data || []);
        } catch (error) {
            console.error('Error fetching recent activity:', error);
            setRecentActivity([]);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="card-wedding bg-white border-2 border-border-gold p-8">
                    <div className="animate-spin w-12 h-12 border-4 border-gold border-t-transparent rounded-full mx-auto" />
                    <p className="text-text-primary mt-4 font-poppins">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="font-cinzel text-4xl font-bold text-gold mb-2">
                    Dashboard Overview
                </h1>
                <p className="text-text-secondary font-poppins">
                    Welcome to your wedding invitation control panel
                </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                <StatsCard
                    title="Total Invitations"
                    value={stats.totalInvitations}
                    color="gold"
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    }
                />

                <StatsCard
                    title="Active Invitations"
                    value={stats.activeInvitations}
                    color="gold"
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    }
                />

                <StatsCard
                    title="Total RSVPs"
                    value={stats.totalRsvps}
                    color="saffron"
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    }
                />
            </motion.div>

            {/* Quick Actions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/admin/invitations')}
                    className="card-wedding bg-white border-2 border-border-gold p-6 text-left group hover:shadow-wedding-gold transition-all duration-300"
                >
                    <svg className="w-8 h-8 text-gold mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="font-cinzel text-lg font-semibold text-maroon mb-2">Manage Invitations</h3>
                    <p className="text-text-secondary text-sm font-poppins">View and manage all wedding invitations</p>
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/admin/invitations/new')}
                    className="card-wedding bg-white border-2 border-border-gold p-6 text-left group hover:shadow-wedding-gold transition-all duration-300"
                >
                    <svg className="w-8 h-8 text-gold mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <h3 className="font-cinzel text-lg font-semibold text-maroon mb-2">Create New Invitation</h3>
                    <p className="text-text-secondary text-sm font-poppins">Add a new wedding invitation</p>
                </motion.button>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="card-wedding bg-white border-2 border-border-gold p-6"
            >
                <h2 className="font-cinzel text-2xl font-bold text-gold mb-6">
                    Recent Activity
                </h2>

                <div className="space-y-4">
                    {recentActivity.length === 0 ? (
                        <p className="text-text-secondary font-poppins text-center py-8">
                            No RSVP responses yet
                        </p>
                    ) : (
                        recentActivity.map((activity, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="bg-gradient-to-r from-ivory to-white p-4 rounded-wedding border border-border-gold/50 hover:shadow-wedding-gold transition-all duration-300"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-3 h-3 rounded-full ${activity.attendance === 'yes' ? 'bg-green-500 shadow-wedding-gold' : 'bg-red-500'
                                            }`} />
                                        <div>
                                            <p className="font-poppins font-semibold text-text-primary">{activity.name}</p>
                                            <p className="text-text-secondary text-sm">
                                                {activity.attendance === 'yes' ? 'Attending' : 'Declined'} • {activity.numberOfGuests || 0} guest{(activity.numberOfGuests || 0) !== 1 ? 's' : ''}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-text-secondary text-sm font-poppins">
                                        {new Date(activity.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </motion.div>

        </div>
    );
};

export default Dashboard;
