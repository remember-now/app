import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Creates a formatted timestamp in the format: 12/08/2019, 7:12:59 AM
 */
function formatTimestamp(): string {
  return new Date().toLocaleString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
}

/**
 * Creates a logger with timestamp and prefix support
 * @param prefix - The prefix to use (e.g., class name, module name)
 * @returns Logger object with log, error, warn, debug methods
 *
 * Usage:
 * - createLogger('ApiClient')
 * - createLogger(MyClass.name)
 * - createLogger('ModuleName')
 */
export function createLogger(prefix: string) {
  const formatMessage = (level: string, ...args: unknown[]) => {
    const timestamp = formatTimestamp();

    const styledMessage = `%c${timestamp}%c %c[${prefix}]%c`;
    const timestampStyle = 'color: #888; font-weight: normal;'; // Gray timestamp
    const separatorStyle = 'color: inherit;'; // Normal color for separator
    const prefixStyle = 'color: #0066cc; font-weight: bold;'; // Blue class name
    const messageStyle = 'color: inherit; font-weight: normal;'; // Normal text color

    if (level === 'log') {
      console.log(
        styledMessage,
        timestampStyle,
        separatorStyle,
        prefixStyle,
        messageStyle,
        ...args
      );
    } else if (level === 'error') {
      console.error(
        styledMessage,
        timestampStyle,
        separatorStyle,
        prefixStyle,
        messageStyle,
        ...args
      );
    } else if (level === 'warn') {
      console.warn(
        styledMessage,
        timestampStyle,
        separatorStyle,
        prefixStyle,
        messageStyle,
        ...args
      );
    } else if (level === 'debug') {
      console.debug(
        styledMessage,
        timestampStyle,
        separatorStyle,
        prefixStyle,
        messageStyle,
        ...args
      );
    }
  };

  return {
    log: (...args: unknown[]) => formatMessage('log', ...args),
    error: (...args: unknown[]) => formatMessage('error', ...args),
    warn: (...args: unknown[]) => formatMessage('warn', ...args),
    debug: (...args: unknown[]) => formatMessage('debug', ...args),
  };
}
