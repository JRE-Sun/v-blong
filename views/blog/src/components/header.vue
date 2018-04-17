<template>
    <div id="masthead">
        <div class="site-header-inner">
            <h1 class="site-title">
                <router-link :to="{name:'list'}" class="logo">JreSun</router-link>
            </h1>
            <nav id="nav-top">
                <ul id="menu-top" class="nav-top-items">
                    <li class="menu-item">
                        <router-link :to="{name:'list'}">
                            首页
                        </router-link>
                    </li>
                    <li v-for="(cate,index) in cateList" v-bind:key="index" class="menu-item">
                        <router-link :to="{name:'list',query:{cate_id:cate['cate_id']}}">
                            {{ cate.cate_name }}
                        </router-link>
                    </li>
                    <li v-for="(sing,index) in singList" v-bind:key="index" class="menu-item">
                        <router-link :to="{name:'single',query:{sing_id:sing.sing_id}}">
                            {{sing.sing_title}}
                        </router-link>
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