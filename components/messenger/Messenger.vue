<template>

    <div id="MESSENGER">

        <div v-if="isOpen" id="root">
            <div class="box" id="messenger">
                <div id="messages">

                    <div id="header">
                        <MessengerHeader v-bind:rooms="rooms" v-bind:currentRoomName="currentRoomName" v-bind:socket="socket" @joinRoom="joinRoom"/>
                    </div>

                    <MessagesView v-bind:messages="messages" v-bind:userData="userData"/>

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

export default {
    name: 'Messenger',
    components: {
        MessagesView,
        MessengerHeader,
        Input
    },

    props: ['socket', 'userData'],

    data: function() {
        return {
            isOpen: false,
            messages: [],
            rooms: [],
            currentRoom: -1,
            currentRoomName : ''
        }

    },

    mounted: function (){
            //Request rooms
        this.socket.emit('roomsRequest');

        this.socket.on('roomsRequest', (data) => {
            this.rooms = data;
        });


            //Receive messages
        this.socket.on("fetchMessages", (data)=>{   //On room change
            this.messages = data;
        });

        this.socket.on("message", (data)=>{  //On new message
            if(data.userData.email != this.userData.email && data.roomNumber == this.currentRoom){  //WARNING Ugly af
                console.log("Received message");
                let message = data.userData;
                message.content = data.message;
                console.log(message);

                this.messages.push(message);
            }
        });
    },

    methods: {
        toggleMessenger: function() {
            this.$data.isOpen = !this.$data.isOpen;
        },
        sendMessage: function(content) {

            if(this.userData.email != '' && this.currentRoom >= 0){
                //Send message to server
                let data = {roomNumber: this.currentRoom, userData: this.userData, message: content};
                this.socket.emit("message", data);

                //Add message to front
                let message = this.userData;
                message.content = content;
                message.id = -1;
                this.messages.push(message);

                console.log(data);
            }
        },
        joinRoom: function(content){
            console.log("Joining room")
            this.messages = [];
            this.currentRoom = content;

            for(let i=0; i<this.rooms.length; i++){
                if(this.rooms[i].id == content){
                    this.currentRoomName = this.rooms[i].name;
                    break;
                }

            }
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
