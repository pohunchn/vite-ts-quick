<template>
    <div>About {{ test }}</div>
</template>

<style scoped>

</style>

<script setup lang="ts">
import useTestStore from '@/store2/Test';
import { computed } from 'vue';

const store = useTestStore();
const test = computed(() => store.state.count);

let a = 1;
setInterval(() => {
    store.run("aaa", a)
    a++;
}, 1000)
</script>
