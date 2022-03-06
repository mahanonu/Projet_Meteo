<template>
  <div class="row">
      <div class="col-12">
        <card type="chart" style="height:230%" >
          <template slot="header">
            <div class="row">
              <div class="col-sm-6" :class="isRTL ? 'text-right' : 'text-left'">
                <h5 class="card-category">{{$t('dashboard.data')}}</h5>
                <h2 class="card-title">{{activeData}}</h2>
                <base-dropdown menu-on-right=""
                                tag="div"
                                title-classes="btn btn-link btn-icon"
                                aria-label="Settings menu"
                                :class="{'float-left': isRTL}">
                    <i slot="title" class="tim-icons icon-settings-gear-63"></i>
                    <div v-for="index in dataPossible" :key="index.text">
                        <a class="dropdown-item" @click="changeData" href="#dashboardSondes">{{index.text}}</a>
                    </div>
                </base-dropdown>
              </div>
             
              <div class="col-sm-6">
                <div class="btn-group btn-group-toggle"
                     :class="isRTL ? 'float-left' : 'float-right'"
                     data-toggle="buttons">
                  <label v-for="(option, index) in bigLineChartCategories"
                         :key="option"
                         class="btn btn-sm btn-primary btn-simple"
                         :class="{active: bigLineChart.activeIndex === index}"
                         :id="index">
                    <input type="radio"
                           @click="initBigChart(index)"
                           name="options" autocomplete="off"
                           :checked="bigLineChart.activeIndex === index">
                    {{option}}
                  </label>
                </div>
              </div>
            </div>
          </template>
          <div class="chart-area">
            <line-chart style="height: 100%"
                        ref="bigChart"
                        chart-id="big-line-chart"
                        :chart-data="bigLineChart.chartData"
                        :gradient-colors="bigLineChart.gradientColors"
                        :gradient-stops="bigLineChart.gradientStops"
                        :extra-options="bigLineChart.extraOptions">
            </line-chart>
          </div>
        </card>
      </div>
    </div>
</template>

<script>
  import LineChart from '@/components/Charts/LineChart';
  import BarChart from '@/components/Charts/BarChart';
  import * as chartConfigs from '@/components/Charts/config';
  import TaskList from './Dashboard/TaskList';
  import UserTable from './Dashboard/UserTable';
  import config from '@/config';

  export default {
    components: {
      LineChart,
      BarChart,
      TaskList,
      UserTable
    },
    data() {
      return {
        sonde : ["028", "027","030","031","032"],
        activeSonde : ["028","031","032"],
        dataPossible : [{text:'Temperature'},
            {text:'Hygrometry'},
            {text:'Pressure'},
            {text:'Rainfall'},
            {text:'Brightness'},
            {text:'Windvelocity max'},
            {text:'Windvelocity min'},
            {text:'Windvelocity avg'}
        ],
        activeData : 'Temperature',
        windMode :"min",
        bigLineChart: {
          allData: [],
          activeIndex: 0,
          chartData: {
            datasets: [{ }],
            labels: [],
          },
          extraOptions: chartConfigs.purpleChartOptions,
          gradientColors: config.colors.primaryGradient,
          gradientStops: [1, 0.4, 0],
          categories: []
        },
        greenLineChart: {
          extraOptions: chartConfigs.greenChartOptions,
          chartData: {
            labels: [],
            datasets: [{
              label: "My First dataset",
              fill: true,
              borderColor: config.colors.danger,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.danger,
              pointBorderColor: 'rgba(255,255,255,0)',
              pointHoverBackgroundColor: config.colors.danger,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [],
            }]
          },
          gradientColors: ['rgba(66,134,121,0.15)', 'rgba(66,134,121,0.0)', 'rgba(66,134,121,0)'],
          gradientStops: [1, 0.4, 0],
        },
      }
    },
    computed: {
      enableRTL() {
        return this.$route.query.enableRTL;
      },
      isRTL() {
        return this.$rtl.isRTL;
      },
      bigLineChartCategories() {
        return this.$t('dashboard.chartCategories');
      }
    },
    methods: {
      changeData(event){
        let data = event.originalTarget.innerText.split(' ');
        this.activeData = data[0];
        if (data.length == 2) {
            this.windMode = data[1];
        }
        console.log(this.activeData);
        this.initBigChart(this.activeIndex);
      },
      initBigChart(index) {
          console.log(index);
        let date = new Date();
        if (index == 0){
            date.setDate(date.getDate() - 1);
            date = date.toISOString();
        }
        else if (index == 1){
            date.setDate(date.getDate() - 7);
            date = date.toISOString();
        }
        else {
            date.setMonth(date.getMonth() - 1);
            date = date.toISOString();
        }
        
        let urls = [];
        for (let i = 0; i < this.activeSonde.length; i++) {
            urls.push(`http://piensg${this.activeSonde[i]}:8080/data/${this.activeData.toLowerCase()}/${date}`);
        }
        console.log(urls);

        Promise.all(urls.map((u) => fetch(u)))
        .then((responses) => Promise.all(responses.map((res) => res.json())))
        .then((datas) => {
            let chartData = {
                datasets: [],
                labels: [],
                };
                let count = 0;
            datas.forEach(data => {
                let dataValue = [];
                if (this.activeData == 'Windvelocity') {
                    data[this.activeData.toLowerCase()].value.forEach(element => 
                    {dataValue.push(element[this.windMode])});
                    console.log(dataValue);
                }
                else{
                    dataValue = data[this.activeData.toLowerCase()].value
                }
                let randomR = Math.random()*255;
                let randomV = Math.random()*255;
                let randomB = Math.random()*255;
                chartData.datasets.push({
                    label: this.activeSonde[count],
                    fill: true,
                    borderColor: `rgba(${randomR},${randomV},${randomB},1)`,
                    borderWidth: 2,
                    borderDash: [],
                    borderDashOffset: 0.0,
                    pointBackgroundColor: `rgba(${randomR},${randomV},${randomB},1)`,
                    pointBorderColor: 'rgba(255,255,255,0)',
                    pointHoverBackgroundColor: config.colors.primary,
                    pointBorderWidth: 20,
                    pointHoverRadius: 4,
                    pointHoverBorderWidth: 15,
                    pointRadius: 4,
                    data: dataValue
                });
                chartData.labels = data[this.activeData.toLowerCase()].date;
                console.log(chartData.datasets[0].data);
                this.$refs.bigChart.updateGradients(chartData);
                this.bigLineChart.chartData = chartData;
                count+=1;
            })
            
        })
        this.bigLineChart.activeIndex = index;
      },
    },
    mounted() {
      this.i18n = this.$i18n;
      if (this.enableRTL) {
        this.i18n.locale = 'ar';
        this.$rtl.enableRTL();
      }
      this.initBigChart(0);
    },
    beforeDestroy() {
      if (this.$rtl.isRTL) {
        this.i18n.locale = 'en';
        this.$rtl.disableRTL();
      }
    },
  };
</script>

<style></style>
