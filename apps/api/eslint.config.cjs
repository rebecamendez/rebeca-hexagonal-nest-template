const config = async () => {
  const baseConfig = await import('@rebeca-hexagonal-nest-template/lint-config/eslint.js');

  return [
    {
      ...baseConfig.default[0],
      files: ['**/*.ts'],
      languageOptions: {
        ...baseConfig.default[0].languageOptions,
        parserOptions: {
          project: './tsconfig.json'
        }
      }
    }
  ];
};

module.exports = config(); 
