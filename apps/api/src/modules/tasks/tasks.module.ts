import { Module } from '@nestjs/common';

import { DatabaseModule } from '../shared/database/database.module';
import { CreateTaskUseCase } from './application/use-cases/create-task.use-case';
import { DeleteTaskUseCase } from './application/use-cases/delete-task.use-case';
import { GetTaskUseCase } from './application/use-cases/get-task.use-case';
import { GetTasksUseCase } from './application/use-cases/get-tasks.use-case';
import { UpdateTaskUseCase } from './application/use-cases/update-task.use-case';
import { taskRepositoryProviders } from './infrastructure/repositories/task.repository.provider';
import { TaskController } from './presentation/task.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [TaskController],
  providers: [
    GetTasksUseCase,
    GetTaskUseCase,
    CreateTaskUseCase,
    UpdateTaskUseCase,
    DeleteTaskUseCase,
    ...taskRepositoryProviders
  ]
})
export class TasksModule {}
