import { ActionExecutor } from './actions/ActionExecutor';
export { setNavigateFunction } from './actions/NavigateAction';

const actionExecutor = new ActionExecutor();

/**
 * Get the action executor instance for advanced usage
 */
export function getActionExecutor(): ActionExecutor {
  return actionExecutor;
}
