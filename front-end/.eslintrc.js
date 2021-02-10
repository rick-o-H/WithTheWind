module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-console': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-unused-vars': 'off',
    'no-bitwise': 'off',
    'max-len': 'off',
    'padded-blocks': 'off',
    'camelcase': 'off',
    'no-restricted-properties': 'off',
    'no-plusplus': 'off',
    'no-multi-assign': 'off',
    'no-shadow': 'off',
    'prefer-const': 'off',
    'no-undef': 'off',
    'dot-notation': 'off',
    'quote-props': 'off',
    'no-var': 'off',
    'vars-on-top': 'off',
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off',
  },
};
