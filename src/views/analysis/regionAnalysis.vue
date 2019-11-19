<template>
  <div>
    <div style='width:800px;height:800px;' id="myEchart"></div>
  </div>
  
</template>
<script>
  import echarts from "echarts";
  import '../../../node_modules/echarts/map/js/china.js' // 引入中国地图数据
  export default {
    name: "echarts",
    props: ["userJson"],
    data() {
      return {
        chart: null
      };
    },
    mounted() {
      this.chinaConfigure();
    },
    beforeDestroy() {
      if (!this.chart) {
        return;
      }
      this.chart.dispose();
      this.chart = null;
    },
    methods: {
      chinaConfigure() {
        console.log(this.userJson)
        let myChart = echarts.init(document.getElementById('myEchart')); //这里是为了获得容器所在位置    
        window.onresize = myChart.resize;
        myChart.setOption({ // 进行相关配置
          title: {
              text: '区域分布'
          },
          tooltip: { // 鼠标移到图里面的浮动提示框
        // formatter详细配置： https://echarts.baidu.com/option.html#tooltip.formatter
          formatter (params, ticket, callback) { 
            // params.data 就是series配置项中的data数据遍历
            let localValue,
              perf,
              downloadSpeep,
              usability,
              point
            if (params.data) {
              localValue = params.data.value
              perf = params.data.perf
              downloadSpeep = params.data.downloadSpeep
              usability = params.data.usability
              point = params.data.point
            } else { // 为了防止没有定义数据的时候报错写的
              localValue = 0
              perf = 0
              downloadSpeep = 0
              usability = 0
              point = 0
            }
            let htmlStr = `
              <div style='font-size:18px;'> ${params.name}</div>
              <p style='text-align:left;margin-top:-10px;'>
                区域对应数据value：${localValue}<br/>
                性能perf：${perf}<br/>
                下载速度downloadSpeep：${downloadSpeep}<br/>
                可用性usability：${usability}<br/>
                监测点数point：${point}<br/>
              </p>
            `
            return htmlStr
          }
          // backgroundColor:"#ff7f50",//提示标签背景颜色
          // textStyle:{color:"#fff"} //提示标签字体颜色
        }, 
        // visualMap的详细配置解析：https://echarts.baidu.com/option.html#visualMap
        visualMap: { // 左下角的颜色区域
          min: 0,
          max: 1000,
          inRange: {
                color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
          },
          text:['High','Low'],           // 文本，默认为数值文本
          calculable: true
        },
        // geo配置详解： https://echarts.baidu.com/option.html#geo
        geo: { // 地理坐标系组件用于地图的绘制
          map: 'china', // 表示中国地图
          // roam: true, // 是否开启鼠标缩放和平移漫游
          zoom: 1.2, // 当前视角的缩放比例（地图的放大比例）
          label: {
            show: true
          },
          itemStyle: { // 地图区域的多边形 图形样式。
            borderColor: 'rgba(0, 0, 0, 0.2)',
            emphasis: { // 高亮状态下的多边形和标签样式
              emphasis:{label:{show:true}}
            }
          }
        },
        series: [
          {
            name: '', // 浮动框的标题（上面的formatter自定义了提示框数据，所以这里可不写）
            type: 'map',
            geoIndex: 0,
            label: {
              show: true
            },
            // 这是需要配置地图上的某个地区的数据，根据后台的返回的数据进行拼接（下面是我定义的假数据）
            data: [{
              'name': '北京',
              'value': 599,
              'perf': '0.501s', // 性能
              'downloadSpeep': '1.221MB/s', // 下载速度
              'usability': '100%', // 可用性
              'point': '250' // 监测点
            }, {
              'name': '上海',
              'value': 142
            }, {
              'name': '黑龙江',
              'value': 44
            }, {
              'name': '新疆',
              'value': 999,
              'perf': '0.501s', // 性能
              'downloadSpeep': '1.221MB/s', // 下载速度
              'usability': '100%', // 可用性
              'point': '250' // 监测点
            }, {
              'name': '广东',
              'value': 92
            }, {
              'name': '湖北',
              'value': 810
            }, {
              'name': '湖南',
              'value': 453
            },{
              'name': '江西',
              'value': 92
            }, {
              'name': '浙江',
              'value': 810
            }, {
              'name': '福建',
              'value': 453
            },{
              'name': '江苏',
              'value': 92
            }, {
              'name': '山东',
              'value': 810
            }, {
              'name': '天津',
              'value': 453
            },{
              'name': '吉林',
              'value': 92
            }, {
              'name': '辽宁',
              'value': 810
            }, {
              'name': '内蒙古',
              'value': 453
            },{
              'name': '河北',
              'value': 92
            }, {
              'name': '山西',
              'value': 810
            }, {
              'name': '陕西',
              'value': 453
            },{
              'name': '青海',
              'value': 92
            }, {
              'name': '甘肃',
              'value': 810
            }, {
              'name': '西藏',
              'value': 453
            },{
              'name': '宁夏',
              'value': 92
            }, {
              'name': '四川',
              'value': 810
            }, {
              'name': '云南',
              'value': 453
            },{
              'name': '贵州',
              'value': 92
            }, {
              'name': '重庆',
              'value': 810
            }, {
              'name': '广西',
              'value': 453
            },{
              'name': '安徽',
              'value': 92
            }, {
              'name': '河南',
              'value': 810
            }, {
              'name': '海南',
              'value': 453
            },{
              'name': '香港',
              'value': 92
            }, {
              'name': '澳门',
              'value': 810
            }, {
              'name': '台湾',
              'value': 453
            },

            ]
          }
        ]

        })
      }
    }
  }
</script>
<style lang="less" scoped>

</style>