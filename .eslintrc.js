module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended'
  ],
  // add your custom rules here
  rules: {
    'space-before-function-paren': ['error', 'always'],
    'semi': [1, 'never'],
    'max-len': [1, 120],
    'quotes': [1, 'single', { avoidEscape: true, allowTemplateLiterals: true  }],
    'require-await': 1,
    'indent': [2, 2],
    'linebreak-style': [2, 'unix'],
    'no-trailing-spaces': 2,
    'object-curly-spacing': [1, 'always'],
    'comma-dangle': [2, 'never'],
    'eol-last': [2, 'always'],
    'vue/multi-word-component-names': 0
  }
}
