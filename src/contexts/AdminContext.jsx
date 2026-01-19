import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('useAdmin must be used within AdminProvider');
    }
    return context;
};

export const AdminProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if admin is already logged in (from localStorage)
        const adminToken = localStorage.getItem('adminToken');
        if (adminToken === 'wedding-admin-2026') {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    const login = (username, password) => {
        // Simple authentication (upgrade to JWT in production)
        if (username === 'admin' && password === 'wedding2026') {
            localStorage.setItem('adminToken', 'wedding-admin-2026');
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem('adminToken');
        setIsAuthenticated(false);
    };

    return (
        <AdminContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
            {children}
        </AdminContext.Provider>
    );
};
