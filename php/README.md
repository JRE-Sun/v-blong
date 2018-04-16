# 18.4.16
> 已完成:
* 搭建vue-blog开发环境
> 待完成:
* 无

**遇到问题**
1. vue-cli项目安装vuex和使用
    * `npm install vuex --save--dev`
    * 在src文件夹里面创建子文件夹store,store里面有两个文件分别是index.js、mutations.js.
    
    ```
    index.js(文件内容)
    import Vue from 'vue'
    import Vuex from 'vuex'
    import mutations from './mutations'
    Vue.use(Vuex);
    // 用来存放数据,或者状态
    const state = {
        title     : '首页', // 全部组件 的标题
    }
    export default new Vuex.Store({
        state,
        mutations
    });
    ```
    * mutations.js(文件内容)
    ```
    export default {
        // 设置title 
        setTitle(state, title) {
            state.title = title;
        }
    }
    ```
    * main.js引入vuex
    ```
    // 引入store
    import store from './store/index'
    // 注入路由,绑定在#app上
    new Vue({
        ...
        store,
        ...
    }).$mount('#app')
    ```
    