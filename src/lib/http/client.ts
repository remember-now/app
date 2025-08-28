import axios from 'axios';
import { createLogger } from '../utils';
import { setupMockInterceptors, shouldEnableMocking } from './mocks';
import { shouldUseDevAuth, getDevCredentials } from './dev-auth';

const logger = createLogger('ApiClient');

const baseURL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:3333';

axios.defaults.withCredentials = true;

export const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Runs first
if (shouldEnableMocking()) {
  setupMockInterceptors(apiClient);
}

// Runs last
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      logger.error('API request failed:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        message: error.message,
      });
      throw error;
    }
    logger.error('Unknown error:', error);
    throw error;
  }
);

if (shouldUseDevAuth()) {
  const credentials = getDevCredentials();

  if (credentials) {
    logger.log('Dev auth enabled - auto-authenticating', credentials);

    apiClient.post('/auth/login', credentials).catch((error: Error) => {
      logger.error('Dev auth failed:', error.message);
    });
  }
}

logger.debug(`Base URL: ${baseURL}`);
