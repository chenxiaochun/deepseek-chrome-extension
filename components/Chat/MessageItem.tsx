import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { ChatMessage } from '@/types/chat';

interface MessageItemProps {
  message: ChatMessage;
}

export function MessageItem({ message }: MessageItemProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-7 ${
          isUser ? 'bg-[#4d6bfe] text-white' : 'bg-[#f3f4f6] text-gray-900'
        }`}
      >
        {!isUser && message.thinking ? (
          <details className="mb-3 rounded-lg bg-white/70 px-3 py-2 text-xs text-gray-600">
            <summary className="cursor-pointer font-medium">思考过程</summary>
            <div className="mt-2 whitespace-pre-wrap">{message.thinking}</div>
          </details>
        ) : null}
        {isUser ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : (
          <div className="prose prose-sm max-w-none prose-pre:bg-gray-900 prose-pre:text-gray-100">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content || '...'}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
