import { DataSource } from 'typeorm';

import { Inject, Injectable, Logger, OnApplicationShutdown } from '@nestjs/common';

import { DATA_SOURCE } from '../shared/database/database.provider';

@Injectable()
export class GracefulShutdownService implements OnApplicationShutdown {
  public constructor(@Inject(DATA_SOURCE) private readonly dataSource: DataSource) {}

  public async onApplicationShutdown(_signal?: string): Promise<void> {
    await Promise.all([this.shutdownDatabaseConnection()]);
  }

  private async shutdownDatabaseConnection(): Promise<void> {
    Logger.log('[GracefulShutdownService] 🔄 Shutting down database connections ...');
    await this.dataSource.destroy();
    Logger.log('[GracefulShutdownService] 🔄 Database connections closed');
  }
}
