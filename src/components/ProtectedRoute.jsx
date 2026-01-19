import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAdmin();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="glass-card p-8 rounded-xl">
                    <div className="animate-spin w-12 h-12 border-4 border-teal-glow border-t-transparent rounded-full mx-auto" />
                    <p className="text-cream mt-4 font-poppins">Loading...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
