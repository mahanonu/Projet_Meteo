<template>
  <div class="small">
    <line-chart :chart-data="datacollection"></line-chart>
  </div>
</template>

<script>
  import LineChart from './LineChart.js'

  export default {
    components: {
      LineChart
    },
    data () {
      return {
        datacollection: null
      }
    },
    mounted () {
      this.fillData()
    },
    methods: {
      fillData () {
        fetch('http://piensg028:8080/data/Temperature/2022-02-09T15:20:00.000Z')
        .then(result => {
            return(result.json());
        })
        .then(data => {
            this.datacollection = {
                labels: data['temperature']['date'],
                datasets: [
                    {
                    label: 'Data One',
                    backgroundColor: '#f87979',
                    data: data['temperature']['value']
                    }
                ]
                }
        })
        
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      }
    }
  }
</script>

<style>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>



    