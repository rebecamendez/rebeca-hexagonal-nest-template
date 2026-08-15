import { mock, mockReset } from 'jest-mock-extended';

import { createTaskMock } from '../../domain/task.mock';
import { TaskRepository } from '../ports/task.repository';
import { GetTasksUseCase } from './get-tasks.use-case';

describe('The GetTasks use case', () => {
  const repository = mock<TaskRepository>();
  const useCase = new GetTasksUseCase(repository);

  beforeEach(() => {
    mockReset(repository);
  });

  it('should get all tasks', async () => {
    const tasks = [createTaskMock()];

    repository.getTasks.calledWith().mockResolvedValue(tasks);

    const result = await useCase.execute();

    expect(result).toEqual(tasks);
  });
});
