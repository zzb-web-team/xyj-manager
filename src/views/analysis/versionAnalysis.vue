<template>
  <section class="myself-container">
    <div class="device_form">
      <div id="myEchart" style="width: 600px; height: 300px;"></div>
      <div id="myEchart1" style="width: 600px; height: 300px;"></div>
    </div>
    <div class="devide_table">
      <el-row type="flex" class="row_active">
          <el-col :span="24">
              <tableBarActive2 id="rebateSetTable" ref="table1" tooltip-effect="dark" :tableData="tableData" :clomnSelection="clomnSelection" :rowHeader="rowHeader" :tableOption="tableOption" @handleButton="handleButton" :operatingStatus="operatingStatus" @toOperating="toOperating" @handleSelectionChange="handleSelectionChange" @selectCheckBox="selectCheckBox" @selectAll="selectAll"></tableBarActive2>
          </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
import echarts from "echarts";
import tableBarActive2 from "../../components/tableBarActive2";
export default {
    data() {
        return {
            rowHeader: [{
                  prop: "time",
                  label: "版本"
              },
              {
                  prop: "totals",
                  label: "升级用户"
              },
              {
                  prop: "online_devices",
                  label: "新用户数"
              },
              {
                  prop: "average_online",
                  label: "升级+新用户数"
              },
              {
                  prop: "average_online",
                  label: "启动次数"
              },
              {
                  prop: "average_online",
                  label: "启动用户(分布)"
              }
            ],
            tableData: [{
              time: "测试数据1",
              totals: "测试数据1",
              online_devices: "测试数据1",
              average_online: "测试数据1",
            },{
              time: "测试数据1",
              totals: "测试数据1",
              online_devices: "测试数据1",
              average_online: "测试数据1",
            }]
        };
    },
    mounted () {
      this.configure()
    },
    beforeDestroy() {
      if (!this.chart) {
        return;
      }
      this.chart.dispose();
      this.chart = null;
    },
    methods: {
       configure() {
          let myChart = echarts.init(document.getElementById('myEchart')); //这里是为了获得容器所在位置    
          let myChart1 = echarts.init(document.getElementById('myEchart1'));
          window.onresize = myChart.resize;
          window.onresize = myChart1.resize;
          let options = {
            title : {
                text: '版本分布图',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['1.1.1版本','1.1.2版本','1.1.3版本']
            },
            series : [
                {
                    name: '版本分布图',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value:335, name:'1.1.1版本'},
                        {value:310, name:'1.1.2版本'},
                        {value:234, name:'1.1.3版本'},
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
          }
          let options1 = {
              title: {
                  text: '版本在线分布图',
                  x: 'center',
              },
              tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                      type: 'shadow'
                  }
              },
              legend: {
                  data: ['在线', '离线'],
                  top: 24
              },
              grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true
              },
              xAxis: {
                  type: 'value',
                  boundaryGap: [0, 0.01]
              },
              yAxis: {
                  type: 'category',
                  data: ['1.1.1版本','1.1.2版本','1.1.3版本']
              },
              series: [
                  {
                      name: '在线',
                      type: 'bar',
                      data: [18203, 23489, 29034]
                  },
                  {
                      name: '离线',
                      type: 'bar',
                      data: [19325, 23438, 31000]
                  }
              ]
          };

          myChart.setOption(options);
          myChart1.setOption(options1);
       },

    },
    components: {
      tableBarActive2
    }
};
</script>

<style lang="less">
.myself-container {
    width: 100%;
    min-width: 1600px;
    .device_form {
        width: 100%;
        height: auto;
        display: flex;
        overflow: hidden;
        margin-top: 20px;
        background: #f2f2f2;
        padding: 15px 30px;
        box-sizing: border-box;
        .bottom {
          margin-top: 20px;
        }
        .el-form-item__label {
            white-space: nowrap;
        }

        .el-form-item {
            margin-bottom: 0px;
            margin-left: 10px;
        }

        .row_activess {
            margin-top: 20px;
            display: flex;
            justify-content: flex-start;
        }

        .div_show {
            width: auto;
            display: flex;
            height: 40px;
            justify-content: center;
            align-items: center;
            color: #409eff;
            cursor: pointer;
            margin-left: 20px;
        }
    }

    .devide_table {
        width: 100%;
        height: auto;
        overflow: hidden;
        margin-top: 20px;

        .el-table td,
        .el-table th {
            padding: 6px 0px;
        }

        .row_active {
            margin-top: 10px;
        }
    }

    .devide_pageNation {
        width: 100%;
        height: auto;
        overflow: hidden;
        margin-top: 20px;

        .devide_pageNation_active {
            float: right;
        }
    }
}
.addaccout{
    .el-form--label-left .el-form-item__label {
    text-align: right;
    width: 90px;
}
.el-form-item__error{
    margin-left: 80px;
}
}
</style>
