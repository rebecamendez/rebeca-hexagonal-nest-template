import { TaskRequest, TaskResponse } from '@rebeca-hexagonal-nest-template/api-contract';

import { Task } from '../../domain/task';

export class TaskMapper {
  public static toResponse(task: Task): TaskResponse {
    const response = new TaskResponse();
    response.id = task.id;
    response.title = task.title;
    response.description = task.description;
    return response;
  }

  public static toDomain(request: TaskRequest): Task {
    const domain = new Task();
    domain.title = request.title;
    domain.description = request.description;
    return domain;
  }
}
