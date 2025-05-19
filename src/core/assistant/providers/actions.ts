import { storeMemory, retrieveMemories } from './memory';

export type ActionDefinition = {
  name: string;
  description: string;
  parameters: Record<string, string>;
};

export type ActionParams = {
  setReminder: {
    text: string;
    date: Date;
  };
  storeMemory: {
    title: string;
    content: string;
    tags?: string[];
  };
  searchMemories: {
    tags?: string[];
  };
};

export type ActionResult =
  | { type: 'reminder'; success: boolean; id: number }
  | { type: 'memory'; success: boolean; id: string }
  | { type: 'search'; results: string[] }
  | { type: 'error'; message: string };

export type ActionResultMap = {
  setReminder: Extract<ActionResult, { type: 'reminder' }>;
  storeMemory: Extract<ActionResult, { type: 'memory' }>;
  searchMemories: Extract<ActionResult, { type: 'search' }>;
};

type ActionHandler<T extends keyof ActionParams> = (
  params: ActionParams[T]
) => Promise<ActionResultMap[T]>;

/**
 * Registry of all available actions with their handlers and descriptions
 */
const actionRegistry: {
  [T in keyof ActionParams]: {
    handler: ActionHandler<T>;
    definition: ActionDefinition;
  };
} = {
  setReminder: {
    // eslint-disable-next-line @typescript-eslint/require-await
    handler: async ({ text, date }) => {
      console.log(`Setting reminder: ${text} for ${date.toDateString()}. (STUB)`);

      return {
        type: 'reminder',
        success: true,
        id: Date.now(),
      };
    },
    definition: {
      name: 'setReminder',
      description: 'Sets a reminder for a future date',
      parameters: {
        text: 'Content of the reminder',
        date: 'When to remind (Date object)',
      },
    },
  },

  storeMemory: {
    handler: async ({ title, content, tags = [] }) => {
      console.log(`Storing memory: ${content}`);

      const id = await storeMemory({
        title: title,
        content: content,
        tags: tags,
      });
      return {
        type: 'memory',
        success: true,
        id: id,
      };
    },
    definition: {
      name: 'storeMemory',
      description: 'Stores information in long-term memory',
      parameters: {
        title: 'Title of the memory to store',
        content: 'Content to remember',
        tags: 'Optional tags for categorization',
      },
    },
  },

  searchMemories: {
    handler: async ({ tags }) => {
      console.log(`Searching memories for tags: ${tags ? tags.join(' ') : 'no tags specified'}`);

      const memories = await retrieveMemories(tags);
      return {
        type: 'search',
        results: memories.map((m) => m.content),
      };
    },
    definition: {
      name: 'searchMemories',
      description: 'Searches existing memories',
      parameters: {
        tags: 'Tags which memories searched must have. Optional, may be empty to retrieve all memories.',
      },
    },
  },
};

/**
 * Gets all available actions with their descriptions
 * This is used by the NLP module to understand what actions are available
 */
export function getAvailableActions(): Array<ActionDefinition> {
  return Object.values(actionRegistry).map((action) => action.definition);
}

/**
 * Executes a single action
 */
async function executeAction<T extends keyof ActionParams>(
  actionName: T,
  params: ActionParams[T]
): Promise<ActionResultMap[T]> {
  const actionItem = actionRegistry[actionName];
  if (!actionItem) {
    throw new Error(`Unknown action: ${actionName}`);
  }
  return actionItem.handler(params);
}

/**
 * Executes multiple actions in sequence
 */
export async function executeActions(
  actions: Array<{ name: keyof ActionParams; params: ActionParams[keyof ActionParams] }>
): Promise<Array<{ action: string; result: ActionResult }>> {
  const results: Array<{ action: string; result: ActionResult }> = [];

  for (const action of actions) {
    try {
      const result = await executeAction(action.name, action.params);
      results.push({ action: action.name, result });
    } catch (error) {
      const errorResult: Extract<ActionResult, { type: 'error' }> = {
        type: 'error' as const,
        message: error instanceof Error ? error.message : String(error),
      };

      results.push({
        action: action.name,
        result: errorResult,
      });
    }
  }
  return results;
}
