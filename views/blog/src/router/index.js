import Vue from 'vue'
import Router from 'vue-router'
import list from '../views/list'
import article from '../views/article'
import single from '../views/single'

Vue.use(Router)
// 这个是监听应用里面跳转
Router.prototype.goBack = function () {
    this.isBack = true
    window.history.go(-1)
}
export default new Router({
    routes: [
        {
            path     : '/',
            name     : 'list',
            component: list
        },
        {
            path     : '/article',
            name     : 'article',
            component: article
        },
        {
            path     : '/single',
            name     : 'single',
            component: single
        }
    ]
})
