<template>
 <div id="echarts">
   <div id="myChart"></div>
   <div id="myChart2"></div>
 </div>
</template>
<script type="text/javascript">
export default {
  name: 'Echarts',
  data () {
    return {}
  },
  methods: {
    echartsInit () {
      // 找到容器
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 开始渲染
      myChart.setOption({
        title: {text: '在Vue中使用echarts'},
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      })
    },
    echartsInit2 () {
      let myChart = this.$echarts.init(document.getElementById('myChart2'))
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
        color: ['#003366', '#006699', '#4cabce', '#e5323e'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['A', 'B', 'C', 'D']
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
                data: ['2012', '2013', '2014', '2015', '2016']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'A',
                type: 'bar',
                barGap: 0,
                label: labelOption,
                data: [320, 332, 301, 334, 390]
            },
            {
                name: 'B',
                type: 'bar',
                label: labelOption,
                data: [220, 182, 191, 234, 290]
            },
            {
                name: 'C',
                type: 'bar',
                label: labelOption,
                data: [150, 232, 201, 154, 190]
            },
            {
                name: 'D',
                type: 'bar',
                label: labelOption,
                data: [98, 77, 101, 99, 40]
            }
        ]
      })
    }
  },
  mounted () {
    this.echartsInit()
    this.echartsInit2()
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
  #myChart2{
    width: 90vw;
    height: 50vh;
    margin-left: auto;
    margin-right: auto;    
  }
</style>
