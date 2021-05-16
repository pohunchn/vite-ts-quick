<template>
    <div>About</div>
</template>

<style scoped>

</style>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        
    },
    mounted() {
        console.log(this.$store.state.user.test)
    }
})
</script>
