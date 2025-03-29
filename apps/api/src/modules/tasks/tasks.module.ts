import { Module } from '@nestjs/common';

import { DatabaseModule } from '../shared/database/database.module';
import { TaskService } from './application/task.service';
import { taskRepositoryProviders } from './infrastructure/repositories/task.repository.provider';
import { TaskController } from './presentation/task.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [TaskController],
  providers: [TaskService, ...taskRepositoryProviders]
})
export class TasksModule {}
