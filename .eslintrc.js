module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', '@cypress/dev', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-undef': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'global-require': 'off',
    'no-useless-escape': 'off',
    'no-unused-vars': 'off',
    'no-shadow': 'off',
    'no-use-before-define': 'off',
  },
};
