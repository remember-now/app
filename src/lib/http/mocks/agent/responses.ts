import { ChatResponse } from '@/lib/types';
import { MockError, MockCommand } from '../types';
import { getMockScenario, MOCK_SCENARIOS } from './scenarios';

/**
 * Parses a mock message into command and parameters
 * Examples:
 * - "mock error 500" -> { command: "error", params: ["500"] }
 * - "mock navigate /dashboard" -> { command: "navigate", params: ["/dashboard"] }
 */
export function parseMockCommand(message: string): MockCommand | null {
  const trimmed = message.trim();

  if (!trimmed.toLowerCase().startsWith('mock ')) {
    return null;
  }

  const parts = trimmed.slice(5).split(/\s+/); // Remove "mock " prefix
  if (parts.length === 0) {
    return null;
  }

  const [command, ...params] = parts;
  return { command: command.toLowerCase(), params };
}

/**
 * Generates mock responses based on parsed commands
 */
export function generateMockResponse(message: string): ChatResponse | null {
  const mockCommand = parseMockCommand(message);

  if (!mockCommand) {
    return null;
  }
  const { command, params } = mockCommand;

  switch (command) {
    case 'error':
      return handleMockError(params);

    case 'navigate':
      return handleMockNavigate(params);

    case 'scenario':
      return handleMockScenario(params);

    default:
      return {
        response: `Unknown mock command: ${command}. Available commands: error, navigate, scenario`,
        actions: [],
      };
  }
}

function handleMockError(params: string[]): ChatResponse {
  const statusCode = parseInt(params[0]) || 500;
  const errorMessage = params.slice(1).join(' ') || 'Mock server error';

  throw new MockError(errorMessage, statusCode);
}

function handleMockNavigate(params: string[]): ChatResponse {
  const path = params[0] || '/';

  return {
    response: `I'll navigate you to ${path}`,
    actions: [
      {
        name: 'navigate',
        params: { url: path },
      },
    ],
  };
}

function handleMockScenario(params: string[]): ChatResponse {
  const scenarioName = params[0];

  if (!scenarioName) {
    const availableScenarios = Object.keys(MOCK_SCENARIOS).join(', ');
    return {
      response: `Please specify a scenario name. Available scenarios: ${availableScenarios}`,
      actions: [],
    };
  }
  const scenario = getMockScenario(scenarioName);

  if (!scenario) {
    const availableScenarios = Object.keys(MOCK_SCENARIOS).join(', ');
    return {
      response: `Unknown scenario: ${scenarioName}. Available scenarios: ${availableScenarios}`,
      actions: [],
    };
  }
  return scenario;
}
