<template>

        <div>
            <Header @switchView="switchView"/>
            <Home v-if="view == 'Home'"/>
            <Signup v-if="view == 'Signup'" v-bind:socket="socket" @signUp="signUp"/>
            <Login v-if="view == 'Login'"  v-bind:socket="socket" @signIn="signIn"/>
        </div>

</template>



<script>

import io from 'socket.io-client'
let socket = io.connect('localhost:3000');

import Home from '@/components/Home'
import Header from '@/components/Header'
import Login from '@/components/Login'
import Signup from '@/components/Signup'


var data = {
    view : 'Home',
    socket : socket,
    loggedIn : false,
    userData : {
        fiName: '',
        faName: '',
        pseudo: '',
        email: ''
    }
};


export default {
    components: {
        Home, Header, Login, Signup
    },

    data () {
        return data;

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

            console.log("Logged In =)");
            console.log(this.userData);
        },

        signUp : function(userData){
            this.loggedIn = true;
            this.userData = userData;
            this.view = 'Home';

            console.log("Welcome");
            console.log(this.userData);
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

</style>
