module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    browser: true,
    node: true,
    commonjs: true,
    serviceworker: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:security/recommended",
  ],
};
