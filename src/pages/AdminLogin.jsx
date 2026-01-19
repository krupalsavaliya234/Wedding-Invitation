import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAdmin();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        const success = login(username, password);
        if (success) {
            navigate('/admin/dashboard');
        } else {
            setError('Invalid credentials. Try: admin / wedding2026');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
          `,
                    backgroundSize: '50px 50px',
                }}
            />

            {/* Login Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="glass-card-ultra rounded-2xl p-12 w-full max-w-md relative z-10"
            >
                {/* Logo/Title */}
                <div className="text-center mb-8">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="w-16 h-16 mx-auto mb-4"
                    >
                        <svg className="w-full h-full text-gold glow-gold" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L9.5 8.5L3 9.5L7.5 14L6.5 21L12 17.5L17.5 21L16.5 14L21 9.5L14.5 8.5L12 2Z" />
                        </svg>
                    </motion.div>
                    <h1 className="font-cinzel text-3xl font-bold text-gradient-holographic mb-2">
                        Admin Control
                    </h1>
                    <p className="text-cream/60 font-poppins text-sm">
                        Wedding Invitation Dashboard
                    </p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Username */}
                    <div>
                        <label className="block text-cream/80 font-poppins text-sm mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full glass-card px-4 py-3 rounded-lg text-cream font-poppins
                       border border-teal-glow/20 focus:border-teal-glow/50
                       focus:outline-none focus:ring-2 focus:ring-teal-glow/20
                       transition-all duration-300"
                            placeholder="Enter username"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-cream/80 font-poppins text-sm mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full glass-card px-4 py-3 rounded-lg text-cream font-poppins
                       border border-teal-glow/20 focus:border-teal-glow/50
                       focus:outline-none focus:ring-2 focus:ring-teal-glow/20
                       transition-all duration-300"
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-500/10 border border-red-500/30 rounded-lg p-3"
                        >
                            <p className="text-red-400 text-sm font-poppins">{error}</p>
                        </motion.div>
                    )}

                    {/* Login Button */}
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full glass-card-premium py-4 rounded-lg font-cinzel text-lg
                     text-gradient-gold font-semibold
                     hover:shadow-glow-teal transition-all duration-300
                     relative overflow-hidden group"
                    >
                        <span className="relative z-10">Login</span>
                        <div className="absolute inset-0 shimmer-teal opacity-0 group-hover:opacity-100" />
                    </motion.button>
                </form>

                {/* Hint */}
                <div className="mt-6 text-center">
                    <p className="text-cream/40 text-xs font-poppins">
                        Default: admin / wedding2026
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
