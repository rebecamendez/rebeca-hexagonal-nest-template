import { ErrorExceptionFilter } from 'filters/error-exception.filter';
import * as fs from 'fs';

import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

function createSwaggerDocument(app: INestApplication): OpenAPIObject {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('rebeca-hexagonal-nest-template API')
    .setDescription('API for rebeca-hexagonal-nest-template task management')
    .setVersion('1.0')
    .addTag('tasks')
    .addBearerAuth()
    .addApiKey({ type: 'apiKey', in: 'header', name: 'X-API-KEY' }, 'X-API-KEY')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  // Merge api-contract with api swagger document
  const apiContractPath = require.resolve('@rebeca-hexagonal-nest-template/api-contract/openapi');
  const apiContract = JSON.parse(fs.readFileSync(apiContractPath, 'utf-8')) as { schemas: Record<string, SchemaObject> };
  document.components = { ...document.components, schemas: { ...document.components?.schemas, ...apiContract.schemas } };

  return document;
}

function setupSwagger(app: INestApplication, port: number): void {
  Logger.log(`[main] 🧐 Enabling OpenAPI documentation on http://localhost:${port}/api/`);

  const document = createSwaggerDocument(app);

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      filter: true,
      showCommonExtensions: true,
      showExtensions: true,
      showRequestHeaders: true,
      syntaxHighlight: { theme: 'github' },
      defaultModelRendering: 'model',
      displayOperationId: true,
      tryItOutEnabled: true,
      requestSnippetsEnabled: true,
      withCredentials: true
    }
  });
}

export const setupNestApp = (app: INestApplication, port: number, enableOpenapi: boolean): void => {
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new ErrorExceptionFilter());
  app.enableShutdownHooks();
  if (enableOpenapi) setupSwagger(app, port);
};
