import { NextFunction, Request, Response } from 'express';

import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  public use(request: Request, response: Response, next: NextFunction): void {
    const startAt = process.hrtime();
    const { method, originalUrl } = request;

    const messageRequestWithContext = {
      http: {
        method,
        url: originalUrl,
        body: request.body as Record<string, unknown>,
        params: request.params as Record<string, unknown>,
        query: request.query as Record<string, unknown>,
        referer: request.headers.referer
      },
      message: `▶️  ${method} ${originalUrl}`
    };
    Logger.verbose(messageRequestWithContext);

    response.on('finish', () => {
      const { statusCode } = response;
      const diff = process.hrtime(startAt);
      const responseTime = Math.round(diff[0] * 1e3 + diff[1] * 1e-6);

      const messageResponseWithContext = {
        http: {
          statusCode,
          method,
          url: originalUrl,
          body: request.body as Record<string, unknown>,
          params: request.params as Record<string, unknown>,
          query: request.query as Record<string, unknown>,
          referer: request.headers.referer
        },
        message: `(${responseTime} ms) ◀️  ${statusCode} ${method} ${originalUrl}`
      };
      if (statusCode < 400) {
        Logger.log(messageResponseWithContext);
      } else if (statusCode < 500) {
        Logger.warn(messageResponseWithContext);
      } else {
        Logger.error(messageResponseWithContext);
      }
    });

    next();
  }
}
