import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex);
// 用来存放数据,或者状态
const state = {
    // 线上
    api:'http://jresun.gotoip4.com/blog/php/',
    // api      : 'http://www.blong.cc/',
    title    : '首页', // 全部组件 的标题
    www      : 'http://www.blong.cc/php/',
    indexList: {},
}
export default new Vuex.Store({
    state,
    mutations
});