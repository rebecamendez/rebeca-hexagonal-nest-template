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

describe('Task controller', () => {
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

  describe('given tasks in the system', () => {
    describe('when listing tasks', () => {
      it('should list all tasks (200 OK)', async () => {
        const tasks = [createTaskMock()];

        getTasksUseCase.execute.calledWith().mockResolvedValue(tasks);

        const result = await controller.getTasks();
        expect(result).toMatchSnapshot();
      });
    });
  });

  describe('given an existing task', () => {
    describe('when viewing a task', () => {
      it('should return the task (200 OK)', async () => {
        const task = createTaskMock();

        getTaskUseCase.execute.calledWith(task.id).mockResolvedValue(task);

        const result = await controller.getTask(task.id);
        expect(result).toMatchSnapshot();
      });
    });
  });

  describe('given a task to create', () => {
    describe('when creating a task', () => {
      it('should create the task (201 Created)', async () => {
        const request = createTaskRequestMock();
        const task = createTaskMock();

        createTaskUseCase.execute.calledWith(new CreateTaskCommand(request.title, request.description)).mockResolvedValue(task);

        const result = await controller.createTask(request);
        expect(result).toMatchSnapshot();
      });
    });
  });

  describe('given an existing task', () => {
    describe('when updating a task', () => {
      it('should update the task (200 OK)', async () => {
        const request = createTaskRequestMock();
        const task = createTaskMock();

        updateTaskUseCase.execute
          .calledWith(new UpdateTaskCommand(task.id, request.title, request.description))
          .mockResolvedValue(task);

        const result = await controller.updateTask(task.id, request);
        expect(result).toMatchSnapshot();
      });
    });
  });

  describe('given an existing task', () => {
    describe('when deleting a task', () => {
      it('should remove the task (200 OK)', async () => {
        const task = createTaskMock();

        await controller.deleteTask(task.id);
        expect(deleteTaskUseCase.execute).toHaveBeenCalledWith(task.id);
      });
    });
  });
});
