<template>
  <l-map
    :center="center"
    :zoom="zoom"
    class="map"
    ref="map"
    @update:zoom="zoomUpdated"
    @update:center="centerUpdated"
  >
    <l-tile-layer :url="url"> </l-tile-layer>
    <MarkerSonde v-for="marker in markers" :key="marker.id" :marker="marker">
    </MarkerSonde>
  </l-map>
</template>

<script>
import { LMap, LTileLayer } from "vue2-leaflet";
import MarkerSonde from "./marker";
import "leaflet/dist/leaflet.css";

export default {
  components: {
    LMap,
    LTileLayer,
    MarkerSonde,
  },
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      center: [49.1193089, 6.1757156],
      zoom: 2,
      markers: [],
    };
  },
  created() {
    let sonde = ["031", "028"];
    let urls = [];
    for (let index = 0; index < sonde.length; index++) {
      urls.push(`http://piensg${sonde[index]}:8080/data/GPSPosition`);
    }

    Promise.all(urls.map((u) => fetch(u)))
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then((datas) => {
        let id = 1;
        datas.forEach(data => {
          console.log(data);
        //TODO attention l'api va changer il faudra modifier
        console.log(data["gpsposition"]["value"][0]["lon"]);
        let mark = {
          id: id,
          imageUrl: require("@/assets/img/logo_raspberrypi.png"),
          coordinates: [
            parseFloat(data["gpsposition"]["value"][0]["lat"]),
            parseFloat(data["gpsposition"]["value"][0]["lon"]),
          ],
        };
        this.markers.push(mark);
        id+=1;
        });
        
      })


  },
  methods: {
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
    },
  },
};
</script>

<style>
.map {
  width: 100%;
  height: 100%;
}
</style>