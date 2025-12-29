module.exports = {
  extends: [
    'standard',
    'plugin:vue/vue3-strongly-recommended',
    '.eslintrc-extend-zf-vite-import.json'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    // 允许单名组件
    'vue/multi-word-component-names': 'off',
    // 允许单行元素内容
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 8
      },
      multiline: {
        max: 1
      }
    }]
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
  }
}
