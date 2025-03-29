const typescript = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const checkFile = require('eslint-plugin-check-file');
const importPlugin = require('eslint-plugin-import');
const prettier = require('eslint-plugin-prettier');
const unusedImports = require('eslint-plugin-unused-imports');

module.exports = [
  {
    files: ['**/*.{js,ts}'],
    ignores: ['**/*.spec.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      'prettier': prettier,
      'unused-imports': unusedImports,
      'import': importPlugin,
      'check-file': checkFile,
    },
    rules: {
      // Prettier Rules
      'prettier/prettier': 'error',

      // Basic ESLint Rules
      'no-console': 'error',
      'no-debugger': 'error',
      'no-duplicate-imports': 'error',
      'no-process-env': 'error',
      'no-return-await': 'error',

      // Import Rules
      'import/no-cycle': 'error',
      'import/no-duplicates': 'error',
      'import/no-self-import': 'error',
      'import/no-useless-path-segments': 'error',
      'import/no-relative-parent-imports': 'error',
      'import/no-restricted-paths': 'error',
      //'import/no-unresolved': 'error', // TODO: Enable this rule  
      'import/no-webpack-loader-syntax': 'error',

      // File Naming Rules
      'check-file/filename-naming-convention': [
        'error',
        { '**/*.{js,ts}': 'KEBAB_CASE'},
        { ignoreMiddleExtensions: true }
      ],

      // TypeScript Rules - Types and Annotations
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-var-requires': 'error',
      '@typescript-eslint/prefer-as-const': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/unified-signatures': 'error',
      '@typescript-eslint/array-type': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/no-unnecessary-type-constraint': 'error',

      // TypeScript Rules - Type Safety
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/restrict-plus-operands': 'error',
      '@typescript-eslint/restrict-template-expressions': 'error',
      '@typescript-eslint/unbound-method': 'error',

      // TypeScript Rules - Promises and Async
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/promise-function-async': 'error',

      // TypeScript Rules - Classes and Members
      '@typescript-eslint/explicit-member-accessibility': 'error',
      '@typescript-eslint/member-ordering': 'error',
      '@typescript-eslint/no-invalid-this': 'error',
      '@typescript-eslint/no-redeclare': 'error',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/prefer-readonly': 'error',

      // TypeScript Rules - Optimizations
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'error',

      // Unused Imports Rules
      'unused-imports/no-unused-imports': 'error',

      // Disabled or Modified Rules
      '@typescript-eslint/no-unused-vars': ['error', { "vars": "all", "args": "none", "ignoreRestSiblings": false }],
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/no-empty-interface': 'error'
    }
  },
  {
    files: ['**/*.spec.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      'prettier': prettier,
      'unused-imports': unusedImports,
      'import': importPlugin,
      'check-file': checkFile,
    },
    rules: {
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off'
    }
  }
]; 
