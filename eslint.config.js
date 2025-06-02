import js from '@eslint/js'
import globals from 'globals'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import pluginQuery from '@tanstack/eslint-plugin-query'

export default tseslint.config(
  { ignores: ['dist', '**/*.d.ts'] },
  pluginQuery.configs['flat/recommended'],
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: { ...globals.browser, ...globals.jest },
      parserOptions: {
        jsx: true,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      'jsx-a11y/no-autofocus': 'off', // Chakra often uses autofocus
      'jsx-a11y/anchor-is-valid': 'off', // Chakra's Link may be confused with <a>
      'react/no-unknown-property': ['error', { ignore: ['css'] }], // Chakra uses `css` prop
      'react-hooks/exhaustive-deps': ['warn'],
      'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
      'react/jsx-boolean-value': ['error', 'never'], // ex. <Button isDisabled={true} -> isDisabled
      'react/react-in-jsx-scope': 'off',
    },
    env: {
      vitest: true,
    },
  },
  {
    files: ['**/*.test.{ts,tsx}'],
    rules: {
      'no-undef': 'off', // Vitest uses global functions (test, expect)
    },
  }
)
