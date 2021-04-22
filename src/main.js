import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Element from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
import axios from 'axios'
// 全局注册
import 'mavon-editor/dist/css/index.css'
import mavonEditor from 'mavon-editor'
import './permission.js'

import "./axios.js"

Vue.use(Element)

Vue.prototype.$axios = axios //
// use
Vue.use(mavonEditor)

Vue.config.productionTip = false;
new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
