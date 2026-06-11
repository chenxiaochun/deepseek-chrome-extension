import { DEFAULT_THEME_ID, THEME_OPTIONS, type ThemeId } from '@/types/theme';
import { create } from 'zustand';

const STORAGE_KEY = 'ui_theme';

interface ThemeState {
  themeId: ThemeId;
  isReady: boolean;
  initTheme: () => Promise<void>;
  setTheme: (themeId: ThemeId) => Promise<void>;
}

function applyTheme(themeId: ThemeId) {
  document.documentElement.dataset.theme = themeId;
}

export const useThemeStore = create<ThemeState>((set) => ({
  themeId: DEFAULT_THEME_ID,
  isReady: false,

  initTheme: async () => {
    const stored = await chrome.storage.local.get([STORAGE_KEY]);
    const themeId = (stored[STORAGE_KEY] as ThemeId | undefined) ?? DEFAULT_THEME_ID;
    const validTheme = THEME_OPTIONS.some((item) => item.id === themeId) ? themeId : DEFAULT_THEME_ID;
    applyTheme(validTheme);
    set({ themeId: validTheme, isReady: true });
  },

  setTheme: async (themeId) => {
    applyTheme(themeId);
    await chrome.storage.local.set({ [STORAGE_KEY]: themeId });
    set({ themeId });
  },
}));
