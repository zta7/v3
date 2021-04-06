module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  globals: {
    ga: true, // Google Analytics
    cordova: true,
    __statics: true,
    process: true,
    Capacitor: true,
    chrome: true,
    __dirname: true,
    global: true,
    module: true,
    process: true,
    require: true,
    path: true,
    $: true,
    go: true,
    RegExp: true
  },
  plugins: [
    // https://eslint.vuejs.org/user-guide/#why-doesn-t-it-work-on-vue-file
    // required to lint *.vue files
    'vue',
  ],
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    // 'plugin:vue/recommended',
  ],
  rules: {
    "vue/max-attributes-per-line": [2, {
      "singleline": 10,
      "multiline": {
        "max": 1,
        "allowFirstLine": false
      }
    }],
    "vue/name-property-casing": [0],
    "vue/no-v-html": "off",
    "vue/singleline-html-element-content-newline": "off",
    "vue/prop-name-casing": [0, "snake_case"],
    "vue/html-quotes": [ 2, "single", { "avoidEscape": true } ],
    "vue/component-name-in-template-casing": [2, "kebab-case", {
      "registeredComponentsOnly": false,
      "ignores": ["/^q-/"]
    }],
    // "vue/match-component-file-name": [2, {
    //   "extensions": ["vue"],
    //   "shouldMatchCase": false
    // }],
    "vue/html-closing-bracket-newline": [2, {
      "singleline": "never",
      "multiline": "never"
    }],
    'no-unused-vars': [1, {
      'vars': 'all',
      'args': 'none' // all || none
    }],
    'no-extra-parens': [2, 'functions'],
    'no-await-in-loop': 2,          
    'array-callback-return': 0,      // array 方法一定有return
    // 'consistent-return': 2,          // 函数一定有return值
    'default-case': 2,               // 强制switch 有 default

    'curly': [2, 'multi-or-nest'],   // 函数体只有一行没有花括号
    'dot-location': [2, 'property'], // 点操作符前后一致
    'dot-notation': 2 ,             // 尽可能的使用.号来获取值
    'eqeqeq': [2, "always", {"null": "always"}], // 三等号
    // 'no-else-return': 2,             // 没有 else了
    'no-implicit-coercion': 2,       // 数据类型转换
    'array-bracket-newline': [2,{ multiline: true,minItems: 5 }],
    'array-bracket-spacing': [2],
    // 'array-element-newline': [2],
    'block-spacing': [2], 
    'brace-style': [2, 'stroustrup', {
      'allowSingleLine': true
    }], // if else if 风格
    'comma-dangle': [2], // 尾末逗号
    'comma-spacing': [2], // 逗号前后空格
    'comma-style': [2], // 一致的逗号风格
    'computed-property-spacing': [2], // 计算属性无空格
    'eol-last': [2], // 文末一空行 
    'func-call-spacing': [2],// 禁止在函数名和开括号之间有空格
    'function-paren-newline': [2, 'consistent'], // 函数参数换行
    'yoda': [2], // === !== 中 对象总在字面量前
    'keyword-spacing': [2], // 关键字空格
    'key-spacing': [2], // 对象 key value 排版
    'new-parens': [2], // 调用无参构造有括号
    'newline-per-chained-call': [2], // 方法函数链换行
    'no-array-constructor': [2], 
    'no-lonely-if': [0],
    'no-multi-assign': [2],
    'no-multiple-empty-lines': [2, {
      'max': 1
    }],
    'no-new-object': [2],
    'no-plusplus': [2], // no i++, use i+=1
    'no-trailing-spaces': [2],
    'no-unneeded-ternary': [2, {
      'defaultAssignment': false
    }], // 三元表达式
    'no-whitespace-before-property': [2],
    'nonblock-statement-body-position': [2],
    'object-curly-newline': [2, {consistent: true, multiline: true}],
    'object-curly-spacing': [2, 'always', {
      objectsInObjects: false
    }],
    'object-property-newline': [2],
    // 'one-var': [2],
    'one-var-declaration-per-line': [2],
    'operator-assignment': [2],
    'operator-linebreak': [2],
    'padded-blocks': [2, 'never'],
    // 精准空行
    'padding-line-between-statements': [2,
      // { blankLine: "always", prev: ["const", "let", "var"], next: "*"},
      // { blankLine: "any",    prev: ["const", "let", "var"], next: ["const", "let", "var"]},
    ],
    'quote-props': [2, 'as-needed'],
    'quotes': [2, 'single', {
      'avoidEscape': true,
      'allowTemplateLiterals': true
    }],
    'semi': [2, 'never'],
    'semi-spacing': [2, {
      'before': false,
      'after': true
    }],
    'semi-style': [2],
    // 'sort-vars': [2],
    'space-before-blocks': [2],
    'space-before-function-paren': [2, 'never'],
    'space-in-parens': [2],
    'space-infix-ops': [2],
    'space-unary-ops': [2, {
      'words': true,
      'nonwords': false
    }],
    'spaced-comment': [2, 'always', {
      'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
    }],
    'switch-colon-spacing': [2],
    'arrow-body-style': [0],
    'arrow-parens': [2, 'as-needed'],
    'arrow-spacing': [2, {  
      'before': true,
      'after': true
    }],
    'generator-star-spacing': [2],
    'no-duplicate-imports': [2],
    'no-useless-computed-key': [2],
    'no-useless-constructor': [2],
    'no-useless-rename': [2],
    'object-shorthand': [2],
    'prefer-arrow-callback': [2],
    'prefer-const': [2],
    'prefer-numeric-literals': [2],
    'prefer-rest-params': [2],
    'prefer-spread': [2],
    'prefer-template': [2],
    'rest-spread-spacing': [2],
    'template-curly-spacing': [2],
    'yield-star-spacing': [2],
    'accessor-pairs': [2],
    'indent': [2, 2, {
      'SwitchCase': 2,
      'VariableDeclarator': 'first',
      // 'ignoredNodes': ['Program']
    }],
    'jsx-quotes': [2, 'prefer-single'],
    'new-cap': [1, {
      'newIsCap': true,
      'capIsNew': false
    }],
    'no-eval': 2,
    'no-caller': 2,
    'no-extend-native': 2, 
    'no-extra-bind': 2,
    'no-extra-label': 2,
    'no-floating-decimal': 2,
    'no-implied-eval': 2,
    'no-iterator': 2,
    'no-label-var': 2,
    'no-labels': [2],
    'no-lone-blocks': 2,
    'no-multi-spaces': 2,
    'no-multi-str': 2,
    'no-new-require': 2,
    'no-new-wrappers': 2,
    'no-octal-escape': 2,
    'no-path-concat': 2,
    'no-proto': 2,
    'no-self-compare': 2,
    'no-sequences': 2,
    'no-undef-init': 2,
    'no-unmodified-loop-condition': 2,
    'no-useless-call': 2,
    'wrap-iife': [2, 'any'],
    'no-throw-literal': 2,
    'handle-callback-err': [2, '^(err|error)$'],
    // 'prefer-destructuring': [2],
    // 'sort-keys': [2],
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
  },
}