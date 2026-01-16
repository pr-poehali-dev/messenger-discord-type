import { useState } from 'react';
import Auth from '@/components/messenger/Auth';
import MessengerLayout from '@/components/messenger/MessengerLayout';

export default function Index() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ username: string; avatar: string } | null>(null);

  const handleLogin = (username: string) => {
    setCurrentUser({
      username,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
    });
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  if (!isAuthenticated) {
    return <Auth onLogin={handleLogin} />;
  }

  return <MessengerLayout currentUser={currentUser!} onLogout={handleLogout} />;
}