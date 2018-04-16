<template>
    <div id="app">
        <header-tpl></header-tpl>
        <router-view/>
        <footer-tpl></footer-tpl>
    </div>
</template>

<script>
    import headerTpl from './components/header';
    import footerTpl from './components/footer';
    import {mapState, mapMutations} from 'vuex';

    export default {
        name      : 'App',
        components: {
            headerTpl,
            footerTpl
        },
        computed  : {
            ...mapState['cate_list', 'art_list', ''],
        },
        methods   : {
            ...mapMutations(['setHomeAjaxData']),
        },
        mounted() {
            this.API.get('', res => {
                if (!res) {
                    console.log('抱歉服务器蹦了~~~~(>_<)~~~~');
                    return;
                }
                // res = res.map(item => {
                //     item.year = this.formatDate(item.art_addtime, 'y');
                //     item.date = this.formatDate(item.art_addtime, 'h:m');
                //     return item;
                // });
                this.setHomeAjaxData(res);
            });
        }
    }
</script>

<style>
    #app {
        font-family: "YaHei Consolas Hybrid";
    }
</style>
