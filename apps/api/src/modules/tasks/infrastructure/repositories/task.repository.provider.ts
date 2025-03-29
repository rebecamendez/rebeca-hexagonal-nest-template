import { DataSource } from 'typeorm';

import { DATA_SOURCE } from '../../../shared/database/database.provider';
import { TaskRepository } from '../../application/ports/task.repository';
import { TaskRepositoryAdapter } from './task.repository.adapter';

export const TASK_REPOSITORY = 'TASK_REPOSITORY';

export const taskRepositoryProviders = [
  {
    provide: TASK_REPOSITORY,
    useFactory: (dataSource: DataSource): TaskRepository => new TaskRepositoryAdapter(dataSource),
    inject: [DATA_SOURCE]
  }
];
