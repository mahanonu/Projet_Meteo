<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div class="map-container">
      <carte/>
    </div>
  </div>
</template>

<script>
import carte from './components/carte.vue'

export default {
  name: 'App',
  components: {
    carte
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.map-container {
  height: 500px;
  width: 600px;
}
</style>
