module.exports = {
  root: true,
  extends: 'airbnb-base',
  rules: {
    'linebreak-style': 0,
    'no-underscore-dangle': 0,
    'no-param-reassign': 0,
    'import/no-unresolved': [2, { ignore: ['fabric'] }],
    'prefer-destructuring': ['error', { object: true, array: false }],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'import/no-extraneous-dependencies': 0,
    'no-restricted-syntax': 0,
  },
  env: {
    node: true,
  },
};
