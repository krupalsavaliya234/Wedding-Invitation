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
    const audioRef = useRef(null);

    useEffect(() => {
        // Create audio element
        audioRef.current = new Audio('/wedding-music.mp3');
        audioRef.current.loop = true;
        audioRef.current.volume = 0.5;

        // Handle audio load
        audioRef.current.addEventListener('canplaythrough', () => {
            setIsLoaded(true);
        });

        // Handle audio errors
        audioRef.current.addEventListener('error', (e) => {
            console.error('Audio failed to load:', e);
        });

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const play = async () => {
        if (audioRef.current && isLoaded) {
            try {
                await audioRef.current.play();
                setIsPlaying(true);
                return true;
            } catch (error) {
                console.error('Audio play failed:', error);
                return false;
            }
        }
        return false;
    };

    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
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
        <AudioContext.Provider value={{ isPlaying, isLoaded, play, pause, toggle }}>
            {children}
        </AudioContext.Provider>
    );
};
