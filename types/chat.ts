export interface ChatSession {
  id: string;
  title: string;
  pinned?: boolean;
  updatedAt?: string;
}

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
