<template>
    <div>
        <p>这是ref绑定的值，5s后更改：{{ refText }}</p>
        <p>这是对象绑定的值，5s后更改：{{ reactiveText.text }}</p>
        <!-- <p>这是vuex绑定的值，5s后更改：{{ getText }}</p> -->
        <p>这是网络请求示例一，5s后更改：{{ api1Text.text }}</p>
        <p>这是网络请求示例二，5s后更改：{{ api2Text.text }}</p>
        <p>这是网络请求示例三，5s后更改：{{ api3Text.text }}</p>
        <p>这是网络请求示例四，5s后更改：{{ api4Text.text }}</p>
        <!-- <el-pagination
            :current-page="elCPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="elPageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            style="justify-content: center;"
        >
        </el-pagination> -->
        <el-button type="primary" round @click="changeLanguage">
            {{ $t('buttons.changeLanguage') }}
        </el-button>
    </div>
</template>

<style scoped>

</style>

<script setup lang="ts">
import Base from '@/lib/ts/Base'
import { onBeforeUnmount, ref } from "vue";
// import { useStore } from '@/store';
import { i18n, setLanguage } from '@/i18n';

const refText = ref("未修改");
const reactiveText = ref({text: "未修改"});
const api1Text = ref({text: "未修改"});
const api2Text = ref({text: "未修改"});
const api3Text = ref({text: "未修改"});
const api4Text = ref({text: "未修改"});

let timer1: ReturnType<typeof setTimeout> | null = null;
let timer2: ReturnType<typeof setTimeout> | null = null;
let timer3: ReturnType<typeof setTimeout> | null = null;
let timer4: ReturnType<typeof setTimeout> | null = null;

function changeLanguage() {
    setLanguage(i18n.global.locale === "zh-cn" ? 'en' : 'zh-cn')
}

timer1 = setTimeout(() => {
    refText.value = "已修改";
    reactiveText.value.text = "已修改";
    if (timer1) {
        clearTimeout(timer1);
        timer1 = null;
    }
}, 5000);

// Base.NetBase.create({}) 等同于 new Base.NetBase({})
// 网络请求示例 1
const api1 = Base.NetBase.create({
    baseUrl: "./"
})

api1.get("api.json", {
    _success: (res: {text: string}) => {
        timer2 = setTimeout(() => {
            api1Text.value.text = res.text;
            if (timer2) {
                clearTimeout(timer2);
                timer2 = null;
            }
        }, 5000);
    }
})

// 网络请求示例 2
const api2 = Base.NetBase.create({
    baseUrl: "./"
})

api2.get<{text: string}>("api.json")
    .then(res => {
        timer2 = setTimeout(() => {
            api2Text.value.text = res.text;
            if (timer2) {
                clearTimeout(timer2);
                timer2 = null;
            }
        }, 5000);
    })

// 网络请求示例 3
Base.NetBase.sget<{text: string}>("./api.json")
    .then(res => {
        timer3 = setTimeout(() => {
            api3Text.value.text = res.text;
            if (timer3) {
                clearTimeout(timer3);
                timer3 = null;
            }
        }, 5000);
    })

// 网络请求示例 4（推荐！）
// 通过泛型定义接口，编译器会自动推断出接口的类型，使用时也会有智能提示
// 可以单独创建一个api.ts文件，专门用来定义接口，这样就可以在全局范围内使用这些接口了
const API = Base.NetBase.createApi<{
    get: {
        'api.json': () => Promise<{text: string}>
    }
}>();
API.get['api.json']().then(res => {
    timer4 = setTimeout(() => {
        api4Text.value.text = res.text;
        if (timer4) {
            clearTimeout(timer4);
            timer4 = null;
        }
    }, 5000);
})

onBeforeUnmount(() => {
    if (timer1) {
        clearTimeout(timer1);
        timer1 = null;
    }
    if (timer2) {
        clearTimeout(timer2);
        timer2 = null;
    }
    if (timer3) {
        clearTimeout(timer3);
        timer3 = null;
    }
    if (timer4) {
        clearTimeout(timer4);
        timer4 = null;
    }
})
</script>
