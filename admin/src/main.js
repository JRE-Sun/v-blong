// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
// 引入store
import store from './store/index'
import axios from 'axios'

Vue.prototype.$axios = axios

Vue.use(ElementUI);
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    let userName = store.state.userName;
    if (to.path == '/login') {
        store.state.userName = false;
    }
    if (!userName && to.path != '/login') {
        next({path: '/login'})
    } else {
        next()
    }
})

/* eslint-disable no-new */
new Vue({
    el        : '#app',
    router,
    store,
    components: {App},
    template  : '<App/>'
})
