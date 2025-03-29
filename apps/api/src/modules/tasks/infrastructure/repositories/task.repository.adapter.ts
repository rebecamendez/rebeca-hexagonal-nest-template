import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { TaskEntity } from '../../../shared/database/entities/task.entity';
import { EntityModelNotFoundError } from '../../../shared/errors/entity-model-not-found';
import { TaskRepository } from '../../application/ports/task.repository';
import { Task } from '../../domain/task';
import { TaskEntityMapper } from './mappers/task-entity.mapper';

@Injectable()
export class TaskRepositoryAdapter implements TaskRepository {
  public constructor(private readonly dataSource: DataSource) {}

  public async getTasks(): Promise<Task[]> {
    const repository = this.dataSource.getRepository(TaskEntity);
    const entities = await repository.find();
    return entities.map((entity) => TaskEntityMapper.toDomain(entity));
  }

  public async getTask(id: number): Promise<Task> {
    const repository = this.dataSource.getRepository(TaskEntity);
    const entity = await repository.findOneBy({ id });

    if (!entity) throw new EntityModelNotFoundError(`Task with id: ${id} not found`);

    return TaskEntityMapper.toDomain(entity);
  }

  public async createTask(title: string, description: string): Promise<Task> {
    const repository = this.dataSource.getRepository(TaskEntity);
    const entity = repository.create({ title, description });
    const saved = await repository.save(entity);
    return TaskEntityMapper.toDomain(saved);
  }

  public async updateTask(id: number, title: string, description: string): Promise<Task> {
    const repository = this.dataSource.getRepository(TaskEntity);
    const entity = TaskEntityMapper.toEntity({ id, title, description });
    const saved = await repository.save(entity);
    return TaskEntityMapper.toDomain(saved);
  }

  public async deleteTask(id: number): Promise<void> {
    const repository = this.dataSource.getRepository(TaskEntity);
    await repository.delete(id);
  }
}
