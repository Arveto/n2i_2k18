<template lang="html">

    <div class="hero-body">

        <div class="container has-text-centered">

            <h1 class="title is-1">Edition de compte</h1>

            <!-- User presentation -->
            <div id="userPresentation">
                <figure class="avatar image is-96x96" id="avatarAccount">
                    <img class="is-rounded" :src="'https://api.adorable.io/avatars/285/'+userData.email+'.png'">
                </figure>

                <div id="names">
                    <h1 class="title is-1" id="fullName">{{userData.fiName}} {{userData.faName}}</h1>
                    <h3 class="title is-3" id="pseudo">{{userData.pseudo}}</h3>
                </div>
            </div>


            <!-- Form -->
            <form>

            <div class="columns">

                <!-- Column 1 -->
                <div class="column is-5">

                    <!-- First Name -->
                    <div class="field">
                        <div class="control">
                            <label class="label">Prénom</label>
                            <div class="formItem">
                                <input class="input" v-model="fiName" :placeholder="userData.fiName">
                                <a class="button is-primary submitButton" @click="submit('fiName')">Edit</a>
                            </div>
                        </div>
                    </div>

                        <!-- Family name -->
                        <div class="field">
                            <div class="control">
                                <label class="label">Nom</label>
                                <div class="formItem">
                                    <input class="input" v-model="faName" :placeholder="userData.faName">
                                    <a class="button is-primary submitButton" @click="submit('faName')">Edit</a>
                                </div>
                            </div>
                        </div>

                        <!-- Pseudo -->
                        <div class="field">
                            <div class="control">
                                <label class="label">Pseudo</label>
                                <div class="formItem">
                                    <input class="input" v-model="pseudo" :placeholder="userData.pseudo">
                                    <a class="button is-primary submitButton" @click="submit('pseudo')">Edit</a>
                                </div>
                            </div>
                        </div>

                </div>


                <!-- Column 2 -->
                <div class="column is-5">

                    <!-- E-mail -->
                    <div class="field">
                        <div class="control">
                            <label class="label">E-mail</label>
                            <div class="formItem">
                                <input class="input" v-model="email" :placeholder="userData.email">
                                <a class="button is-primary submitButton" @click="submit('email')">Edit</a>
                            </div>
                        </div>
                    </div>

                    <!-- Password 1 -->
                    <div class="field">
                        <div class="control">
                            <label class="label">Mot de passe</label>
                            <div class="formItem">
                                <input class="input" v-model="password1" placeholder="New password" type="password">
                            </div>
                        </div>
                    </div>

                    <!-- Password 2 -->
                    <div class="field">
                        <div class="control">
                            <label class="label">Mot de passe (confirmation)</label>
                            <div class="formItem">
                                <input class="input" v-model="password2" placeholder="New password (confirm)" type="password">
                                <a class="button is-primary submitButton" @click="submit('password')">Edit</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            </form>

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

    head () {
      return {
        script: [
          { src: 'https://cdnjs.cloudflare.com/ajax/libs/jsSHA/2.3.1/sha.js' }
        ]
      }
    },

    data () {
        return data;
    },

    methods: {
        submit(category){

            switch(category){
                case 'fiName':
                    console.log(this.fiName);
                    if(this.fiName != '')
                        this.socket.emit('fiNameEdit', {fiName: this.fiName, email: this.userData.email});
                    break;

                case 'faName':
                    console.log(this.faName);
                    if(this.faName != '')
                        this.socket.emit('faNameEdit', {faName: this.faName, email: this.userData.email});
                    break;

                case 'email':
                    let emailRegex =  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

                    if(this.email != '' && emailRegex.test(this.email))
                        this.socket.emit('emailEdit', {newEmail: this.email, email: this.userData.email});

                    break;

                case 'pseudo':
                    if(this.pseudo != '')
                        this.socket.emit('pseudoEdit', {pseudo: this.pseudo, email: this.userData.email});
                    break;

                case 'password':
                    if(this.password1 != '' && this.password1 == this.password2){
                        let shaObj = new jsSHA("SHA-512", "TEXT");
                        shaObj.update(this.password1);
                        let hash = shaObj.getHash("HEX");
                        this.socket.emit('passwordEdit', {password: hash, email: this.userData.email});
                    }
                    break;

                default: break;
            }
        }
    },
    props :['socket', 'userData']

}

</script>


<style>

#userPresentation {
    display: flex;
    align-items: center;
    margin-bottom: 50px;
}

#avatarAccount{
    margin-right: 15px;
    width: 120px;
}

#names {
    text-align: left;
}

#fullName {
    margin-bottom: 0px;
}

#pseudo {
    color: #a0a0a0;
}

.formItem {
    display: flex;
    flex-direction: row;
}

.submitButton {
    margin-left: 5px;
    margin-right: 10px;
}

</style>
