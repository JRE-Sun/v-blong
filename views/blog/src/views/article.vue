<template>
    <div id="content">
        <div id="primary">
            <article class="post">
                <header class="post-header">
                    <p class="post-title">
                        {$art_info['art_title']}
                    </p>
                    <time class="post-time">
                        {$art_info['art_addtime']|date='Y年m月d H:m:s',###}
                    </time>
                    <div class="post-menu">目录</div>
                </header>
                <div id="editor" class="post-content">
                    <textarea style="display:none;" name="test-editormd-markdown-doc">{$art_info['art_content']}</textarea>
                </div>
                {include file="comm/art-footer" /}
            </article>
        </div>
    </div>
</template>