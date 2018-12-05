<template lang="html">
  <!-- <canvas id="errorCanvas" width="300" height="300"></canvas> -->
  <center id="ErrorCanvas">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/4.8.2/pixi.js" charset="utf-8"></script>


    <img src="@/static/alberto1.png" v-show="false">
    <img src="@/static/alberto2.png" v-show="false">
    <img src="@/static/alberto3.png" v-show="false">
    <img src="@/static/alberto4.png" v-show="false">
    <img src="@/static/alberto5.png" v-show="false">
    <img src="@/static/alberto6.png" v-show="false">
    <img src="@/static/alberto7.png" v-show="false">
    <img src="@/static/alberto8.png" v-show="false">
    <img src="@/static/alberto9.png" v-show="false">
    <img src="@/static/alberto-shiny.png" v-show="false">

    <h1><b> {{message.toUpperCase() }} </b></h1>
  </center>
</template>

<script>
export default {
  name: "CanvasError",
  props: {
    message: String
  },

  mounted() {
    var app = new PIXI.Application();
    document.getElementById('ErrorCanvas').appendChild(app.view);

    // create two render textures... these dynamic textures will be used to draw the scene into itself
    var renderTexture = PIXI.RenderTexture.create(
        app.screen.width,
        app.screen.height
    );
    var renderTexture2 = PIXI.RenderTexture.create(
        app.screen.width,
        app.screen.height
    );
    var currentTexture = renderTexture;

    // create a new sprite that uses the render texture we created above
    var outputSprite = new PIXI.Sprite(currentTexture);

    // align the sprite
    outputSprite.x = 400;
    outputSprite.y = 300;
    outputSprite.anchor.set(0.5);

    // add to stage
    app.stage.addChild(outputSprite);

    var stuffContainer = new PIXI.Container();

    stuffContainer.x = 400;
    stuffContainer.y = 300;

    app.stage.addChild(stuffContainer);

    // create an array of image ids..
    var fruits = [
      '_nuxt/static/alberto1.png',
      '_nuxt/static/alberto2.png',
      '_nuxt/static/alberto3.png',
      '_nuxt/static/alberto4.png',
      '_nuxt/static/alberto5.png',
      '_nuxt/static/alberto6.png',
      '_nuxt/static/alberto7.png',
      '_nuxt/static/alberto8.png',
      '_nuxt/static/alberto9.png',
    ];

    // create an array of items
    var items = [];

    // now create some items and randomly position them in the stuff container
    for (var i = 0; i < 20; i++) {
        var item = PIXI.Sprite.fromImage(fruits[i % fruits.length]);
        item.x = Math.random() * 400 - 200;
        item.y = Math.random() * 400 - 200;
        item.anchor.set(0.5);
        stuffContainer.addChild(item);
        items.push(item);
    }

    // used for spinning!
    var count = 0;

    app.ticker.add(function() {
        for (var i = 0; i < items.length; i++) {
            // rotate each item
            var item = items[i];
            item.rotation += 0.1;
        }

        count += 0.01;

        // swap the buffers ...
        var temp = renderTexture;
        renderTexture = renderTexture2;
        renderTexture2 = temp;

        // set the new texture
        outputSprite.texture = renderTexture;

        // twist this up!
        stuffContainer.rotation -= 0.01;
        outputSprite.scale.set(1 + Math.sin(count) * 0.2);

        // render the stage to the texture
        // the 'true' clears the texture before the content is rendered
        app.renderer.render(app.stage, renderTexture2, false);
    });



        //Get the texture for rope.
    var trailTexture = PIXI.Texture.fromImage('_nuxt/static/alberto-shiny.png')
    var historyX = [];
    var historyY = [];
    //historySize determines how long the trail will be.
    var historySize = 20;
    //ropeSize determines how smooth the trail will be.
    var ropeSize = 100;
    var points = [];

    //Create history array.
    for( var i = 0; i < historySize; i++)
    {
    	historyX.push(0);
    	historyY.push(0);
    }
    //Create rope points.
    for(var i = 0; i < ropeSize; i++)
    {
    	points.push(new PIXI.Point(0,0));
    }

    //Create the rope
    var rope = new PIXI.mesh.Rope(trailTexture, points);

    //Set the blendmode
    rope.blendmode = PIXI.BLEND_MODES.ADD;

    app.stage.addChild(rope);

    // Listen for animate update
    app.ticker.add(function(delta) {
    	//Read mouse points, this could be done also in mousemove/touchmove update. For simplicity it is done here for now.
    	//When implemeting this properly, make sure to implement touchmove as interaction plugins mouse might not update on certain devices.
    	var mouseposition = app.renderer.plugins.interaction.mouse.global;

    	//Update the mouse values to history
    	historyX.pop();
    	historyX.unshift(mouseposition.x);
    	historyY.pop();
    	historyY.unshift(mouseposition.y);
    	//Update the points to correspond with history.
    	for( var i = 0; i < ropeSize; i++)
    	{
    		var p = points[i];

    		//Smooth the curve with cubic interpolation to prevent sharp edges.
    		var ix = cubicInterpolation( historyX, i / ropeSize * historySize);
    		var iy = cubicInterpolation( historyY, i / ropeSize * historySize);

    		p.x = ix;
    		p.y = iy;

    	}
    });

    /**
     * Cubic interpolation based on https://github.com/osuushi/Smooth.js
     * @param	k
     * @return
     */
    function clipInput(k, arr)
    {
    	if (k < 0)
    		k = 0;
    	if (k > arr.length - 1)
    		k = arr.length - 1;
    	return arr[k];
    }

    function getTangent(k, factor, array)
    {
    	return factor * (clipInput(k + 1, array) - clipInput(k - 1,array)) / 2;
    }

    function cubicInterpolation(array, t, tangentFactor)
    {
    	if (tangentFactor == null) tangentFactor = 1;

    	var k = Math.floor(t);
    	var m = [getTangent(k, tangentFactor, array), getTangent(k + 1, tangentFactor, array)];
    	var p = [clipInput(k,array), clipInput(k+1,array)];
    	t -= k;
    	var t2 = t * t;
    	var t3 = t * t2;
    	return (2 * t3 - 3 * t2 + 1) * p[0] + (t3 - 2 * t2 + t) * m[0] + ( -2 * t3 + 3 * t2) * p[1] + (t3 - t2) * m[1];
    }

  }
}
</script>

<style lang="css" scoped>
  h1{
    text-transform: capitalize;
    height: 50%;
    width: 50%;
    position: absolute;
     top: 25%;
     left: 25%;
    font-size: 5em;
  }
</style>
