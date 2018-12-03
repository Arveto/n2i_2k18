<template lang="html">

  <div class="root">

    <div class="messengerHeader">
      <div id="conversationMembers" @click="contactsPopup=!contactsPopup; chansPopup=false">
        <i class="fa fa-users"></i>
      </div>
      <div id="conversationName" @click="contactsPopup=!contactsPopup; chansPopup=false">
        Conversation name
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
        <div v-for="chan in chans" :key="chan.id">
          <div class="chan"> <b>{{ chan.name }}</b> </div>
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
      chansPopup: false,

      contacts: [
        {id: 1, name: "xXx_D33P_V4CCUM_xXx", isActive: true},
        {id: 2, name: "WarTchoin", isActive: false},
        {id: 3, name: "Street Charisma", isActive: true},
        {id: 4, name: "Khieron", isActive: true},
        {id: 5, name: "TajMahal", isActive: false},
        {id: 6, name: "TazdzadMahal", isActive: false}
      ],
      chans: [
        {id: 1, name: "Testing Chan"},
        {id: 2, name: "zefezf"},
        {id: 3, name: "zedzededzedzede"},
      ]
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
