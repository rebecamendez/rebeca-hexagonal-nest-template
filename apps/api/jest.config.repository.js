const baseConfig = require('./jest.config');

module.exports = {
  ...baseConfig,
  testRegex: '.repository.adapter.spec.ts$',
  collectCoverageFrom: ['**/*.repository.adapter.ts', '**/*-entity.mapper.ts','**/*.entity.ts'],
  testTimeout: 30000
};
