module.exports = {
  // 默认情况下，ESLint 会在所有父级目录里寻找配置文件，一直到根目录。"root": true，它就会停止在父级目录中寻找
  root: true,
  env: {
    // 预定义的全局变量
    browser: true,
    commonjs: true,
    es2021: true,
    node: true
  },
  // 一个配置文件可以被基础配置中的已启用的规则继承
  extends: 'eslint:recommended', // 继承推荐的规则
  // 为特定类型的文件指定处理器
  overrides: [],
  // 指定你想要支持的 语言选项
  parserOptions: {
    ecmaVersion: 'latest' // ecma 最新
  },
  rules: {
    // 0:off 关闭规则,1:warn 开启规则，展示警告,2:error 开启规则 展示错误，触发程序退出
    'no-unused-vars': 0, // 未使用的变量报错，关闭
    'no-debugger': 'off',
    'no-console': 'off',
    indent: [0] /* 内部缩进2个空格，属性间隔开1个空格，自动对其属性缩进 */,
    'array-bracket-spacing': [2, 'never'], // 数据中不能存在空格
    'comma-dangle': [2, 'never'], // 禁止末尾逗号
    'key-spacing': 2, // 对象键值对前后的空格
    'block-spacing': 2,
    'keyword-spacing': 2, // 关键字周围的空格
    'no-multi-spaces': 2, // 禁止多余的空格
    'arrow-spacing': 2, // 箭头函数的空格
    'space-infix-ops': 2, // 操作符左右的空格
    'space-unary-ops': [2, { words: true, nonwords: false }], // 一元操作符的空格
    'spaced-comment': [2, 'always'], // 注释语句前的空格
    'template-tag-spacing': [2, 'always'], // 模板标记和它们的字面量之间有空格
    'object-curly-spacing': [2, 'always'], // 强制在花括号中使用一致的空格
    'no-whitespace-before-property': 2, // 禁止属性前有空白
    'comma-spacing': 2
  }
}
