export type ModelType = 'default' | 'expert';

export interface ChatSession {
  id: string;
  title: string;
  pinned?: boolean;
  updatedAt?: string;
  modelType?: ModelType;
}

export const MODEL_TYPE_LABELS: Record<ModelType, string> = {
  default: '快速模式',
  expert: '专家模式',
};

export interface ChatMessage {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  thinking?: string;
  status?: 'streaming' | 'done' | 'error';
}

export interface StreamState {
  thinking: string;
  response: string;
  isStreaming: boolean;
}
