import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useChatStore } from '@/stores/chatStore';
import { useAuthStore } from '@/stores/authStore';
import { MODEL_TYPE_LABELS } from '@/types/chat';
import { cn } from '@/lib/utils';
import { NewChatButton } from './NewChatButton';

export function Sidebar() {
  const { sessions, currentSessionId, isLoadingSessions, selectSession, deleteSession } = useChatStore();
  const { logout } = useAuthStore();

  return (
    <aside className="bg-sidebar text-sidebar-foreground border-sidebar-border flex min-h-0 w-[260px] shrink-0 flex-col overflow-hidden border-r">
      <div className="border-sidebar-border shrink-0 border-b p-3">
        <NewChatButton />
      </div>

      <ScrollArea className="min-h-0 flex-1 p-2">
        {isLoadingSessions ? (
          <div className="space-y-2 px-2 py-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : sessions.length === 0 ? (
          <p className="text-muted-foreground px-2 py-3 text-xs">暂无历史会话</p>
        ) : (
          <ul className="space-y-1">
            {sessions.map((session) => {
              const active = session.id === currentSessionId;
              return (
                <li key={session.id} className="group relative">
                  <button
                    type="button"
                    onClick={() => void selectSession(session.id)}
                    className={cn(
                      'w-full rounded-lg px-3 py-2.5 text-left text-sm transition',
                      active
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm'
                        : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground',
                    )}
                  >
                    <span className="line-clamp-2">{session.title}</span>
                    {session.modelType ? (
                      <span className="text-muted-foreground mt-1 block text-[11px]">
                        {MODEL_TYPE_LABELS[session.modelType]}
                      </span>
                    ) : null}
                  </button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="删除会话"
                    onClick={() => void deleteSession(session.id)}
                    className="text-muted-foreground hover:text-destructive absolute top-1/2 right-1 hidden size-7 -translate-y-1/2 group-hover:inline-flex"
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
      </ScrollArea>

      <Separator className="shrink-0" />
      <div className="shrink-0 p-3">
        <Button variant="ghost" className="w-full justify-start" onClick={() => void logout()}>
          退出登录
        </Button>
      </div>
    </aside>
  );
}
