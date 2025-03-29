import { NextFunction, Request, Response } from 'express';
import * as httpContext from 'express-http-context';
import { v4 as uuidv4 } from 'uuid';

import { Injectable, NestMiddleware } from '@nestjs/common';

const context = httpContext as unknown as {
  middleware?: (req: Request, res: Response, next: NextFunction) => void;
  ns?: { bindEmitter: (req: Request) => void };
  set?: (key: string, value: string) => void;
  get?: (key: string) => string | undefined;
};

@Injectable()
export class ContextMiddleware implements NestMiddleware {
  public use(request: Request, response: Response, next: NextFunction): void {
    context.middleware?.(request, response, () => {
      const id = uuidv4();
      context.ns?.bindEmitter(request);
      context.set?.('id-context', id);
      response.setHeader('X-Response-Date', new Date(Date.now()).toUTCString());
      next();
    });
  }
}

export const getContextId = (): string => {
  const id = context.get?.('id-context');
  return id ?? '';
};
