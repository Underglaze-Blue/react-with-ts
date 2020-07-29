module.exports = {
  extends: [
    'alloy',
    'alloy/react',
    'alloy/typescript'
  ],
  env: {
    // 你的环境变量（包含多个预定义的全局变量）
    //
    browser: true,
    "commonjs": true,
    "es6": true
    // node: true,
    // mocha: true,
    // jest: true,
    // jquery: true
  },
  globals: {
    // 你的全局变量（设置为 false 表示它不允许被重新赋值）
    //
    // myGlobal: false
  },
  rules: {
    // 自定义你的规则
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-invalid-this': 'off',
    "@typescript-eslint/no-loss-of-precision": 0,
    "default-case-last": 0,
    "no-promise-executor-return": 0,
    "no-unreachable-loop": 0,
    "no-useless-backreference": 0,
    'indent': [ 'error', 2, { SwitchCase: 1 } ], // 强制使用一致的缩进
    'arrow-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ],
    'no-console': 0,
    'comma-dangle': [ 'error', 'never' ],
    'comma-style': [ 2, 'last' ],
    'quote-props': [ 'error', 'consistent-as-needed' ],
    'eol-last': 2, // 要求或禁止文件末尾存在空行
    'eqeqeq': [ 0, 'allow-null' ], // 要求使用 === 和 !==
    'no-const-assign': 2, // 禁止修改 const 声明的变量
    'no-dupe-class-members': 2, // 禁止类成员中出现重复的名称
    'no-dupe-keys': 2, // 禁止对象字面量中出现重复的 key
    'no-mixed-spaces-and-tabs': 2, // 禁止空格和 tab 的混合缩进
    'no-multi-spaces': 2, // 禁止使用多个空格
    'no-multiple-empty-lines': [
      2,
      {
        max: 3,
        maxEOF: 3,
        maxBOF: 3
      }
    ], // 禁止出现多行空行（此处设置最多出现连续3个空行）
    'no-redeclare': 2, // 禁止多次声明同一变量
    'no-self-compare': 2, // 禁止自身比较
    'no-self-assign': 2, // 禁止自我赋值
    'no-trailing-spaces': 1, // 禁用行尾空格
    'no-unreachable': 2, // 禁止在return、throw、continue 和 break 语句之后出现不可达代码
    'semi': [ 'error', 'never' ], // 需要和prettier保持一致，防止两者冲突
    'no-extra-semi': 2,
    'array-callback-return': 2,
    'dot-location': [ 2, 'property' ],
    'quotes': [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ], // 强制使用一致的反勾号、双引号或单引号
    'spaced-comment': [
      2,
      'always',
      {
        markers: [ 'global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',' ]
      }
    ], // 强制在注释中 // 或 /* 使用一致的空格
    'prefer-const': 2, // 要求使用 const 声明那些声明后不再被修改的变量
    'no-debugger': 2 // 禁用 debugger
  }
}
