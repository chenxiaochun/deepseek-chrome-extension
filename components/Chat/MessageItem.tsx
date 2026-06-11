import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import type { ChatMessage } from '@/types/chat';

interface MessageItemProps {
  message: ChatMessage;
}

export function MessageItem({ message }: MessageItemProps) {
  const isUser = message.role === 'user';

  return (
    <div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-7',
          isUser ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground',
        )}
      >
        {!isUser && message.thinking ? (
          <Collapsible className="mb-3">
            <CollapsibleTrigger className="text-muted-foreground hover:text-foreground w-full rounded-lg bg-background/70 px-3 py-2 text-left text-xs font-medium">
              思考过程
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 whitespace-pre-wrap px-1 text-xs">
              {message.thinking}
            </CollapsibleContent>
          </Collapsible>
        ) : null}
        {isUser ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : (
          <div className="[&_pre]:overflow-x-auto [&_code]:rounded [&_code]:bg-background/80 [&_code]:px-1 [&_p]:my-2 [&_ul]:my-2 [&_ol]:my-2">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content || '...'}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
