<template lang="html">
  <div class="message" :class="message.isMine ? 'mine' : ''">
    <b v-if="!message.isMine"> {{ message.sender }}</b>&nbsp;
    <small> at {{ message.time }} </small>
    <span>
      {{ message.content }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: {
    message: {
      type: Object
    }
  }
}
</script>

<style lang="css" scoped>
  .message{
    background-color: transparent;
    display: flex;
  }
  .message.mine{
    justify-content: flex-end;
  }

  b{
    color: #3b8070;
  }

  span{
    background-color: #1e221f;
    margin : 10px;
    padding: 5px;
    border-radius: 10px;
  }

  .message.mine span{
    background-color: #3b8070;
  }

  small{
    font-size: 0.7em;
  }
</style>
