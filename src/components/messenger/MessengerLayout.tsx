import { useState } from 'react';
import Sidebar from './Sidebar';
import ChatList from './ChatList';
import ChatArea from './ChatArea';
import ProfilePanel from './ProfilePanel';
import SettingsPanel from './SettingsPanel';

interface MessengerLayoutProps {
  currentUser: { username: string; avatar: string };
  onLogout: () => void;
}

export default function MessengerLayout({ currentUser, onLogout }: MessengerLayoutProps) {
  const [selectedChat, setSelectedChat] = useState<string | null>('general');
  const [activeView, setActiveView] = useState<'chats' | 'profile' | 'settings'>('chats');

  return (
    <div className="h-screen flex bg-background overflow-hidden">
      <Sidebar 
        currentUser={currentUser} 
        activeView={activeView}
        onViewChange={setActiveView}
        onLogout={onLogout}
      />
      
      {activeView === 'chats' && (
        <>
          <ChatList 
            selectedChat={selectedChat} 
            onSelectChat={setSelectedChat} 
          />
          <ChatArea 
            selectedChat={selectedChat}
            currentUser={currentUser}
          />
        </>
      )}
      
      {activeView === 'profile' && (
        <ProfilePanel currentUser={currentUser} />
      )}
      
      {activeView === 'settings' && (
        <SettingsPanel />
      )}
    </div>
  );
}
