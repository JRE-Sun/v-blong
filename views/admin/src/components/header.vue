<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="首页" name="first"><home-tpl></home-tpl></el-tab-pane>
        <el-tab-pane label="JreSun" name="second">JreSun</el-tab-pane>
        <el-tab-pane label="文章" name="third">文章</el-tab-pane>
        <el-tab-pane label="分类" name="fourth">分类</el-tab-pane>
        <el-tab-pane label="单页面" name="fifth">单页面</el-tab-pane>
        <el-tab-pane label="前台首页" name="sixth">前台首页</el-tab-pane>
        <el-tab-pane label="退出登录" name="seventh">退出登录</el-tab-pane>
    </el-tabs>
</template>
<script>
    import homeTpl from '../views/home'

    export default {
        data() {
            return {
                activeName: 'first'
            };
        },
        components: {
            homeTpl,
        },
        methods   : {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    }
</script>