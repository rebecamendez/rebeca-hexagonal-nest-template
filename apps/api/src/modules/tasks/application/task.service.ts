import { Inject, Injectable } from '@nestjs/common';

import { Task } from '../domain/task';
import { TASK_REPOSITORY } from '../infrastructure/repositories/task.repository.provider';
import type { TaskRepository } from './ports/task.repository';

@Injectable()
export class TaskService {
  public constructor(@Inject(TASK_REPOSITORY) private readonly taskRepository: TaskRepository) {}

  public async getTasks(): Promise<Task[]> {
    return this.taskRepository.getTasks();
  }

  public async getTask(id: number): Promise<Task> {
    return this.taskRepository.getTask(id);
  }

  public async createTask(title: string, description: string): Promise<Task> {
    return this.taskRepository.createTask(title, description);
  }

  public async updateTask(id: number, title: string, description: string): Promise<Task> {
    return this.taskRepository.updateTask(id, title, description);
  }

  public async deleteTask(id: number): Promise<void> {
    await this.taskRepository.deleteTask(id);
  }
}
