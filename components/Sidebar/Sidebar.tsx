import { useChatStore } from '@/stores/chatStore';
import { useAuthStore } from '@/stores/authStore';

export function Sidebar() {
  const { sessions, currentSessionId, isLoadingSessions, createSession, selectSession, deleteSession } =
    useChatStore();
  const { logout } = useAuthStore();

  return (
    <aside className="flex w-[260px] shrink-0 flex-col border-r border-gray-200 bg-[#f9fafb]">
      <div className="border-b border-gray-200 p-3">
        <button
          type="button"
          onClick={() => void createSession()}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-800 transition hover:bg-gray-50"
        >
          <span className="text-lg leading-none">+</span>
          新对话
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {isLoadingSessions ? (
          <p className="px-2 py-3 text-xs text-gray-400">加载会话中...</p>
        ) : sessions.length === 0 ? (
          <p className="px-2 py-3 text-xs text-gray-400">暂无历史会话</p>
        ) : (
          <ul className="space-y-1">
            {sessions.map((session) => {
              const active = session.id === currentSessionId;
              return (
                <li key={session.id} className="group relative">
                  <button
                    type="button"
                    onClick={() => void selectSession(session.id)}
                    className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition ${
                      active
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:bg-white/70 hover:text-gray-900'
                    }`}
                  >
                    <span className="line-clamp-2">{session.title}</span>
                  </button>
                  <button
                    type="button"
                    aria-label="删除会话"
                    onClick={() => void deleteSession(session.id)}
                    className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded px-1.5 py-0.5 text-xs text-gray-400 hover:bg-red-50 hover:text-red-500 group-hover:block"
                  >
                    删除
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="border-t border-gray-200 p-3">
        <button
          type="button"
          onClick={() => void logout()}
          className="w-full rounded-lg px-3 py-2 text-left text-sm text-gray-500 transition hover:bg-white hover:text-gray-800"
        >
          退出登录
        </button>
      </div>
    </aside>
  );
}
