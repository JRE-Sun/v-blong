import store from './store/index';
import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

class API {
    constructor() {
        this.api = store.state.api;
    }

    post(url, data, callback = null) {
        if (typeof url == 'undefined') {
            console.log('url必填');
            return;
        }
        let params = new URLSearchParams();
        Object.keys(data).forEach(key => {
            params.append(key, data[key]);
        });
        axios({
            method: 'post',
            url   : this.api + url,
            data  : params
        }).then((res) => {
            if (res.status != 200) {
                res.data = false;
            }
            typeof callback == 'function' && callback(res.data);
        });
    }

    get(url, callback = null) {
        if (typeof url == 'undefined') {
            console.log('url必填');
            return;
        }
        axios.get(this.api + url).then(function (res) {
            if (res.status != 200) {
                res.data = false;
            }
            typeof callback == 'function' && callback(res.data);
        });
    }
}

export default new API();