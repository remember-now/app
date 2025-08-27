/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */
import {
  AxiosInstance,
  AxiosResponse,
  AxiosHeaders,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import { generateMockResponse } from './agent/responses';
import { MockError, MockInterceptError } from './types';
import { getStatusText } from './utils';
import { createLogger } from '@/lib/utils';

const logger = createLogger('MockInterceptor');

/**
 * Check if mocking should be enabled
 */
export function shouldEnableMocking(): boolean {
  const mockApiValue = import.meta.env.VITE_USE_MOCK_API as unknown;

  return (
    !import.meta.env.PROD &&
    typeof mockApiValue === 'string' &&
    mockApiValue.toLowerCase() === 'true'
  );
}

/**
 * Helper to create a proper AxiosResponse object
 */
function createMockAxiosResponse(
  mockResponse: unknown,
  config: InternalAxiosRequestConfig
): AxiosResponse {
  return {
    data: mockResponse,
    status: 200,
    statusText: 'OK',
    headers: new AxiosHeaders({ 'content-type': 'application/json' }),
    config: config,
    request: {},
  };
}

/**
 * Helper to create a proper AxiosError object
 */
function createMockAxiosError(error: Error, config: InternalAxiosRequestConfig): AxiosError {
  const statusCode = error instanceof MockError ? error.statusCode : 500;

  return new AxiosError(
    error.message,
    `${statusCode}`,
    config,
    {},
    {
      data: { message: error.message },
      status: statusCode,
      statusText: getStatusText(statusCode),
      headers: new AxiosHeaders({ 'content-type': 'application/json' }),
      config: config,
      request: {},
    }
  );
}

/**
 * Handles mock request interception
 * Detects mock commands in chat messages
 * and throws MockInterceptError to prevent actual HTTP requests
 */
function handleMockRequest(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  if (config.url !== '/agent/chat' || !config.data) {
    return config;
  }
  const { message } = config.data as { message: string };

  try {
    const mockResponse = generateMockResponse(message);

    if (!mockResponse) {
      return config;
    }
    logger.log('Mock interceptor:', { command: message, response: mockResponse });
    throw new MockInterceptError(mockResponse, null, config);
  } catch (error) {
    if (error instanceof MockInterceptError) {
      throw error;
    }

    if (error instanceof MockError) {
      logger.log('Mock interceptor:', { command: message, error });
      throw new MockInterceptError(null, error, config);
    }

    logger.error('Mock interceptor FAIL:', { command: message, error });
    throw error;
  }
}

/**
 * Handles mock response conversion
 * Catches MockInterceptError from request interceptor
 * and converts to proper AxiosResponse or AxiosError
 */
function handleMockResponse(error: unknown) {
  if (!(error instanceof MockInterceptError)) {
    return Promise.reject(error);
  }

  if (error.mockResponse) {
    return Promise.resolve(createMockAxiosResponse(error.mockResponse, error.config));
  }
  if (error.mockError) {
    return Promise.reject(createMockAxiosError(error.mockError, error.config));
  }
  return Promise.reject(error);
}

/**
 * Sets up mock interceptors for the axios client
 * Uses request interceptor to prevent real HTTP calls for mock commands,
 * response interceptor to convert intentional errors back to responses
 */
export function setupMockInterceptors(client: AxiosInstance) {
  client.interceptors.request.use(handleMockRequest, (err) => Promise.reject(err));
  client.interceptors.response.use((response) => response, handleMockResponse);
}
