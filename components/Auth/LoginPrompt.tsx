import { useAuthStore } from '@/stores/authStore';

export function LoginPrompt() {
  const { openLogin } = useAuthStore();

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6 bg-[#f9fafb] px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#4d6bfe] text-2xl font-bold text-white">
        D
      </div>
      <div className="space-y-2">
        <h1 className="text-xl font-semibold text-gray-900">登录 DeepSeek</h1>
        <p className="max-w-xs text-sm leading-6 text-gray-500">
          使用 chat.deepseek.com 官方账号登录，会话记录将与网页端同步。
        </p>
      </div>
      <button
        type="button"
        onClick={() => void openLogin()}
        className="rounded-xl bg-[#4d6bfe] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#3d5be0]"
      >
        前往登录
      </button>
      <p className="max-w-sm text-xs leading-5 text-gray-400">
        点击后会在新标签页打开 chat.deepseek.com，完成登录后返回侧边栏即可自动识别。
      </p>
    </div>
  );
}
