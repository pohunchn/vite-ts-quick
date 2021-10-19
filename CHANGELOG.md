# 2021-10-19

- 更新依赖
- 由于 `element-plus` 当前版本出现问题，暂时锁定 `element-plus` 依赖版本
- `vue-i18n` 问题已修复

# 2021-10-15

- 锁定 `vue-i18n` 依赖版本

# 2021-10-14

- 更新依赖

# 2021-09-22

- 更新依赖

# 2021-09-07

- 更新依赖
- 新增**发布时自动更新版本号**插件

# 2021-09-06

- 更新依赖

# 2021-09-02

- 更新依赖
- 取消使用 `refSugar take 2` 提案，恢复稳定版

> Q：为什么取消使用 `refSugar`？
>
> A：因为此提案存在不稳定性，改动程度较大，不应在现阶段应用在通用模版上，如有需求，请自行配置

# 2021-08-19

- 更新依赖

# 2021-08-11

- 更新依赖
- 修正因为更新依赖后导致 `vue3 refSugar` 及 `element-plus` 国际化而出现的问题

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