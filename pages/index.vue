<template>
    <section class="container">
        <div>
            <logo/>
            <h1 class="title">
                n2i-template
            </h1>
            <h2 class="subtitle">
                A website template for the Nuit de l'Info hackathon
            </h2>
            <div class="links">
                <a
                href="https://nuxtjs.org/"
                target="_blank"
                class="button--green">Documentation</a>
                <a
                href="https://github.com/nuxt/nuxt.js"
                target="_blank"
                class="button--grey">GitHub</a>
            </div>
        </div>
    </section>
</template>


<script>
    import Logo from '~/components/Logo.vue'
    import io from 'socket.io-client'

    let socket = io.connect('localhost:3000');


    export default {
        components: {
            Logo
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
