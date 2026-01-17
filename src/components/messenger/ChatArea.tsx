import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { channels, friends } from './ChatList';

interface ChatAreaProps {
  selectedChat: string | null;
  currentUser: { username: string; avatar: string };
  onMessageSent?: () => void;
}

interface Message {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  content: string;
  isBot?: boolean;
  timestamp: Date;
  reactions?: { emoji: string; count: number }[];
}

const emojis = ['👍', '❤️', '😂', '😮', '😢', '🔥', '🎉', '👏'];

export default function ChatArea({ selectedChat, currentUser, onMessageSent }: ChatAreaProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      userId: 'user1',
      username: 'Алексей',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
      content: 'Привет всем! Как дела?',
      timestamp: new Date(Date.now() - 3600000),
      reactions: [{ emoji: '👍', count: 3 }]
    },
    {
      id: '2',
      userId: 'bot',
      username: '🤖 Бот-помощник',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=bot',
      content: 'Привет! Я бот-помощник. Используй команды:\n/help - справка\n/random - случайное число\n/joke - шутка',
      timestamp: new Date(Date.now() - 1800000),
    },
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      userId: 'me',
      username: currentUser.username,
      avatar: currentUser.avatar,
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');
    onMessageSent?.();

    if (inputMessage.startsWith('/')) {
      handleBotCommand(inputMessage);
    }
  };

  const handleBotCommand = (command: string) => {
    if (selectedChat !== 'bot') return;
    
    setTimeout(() => {
      let botResponse = '';
      
      if (command === '/help') {
        botResponse = '📋 Доступные команды:\n/help - эта справка\n/random - случайное число\n/joke - случайная шутка\n/time - текущее время';
      } else if (command === '/random') {
        botResponse = `🎲 Твое случайное число: ${Math.floor(Math.random() * 100)}`;
      } else if (command === '/joke') {
        const jokes = [
          '😄 Почему программисты путают Хэллоуин и Рождество? Потому что Oct 31 == Dec 25!',
          '🤓 Сколько программистов нужно, чтобы поменять лампочку? Ни одного, это аппаратная проблема!',
          '💻 Как программист может выйти из душа? Читает инструкцию на шампуне: "Намылить, смыть, повторить"',
        ];
        botResponse = jokes[Math.floor(Math.random() * jokes.length)];
      } else if (command === '/time') {
        botResponse = `⏰ Текущее время: ${new Date().toLocaleTimeString('ru-RU')}`;
      } else {
        botResponse = '❓ Неизвестная команда. Используй /help для списка команд.';
      }

      const botMessage: Message = {
        id: Date.now().toString(),
        userId: 'bot',
        username: '🤖 Бот-помощник',
        avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=bot',
        content: botResponse,
        timestamp: new Date(),
        isBot: true,
      };

      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };

  const handleEmojiClick = (emoji: string) => {
    setInputMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  if (!selectedChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center">
          <Icon name="MessageSquare" size={64} className="mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">Выберите чат</h3>
          <p className="text-muted-foreground">Начните общение с друзьями или в каналах</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="h-16 border-b border-border flex items-center justify-between px-6 bg-card">
        <div className="flex items-center gap-3">
          {(() => {
            const currentChat = [...channels, ...friends].find(c => c.id === selectedChat);
            if (!currentChat) return null;
            
            if (currentChat.type === 'channel') {
              return (
                <>
                  <div className="text-2xl">{currentChat.icon}</div>
                  <div>
                    <h2 className="text-lg font-bold">{currentChat.name}</h2>
                    <p className="text-xs text-muted-foreground">Общий канал</p>
                  </div>
                </>
              );
            } else {
              return (
                <>
                  <Avatar>
                    <AvatarImage src={(currentChat as any).avatar} alt={currentChat.name} />
                    <AvatarFallback>{currentChat.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-lg font-bold">{currentChat.name}</h2>
                    <p className="text-xs text-muted-foreground">
                      {(currentChat as any).status === 'online' ? '🟢 В сети' : '🟡 Отошел'}
                    </p>
                  </div>
                </>
              );
            }
          })()}
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <Icon name="Phone" size={20} />
          </Button>
          <Button variant="ghost" size="icon">
            <Icon name="Video" size={20} />
          </Button>
          <Button variant="ghost" size="icon">
            <Icon name="Pin" size={20} />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-6 scrollbar-thin" ref={scrollRef}>
        <div className="space-y-6">
          {messages.map((message) => (
            <div key={message.id} className="flex gap-3 group hover:bg-accent/50 p-2 rounded-lg transition-all">
              <Avatar className="mt-1">
                <AvatarImage src={message.avatar} alt={message.username} />
                <AvatarFallback>{message.username[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-semibold">{message.username}</span>
                  <span className="text-xs text-muted-foreground">
                    {message.timestamp.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-foreground whitespace-pre-wrap">{message.content}</p>
                {message.reactions && (
                  <div className="flex gap-1 mt-2">
                    {message.reactions.map((reaction, idx) => (
                      <button
                        key={idx}
                        className="flex items-center gap-1 px-2 py-1 rounded-full bg-accent hover:bg-accent/80 text-sm transition-all"
                      >
                        <span>{reaction.emoji}</span>
                        <span className="text-xs">{reaction.count}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Icon name="Paperclip" size={20} />
          </Button>
          
          <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <Icon name="Smile" size={20} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <div className="grid grid-cols-4 gap-2">
                {emojis.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => handleEmojiClick(emoji)}
                    className="text-2xl p-2 hover:bg-accent rounded-lg transition-all hover:scale-110"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <Input
            placeholder="Напишите сообщение..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 bg-card"
          />
          
          <Button variant="ghost" size="icon">
            <Icon name="Mic" size={20} />
          </Button>
          
          <Button onClick={handleSendMessage} size="icon" className="bg-primary hover:bg-primary/90">
            <Icon name="Send" size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}