<template>

  <div>
    <div style="margin-top:30px;">
      <el-date-picker v-model="valueTime" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="left">
      </el-date-picker>
      <el-select v-model="deviceType" placeholder="请选择" @change="onChange">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" @click="onQueryInfo" style="margin-left:20px;">确定</el-button>
    </div>
    <div class="rank_con" style="margin-top:30px;display: flex;justify-content: space-around">
      <div style='width:800px;height:800px;' id="myEchart"></div>
      <div class="rank">
        <el-table border :data="tableData" style="width: 100%">
          <el-table-column label="省市">
            <template slot-scope="scope">
              <div>{{scope.row.indexActive}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{scope.row.region}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="incNum" label="新增设备"> </el-table-column>
          <el-table-column prop="num" label="累计设备数">

          </el-table-column>
          <el-table-column label="累计占比">
            <template slot-scope="scope">
              <div>{{((scope.row.percent)*100).toFixed(2)}}%</div>

            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { app_usage_region_dist, device_typerom_all } from "../../api/api";
import echarts from "echarts";
import "../../../node_modules/echarts/map/js/china.js"; // 引入中国地图数据
export default {
  name: "echarts",
  props: ["userJson"],
  data() {
    return {
      valueTime: "",
      chart: null,
      tableData: [],
      echartsX: [],
      echartsY: [],
      deviceType: "-1",
      options: [
        {
          value: "",
          label: "全部类型",
        },
        {
          value: "1",
          label: "RK3328",
        },
        {
          value: "2",
          label: "AMS805",
        },
      ],
    };
  },
  mounted() {
    this.queryInfo();
    this.queryTypeInfo();
    // this.chinaConfigure();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    //查询西柚机所有版本
    queryTypeInfo() {
      this.options = [];
      let param = {};
      this.options=[]
      device_typerom_all(param)
        .then(res => {
          let tempArr = res.data;
          let obj1={
             value:"-1",
            label:"全部类型"
          }
          this.options.push(obj1)
          for (var i = 0; i < tempArr.length; i++) {
            let obj = {};
            if (tempArr[i].type == 0) {
              (obj.value = tempArr[i].type), (obj.label = "测试设备1");
            } else if (tempArr[i].type == 1) {
              (obj.value = tempArr[i].type), (obj.label = "RK3328");
            } else if (tempArr[i].type == 2) {
              (obj.value = tempArr[i].type), (obj.label = "AMS805");
            }
            this.options.push(obj);
          }
      
          console.log(this.options)
        })
        .catch(error => {});
    },
    //确定查询
    onQueryInfo() {
      this.queryInfo();
    },
    //查询数据
    queryInfo() {
      let startTime = 1531924885;
      let endTime = 1596012943;
      if (this.valueTime) {
        if (this.valueTime == "") {
          startTime = new Date().getTime() / 1000;
          endTime = (new Date().getTime() - 60 * 60 * 24 * 7 * 1000) / 1000;
        } else {
          endTime = Math.floor(this.valueTime[1].getTime() / 1000);
          startTime = Math.floor(this.valueTime[0].getTime() / 1000);
        }
      } else {
        startTime = 1589385600;
        endTime = 1589472000;
      }
      // let endTime = new Date().getTime() / 1000;
      // let startTime = (new Date().getTime() - 60 * 60 * 24 * 30 * 1000) / 1000;
      // let param = {
      //   start_ts: parseInt(startTime),
      //   end_ts: parseInt(endTime),
      // };
      let paramActive = {};
      // paramActive.dayList = [];
      paramActive.start_ts = startTime;
      (paramActive.end_ts = endTime), (paramActive.type = this.deviceType);
      app_usage_region_dist(paramActive)
        .then(res => {
          // console.log(res);
          if (res.status == 0) {
            let tempArr = res.data;
        //             tempArr.forEach((element) => {
        // element.percent=(element.percent*100).toFixed(2)
        //     });
       
            this.echartsX = [];
            for (var i = 0; i < tempArr.length; i++) {
              let obj = {
                value: tempArr[i].num,
                name: tempArr[i].region.replace("省", ""),
              };
              // tempArr[i].indexActive = i + 1;
              this.echartsX.push(obj);
            }

            this.tableData = tempArr;
            this.chinaConfigure(this.echartsX);
          } else {
            this.$message({
              message: "服务出错",
              type: "error",
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    chinaConfigure(a) {
      console.log(a);
      let myChart = echarts.init(document.getElementById("myEchart")); //这里是为了获得容器所在位置
      window.onresize = myChart.resize;
      myChart.setOption({
        // 进行相关配置
        title: {
          text: "区域分布",
        },
        tooltip: {
          // 鼠标移到图里面的浮动提示框
          // formatter详细配置： https://echarts.baidu.com/option.html#tooltip.formatter
          //         formatter(params, ticket, callback) {
          //             // params.data 就是series配置项中的data数据遍历
          //             let localValue,
          //                 perf,
          //                 downloadSpeep,
          //                 usability,
          //                 point
          //             if (params.data) {
          //                 localValue = params.data.value
          //                 perf = params.data.perf
          //                 downloadSpeep = params.data.downloadSpeep
          //                 usability = params.data.usability
          //                 point = params.data.point
          //             } else { // 为了防止没有定义数据的时候报错写的
          //                 localValue = 0
          //                 perf = 0
          //                 downloadSpeep = 0
          //                 usability = 0
          //                 point = 0
          //             }
          //             let htmlStr = `
          //   <div style='font-size:18px;'> ${params.name}</div>
          //   <p style='text-align:left;margin-top:-10px;'>
          //     区域对应数据value：${localValue}<br/>
          //     性能perf：${perf}<br/>
          //     下载速度downloadSpeep：${downloadSpeep}<br/>
          //     可用性usability：${usability}<br/>
          //     监测点数point：${point}<br/>
          //   </p>
          // `
          //             return htmlStr
          //         }
          // backgroundColor:"#ff7f50",//提示标签背景颜色
          // textStyle:{color:"#fff"} //提示标签字体颜色
        },
        // visualMap的详细配置解析：https://echarts.baidu.com/option.html#visualMap
        visualMap: {
          // 左下角的颜色区域
          min: 0,
          max: 1000,
          inRange: {
            color: ["#c3e2f4", "#0b50b9"],
          },
          text: ["High", "Low"], // 文本，默认为数值文本
          calculable: true,
        },
        // geo配置详解： https://echarts.baidu.com/option.html#geo
        geo: {
          // 地理坐标系组件用于地图的绘制
          map: "china", // 表示中国地图
          // roam: true, // 是否开启鼠标缩放和平移漫游
          zoom: 1.2, // 当前视角的缩放比例（地图的放大比例）
          label: {
            show: true,
          },
          itemStyle: {
            // 地图区域的多边形 图形样式。
            borderColor: "rgba(0, 0, 0, 0.2)",
            emphasis: {
              // 高亮状态下的多边形和标签样式
              emphasis: {
                label: {
                  show: true,
                },
              },
            },
          },
        },
        series: [
          {
            name: "", // 浮动框的标题（上面的formatter自定义了提示框数据，所以这里可不写）
            type: "map",
            geoIndex: 0,
            label: {
              show: true,
            },
            data: a,
          },
        ],
      });
    },
  },
};
</script>

<style lang="less" scoped>
.rank_con {
  display: flex;
  justify-content: space-between;

  .rank {
    width: 400px;
    height: 400px;
  }
}
</style>
