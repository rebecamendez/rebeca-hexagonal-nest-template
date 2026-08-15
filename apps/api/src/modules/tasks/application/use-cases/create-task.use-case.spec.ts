import { mock, mockReset } from 'jest-mock-extended';

import { createTaskMock } from '../../domain/task.mock';
import { CreateTaskCommand } from '../commands/create-task.command';
import { TaskRepository } from '../ports/task.repository';
import { CreateTaskUseCase } from './create-task.use-case';

describe('CreateTask use case', () => {
  const repository = mock<TaskRepository>();
  const useCase = new CreateTaskUseCase(repository);

  beforeEach(() => {
    mockReset(repository);
  });

  describe('given a task to create', () => {
    describe('when creating a task', () => {
      it('should create the task', async () => {
        const task = createTaskMock();
        const command = new CreateTaskCommand(task.title, task.description);

        repository.createTask.calledWith(task.title, task.description).mockResolvedValue(task);

        const result = await useCase.execute(command);

        expect(result).toEqual(task);
      });
    });
  });
});
