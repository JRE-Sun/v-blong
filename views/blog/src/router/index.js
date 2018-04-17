import Vue from 'vue'
import Router from 'vue-router'
import list from '../views/list'
import article from '../views/article'
import single from '../views/single'


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
        },
        {
            path     : '/single',
            name     : 'single',
            component: single
        }
    ]
})
