import { Response } from 'express';
import { EntityModelNotFoundError } from 'modules/shared/errors/entity-model-not-found';
import { logError } from 'utils/error-logger';

import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';

interface ErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}

@Catch()
export class ErrorExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ErrorExceptionFilter.name);

  public catch(exception: Error | HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    try {
      switch (true) {
        case exception instanceof EntityModelNotFoundError:
          this.sendWarnResponse(HttpStatus.NOT_FOUND, response, exception);
          break;

        case exception instanceof HttpException:
          this.handleHttpException(exception, response);
          break;

        default:
          this.sendErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, response, exception);
      }
    } catch (error) {
      this.logger.error('[ErrorExceptionFilter] Error in error filter:', error);
      this.sendErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, response, error as Error);
    }
  }

  // -- 🔒 Private methods --
  private handleHttpException(exception: HttpException, response: Response): void {
    const status = exception.getStatus();
    const errorResponse = exception.getResponse();

    this.logger.warn(`[ErrorExceptionFilter] Validation error: ${JSON.stringify(errorResponse)}`);
    response.status(status).json(errorResponse);
  }

  private sendWarnResponse(status: number, response: Response, error: Error): void {
    const errorResponse: ErrorResponse = {
      statusCode: status,
      message: error.message,
      error: error.constructor.name
    };

    this.logger.warn(`[ErrorExceptionFilter] ${error.constructor.name}: ${error.message}`);
    response.status(status).json(errorResponse);
  }

  private sendErrorResponse(status: number, response: Response, error: Error): void {
    const errorResponse: ErrorResponse = {
      statusCode: status,
      message: error.message,
      error: error.constructor.name
    };

    logError(`[ErrorExceptionFilter] ${error.constructor.name}: ${error.message}`, error.stack);
    response.status(status).json(errorResponse);
  }
}
