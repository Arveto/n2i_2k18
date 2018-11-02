<template>

<div class="cd-background-wrapper">
   <figure class="cd-floating-background">
      <img src="~/static/home-bg.png" id="heroBg" alt="image-1">
      <img src="~/static/home-logo.png" alt="image-2">
      <img src="~/static/home-alberto.png" alt="image-3">
   </figure>
</div>

</template>



<style>

.cd-background-wrapper {
    background-color: #001426;
    position: relative;
    overflow: hidden;
    -webkit-perspective: 4000px;
    perspective: 4000px;
}

.cd-floating-background {
    position: relative;
    top: 0;
    left: 0;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
}
.cd-floating-background.is-absolute {
    position: absolute;
}
.cd-floating-background img {
    display: block;
    width: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    /* fixes a Firefox bug - images not correctly rendered*/
    background-color: rgba(255, 255, 255, 0.01);
}
.cd-floating-background img:not(:first-child) {
    position: absolute;
    top: 0;
    left: 0;
}
.cd-floating-background img:first-child {
    -webkit-transform: translateZ(50px);
    -ms-transform: translateZ(50px);
    transform: translateZ(50px);
}
.cd-floating-background img:nth-child(2) {
    -webkit-transform: translateZ(290px);
    -ms-transform: translateZ(290px);
    transform: translateZ(290px);
}
.cd-floating-background img:nth-child(3) {
    -webkit-transform: translateZ(400px);
    -ms-transform: translateZ(400px);
    transform: translateZ(400px);
}
.no-preserve-3d .cd-floating-background {

    position: relative;
}

</style>



<script>

export default {
    head () {
        return {
            script: [
                { src: 'https://code.jquery.com/jquery-3.3.1.min.js' }
            ]
        }
    },

    mounted () {
        jQuery(document).ready(function($){

            var	halfWindowH = $(window).height()*0.5,
            halfWindowW = $(window).width()*0.5,

            maxRotationY = 5,
            maxRotationX = 3,
            aspectRatio;

            //Detect <img> load
            $('.cd-floating-background').find('img').eq(0).on('load', function() {
                aspectRatio = $(this).width()/$(this).height();
                if( $('html').hasClass('preserve-3d') ) initBackground();
            }).each(function() {
                //check if image was previously load - if yes, trigger load event
                if(this.complete) $(this).trigger('load');
            });


            //detect mouse movement
            $('.cd-background-wrapper').each(function(){
                $(this).on('mousemove', function(event){
                    var wrapperOffsetTop = $(this).offset().top;
                    if( $('html').hasClass('preserve-3d') ) {
                        window.requestAnimationFrame(function(){
                            moveBackground(event, wrapperOffsetTop);
                        });
                    }
                });
            });

            //on resize - adjust .cd-background-wrapper and .cd-floating-background dimentions and position
            $(window).on('resize', function(){
                if( $('html').hasClass('preserve-3d') ) {
                    window.requestAnimationFrame(function(){
                        halfWindowH = $(window).height()*0.5,
                        halfWindowW = $(window).width()*0.5;
                        initBackground();
                    });
                } else {
                    $('.cd-background-wrapper').attr('style', '');
                    $('.cd-floating-background').attr('style', '').removeClass('is-absolute');
                }
            });

            function initBackground() {
                var wrapperHeight = Math.ceil(halfWindowW*2/aspectRatio),
                proportions = ( maxRotationY > maxRotationX ) ? 1.1/(Math.sin(Math.PI / 2 - maxRotationY*Math.PI/180)) : 1.1/(Math.sin(Math.PI / 2 - maxRotationX*Math.PI/180)),
                newImageWidth = Math.ceil(halfWindowW*2*proportions),
                newImageHeight = Math.ceil(newImageWidth/aspectRatio),
                newLeft = halfWindowW - newImageWidth/2,
                newTop = (wrapperHeight - newImageHeight)/2;

                //set an height for the .cd-background-wrapper
                $('.cd-background-wrapper').css({
                    'height' : wrapperHeight,
                });
                //set dimentions and position of the .cd-background-wrapper
                $('.cd-floating-background').addClass('is-absolute').css({
                    'left' : newLeft,
                    'top' : newTop,
                    'width' : newImageWidth,
                });
            }

            function moveBackground(event, topOffset) {
                var rotateY = ((-event.pageX+halfWindowW)/halfWindowW)*maxRotationY,
                yPosition = event.pageY - topOffset,
                rotateX = ((yPosition-halfWindowH)/halfWindowH)*maxRotationX;

                if( rotateY > maxRotationY) rotateY = maxRotationY;
                if( rotateY < -maxRotationY ) rotateY = -maxRotationY;
                if( rotateX > maxRotationX) rotateX = maxRotationX;
                if( rotateX < -maxRotationX ) rotateX = -maxRotationX;

                $('.cd-floating-background').css({
                    '-moz-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
                    '-webkit-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
                    '-ms-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
                    '-o-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
                    'transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
                });
            }
        });

        /* 	Detect "transform-style: preserve-3d" support, or update csstransforms3d for IE10 ? #762
        https://github.com/Modernizr/Modernizr/issues/762 */
        (function getPerspective(){

            var element = document.createElement('p'),
            html = document.getElementsByTagName('html')[0],
            body = document.getElementsByTagName('body')[0],
            propertys = {
                'webkitTransformStyle':'-webkit-transform-style',
                'MozTransformStyle':'-moz-transform-style',
                'msTransformStyle':'-ms-transform-style',
                'transformStyle':'transform-style'
            };

            body.insertBefore(element, null);

            for (var i in propertys) {
                if (element.style[i] !== undefined) {
                    element.style[i] = "preserve-3d";
                }
            }

            var st = window.getComputedStyle(element, null),
            transform = st.getPropertyValue("-webkit-transform-style") ||
            st.getPropertyValue("-moz-transform-style") ||
            st.getPropertyValue("-ms-transform-style") ||
            st.getPropertyValue("transform-style");

            if(transform!=='preserve-3d'){
                html.className += ' no-preserve-3d';
            } else {
                html.className += ' preserve-3d';
            }
            document.body.removeChild(element);

        })();
    }

}

</script>
