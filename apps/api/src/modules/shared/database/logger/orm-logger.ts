import { QueryRunner } from 'typeorm';
import { Logger as TypeOrmLogger } from 'typeorm/logger/Logger';

import { Logger } from '@nestjs/common';

export class OrmLogger implements TypeOrmLogger {
  private readonly isEnabled: boolean;

  public constructor(isEnabled: boolean) {
    this.isEnabled = isEnabled;
  }
  public log(level: 'log' | 'info' | 'warn', message: unknown, _queryRunner?: QueryRunner): void {
    if (this.isEnabled) Logger.log(`[SQL] 🔍 ${level} - ${message as string}`);
  }

  public logQuery(query: string, parameters?: unknown[], _queryRunner?: QueryRunner): void {
    if (this.isEnabled) Logger.log(`[SQL] 🔍 Query: ${query} -- Parameters${parameters ? JSON.stringify(parameters) : ''}`);
  }

  public logMigration(message: string, _queryRunner?: QueryRunner): void {
    Logger.log(`[SQL] 📚 Migration: ${message}`);
  }

  public logQueryError(error: string | Error, query: string, parameters?: unknown[], _queryRunner?: QueryRunner): void {
    Logger.error(`[SQL] 🚨 Query Error: ${error} at ${query} -- Parameters${parameters ? JSON.stringify(parameters) : ''}`);
  }

  public logQuerySlow(time: number, query: string, parameters?: unknown[], _queryRunner?: QueryRunner): void {
    Logger.warn(`[SQL] 🥱 Slow Query: (${time}ms) ${query} -- Parameters${parameters ? JSON.stringify(parameters) : ''}`);
  }

  public logSchemaBuild(message: string, _queryRunner?: QueryRunner): void {
    Logger.log(`[SQL] 📚 Schema: ${message}`);
  }
}
