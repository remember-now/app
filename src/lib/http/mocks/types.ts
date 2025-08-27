import { ChatResponse } from '@/lib/types';
import { InternalAxiosRequestConfig } from 'axios';

export class MockError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = 'MockError';
  }
}

export type MockCommand = {
  command: string;
  params: string[];
};

/**
 * Custom error type for mock interception
 * Handles both success responses and error responses
 */
export class MockInterceptError extends Error {
  constructor(
    public readonly mockResponse: ChatResponse | null,
    public readonly mockError: Error | null,
    public readonly config: InternalAxiosRequestConfig
  ) {
    super('Mock request intercepted');
    this.name = 'MockInterceptError';
  }
}
