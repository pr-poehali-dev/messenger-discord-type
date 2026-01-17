import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface ChatListProps {
  selectedChat: string | null;
  onSelectChat: (chatId: string) => void;
}

export const channels: any[] = [];

export const friends = [
  { id: 'bot', name: '🤖 AI Помощник', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=assistant', status: 'online' as const, unread: 0, type: 'dm' as const, lastMessage: 'Спроси меня о чём угодно!' },
  { id: 'user1', name: 'Алексей', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', status: 'online' as const, unread: 2, type: 'dm' as const, lastMessage: 'Как дела?' },
  { id: 'user2', name: 'Мария', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria', status: 'away' as const, unread: 0, type: 'dm' as const, lastMessage: 'Увидимся завтра' },
  { id: 'user3', name: 'Дмитрий', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dmitry', status: 'online' as const, unread: 1, type: 'dm' as const, lastMessage: 'Отлично!' },
];

export default function ChatList({ selectedChat, onSelectChat }: ChatListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'channels' | 'friends'>('friends');

  const filteredChannels = channels.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFriends = friends.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-80 bg-card border-r border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="text-xl font-bold mb-4">Мессенджер</h2>
        
        <div className="relative">
          <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Поиск..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background"
          />
        </div>
      </div>



      <ScrollArea className="flex-1 scrollbar-thin">
        <div className="p-2">
          {filteredFriends.map((friend) => (
            <button
              key={friend.id}
              onClick={() => onSelectChat(friend.id)}
              className={`w-full p-3 rounded-lg mb-1 flex items-center gap-3 transition-all hover:bg-accent ${
                selectedChat === friend.id ? 'bg-accent' : ''
              }`}
            >
              <div className="relative">
                <Avatar>
                  <AvatarImage src={friend.avatar} alt={friend.name} />
                  <AvatarFallback>{friend.name[0]}</AvatarFallback>
                </Avatar>
                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${
                  friend.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                }`} />
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{friend.name}</h3>
                  {friend.unread > 0 && (
                    <Badge className="bg-primary">{friend.unread}</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {(friend as any).lastMessage || (friend.status === 'online' ? 'В сети' : 'Отошел')}
                </p>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>


    </div>
  );
}