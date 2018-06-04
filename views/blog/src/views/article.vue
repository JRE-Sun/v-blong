<template>
    <div id="content">
        <loading-tpl :is-show-loading="isShowLoading"></loading-tpl>
        <div id="primary">
            <article class="post">
                <header class="post-header">
                    <p class="post-title">
                        {{ article['art_title'] }}
                    </p>
                    <time class="post-time">
                        {{ getDate }}
                    </time>
                    <div class="post-menu">目录</div>
                </header>
                <div id="editor" class="post-content">
                    <mavon-editor
                            :toolbarsFlag="false"
                            :subfield="false"
                            :editable="false"
                            :defaultOpen="defaultOpen"
                            v-model="article['art_content']"/>
                </div>
                <footer class="post-footer">
                    <div class="post-tags">
                        <router-link :to="{name:'list',query:{cate_id:article['cate_id'],key:key}}">{{
                            article['cate_name'] }}
                        </router-link>
                    </div>
                    <nav v-show="isEmpty(nextInfo.length) || isEmpty(preInfo.length)" class="post-nav">
                        <router-link v-show="isEmpty(preInfo.length)" class="prev"
                                     :to="{name:'article',query:{art_id:preInfo['art_id'],key:key}}">
                            <i class="iconfont icon-left"></i>
                            <span class="prev-text nav-default">{{ preInfo['art_title'] }}</span>
                        </router-link>
                        <router-link v-show="isEmpty(nextInfo.length)" class="next"
                                     :to="{name:'article',query:{art_id:nextInfo['art_id'],key:key}}">
                            <span class="next-text nav-default">{{ nextInfo['art_title'] }}</span>
                            <i class="iconfont icon-right"></i>
                        </router-link>
                    </nav>
                </footer>
            </article>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import loadingTpl from '../components/loading';

    export default {
        name      : 'articleTpl',
        data() {
            return {
                defaultOpen  : 'preview',
                article      : [],
                nextInfo     : [],
                preInfo      : [],
                isShowLoading: true,
            }
        },
        components: {
            loadingTpl
        },
        computed  : {
            ...mapState(['api']),
            getDate() {
                return this.base.formatDate(this.article['art_addtime'], 'y-m-d h:n:s');
            },
            key() {
                return (new Date()).valueOf()
            }
        },
        methods   : {
            isEmpty(val) {
                return this.base.isEmpty(val);
            },
            getAjaxInfo(artID) {
                this.isShowLoading = true;
                setTimeout(() => {
                    let artList  = this.base.storage('art_list');
                    let waitTime = 1000;
                    if (artList == null) {
                        this.API.get('index.php/index/article/detail/art_id/' + artID, res => {
                            waitTime     = 600;
                            this.article = res.art_info;
                            // this.nextInfo = res.next_info;
                            // this.preInfo  = res.pre_info;
                        });
                    } else {
                        waitTime     = 1000;
                        // 从session取数据
                        this.article = artList.filter(art => {
                            return art.art_id == artID;
                        });
                        this.article = this.article[0];
                    }
                    setTimeout(() => {
                        this.isShowLoading = false;
                    }, waitTime);
                }, 400);
                document.querySelector('body,html').scrollTop = 0;
            }
        },
        watch     : {
            "$route": function (to, from) {
                if (to.name == from.name && to.name == 'article') {
                    this.getAjaxInfo(to.query.art_id);
                }
            },
        },
        mounted() {
            this.getAjaxInfo(this.$route.query.art_id);
        }
    }
</script>