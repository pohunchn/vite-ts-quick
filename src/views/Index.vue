<template>
	<HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<style scoped>
#admin { width: 100%; min-height: 100vh; height: 100vh; }
.top { height: 20px; }

.main { height: calc(100% - 40px); }
.main .nav { width: 200px; }
.main .tabs { width: calc(100% - 200px); }
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'

export default defineComponent({
	components: {
		HelloWorld
	}
})
</script>
