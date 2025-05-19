import { AssistantState, AssistantAction } from './types';
import { v4 as uuidv4 } from 'uuid';

export const initialState: AssistantState = {
  messages: [],
  isProcessing: false,
  error: null,
  isInitialized: false,
  context: {
    userPreferences: {},
    memories: [],
  },
};

export function assistantReducer(state: AssistantState, action: AssistantAction): AssistantState {
  switch (action.type) {
    case 'INITIALIZE':
      return { ...state, ...action.payload, isInitialized: true };

    case 'SEND_MESSAGE': {
      const userMessage = {
        id: uuidv4(),
        content: action.payload,
        role: 'user' as const,
        timestamp: Date.now(),
      };
      return {
        ...state,
        messages: [...state.messages, userMessage],
        isProcessing: true,
      };
    }

    case 'RECEIVE_MESSAGE': {
      const assistantMessage = {
        id: uuidv4(),
        content: action.payload,
        role: 'assistant' as const,
        timestamp: Date.now(),
      };
      return {
        ...state,
        messages: [...state.messages, assistantMessage],
        isProcessing: false,
      };
    }

    case 'PROCESSING_START':
      return { ...state, isProcessing: true };

    case 'PROCESSING_END':
      return { ...state, isProcessing: false };

    case 'ERROR':
      return { ...state, error: action.payload, isProcessing: false };

    default:
      return state;
  }
}
