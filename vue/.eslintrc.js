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
    camelcase: ['off', { properties: 'never' }],
    'max-len': [
      2,
      {
        code: 120,
        ignoreUrls: true,
        ignoreStrings: true,
      },
    ],
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
