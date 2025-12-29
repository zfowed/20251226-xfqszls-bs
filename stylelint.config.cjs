module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-standard-vue/scss'
  ],
  plugins: ['stylelint-order'],
  rules: {
    // CSS 命名规范 使用 BEM
    'selector-class-pattern': '^[a-z][a-z0-9-]*(?:(?:--|__)[a-z][a-z0-9-]*)?$',
    // 透明值使用数字
    'alpha-value-notation': ['number'],
    // scss 变量允许加入 !default 注解
    'annotation-no-unknown': [true, { ignoreAnnotations: ['default'] }],
    // 允许 display: -webkit-box;
    'value-no-vendor-prefix': [true, { ignoreValues: ['box'] }],
    // 允许 -webkit-tap-highlight-color
    'order/properties-order': ['-webkit-tap-highlight-color'],
    // 允许使用 :deep :global
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['deep', 'global'] }]
  }
}
