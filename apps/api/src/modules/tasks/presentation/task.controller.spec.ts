import { createTaskRequestMock } from '@rebeca-hexagonal-nest-template/api-contract';
import { mock, mockReset } from 'jest-mock-extended';

import { TaskService } from '../application/task.service';
import { createTaskMock } from '../domain/task.mock';
import { TaskController } from './task.controller';

describe('A Task controller', () => {
  const service = mock<TaskService>();
  const controller = new TaskController(service);

  beforeEach(() => {
    mockReset(service);
  });

  it('should get all tasks', async () => {
    const tasks = [createTaskMock()];

    service.getTasks.calledWith().mockResolvedValue(tasks);

    const result = await controller.getTasks();
    expect(result).toMatchSnapshot();
  });

  it('should get a task by id', async () => {
    const task = createTaskMock();

    service.getTask.calledWith(task.id).mockResolvedValue(task);

    const result = await controller.getTask(task.id);
    expect(result).toMatchSnapshot();
  });

  it('should create a task', async () => {
    const request = createTaskRequestMock();
    const task = createTaskMock();

    service.createTask.calledWith(request.title, request.description).mockResolvedValue(task);

    const result = await controller.createTask(request);
    expect(result).toMatchSnapshot();
  });

  it('should update a task', async () => {
    const request = createTaskRequestMock();
    const task = createTaskMock();

    service.updateTask.calledWith(task.id, request.title, request.description).mockResolvedValue(task);

    const result = await controller.updateTask(task.id, request);
    expect(result).toMatchSnapshot();
  });

  it('should delete a task', async () => {
    const task = createTaskMock();

    await controller.deleteTask(task.id);
    expect(service.deleteTask).toHaveBeenCalledWith(task.id);
  });
});
