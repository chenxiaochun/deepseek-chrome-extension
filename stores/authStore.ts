import { create } from 'zustand';

interface AuthState {
  token: string | null;
  isLoading: boolean;
  checkAuth: () => Promise<void>;
  listenTokenUpdates: () => () => void;
  openLogin: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isLoading: true,

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const response = await chrome.runtime.sendMessage({ type: 'GET_TOKEN' });
      set({ token: response?.token ?? null, isLoading: false });
    } catch {
      set({ token: null, isLoading: false });
    }
  },

  listenTokenUpdates: () => {
    const listener = (message: { type?: string }) => {
      if (message.type === 'TOKEN_UPDATED') {
        void useAuthStore.getState().checkAuth();
      }
    };
    chrome.runtime.onMessage.addListener(listener);
    return () => chrome.runtime.onMessage.removeListener(listener);
  },

  openLogin: async () => {
    await chrome.runtime.sendMessage({ type: 'OPEN_LOGIN' });
  },

  logout: async () => {
    await chrome.storage.local.remove(['deepseekToken']);
    set({ token: null });
  },
}));
