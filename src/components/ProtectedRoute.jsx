import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAdmin();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-ivory">
                <div className="card-wedding bg-white border-2 border-border-gold p-8">
                    <div className="animate-spin w-12 h-12 border-4 border-gold border-t-transparent rounded-full mx-auto" />
                    <p className="text-text-primary mt-4 font-poppins">Loading...</p>
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
