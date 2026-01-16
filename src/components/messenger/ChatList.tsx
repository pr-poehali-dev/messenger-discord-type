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

const channels = [
  { id: 'general', name: 'Общий', icon: '💬', unread: 3, lastMessage: 'Привет всем!' },
  { id: 'random', name: 'Флудилка', icon: '🎲', unread: 0, lastMessage: 'Кто-нибудь видел...' },
  { id: 'tech', name: 'Технологии', icon: '💻', unread: 7, lastMessage: 'Новая версия вышла!' },
  { id: 'design', name: 'Дизайн', icon: '🎨', unread: 0, lastMessage: 'Посмотрите мокап' },
];

const friends = [
  { id: 'user1', name: 'Алексей', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', status: 'online', unread: 2 },
  { id: 'user2', name: 'Мария', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria', status: 'away', unread: 0 },
  { id: 'user3', name: 'Дмитрий', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dmitry', status: 'online', unread: 1 },
  { id: 'bot', name: '🤖 Бот-помощник', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=bot', status: 'online', unread: 0 },
];

export default function ChatList({ selectedChat, onSelectChat }: ChatListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'channels' | 'friends'>('channels');

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

      <div className="flex border-b border-border">
        <Button
          variant={activeTab === 'channels' ? 'default' : 'ghost'}
          className="flex-1 rounded-none"
          onClick={() => setActiveTab('channels')}
        >
          <Icon name="Hash" size={18} className="mr-2" />
          Каналы
        </Button>
        <Button
          variant={activeTab === 'friends' ? 'default' : 'ghost'}
          className="flex-1 rounded-none"
          onClick={() => setActiveTab('friends')}
        >
          <Icon name="Users" size={18} className="mr-2" />
          Друзья
        </Button>
      </div>

      <ScrollArea className="flex-1 scrollbar-thin">
        <div className="p-2">
          {activeTab === 'channels' && channels.map((channel) => (
            <button
              key={channel.id}
              onClick={() => onSelectChat(channel.id)}
              className={`w-full p-3 rounded-lg mb-1 flex items-center gap-3 transition-all hover:bg-accent ${
                selectedChat === channel.id ? 'bg-accent' : ''
              }`}
            >
              <div className="text-2xl">{channel.icon}</div>
              <div className="flex-1 text-left">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{channel.name}</h3>
                  {channel.unread > 0 && (
                    <Badge className="bg-primary">{channel.unread}</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground truncate">{channel.lastMessage}</p>
              </div>
            </button>
          ))}

          {activeTab === 'friends' && friends.map((friend) => (
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
                <p className="text-sm text-muted-foreground">
                  {friend.status === 'online' ? 'В сети' : 'Отошел'}
                </p>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border">
        <Button className="w-full" variant="outline">
          <Icon name="Plus" size={18} className="mr-2" />
          Создать канал
        </Button>
      </div>
    </div>
  );
}
