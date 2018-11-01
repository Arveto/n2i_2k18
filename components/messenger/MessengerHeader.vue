<template lang="html">
  <div class="root">
    <div class="messengerHeader">
      <div id="conversationMembers">
        <i class="fa fa-users"></i>
      </div>
      <div id="conversationName">
        Conversation name
      </div>
      <div id="closeConversation">
        <i class="fa fa-times"></i>
      </div>
    </div>
    <div v-if="isOpen" class="contactsList">
      <div v-for="contact in contacts" :key="contact.id">
        <Contact :data="{id: contact.id, name: contact.name, active: contact.isActive}"/>
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
      isOpen: false,
      contacts: [
        {id: 1, name: "TERRUSS", isActive: true},
        {id: 2, name: "WarTchoin", isActive: false},
        {id: 3, name: "Street Charisma", isActive: true},
        {id: 4, name: "Khieron", isActive: true},
        {id: 5, name: "TajMahal", isActive: false}
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
</style>
