<template>
    <div id="app" v-cloak>
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
                if (to.query.debug == 1) {
                    this.base.storage();
                }
                // console.log('前一页 from = ' + from.query.key)
                // console.log('准备进入的页面是  to = ' + to.query.key)
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
            if (this.base.storage('cate_list') != null && this.base.storage('cate_list') != 0) return;
            let ajaxTimer    = null;
            let timeOutTimer = null;
            let maxAjax      = this.maxAjax;
            let ajaxIndex    = this.ajaxIndex;
            ajaxTimer        = setInterval(() => {
                if (this.base.storage('cate_list') != null && this.base.storage('cate_list') != 0) {
                    clearInterval(ajaxTimer);
                    clearTimeout(timeOutTimer);
                    ajaxTimer    = null;
                    timeOutTimer = null;
                    location.reload();
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
    [v-cloak] {
        display: none;
    }

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
    }

    .router-view {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 0 5%;
        background-color: #FFF;
        /*top: 0;*/
        left: 0;
        /*right: 0;*/
        /*bottom: 0;*/
        transition: all .3s ease-out;
    }

    .vux-pop-out-enter-active,
    .vux-pop-out-leave-active,
    .vux-pop-in-enter-active,
    .vux-pop-in-leave-active {
        will-change: transform;
        /*transition: all 400ms ease-out;*/
        /*height: 100%;*/
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
