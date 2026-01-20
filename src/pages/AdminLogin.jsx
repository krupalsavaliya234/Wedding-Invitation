import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAdmin();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const success = await login(email, password);
            if (success) {
                navigate('/admin/dashboard');
            } else {
                setError('Invalid email or password');
            }
        } catch (err) {
            setError('Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-ivory">
            {/* Decorative Background Pattern */}
            <div className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(122, 30, 45, 0.1) 0%, transparent 50%)
          `,
                }}
            />

            {/* Login Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="card-wedding bg-white/95 backdrop-blur-sm border-2 border-border-gold p-12 w-full max-w-md relative z-10 shadow-wedding-gold"
            >
                {/* Logo/Title */}
                <div className="text-center mb-8">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="w-16 h-16 mx-auto mb-4"
                    >
                        <div className="w-full h-full bg-gradient-to-br from-gold to-saffron rounded-full flex items-center justify-center shadow-wedding-gold">
                            <svg className="w-10 h-10 text-maroon" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2L9.5 8.5L3 9.5L7.5 14L6.5 21L12 17.5L17.5 21L16.5 14L21 9.5L14.5 8.5L12 2Z" />
                            </svg>
                        </div>
                    </motion.div>
                    <h1 className="font-cinzel text-3xl font-bold text-gold mb-2">
                        Admin Control
                    </h1>
                    <p className="text-text-secondary font-poppins text-sm">
                        Wedding Invitation Dashboard
                    </p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email */}
                    <div>
                        <label className="block text-text-primary font-poppins text-sm mb-2 font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-wedding text-text-primary font-poppins bg-ivory/50
                       border-2 border-border-gold focus:border-gold
                       focus:outline-none focus:ring-2 focus:ring-gold/20
                       transition-all duration-300"
                            placeholder="Enter admin email"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-text-primary font-poppins text-sm mb-2 font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-wedding text-text-primary font-poppins bg-ivory/50
                       border-2 border-border-gold focus:border-gold
                       focus:outline-none focus:ring-2 focus:ring-gold/20
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
                            className="bg-red-500/10 border-2 border-red-500/30 rounded-wedding p-3"
                        >
                            <p className="text-red-600 text-sm font-poppins">{error}</p>
                        </motion.div>
                    )}

                    {/* Login Button */}
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isLoading}
                        className="btn-wedding-primary w-full font-cinzel text-lg font-semibold py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </motion.button>
                </form>

                {/* Hint */}
                <div className="mt-6 text-center">
                    <p className="text-text-secondary text-xs font-poppins">
                        Use your admin email and password
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
