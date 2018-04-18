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
2. 安装使用axios
    * `npm install axios --save--dev`

# 18.4.17
> 已完成:
* 在文章详情页,进入其他详情页
* 单页
* 文章进入文章,文章进入分页,顶部nav分类切换
* 博客前端尽管简单,但是基本功能已经ok
> 待完成:
* 无

**遇到问题**
1. 如何监听路由参数状态变化
    * 可以在需要监听的组件内,watch
    ```
        watch:{
            "$route":function (to, from) {
                console.log(to, from);
            },
        },
    ```

# 18.4.18
> 已完成:
* 接入ele,初步了解ele,完成login页面
> 待完成:
* 无

**遇到问题**
1. 目前后台开发,刚写一点点,基本没问题,唯一的就是ele和vux不同,vux在每个页面都需要引入,ele只需要在main.js引入一次,在组件里面不需要引用,直接调用就行.