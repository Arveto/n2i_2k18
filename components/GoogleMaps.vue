
<template>
<div>
  <h1>Google Maps Demo</h1>

  <gmap-map
    v-bind:center="center"
    v-bind:zoom="5"
    v-bind:map-type-id="mapTypeId">
    <gmap-marker
      v-for="(item, index) in markers"
      v-bind:key="index"
      v-bind:position="item.position"
      v-on:click="center=item.position; toogleChat(item.id)"/>
  </gmap-map>
</div>
</template>

<script>
export default {
	name: 'GoogleMaps',
	data() {
    return {
      center: { lat: 48.816727, lng: 2.103558 },
      mapTypeId: "terrain",
      markers: [
        { position: { lat: 45.591247, lng: 2.092097 }, id: 1 },
        { position: { lat: 66.005217, lng: 98.328390 }, id: 1 },
        { position: { lat: 70.645643, lng: -45.738227 }, id: 1 },
        { position: { lat: -24.643866, lng: 81.433974 }, id: 1 },
        { position: { lat: 23.274443, lng: 18.146691 }, id: 1 }
      ],
    };
  },
  methods:{
  }
};
</script>

<style lang="css" scoped>
.vue-map-container {
  height: 80vh;
  max-width: 100%;
  width: 100%;
}
</style>
