import { TaskEntity } from 'modules/shared/database/entities/task.entity';

import { Task } from '../../../domain/task';

export class TaskEntityMapper {
  public static toDomain(entity: TaskEntity): Task {
    const task = new Task();
    task.id = entity.id;
    task.title = entity.title;
    task.description = entity.description;
    return task;
  }

  public static toEntity(domain: Task): TaskEntity {
    const entity = new TaskEntity();
    entity.id = domain.id;
    entity.title = domain.title;
    entity.description = domain.description;
    return entity;
  }
}
