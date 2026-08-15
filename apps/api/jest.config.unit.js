const baseConfig = require('./jest.config');

module.exports = {
  ...baseConfig,
  coverageDirectory: '../coverage/unit',
  reporters: [
    'default',
    [
      'jest-html-reporter',
      {
        outputPath: './coverage/unit/html-report.html',
        pageTitle: 'Test report — unit tests',
        additionalInformation: [
          { label: '🧪 Tests', value: 'Presentation controllers and application use cases.' },
          { label: '🎭 Mocks', value: 'Use cases (in controllers) and repository ports (in use cases).' },
          { label: '✅ Real', value: 'Nothing — pure logic and mocks only.' }
        ]
      }
    ]
  ],
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
