module.exports = {
  extends: [
      require.resolve('@umijs/fabric/dist/eslint'),
      "plugin:@typescript-eslint/recommended", // 使用@ typescript-eslint / eslint-plugin中的推荐规则
      "prettier/@typescript-eslint", // 使用eslint-config-prettier禁用一些与Prettier冲突的ESLint规则
      "plugin:prettier/recommended", // 启用eslint-plugin-prettier和eslint-config-prettier，使编辑器显示错误提示，确保这项是扩展数组中的最后一个配置
  ],
  globals: {},
  plugins: ['react-hooks'],
  // rules: {
  //   'no-restricted-syntax': 0,
  //   'no-param-reassign': 0,
  //   'no-unused-expressions': 0,
  // },
  tabSize: 2,
  parser: "@typescript-eslint/parser", // 指定ESLint解析器
  parserOptions: {
      sourceType: "module", // 允许使用导入
  },
  rules: {
      // 放置ESLint规则的位置。可用于覆盖从扩展配置中指定的规则
      // 例如 "@typescript-eslint/explicit-function-return-type": "off",
  },
};
