<template>
    <div id="content">
        <loading-tpl :is-show-loading="isShowLoading"></loading-tpl>
        <div id="primary">
            <article class="post">
                <div id="editor" class="post-content">
                    <mavon-editor
                            :toolbarsFlag="false"
                            :subfield="false"
                            :editable="false"
                            :defaultOpen="defaultOpen"
                            v-model="single['sing_content']"/>
                </div>
            </article>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import loadingTpl from '../components/loading';

    export default {
        name      : 'list',
        data() {
            return {
                defaultOpen  : 'preview',
                single       : {},
                isShowLoading: true,
            }
        },
        components: {
            loadingTpl
        },
        computed  : {
            ...mapState(['api']),
        },
        methods   : {
            getAjaxInfo(singID) {
                this.isShowLoading = true;
                setTimeout(() => {
                    let singList = this.base.storage('sing_list');
                    if (singList == null) {
                        this.API.get('index.php/index/single/index/sing_id/' + singID, res => {
                            this.single = res;
                        });
                        return;
                    }
                    this.single        = singList[0];
                    this.isShowLoading = false;
                }, 400)
                document.querySelector('body').scrollTop = 0;
                document.querySelector('html').scrollTop = 0;
            },
        },
        watch     : {
            "$route": function (to, from) {
                if (to.name == from.name && to.name == 'single') {
                    this.getAjaxInfo(to.query.sing_id);
                }
            },
        },
        mounted() {
            this.getAjaxInfo(this.$route.query.sing_id);
        }
    }
</script>