<template>
    <div id="content">
        <div id="primary">
            <section id="archive" class="archive">
                <h2 v-show="cateName">{{ cateName }}</h2>
                <template v-for="(article,index) in articleList">
                    <div v-show="isActiveYear(article.year)" class="collection-title">
                        <h2 class="archive-year">{{ article.year }}</h2>
                    </div>
                    <div class="archive-post">
                        <span class="archive-post-time">{{ article.date }}</span>
                        <span class="archive-post-title">
                            <router-link :to="{name:'article',query:{art_id:article['art_id']}}"
                                         class="archive-post-link">{{ article.art_title }}</router-link>
                        </span>
                    </div>
                </template>
                <p v-show="!articleList.length">暂无文章!</p>
            </section>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name    : 'list',
        data() {
            return {
                cateName   : false,
                activeYear : new Date().getFullYear() * 1,
                articleList: [],
            }
        },
        computed: {
            ...mapState['www'],
        },
        methods : {
            isActiveYear(articleYear) {
                if (articleYear == this.activeYear) {
                    console.log(articleYear, 1);
                    this.activeYear = --articleYear;
                    return true;
                }
                return false;
            },
            watchRouterChange(query) {
                let artList      = this.base.storage('art_list');
                let cateId       = 0;
                let isQueryEmpty = this.base.isEmpty(query);

                // 当不是空
                cateId = isQueryEmpty ? 0 : query.cate_id;

                this.articleList = artList.filter(item => {
                    if (!isQueryEmpty && item.cate_id != cateId) {
                        return false;
                    }
                    item.year = this.base.formatDate(item.art_addtime, 'y');
                    item.date = this.base.formatDate(item.art_addtime, 'h:m');
                    return item;
                });

                console.log(this.articleList);

                this.cateName = (isQueryEmpty || !this.articleList.length) ? false : this.articleList[0].cate_name;

                document.querySelector('body,html').scrollTop = 0;
            }
        },
        watch   : {
            $route: function (to) {
                this.watchRouterChange(to.query);
            }
        },
        mounted() {
            this.watchRouterChange(this.$route.query);
        }
    }
</script>