<template>
  <div>
    <canvas id="chart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'

export default {
  name: 'graph'
}
</script>


<script>

export default {
 components: {
 },
 data () {
   return {
   }
 },
 created(){
    fetch('http://piensg028:8080/data/Temperature')
    .then(result => {
        return(result.json());
    })
    .then(data => {
        //TODO attention l'api va changer il faudra modifier
        console.log(data['temperature']['value'][0]);
        let temperature = data['temperature']['value'][0];
        console.log(temperature);
    })
 },
 methods: {
 }
}


</script>