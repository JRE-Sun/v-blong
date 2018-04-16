import Vue from 'vue'
import Router from 'vue-router'
import list from '../views/list'
import article from '../views/article'

Vue.use(Router)

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
        }
    ]
})
