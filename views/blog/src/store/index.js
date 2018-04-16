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