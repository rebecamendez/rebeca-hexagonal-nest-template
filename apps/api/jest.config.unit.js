const baseConfig = require('./jest.config');

module.exports = {
  ...baseConfig,
  testRegex: '.*\\.spec\\.ts$',
  collectCoverageFrom: [
    '**/*.ts',
    '!**/*.module.ts',
    '!**/*.spec.ts',
    '!**/*.mock.ts',
    '!**/*.entity.ts',
    '!**/*repository.adapter.ts',
    '!**/*entity.mapper.ts',
    '!migrations/**/*',
    '!tests/**/*'
  ],
  testPathIgnorePatterns: ['.repository.adapter.spec.ts$','.e2e.spec.ts$']
};
