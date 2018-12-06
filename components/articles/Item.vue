<template lang="html">

<div class="article">
    <div class="articleTitle">{{article.title}}</div>
    par {{article.fiName}} {{article.faName}}
    <div class="date">on {{ this.article.date }}</div>
</div>

</template>


<script>

export default {
    props: ['socket', 'article'],

    mounted(){

        console.log(this.article.date);

        let dateTimeParts= this.article.date.split(/[- :]/);
        dateTimeParts[1]--;

        console.log(dateTimeParts);

        let dateObject = new Date();

        dateObject.setFullYear(dateTimeParts[0]);
        dateObject.setMonth(dateTimeParts[1]);
        dateObject.setDate(dateTimeParts[2].substring(0, dateTimeParts[2].length - 3));
        dateObject.setMinutes(dateTimeParts[3]);
        dateObject.setHours(dateTimeParts[4].substring(0, dateTimeParts[4].length - 5));

        this.article.date = dateObject.getHours()+':'+dateObject.getMinutes() +' '+dateObject.getDay()+'/'+dateObject.getMonth()+'/'+dateObject.getFullYear();

    },

    methods: {
        parseDate: function(){

        }
    }
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
