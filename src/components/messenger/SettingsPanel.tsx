import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

interface SettingsPanelProps {
  onSettingsChange?: (settings: { darkMode: boolean; fontSize: number; notifications: boolean; soundEnabled: boolean }) => void;
}

export default function SettingsPanel({ onSettingsChange }: SettingsPanelProps = {}) {
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [fontSize, setFontSize] = useState([14]);
  const [language, setLanguage] = useState('ru');
  const [autoDownload, setAutoDownload] = useState(true);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize[0]}px`;
  }, [fontSize]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="flex-1 bg-background overflow-y-auto scrollbar-thin">
      <div className="max-w-3xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Настройки</h1>
          <p className="text-muted-foreground">Настройте мессенджер под себя</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Уведомления</CardTitle>
            <CardDescription>Управляйте уведомлениями о новых сообщениях</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Включить уведомления</Label>
                <p className="text-sm text-muted-foreground">
                  Получать уведомления о новых сообщениях
                </p>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={(value) => {
                  setNotifications(value);
                  onSettingsChange?.({ darkMode, fontSize: fontSize[0], notifications: value, soundEnabled });
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Звуки уведомлений</Label>
                <p className="text-sm text-muted-foreground">
                  Воспроизводить звук при получении сообщения
                </p>
              </div>
              <Switch
                checked={soundEnabled}
                onCheckedChange={(value) => {
                  setSoundEnabled(value);
                  onSettingsChange?.({ darkMode, fontSize: fontSize[0], notifications, soundEnabled: value });
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Автозагрузка медиа</Label>
                <p className="text-sm text-muted-foreground">
                  Автоматически загружать изображения и видео
                </p>
              </div>
              <Switch
                checked={autoDownload}
                onCheckedChange={setAutoDownload}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Внешний вид</CardTitle>
            <CardDescription>Настройте интерфейс приложения</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Темная тема</Label>
                <p className="text-sm text-muted-foreground">
                  Использовать темную цветовую схему
                </p>
              </div>
              <Switch
                checked={darkMode}
                onCheckedChange={(value) => {
                  setDarkMode(value);
                  onSettingsChange?.({ darkMode: value, fontSize: fontSize[0], notifications, soundEnabled });
                }}
              />
            </div>

            <div className="space-y-4">
              <Label className="text-base">Размер шрифта</Label>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">12px</span>
                <Slider
                  value={fontSize}
                  onValueChange={(value) => {
                    setFontSize(value);
                    onSettingsChange?.({ darkMode, fontSize: value[0], notifications, soundEnabled });
                  }}
                  min={12}
                  max={20}
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm font-semibold">{fontSize}px</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language" className="text-base">Язык интерфейса</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="language" className="bg-card">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ru">🇷🇺 Русский</SelectItem>
                  <SelectItem value="en">🇬🇧 English</SelectItem>
                  <SelectItem value="uk">🇺🇦 Українська</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Звонки</CardTitle>
            <CardDescription>Настройки голосовых и видео звонков</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start gap-3 p-4 bg-secondary/10 rounded-lg">
              <Icon name="Phone" size={24} className="text-secondary mt-0.5" />
              <div>
                <h4 className="font-semibold mb-1">Голосовые звонки</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Совершайте бесплатные голосовые звонки вашим друзьям
                </p>
                <Button variant="outline" size="sm">
                  <Icon name="Settings" size={16} className="mr-2" />
                  Настроить микрофон
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-primary/10 rounded-lg">
              <Icon name="Video" size={24} className="text-primary mt-0.5" />
              <div>
                <h4 className="font-semibold mb-1">Видео звонки</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Общайтесь лицом к лицу с высоким качеством HD
                </p>
                <Button variant="outline" size="sm">
                  <Icon name="Settings" size={16} className="mr-2" />
                  Настроить камеру
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Дополнительно</CardTitle>
            <CardDescription>Расширенные настройки и информация</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              <Icon name="Key" size={18} className="mr-2" />
              Управление ключами шифрования
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Icon name="Database" size={18} className="mr-2" />
              Очистить кэш (234 MB)
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Icon name="Download" size={18} className="mr-2" />
              Экспорт данных
            </Button>
            <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
              <Icon name="Trash2" size={18} className="mr-2" />
              Удалить аккаунт
            </Button>

            <div className="pt-4 border-t border-border">
              <div className="text-center text-sm text-muted-foreground">
                <p>Версия приложения: 2.1.0</p>
                <p className="mt-1">© 2026 Messenger. Все права защищены.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}