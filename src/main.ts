import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from "./store";

import ElementPlus from "element-plus"
import "element-plus/dist/index.css"

import "./assets/css/setting.css"
import "./assets/css/global.css"

import { i18n } from './i18n';

const app = createApp(App);

app.use(router);
app.use(store);
app.use(ElementPlus, { size: "mini" });
app.use(i18n);

app.mount('#app')

export default app;
