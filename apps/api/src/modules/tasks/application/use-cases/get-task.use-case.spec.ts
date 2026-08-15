import { mock, mockReset } from 'jest-mock-extended';

import { createTaskMock } from '../../domain/task.mock';
import { TaskRepository } from '../ports/task.repository';
import { GetTaskUseCase } from './get-task.use-case';

describe('The GetTask use case', () => {
  const repository = mock<TaskRepository>();
  const useCase = new GetTaskUseCase(repository);

  beforeEach(() => {
    mockReset(repository);
  });

  it('should get a task by id', async () => {
    const task = createTaskMock();

    repository.getTask.calledWith(task.id).mockResolvedValue(task);

    const result = await useCase.execute(task.id);

    expect(result).toEqual(task);
  });
});
