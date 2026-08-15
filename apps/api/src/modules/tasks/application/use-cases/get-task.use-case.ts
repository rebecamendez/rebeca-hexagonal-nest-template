import { Inject, Injectable } from '@nestjs/common';

import { Task } from '../../domain/task';
import { TASK_REPOSITORY, type TaskRepository } from '../ports/task.repository';

@Injectable()
export class GetTaskUseCase {
  public constructor(@Inject(TASK_REPOSITORY) private readonly taskRepository: TaskRepository) {}

  public async execute(id: number): Promise<Task> {
    return this.taskRepository.getTask(id);
  }
}
