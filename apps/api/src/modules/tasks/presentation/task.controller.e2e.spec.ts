/* eslint-disable no-process-env */
import { setupNestApp } from 'main.setup';
import { TaskEntityBuilder } from 'modules/shared/database/tests/task.entity.builder';
import request from 'supertest';
import { StartedTestContainer } from 'testcontainers';
import { containerSetup } from 'tests/test-containers.setup';
import { DataSource } from 'typeorm';

import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../../../app.module';

describe('GET /tasks (e2e)', () => {
  let app: INestApplication;
  let container: StartedTestContainer;
  let dataSource: DataSource;

  const prepareScenario = async (dataSource: DataSource): Promise<void> => {
    await new TaskEntityBuilder().mock().save(dataSource);
  };

  beforeAll(async () => {
    const databaseName = 'task-endpoints-e2e-test';
    ({ container, dataSource } = await containerSetup(databaseName));

    await prepareScenario(dataSource);

    const mockedConfig = jest.fn((key: string) => {
      const map: Record<string, string | undefined> = process.env;
      switch (key) {
        case 'DB_HOST':
          return container.getHost();
        case 'DB_PORT':
          return container.getMappedPort(5432);
        case 'DB_USER':
          return 'the-user';
        case 'DB_PASSWORD':
          return 'the-password';
        case 'DB_DATABASE':
          return databaseName;
      }
      return map[key];
    });

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    })
      .overrideProvider(ConfigService)
      .useValue({ get: mockedConfig, getOrThrow: mockedConfig })
      .compile();

    app = moduleFixture.createNestApplication();
    setupNestApp(app, 3000, false); // https://stackoverflow.com/questions/59355841/how-to-apply-global-pipes-during-e2e-tests
    await app.init();
  });

  afterAll(async () => {
    if (app) await app.close();
    if (container) await container.stop();
  });

  describe('given tasks exist in the system', () => {
    describe('when a client requests the task list', () => {
      it('should return all tasks (200 OK)', async () => {
        const response = await request(app.getHttpServer()).get('/tasks').send();

        expect(response.status).toBe(200);
        expect(response.body).toMatchSnapshot();
      });
    });
  });
});
