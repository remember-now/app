/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useReducer, useContext } from 'react';
import { AssistantState, AssistantAction } from './types';
import { assistantReducer, initialState } from './state';

type AssistantContextType = {
  state: AssistantState;
  dispatch: React.Dispatch<AssistantAction>;
};

const AssistantContext = createContext<AssistantContextType | undefined>(undefined);

export function AssistantProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(assistantReducer, initialState);

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
