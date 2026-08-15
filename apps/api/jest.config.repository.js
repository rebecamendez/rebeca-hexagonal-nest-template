const baseConfig = require('./jest.config');

module.exports = {
  ...baseConfig,
  coverageDirectory: '../coverage/repository',
  reporters: [
    'default',
    [
      'jest-html-reporter',
      {
        outputPath: './coverage/repository/html-report.html',
        pageTitle: 'Test report — repository tests',
        additionalInformation: [
          { label: '🧪 Tests', value: 'Repository adapters (TypeORM CRUD operations).' },
          { label: '🎭 Mocks', value: 'Nothing — the adapter runs against a real database.' },
          { label: '✅ Real', value: 'PostgreSQL via TestContainers.' }
        ]
      }
    ]
  ],
  testRegex: '.repository.adapter.spec.ts$',
  collectCoverageFrom: ['**/*.repository.adapter.ts', '**/*-entity.mapper.ts','**/*.entity.ts'],
  testTimeout: 30000
};
