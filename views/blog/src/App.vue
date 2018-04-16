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
        }
    }
</script>

<style>
    #app {
        font-family: "YaHei Consolas Hybrid";
    }
</style>
