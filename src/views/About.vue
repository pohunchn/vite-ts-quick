<template>
    <div>About {{ test }}</div>
</template>

<style scoped>

</style>

<script setup lang="ts">
import { useStoreBase } from '@/store/Base';
import { storeToRefs } from 'pinia';
import { onBeforeUnmount, onMounted } from 'vue';

const storeBase = useStoreBase();
const { test } = storeToRefs(storeBase);

let timer: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
    timer = setInterval(() => {
        storeBase.addTest();
    }, 1000);
})

onBeforeUnmount(() => {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
})
</script>
