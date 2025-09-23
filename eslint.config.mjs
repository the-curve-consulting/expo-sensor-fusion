import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { FlatCompat } from '@eslint/eslintrc'
import stylistic from '@stylistic/eslint-plugin'
import { defineConfig } from 'eslint/config'
import expoConfig from 'eslint-config-expo/flat.js'
import testingLibrary from 'eslint-plugin-testing-library';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://docs.expo.dev/guides/using-eslint/

const compat = new FlatCompat({
    baseDirectory: __dirname
})

export default defineConfig([
    expoConfig,

    // Setup plugins
    // - Basically a list of installed eslint-plugin-* packages without the eslint-plugin- prefix
    ...compat.plugins('testing-library', 'simple-import-sort'),

    // Common for all JS/TS files (including .d.ts)
    {
        plugins: {
            '@stylistic': stylistic
        },
        files: ['**/*.{js,mjs,ts,jsx,tsx}', '**/*.d.ts'],
        rules: {
            'simple-import-sort/imports': 'warn',
            'react/no-unknown-property': 'off',
            'react/display-name': 'off',
            'react/jsx-curly-brace-presence': [
                'warn',
                { props: 'never', children: 'never' }
            ],
            'react/function-component-definition': [
                'error',
                {
                    namedComponents: 'arrow-function',
                    unnamedComponents: 'arrow-function'
                }
            ],
            'no-unused-expressions': 'warn',
            'prefer-const': 'warn',
            'no-var': 'error',
            'prefer-template': 'error',
            'prefer-spread': 'error',
            'arrow-body-style': ['off'],
            'no-console': 'off',
            'no-debugger': 'off',
            curly: 'error',
            camelcase: ['error', { properties: 'never', ignoreDestructuring: false }],
            quotes: ['warn', 'single', { avoidEscape: true }],
            '@stylistic/jsx-quotes': ['warn', 'prefer-double'],
            '@stylistic/semi': 'off',
            '@stylistic/space-in-parens': 'warn',
            '@stylistic/space-infix-ops': 'error',
            '@stylistic/spaced-comment': ['warn', 'always', { markers: ['/'] }],
            '@stylistic/object-curly-spacing': ['error', 'always'],
            '@stylistic/array-bracket-spacing': ['warn', 'never'],
            '@stylistic/comma-dangle': 'warn',
            '@stylistic/quote-props': ['warn', 'as-needed'],
            '@stylistic/arrow-spacing': 'warn',
            '@stylistic/indent': [
                'error',
                2,
                { SwitchCase: 1, ignoredNodes: ['TemplateLiteral'] }
            ]
        }
    },

    // Typescript files only
    {
        files: ['**/*.{ts,tsx}', '**/*.d.ts'],
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname
            }
        },
        rules: {
            '@typescript-eslint/no-floating-promises': ['warn', { ignoreVoid: true }],
            '@typescript-eslint/no-misused-promises': [
                'error',
                { checksVoidReturn: { attributes: false } }
            ],
            '@typescript-eslint/no-var-requires': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/unbound-method': 'off',
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/no-unsafe-return': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-empty-object-type': 'off'
        },
        ignores: ['**/*.test.{ts,tsx}', '**/__tests__/**/*.{ts,tsx}'],
    },

    // Test file configuration
    {
        files: ['**/*.test.{ts,tsx}', '**/__tests__/**/*.{ts,tsx}'],
        ...testingLibrary.configs['flat/dom'],
        rules: {
            ...testingLibrary.configs['flat/dom'].rules,
            '@typescript-eslint/no-require-imports': 'off',
            '@typescript-eslint/no-var-requires': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/unbound-method': 'off',
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/no-unsafe-return': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-empty-object-type': 'off'
        }
    },

    // Global ignore patterns
    {
        ignores: [
            'build',
            'android',
            'ios',
            '*/node_modules',
            '.vscode',
            '*/babel.config.js',
            '*/metro.config.js',
            '*/webpack.config.js',
            '*.js',
            '*/package-lock.json',
            '*/package.json',
            '*/scripts',
            '*.app',
            '*.ipa'
        ]
    }
])