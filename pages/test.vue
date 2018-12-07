<template>

        <div>
          <Header v-bind:loggedIn="loggedIn" v-bind:userData="userData" @switchView="switchView" @logOff="logOff"/>
          <Signup v-show="view == 'Signup'" v-bind:socket="socket" @signUp="signUp"/>
          <Login v-show="view == 'Login'"  v-bind:socket="socket" @signIn="signIn"/>
          <Account v-show="view == 'Account'"  v-bind:socket="socket" v-bind:userData="userData"/>
          <Articles v-show="view == 'Articles'" v-bind:socket="socket" v-bind:articles="articles" @switchView="switchView"/>
          <Writer v-show="view == 'Writer'" v-bind:socket="socket" v-bind:userData="userData"/>
          <Reader v-show="view == 'Reader'" v-bind:article="article"/>
          <!-- <Messenger v-show="view == 'Messenger'"/> -->
          <div class="GoogleMaps">
            <GoogleMaps/>
          </div>

          <Messenger v-bind:socket="socket"/>

          <div id="root">
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
          </div>

        </div>
</template>



<script>
import io from 'socket.io-client'
let socket = io.connect('localhost:3000');

import Header from '@/components/Header'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import Account from '@/components/Account'
import Articles from '@/components/articles/List'
import Writer from '@/components/articles/Writer'
import Reader from '@/components/articles/Reader'
import Messenger from '@/components/messenger/Messenger'
import GoogleMaps from '@/components/GoogleMaps'

import MessagesView from '@/components/messenger/MessagesView.vue'
import MessengerHeader from '@/components/messenger/MessengerHeader.vue'
import Input from "@/components/messenger/Input.vue"

var data = {
    view : 'Home',
    socket : socket,
    loggedIn : false,
    userData : {
      fiName: '',
      faName: '',
      pseudo: '',
      email: '',
      admin: 0
    },
    articles: [],
    article: {},

    messages: [],
    rooms: [],
    currentRoom: -1,
    currentRoomName : ''
};


export default {
    components: {
      MessagesView, MessengerHeader, Input, Header, Login, Signup, Account, Articles, Writer, Reader, Messenger, GoogleMaps
    },

    data () {
        return data;
    },

    mounted() {
            //Update main user data on account edit
        socket.on('faNameEditSuccess', (data) => {
            this.userData.faName = data.faName;
        });
        socket.on('fiNameEditSuccess', (data) => {
            this.userData.fiName = data.fiName;
        });
        socket.on('pseudoEditSuccess', (data) => {
            this.userData.pseudo = data.pseudo;
        });
        socket.on('emailEditSuccess', (data) => {
            this.userData.email = data.email;
        });
        socket.on('passwordEditSuccess', () => {
            console.log("Password updated !");
        });


            //Request articles
        socket.emit('articlesRequest');

        socket.on('articlesRequest', (data) =>{
            this.articles = data;
        });

        socket.on('viewArticle', (data) =>{
            for(let i=0; i< this.articles.length; i++){
                if(this.articles[i].id == data.id){
                    this.article = this.articles[i];
                    this.article.content = data.content;
                    console.log("Article found, updating");
                    break;
                }
            }
        });

        this.$data.socket.emit('roomsRequest');

        this.$data.socket.on('roomsRequest', (data) => {
            this.rooms = data;
        });


            //Receive messages
        this.$data.socket.on("fetchMessages", (data)=>{   //On room change
            this.messages = data;
        });

        this.$data.socket.on("message", (data)=>{  //On new message
            if(data.userData.email != this.userData.email && data.roomNumber == this.currentRoom){  //WARNING Ugly af
                console.log("Received message");
                let message = data.userData;
                message.content = data.message;
                console.log(message);

                this.messages.push(message);
            }
        });
    },

    methods : {
            //Methods triggered on components events
        switchView : function(component) {
            this.view = component;
        },

        signIn : function(userData){
            this.loggedIn = true;
            this.userData = userData;
            this.view = 'Home';
            console.log(this.userData.admin);

            console.log(this.userData);
        },

        signUp : function(userData){
            this.loggedIn = true;
            this.userData = userData;
            this.view = 'Home';

            console.log(this.userData);
        },

        logOff : function() {
            this.loggedIn = false;

            this.userData = {
                fiName: '',
                faName: '',
                pseudo: '',
                email: ''
            };

            this.view = 'Home';
        },
        sendMessage: function(content) {

            if(this.userData.email != '' && this.currentRoom >= 0){
                //Send message to server
                let data = {roomNumber: this.currentRoom, userData: this.userData, message: content};
                this.$data.socket.emit("message", data);

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



<style scoped>

.container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
}

.subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
}

.links {
    padding-top: 15px;
}



/*************************************/

#root, #messages{
    position: fixed;
    width: 400px;
    height: 60vh;
    left: 5vw;
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
    margin-left: 0;
    bottom: 22vh;
    width: 350px;

    border-radius: 5px;
    border: solid 1px #3b8070;
}


/* .GoogleMaps{
  position: absolute;
  top: calc(50vh - 450px/2);
  left: 0;
  right: 0;

  height: 500px;
} */

</style>
