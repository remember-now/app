import { BaseAssistantAction } from './BaseAction';
import {
  ActionExecutionState,
  ActionExecutionObserver,
  ActionRequest,
  ActionParameters,
} from '../../types';
import { v4 as uuidv4 } from 'uuid';
import { createLogger } from '@/lib/utils';

interface ActionModuleInterface {
  [key: string]: unknown;
}

export class ActionExecutor {
  private observers: Set<ActionExecutionObserver> = new Set();
  private pendingConfirmations = new Map<
    string,
    {
      resolve: (confirmed: boolean) => void;
      reject: (error: Error) => void;
    }
  >();
  private actionRegistry = new Map<string, BaseAssistantAction>();
  private logger = createLogger(ActionExecutor.name);

  constructor() {
    this.initializeActionRegistry();
  }

  private initializeActionRegistry() {
    const actionModules = import.meta.glob('./*Action.ts', { eager: true });

    Object.values(actionModules).forEach((module) => {
      const moduleImport = module as ActionModuleInterface;

      Object.values(moduleImport).forEach((ActionClass: unknown) => {
        if (
          typeof ActionClass === 'function' &&
          ActionClass.prototype instanceof BaseAssistantAction
        ) {
          try {
            const ActionConstructor = ActionClass as new () => BaseAssistantAction;
            const instance = new ActionConstructor();
            this.actionRegistry.set(instance.name, instance);
          } catch (error) {
            this.logger.error(`Failed to instantiate action class:`, error);
          }
        }
      });
    });
  }

  addObserver(observer: ActionExecutionObserver) {
    this.observers.add(observer);
  }

  removeObserver(observer: ActionExecutionObserver) {
    this.observers.delete(observer);
  }

  private notifyObservers(state: ActionExecutionState) {
    this.observers.forEach((observer) => {
      try {
        observer.onStateChange(state);
      } catch (error) {
        this.logger.error('Error in action execution observer:', error);
      }
    });
  }

  async executeActionsWithConfirmation(actions: ActionRequest[]): Promise<void> {
    for (const actionRequest of actions) {
      const actionId = uuidv4();
      const action = this.actionRegistry.get(actionRequest.name);

      if (!action) {
        this.notifyObservers({
          status: 'error',
          actionId,
          action: actionRequest.name,
          error: 'Action not found',
        });
        continue;
      }
      const validationResult = action.safeValidateParams(actionRequest.params);

      if (!validationResult.success) {
        this.notifyObservers({
          status: 'error',
          actionId,
          action: actionRequest.name,
          error: `Parameter validation failed: ${validationResult.error.message}`,
        });
        continue;
      }
      const validatedParams = validationResult.data as ActionParameters;

      // Initial pending state
      this.notifyObservers({
        status: 'pending',
        actionId,
        action: actionRequest.name,
        params: validatedParams,
      });

      // Check if confirmation needed
      if (action.requiresConfirmation) {
        const prompt = action.getConfirmationPrompt?.(validatedParams) || `Execute ${action.name}?`;

        this.notifyObservers({
          status: 'awaiting_confirmation',
          actionId,
          action: actionRequest.name,
          params: validatedParams,
          prompt,
        });

        const confirmed = await this.waitForConfirmation(actionId);
        if (!confirmed) {
          this.notifyObservers({
            status: 'cancelled',
            actionId,
            action: actionRequest.name,
          });
          continue;
        }
      }

      // Execute action with validated parameters
      this.notifyObservers({
        status: 'executing',
        actionId,
        action: actionRequest.name,
        params: validatedParams,
      });

      try {
        const result = await action.execute(validatedParams);

        this.notifyObservers({
          status: 'completed',
          actionId,
          action: actionRequest.name,
          result,
        });
      } catch (error) {
        this.notifyObservers({
          status: 'error',
          actionId,
          action: actionRequest.name,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }
  }

  private waitForConfirmation(actionId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.pendingConfirmations.set(actionId, { resolve, reject });

      setTimeout(() => {
        if (this.pendingConfirmations.has(actionId)) {
          this.pendingConfirmations.delete(actionId);
          reject(new Error('Confirmation timeout'));
        }
      }, 60000); // 60 second timeout
    });
  }

  confirmAction(actionId: string, confirmed: boolean) {
    const pending = this.pendingConfirmations.get(actionId);

    if (pending) {
      pending.resolve(confirmed);
      this.pendingConfirmations.delete(actionId);
    }
  }

  getRegisteredActions() {
    return Array.from(this.actionRegistry.values()).map((action) => action.getActionDefinition());
  }
}
