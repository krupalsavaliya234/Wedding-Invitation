import React from 'react';
import { useAudio } from '../contexts/AudioContext';

const MusicToggle = () => {
    const { isPlaying, toggle } = useAudio();

    return (
        <button
            onClick={toggle}
            className="fixed top-6 right-6 z-50 bg-maroon text-gold p-4 rounded-full shadow-lg hover:bg-gold hover:text-maroon transition-all duration-300 hover:scale-110 animate-fade-in"
            aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
        >
            {isPlaying ? (
                // Pause icon
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
            ) : (
                // Play icon
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                </svg>
            )}
        </button>
    );
};

export default MusicToggle;
