<template>
	<img alt="Vue logo" src="../assets/logo.png" />
    <h1>{{ msg }}</h1>
    <h2>vite-ts-quick</h2>

    <p>使用示例请看 Example</p>

    <p>
        Recommended IDE setup:
        <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
        +
        <a
            href="https://marketplace.visualstudio.com/items?itemName=octref.vetur"
            target="_blank"
            >
            Vetur
        </a>
        or
        <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
        (if using
        <code>&lt;script setup&gt;</code>)
    </p>

    <p>
        <a href="https://cn.vitejs.dev/" target="_blank">
            Vite Docs
        </a>
        |
        <a href="https://v3.cn.vuejs.org/" target="_blank">Vue 3 Docs</a>
        |
        <a href="https://next.router.vuejs.org/zh/" target="_blank">Vue-router 4.x Docs</a>
        |
        <a href="https://next.vuex.vuejs.org/zh/" target="_blank">Vuex 4.x Docs</a>
        |
        <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch" target="_blank">Fetch</a>
        |
        <a href="https://element-plus.gitee.io/#/zh-CN/component/installation" target="_blank">Element-Plus</a>
    </p>

    <button @click="count++">count is: {{ count }}</button>
    <p>
        Edit
        <code>components/HelloWorld.vue</code> to test hot module replacement.
    </p>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
export default defineComponent({
    name: 'HelloWorld',
    props: {
        msg: {
            type: String,
            required: true
        }
    },
    setup: () => {
        const count = ref(0)
        return { count }
    }
})
</script>

<style scoped>
a {
    color: #42b983;
}

label {
    margin: 0 0.5em;
    font-weight: bold;
}

code {
    background-color: #eee;
    padding: 2px 4px;
    border-radius: 4px;
    color: #304455;
}
</style>
