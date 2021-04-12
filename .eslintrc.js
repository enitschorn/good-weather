module.exports = {
  env: {
    browser: true,
    es2021: true,
    jquery: true,
  },
  parser: 'babel-eslint',
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    google: false,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/forbid-prop-types': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'react/prop-types': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['./app/javascript'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
