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

// ─── ACTION SYSTEM ──────────────────────

export type AssistantAction =
  | { type: 'INITIALIZE'; payload: Partial<AssistantState> }
  | { type: 'SEND_MESSAGE'; payload: string }
  | { type: 'RECEIVE_MESSAGE'; payload: string }
  | { type: 'PROCESSING_START' }
  | { type: 'PROCESSING_END' }
  | { type: 'ERROR'; payload: Error };

export type MessageResponse = {
  response: string;
  actions: ActionRequest[];
};

export type ActionParameters = Record<string, unknown>;
export type ActionResultData = unknown;

export type ActionExecutionState =
  | { status: 'pending'; actionId: string; action: string; params: ActionParameters }
  | {
      status: 'awaiting_confirmation';
      actionId: string;
      action: string;
      params: ActionParameters;
      prompt: string;
    }
  | { status: 'executing'; actionId: string; action: string; params: ActionParameters }
  | { status: 'completed'; actionId: string; action: string; result: ActionResultData }
  | { status: 'cancelled'; actionId: string; action: string }
  | { status: 'error'; actionId: string; action: string; error: string };

export type ActionExecutionObserver = {
  onStateChange: (state: ActionExecutionState) => void;
};

export type ActionRequest = {
  name: string;
  params: unknown; // Will be validated with Zod schemas
};
