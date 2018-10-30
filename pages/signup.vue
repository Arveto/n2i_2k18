<template lang="html">
  <div>
    <!-- <link rel="stylesheet" href="https://unpkg.com/bulmaswatch/darkly/bulmaswatch.min.css"> -->
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-4 is-offset-4">
                    <h3 class="title has-text-grey">Sign up</h3>
                    <p class="subtitle has-text-grey">Join the army!</p>
                    <div class="box">
                        <figure class="avatar image is-96x96">
                            <img class="is-rounded" src="https://api.adorable.io/avatars/285/test.png">
                        </figure><br>
                        <form>

                            <div class="field">
                                <div class="control has-icons-left">
                                    <label class="label">Prénom</label>
                                    <input class="input" v-model="fiName" placeholder="John">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-user-circle"></i>
                                    </span>
                                </div>
                            </div>

                            <div class="field">
                                <div class="control has-icons-left">
                                    <label class="label">Nom</label>
                                    <input class="input" v-model="faName" placeholder="Doe">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-user-circle"></i>
                                    </span>
                                </div>
                            </div>

                            <div class="field">
                                <div class="control has-icons-left">
                                    <label class="label">Pseudo (optionnel)</label>
                                    <input class="input" v-model="pseudo" placeholder="xXx_DarkSasuke78_xXx" autofocus="">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-user-astronaut"></i>
                                    </span>
                                </div>
                            </div>

                            <div class="field">
                                <div class="control has-icons-left">
                                    <label class="label">E-mail</label>
                                    <input class="input" v-model="email" placeholder="john.doe@arveto.io" autofocus="">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-at"></i>
                                    </span>
                                </div>
                            </div>

                            <div class="field">
                                <div class="control has-icons-left">
                                    <label class="label">Password</label>
                                    <input class="input" v-model="password1" type="password" placeholder="12345678">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-key"></i>
                                    </span>
                                </div>
                            </div>

                            <div class="field">
                                <div class="control has-icons-left">
                                    <label class="label">Password (confirm)</label>
                                    <input class="input" v-model="password2" type="password" placeholder="12345678">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-key"></i>
                                    </span>
                                </div>
                            </div>


                        </form>

                        <button v-on:click="submit" id="submitButton" class="button is-block is-link is-large is-fullwidth">Create account</button>

                    </div>
                    <p class="has-text-grey">
                        <a href="../"> Sign In </a>
                        <a href="../"> Need Help? </a>
                    </p>
                </div>
            </div>
        </div>
  </div>
</template>


<script>
var data   = {
    fiName: '',
    faName: '',
    pseudo: '',
    email: '',
    password1: '',
    password2: '',
    password: ''   //Crypted version
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

            if(this.fiName != '' && this.faName != ''
            && this.pseudo != '' && this.email != ''
            && this.password1 == this.password2 && this.password1 != ''){
                console.log('Emitting');
                let user = {
                    faName : this.faName,
                    fiName : this.fiName,
                    pseudo : this.pseudo,
                    email : this.email,
                    password : this.password1,  //TODO Encryption
                }
                socket.emit('signUp', user);
            }
            else{
                //Error management
            }

        }
    }
}




import io from 'socket.io-client'
let socket = io.connect('localhost:3000');

socket.on('signUpSuccess', () => {
    //Do your stuff (automatic log in?)
});

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
