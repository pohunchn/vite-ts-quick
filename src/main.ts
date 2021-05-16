import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from "./store";

import ElementPlus from "element-plus"
import "element-plus/lib/theme-chalk/index.css"
import locale from "element-plus/lib/locale/lang/zh-cn"

import "./assets/css/setting.css"
import "./assets/css/global.css"

const app = createApp(App);

app.use(router);
app.use(store);
app.use(ElementPlus, { size: "mini", locale });

app.mount('#app')

export default app;