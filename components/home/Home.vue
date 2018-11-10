<template>

<div>
        <!-- Hero image -->
    <Hero/>

        <!-- Github button -->
    <a class="button is-medium fade-in" id="githubButton" href="https://github.com/Arveto"  target="_blank">
        <span>Visit our</span>
            <span class="icon">
                <i class="fab fa-github"></i>
            </span>
    </a>


    <div class="columns">
        <div class="column">
            <span class="icon is-large">
                <span class="fa-stack">
                    <i class="fas fa-cogs fade-in"></i>
                </span>
            </span>
            <h3 class="title">Adaptable</h3>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur.

        </div>

        <div class="column">
            <span class="icon is-large">
                <span class="fa-stack">
                    <i class="fas fa-heart fade-in"></i>
                </span>
            </span>
            <h3 class="title">User-targeted</h3>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur.

        </div>

        <div class="column">
            <span class="icon is-large">
                <span class="fa-stack">
                    <i class="fas fa-rocket fade-in"></i>
                </span>
            </span>
            <h3 class="title">Future proof</h3>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur.
        </div>

    </div>

</div>

</template>



<script>

import Hero from '@/components/home/Hero'

export default {
    components: {
        Hero
    },

    props: ['view'],

    mounted () {

        let githubButton = document.getElementById('githubButton');
        let heroImagge = document.getElementById('heroBg');


        function placeGithubButton() {
            try{
                let wHeight = window.innerHeight;
                let rect = heroBg.getBoundingClientRect();
                githubButton.style.transform = 'translate(-50%, -'+(rect.bottom-rect.top)*0.3+'px)';
            } catch{}   //Oops
        } ;

        placeGithubButton();
        githubButton.style.opacity = '1';
        window.onresize = placeGithubButton;
    },

}

</script>



<style>

.fade-in {
	opacity: 1;
	animation-name: fadeInOpacity;
	animation-iteration-count: 1;
	animation-timing-function: ease-in;
	animation-duration: 1.5s;
}

@keyframes fadeInOpacity {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}

#githubButton {
    left: 50%;
    transform: translate(-50%, 0%);
    opacity: 0;
}

.column{
    text-align: center;
}

.fas{
    font-size: 60px;
    transform: translate(-25%, 0);
}

</style>
