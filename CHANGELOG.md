# 2021-07-22

- 更新依赖
- 去除无用依赖
- 修复 `refSugar` 报错

# 2021-06-30

- 新增 [`i18n`](https://vue-i18n.intlify.dev/introduction.html) 支持

### 如何使用？

语言包存放在 `src/i18n/languages` 文件夹下，每种语言一个文件

> 为保证 `element-plus` 正确国际化，请确保 `src/i18n/languages` 文件夹下的语言包名与 `element-plus` 的语言包名一致

# 2021-06-15

- 渲染进程组件实现全 `setup` 化

## 如何使用 `setup`？

#### vscode 环境

- 禁用 `vetor` 或 `voter` 扩展
- 安装并启用扩展 `volor`

> 更多 `setup` 语法糖问题请访问 [New script setup](https://github.com/vuejs/rfcs/pull/227)