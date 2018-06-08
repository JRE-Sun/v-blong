<template>
    <div :style="isOpenTree ? '':'display:none'" class="title-tree" @click.prevent.stop="clickTreeBg">
        <div class="title-tree-mask" :class="isOpenTreeMain ? 'open' : 'close'"></div>
        <div class="main" :class="isOpenTreeMain ? 'open' : 'close'">
            <h1>文章目录</h1>
            <div class="title-tree__bd">
                <ol>
                    <li @click.prevent.stop="clickTreeLi(index)" v-for="(tree,index) in treeList" v-bind:key="index">{{ tree }}</li>
                </ol>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TitleTree",
    data() {
        return {
            treeList: [],
            isOpenTreeMain: false,
            idPrefix: "treeRight",
            isOpenTree: false
        };
    },
    props: ["target"],
    methods: {
        clickTreeLi(index) {
            let scrollTop =
                document.documentElement.scrollTop ||
                window.pageYOffset ||
                document.body.scrollTop;

            let top =
                document.querySelector(`#${this.idPrefix + index}`).offsetTop -
                scrollTop;

            document.querySelector("body").scrollTop = top;
            document.querySelector("html").scrollTop = top;
            this.clickTreeBg();
        },
        clickTreeBg() {
            this.isOpenTreeMain = false;
            setTimeout(() => {
                this.isOpenTree = false;
            }, 200);
        },
        openTitleTree(data) {
            this.isOpenTree = data.isOpenTree;
            setTimeout(() => {
                this.isOpenTreeMain = true;
            }, 20);
            let treeList = this.treeList;
            if (treeList.length > 0) return;
            let target = this.target;
            let idPrefix = this.idPrefix;
            // 先查找h1,把所有的h1变成数组,在便利数组h1里面的h2插入
            Array.from(document.querySelectorAll(`${target} h1`)).forEach(
                (item, index) => {
                    item.id = `${idPrefix + index}`;
                    treeList.push(item.innerText);
                }
            );
            this.treeList = treeList;
        }
    },
    mounted() {}
};
</script>

<style scoped>
.title-tree {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 9999;
    font-family: "Microsoft YaHei", "Open Sans", sans-serif;
}

.title-tree-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: 0.2s;
    background-color: rgba(0, 0, 0, 0.2);
}

.title-tree-mask.open {
    opacity: 1;
}

.title-tree-mask.close {
    opacity: 0;
}

.title-tree .main {
    width: 300px;
    height: 100%;
    overflow-y: scroll;
    transition: 0.2s;
    -webkit-overflow-scrolling: touch;
    background-color: #fff;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    transform: translateX(-100%);
}

.title-tree .main.open {
    transform: translateX(0);
}

.title-tree h1 {
    font-size: 18px;
    text-align: center;
    margin: 0 auto;
    border-bottom: 1px solid #ddd;
    background-color: #f4f5f9;
    overflow: hidden;
    box-sizing: border-box;
    padding: 5px 0;
}

.title-tree__bd {
    padding: 0 10px 0 0;
}

.title-tree__bd li {
    padding: 5px 0;
    word-break: break-all;
    cursor: pointer;
}

.title-tree__bd li:hover {
    color: #2d57cb;
}
</style>