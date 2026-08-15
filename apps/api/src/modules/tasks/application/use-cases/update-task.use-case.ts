import { Inject, Injectable } from '@nestjs/common';

import { Task } from '../../domain/task';
import { UpdateTaskCommand } from '../commands/update-task.command';
import { TASK_REPOSITORY, type TaskRepository } from '../ports/task.repository';

@Injectable()
export class UpdateTaskUseCase {
  public constructor(@Inject(TASK_REPOSITORY) private readonly taskRepository: TaskRepository) {}

  public async execute(command: UpdateTaskCommand): Promise<Task> {
    return this.taskRepository.updateTask(command.id, command.title, command.description);
  }
}
