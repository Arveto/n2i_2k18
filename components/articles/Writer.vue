<template lang="html">


    <div class="hero-body">
        <link rel="stylesheet" type="text/css" href="https://csshake.surge.sh/csshake.min.css">
        <div class="container has-text-centered">

            <h1 class="title is-1">Publish article [WIP]</h1>

            <div class="fieldTitle">Title:</div>
            <input type="text" id="title" class="text" v-model="title">
            <br/>

            <div class="fieldTitle">Content:</div>
            <textarea id="content" class="text" v-model="content"></textarea>

            <br />

            <a class="button is-link" id="submit" v-on:click="submit">Submit</a>

        </div>

    </div>

</template>



<script>



let data = {
        title : 'Your title',
        content : 'Your article goes here'
};

export default {

    data(){
        return data;
    },

    mounted() {
        this.socket.on('uploadArticle', () => {
            data.title = '';
            data.content = '';
        });
    },

    methods: {

        submit: function(){

            let data = {
                userData: {}
            };

            data.userData.email = this.userData.email;
            data.title = this.title;
            data.content = this.content;

            this.socket.emit('uploadArticle', data);


        }
    },

    props : ['userData', 'socket']

}

</script>



<style>

#title {
    margin-bottom: 10px;
    background-color: white;
    color: black;
    border: none;
    font-family: 'Varela Round', serif;
    font-size: 20px;
}

#content {
    resize: none;
    width: 60%;
    height: 250px;
    background-color: white;
    color: black;
    border: none;
    font-family: 'Varela Round', serif;
    font-size: 20px;
}

.text {
    background: transparent;
    border-radius: 3px;
    border-width: 1px;
    border-color: white;
    outline: none;
}

.fieldTitle{
    font-size: 22px;
}

#submit {
    margin-top: 25px;
}

</style>
