import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface ProfilePanelProps {
  currentUser: { username: string; avatar: string };
}

export default function ProfilePanel({ currentUser }: ProfilePanelProps) {
  const [username, setUsername] = useState(currentUser.username);
  const [status, setStatus] = useState('Доступен для общения');
  const [bio, setBio] = useState('Люблю программирование и общение!');
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);
  const [allowDirectMessages, setAllowDirectMessages] = useState(true);
  const [encryptMessages, setEncryptMessages] = useState(true);

  return (
    <div className="flex-1 bg-background overflow-y-auto scrollbar-thin">
      <div className="max-w-3xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Профиль пользователя</h1>
          <p className="text-muted-foreground">Управляйте вашим профилем и настройками приватности</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Основная информация</CardTitle>
            <CardDescription>Обновите свой профиль и аватар</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={currentUser.avatar} alt={username} />
                <AvatarFallback className="text-2xl">{username[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Button variant="outline">
                  <Icon name="Upload" size={18} className="mr-2" />
                  Загрузить аватар
                </Button>
                <p className="text-sm text-muted-foreground">JPG, PNG. Максимум 2MB</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Имя пользователя</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-card"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Статус</Label>
              <Input
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                placeholder="Что у вас нового?"
                className="bg-card"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">О себе</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Расскажите о себе..."
                className="bg-card min-h-[100px]"
              />
            </div>

            <Button className="w-full">
              <Icon name="Save" size={18} className="mr-2" />
              Сохранить изменения
            </Button>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Приватность и безопасность</CardTitle>
            <CardDescription>Управляйте видимостью и доступом к вашему профилю</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Показывать статус онлайн</Label>
                <p className="text-sm text-muted-foreground">
                  Другие пользователи видят, когда вы в сети
                </p>
              </div>
              <Switch
                checked={showOnlineStatus}
                onCheckedChange={setShowOnlineStatus}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Прямые сообщения</Label>
                <p className="text-sm text-muted-foreground">
                  Разрешить другим отправлять вам личные сообщения
                </p>
              </div>
              <Switch
                checked={allowDirectMessages}
                onCheckedChange={setAllowDirectMessages}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Сквозное шифрование</Label>
                <p className="text-sm text-muted-foreground">
                  Ваши сообщения защищены E2E шифрованием
                </p>
              </div>
              <Switch
                checked={encryptMessages}
                onCheckedChange={setEncryptMessages}
              />
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex items-start gap-3 p-4 bg-primary/10 rounded-lg">
                <Icon name="Shield" size={24} className="text-primary mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1">Безопасность включена</h4>
                  <p className="text-sm text-muted-foreground">
                    Ваши сообщения защищены end-to-end шифрованием. 
                    Никто, включая нас, не может прочитать ваши личные сообщения.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Статистика</CardTitle>
            <CardDescription>Ваша активность в мессенджере</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-accent rounded-lg">
                <Icon name="MessageSquare" size={32} className="mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">342</div>
                <div className="text-sm text-muted-foreground">Сообщений</div>
              </div>
              <div className="text-center p-4 bg-accent rounded-lg">
                <Icon name="Users" size={32} className="mx-auto mb-2 text-secondary" />
                <div className="text-2xl font-bold">28</div>
                <div className="text-sm text-muted-foreground">Друзей</div>
              </div>
              <div className="text-center p-4 bg-accent rounded-lg">
                <Icon name="Hash" size={32} className="mx-auto mb-2 text-accent" />
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-muted-foreground">Каналов</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
