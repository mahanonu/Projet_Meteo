<template>
  <div>
    <div class="row">
      <base-dropdown menu-on-left=""
                           tag="div"
                           title-classes="btn btn-link btn-icon"
                           aria-label="Settings menu"
                           >
              <i slot="title" class="tim-icons icon-settings-gear-63"></i>
              <a class="dropdown-item" @click="changeSonde" href="#sonde">{{$t('Sonde028')}}</a>
              <a class="dropdown-item" @click="changeSonde" href="#sonde">{{$t('Sonde031')}}</a>
              <a class="dropdown-item" @click="changeSonde" href="#sonde">{{$t('Sonde032')}}</a>  
            </base-dropdown>
      <h2>Sonde {{ sonde }}</h2>
      <base-dropdown menu-on-left=""
                           tag="div"
                           title-classes="btn btn-link btn-icon"
                           aria-label="Settings menu"
                           >
              <i slot="title" class="tim-icons icon-settings-gear-63"></i>
              <a class="dropdown-item" @click="changeDate" href="#sonde">{{$t('week')}}</a>
              <a class="dropdown-item" @click="changeDate" href="#sonde">{{$t('month')}}</a>
              <a class="dropdown-item" @click="changeDate" href="#sonde">{{$t('year')}}</a>  
            </base-dropdown>
      <div class="col-12">
        <card :title="table1.title">
          <div class="table-responsive">
            <base-table :data="table1.data"
                        :columns="table1.columns"
                        thead-classes="text-primary">
            </base-table>
          </div>
        </card>
      </div>
    </div>
    <div class="row">
      <base-dropdown menu-on-left=""
                           tag="div"
                           title-classes="btn btn-link btn-icon"
                           aria-label="Settings menu"
                           >
              <i slot="title" class="tim-icons icon-settings-gear-63"></i>
              <a class="dropdown-item" @click="changeChart" href="#sonde">{{$t('temperature')}}</a>
              <a class="dropdown-item" @click="changeChart" href="#sonde">{{$t('pressure')}}</a>
              <a class="dropdown-item" @click="changeChart" href="#sonde">{{$t('hygrometry')}}</a>
              <a class="dropdown-item" @click="changeChart" href="#sonde">{{$t('brightness')}}</a>
              <a class="dropdown-item" @click="changeChart" href="#sonde">{{$t('rainfall')}}</a>
              <a class="dropdown-item" @click="changeChart" href="#sonde">{{$t('windvelocity')}}</a>
            </base-dropdown>
      <h2>{{ chart }}</h2>
      <div class="col-12">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">{{ chart }}</h5>
            
          </template>
          <div class="chart-area">
            <line-chart style="height: 100%"
                        chart-id="purple-line-chart"
                        ref="meteoChar"
                        :chart-data="meteoChar.chartData"
                        :gradient-colors="meteoChar.gradientColors"
                        :gradient-stops="meteoChar.gradientStops"
                        :extra-options="meteoChar.extraOptions">
            </line-chart>
          </div>
        </card>
      </div>
    </div>
    <div class="row">
      <base-dropdown menu-on-left=""
                           tag="div"
                           title-classes="btn btn-link btn-icon"
                           aria-label="Settings menu"
                           >
              <i slot="title" class="tim-icons icon-settings-gear-63"></i>
              <a class="dropdown-item" @click="changeWind" href="#sonde">{{$t('max wind velocity')}}</a>
              <a class="dropdown-item" @click="changeWind" href="#sonde">{{$t('min wind velocity')}}</a>
              <a class="dropdown-item" @click="changeWind" href="#sonde">{{$t('avg wind velocity')}}</a>
            </base-dropdown>
      <h2>{{ wind }}</h2>
      <div class="col-12">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">{{$t('wind velocity')}}</h5>
          </template>
          <div class="chart-area">
            <line-chart style="height: 100%"
                        chart-id="purple-line-chart"
                        ref="windChar"
                        :chart-data="windChar.chartData"
                        :gradient-colors="windChar.gradientColors"
                        :gradient-stops="windChar.gradientStops"
                        :extra-options="windChar.extraOptions">
            </line-chart>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import { BaseTable } from "@/components";
import LineChart from '@/components/Charts/LineChart';
import BarChart from '@/components/Charts/BarChart';
import * as chartConfigs from '@/components/Charts/config';
import TaskList from './Dashboard/TaskList';
import UserTable from './Dashboard/UserTable';
import config from '@/config';

const tableColumns = ["Data","Time","Value"];


export default {
  components: {
    BaseTable,
    LineChart
  },
  data() {
    return {
      table1: {
        title: "Latest Data",
        columns: [...tableColumns],
        data: null
      },
      sonde: "028",
      chart: "temperature",
      wind: "max wind velocity",
      date: 7,
      meteoChar: {
          extraOptions: chartConfigs.purpleChartOptions,
          chartData: {
            labels: [],
            datasets: [{
              label: "Data",
              fill: true,
              borderColor: config.colors.primary,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.primary,
              pointBorderColor: 'rgba(255,255,255,0)',
              pointHoverBackgroundColor: config.colors.primary,
              pointBorderWidth: 2,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 0.4,
              data: [],
            }]
          },
          gradientColors: config.colors.primaryGradient,
          gradientStops: [1, 0.2, 0],
        },
      windChar: {
          extraOptions: chartConfigs.purpleChartOptions,
          chartData: {
            labels: [],
            datasets: [{
              label: "Data",
              fill: true,
              borderColor: config.colors.primary,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.primary,
              pointBorderColor: 'rgba(255,255,255,0)',
              pointHoverBackgroundColor: config.colors.primary,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 0.4,
              data: [],
            }]
          },
          gradientColors: config.colors.primaryGradient,
          gradientStops: [1, 0.2, 0],
        }
        
    };
  },
  mounted () {
      this.fillData()
      this.fillChart()
      this.fillWind()
      this.$root.$on('bv::dropdown::show', bvEvent => {
        console.log('Dropdown is about to be shown', bvEvent)
      }) 
    },
  methods: {
      changeDate(event){
        if(event.originalTarget.innerHTML=='week'){
          this.date = 7;
        }else if(event.originalTarget.innerHTML=='month'){
          this.date = 30;
        }else{
          this.date = 365;
        }
        this.fillChart();
        this.fillWind();
      },
      changeSonde(event){
        this.sonde = event.originalTarget.innerHTML.split('Sonde')[1];
        this.fillData();
        this.fillChart();
        this.fillWind();
      },
      changeChart(event){
        this.chart = event.originalTarget.innerHTML;
        this.fillChart();
      },
      changeWind(event){
        this.wind = event.originalTarget.innerHTML;
        this.fillWind();
      },
      fillData () {
        fetch(`http://piensg${this.sonde}:8080/data/temperature,pressure,rainfall,hygrometry,brightness,winddirection,windvelocity,gpsposition`)
        .then(result => {
            return(result.json());
        })
        .then(data => {
            this.table1.data = [
                { 
                    data: "temperature",
                    time: data['temperature']['date'][0],
                    value: data['temperature']['value'][0]
                },
                {
                    data: "pressure",
                    time: data['pressure']['date'][0],
                    value: data['pressure']['value'][0]
                },
                {
                    data: "rainfall",
                    time: data['rainfall']['date'][0],
                    value: data['rainfall']['value'][0]
                },
                {
                    data: "hygrometry",
                    time: data['hygrometry']['date'][0],
                    value: data['hygrometry']['value'][0]
                },
                {
                    data: "brightness",
                    time: data['brightness']['date'][0],
                    value: data['brightness']['value'][0]
                },
                {
                    data: "wind direction",
                    time: data['winddirection']['date'][0],
                    value: data['winddirection']['value'][0]
                },
                {
                    data: "minimum wind speed",
                    time: data['windvelocity']['date'][0],
                    value: data['windvelocity']['value'][0]['min']
                },
                {
                    data: "average wind speed",
                    time: data['windvelocity']['date'][0],
                    value: data['windvelocity']['value'][0]['avg']
                },
                {
                    data: "maximum wind speed",
                    time: data['windvelocity']['date'][0],
                    value: data['windvelocity']['value'][0]['max']
                },
                {
                    data: "gps long",
                    time: data['gpsposition']['date'][0],
                    value: data['gpsposition']['value'][0]['lon']
                },
                {
                    data: "gps lat",
                    time: data['gpsposition']['date'][0],
                    value: data['gpsposition']['value'][0]['lat']
                },
            ]
            
        })
        
      },
      fillChart () {
        fetch(`http://piensg${this.sonde}:8080/data/${this.chart}/${new Date(Date.now()-86400000*this.date).toISOString()}`)
        .then(result => {
            return(result.json());
        })
        .then(data => { 

          let values = [];
          let dates = [];
          let i=0;
          if (this.chart=='rainfall'){
            data[this.chart]['value'].forEach(element => {
              values.push(i++);
          });
          }else{
            data[this.chart]['value'].forEach(element => {
              values.push(element);
          });
          }
          data[this.chart]['date'].forEach(element => {
              dates.push(element);
          });          
          let chartData = {
            labels: dates,
            datasets: [{
              label: "Data",
              fill: true,
              borderColor: config.colors.primary,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.primary,
              pointBorderColor: 'rgba(255,255,255,0)',
              pointHoverBackgroundColor: config.colors.primary,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: values,
            }]
          };
          this.$refs.meteoChar.updateGradients(chartData);
          this.meteoChar.chartData = chartData;
        })
      },
      fillWind () {
        fetch(`http://piensg${this.sonde}:8080/data/windvelocity/${new Date(Date.now()-86400000*this.date).toISOString()}`)
        .then(result => {
            return(result.json());
        })
        .then(data => { 

          let values = [];
          let dates = [];
          let i=0;

          data['windvelocity']['value'].forEach(element => {
              values.push(element[this.wind.split(' ')[0]]);
          });
          
          data['windvelocity']['date'].forEach(element => {
              dates.push(element);
          });          
          console.log(data);
          let chartData = {
            labels: dates,
            datasets: [{
              label: "Data",
              fill: true,
              borderColor: config.colors.primary,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.primary,
              pointBorderColor: 'rgba(255,255,255,0)',
              pointHoverBackgroundColor: config.colors.primary,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: values,
            }]
          };
          this.$refs.windChar.updateGradients(chartData);
          this.windChar.chartData = chartData;
        })
      } 
  }
};
</script>
<style>
</style>
