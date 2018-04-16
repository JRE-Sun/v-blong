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

    export default {
        name      : 'App',
        components: {
            headerTpl,
            footerTpl
        },
        mounted() {
            this.API.get('', res => {
                if (!res) {
                    console.log('抱歉服务器蹦了~~~~(>_<)~~~~');
                    return;
                }
                // 获取首页数据后,存入sessionStorage
                Object.keys(res).forEach(item => {
                    this.base.storage(item, res[item]);
                });
            });
        }
    }
</script>

<style>
    #app {
        font-family: "YaHei Consolas Hybrid";
    }
</style>
