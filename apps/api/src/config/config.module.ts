import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { Environment } from './environment';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      validate: (config: Record<string, unknown>) => Environment.validate(config),
      isGlobal: true,
      cache: true,
      envFilePath: '.env'
    })
  ]
})
export class ConfigModule {}
