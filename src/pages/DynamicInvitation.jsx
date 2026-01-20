import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import EntryScreen from '../components/EntryScreen';
import MainInvitation from '../components/MainInvitation';
import MusicToggle from '../components/MusicToggle';
import FloatingActionButton from '../components/FloatingActionButton';
import WhatsAppShare from '../components/WhatsAppShare';
import LanguageSwitcher from '../components/LanguageSwitcher';
import VolumetricLighting from '../components/VolumetricLighting';
import { AudioProvider } from '../contexts/AudioContext';

const DynamicInvitation = () => {
    const { slug } = useParams();
    const [invitation, setInvitation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showInvitation, setShowInvitation] = useState(false);

    useEffect(() => {
        fetchInvitation();
    }, [slug]);

    const fetchInvitation = async () => {
        try {
            const response = await axios.get(`/api/invitations/${slug}`);
            setInvitation(response.data.data);
        } catch (error) {
            console.error('Error fetching invitation:', error);
            setError('Invitation not found');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenInvitation = () => {
        setShowInvitation(true);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-ivory">
                <div className="card-wedding bg-white border-2 border-border-gold p-8">
                    <div className="animate-spin w-12 h-12 border-4 border-gold border-t-transparent rounded-full mx-auto" />
                    <p className="text-text-primary mt-4 font-poppins">Loading invitation...</p>
                </div>
            </div>
        );
    }

    if (error || !invitation) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-ivory">
                <div className="card-wedding bg-white border-2 border-border-gold p-8 text-center">
                    <h2 className="font-playfair text-3xl font-bold text-maroon mb-4">Invitation Not Found</h2>
                    <p className="text-text-secondary font-poppins">The invitation you're looking for doesn't exist or has been removed.</p>
                </div>
            </div>
        );
    }

    return (
        <AudioProvider>
            <div className="min-h-screen relative">
                <VolumetricLighting />
                <MusicToggle />
                <LanguageSwitcher />
                {showInvitation && <FloatingActionButton />}
                {showInvitation && <WhatsAppShare />}
                {!showInvitation ? (
                    <EntryScreen onOpenInvitation={handleOpenInvitation} invitation={invitation} />
                ) : (
                    <MainInvitation invitation={invitation} />
                )}
            </div>
        </AudioProvider>
    );
};

export default DynamicInvitation;
