module.exports = {
  root: true,
  extends: [
    'universe/native',
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  overrides: [
    {
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
      files: ['./**/*.js']
    }
  ],
  ignorePatterns: [
    'build',
    'android',
    'ios',
    'node_modules',
    '.vscode',
    'babel.config.js',
    'metro.config.js',
    'webpack.config.js',
    '*.js',
    'package-lock.json',
    'package.json'
  ],
  plugins: ['react', '@typescript-eslint', 'simple-import-sort'],
  parser: '@typescript-eslint/parser',
  rules: {
    'jsx-quotes': ['warn', 'prefer-double'],
    'react/no-unknown-property': 'off',
    'react/jsx-curly-brace-presence': [
      'warn',
      { props: 'never', children: 'never' }
    ],
    'react/display-name': 'off',
    'react/no-unescaped-entities': 'off',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function'
      }
    ],
    'quote-props': ['warn', 'consistent-as-needed'],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': 'warn',
    'no-unused-expressions': 'warn',
    'space-in-parens': 'warn',
    'space-infix-ops': 'error',
    'spaced-comment': ['warn', 'always', { markers: ['/'] }],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['warn', 'never'],
    'prefer-const': 'warn',
    'curly': 'error',
    'camelcase': ['error', { properties: 'never', ignoreDestructuring: false }],
    'block-spacing': 'warn',
    'use-isnan': 'error',
    'quotes': ['error', 'single', { avoidEscape: true }],
    'indent': [
      'error',
      2,
      { SwitchCase: 1, ignoredNodes: ['TemplateLiteral'] }
    ],
    'no-var': 'error',
    'prefer-template': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-spread': 'error',
    'arrow-spacing': 'warn',
    'arrow-body-style': ['off'],
    'no-extra-semi': 'warn',
    'no-debugger': 'off'
  },
  settings: {
    react: {
      version: '18'
    }
  }
};
