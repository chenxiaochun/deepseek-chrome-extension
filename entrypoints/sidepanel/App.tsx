import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useChatStore } from '@/stores/chatStore';
import { LoginPrompt } from '@/components/Auth/LoginPrompt';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { ChatArea } from '@/components/Chat/ChatArea';

export default function App() {
  const { token, isLoading, checkAuth, listenTokenUpdates } = useAuthStore();
  const { loadSessions, reset } = useChatStore();

  useEffect(() => {
    void checkAuth();
    return listenTokenUpdates();
  }, [checkAuth, listenTokenUpdates]);

  useEffect(() => {
    if (token) {
      void loadSessions();
    } else {
      reset();
    }
  }, [token, loadSessions, reset]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f9fafb] text-sm text-gray-500">
        加载中...
      </div>
    );
  }

  if (!token) {
    return <LoginPrompt />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-white text-gray-900">
      <Sidebar />
      <ChatArea />
    </div>
  );
}
