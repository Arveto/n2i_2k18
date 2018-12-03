
<template lang="html">
  <div class="c_contact">
    <div class="activity">
      <div v-show="data.active" class="greenPoint"></div>
    </div>
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
    border-radius: 2%;
    border: solid 1px #3b8070;
  }
  .activity{
    display: inline-block;
    height: 10px;
    width: 10px;
  }
  .greenPoint{
    margin: 5px 5px 0 3px;
    height: 10px;
    width: 10px;
    background-color: green;
    border-radius: 50%;
  }
</style>
