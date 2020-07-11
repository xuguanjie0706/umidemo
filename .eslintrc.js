module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
  },
  rules: {
    "semi": [2, 'always'],
    "quotes": [1, 'single'],
    'no-console': 1,
    "eqeqeq": 2,
    'default-case': 1,
    'no-trailing-spaces': 1, // 一行结束后面不要有空格
    'no-multi-spaces': 2, // 禁止使用多个空格
    'prefer-const': 2, // 要求使用 const 声明那些声明后不再被修改的变量
    'prefer-destructuring': 2, // 优先使用数组和对象解构
    'no-var': 2, // 要求使用let const
    'no-useless-rename': 2, // 禁止在 import 和 export 和解构赋值时将引用重命名为相同的名字
    'no-duplicate-imports': 2,
    'array-bracket-spacing': 2, //数组内需要空格
    'arrow-spacing': 2, // 强制箭头函数的箭头前后使用一致的空格
    'switch-colon-spacing': 2, // 强制在 switch 的冒号左右有空格
    'spaced-comment': 2, // 强制在注释中 // 或 /* 使用一致的空格
    'space-unary-ops': 2, // 强制在一元操作符前后使用一致的空格
    'space-in-parens': 2, // 强制在圆括号内使用一致的空格
    'semi-spacing': 2, // 强制分号之前和之后使用一致的空格
    'no-trailing-spaces': 2, // 禁用行尾空格
    'no-multiple-empty-lines': 2, // 禁止出现多行空行
    // "comma-dangle": [2, "Object"], //要求或禁止末尾逗号
    'eol-last': 2, // 要求或禁止文件末尾存在空行
    "camelcase": 2, //强制使用骆驼拼写法命名约定
    'comma-style': 2,
    'no-undef': 1, //不能有未定义的变量
    'no-unused-expressions': 1, //禁止无用的表达式
    'no-unused-vars': 1,
    'block-scoped-var': 0, // 在块级作用域外访问块内定义的变量是否报错提示
    'no-useless-constructor': 0,
    'react/no-string-refs': 1,
    'no-nested-ternary': 0, //禁止使用嵌套的三目运算
    'no-unused-expressions': 0,
    'react/no-string-refs': 0,
    'no-throw-literal': 0
  },
};
