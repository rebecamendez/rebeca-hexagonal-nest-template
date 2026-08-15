import { mock, mockReset } from 'jest-mock-extended';

import { createTaskMock } from '../../domain/task.mock';
import { TaskRepository } from '../ports/task.repository';
import { DeleteTaskUseCase } from './delete-task.use-case';

describe('DeleteTask use case', () => {
  const repository = mock<TaskRepository>();
  const useCase = new DeleteTaskUseCase(repository);

  beforeEach(() => {
    mockReset(repository);
  });

  describe('given an existing task', () => {
    describe('when deleting a task', () => {
      it('should remove the task', async () => {
        const task = createTaskMock();

        await useCase.execute(task.id);

        expect(repository.deleteTask).toHaveBeenCalledWith(task.id);
      });
    });
  });
});
