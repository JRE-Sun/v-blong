<template>
    <div :style="isShowLoading ?'display:flex':'display:none'" class="loading"><span class="loader"></span>加载中...</div>
</template>

<script>
    export default {
        name : 'Loading',
        props: ['isShowLoading'],
    }
</script>

<style>
    .loading {
        z-index: 9999;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: #FFF;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .loader {
        border: 3px solid rgba(0, 0, 0, .15);
        border-radius: 100%;
        display: inline-block;
        position: relative;
        top: -3px;
        width: 20px;
        height: 20px;
        vertical-align: middle;
        margin-right: 5px;
    }

    .loader:after {
        content: "";
        position: absolute;
        top: -3px;
        right: -3px;
        bottom: -3px;
        left: -3px;
        border-radius: 100%;
        border: 3px solid transparent;
        border-top-color: #3CB5F6;
        animation: 1s loadingMove infinite linear;
    }

    @keyframes loadingMove {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>