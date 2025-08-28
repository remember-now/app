/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { AssistantState, AssistantAction } from './types';
import { assistantReducer, initialState } from './state';
import { setAvailableRoutes } from './providers/actions/NavigateAction';

type AssistantContextType = {
  state: AssistantState;
  dispatch: React.Dispatch<AssistantAction>;
};

const AssistantContext = createContext<AssistantContextType | undefined>(undefined);

interface AssistantProviderProps {
  children: React.ReactNode;
  availableRoutes: readonly string[];
}

export function AssistantProvider({ children, availableRoutes }: AssistantProviderProps) {
  const [state, dispatch] = useReducer(assistantReducer, initialState);

  // Set available routes for NavigateAction
  useEffect(() => {
    setAvailableRoutes([...availableRoutes]);
  }, [availableRoutes]);

  return (
    <AssistantContext.Provider value={{ state, dispatch }}>{children}</AssistantContext.Provider>
  );
}

export function useAssistantContext() {
  const context = useContext(AssistantContext);

  if (context === undefined) {
    throw new Error('useAssistantContext must be used within an AssistantProvider');
  }
  return context;
}
