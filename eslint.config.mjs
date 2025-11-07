// eslint.config.mjs (root)
import js from '@eslint/js';
import * as ts from 'typescript-eslint';
import next from '@next/eslint-plugin-next';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';

export default [
  // 0) Global ignores + GLOBAL resolver settings
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.next/**', // ignore Next build output & types
      '**/coverage/**',
      '**/*.config.*', // ignore config files
      '**/postcss.config.*',
      '**/*.d.ts', // (optional) ignore ambient d.ts
    ],
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        node: { extensions: ['.ts', '.tsx', '.d.ts', '.js', '.jsx'] },
        // ✅ Point to each workspace tsconfig so ESLint resolves "@/*" (shadcn) and TS paths.
        typescript: {
          alwaysTryTypes: true,
          project: [
            'apps/*/tsconfig.json',
            'packages/*/tsconfig.json',
            // (optional) add infra/tools configs if they include TS
            // 'infra/tsconfig.json'
          ],
        },
      },
    },
  },

  // 1) Base JS + TS rules (non type-aware)
  js.configs.recommended,
  ...ts.configs.recommended,

  // 2) WEB (Next.js + React)
  {
    files: ['apps/web/**/*.{ts,tsx,js,jsx}'],
    plugins: { '@next/next': next, react, 'react-hooks': reactHooks, import: importPlugin },
    settings: {
      next: { rootDir: ['apps/web'] },
      // (resolver is applied globally above)
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
      parser: ts.parser,
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
      globals: {
        window: true,
        document: true,
        navigator: true,
      },
    },
  },

  // 3) API (Node/Express)
  {
    files: ['apps/api/**/*.ts'],
    plugins: { import: importPlugin },
    rules: {
      'import/no-unresolved': ['error', { ignore: ['\\.json$'] }],
      'import/extensions': ['error', 'ignorePackages', { ts: 'never', js: 'never' }],
    },
    languageOptions: {
      parser: ts.parser,
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
      globals: {
        // Node globals
        process: true,
        __dirname: true,
        module: true,
        require: true,
      },
    },
  },

  // 4) Shared TS niceties for all packages
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { import: importPlugin },
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
    },
    languageOptions: {
      parser: ts.parser,
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    },
  },
];
