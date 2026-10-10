import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import prettier from 'eslint-config-prettier/flat'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default defineConfig([
  {
    ignores: ['dist/**', 'node_modules/**', 'src/app/routeTree.gen.ts'],
  },
  {
    files: ['src/**/*.{js,jsx,ts,tsx}', '*.{js,mjs}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      prettier,
    ],
    plugins: {
      'react-refresh': reactRefresh,
    },
    rules: {
      curly: ['error', 'all'],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true, allowExportNames: ['Route', 'NotFound', 'ErrorComponent'] },
      ],
    },
  },
  {
    files: ['src/app/main.tsx'],
    rules: { 'react-refresh/only-export-components': 'off' },
  },
  {
    files: ['src/app/routes/**/*.tsx'],
    rules: { 'react-refresh/only-export-components': 'off' },
  },
])
