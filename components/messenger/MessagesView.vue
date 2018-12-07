<template lang="html">

  <div class="messengerView">

    <div v-for="message in messages" :key="message.id">
      <Message v-bind:message="message" v-bind:userData="userData"/>
    </div>

  </div>

</template>

<script>
import Message from "./Message.vue"

export default {
  name: 'MessagesView',

  components: {
      Message
  },

  props: ['messages', 'userData'],

  data: function() {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
  .messengerView div{
    margin: 0;
    word-wrap: normal;
  }

  .messengerView{
    /* position: fixed; */
    height: 80%;
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>
