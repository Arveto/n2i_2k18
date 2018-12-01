<template lang="html">

<div>

    <div class="container has-text-centered">
        <h1 class="title is-1 has-text-grey">Articles [WIP]</h1>
        <p class="subtitle has-text-grey">Stay informed on our latest news</p>
    </div>

    <ul v-for="item in articles">
        <div  v-on:click="viewArticle(item.id)">
            <Item  v-bind:article="item" v-bind:socket="socket"/>
        </div>
    </ul>
</div>

</template>



<script>

//TODO Improve template

import Item from '@/components/articles/Item'

export default {
    props: ['socket', 'articles'],
    components: {Item},
    methods: {
        viewArticle : function (id) {
            console.log("Id:"+id);

            this.$emit('switchView', 'Reader');

            let article = {id: id};

            this.socket.emit("viewArticle", article);
        }
    }
}

</script>
