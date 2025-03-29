import { ContextMiddleware } from 'middlewares/context.middleware';

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { Environment } from './config/environment';
import { HttpLoggerMiddleware } from './middlewares/http-logger.middleware';
import { RootModule } from './modules/root/root.module';
import { GracefulShutdownModule } from './modules/shutdown/graceful-shutdown.module';
import { TasksModule } from './modules/tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validate: (config) => Environment.validate(config)
    }),
    GracefulShutdownModule,
    RootModule,
    TasksModule
  ]
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(ContextMiddleware, HttpLoggerMiddleware).forRoutes('*');
  }
}
