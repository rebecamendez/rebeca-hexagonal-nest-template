
import { StartedTestContainer } from 'testcontainers';
import { DataSource } from 'typeorm';

import { TaskEntity } from 'modules/shared/database/entities/task.entity';
import { TaskEntityBuilder } from 'modules/shared/database/tests/task.entity.builder';
import { EntityModelNotFoundError } from 'modules/shared/errors/entity-model-not-found';
import { containerSetup } from 'tests/test-containers.setup';
import { TaskRepository } from '../../application/ports/task.repository';
import { TaskRepositoryAdapter } from './task.repository.adapter';

describe('An task repository', () => {
  let dataSource: DataSource;
  let container: StartedTestContainer;
  let repository: TaskRepository;

  let taskEntity!: TaskEntity;

  const prepareScenario = async (dataSource: DataSource): Promise<void> => {
    taskEntity = await new TaskEntityBuilder().mock().save(dataSource);
  };

  beforeAll(async () => {
    ({ container, dataSource } = await containerSetup('task-repository-test'));

    repository = new TaskRepositoryAdapter(dataSource);

    await prepareScenario(dataSource);
  });

  afterAll(async () => {
    await dataSource.destroy();
    await container.stop();
  });

  describe('when getting tasks', () => {
    it('should return all tasks', async () => {
      const tasks = await repository.getTasks();
      expect(tasks).toMatchSnapshot();
    });
  });

  describe('when getting a task by id', () => {
    it('should return the task', async () => {
      const task = await repository.getTask(taskEntity.id);
      expect(task).toMatchSnapshot();
    });
  });

  describe('when creating a task', () => {
    it('should create a task', async () => {
      const task = await repository.createTask('title created', 'description created');
      expect(task).toMatchSnapshot();
    });
  });

  describe('when updating a task', () => {
    it('should update a task', async () => {
      const task = await repository.updateTask(taskEntity.id, 'title updated', 'description updated');
      expect(task).toMatchSnapshot();
    });
  });

  describe('when deleting a task', () => {
    it('should delete a task', async () => {
      await repository.deleteTask(taskEntity.id);
      await expect(repository.getTask(taskEntity.id)).rejects.toThrow(EntityModelNotFoundError);
    });
  });
});
