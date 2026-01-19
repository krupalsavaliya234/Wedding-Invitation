import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import VolumetricLighting from '../VolumetricLighting';

const AdminLayout = () => {
    return (
        <div className="min-h-screen flex relative overflow-hidden">
            {/* Volumetric Lighting */}
            <VolumetricLighting />

            {/* Grid Background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
          `,
                    backgroundSize: '50px 50px',
                }}
            />

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 relative z-10 overflow-y-auto">
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
