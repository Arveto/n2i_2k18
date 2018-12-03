<template>

    <div id="MESSENGER">

        <div v-if="isOpen" id="root">
            <div class="box" id="messenger">
                <div id="messages">
                    <div id="header">
                        <MessengerHeader/>
                    </div>
                    <MessagesView :messages="messages"/>
                    <div id="userInput">
                        <Input @sendMessage="sendMessage"/>
                    </div>
                </div>
            </div>
        </div>
        <div id="toggleMessenger" class="button" @click="toggleMessenger">
            <div v-if="isOpen">
                <i class="fa fa-times"></i>
            </div>
            <div v-else>
                <i class="fa fa-comment"></i>
            </div>
        </div>
    </div>

</template>



<script>

import MessagesView from './MessagesView.vue'
import MessengerHeader from './MessengerHeader.vue'
import Input from "./Input.vue"

// import io from 'socket.io-client'
// let socket = io.connect('localhost:3000'); //TODO Pass io instance as props

export default {
    name: 'Messenger',
    components: {
        MessagesView,
        MessengerHeader,
        Input
    },

    props: {
      socket: {
        type: Object
      }
    },

    data: function() {
        return {
            isOpen: false,

            messages: [
                {id:1, sender:'p1', content:'yo la mif', time:'12', isMine: false},
                {id:2, sender:'p2', content:'wesh', time:'145', isMine: false},
                {id:3, sender:'mwa', content:'plop', time:'645', isMine: true},
                {id:4, sender:'p1', content:'caca', time:'46', isMine: false}
            ]
        }
    },

    mounted: function (){
        this.socket.on("message", (data)=>{
            data.id = this.$data.messages.length++;
            data.isMine = false;
            this.$data.messages.push(data)
        })
        this.socket.on("messageRecived", (data)=>{
            data.id = this.$data.messages.length+1;
            data.isMine = true;
            this.$data.messages.push(data)
        })
    },

    methods: {
        toggleMessenger: function() {
            this.$data.isOpen = !this.$data.isOpen;
        },
        sendMessage: function(content) {
            this.socket.emit("message", {"id": '', "sender": "test", "content": content, "time": 42, "isMine": ''});
            console.log('oiu');
        }
    }
}

</script>



<style lang="css" scoped>

div{
    margin: 5px;
}

#root, #messages{
    position: fixed;
    width: 400px;
    height: 60vh;
    right: 10vw;
    bottom: 20vh;

    padding-top: 0;
    /* background-color: black; */
}
.grey{
    background-color: grey;
}

#messenger{
    display: flex;
    height: 100%;

    background-color: black;
}
#messages{

    position: relative;
    top: -1%;
    bottom: 0;
    left: 0;
    right: ;
    flex-grow: 2;
    height: 90%;

    overflow-y: hidden;
    overflow-x: hidden;
}

#userInput{
    position: fixed;
    bottom: 22vh;
    width: 350px;

    border-radius: 5px;
    border: solid 1px #3b8070;
}

#toggleMessenger{
    position: fixed;
    bottom: 5vw;
    right: 10vw;
}

</style>


<style lang="css">

div{
    margin: 5px;
}

</style>
