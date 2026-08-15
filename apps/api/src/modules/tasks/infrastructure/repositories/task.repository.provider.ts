import { DataSource } from 'typeorm';

import { DATA_SOURCE } from '../../../shared/database/database.provider';
import { TASK_REPOSITORY, type TaskRepository } from '../../application/ports/task.repository';
import { TaskRepositoryAdapter } from './task.repository.adapter';

export const taskRepositoryProviders = [
  {
    provide: TASK_REPOSITORY,
    useFactory: (dataSource: DataSource): TaskRepository => new TaskRepositoryAdapter(dataSource),
    inject: [DATA_SOURCE]
  }
];
