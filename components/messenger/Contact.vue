
<template lang="html">
  <div class="c_contact">
    <div v-if="data.active" class="activity"></div>
    <span><b> {{ data.name }} </b></span>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  props: {
    data: {
      type: Object
    }
  }
}
</script>

<style lang="css" scoped>
  .c_contact{
    height: 50px;
    background-color: #4f4d4d;
  }
  .activity{
    display: inline-block;
    margin: 0 5px 0 5px;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background-color: green;
  }
</style>
