<template lang="html">
  <div class="root">
    <img src="@/static/phone.png" alt=""/>
    <iframe src="http://51.75.92.38:8080" width="1080" height="1920"></iframe>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
  img{
    position: absolute;
    top: 20px;
    width: 600px;
    height: 700px;
  }

  iframe{
    position: absolute;
    top: 95px;
    left: 130px;

    width: 340px;
    height: 540px;
  }
</style>
