import { mock, mockReset } from 'jest-mock-extended';

import { createTaskMock } from '../../domain/task.mock';
import { TaskRepository } from '../ports/task.repository';
import { GetTaskUseCase } from './get-task.use-case';

describe('GetTask use case', () => {
  const repository = mock<TaskRepository>();
  const useCase = new GetTaskUseCase(repository);

  beforeEach(() => {
    mockReset(repository);
  });

  describe('given an existing task', () => {
    describe('when viewing a task', () => {
      it('should return the task', async () => {
        const task = createTaskMock();

        repository.getTask.calledWith(task.id).mockResolvedValue(task);

        const result = await useCase.execute(task.id);

        expect(result).toEqual(task);
      });
    });
  });
});
