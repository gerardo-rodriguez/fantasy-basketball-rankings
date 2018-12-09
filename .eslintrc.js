module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: 'plugin:@cloudfour/recommended',
  // required to lint *.vue files
  plugins: ['html'],
  // add your custom rules here
  rules: {
    // Allow comments at the end of lines
    'lines-around-comment': 'off',
    // Allows for ”undefined” things like fixtures
    'no-undef': 'off'
  },
  globals: {}
};
