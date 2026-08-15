import { Inject, Injectable } from '@nestjs/common';

import { Task } from '../../domain/task';
import { TASK_REPOSITORY, type TaskRepository } from '../ports/task.repository';

@Injectable()
export class GetTasksUseCase {
  public constructor(@Inject(TASK_REPOSITORY) private readonly taskRepository: TaskRepository) {}

  public async execute(): Promise<Task[]> {
    return this.taskRepository.getTasks();
  }
}
