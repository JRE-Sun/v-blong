// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import axios from 'axios'
import style from './assets/css/style.css'
import API from './api'
Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.prototype.API = API;
/* eslint-disable no-new */
new Vue({
    el        : '#app',
    router,
    store,
    components: {App},
    template  : '<App/>'
})
