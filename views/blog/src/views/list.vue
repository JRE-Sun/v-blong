<template>
    <div id="content">
        <div id="primary">
            <section id="archive" class="archive">
                <template v-for="(article,index) in art_list">
                    {{ art_list }}
                    <div v-show="isActiveYear(article.year)" class="collection-title">
                        <h2 class="archive-year">{{ article.year }}</h2>
                    </div>
                    <div class="archive-post">
                        <span class="archive-post-time">{{ article.date }}</span>
                        <span class="archive-post-title">
                            <a href="{$Think.config.api}index/article/detail/art_id/{$art['art_id']}"
                               class="archive-post-link">{{ article.art_title }}</a>
                        </span>
                    </div>
                </template>
            </section>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name    : 'list',
        data() {
            return {
                activeYear : new Date().getFullYear() * 1,
            }
        },
        computed: {
            ...mapState['art_list'],
        },
        methods : {
            addZero(num) {
                return num * 1 < 10 ? '0' + num : num;
            },
            formatDate(time, format) {
                let date = new Date(time * 1000);
                let y    = date.getFullYear();
                let m    = this.addZero(date.getMonth() * 1 + 1);
                let d    = this.addZero(date.getDate());
                let h    = this.addZero(date.getHours());
                let n    = this.addZero(date.getMinutes());
                let s    = this.addZero(date.getSeconds());
                format   = format.replace(/y|m|d|h|n|s/ig, (item) => {
                    switch (item) {
                        case 'y':
                            return y;
                        case 'm':
                            return m;
                        case 'd':
                            return d;
                        case 'h':
                            return h;
                        case 'n':
                            return n;
                        case 's':
                            return s;
                    }
                });
                return format;
            },
            isActiveYear(articleYear) {
                if (articleYear == this.activeYear) {
                    this.activeYear = --articleYear;
                    return true;
                }
                return false;
            }
        },
        mounted() {

        }
    }
</script>