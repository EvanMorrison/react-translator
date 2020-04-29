module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: ['standard', 'prettier/standard', 'plugin:prettier/recommended'],
  parser: 'babel-eslint',
  plugins: ['babel', 'import', 'node', 'promise', 'standard'],
  rules: {
    'comma-dangle': ['error', 'only-multiline'],
    'no-prototype-builtins': 0,
    'no-template-curly-in-string': 'off',
    'no-unused-expressions': 0,
    'babel/no-unused-expressions': ['error', { allowTernary: true }],
    'no-unused-vars': [
      'error',
      { vars: 'all', args: 'none', ignoreRestSiblings: true },
    ],
  },
};
