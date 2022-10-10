module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  plugins: ['prettier'],
  rules: {
    'no-unused-vars': 1,
    camelcase: 0,
    'no-prototype-builtins': 0,
    'prettier/prettier': 'error',
  },
  parserOptions: {
    sourceType: 'module',
  },
  ignorePatterns: ['*.test.js', '*.md'],
}
