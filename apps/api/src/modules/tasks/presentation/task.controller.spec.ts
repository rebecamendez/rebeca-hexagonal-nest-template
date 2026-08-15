import { createTaskRequestMock } from '@rebeca-hexagonal-nest-template/api-contract';
import { mock, mockReset } from 'jest-mock-extended';

import { CreateTaskCommand } from '../application/commands/create-task.command';
import { UpdateTaskCommand } from '../application/commands/update-task.command';
import { CreateTaskUseCase } from '../application/use-cases/create-task.use-case';
import { DeleteTaskUseCase } from '../application/use-cases/delete-task.use-case';
import { GetTaskUseCase } from '../application/use-cases/get-task.use-case';
import { GetTasksUseCase } from '../application/use-cases/get-tasks.use-case';
import { UpdateTaskUseCase } from '../application/use-cases/update-task.use-case';
import { createTaskMock } from '../domain/task.mock';
import { TaskController } from './task.controller';

describe('A Task controller', () => {
  const getTasksUseCase = mock<GetTasksUseCase>();
  const getTaskUseCase = mock<GetTaskUseCase>();
  const createTaskUseCase = mock<CreateTaskUseCase>();
  const updateTaskUseCase = mock<UpdateTaskUseCase>();
  const deleteTaskUseCase = mock<DeleteTaskUseCase>();
  const controller = new TaskController(getTasksUseCase, getTaskUseCase, createTaskUseCase, updateTaskUseCase, deleteTaskUseCase);

  beforeEach(() => {
    mockReset(getTasksUseCase);
    mockReset(getTaskUseCase);
    mockReset(createTaskUseCase);
    mockReset(updateTaskUseCase);
    mockReset(deleteTaskUseCase);
  });

  it('should get all tasks', async () => {
    const tasks = [createTaskMock()];

    getTasksUseCase.execute.calledWith().mockResolvedValue(tasks);

    const result = await controller.getTasks();
    expect(result).toMatchSnapshot();
  });

  it('should get a task by id', async () => {
    const task = createTaskMock();

    getTaskUseCase.execute.calledWith(task.id).mockResolvedValue(task);

    const result = await controller.getTask(task.id);
    expect(result).toMatchSnapshot();
  });

  it('should create a task', async () => {
    const request = createTaskRequestMock();
    const task = createTaskMock();

    createTaskUseCase.execute.calledWith(new CreateTaskCommand(request.title, request.description)).mockResolvedValue(task);

    const result = await controller.createTask(request);
    expect(result).toMatchSnapshot();
  });

  it('should update a task', async () => {
    const request = createTaskRequestMock();
    const task = createTaskMock();

    updateTaskUseCase.execute
      .calledWith(new UpdateTaskCommand(task.id, request.title, request.description))
      .mockResolvedValue(task);

    const result = await controller.updateTask(task.id, request);
    expect(result).toMatchSnapshot();
  });

  it('should delete a task', async () => {
    const task = createTaskMock();

    await controller.deleteTask(task.id);
    expect(deleteTaskUseCase.execute).toHaveBeenCalledWith(task.id);
  });
});
