<template lang="html">

  <div>

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

var data   = {
    email: '',
    password: ''   //Crypted
};


export default {

    head () {
      return {
        script: [
          { src: 'https://cdnjs.cloudflare.com/ajax/libs/jsSHA/2.3.1/sha_dev.js' }
        ]
      }
    },

    data () {
        return data;
    },

    props: ['socket'],


    created(){
            //Events listeners
        this.socket.on('signInSuccess', (userData) => {
            //Do your stuff
            this.$emit('signIn', userData);
        });

        this.socket.on('signInFailure', () => {
            //Do your stuff
            console.log("Log in failed");
        });
    },

    methods: {
        submit: function(){
            if(this.email != '' && this.password != ''){

                let shaObj = new jsSHA("SHA-512", "TEXT");
                shaObj.update(this.password);
                var hash = shaObj.getHash("HEX");

                let user = {
                    email : this.email,
                    password : hash
                }
                this.socket.emit('signIn', user);
            }
            else{
                //Error management
                console.log("Ah!")
            }

        }
    }
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
