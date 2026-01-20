import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import VolumetricLighting from '../VolumetricLighting';

const AdminLayout = () => {
    return (
        <div className="min-h-screen flex relative overflow-hidden bg-ivory">
            {/* Volumetric Lighting */}
            <VolumetricLighting />

            {/* Decorative Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                    backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(122, 30, 45, 0.1) 0%, transparent 50%)
          `,
                }}
            />

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 relative z-10 overflow-y-auto bg-gradient-to-br from-ivory to-white/50">
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
