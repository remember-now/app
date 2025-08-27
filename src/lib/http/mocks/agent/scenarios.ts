import { ChatResponse } from '@/lib/types';

/**
 * Predefined mock scenarios for common testing patterns
 * Usage: "mock scenario navigate-success"
 */
export const MOCK_SCENARIOS: Record<string, ChatResponse> = {
  'navigate-success': {
    message: "I'll take you to the dashboard now.",
    actions: [
      {
        name: 'navigate',
        params: { url: '/dashboard' },
      },
    ],
  },

  'navigate-fail': {
    message: "I'll take you to /PRANKED now.",
    actions: [
      {
        name: 'navigate',
        params: { url: '/PRANKED' },
      },
    ],
  },

  'navigate-notify': {
    message: "I'll navigate you and then show a notification.",
    actions: [
      {
        name: 'navigate',
        params: { url: '/profile' },
      },
      {
        name: 'notify',
        params: { message: 'Welcome to your profile!' },
      },
    ],
  },

  'no-actions': {
    message: "I understand, but I don't have any actions to perform right now.",
    actions: [],
  },

  'confirmation-required': {
    message: 'I can delete your account, but this action requires confirmation.',
    actions: [
      {
        name: 'delete-account',
        params: { userId: 'user123' },
      },
    ],
  },
};

/**
 * Get a predefined scenario by name
 */
export function getMockScenario(scenarioName: string): ChatResponse | null {
  return MOCK_SCENARIOS[scenarioName] || null;
}
