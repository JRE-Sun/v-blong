<template>
    <div id="content">
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

    export default {
        name    : 'list',
        data() {
            return {
                defaultOpen: 'preview',
                single     : {},
            }
        },
        computed: {
            ...mapState(['api']),
        },
        methods : {
            getAjaxInfo(singID) {
                this.API.get('index.php/index/single/index/sing_id/' + singID, res => {
                    this.single = res;
                });
                document.querySelector('body,html').scrollTop = 0;
            },
        },
        watch   : {
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