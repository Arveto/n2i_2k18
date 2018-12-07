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

    <Help v-bind:tip="'Voici des articles publiés par les autorités compétentes pour vous tenir au courant des actualités.'"/>
</div>

</template>



<script>

import Item from '@/components/articles/Item'
import Help from '@/components/Help'

export default {
    props: ['socket', 'articles'],
    components: {Item, Help},
    methods: {
        viewArticle : function (id) {

            this.$emit('switchView', 'Reader');

            let article = {id: id};

            this.socket.emit("viewArticle", article);
        }
    }
}

</script>
