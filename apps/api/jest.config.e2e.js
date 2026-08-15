const baseConfig = require('./jest.config');

module.exports = {
  ...baseConfig,
  coverageDirectory: '../coverage/e2e',
  reporters: [
    'default',
    [
      'jest-html-reporter',
      {
        outputPath: './coverage/e2e/html-report.html',
        pageTitle: 'Test report — end-to-end tests',
        additionalInformation: [
          { label: 'Tests', value: 'Complete HTTP flows across the full stack.' },
          { label: 'Mocks', value: 'Only the ConfigService pointed at the test container.' },
          { label: 'Real', value: 'HTTP, validation, dependency injection, TypeORM, and the database.' }
        ]
      }
    ]
  ],
  testRegex: '.e2e.spec.ts$',
  testTimeout: 30000
};
