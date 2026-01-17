import { useState, useMemo } from 'react';
import Sidebar from './Sidebar';
import ChatList, { channels, friends } from './ChatList';
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
  const [messageCount, setMessageCount] = useState(0);

  const stats = useMemo(() => ({
    totalMessages: messageCount,
    totalFriends: friends.length,
    totalChannels: channels.length,
  }), [messageCount]);

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
            onMessageSent={() => setMessageCount(prev => prev + 1)}
          />
        </>
      )}
      
      {activeView === 'profile' && (
        <ProfilePanel 
          currentUser={currentUser}
          totalMessages={stats.totalMessages}
          totalFriends={stats.totalFriends}
          totalChannels={stats.totalChannels}
        />
      )}
      
      {activeView === 'settings' && (
        <SettingsPanel />
      )}
    </div>
  );
}