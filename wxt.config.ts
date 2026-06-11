import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'wxt';

export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  vite: () => ({
    plugins: [tailwindcss()],
  }),
  manifest: {
    name: 'DeepSeek 侧边栏助手（非官方）',
    description:
      '在浏览器侧边栏使用 DeepSeek 网页账号聊天，与 chat.deepseek.com 同步会话。非 DeepSeek 官方产品。',
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
