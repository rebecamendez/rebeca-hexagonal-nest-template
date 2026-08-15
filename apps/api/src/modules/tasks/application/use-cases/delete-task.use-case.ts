import { Inject, Injectable } from '@nestjs/common';

import { TASK_REPOSITORY, type TaskRepository } from '../ports/task.repository';

@Injectable()
export class DeleteTaskUseCase {
  public constructor(@Inject(TASK_REPOSITORY) private readonly taskRepository: TaskRepository) {}

  public async execute(id: number): Promise<void> {
    await this.taskRepository.deleteTask(id);
  }
}
