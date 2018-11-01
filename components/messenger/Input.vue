<template lang="html">
  <div class="Inputcontainer">
    <input class="" type="text" placeholder="Type your message" @keypress.enter="sendMessage" v-model="usersMessage">
    <div class="icons">
      <p><i class="fa fa-smile"></i></p>
      <p><i class="fa fa-paperclip"></i></p>
      <p><i class="fa fa-paper-plane"></i></p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Input',
  data() {
    return {
      usersMessage: ''
    }
  },
  methods: {
    sendMessage() {
      this.$emit("sendMessage", this.$data.usersMessage);
      this.$data.usersMessage = "";
    }
  }
}
</script>

<style lang="css" scoped>
  .Inputcontainer{
    display: flex;
    width: 100%;
    /* background-color: black; */
    /* border-color: black; */
  }

  input{
    flex: 6;

    padding: 5px;
    border: none;

    background-color: transparent;
    color: white;
  }

  .icons{
    flex: 2;
    display: flex;
    justify-content: space-between;
    padding-right: 10px;
  }
  p:hover{
    cursor: pointer;
    color: #3b8070;
  }
</style>
