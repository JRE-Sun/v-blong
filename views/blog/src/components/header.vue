<template>
    <div id="masthead">
        <div class="site-header-inner">
            <h1 class="site-title">
                <a href="{$Think.config.api}" class="logo">JreSun</a>
            </h1>
            <nav id="nav-top">
                <ul id="menu-top" class="nav-top-items">
                    <li class="menu-item">
                        <a href="{$Think.config.api}">
                            首页
                        </a>
                    </li>
                    <li v-for="(cate,index) in cateList" v-bind:key="index" class="menu-item">
                        <a href="{$Think.config.api}index/article/listPage/cate_id/{$cate['cate_id']}">
                            {{ cate.cate_name }}
                        </a>
                    </li>
                    <li v-for="(sing,index) in singList" v-bind:key="index" class="menu-item">
                        <a href="{$Think.config.api}index/single/index/sing_id/{$sing['sing_id']}">
                            {{sing.sing_title}}
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'headerTpl',
        data() {
            return {
                cateList: [],
                singList: [],
            }
        },
        mounted() {
            this.cateList = this.base.storage('cate_list');
            // 这里后台传过来的是个数组
            this.singList = this.base.storage('sing_list');
        }
    }
</script>