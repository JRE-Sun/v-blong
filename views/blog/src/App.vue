<template>
    <div id="app">
        <header-tpl></header-tpl>
        <transition :name="transitionName">
            <router-view class="router-view"/>
        </transition>
        <footer-tpl></footer-tpl>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex';
    import headerTpl from './components/header';
    import footerTpl from './components/footer';

    export default {
        name      : 'App',
        data() {
            return {
                transitionName: 'vux-pop-in',
                maxAjax       : 3,
                ajaxIndex     : 0,
            }
        },
        components: {
            headerTpl,
            footerTpl
        },
        beforeRouteUpdate(to, from, next) {
            console.log(this.$router.isBack);
            let isBack = this.$router.isBack
            if (isBack) {
                this.transitionName = 'vux-pop-out'
            } else {
                this.transitionName = 'vux-pop-in'
            }
            this.$router.isBack = false
            next()
        },
        methods   : {
            ...mapMutations(['setIndexList']),
            getAjaxData() {
                this.API.get('', res => {
                    if (!res) {
                        this.base.storage('cate_list', 0);
                        console.log('抱歉服务器蹦了~~~~(>_<)~~~~');
                        return;
                    }
                    // 获取首页数据后,存入sessionStorage
                    Object.keys(res).forEach(item => {
                        this.base.storage(item, res[item]);
                    });
                    this.ajaxIndex = --this.ajaxIndex;
                });
            },
        },
        watch     : {
            '$route'(to, from) {
                console.log('前一页 from = ' + from.query.key)
                console.log('准备进入的页面是  to = ' + to.query.key)
                if (from.query.key) {
                    if (to.query.key > from.query.key) {
                        this.transitionName = 'vux-pop-in'
                    } else {
                        this.transitionName = 'vux-pop-out'
                    }
                } else {
                    this.transitionName = 'vux-pop-in'
                }
            }
        },
        mounted() {
            if (this.base.storage('cate_list') != null) return;
            let ajaxTimer    = null;
            let timeOutTimer = null;
            let maxAjax      = this.maxAjax;
            let ajaxIndex    = this.ajaxIndex;
            ajaxTimer        = setInterval(() => {
                if (this.base.storage('cate_list') != null) {
                    clearInterval(ajaxTimer);
                    clearTimeout(timeOutTimer);
                    ajaxTimer    = null;
                    timeOutTimer = null;
                    location.reload();
                    console.log(2);
                    return;
                }
                timeOutTimer = setTimeout(() => {
                    if (ajaxIndex >= maxAjax) {
                        return;
                    }
                    this.ajaxIndex = ++ajaxIndex;
                    this.getAjaxData();
                }, 5000);
            }, 100);
        }
    }
</script>

<style>
    .v-note-wrapper .v-note-panel {
        box-shadow: none !important;
    }

    .v-note-wrapper .v-note-panel .v-note-show .v-show-content, .v-note-wrapper .v-note-panel .v-note-show .v-show-content-html {
        background: transparent !important;
        padding: 0 !important;
    }

    #app {
        width: 100%;
        max-width: 100%;
        overflow-x: hidden;
    }

    .router-view {
        /*position: absolute;*/
        width: 100%;
        height: 100%;
        top: 0;
        transition: all .5s ease-out;
    }

    .vux-pop-out-enter-active,
    .vux-pop-out-leave-active,
    .vux-pop-in-enter-active,
    .vux-pop-in-leave-active {
        will-change: transform;
        transition: all 400ms ease-out;
        height: 100%;
        position: absolute;
        backface-visibility: hidden;
        perspective: 1000;
    }

    .vux-pop-out-enter {
        opacity: 1;
        transform: translate3d(-100%, 0, 0);
    }

    .vux-pop-out-leave-active {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
    }

    .vux-pop-in-enter {
        opacity: 1;
        transform: translate3d(100%, 0, 0);
    }

    .vux-pop-in-leave-active {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
    }
</style>
