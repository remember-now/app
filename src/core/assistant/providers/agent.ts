import { MessageResponse } from '../types';
import { getActionExecutor } from './actions';
import { createLogger } from '@/lib/utils';
import { agentService } from '@/services/agent-service';

const logger = createLogger('AgentProvider');

/**
 * Processes a user message by sending it to the backend agent
 * Agent returns both response and any frontend actions to execute
 */
export async function processUserMessage(message: string): Promise<MessageResponse> {
  try {
    const actionExecutor = getActionExecutor();
    const availableActions = actionExecutor.getRegisteredActions();

    logger.debug('Payload sent to agent:', { message, availableActions });

    const { request } = agentService.sendMessage({ message, availableActions });
    const data = (await request).data;

    logger.debug('Received answer:', { data });

    return {
      response: data.response,
      actions: data.actions || [],
    };
  } catch (error) {
    logger.error('Failed to process message with agent:', error);

    return {
      response: 'Sorry, I encountered an error processing your message. Please try again.',
      actions: [],
    };
  }
}
