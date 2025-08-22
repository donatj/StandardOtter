// ESLint Flat Config (ESM) for Standard Otter
// Converted from legacy .eslintrc to eslint.config.mjs

import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  // Ignore patterns
  {
    ignores: [
      'node_modules/',
      'release/',
      'css/',
      'js/',
      'index.html',
    ],
  },

  // Build scripts and config files (CommonJS style allowed)
  {
    files: ['*.cjs', 'rollup.config.mjs'],
    languageOptions: {
      sourceType: 'commonjs',
    },
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
    },
  },

  // TypeScript source files
  {
    files: ['ts/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        // Minimal globals to avoid noisy no-undef in browser/Node contexts
        window: 'readonly',
        document: 'readonly',
        self: 'readonly',
        console: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        module: 'readonly',
        require: 'readonly',
        monaco: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      // Base recommended rule sets
      ...tseslint.configs.recommended.rules,

      // Project preferences
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true },
      ],
      // Keep existing code style; avoid noisy const refactors
      'prefer-const': 'off',
      // We declare common globals above; also avoid noise for ambient names
      'no-undef': 'off',
    },
  },
];
