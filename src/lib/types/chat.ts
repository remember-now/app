export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
}

export interface ActionSchema {
  name: string;
  description: string;
  parameters: Record<string, string>;
  schema: unknown;
  requiresConfirmation: boolean;
}

export interface ChatRequest {
  message: string;
  availableActions?: ActionSchema[];
}

export interface ChatResponse {
  message: string;
  actions?: Array<{
    name: string;
    params: Record<string, unknown>;
  }>;
}
