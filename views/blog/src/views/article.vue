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
                    <div @click="openTree" class="post-menu">目录</div>
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
        <title-tree-tpl ref="titleTreeTpl" target=".v-show-content"></title-tree-tpl>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import titleTreeTpl from '../components/title-tree';
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
                isOpenTree   : false,
            }
        },
        components: {
            loadingTpl,
            titleTreeTpl
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
            openTree() {
                this.$refs.titleTreeTpl.openTitleTree({
                    isOpenTree: true,
                });
            },
            isEmpty(val) {
                return this.base.isEmpty(val);
            },
            getAjaxInfo(artID) {
                document.querySelector('body').scrollTop = 0;
                document.querySelector('html').scrollTop = 0;
                this.isShowLoading                       = true;
                setTimeout(() => {
                    let artList = this.base.storage('art_list');
                    let article = null;
                    if (artList == null) {
                        this.API.get('index.php/index/article/detail/art_id/' + artID, res => {
                            article = res.art_info;
                            // this.nextInfo = res.next_info;
                            // this.preInfo  = res.pre_info;
                        });
                    } else {
                        // 从session取数据
                        this.article = artList.filter(art => {
                            return art.art_id == artID;
                        });
                        article      = this.article[0];
                    }
                    let url = location.href;
                    if (article == null) {
                        location.href = url.replace(/#.*/ig, '');
                    }
                    this.isShowLoading = false;
                    this.article       = article;
                }, 400);
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