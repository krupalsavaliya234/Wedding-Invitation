import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const AudioContext = createContext();

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error('useAudio must be used within AudioProvider');
    }
    return context;
};

export const AudioProvider = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        // Create audio element
        audioRef.current = new Audio('/wedding-music.mp3');
        audioRef.current.loop = true;
        audioRef.current.volume = 0.5;

        console.log('🎵 Audio element created, attempting to load music...');

        // Handle audio load
        audioRef.current.addEventListener('canplaythrough', () => {
            setIsLoaded(true);
            setHasError(false);
            console.log('✅ Audio loaded successfully!');
        });

        // Handle audio errors
        audioRef.current.addEventListener('error', (e) => {
            console.error('❌ Audio failed to load:', e);
            console.error('Error details:', {
                code: audioRef.current?.error?.code,
                message: audioRef.current?.error?.message
            });
            setHasError(true);
            setIsLoaded(false);
        });

        // Try to preload
        audioRef.current.load();

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const play = async () => {
        if (!audioRef.current) {
            console.error('❌ Audio element not initialized');
            return false;
        }

        if (hasError) {
            console.error('❌ Cannot play - audio file has errors');
            console.log('💡 Please add a valid wedding-music.mp3 file to the public/ folder');
            return false;
        }

        if (!isLoaded) {
            console.warn('⚠️ Audio not fully loaded yet, attempting to play anyway...');
        }

        try {
            await audioRef.current.play();
            setIsPlaying(true);
            console.log('▶️ Music playing!');
            return true;
        } catch (error) {
            console.error('❌ Audio play failed:', error.message);
            console.log('💡 Tip: Make sure wedding-music.mp3 is a valid audio file in public/ folder');
            return false;
        }
    };

    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
            console.log('⏸️ Music paused');
        }
    };

    const toggle = async () => {
        if (isPlaying) {
            pause();
        } else {
            await play();
        }
    };

    return (
        <AudioContext.Provider value={{ isPlaying, isLoaded, hasError, play, pause, toggle }}>
            {children}
        </AudioContext.Provider>
    );
};
