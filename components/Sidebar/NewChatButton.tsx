import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useChatStore } from '@/stores/chatStore';
import type { ModelType } from '@/types/chat';
import { MODEL_TYPE_LABELS } from '@/types/chat';

const MODE_OPTIONS: Array<{ value: ModelType; description: string }> = [
  { value: 'default', description: '响应更快，适合日常问答' },
  { value: 'expert', description: '能力更强，适合复杂任务' },
];

export function NewChatButton() {
  const { createSession } = useChatStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full">
          <Plus className="size-4" />
          新对话
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[var(--radix-dropdown-menu-trigger-width)]">
        <DropdownMenuLabel>选择对话模式</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {MODE_OPTIONS.map((option) => (
          <DropdownMenuItem
            key={option.value}
            className="flex flex-col items-start gap-0.5 py-3"
            onClick={() => void createSession(option.value)}
          >
            <span className="font-medium">{MODEL_TYPE_LABELS[option.value]}</span>
            <span className="text-muted-foreground text-xs">{option.description}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
