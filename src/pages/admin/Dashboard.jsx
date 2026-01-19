import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import StatsCard from '../../components/admin/StatsCard';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalRsvps: 0,
        attending: 0,
        declined: 0,
        totalGuests: 0,
    });
    const [recentActivity, setRecentActivity] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
        fetchRecentActivity();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await fetch('/api/admin/stats');
            const data = await response.json();
            setStats(data);
        } catch (error) {
            console.error('Error fetching stats:', error);
            // Mock data for development
            setStats({
                totalRsvps: 42,
                attending: 35,
                declined: 7,
                totalGuests: 87,
            });
        } finally {
            setLoading(false);
        }
    };

    const fetchRecentActivity = async () => {
        try {
            const response = await fetch('/api/admin/rsvps?limit=5');
            const data = await response.json();
            setRecentActivity(data.rsvps || []);
        } catch (error) {
            console.error('Error fetching recent activity:', error);
            // Mock data
            setRecentActivity([
                { name: 'Amit Patel', status: 'Attending', guests: 2, createdAt: new Date().toISOString() },
                { name: 'Priya Shah', status: 'Attending', guests: 4, createdAt: new Date().toISOString() },
                { name: 'Raj Kumar', status: 'Declined', guests: 0, createdAt: new Date().toISOString() },
            ]);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="glass-card p-8 rounded-xl">
                    <div className="animate-spin w-12 h-12 border-4 border-teal-glow border-t-transparent rounded-full mx-auto" />
                    <p className="text-cream mt-4 font-poppins">Loading dashboard...</p>
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
                <h1 className="font-cinzel text-4xl font-bold text-gradient-holographic mb-2">
                    Dashboard Overview
                </h1>
                <p className="text-cream/60 font-poppins">
                    Welcome to your wedding invitation control panel
                </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                <StatsCard
                    title="Total RSVPs"
                    value={stats.totalRsvps}
                    color="teal"
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    }
                    trend={12}
                />

                <StatsCard
                    title="Attending"
                    value={stats.attending}
                    color="gold"
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    }
                />

                <StatsCard
                    title="Declined"
                    value={stats.declined}
                    color="violet"
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    }
                />

                <StatsCard
                    title="Total Guests"
                    value={stats.totalGuests}
                    color="teal"
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    }
                    trend={8}
                />
            </motion.div>

            {/* Recent Activity */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="glass-card-premium rounded-xl p-6"
            >
                <h2 className="font-cinzel text-2xl font-bold text-gradient-gold mb-6">
                    Recent Activity
                </h2>

                <div className="space-y-4">
                    {recentActivity.length === 0 ? (
                        <p className="text-cream/60 font-poppins text-center py-8">
                            No RSVP responses yet
                        </p>
                    ) : (
                        recentActivity.map((activity, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="glass-card p-4 rounded-lg hover:shadow-glow-teal transition-all duration-300"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-2 h-2 rounded-full ${activity.status === 'Attending' ? 'bg-green-400 glow-teal' : 'bg-red-400'
                                            }`} />
                                        <div>
                                            <p className="font-poppins font-semibold text-cream">{activity.name}</p>
                                            <p className="text-cream/60 text-sm">
                                                {activity.status} • {activity.guests} guest{activity.guests !== 1 ? 's' : ''}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-cream/40 text-sm font-poppins">
                                        {new Date(activity.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="glass-card-premium p-6 rounded-xl text-left group hover:shadow-glow-teal transition-all duration-300"
                >
                    <svg className="w-8 h-8 text-teal-glow mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <h3 className="font-cinzel text-lg font-semibold text-cream mb-2">Export Guest List</h3>
                    <p className="text-cream/60 text-sm font-poppins">Download all RSVP data as CSV</p>
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="glass-card-premium p-6 rounded-xl text-left group hover:shadow-glow-violet transition-all duration-300"
                >
                    <svg className="w-8 h-8 text-violet-glow mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <h3 className="font-cinzel text-lg font-semibold text-cream mb-2">Upload Photos</h3>
                    <p className="text-cream/60 text-sm font-poppins">Add images to gallery</p>
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="glass-card-premium p-6 rounded-xl text-left group hover:shadow-glow-gold transition-all duration-300"
                >
                    <svg className="w-8 h-8 text-gold mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <h3 className="font-cinzel text-lg font-semibold text-cream mb-2">Site Settings</h3>
                    <p className="text-cream/60 text-sm font-poppins">Configure invitation details</p>
                </motion.button>
            </motion.div>
        </div>
    );
};

export default Dashboard;
