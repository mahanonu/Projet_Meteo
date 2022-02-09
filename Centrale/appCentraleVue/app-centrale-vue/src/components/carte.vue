<template>
 <l-map
   :center="center"
   :zoom="zoom"
   class="map"
   ref="map"
   @update:zoom="zoomUpdated"
   @update:center="centerUpdated"
 >
   <l-tile-layer
     :url="url"
   >
   </l-tile-layer>
   <MarkerSonde
    v-for="marker in markers"
    :key="marker.id"
    :marker="marker"
    >
    </MarkerSonde>
   </l-map>
</template>

<script>
import { LMap, LTileLayer } from 'vue2-leaflet';
import MarkerSonde from './marker'
import 'leaflet/dist/leaflet.css';

export default {
 components: {
   LMap,
   LTileLayer,
   MarkerSonde
 },
 data () {
   return {
     url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
     center: [ 49.1193089, 6.1757156 ],
     zoom: 12,
     markers:[]
   }
 },
created(){
    fetch('http://piensg028:8080/data/GPSPosition')
    .then(result => {
        return(result.json());
    })
    .then(data => {
        //TODO attention l'api va changer il faudra modifier
        console.log(data['gpsposition']['value'][0]['lon']);
        let mark = {id: 1, imageUrl: require('@/assets/logo_raspberrypi.png'), coordinates: [ data['gpsposition']['value'][0]['lat'], data['gpsposition']['value'][0]['lon'] ]};
        console.log(mark);
        this.markers.push(mark);
    })
 },
 methods: {
   zoomUpdated (zoom) {
     this.zoom = zoom;
     console.log(this.markers)
   },
   centerUpdated (center) {
     this.center = center;
   }
 }
}
</script>

<style>
 .map {
   width: 100%;
   height: 100%;
 }
</style>