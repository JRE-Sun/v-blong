<template>
    <header id="masthead">
        <div class="site-header-inner">
            <h1 class="site-title">
                <a href="{$Think.config.api}" class="logo">JreSun</a>
            </h1>
            <nav id="nav-top">
                <ul id="menu-top" class="nav-top-items">
                    <li class="menu-item">
                        <a href="{$Think.config.api}">
                            首页
                        </a>
                    </li>

                    <li class="menu-item">
                        <a href="{$Think.config.api}index/article/listPage/cate_id/{$cate['cate_id']}">
                          分类
                        </a>
                    </li>


                    <li class="menu-item">
                        <a href="{$Think.config.api}index/single/index/sing_id/{$sing['sing_id']}">
                           about
                        </a>
                    </li>

                </ul>
            </nav>
        </div>
    </header>
</template>

<script>

</script>

<style>

</style>