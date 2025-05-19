export type Message = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
};

export type AssistantState = {
  messages: Message[];
  isProcessing: boolean;
  error: Error | null;
  isInitialized: boolean;
  context: {
    userPreferences: Record<string, string>;
    memories: string[];
  };
};

export type AssistantAction =
  | { type: 'INITIALIZE'; payload: Partial<AssistantState> }
  | { type: 'SEND_MESSAGE'; payload: string }
  | { type: 'RECEIVE_MESSAGE'; payload: string }
  | { type: 'PROCESSING_START' }
  | { type: 'PROCESSING_END' }
  | { type: 'ERROR'; payload: Error };
