import { Inject, Injectable } from '@nestjs/common';

import { Task } from '../../domain/task';
import { CreateTaskCommand } from '../commands/create-task.command';
import { TASK_REPOSITORY, type TaskRepository } from '../ports/task.repository';

@Injectable()
export class CreateTaskUseCase {
  public constructor(@Inject(TASK_REPOSITORY) private readonly taskRepository: TaskRepository) {}

  public async execute(command: CreateTaskCommand): Promise<Task> {
    return this.taskRepository.createTask(command.title, command.description);
  }
}
