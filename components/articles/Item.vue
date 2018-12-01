<template lang="html">

<div class="article">
    <div class="articleTitle">{{article.title}}</div>
    {{article.fiName}} {{article.faName}}
    <div class="date">{{article.date}}</div>
</div>

</template>


<script>

export default {
    props: ['socket', 'article']
}

</script>


<style>

.article{
    margin-top: 10px;
    width: 60%;
    margin-left: 20px;

}

.article:hover {
    background-color: #5E6D6F;
    cursor: default;
}

.articleTitle{
    font-size: 28px;
}

.date{
    display: inline-block;
    text-align: right;
}

</style>
