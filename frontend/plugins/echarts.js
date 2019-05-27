import Vue from 'vue'
// import echarts from 'echarts' // 引入echarts


// include ECharts main module
var echarts = require('echarts/lib/echarts');
// include bar chart
require('echarts/lib/chart/bar');
// include tooltip and title component
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

Vue.prototype.$echarts = echarts // 引入组件（将echarts注册为全局）