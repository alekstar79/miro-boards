import js from '@eslint/js'
import globals from 'globals'
import * as reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import boundaries from 'eslint-plugin-boundaries'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      'react-hooks': reactHooks as any,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...(reactHooks.configs.recommended.rules as any),
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  {
    plugins: {
      boundaries,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
      'boundaries/elements': [
        {
          type: 'app',
          pattern: './src/app',
        },
        {
          type: 'features',
          pattern: './src/features/*',
        },
        {
          type: 'shared',
          pattern: './src/shared',
        },
      ],
    },
    rules: {
      'boundaries/element-types': [
        2,
        {
          default: 'allow',
          rules: [
            {
              from: 'shared',
              disallow: ['app', 'features'],
              message:
                'Модуль нижележащего слоя (${file.type}) не может импортировать модуль вышележащего слоя (${dependency.type})',
            },
            {
              from: 'features',
              disallow: ['app'],
              message:
                'Модуль нижележащего слоя (${file.type}) не может импортировать модуль вышележащего слоя (${dependency.type})',
            },
          ],
        },
      ],
      'boundaries/entry-point': [
        2,
        {
          default: 'disallow',
          message:
            'Модуль (${file.type}) должен импортироваться через public API. Прямой импорт из ${dependency.source} запрещен',
          rules: [
            {
              target: ['shared', 'app'],
              allow: '**',
            },
            {
              target: ['features'],
              allow: ['index.(ts|tsx)', '*.page.tsx'],
            }
          ]
        }
      ]
    }
  } as any
)
