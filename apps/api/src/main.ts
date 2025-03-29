import { WinstonModule } from 'nest-winston';
import { winstonLoggerOptions } from 'utils/logger';

import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { setupNestApp } from './main.setup';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: WinstonModule.createLogger(winstonLoggerOptions),
    rawBody: true
  });

  const configService = app.get(ConfigService);
  const port = configService.getOrThrow<number>('PORT');
  const enableOpenapi = configService.getOrThrow<boolean>('ENABLE_OPENAPI');

  setupNestApp(app, port, enableOpenapi);

  await app.listen(port);

  Logger.log(`[main] 🚀 Application is running on: http://localhost:${port}`);
}

void bootstrap();
