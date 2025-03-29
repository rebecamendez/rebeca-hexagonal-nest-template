import { DataSource } from 'typeorm';

import { ConfigService } from '@nestjs/config';

import { TaskEntity } from './entities/task.entity';
import { OrmLogger } from './logger/orm-logger';

export const DATA_SOURCE = 'DATA_SOURCE';

const entities = [TaskEntity];

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async (configService: ConfigService): Promise<DataSource> => {
      const isLogEnabled = configService.getOrThrow<boolean>('DB_ENABLE_LOG');

      const dataSource = new DataSource({
        type: 'postgres',
        host: configService.getOrThrow<string>('DB_HOST'),
        port: configService.getOrThrow<number>('DB_PORT'),
        username: configService.getOrThrow<string>('DB_USER'),
        password: configService.getOrThrow<string>('DB_PASSWORD'),
        database: configService.getOrThrow<string>('DB_DATABASE'),
        entities,
        synchronize: false,
        logger: new OrmLogger(isLogEnabled),
        maxQueryExecutionTime: 300
      });

      return dataSource.initialize();
    },
    inject: [ConfigService]
  }
];
