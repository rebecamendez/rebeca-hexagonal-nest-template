import { Module } from '@nestjs/common';

import { DATA_SOURCE, databaseProviders } from './database.provider';

@Module({
  providers: [...databaseProviders],
  exports: [DATA_SOURCE]
})
export class DatabaseModule {}
