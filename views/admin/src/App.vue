<template>
    <div id="app">
        <el-container class="is-vertical">
            <header-tpl v-show="isShowHeader"></header-tpl>
            <router-view/>
        </el-container>
    </div>
</template>

<script>
    import headerTpl from './components/header'
    import {mapState} from 'vuex'
    export default {
        name: 'App',
        components:{
            headerTpl,
        },
        computed:{
            ...mapState(['isShowHeader']),
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2C3E50;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
    }
</style>
