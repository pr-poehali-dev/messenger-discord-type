import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import Icon from '@/components/ui/icon';

interface SidebarProps {
  currentUser: { username: string; avatar: string };
  activeView: 'chats' | 'profile' | 'settings';
  onViewChange: (view: 'chats' | 'profile' | 'settings') => void;
  onLogout: () => void;
}

export default function Sidebar({ currentUser, activeView, onViewChange, onLogout }: SidebarProps) {
  const menuItems = [
    { id: 'chats' as const, icon: 'MessageSquare', label: 'Чаты' },
    { id: 'profile' as const, icon: 'User', label: 'Профиль' },
    { id: 'settings' as const, icon: 'Settings', label: 'Настройки' },
  ];

  return (
    <div className="w-20 bg-sidebar flex flex-col items-center py-4 border-r border-sidebar-border">
      <div className="mb-6">
        <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
          <Icon name="MessageCircle" size={24} className="text-primary-foreground" />
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-3">
        {menuItems.map((item) => (
          <Tooltip key={item.id}>
            <TooltipTrigger asChild>
              <Button
                variant={activeView === item.id ? 'default' : 'ghost'}
                size="icon"
                className={`w-12 h-12 rounded-xl transition-all ${
                  activeView === item.id 
                    ? 'bg-primary hover:bg-primary' 
                    : 'hover:bg-sidebar-accent'
                }`}
                onClick={() => onViewChange(item.id)}
              >
                <Icon name={item.icon} size={24} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{item.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>

      <div className="mt-auto space-y-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 rounded-xl hover:bg-sidebar-accent"
            >
              <Icon name="Bell" size={24} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Уведомления</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 rounded-xl hover:bg-destructive"
              onClick={onLogout}
            >
              <Icon name="LogOut" size={24} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Выход</p>
          </TooltipContent>
        </Tooltip>

        <Avatar className="w-12 h-12 border-2 border-primary cursor-pointer">
          <AvatarImage src={currentUser.avatar} alt={currentUser.username} />
          <AvatarFallback>{currentUser.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
