<template>
    <div>Example</div>
</template>

<style scoped>

</style>

<script lang="ts">
import Base from '@/lib/ts/Base'
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        const api = Base.NetBase.create({
            baseUrl: "./"
        })

        api.post("a", {})
    },
})
</script>
