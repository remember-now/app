import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssistantContext } from './context';
import { processUserMessage } from './providers/agent';
import { getActionExecutor, setNavigateFunction } from './providers/actions';
import { ActionExecutionState, ActionExecutionObserver } from './types';

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
  const navigate = useNavigate();

  // Provide navigate function to actions
  useEffect(() => {
    setNavigateFunction(navigate);
  }, [navigate]);

  const sendMessage = useCallback(
    async (message: string) => {
      if (!message.trim()) return;

      dispatch({ type: 'SEND_MESSAGE', payload: message });

      try {
        const { response, actions } = await processUserMessage(message);

        if (actions.length > 0) {
          dispatch({ type: 'PROCESSING_START' });

          await getActionExecutor().executeActionsWithConfirmation(actions);
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

/**
 * Hook for observing action executions and handling confirmations
 */
export function useActionExecution() {
  const [executionStates, setExecutionStates] = useState<ActionExecutionState[]>([]);

  useEffect(() => {
    const actionExecutor = getActionExecutor();

    const observer: ActionExecutionObserver = {
      onStateChange: (state: ActionExecutionState) => {
        setExecutionStates((prev) => {
          // Replace existing state for same actionId or add new one
          const existingIndex = prev.findIndex((s) => s.actionId === state.actionId);

          if (existingIndex >= 0) {
            const newStates = [...prev];
            newStates[existingIndex] = state;
            return newStates;
          } else {
            return [...prev, state];
          }
        });
      },
    };

    actionExecutor.addObserver(observer);

    return () => {
      actionExecutor.removeObserver(observer);
    };
  }, []);

  const confirmAction = useCallback((actionId: string, confirmed: boolean) => {
    getActionExecutor().confirmAction(actionId, confirmed);
  }, []);

  const clearExecutionHistory = useCallback(() => {
    setExecutionStates([]);
  }, []);

  return {
    executionStates,
    confirmAction,
    clearExecutionHistory,
  };
}
