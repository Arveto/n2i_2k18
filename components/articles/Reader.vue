<template>


<div class="hero-body">
    <div class="container has-text-centered">

        <h1 class="title is-1">{{article.title}}</h1>

        <div id="article">{{article.content}}</div>

    </div>
</div>

</template>



<script>

//TODO Parse HTML

export default {

    props: ['article']

}

</script>



<style>

#article {
    font-size: 22px;
}

</style>
