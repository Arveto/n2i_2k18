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
                    <i class="fas fa-bolt fade-in"></i>
                </span>
            </span>
            <h3 class="title">Improvise</h3>
            N'importe quel baroudeur vous le dira: la vie d'aventurier n'est pas toujours facile.
            Heureusement pour vous, Arveto Softwares a dédié sa Nuit de l'Info 2018 a créer une application
            qui rendra vos excursions bien plus sûres. Découvrez <i>A Gentleman's Guide to Wildlife Survival</i>,
            déjà recommandé par les plus grands explorateurs du globe.

        </div>

        <div class="column">
            <span class="icon is-large">
                <span class="fa-stack">
                    <i class="fas fa-campground fade-in"></i>
                </span>
            </span>
            <h3 class="title" id="mabite">Adapt</h3>
            En compagnie d'Alberto, le premier poulpe a avoir effectué le tour du monde
            en solitaire (!), vous trouverez dans ce site votre meilleur ami lorsque les
            vivres viennent à manquer, que les itempéries s'abattent sur vous, et que le moral
            est au plus bas. Grâce à ses fonctionnalités révolutionnaires dans le monde de la
            survie, vous aurez accès à une toute nouvelle manière de repousser les frontières
            de l'inconnu.
        </div>

        <div class="column">
            <span class="icon is-large">
                <span class="fa-stack">
                    <i class="fas fa-utensils fade-in"></i>
                </span>
            </span>
            <h3 class="title">Overcome</h3>
            Adoptez <i>A Gentleman's Guide to Wildlife Survival</i>, et plus aucun sommet ne vous résistera, plus aucune
            forêt reculée ne vous sera inaccessible, plus aucun désert ne sera infranchissable. Utilisée et approuvé par les
            plus grands aventuriers des temps modernes, tels que Bear Grylls et Mike Horn, cette plate-forme promet de révolutionner
            l'exploration.
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

#mabite{
    margin-bottom: 24px;
}

</style>
