import js from '@eslint/js'
import react from 'eslint-plugin-react'
import globals from 'globals'
import ts from 'typescript-eslint'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  {
    ignores: ['.react-router', 'build', 'out', 'public']
  },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  js.configs.recommended,
  ...ts.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  { settings: { react: { version: 'detect' } } }
]
