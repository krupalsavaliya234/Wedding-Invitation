import React, { useState } from 'react';
import EntryScreen from './components/EntryScreen';
import MainInvitation from './components/MainInvitation';
import MusicToggle from './components/MusicToggle';
import FloatingActionButton from './components/FloatingActionButton';
import WhatsAppShare from './components/WhatsAppShare';
import LanguageSwitcher from './components/LanguageSwitcher';
import { AudioProvider } from './contexts/AudioContext';

function App() {
  const [showInvitation, setShowInvitation] = useState(false);

  const handleOpenInvitation = () => {
    setShowInvitation(true);
  };

  return (
    <AudioProvider>
      <div className="min-h-screen">
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
  );
}

export default App;
