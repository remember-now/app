import { z } from 'zod';
import { BaseAssistantAction } from './BaseAction';

// Navigation function will be injected by the hooks
let navigateFunction: ((path: string) => void) | null = null;

export function setNavigateFunction(navigate: (path: string) => void) {
  navigateFunction = navigate;
}

// Available routes - must be set before use
let availableRoutes: string[] | null = null;

export function setAvailableRoutes(routes: string[]) {
  availableRoutes = routes;
}

interface NavigateResult {
  type: 'navigation';
  success: boolean;
  path: string;
}

export class NavigateAction extends BaseAssistantAction<
  z.ZodObject<{ path: z.ZodEnum }>,
  NavigateResult
> {
  name = 'navigateTo';
  description = 'Navigate to a different page in the app';
  parameters = {
    path: 'The path to navigate to',
  };
  requiresConfirmation = true;

  get parameterSchema() {
    if (!availableRoutes || availableRoutes.length === 0) {
      throw new Error(
        'NavigateAction: Available routes not set. Call setAvailableRoutes() before using this action.'
      );
    }
    return z.object({
      path: z.enum(availableRoutes as [string, ...string[]]),
    });
  }

  getConfirmationPrompt(params: { path: string }): string {
    return `Navigate to ${params.path}?`;
  }

  execute({ path }: { path: string }): Promise<NavigateResult> {
    if (!navigateFunction) {
      throw new Error('Navigation function not available');
    }
    navigateFunction(path);

    return Promise.resolve({
      type: 'navigation' as const,
      success: true,
      path,
    });
  }
}
