# Installation

use `npx degit pohunchn/vite-ts-quick#main my-project` or `git clone ...` pull code.

After pulling the code, execute `npm install` in the root directory of the project. After success, execute `npm run dev` to start the project (nodejs + npm needs to be installed)

# Others Template
- [vite-react-quick](https://github.com/pohunchn/vite-react-quick) - For React

# Built-in
* NetBase([Fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch))
* Cookie
* Storage
* [vue-router](https://next.router.vuejs.org/zh/)
* [vuex](https://next.vuex.vuejs.org/zh/)
* [vue-i18n](https://vue-i18n.intlify.dev/)
* [element-plus](https://element-plus.gitee.io/#/zh-CN/component/installation)

# Note
* This framework adopts [Fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch) as a network requester, it is not recommended to introduce Axios again
* Please do not modify all the files under the `lib` folder in the business project
* It is recommended that the custom root library be inherited from `lib/ts/Base`
* [gitee](https://gitee.com/phcs/vite-ts-quick) is only for domestic users to pull code，from [github](https://github.com/pohunchn/vite-ts-quick) to synchronize，please visit [github](https://github.com/pohunchn/vite-ts-quick) for PR
* **Welcome to Issues and PR**

# How to use vue3

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
