import { useCallback } from 'react';
import { useAssistantContext } from './context';
import { processUserMessage } from './providers/nlp';
import { executeActions } from './providers/actions';

export function useAssistant() {
  const { state } = useAssistantContext();

  return {
    messages: state.messages,
    isProcessing: state.isProcessing,
    error: state.error,
    isInitialized: state.isInitialized,
  };
}

export function useAssistantActions() {
  const { dispatch } = useAssistantContext();

  const sendMessage = useCallback(
    async (message: string) => {
      if (!message.trim()) return;

      dispatch({ type: 'SEND_MESSAGE', payload: message });

      try {
        const { response, actions } = await processUserMessage(message);

        if (actions.length > 0) {
          dispatch({ type: 'PROCESSING_START' });
          const actionResults = await executeActions(actions);

          console.log('Action results:', actionResults);
          // TODO: If action failed, let LLM compose a response to the user here?
        }

        // Send the assistant's response
        dispatch({ type: 'RECEIVE_MESSAGE', payload: response });

        return response;
      } catch (error) {
        dispatch({ type: 'ERROR', payload: error as Error });
        throw error;
      }
    },
    [dispatch]
  );

  const clearMessages = useCallback(() => {
    dispatch({ type: 'INITIALIZE', payload: { messages: [] } });
  }, [dispatch]);

  return {
    sendMessage,
    clearMessages,
  };
}
