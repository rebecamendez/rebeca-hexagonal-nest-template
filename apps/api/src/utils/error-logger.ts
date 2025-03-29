import { Logger } from '@nestjs/common';

export const logError = (message: string, e: Error | unknown): void => {
  if (e instanceof Error) {
    Logger.error(message, e.stack);
  } else {
    Logger.error(message);
  }
};
