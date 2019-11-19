<template>
  <section class="myself-container">
    <div class="user-title">
      <el-date-picker
        v-model="value2"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="left">
      </el-date-picker>
      <el-row style="margin-top:20px;">
        <el-col :span="5">
            <div class="user-item">
                <div class="item-count">1000</div>
                <div class="item-text">注册用户</div>
            </div>
        </el-col>
        <el-col :span="5" style="margin-left:30px;">
            <div class="user-item">
                <div class="item-count">1000</div>
                <div class="item-text">绑定用户</div>
            </div>
        </el-col>
        <el-col :span="5" style="margin-left:30px;">
            <div class="user-item">
                <div class="item-count">10.00h</div>
                <div class="item-text">新用户</div>
            </div>
        </el-col>
        <el-col :span="5" style="margin-left:30px;">
            <div class="user-item">
                <div class="item-count">10%</div>
                <div class="item-text">新用户占比</div>
            </div>
        </el-col>
      </el-row>
    </div>
    <div class="device_form">
      <div id="myEchart" style="width: 600px; height: 300px;"></div>
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
            pickerOptions: {
              shortcuts: [{
                text: '昨天',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
                  picker.$emit('pick', [start, end]);
                }
              }, {
                text: '今天',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit('pick', [start, end]);
                }
              }, {
                text: '最近一周',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit('pick', [start, end]);
                }
              }, {
                text: '最近一个月',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                  picker.$emit('pick', [start, end]);
                }
              }]
            },
            value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
            value2: '',
            rowHeader: [{
                  prop: "time",
                  label: "日期"
              },
              {
                  prop: "totals",
                  label: "注册用户"
              },
              {
                  prop: "online_devices",
                  label: "新用户数"
              },
              {
                  prop: "average_online",
                  label: "老用户数"
              },
              {
                prop: "new_percent",
                label: "新用户占比"
              }
            ],
            tableData: [{
              time: "测试数据1",
              totals: "测试数据1",
              online_devices: "测试数据1",
              average_online: "测试数据1",
              new_percent: "测试数据1"
            }],
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
          window.onresize = myChart.resize;
          let options = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line'
            }]
          }
          myChart.setOption(options);
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
    width: 81px;
}
.el-form-item__error{
    margin-left: 80px;
}
}
</style>
