<template>
    <div>
        <p>这是ref绑定的值，5s后更改：{{ refText }}</p>
        <p>这是对象绑定的值，5s后更改：{{ reactiveText.text }}</p>
        <p>这是vuex绑定的值，5s后更改：{{ getText }}</p>
    </div>
</template>

<style scoped>

</style>

<script lang="ts">
import Base from '@/lib/ts/Base'
import { useStore } from '@/store';
import { defineComponent, Ref, ref, reactive } from 'vue'
import { mapGetters } from 'vuex';

export default defineComponent({
    setup() {
        let refText: Ref<string> = ref("未修改");
        let reactiveText = reactive({text: "未修改"})

        const st = useStore();
        
        let timeer1 = setTimeout(() => {
            refText.value = "已修改";
            reactiveText.text = "已修改";
            st.dispatch("setText", { text: "已修改" })
            // 存 Cookie
            Base.Cookie.set("test", "已修改", 60*60*24);
            // 存 localStorage
            Base.Storage.set("test", "已修改");
            clearTimeout(timeer1)
        }, 5000);

        const api = Base.NetBase.create({
            baseUrl: "./",
            baseFail: (res: any) => {
                console.log('------baseFail', res)
            }
        })

        api.post("a", {})

        return {
            refText,
            reactiveText
        }
    },
    computed: {
        ...mapGetters(["getText"])
    }
})
</script>
