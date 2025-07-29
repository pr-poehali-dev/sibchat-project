import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  avatar: string;
  isEncrypted: boolean;
  unreadCount?: number;
  type: 'personal' | 'group' | 'channel';
}

interface User {
  name: string;
  status: string;
  avatar: string;
}

const SibCHAT: React.FC = () => {
  const [activeTab, setActiveTab] = useState('chats');
  const [searchQuery, setSearchQuery] = useState('');

  // Моковые данные для демонстрации
  const chats: Chat[] = [
    {
      id: '1',
      name: 'Медведь Михалыч',
      lastMessage: 'Привет, как дела в тайге?',
      time: '14:32',
      avatar: '🐻',
      isEncrypted: true,
      unreadCount: 2,
      type: 'personal'
    },
    {
      id: '2',
      name: 'Байкальские Рыбаки',
      lastMessage: 'Завтра идём на лёд! 🎣',
      time: '13:15',
      avatar: '🎣',
      isEncrypted: true,
      unreadCount: 5,
      type: 'group'
    },
    {
      id: '3',
      name: 'Новости Сибири',
      lastMessage: 'Сегодня северное сияние будет особенно ярким',
      time: '12:08',
      avatar: '🌌',
      isEncrypted: false,
      type: 'channel'
    },
    {
      id: '4',
      name: 'Соболь Серёжа',
      lastMessage: 'В тайге связь плохая, пишу позже',
      time: '11:45',
      avatar: '🦫',
      isEncrypted: true,
      type: 'personal'
    }
  ];

  const user: User = {
    name: 'Иван Северный',
    status: 'В тайге, но на связи',
    avatar: '🧊'
  };

  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case 'chats': return 'MessageCircle';
      case 'groups': return 'Users';
      case 'channels': return 'Radio';
      case 'profile': return 'User';
      case 'taiga': return 'MapPin';
      case 'settings': return 'Settings';
      case 'archive': return 'Archive';
      case 'shaman': return 'Sparkles';
      default: return 'MessageCircle';
    }
  };

  const getTabLabel = (tab: string) => {
    switch (tab) {
      case 'chats': return 'Чаты';
      case 'groups': return 'Стойбища';
      case 'channels': return 'Каналы';
      case 'profile': return 'Избушка';
      case 'taiga': return 'Тайга';
      case 'settings': return 'Настройки';
      case 'archive': return 'Ледяной ящик';
      case 'shaman': return 'Шаман-бот';
      default: return tab;
    }
  };

  const renderChatItem = (chat: Chat) => (
    <Card key={chat.id} className="mb-3 hover:bg-secondary/50 transition-all duration-200 cursor-pointer group bear-tracks">
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="text-xl bg-gradient-to-br from-siberian-ice to-siberian-river">
                {chat.avatar}
              </AvatarFallback>
            </Avatar>
            {chat.isEncrypted && (
              <div className="absolute -bottom-1 -right-1 bg-siberian-forest rounded-full p-1">
                <Icon name="Shield" size={12} className="text-white" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-montserrat font-semibold text-foreground truncate">
                {chat.name}
              </h3>
              <div className="flex items-center space-x-2">
                {chat.unreadCount && (
                  <Badge variant="destructive" className="bg-siberian-sunset">
                    {chat.unreadCount}
                  </Badge>
                )}
                <span className="text-sm text-muted-foreground">{chat.time}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground truncate mt-1">
              {chat.lastMessage}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      {/* Профиль пользователя */}
      <Card className="aurora relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="snowflake absolute top-4 left-4 text-white">❄️</div>
          <div className="snowflake absolute top-8 right-8 text-white" style={{animationDelay: '1s'}}>❄️</div>
          <div className="snowflake absolute bottom-6 left-1/2 text-white" style={{animationDelay: '2s'}}>❄️</div>
        </div>
        <CardContent className="p-6 text-center relative z-10">
          <Avatar className="h-24 w-24 mx-auto mb-4 border-4 border-white/50">
            <AvatarFallback className="text-4xl bg-transparent">
              {user.avatar}
            </AvatarFallback>
          </Avatar>
          <h2 className="font-montserrat text-2xl font-bold text-white mb-2">{user.name}</h2>
          <p className="text-white/90">{user.status}</p>
        </CardContent>
      </Card>

      {/* Статистика */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-siberian-forest">127</div>
            <div className="text-sm text-muted-foreground">Сообщений</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-siberian-sunset">8</div>
            <div className="text-sm text-muted-foreground">Стойбищ</div>
          </CardContent>
        </Card>
      </div>

      {/* Настройки профиля */}
      <Card>
        <CardHeader>
          <CardTitle className="font-montserrat flex items-center gap-2">
            <Icon name="Settings" size={20} />
            Настройки избушки
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="ghost" className="w-full justify-start">
            <Icon name="Palette" size={18} className="mr-3" />
            Сменить окрас шкуры
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Icon name="Bell" size={18} className="mr-3" />
            Звуки тайги
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Icon name="Shield" size={18} className="mr-3" />
            Защита от медведей
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderTaiga = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-montserrat flex items-center gap-2">
            <Icon name="MapPin" size={20} />
            Карта тайги
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-br from-siberian-forest to-siberian-river rounded-lg h-48 flex items-center justify-center text-white">
            <div className="text-center">
              <Icon name="Map" size={48} className="mx-auto mb-2" />
              <p className="font-montserrat">Оффлайн карты загружаются...</p>
              <p className="text-sm opacity-75">Готовим маршруты для охотников и рыбаков</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Icon name="Thermometer" size={24} className="mx-auto mb-2 text-siberian-river" />
            <div className="font-bold">-15°C</div>
            <div className="text-sm text-muted-foreground">Температура</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Icon name="Wind" size={24} className="mx-auto mb-2 text-siberian-sunset" />
            <div className="font-bold">12 км/ч</div>
            <div className="text-sm text-muted-foreground">Северный ветер</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderShaman = () => (
    <div className="space-y-6">
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-siberian-sunset/20 to-siberian-forest/20"></div>
        <CardHeader className="relative z-10">
          <CardTitle className="font-montserrat flex items-center gap-2">
            <Icon name="Sparkles" size={20} />
            Шаман-бот
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🔮</div>
            <h3 className="font-montserrat text-xl font-bold mb-2">Мудрый шаман приветствует тебя!</h3>
            <p className="text-muted-foreground mb-6">Задай вопрос духам тайги или узнай прогноз погоды</p>
            
            <div className="space-y-3">
              <Button className="w-full bg-siberian-forest hover:bg-siberian-forest/90">
                <Icon name="CloudSnow" size={18} className="mr-2" />
                Прогноз погоды
              </Button>
              <Button variant="outline" className="w-full">
                <Icon name="Heart" size={18} className="mr-2" />
                Гадание на любовь
              </Button>
              <Button variant="outline" className="w-full">
                <Icon name="TrendingUp" size={18} className="mr-2" />
                Предсказание удачи
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-montserrat text-lg">Последние предсказания</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm">"Завтра северное сияние подарит удачу в рыбалке"</p>
            <span className="text-xs text-muted-foreground">2 часа назад</span>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm">"Берегись медведя на восточной тропе"</p>
            <span className="text-xs text-muted-foreground">Вчера</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Заголовок */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-siberian-forest to-siberian-river rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <div>
                <h1 className="font-montserrat text-xl font-bold text-foreground">SibCHAT</h1>
                <p className="text-xs text-muted-foreground">Сибирский мессенджер</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Icon name="Search" size={18} />
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="Plus" size={18} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Навигация */}
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-6 bg-muted">
            {['chats', 'groups', 'channels', 'profile', 'taiga', 'settings', 'archive', 'shaman'].map((tab) => (
              <TabsTrigger 
                key={tab} 
                value={tab} 
                className="flex flex-col items-center p-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Icon name={getTabIcon(tab)} size={16} />
                <span className="text-xs mt-1 hidden lg:block">{getTabLabel(tab)}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Чаты */}
          <TabsContent value="chats" className="space-y-4">
            <div className="relative">
              <Icon name="Search" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Поиск в чатах..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="space-y-2">
              {filteredChats.map(renderChatItem)}
            </div>
          </TabsContent>

          {/* Стойбища (группы) */}
          <TabsContent value="groups" className="space-y-4">
            <div className="space-y-2">
              {filteredChats.filter(chat => chat.type === 'group').map(renderChatItem)}
            </div>
            {filteredChats.filter(chat => chat.type === 'group').length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Icon name="Users" size={48} className="mx-auto mb-4 opacity-50" />
                <p>Стойбища не найдены</p>
              </div>
            )}
          </TabsContent>

          {/* Каналы */}
          <TabsContent value="channels" className="space-y-4">
            <div className="space-y-2">
              {filteredChats.filter(chat => chat.type === 'channel').map(renderChatItem)}
            </div>
          </TabsContent>

          {/* Избушка (профиль) */}
          <TabsContent value="profile">
            {renderProfile()}
          </TabsContent>

          {/* Тайга (карты) */}
          <TabsContent value="taiga">
            {renderTaiga()}
          </TabsContent>

          {/* Настройки */}
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-montserrat">Настройки</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="ghost" className="w-full justify-start">
                  <Icon name="Moon" size={18} className="mr-3" />
                  Полярная ночь (тёмная тема)
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Icon name="Volume2" size={18} className="mr-3" />
                  Звуки сибирской природы
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Icon name="Languages" size={18} className="mr-3" />
                  Языки народов Сибири
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Ледяной ящик (архив) */}
          <TabsContent value="archive" className="space-y-4">
            <div className="text-center py-8 text-muted-foreground">
              <Icon name="Archive" size={48} className="mx-auto mb-4 opacity-50" />
              <p>Архивированные чаты заморожены</p>
              <p className="text-sm">Здесь будут храниться старые беседы</p>
            </div>
          </TabsContent>

          {/* Шаман-бот */}
          <TabsContent value="shaman">
            {renderShaman()}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SibCHAT;