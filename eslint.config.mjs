import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import js from '@eslint/js';
import * as ts from 'typescript-eslint';
import next from '@next/eslint-plugin-next';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.next/**',
      '**/coverage/**',
      '**/*.config.*',
      '**/postcss.config.*',
      '**/*.d.ts',
    ],
    settings: {
      react: { version: 'detect' },
      // Global: keep plain node resolver only; no TS resolver globs here
      'import/resolver': {
        node: { extensions: ['.ts', '.tsx', '.js', '.jsx'] },
      },
    },
    languageOptions: {
      parser: ts.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        // Auto-detect nearest tsconfig per file (supports project references)
        project: true,
        tsconfigRootDir: __dirname,
        noWarnOnMultipleProjects: true,
      },
    },
  },

  js.configs.recommended,
  ...ts.configs.recommended,

  // WEB override — resolver points ONLY to apps/web/tsconfig.json
  {
    files: ['apps/web/**/*.{ts,tsx,js,jsx}'],
    plugins: { '@next/next': next, react, 'react-hooks': reactHooks, import: importPlugin },
    settings: {
      next: { rootDir: ['apps/web'] },
      'import/resolver': {
        node: { extensions: ['.ts', '.tsx', '.js', '.jsx'] },
        typescript: {
          alwaysTryTypes: true,
          tsconfigRootDir: __dirname,
          project: [resolve(__dirname, 'apps/web/tsconfig.json')],
        },
      },
    },
    rules: {
      ...next.configs['core-web-vitals'].rules,
      '@next/next/no-html-link-for-pages': 'off',
      'import/no-unresolved': ['error', { ignore: ['\\.css$'] }],
      'import/extensions': [
        'error',
        'ignorePackages',
        { ts: 'never', tsx: 'never', js: 'never', jsx: 'never' },
      ],
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
    },
    languageOptions: {
      globals: { window: true, document: true, navigator: true },
    },
  },

  // API override — resolver points ONLY to apps/api/tsconfig.json
  {
    files: ['apps/api/**/*.ts'],
    plugins: { import: importPlugin },
    settings: {
      'import/resolver': {
        node: { extensions: ['.ts', '.js'] },
        typescript: {
          alwaysTryTypes: true,
          tsconfigRootDir: __dirname,
          project: [resolve(__dirname, 'apps/api/tsconfig.json')],
        },
      },
    },
    rules: {
      'import/no-unresolved': ['error', { ignore: ['\\.json$'] }],
      'import/extensions': ['error', 'ignorePackages', { ts: 'never', js: 'never' }],
    },
    languageOptions: {
      globals: { process: true, __dirname: true, module: true, require: true },
    },
  },

  {
    files: ['**/*.{ts,tsx}'],
    plugins: { import: importPlugin },
    rules: { '@typescript-eslint/consistent-type-imports': 'error' },
  },
];
