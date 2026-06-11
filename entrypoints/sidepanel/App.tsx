import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { LoginPrompt } from '@/components/Auth/LoginPrompt';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { ChatArea } from '@/components/Chat/ChatArea';
import { ThemeSwitcher } from '@/components/Theme/ThemeSwitcher';
import { useAuthStore } from '@/stores/authStore';
import { useChatStore } from '@/stores/chatStore';
import { useThemeStore } from '@/stores/themeStore';

export default function App() {
  const { token, isLoading, checkAuth, listenTokenUpdates } = useAuthStore();
  const { loadSessions, reset } = useChatStore();
  const { isReady, initTheme } = useThemeStore();

  useEffect(() => {
    void initTheme();
    void checkAuth();
    return listenTokenUpdates();
  }, [initTheme, checkAuth, listenTokenUpdates]);

  useEffect(() => {
    if (token) {
      void loadSessions();
    } else {
      reset();
    }
  }, [token, loadSessions, reset]);

  if (!isReady || isLoading) {
    return (
      <div className="bg-background relative flex h-full flex-col items-center justify-center gap-3 px-6">
        <div className="absolute top-3 right-3 z-10">
          <ThemeSwitcher />
        </div>
        <Skeleton className="h-10 w-40" />
        <p className="text-muted-foreground text-sm">加载中...</p>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="relative h-full">
        <div className="absolute top-3 right-3 z-10">
          <ThemeSwitcher />
        </div>
        <LoginPrompt />
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground relative flex h-full min-h-0 overflow-hidden">
      <div className="absolute top-3 right-3 z-10">
        <ThemeSwitcher />
      </div>
      <Sidebar />
      <ChatArea />
    </div>
  );
}
