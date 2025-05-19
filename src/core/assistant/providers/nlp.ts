import { ActionParams, getAvailableActions } from './actions';

export type MessageResponse = {
  response: string;
  actions: Array<{
    name: keyof ActionParams;
    params: ActionParams[keyof ActionParams];
  }>;
};

const SYSTEM_PROMPT = `
You are an intelligent assistant embedded within an app designed to make remembering things easy.
Examine the user message and determine whether you need to take any of the actions described below.
`;

/**
 * Processes a user message, determines actions if needed, and generates a response
 */
export async function processUserMessage(message: string): Promise<MessageResponse> {
  const testDelayMs = 500;
  await new Promise((r) => setTimeout(r, testDelayMs));

  const payload = `${SYSTEM_PROMPT}\nACTIONS AVAILABLE:${getActionsString()}\n---\nUSER MESSAGE: ${message}`;

  console.log(`Payload:\n${payload}`);

  // TODO: Add LLM here
  const actions: MessageResponse['actions'] = [];
  const lowerMessage = message.toLowerCase();

  // TEMP
  if (lowerMessage.includes('remind me')) {
    actions.push({
      name: 'setReminder',
      params: {
        text: message.replace(/remind me/i, '').trim(),
        date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      },
    });
  }

  if (lowerMessage.includes('remember')) {
    actions.push({
      name: 'storeMemory',
      params: {
        title: 'random memory',
        content: message.replace('remember', '').trim(),
      },
    });
  }

  if (lowerMessage.includes('search') || lowerMessage.includes('find')) {
    actions.push({
      name: 'searchMemories',
      params: {
        tags: [],
      },
    });
  }

  return {
    response: `I received your message: '${message}'. I am currently stupid so that is all.`,
    actions,
  };
}

function getActionsString(): string {
  return getAvailableActions()
    .map(
      (a, i) =>
        `Action ${i + 1}: ${a.name}\nDescription: ${a.description}\nParameters: ${JSON.stringify(a.parameters)}`
    )
    .reduce((allActions, a) => allActions + '\n---\n' + a, '');
}
