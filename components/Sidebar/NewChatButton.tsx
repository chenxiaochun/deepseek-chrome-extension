import { useEffect, useRef, useState } from 'react';
import { useChatStore } from '@/stores/chatStore';
import type { ModelType } from '@/types/chat';
import { MODEL_TYPE_LABELS } from '@/types/chat';

const MODE_OPTIONS: Array<{ value: ModelType; description: string }> = [
  { value: 'default', description: '响应更快，适合日常问答' },
  { value: 'expert', description: '能力更强，适合复杂任务' },
];

export function NewChatButton() {
  const { createSession } = useChatStore();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const handleCreate = async (modelType: ModelType) => {
    setOpen(false);
    await createSession(modelType);
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-800 transition hover:bg-gray-50"
      >
        <span className="text-lg leading-none">+</span>
        新对话
      </button>

      {open ? (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          <div className="border-b border-gray-100 px-3 py-2 text-xs text-gray-400">选择对话模式</div>
          {MODE_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => void handleCreate(option.value)}
              className="flex w-full flex-col items-start gap-0.5 px-3 py-3 text-left transition hover:bg-[#f5f7ff]"
            >
              <span className="text-sm font-medium text-gray-900">{MODEL_TYPE_LABELS[option.value]}</span>
              <span className="text-xs text-gray-500">{option.description}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
