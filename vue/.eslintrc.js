module.exports = {
  extends: [
    // '@airwallex/javascript',
    'google',
    'prettier',
    'plugin:vue/recommended',
    'plugin:vue/base',
    'plugin:vue/essential',
    'plugin:vue/strongly-recommended',
  ],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  plugins: ['prettier'],
  rules: {
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/camelcase': ['off', { allow: ['__webpack_public_path__'] }],
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
    'prettier/prettier': ['error', { trailingComma: 'all' }],
    'require-jsdoc': [
      'error',
      {
        require: {
          FunctionDeclaration: false,
        },
      },
    ],
    'import/no-unresolved': 'off',
    curly: 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
