import { mock, mockReset } from 'jest-mock-extended';

import { createTaskMock } from '../../domain/task.mock';
import { UpdateTaskCommand } from '../commands/update-task.command';
import { TaskRepository } from '../ports/task.repository';
import { UpdateTaskUseCase } from './update-task.use-case';

describe('The UpdateTask use case', () => {
  const repository = mock<TaskRepository>();
  const useCase = new UpdateTaskUseCase(repository);

  beforeEach(() => {
    mockReset(repository);
  });

  it('should update a task', async () => {
    const task = createTaskMock();
    const command = new UpdateTaskCommand(task.id, task.title, task.description);

    repository.updateTask.calledWith(task.id, task.title, task.description).mockResolvedValue(task);

    const result = await useCase.execute(command);

    expect(result).toEqual(task);
  });
});
