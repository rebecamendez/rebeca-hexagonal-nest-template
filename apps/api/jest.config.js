module.exports = {
  collectCoverageFrom: ['**/*.ts', '!**/*.spec.ts', '!**/*.mock.ts', '!migrations/**/*', '!tests/**/*'],
  coverageDirectory: '../coverage',
  coverageReporters: ['lcov', 'text-summary', 'clover', 'html'],
  moduleFileExtensions: ['ts', 'js'],
  modulePaths: ['<rootDir>'],
  preset: 'ts-jest',
  rootDir: 'src',
  setupFilesAfterEnv: ['../jest.setup.ts'],
  testEnvironment: 'node',
  testRegex: '.*spec\\.ts$',
  testTimeout: 20000,
  transform: { '^.+\\.ts': ['ts-jest'] }
};
