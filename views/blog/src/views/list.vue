<template>
    <div id="content">
        <div id="primary">
            <section id="archive" class="archive">
                <template v-for="(article,index) in articleList">
                    <div v-show="isActiveYear(article.year)" class="collection-title">
                        <h2 class="archive-year">{{ article.year }}</h2>
                    </div>
                    <div class="archive-post">
                        <span class="archive-post-time">{{ article.date }}</span>
                        <span class="archive-post-title">
                            <router-link :to="{name:'article',query:{artID:article['art_id']}}" class="archive-post-link">{{ article.art_title }}</router-link>
                        </span>
                    </div>
                </template>
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
            }
        },
        mounted() {
            let artList      = this.base.storage('art_list');
            this.articleList = artList.map(item => {
                item.year = this.base.formatDate(item.art_addtime, 'y');
                item.date = this.base.formatDate(item.art_addtime, 'h:m');
                return item;
            });
        }
    }
</script>