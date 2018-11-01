
<template>
  <div>
    <header>
      <h1>VueMessenger</h1>
      <h3 class="header-right">
        <span>login</span>&nbsp;&nbsp;<i class="fa fa-user"></i>
      </h3>
    </header>
    <Messenger/>
  </div>
</template>

<script>
import Messenger from './Messenger.vue'

export default {
  name: 'Page',
  components: {
    Messenger
  }
}
</script>

<style lang="css" scoped>
  *{
    margin: 1%;
  }
  header{
    display: flex;
    justify-content: space-between;
    border-bottom: solid 1px white;
  }
  .header-right{
    display: flex;
  }
</style>
