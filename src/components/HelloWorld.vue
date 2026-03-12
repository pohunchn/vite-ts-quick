<template>
	<img alt="Vue logo" src="../assets/logo.png" />
    <h1>{{ msg }}</h1>
    <h2>vite-ts-quick</h2>

    <p>使用示例请看 {{ $t("nav.example") }}</p>

    <p>
        Recommended IDE setup:
        <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
        +
        <a
            href="https://marketplace.visualstudio.com/items?itemName=Vue.volar"
            target="_blank"
            >
            Vue(Official) Extension Pack
        </a>
    </p>

    <p>
        <a href="https://vitejs.dev/" target="_blank">
            Vite Docs
        </a>
        |
        <a href="https://vuejs.org/" target="_blank">Vue 3.x Docs</a>
        |
        <a href="https://router.vuejs.org/" target="_blank">Vue-router Docs</a>
        |
        <a href="https://pinia.vuejs.org/" target="_blank">Pinia Docs</a>
        |
        <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch" target="_blank">Fetch</a>
        |
        <a href="https://element-plus.org/" target="_blank">Element-Plus Docs</a>
    </p>

    <button @click="count++">count is: {{ count }}</button>
    <p>
        Edit
        <code>components/HelloWorld.vue</code> to test hot module replacement.
    </p>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = withDefaults(defineProps<{
    msg: string;
}>(), {})

const count = ref(0);

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
