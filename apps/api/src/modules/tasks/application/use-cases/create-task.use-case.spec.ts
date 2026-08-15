import { mock, mockReset } from 'jest-mock-extended';

import { createTaskMock } from '../../domain/task.mock';
import { CreateTaskCommand } from '../commands/create-task.command';
import { TaskRepository } from '../ports/task.repository';
import { CreateTaskUseCase } from './create-task.use-case';

describe('The CreateTask use case', () => {
  const repository = mock<TaskRepository>();
  const useCase = new CreateTaskUseCase(repository);

  beforeEach(() => {
    mockReset(repository);
  });

  it('should create a task', async () => {
    const task = createTaskMock();
    const command = new CreateTaskCommand(task.title, task.description);

    repository.createTask.calledWith(task.title, task.description).mockResolvedValue(task);

    const result = await useCase.execute(command);

    expect(result).toEqual(task);
  });
});
