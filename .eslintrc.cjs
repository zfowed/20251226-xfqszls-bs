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
    // 属性换行风格不限制：支持单行/多行
    'vue/max-attributes-per-line': 'off',
    'vue/first-attribute-linebreak': 'off',
    'vue/html-closing-bracket-newline': 'off'
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
  }
}
