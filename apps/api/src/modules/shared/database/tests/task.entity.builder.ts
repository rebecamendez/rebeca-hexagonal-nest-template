import { DataSource } from 'typeorm';

import { TaskEntity } from '../entities/task.entity';

export class TaskEntityBuilder {
  private readonly entity = new TaskEntity();

  public mock(customValues: Partial<TaskEntity> = {}): TaskEntityBuilder {
    this.entity.id = customValues.id ?? 1;
    this.entity.title = customValues.title ?? 'title';
    this.entity.description = customValues.description ?? 'description';
    this.entity.createdAt = customValues.createdAt ?? new Date('2021-10-01T00:00:00.000Z');
    this.entity.updatedAt = customValues.updatedAt ?? new Date('2021-10-01T00:00:00.000Z');
    return this;
  }

  public async save(dataSource: DataSource): Promise<TaskEntity> {
    try {
      const entityRepository = dataSource.getRepository(TaskEntity);
      const entity = await entityRepository.save(this.entity);
      return entity;
    } catch (error) {
      throw error; // For debugging purposes
    }
  }
}
