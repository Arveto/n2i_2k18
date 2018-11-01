<template lang="html">
  <div class="messengerView">
    <div v-for="message in messages" :key="message.id">
      <Message :message="{id: message.id, sender: message.sender, content: message.content, time: message.time, isMine: message.isMine}"/>
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
  props: {
    messages: {
      type: Array
    }
  },
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
    height: 90%;
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>
