# 安装
拉取代码后，在项目根目录执行`npm install`，成功后执行`npm run dev`即可启动项目（需安装nodejs+npm）

# 注意事项
* 不要引入`Base.ts`，请引入`Core.ts`
* 请不要修改 `components/common` 文件夹下面的所有文件
* 请不要修改 `App.vue`
* 请不要修改 `views/Index.vue`
* 请不要修改 `ts/Base.ts`
* 请不要修改 `ts/apis/NetBase.ts`
* 请不要修改 `types/Base.d.ts`
* 请不要修改 `vite.config.ts`
* 请不要修改 `index.html`

# 如何拉取代码
1. 新建一个空文件夹
2. 将该文件夹拉入`vscode`或其他代码编辑器
3. 打开终端
4. 执行`git init`（需安装git）
5. 执行`git remote add origin https://e.coding.net/pohun/mpshop/server_client.git`
6. 执行`git pull origin master`
7. 执行`git branch develop`（新增`develop`分支）
8. 执行`git checkout develop`
9. 执行`git pull origin develop`
10. 完成

# 以下为 vue3 教学

## Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite.

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur). Make sure to enable `vetur.experimental.templateInterpolationService` in settings!

#### If Using `<script setup>`

[`<script setup>`](https://github.com/vuejs/rfcs/pull/227) is a feature that is currently in RFC stage. To get proper IDE support for the syntax, use [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) instead of Vetur (and disable Vetur).

### Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can use the following:

#### If Using Volar

Run `Volar: Switch TS Plugin on/off` from VSCode command palette.

#### If Using Vetur

1. Install and add `@vuedx/typescript-plugin-vue` to the [plugins section](https://www.typescriptlang.org/tsconfig#plugins) in `tsconfig.json`
2. Delete `src/shims-vue.d.ts` as it is no longer needed to provide module info to Typescript
3. Open `src/main.ts` in VSCode
4. Open the VSCode command palette 5. Search and run "Select TypeScript version" -> "Use workspace version"
