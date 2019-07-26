<template>
 <div id="echarts">    
   <div class="text-center mx-4">
    Huevos recogidos por galpon en los ultimos 5 dias
   </div>
   <div id="chart"></div>
 </div>
</template>
<script type="text/javascript">

const campainQuery = require('../graphql/campaings.gql')
export default {
  name: 'Echarts',
  data () {
    return {
      data: null
    }
  },
  methods: {
    getColors() {
      const colors = ['#003366', '#006699', '#4cabce', '#e5323e']
      return colors.slice(0,this.campaings.length)
    },
    getLegends() {
      return this.campaings.map(campaing => campaing.barn.name)
    },
    getXaxis() {
      const dates = []
      const today = new Date()
      today.setDate(today.getDate()-4)
      for(var i=0; i<5; i++){
        dates.push(`${today.getDate()}/${today.getMonth()}`)
        today.setDate(today.getDate()+1)
      }      
      return dates
    },
    getSeries(label, type, barGap) {
      const series = this.campaings.map( campaing => {
        const today = new Date()
        today.setDate(today.getDate()-5)
        const last5 = campaing.allCollected.splice(-5)        
        while(last5.length < 5){
          last5.unshift({date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`, quantity: 0})
        }        
        
        const data = last5.map(collect => {
          today.setDate(today.getDate()+1)
          const date = collect.date.split('-')
          const year = parseInt(date[0])
          const month = parseInt(date[1])
          const day = parseInt(date[2])          
          if(today.getFullYear() === year && today.getMonth() + 1 === month && today.getDate() === day) {
            return collect.quantity
          }
          return 0
        })
        return {
          name: campaing.barn.name,
          data,
          type,
          barGap,
          label
        }
      })      
      return series
    },

    initChart () {
      let myChart = this.$echarts.init(document.getElementById('chart'))
      var labelOption = {
        normal: {
          show: true,
          position: 'insideBottom',
          distance: 15,
          align: 'left',
          verticalAlign: 'middle',
          rotate: '90',
          formatter: '{c}  {name|{a}}',
          fontSize: 16,
          rich: {
              name: {
                  textBorderColor: '#fff'
              }
            }
          }
        };
      myChart.setOption({        
        color: this.getColors(),
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: this.getLegends()
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                axisTick: {show: false},
                data: this.getXaxis()
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: this.getSeries(labelOption, 'bar', 0 )
      })
    }
  },
  mounted () {
    const variables = {
      withAllCollected: true
    }
    this.$apollo.query({query: campainQuery, variables}).then(data => {         
      this.loading = false
      this.campaings = data.data.campaings
      this.initChart()
    })
  }
}
</script>
<style scoped >
  #myChart{
    width: 90vw;
    height: 50vh;
    margin-left: auto;
    margin-right: auto;
  }
  #chart{
    width: 90vw;
    height: 50vh;
    margin-left: auto;
    margin-right: auto;    
  }
</style>
