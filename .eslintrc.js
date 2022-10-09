module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: 'standard',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'no-unused-vars': 1,
    camelcase: 0,
    'no-prototype-builtins': 0
  },
  ignorePatterns: ['*.test.js', '*.md']
}
