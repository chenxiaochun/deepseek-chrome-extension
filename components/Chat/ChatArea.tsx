import { useEffect, useRef, useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useChatStore } from '@/stores/chatStore';
import type { ModelType } from '@/types/chat';
import { MODEL_TYPE_LABELS } from '@/types/chat';
import { MessageItem } from './MessageItem';

export function ChatArea() {
  const {
    currentSessionId,
    currentModelType,
    messages,
    stream,
    isLoadingMessages,
    error,
    sendMessage,
    setCurrentModelType,
  } = useChatStore();
  const [input, setInput] = useState('');
  const [thinkingEnabled, setThinkingEnabled] = useState(false);
  const [searchEnabled, setSearchEnabled] = useState(true);
  const messagesRef = useRef<HTMLDivElement>(null);
  const shouldStickToBottomRef = useRef(true);

  useEffect(() => {
    const container = messagesRef.current;
    if (!container || !shouldStickToBottomRef.current) return;
    container.scrollTop = container.scrollHeight;
  }, [messages, stream.thinking, stream.response, stream.isStreaming, isLoadingMessages]);

  const handleMessagesScroll = () => {
    const container = messagesRef.current;
    if (!container) return;
    const distanceFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
    shouldStickToBottomRef.current = distanceFromBottom < 80;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!input.trim() || stream.isStreaming) return;
    const value = input;
    setInput('');
    shouldStickToBottomRef.current = true;
    await sendMessage(value, { thinkingEnabled, searchEnabled });
  };

  return (
    <main className="bg-background flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
      <header className="border-border shrink-0 flex items-center justify-between border-b px-5 py-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-medium">DeepSeek 对话</h2>
            <Badge variant="secondary">{MODEL_TYPE_LABELS[currentModelType]}</Badge>
          </div>
          <p className="text-muted-foreground text-xs">
            {currentSessionId ? '已与网页端账号同步' : '发送消息将按当前模式自动创建新会话'}
          </p>
        </div>
      </header>

      <div
        ref={messagesRef}
        onScroll={handleMessagesScroll}
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4"
      >
        <div className="space-y-4">
          {isLoadingMessages ? (
            <div className="space-y-3">
              <Skeleton className="h-16 w-2/3" />
              <Skeleton className="h-24 w-3/4" />
            </div>
          ) : messages.length === 0 && !stream.isStreaming ? (
            <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
              <h3 className="text-lg font-medium">开始和 DeepSeek 对话</h3>
              <p className="text-muted-foreground mt-2 max-w-md text-sm">
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
      </div>

      {error ? (
        <Alert variant="destructive" className="mx-5 mb-2 shrink-0">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}

      <Separator className="shrink-0" />
      <form onSubmit={(event) => void handleSubmit(event)} className="shrink-0 p-4">
        <div className="mb-3 flex flex-wrap items-center gap-4">
          {!currentSessionId ? (
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-xs">模式</span>
              <ToggleGroup
                type="single"
                size="sm"
                value={currentModelType}
                onValueChange={(value) => {
                  if (value) setCurrentModelType(value as ModelType);
                }}
              >
                {(['default', 'expert'] as ModelType[]).map((mode) => (
                  <ToggleGroupItem key={mode} value={mode}>
                    {MODEL_TYPE_LABELS[mode]}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          ) : null}

          <Label className="text-muted-foreground text-xs font-normal">
            <Checkbox checked={thinkingEnabled} onCheckedChange={(checked) => setThinkingEnabled(checked === true)} />
            深度思考
          </Label>
          <Label className="text-muted-foreground text-xs font-normal">
            <Checkbox checked={searchEnabled} onCheckedChange={(checked) => setSearchEnabled(checked === true)} />
            联网搜索
          </Label>
        </div>

        <div className="bg-muted/40 border-input flex items-end gap-3 rounded-2xl border p-3">
          <Textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="给 DeepSeek 发送消息"
            rows={3}
            className="min-h-[72px] flex-1 resize-none border-0 bg-transparent shadow-none focus-visible:ring-0"
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                void handleSubmit(event);
              }
            }}
          />
          <Button type="submit" disabled={!input.trim() || stream.isStreaming}>
            发送
          </Button>
        </div>
      </form>
    </main>
  );
}
