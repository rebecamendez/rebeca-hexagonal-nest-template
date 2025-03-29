import { GenericContainer, StartedTestContainer } from 'testcontainers';
import { DataSource } from 'typeorm';

export interface ContainerSetup {
  container: StartedTestContainer;
  dataSource: DataSource;
}

const createPostgresContainer = async (databaseName: string): Promise<StartedTestContainer> => {
  return new GenericContainer('postgres')
    .withEnvironment({
      POSTGRES_USER: 'the-user',
      POSTGRES_PASSWORD: 'the-password',
      POSTGRES_DB: databaseName
    })
    .withExposedPorts(5432)
    .withName(databaseName)
    .start();
};

const createDataSource = async (container: StartedTestContainer, databaseName: string): Promise<DataSource> => {
  const entitiesPath = __dirname + './../modules/shared/database/entities/**/*.entity{.ts,.js}';
  const migrationsPath = __dirname + './../migrations/**/*{.ts,.js}';

  const dataSource = new DataSource({
    name: databaseName,
    type: 'postgres',
    host: container.getHost(),
    port: container.getMappedPort(5432),
    username: 'the-user',
    password: 'the-password',
    database: databaseName,
    entities: [entitiesPath],
    migrations: [migrationsPath],
    synchronize: false,
    logging: false
  });

  // Initialize the data source
  await dataSource.initialize();
  await dataSource.runMigrations();

  return dataSource;
};

export const containerSetup = async (databaseName: string): Promise<ContainerSetup> => {
  const container = await createPostgresContainer(databaseName);
  const dataSource = await createDataSource(container, databaseName);

  return { container, dataSource };
};
