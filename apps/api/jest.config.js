module.exports = {
  collectCoverageFrom: ['**/*.ts', '!**/*.spec.ts', '!**/*.mock.ts', '!migrations/**/*', '!tests/**/*'],
  coverageDirectory: '../coverage/all',
  coverageReporters: ['lcov', 'text-summary', 'clover', 'html'],
  moduleFileExtensions: ['ts', 'js'],
  modulePaths: ['<rootDir>'],
  preset: 'ts-jest',
  reporters: [
    'default',
    [
      'jest-html-reporter',
      {
        outputPath: './coverage/all/html-report.html',
        pageTitle: 'Test report — all targets',
        additionalInformation: [
          { label: '🧪 Tests', value: 'The complete suite across every layer.' },
          { label: '🎭 Mocks', value: 'Per layer: controllers mock use cases, use cases mock repository ports.' },
          { label: '✅ Real', value: 'Repository adapters run against PostgreSQL via TestContainers.' }
        ]
      }
    ]
  ],
  rootDir: 'src',
  setupFilesAfterEnv: ['../jest.setup.ts'],
  testEnvironment: 'node',
  testRegex: '.*spec\\.ts$',
  testTimeout: 20000,
  transform: { '^.+\\.ts': ['ts-jest'] }
};
