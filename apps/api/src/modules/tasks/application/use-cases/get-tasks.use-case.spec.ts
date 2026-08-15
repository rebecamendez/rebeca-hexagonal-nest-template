import { mock, mockReset } from 'jest-mock-extended';

import { createTaskMock } from '../../domain/task.mock';
import { TaskRepository } from '../ports/task.repository';
import { GetTasksUseCase } from './get-tasks.use-case';

describe('GetTasks use case', () => {
  const repository = mock<TaskRepository>();
  const useCase = new GetTasksUseCase(repository);

  beforeEach(() => {
    mockReset(repository);
  });

  describe('given tasks in the system', () => {
    describe('when listing tasks', () => {
      it('should list all tasks', async () => {
        const tasks = [createTaskMock()];

        repository.getTasks.calledWith().mockResolvedValue(tasks);

        const result = await useCase.execute();

        expect(result).toEqual(tasks);
      });
    });
  });
});
