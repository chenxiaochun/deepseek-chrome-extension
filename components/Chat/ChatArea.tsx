import { useState } from 'react';
import { useChatStore } from '@/stores/chatStore';
import { MessageItem } from './MessageItem';

export function ChatArea() {
  const {
    currentSessionId,
    messages,
    stream,
    isLoadingMessages,
    error,
    sendMessage,
  } = useChatStore();
  const [input, setInput] = useState('');
  const [thinkingEnabled, setThinkingEnabled] = useState(false);
  const [searchEnabled, setSearchEnabled] = useState(true);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!input.trim() || stream.isStreaming) return;
    const value = input;
    setInput('');
    await sendMessage(value, { thinkingEnabled, searchEnabled });
  };

  return (
    <main className="flex min-w-0 flex-1 flex-col">
      <header className="flex items-center justify-between border-b border-gray-200 px-5 py-3">
        <div>
          <h2 className="text-sm font-medium text-gray-900">DeepSeek 对话</h2>
          <p className="text-xs text-gray-400">
            {currentSessionId ? '已与网页端账号同步' : '发送消息将自动创建新会话'}
          </p>
        </div>
      </header>

      <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
        {isLoadingMessages ? (
          <p className="text-sm text-gray-400">加载消息中...</p>
        ) : messages.length === 0 && !stream.isStreaming ? (
          <div className="flex h-full min-h-[320px] flex-col items-center justify-center text-center">
            <h3 className="text-lg font-medium text-gray-800">开始和 DeepSeek 对话</h3>
            <p className="mt-2 max-w-md text-sm text-gray-500">
              你的会话会保存在 DeepSeek 账号下，网页端和插件里看到的是同一份记录。
            </p>
          </div>
        ) : (
          messages.map((message) => <MessageItem key={message.id} message={message} />)
        )}

        {stream.isStreaming ? (
          <MessageItem
            message={{
              id: -1,
              role: 'assistant',
              content: stream.response,
              thinking: stream.thinking || undefined,
              status: 'streaming',
            }}
          />
        ) : null}
      </div>

      {error ? (
        <div className="mx-5 mb-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</div>
      ) : null}

      <form onSubmit={(event) => void handleSubmit(event)} className="border-t border-gray-200 p-4">
        <div className="mb-3 flex items-center gap-4 text-xs text-gray-500">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={thinkingEnabled}
              onChange={(event) => setThinkingEnabled(event.target.checked)}
            />
            深度思考
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={searchEnabled}
              onChange={(event) => setSearchEnabled(event.target.checked)}
            />
            联网搜索
          </label>
        </div>
        <div className="flex items-end gap-3 rounded-2xl border border-gray-200 bg-[#f9fafb] p-3">
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="给 DeepSeek 发送消息"
            rows={3}
            className="min-h-[72px] flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-gray-400"
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                void handleSubmit(event);
              }
            }}
          />
          <button
            type="submit"
            disabled={!input.trim() || stream.isStreaming}
            className="rounded-xl bg-[#4d6bfe] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#3d5be0] disabled:cursor-not-allowed disabled:opacity-50"
          >
            发送
          </button>
        </div>
      </form>
    </main>
  );
}
