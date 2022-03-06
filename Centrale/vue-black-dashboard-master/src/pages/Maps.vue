<template>
    <card type="plain" title="Sonds' Position">
      <div class="map-container">
        <carte/>
      </div>
      
    </card>
</template>

<script>
import carte from './../components/Perso/carte.vue'

export default {
  name: 'Maps',
  components: {
    carte
  }
}
</script>

<style>
.map-container {
  height: 500px;
  width: 600px;
}
</style>
