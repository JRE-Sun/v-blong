<template>
    <div id="content">
        <div id="primary">
            <section id="archive" class="archive">
                <h2 v-show="cateName">{{ cateName }}</h2>
                <template v-for="(article,index) in articleList">
                    <div v-if="article.isActiveYear" class="collection-title">
                        <h2 class="archive-year">{{ article.year }}</h2>
                    </div>
                    <div class="archive-post">
                        <span class="archive-post-time">{{ article.date }}</span>
                        <span class="archive-post-title">
                            <router-link :to="{name:'article',query:{art_id:article['art_id'],key:key}}"
                                         class="archive-post-link">{{ article.art_title }}</router-link>
                        </span>
                    </div>
                </template>
                <p v-show="!articleList.length">暂无文章!</p>
            </section>
        </div>
        <loading-tpl :is-show-loading="isShowLoading"></loading-tpl>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import loadingTpl from '../components/loading';

    export default {
        name      : 'list',
        data() {
            return {
                cateName     : false,
                activeYear   : new Date().getFullYear() * 1,
                articleList  : [],
                isShowLoading: true,
            }
        },
        components: {
            loadingTpl
        },
        computed  : {
            ...mapState['indexList'],
            key() {
                return (new Date()).valueOf()
            }
        },
        methods   : {
            isActiveYear(articleYear) {
                if (articleYear == this.activeYear) {
                    this.activeYear = --articleYear;
                    return true;
                }
                return false;
            },
            watchRouterChange(query) {
                if (query && query.key) {
                    delete query.key;
                }
                this.isShowLoading = true;
                let artList        = this.base.storage('art_list');
                if (!artList) return;
                let cateId       = 0;
                let isQueryEmpty = this.base.isEmpty(query);
                // 当不是空
                cateId           = isQueryEmpty ? 0 : query.cate_id;
                setTimeout(() => {
                    this.articleList   = artList.filter(item => {
                        if (!isQueryEmpty && item.cate_id != cateId) {
                            return false;
                        }
                        item.year         = this.base.formatDate(item.art_addtime, 'y');
                        item.date         = this.base.formatDate(item.art_addtime, 'm-d');
                        item.isActiveYear = this.isActiveYear(item.year);
                        return item;
                    });
                    this.cateName      = (isQueryEmpty || !this.articleList.length) ? false : this.articleList[0].cate_name;
                    this.isShowLoading = false;
                }, 1000);
                document.querySelector('body,html').scrollTop = 0;
            }
        },
        watch     : {
            $route: function (to) {
                this.watchRouterChange(to.query);
            }
        },
        mounted() {
            this.watchRouterChange(this.$route.query);
        }
    }
</script>