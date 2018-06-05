/**
 * 所有的基本函数
 */
class Base {
    storage(key, value) {
        try {
            let storage  = !localStorage ? sessionStorage : localStorage;
            let currDate = Math.floor(new Date().getTime() / 1000);
            // 设置存储时间
            if (storage.getItem('storage_time') == null) {
                storage.setItem('storage_time', currDate);
            }

            // 当天存数据超过12小时
            if ((currDate - storage.getItem('storage_time') * 1) >= (12 * 60 * 60)) {
                storage.clear();
                return null;
            }  

            if (!key && key != 0) {
                storage.clear();
                return;
            }
            if (!value) {
                return eval('(' + storage.getItem(key) + ')');
            }
            if (value == 'delete') {
                storage.removeItem(key);
                return;
            }
            storage.setItem(key, JSON.stringify(value));
        } finally {

        }
    }

    addZero(num) {
        return num * 1 < 10 ? '0' + num : num;
    }

    isEmpty(val) {
        if (typeof val == 'undefined') {
            return true;
        }
        if (typeof val == 'object') {
            let keys = Object.keys(val);
            return keys.length == 0;
        }
        if (typeof val == 'string') {
            val = val.replace(/' '/g, "");
            return val.length == 0;
        }
        return false;
    }

    formatDate(time, format) {
        let date = new Date(time < 9999999999 ? time * 1000 : time);
        let y    = date.getFullYear();
        let m    = this.addZero(date.getMonth() * 1 + 1);
        let d    = this.addZero(date.getDate());
        let h    = this.addZero(date.getHours());
        let n    = this.addZero(date.getMinutes());
        let s    = this.addZero(date.getSeconds());
        format   = format.replace(/y|m|d|h|n|s/ig, (item) => {
            switch (item) {
                case 'y':
                    return y;
                case 'm':
                    return m;
                case 'd':
                    return d;
                case 'h':
                    return h;
                case 'n':
                    return n;
                case 's':
                    return s;
            }
        });
        return format;
    }
}

export default new Base();