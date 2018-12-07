<template>

<div id="helper">
    <div id="tip"> {{tip}} </div>
    <img src="~/static/alberto-help.png" id="alberto">
</div>

</template>


<script>

export default {
    props: ["tip"]
}

</script>


<style>

#helper{
    position: absolute;
    bottom: 15px;
    right: 15px;
    width: 300px;

}

#alberto{
    width: 300px;
}

</style>
