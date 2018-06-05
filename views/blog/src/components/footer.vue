<template>
    <div id="colophon">
        <span class="copyright-year">©{{ getYear }}-{{ new Date().getFullYear() }}
            <span class="power-by">&nbsp;Powered by
                <a class="hexo-link" href="{$Think.config.api}">{{ webInfo['web_master'] }}.&nbsp;</a>
            </span>
        </span>
    </div>
</template>

<script>
    export default {
        name    : 'footerTpl',
        data() {
            return {
                webInfo: [],
            }
        },
        computed: {
            getYear() {
                return this.base.formatDate(this.webInfo['web_cretime'], 'y');
            }
        },
        mounted() {
            this.webInfo = this.base.storage('web_info');
            if (this.webInfo == null) {
                this.webInfo = {
                    web_cretime: new Date().getFullYear(),
                    web_master : 'JreSun',
                }
            }
        }
    }
</script>