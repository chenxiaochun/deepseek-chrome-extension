import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/authStore';

export function LoginPrompt() {
  const { openLogin } = useAuthStore();

  return (
    <div className="bg-background flex h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="bg-primary text-primary-foreground flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold">
        D
      </div>
      <div className="space-y-2">
        <h1 className="text-xl font-semibold">登录 DeepSeek</h1>
        <p className="text-muted-foreground max-w-xs text-sm leading-6">
          使用 chat.deepseek.com 官方账号登录，会话记录将与网页端同步。
        </p>
      </div>
      <Button onClick={() => void openLogin()}>前往登录</Button>
      <p className="text-muted-foreground max-w-sm text-xs leading-5">
        点击后会在新标签页打开 chat.deepseek.com，完成登录后返回侧边栏即可自动识别。
      </p>
    </div>
  );
}
