<template>

    <nav class="navbar header" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item" href="https://github.com/Arveto">
                <img src="~/static/header_logo.png" width="112" height="28">
            </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
                <a class="navbar-item" v-on:click="switchView('Home')">
                    Home
                </a>

                <a class="navbar-item">
                    Some stuff
                </a>

                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">
                        More
                    </a>

                    <div class="navbar-dropdown">
                        <a class="navbar-item">
                            Menu 1
                        </a>
                        <a class="navbar-item">
                            Menu 2
                        </a>
                        <a class="navbar-item">
                            Menu 3
                        </a>
                        <hr class="navbar-divider">
                        <a class="navbar-item">
                            Report an issue
                        </a>
                    </div>
                </div>
            </div>

            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <a class="button is-primary"  v-on:click="switchView('Signup')">
                            <strong>Sign up</strong>
                        </a>
                        <a class="button is-light" v-on:click="switchView('Login')">
                            Log in
                        </a>
                    </div>
                </div>
            </div>

        </div>
    </nav>

</template>



<style>

.navbar {
    border-radius: 0px;
    background-color: rgb(31, 36, 36);
    /*background-color: rgb(45, 45, 45);*/
}

</style>



<script>

export default {
    methods: {
        switchView : function (component) {
            this.$emit('switchView', component);
        }
    },

}

</script>
