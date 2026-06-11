import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'wxt';

export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  vite: () => ({
    plugins: [tailwindcss()],
  }),
  manifest: {
    name: 'DeepSeek',
    description: 'DeepSeek 聊天助手，与网页端会话同步',
    permissions: ['storage', 'sidePanel', 'webRequest', 'cookies', 'tabs'],
    host_permissions: ['https://chat.deepseek.com/*'],
    side_panel: {
      default_path: 'sidepanel.html',
    },
    action: {
      default_title: '打开 DeepSeek',
    },
    web_accessible_resources: [
      {
        resources: ['sha3_wasm_bg.wasm'],
        matches: ['<all_urls>'],
      },
    ],
    content_security_policy: {
      extension_pages: "script-src 'self' 'wasm-unsafe-eval'; object-src 'self'",
    },
  },
});
