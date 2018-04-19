import Vue from 'vue'

export default {
    // 设置title
    setTitle(state, title) {
        state.title = title;
    },
    setHeader(state,status){
        state.isShowHeader = status;
    }
}