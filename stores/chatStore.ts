import { createDeepSeekClient } from '@/services/deepseekClient';
import type { ChatMessage, ChatSession, ModelType, StreamState } from '@/types/chat';
import { create } from 'zustand';

interface ChatState {
  sessions: ChatSession[];
  currentSessionId: string | null;
  currentModelType: ModelType;
  messages: ChatMessage[];
  isLoadingSessions: boolean;
  isLoadingMessages: boolean;
  stream: StreamState;
  error: string | null;
  loadSessions: () => Promise<void>;
  selectSession: (sessionId: string) => Promise<void>;
  createSession: (modelType: ModelType) => Promise<void>;
  setCurrentModelType: (modelType: ModelType) => void;
  deleteSession: (sessionId: string) => Promise<void>;
  sendMessage: (
    prompt: string,
    options?: { thinkingEnabled?: boolean; searchEnabled?: boolean; modelType?: ModelType },
  ) => Promise<void>;
  reset: () => void;
}

const emptyStream: StreamState = {
  thinking: '',
  response: '',
  isStreaming: false,
};

export const useChatStore = create<ChatState>((set, get) => ({
  sessions: [],
  currentSessionId: null,
  currentModelType: 'default',
  messages: [],
  isLoadingSessions: false,
  isLoadingMessages: false,
  stream: emptyStream,
  error: null,

  reset: () => {
    set({
      sessions: [],
      currentSessionId: null,
      currentModelType: 'default',
      messages: [],
      stream: emptyStream,
      error: null,
    });
  },

  loadSessions: async () => {
    set({ isLoadingSessions: true, error: null });
    try {
      const client = await createDeepSeekClient();
      const sessions = await client.listAllSessions();
      set({
        sessions: sessions.map((s) => ({
          id: s.id,
          title: s.title || '新对话',
          pinned: s.pinned,
          updatedAt: String(s.updated_at),
          modelType: normalizeModelType(s.model_type),
        })),
        isLoadingSessions: false,
      });
    } catch (error) {
      set({
        isLoadingSessions: false,
        error: error instanceof Error ? error.message : '加载会话失败',
      });
    }
  },

  selectSession: async (sessionId) => {
    const session = get().sessions.find((item) => item.id === sessionId);
    set({
      currentSessionId: sessionId,
      currentModelType: session?.modelType ?? 'default',
      isLoadingMessages: true,
      error: null,
      messages: [],
    });
    try {
      const client = await createDeepSeekClient();
      const history = await client.getHistoryMessages(sessionId);
      const messages: ChatMessage[] = (history.chat_messages ?? []).map((msg) => {
        const request = msg.fragments.find((f) => f.type === 'REQUEST')?.content ?? '';
        const response = msg.fragments.find((f) => f.type === 'RESPONSE')?.content ?? '';
        const thinking = msg.fragments
          .filter((f) => f.type === 'THINKING' || f.type === 'THINK')
          .map((f) => f.content ?? '')
          .join('\n');

        return {
          id: msg.message_id,
          role: msg.role === 'USER' ? 'user' : 'assistant',
          content: msg.role === 'USER' ? request : response,
          thinking: thinking || undefined,
          status: 'done',
        };
      });
      set({
        messages,
        currentModelType: normalizeModelType(history.chat_session.model_type),
        isLoadingMessages: false,
      });
    } catch (error) {
      set({
        isLoadingMessages: false,
        error: error instanceof Error ? error.message : '加载消息失败',
      });
    }
  },

  setCurrentModelType: (modelType) => {
    set({ currentModelType: modelType });
  },

  createSession: async (modelType) => {
    set({ error: null });
    try {
      const client = await createDeepSeekClient();
      const session = await client.createSession();
      await get().loadSessions();
      set({
        currentSessionId: session.id,
        currentModelType: modelType,
        messages: [],
      });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : '创建会话失败' });
    }
  },

  deleteSession: async (sessionId) => {
    set({ error: null });
    try {
      const client = await createDeepSeekClient();
      await client.deleteSession(sessionId);
      const { currentSessionId } = get();
      await get().loadSessions();
      if (currentSessionId === sessionId) {
        set({ currentSessionId: null, currentModelType: 'default', messages: [] });
      }
    } catch (error) {
      set({ error: error instanceof Error ? error.message : '删除会话失败' });
    }
  },

  sendMessage: async (prompt, options = {}) => {
    const { currentSessionId, currentModelType, messages } = get();
    if (!prompt.trim()) return;

    let sessionId = currentSessionId;
    const modelType = options.modelType ?? currentModelType;
    const client = await createDeepSeekClient();

    if (!sessionId) {
      const session = await client.createSession();
      sessionId = session.id;
      set({ currentSessionId: sessionId, currentModelType: modelType });
      await get().loadSessions();
    }

    const userMessage: ChatMessage = {
      id: Date.now(),
      role: 'user',
      content: prompt.trim(),
      status: 'done',
    };

    const assistantId = Date.now() + 1;
    set({
      messages: [...messages, userMessage],
      stream: { thinking: '', response: '', isStreaming: true },
      error: null,
    });

    try {
      for await (const event of client.sendMessage({
        chatSessionId: sessionId,
        prompt: prompt.trim(),
        modelType,
        thinkingEnabled: options.thinkingEnabled ?? false,
        searchEnabled: options.searchEnabled ?? true,
      })) {
        const { stream } = get();
        if (event.type === 'thinking') {
          set({ stream: { ...stream, thinking: stream.thinking + event.content } });
        } else if (event.type === 'response') {
          set({ stream: { ...stream, response: stream.response + event.content } });
        } else if (event.type === 'title') {
          await get().loadSessions();
        } else if (event.type === 'done') {
          const finalStream = get().stream;
          const assistantMessage: ChatMessage = {
            id: assistantId,
            role: 'assistant',
            content: finalStream.response,
            thinking: finalStream.thinking || undefined,
            status: 'done',
          };
          set({
            messages: [...get().messages, assistantMessage],
            stream: emptyStream,
          });
        }
      }
    } catch (error) {
      set({
        stream: emptyStream,
        error: error instanceof Error ? error.message : '发送失败',
      });
    }
  },
}));

function normalizeModelType(modelType?: string | null): ModelType {
  return modelType === 'expert' ? 'expert' : 'default';
}
