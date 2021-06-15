<template>
    <div>
        <p>这是ref绑定的值，5s后更改：{{ refText }}</p>
        <p>这是对象绑定的值，5s后更改：{{ reactiveText.text }}</p>
        <p>这是vuex绑定的值，5s后更改：{{ getText }}</p>
        <p>这是网络请求示例一，5s后更改：{{ api1Text.text }}</p>
        <p>这是网络请求示例二，5s后更改：{{ api2Text.text }}</p>
        <p>这是网络请求示例三，5s后更改：{{ api3Text.text }}</p>
    </div>
</template>

<style scoped>

</style>

<script setup lang="ts">
import Base from '@/lib/ts/Base'
import { computed } from "vue";
import { useStore } from '@/store';

ref: refText = "未修改";
ref: reactiveText = {text: "未修改"};
ref: api1Text = {text: "未修改"};
ref: api2Text = {text: "未修改"};
ref: api3Text = {text: "未修改"};

const st = useStore();

ref: getText = computed(()=>{return st.getters["user/getText"]});

let timer1 = setTimeout(() => {
    refText = "已修改";
    reactiveText.text = "已修改";
    st.dispatch("user/setText", { text: "已修改" }, {root: true})
    // 存 Cookie
    Base.Cookie.set("test", "已修改", 60*60*24);
    // 存 localStorage
    Base.Storage.set("test", "已修改");
    clearTimeout(timer1)
}, 5000);

// Base.NetBase.create({}) 等同于 new Base.NetBase({})
// 网络请求示例 1
const api1 = Base.NetBase.create({
    baseUrl: "./"
})

api1.get("api.json", {
    _success: (res: {text: string}) => {
        let timer2 = setTimeout(() => {
            api1Text.text = res.text;
            clearTimeout(timer2);
        }, 5000);
    }
})

// 网络请求示例 2
const api2 = Base.NetBase.create({
    baseUrl: "./"
})

api2.get<{text: string}>("api.json")
    .then(res => {
        let timer2 = setTimeout(() => {
            api2Text.text = res.text;
            clearTimeout(timer2);
        }, 5000);
    })

// 网络请求示例 3
Base.NetBase.sget<{text: string}>("./api.json")
    .then(res => {
        let timer3 = setTimeout(() => {
            api3Text.text = res.text;
            clearTimeout(timer3);
        }, 5000);
    })
</script>
