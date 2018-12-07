<template lang="html">

  <div class="root">

    <div class="messengerHeader">
      <div id="conversationMembers">
        <i class="fa fa-users"></i>
      </div>
      <div id="conversationName" @click="contactsPopup=!contactsPopup; chansPopup=false">
          {{currentRoomName}}
      </div>
      <div id="ChansList" @click="chansPopup=!chansPopup; contactsPopup=false">
        <i class="fa fa-list"></i>
      </div>
    </div>

    <div v-if="contactsPopup || chansPopup" class="popup">

      <div v-if="contactsPopup">
        <h3><center>Members</center></h3>
        <div v-for="contact in contacts" :key="contact.id">
          <Contact :data="{id: contact.id, name: contact.name, active: contact.isActive}"/>
        </div>
      </div>

      <div v-if="chansPopup">
        <h3><center>Your conversations</center></h3>
        <div v-for="room in rooms" :key="room.id">
            <div class="chan" v-on:click="selectRoom(room.id)"> <b>{{ room.name }}</b> </div>
        </div>
      </div>

    </div>

  </div>

</template>

<script>
import Contact from './Contact.vue'

export default {
    name: 'MessengerHeader',
        components: {
            Contact
    },

    data: function(){
        return {
            contactsPopup: false,
            chansPopup: false
        }
    },

    props: ['rooms', 'socket', 'currentRoomName'],

    methods: {
        selectRoom: function(id){
            this.$emit("joinRoom", id);
            this.socket.emit('joinRoom', {id: id});
        }
    }
}
</script>

<style lang="css" scoped>
  .messengerHeader{
    margin: 10px -5% 10px -5%;
    display: flex;
    justify-content: space-between;

    color: #3b8070;
    border-bottom: 1px solid #3b8070;
  }

  .popup{
    position: fixed;
    z-index: 10;
    width: 385px;
    height: 50vh;
    right: 11vw;
    bottom: 20vh;

    padding-top: 0;

    background-color: black;
  }

  .chan{
    height: 50px;
    border-radius: 2%;
    border: solid 1px #3b8070;

    padding: 10px;
  }
</style>
