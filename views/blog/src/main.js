// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import axios from 'axios'
import style from './assets/css/style.css'
import mavonEditor from 'mavon-editor'
import API from './api'
import base from './base'
import mavonEditorStyle from './assets/mavonEditor/css/index.css'

Vue.use(mavonEditor)
Vue.config.productionTip = false
Vue.prototype.$axios     = axios;
Vue.prototype.API        = API;
Vue.prototype.base       = base;
/* eslint-disable no-new */
new Vue({
    el        : '#app',
    router,
    store,
    components: {App},
    template  : '<App/>'
})
