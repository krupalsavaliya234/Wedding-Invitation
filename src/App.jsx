import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import EntryScreen from './components/EntryScreen';
import MainInvitation from './components/MainInvitation';
import MusicToggle from './components/MusicToggle';
import FloatingActionButton from './components/FloatingActionButton';
import WhatsAppShare from './components/WhatsAppShare';
import LanguageSwitcher from './components/LanguageSwitcher';
import VolumetricLighting from './components/VolumetricLighting';
import { AudioProvider } from './contexts/AudioContext';

// Admin Imports
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import ThemeSelector from './pages/admin/ThemeSelector';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [showInvitation, setShowInvitation] = useState(false);

  const handleOpenInvitation = () => {
    setShowInvitation(true);
  };

  return (
    <Routes>
      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="theme" element={<ThemeSelector />} />
        <Route path="rsvp" element={<div className="text-cream">RSVP Management - Coming Soon</div>} />
        <Route path="media" element={<div className="text-cream">Media Gallery - Coming Soon</div>} />
        <Route path="analytics" element={<div className="text-cream">Analytics - Coming Soon</div>} />
        <Route path="settings" element={<div className="text-cream">Settings - Coming Soon</div>} />
        <Route index element={<Navigate to="dashboard" replace />} />
      </Route>

      {/* Public Routes */}
      <Route
        path="/*"
        element={
          <AudioProvider>
            <div className="min-h-screen relative">
              <VolumetricLighting />
              <MusicToggle />
              <LanguageSwitcher />
              {showInvitation && <FloatingActionButton />}
              {showInvitation && <WhatsAppShare />}
              {!showInvitation ? (
                <EntryScreen onOpenInvitation={handleOpenInvitation} />
              ) : (
                <MainInvitation />
              )}
            </div>
          </AudioProvider>
        }
      />
    </Routes>
  );
}

export default App;
