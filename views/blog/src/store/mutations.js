import Vue from 'vue'

export default {
    // 设置title
    setTitle(state, title) {
        state.title = title;
    },
    setHomeAjaxData(state, data) {
        Object.keys(data).forEach(key => {
            Object.keys(data[key]).forEach(index => {
                console.log(typeof data[key][index]);
            });
        });
    }
}