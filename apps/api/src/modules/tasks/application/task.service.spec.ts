import { mock, mockReset } from 'jest-mock-extended';

import { TaskService } from '../application/task.service';
import { createTaskMock } from '../domain/task.mock';
import { TaskRepository } from './ports/task.repository';

describe('A Task service', () => {
  const repository = mock<TaskRepository>();
  const service = new TaskService(repository);

  beforeEach(() => {
    mockReset(repository);
  });

  it('should get all tasks', async () => {
    const tasks = [createTaskMock()];

    repository.getTasks.calledWith().mockResolvedValue(tasks);

    const result = await service.getTasks();

    expect(result).toEqual(tasks);
  });

  it('should get a task by id', async () => {
    const task = createTaskMock();

    repository.getTask.calledWith(task.id).mockResolvedValue(task);

    const result = await service.getTask(task.id);

    expect(result).toEqual(task);
  });

  it('should create a task', async () => {
    const task = createTaskMock();

    repository.createTask.calledWith(task.title, task.description).mockResolvedValue(task);

    const result = await service.createTask(task.title, task.description);

    expect(result).toEqual(task);
  });

  it('should update a task', async () => {
    const task = createTaskMock();

    repository.updateTask.calledWith(task.id, task.title, task.description).mockResolvedValue(task);

    const result = await service.updateTask(task.id, task.title, task.description);

    expect(result).toEqual(task);
  });

  it('should remove a task', async () => {
    const task = createTaskMock();

    await service.deleteTask(task.id);

    expect(repository.deleteTask).toHaveBeenCalledWith(task.id);
  });
});
