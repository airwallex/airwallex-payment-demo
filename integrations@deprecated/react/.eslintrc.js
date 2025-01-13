const confusingBrowserGlobals = require('confusing-browser-globals');

module.exports = {
  env: {
    browser: true,
    node: true,
    commonjs: true,
    serviceworker: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'google', 'prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    allowImportExportEverywhere: true,
  },
  overrides: [
    {
      files: ['**/*.tsx'],
      rules: {
        'react/prop-types': 'off',
      },
    },
  ],
  plugins: ['react-hooks', 'prettier'],
  rules: {
    camelcase: ['off', { properties: 'never' }],
    'max-len': [
      2,
      {
        code: 120,
        ignoreUrls: true,
        ignoreStrings: true,
      },
    ],
    'object-curly-spacing': 'off',
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'prettier/prettier': ['error', { trailingComma: 'all', singleQuote: true }],
    'require-jsdoc': [
      'error',
      {
        require: {
          FunctionDeclaration: false,
        },
      },
    ],
    'import/no-unresolved': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'no-restricted-globals': ['error', 'isFinite', 'isNaN'].concat(confusingBrowserGlobals),
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
        varsIgnorePattern: '^_',
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
