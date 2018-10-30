<template lang="html">
  <div>
    <!-- <link rel="stylesheet" href="https://unpkg.com/bulmaswatch/darkly/bulmaswatch.min.css"> -->
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-4 is-offset-4">
                    <h3 class="title has-text-grey">Login</h3>
                    <p class="subtitle has-text-grey">Please login to proceed.</p>
                    <div class="box">
                        <figure class="avatar image is-96x96">
                            <img class="is-rounded" src="https://api.adorable.io/avatars/285/test.png">
                        </figure><br>
                        <form>
                            <div class="field">
                                <div class="control">
                                    <input v-model="email" class="input is-large" type="email" placeholder="Your Email" autofocus="">
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <input v-model="password" class="input is-large" type="password" placeholder="Your Password">
                                </div>
                            </div>

                        </form>

                        <button v-on:click="submit" class="button is-block is-link is-large is-fullwidth" id="submitButton">Login</button>

                    </div>
                    <p class="has-text-grey">
                        <a href="../">Sign Up</a> &nbsp;·&nbsp;
                        <a href="../">Forgot Password</a> &nbsp;·&nbsp;
                        <a href="../">Need Help?</a>
                    </p>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
.avatar{
    margin-left: auto;
    margin-right: auto;
}

#submitButton{
    margin-top: 25px;
}
</style>


<script>
var data   = {
    fiName: '',
    faName: '',
    pseudo: '',
    email: '',
    password: ''   //Crypted
};


export default {

    // head () {
    //   return {
    //     script: [
    //       { src: 'https://cdnjs.cloudflare.com/ajax/libs/jsSHA/2.3.1/sha_dev.js' }  //WARNING Not working?
    //     ]
    //   }
    // },

    data () {
        return data;
    },

    methods: {
        submit: function(){
            if(this.email != '' && this.password != ''){

                let user = {
                    email : this.email,
                    password : this.password  //TODO Encryption
                }
                socket.emit('signIn', user);
            }
            else{
                //Error management
            }

        }
    }
}




import io from 'socket.io-client'
let socket = io.connect('localhost:3000');

socket.on('signInSuccess', (user) => {
    //Do your stuff
    console.log("Log in succesfull");
});

</script>
