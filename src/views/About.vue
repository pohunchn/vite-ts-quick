<template>
    <div>About</div>
</template>

<style scoped>

</style>

<script setup lang="ts">
import { useStore } from '@/store'
import { onMounted } from "vue"

const store = useStore()

onMounted(()=>{
    console.log(store.state.user.test)
})

</script>
