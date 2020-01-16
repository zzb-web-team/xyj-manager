<template>
<section class="myself-container">
    <div class="user-title" style="margin-bottom:20px;">
        <el-button-group>
            <el-button v-show="!shoudzyx" @click="today()">今天</el-button>
            <el-button v-show="!shoudzyx" @click="yesterday()">昨天</el-button>
            <el-button v-show="!shoudzyx" @click="sevendat()">近7天</el-button>
            <el-button v-show="!shoudzyx" @click="thirtyday()">近30天</el-button>
            <el-button @click="showzdyx">自定义<i class="el-icon-date"></i></el-button>
        </el-button-group>
        <el-date-picker v-show="shoudzyx" style="margin-left:10px;" v-model="val2" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="left" @change="gettimes"></el-date-picker>
        <!-- <el-date-picker style="margin-left:10px;" v-model="valueTime4" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="left"></el-date-picker> -->
        <el-button type="primary" style="margin-left:20px;" @click="onsumbit()">确定</el-button>

    </div>
    <div class="devive_tab">
      <div class="switch_tab">
      
            <el-radio-group v-model="radio1" @change="onchangeTab">
      <el-radio-button label="在线"></el-radio-button>
      <el-radio-button label="离线"></el-radio-button>
     
    </el-radio-group>
        
      </div>
        <div class="device_tab_on"  v-if="showType">
            <div class="user-title">
                <el-row style="margin-top:20px;">
                    <el-col :span="12">
                        <div class="user-item">
                            <div class="item-count">{{onlinePer}}%</div>
                            <div class="item-text">设备在线率</div>
                        </div>
                    </el-col>
                    <el-col :span="12" style="">
                        <div class="user-item">
                            <div class="item-count">{{avgOnlineTimeInSec}}s</div>
                            <div class="item-text">设备平均在线时长</div>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="device_form">
                <div id="myEchart" style="width: 100%; height: 300px;margin-top:20px;"></div>
            </div>
            <div class="devide_table">
                <el-row type="flex" class="row_active">
                    <el-col :span="24">
                        <tableBarActive2 id="rebateSetTable" ref="table1" tooltip-effect="dark" :tableData="tableData" :clomnSelection="clomnSelection" :rowHeader="rowHeader" :tableOption="tableOption" @handleButton="handleButton" :operatingStatus="operatingStatus" @toOperating="toOperating" @handleSelectionChange="handleSelectionChange" @selectCheckBox="selectCheckBox" @selectAll="selectAll"></tableBarActive2>
                    </el-col>
                </el-row>
                <el-row type="flex" style="   display: flex;justify-content: flex-end;margin-top:10px;">
                    <el-col :span="6">
                        <pageNation :pager="pager" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"></pageNation>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="device_tab_on" v-if="!showType">
            <div class="user-title">
                <el-row style="margin-top:20px;">
                    <el-col :span="12">
                        <div class="user-item">
                            <div class="item-count">{{offlinePer}}%</div>
                            <div class="item-text">设备离线率</div>
                        </div>
                    </el-col>
                    <el-col :span="12" >
                        <div class="user-item">
                            <div class="item-count">{{avgofflineTimeInSec}}s</div>
                            <div class="item-text">设备平均离线时长</div>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="device_form">
                <div id="myEchart1" style="width: 100%; height: 300px;margin-top:20px;"></div>
            </div>
            <div class="devide_table">
                <el-row type="flex" class="row_active">
                    <el-col :span="24">
                        <tableBarActive2 id="rebateSetTable" ref="table1" tooltip-effect="dark" :tableData="tableData1" :clomnSelection="clomnSelection" :rowHeader="rowHeader1" :tableOption="tableOption1" @handleButton="handleButton" :operatingStatus="operatingStatus" @toOperating="toOperating" @handleSelectionChange="handleSelectionChange" @selectCheckBox="selectCheckBox" @selectAll="selectAll"></tableBarActive2>
                    </el-col>
                </el-row>
                <el-row type="flex" style="   display: flex;justify-content: flex-end;margin-top:10px;">
                    <el-col :span="6">
                        <pageNation :pager="pager1" @handleSizeChange1="handleSizeChange1" @handleCurrentChange1="handleCurrentChange1"></pageNation>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
  

</section>
</template>

<script>
import echarts from "echarts";
import tableBarActive2 from "../../components/tableBarActive2";
import {
  device_online_curve,
  device_online_table,
  query_playdata_table
} from "../../api/api";
import pageNation from "../../components/pageNation";

export default {
  data() {
    return {
      radio1: "在线",
      showType: true,
      shoudzyx: false,
      showzdyz: false,
      pickerOptions: {
        shortcuts: [
          {
            text: "昨天",
            onClick(picker) {
              const end = new Date(
                new Date(new Date().toLocaleDateString()).getTime()
              );
              const start =
                new Date(new Date(new Date().toLocaleDateString()).getTime()) -
                3600 * 1000 * 24 * 1;
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "今天",
            onClick(picker) {
              const end = new Date();
              const start = new Date(
                new Date(new Date().toLocaleDateString()).getTime()
              );
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date(
                new Date(new Date().toLocaleDateString()).getTime()
              );
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date(
                new Date(new Date().toLocaleDateString()).getTime()
              );
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 29);
              picker.$emit("pick", [start, end]);
            }
          }
        ],
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      valueTime4: "",
      activeName: "first",
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: "",
      rowHeader: [
        {
          prop: "timeStamp",
          label: "日期"
        },
        {
          prop: "totalDevCnt",
          label: "总设备"
        },
        {
          prop: "onlineDevCnt",
          label: "设备在线"
        },
        {
          prop: "percent",
          label: "设备在线率"
        },

        {
          prop: "avgTime",
          label: "平均在线时长"
        }
      ],
      rowHeader1: [
        {
          prop: "timeStamp",
          label: "日期"
        },
        {
          prop: "totalDevCnt",
          label: "总设备"
        },
        {
          prop: "onlineDevCnt",
          label: "离线设备"
        },
        {
          prop: "percent",
          label: "设备离线率"
        },
        {
          prop: "avgTime",
          label: "平均离线时长"
        }
      ],
      tableData: [],
      tableData1: [],
      starttime: "",
      endtime: "",
      onLineX: [],
      onLineY: [],
      offLineX: [],
      offLineY: [],
      pager: {
        count: 0,
        page: 1,
        rows: 100
      },
      pager1: {
        count: 0,
        page: 1,
        rows: 100
      },
      onlinePer: 0,
      avgOnlineTimeInSec: 0,
      offlinePer: 0,
      avgofflineTimeInSec: 0,
      flag: 1
    };
  },
  mounted() {
    //  this.configure()
    this.today();
    this.queryOnlineinfo();
    this.queryOnlineTable();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    onchangeTab(val) {
      if (val == "在线") {
        this.showType = true;
        this.queryOnlineinfo();
        this.queryOnlineTable();
        this.flag = 1;
      } else {
        this.flag = 0;
        this.showType = false;
        this.queryOffinfo();
        this.queryOfflineTable();
      }
    },

    showzdyx() {
      this.shoudzyx = !this.shoudzyx;
    },
    //自定义时间
    gettimes(cal) {
      this.starttime = dateToMs(this.val2[0]);
      this.endtime = dateToMs(this.val2[1]);
      if (this.endtime - this.starttime < 21600) {
        this.timeUnit = 60;
      } else if (
        this.endtime - this.starttime >= 21600 &&
        this.endtime - this.starttime < 86400
      ) {
        this.timeUnit = 60;
      } else if (this.endtime - this.starttime >= 86400) {
        this.timeUnit = 60 * 24;
      }
    },
    //今天
    today(data) {
      let times = new Date(new Date().toLocaleDateString()).getTime() / 1000;
      this.starttime = times;
      this.endtime = Date.parse(new Date()) / 1000;
      this.timeUnit = 60;
      if (!data) {
        this.queryOnlineinfo();
        this.queryOnlineTable();
        this.queryOffinfo();
        this.queryOfflineTable();
      } else {
        this.queryOnlineinfo();
        this.queryOnlineTable();
        this.queryOffinfo();
        this.queryOfflineTable();
      }
    },
    //昨天
    yesterday(data) {
      let times = new Date(new Date().toLocaleDateString()).getTime() / 1000;
      this.starttime = times - 24 * 60 * 60 * 1;
      this.endtime = times;
      this.timeUnit = 60;
      if (!data) {
        this.queryOnlineinfo();
        this.queryOnlineTable();
        this.queryOffinfo();
        this.queryOfflineTable();
      } else {
        this.queryOnlineinfo();
        this.queryOnlineTable();
        this.queryOffinfo();
        this.queryOfflineTable();
      }
    },
    //七天
    sevendat(data) {
      let times = new Date(new Date().toLocaleDateString()).getTime() / 1000;
      this.starttime = times - 24 * 60 * 60 * 7;
      this.endtime = times;
      this.timeUnit = 60 * 24;
      if (!data) {
        this.queryOnlineinfo();
        this.queryOnlineTable();
        this.queryOffinfo();
        this.queryOfflineTable();
      } else {
        this.queryOnlineinfo();
        this.queryOnlineTable();
        this.queryOffinfo();
        this.queryOfflineTable();
      }
    },
    //三十天
    thirtyday(data) {
      let times = new Date(new Date().toLocaleDateString()).getTime() / 1000;
      this.starttime = times - 24 * 60 * 60 * 30;
      this.endtime = times;
      this.timeUnit = 60 * 24;
      if (!data) {
        this.queryOnlineinfo();
        this.queryOnlineTable();
        this.queryOffinfo();
        this.queryOfflineTable();
      } else {
        this.queryOnlineinfo();
        this.queryOnlineTable();
        this.queryOffinfo();
        this.queryOfflineTable();
      }
    },
    //确定查询
    onsumbit() {
      this.queryOnlineTable();
      this.queryOnlineinfo();
      this.queryOffinfo();
      this.queryOfflineTable();
    },
    handleSizeChange() {},
    //分页
    handleCurrentChange(val) {
      this.pager.page = val.val;
      this.queryOnlineTable();
    },
    handleSizeChange1() {},
    //分页
    handleCurrentChange1(val) {
      this.pager1.page = val.val;
      this.queryOnlineTable();
    },
    handleClick(tab) {
      console.log(tab.index);
      if (tab.index == 0) {
        this.queryOnlineinfo();
        this.queryOnlineTable();
      } else {
        this.queryOffinfo();
        this.queryOfflineTable();
      }
    },
    //在线table
    queryOnlineTable() {
      let startTime = new Date().getTime() / 1000;
      let endTime = (new Date().getTime() - 60 * 60 * 24 * 7 * 1000) / 1000;
      if (this.valueTime4) {
        if (this.valueTime4 == "") {
          startTime = new Date().getTime() / 1000;
          endTime = (new Date().getTime() - 60 * 60 * 24 * 7 * 1000) / 1000;
        } else {
          endTime = Math.floor(this.valueTime4[1].getTime() / 1000);
          startTime = Math.floor(this.valueTime4[0].getTime() / 1000);
        }
      } else {
        startTime = new Date().getTime() / 1000;
        endTime = (new Date().getTime() - 60 * 60 * 24 * 7 * 1000) / 1000;
      }
      let param = {
        start_ts: this.starttime,
        end_ts: this.endtime,
        flag: 1,
        pageNo: this.pager.page - 1,
        pageSize: 10
      };
      device_online_table(param)
        .then(res => {
          if (res.status == 0) {
            console.log(res);

            let tempArr = res.data.list;
            for (var i = 0; i < tempArr.length; i++) {
              tempArr[i].percent = (tempArr[i].percent * 100).toFixed(4) + "%";
            }
            this.tableData = tempArr;
            this.pager.count = res.data.totalCnt;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //离线线table
    queryOfflineTable() {
      let startTime = new Date().getTime() / 1000;
      let endTime = (new Date().getTime() - 60 * 60 * 24 * 7 * 1000) / 1000;
      if (this.valueTime4) {
        if (this.valueTime4 == "") {
          startTime = new Date().getTime() / 1000;
          endTime = (new Date().getTime() - 60 * 60 * 24 * 7 * 1000) / 1000;
        } else {
          endTime = Math.floor(this.valueTime4[1].getTime() / 1000);
          startTime = Math.floor(this.valueTime4[0].getTime() / 1000);
        }
      } else {
        startTime = new Date().getTime() / 1000;
        endTime = (new Date().getTime() - 60 * 60 * 24 * 7 * 1000) / 1000;
      }
      let param = {
        start_ts: parseInt(startTime),
        end_ts: parseInt(endTime),
        flag: 0,
        pageNo: this.pager1.page - 1,
        pageSize: 10
      };
      device_online_table(param)
        .then(res => {
          if (res.status == 0) {
            console.log(res);
            this.tableData1 = res.data.list;
            this.pager1.count = res.data.totalCnt;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    queryOnlineinfo() {
      let startTime = new Date().getTime() / 1000;
      let endTime = (new Date().getTime() - 60 * 60 * 24 * 7 * 1000) / 1000;
      if (this.valueTime4) {
        if (this.valueTime4 == "") {
          startTime = new Date().getTime() / 1000;
          endTime = (new Date().getTime() - 60 * 60 * 24 * 7 * 1000) / 1000;
        } else {
          endTime = Math.floor(this.valueTime4[1].getTime() / 1000);
          startTime = Math.floor(this.valueTime4[0].getTime() / 1000);
        }
      } else {
        startTime = new Date().getTime() / 1000;
        endTime = (new Date().getTime() - 60 * 60 * 24 * 7 * 1000) / 1000;
      }
      let param = {
        start_ts: this.starttime,
        end_ts: this.endtime,
        flag: this.flag
      };
      device_online_curve(param)
        .then(res => {
          console.log(res);
          if (res.status == 0) {
            this.onlinePer = res.data.onlinePer;
            this.avgOnlineTimeInSec = res.data.avgOnlineTimeInSec;
            this.onLineX = [];
            this.onLineX = res.data.onlineCntArray;
            let temp = [];
            temp = res.data.timeArray;
            for (var i = 0; i < temp.length; i++) {
              temp[i] = this.common.getTimess(temp[i] * 1000);
            }
            this.onLineY = [];
            this.onLineY = temp;

            setTimeout(this.drawLine(this.onLineX, this.onLineY), 0);
            // this.drawLine(this.AccelerateX,this.AccelerateY);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //离线
    queryOffinfo() {
      let startTime = new Date().getTime() / 1000;
      let endTime = (new Date().getTime() - 60 * 60 * 24 * 7 * 1000) / 1000;
      if (this.valueTime4) {
        if (this.valueTime4 == "") {
          startTime = new Date().getTime() / 1000;
          endTime = (new Date().getTime() - 60 * 60 * 24 * 7 * 1000) / 1000;
        } else {
          endTime = Math.floor(this.valueTime4[1].getTime() / 1000);
          startTime = Math.floor(this.valueTime4[0].getTime() / 1000);
        }
      } else {
        startTime = new Date().getTime() / 1000;
        endTime = (new Date().getTime() - 60 * 60 * 24 * 7 * 1000) / 1000;
      }
      let param = {
        start_ts: this.starttime,
        end_ts: this.endtime,
        flag: this.flag
      };
      device_online_curve(param)
        .then(res => {
          console.log(res);
          if (res.status == 0) {
            this.offlinePer = res.data.onlinePer;
            this.avgofflineTimeInSec = res.data.avgOnlineTimeInSec;
            this.offLineX = [];
            this.offLineX = res.data.onlineCntArray;
            let temp = [];
            temp = res.data.timeArray;
            for (var i = 0; i < temp.length; i++) {
              temp[i] = this.common.getTimess(temp[i] * 1000);
            }
            this.offLineY = [];
            this.offLineY = temp;

            setTimeout(this.drawLine1(this.offLineX, this.offLineY), 0);
            // this.drawLine(this.AccelerateX,this.AccelerateY);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    drawLine(x, y) {
      var arrx = [];
      var arry = [];
      for (let i in x) {
        arrx.push(x[i]); //属性
        //arr.push(obj[i]); //值
      }
      for (let i in y) {
        arry.push(y[i]); //属性
        //arr.push(obj[i]); //值
      }

      let myChart = echarts.init(document.getElementById("myEchart")); //这里是为了获得容器所在位置
      // let myChart1 = echarts.init(document.getElementById('myEchart1'));
      window.onresize = myChart.resize;
      let options = {
        title: {
          text: "设备在线趋势图",
          left: "left"
        },
        xAxis: {
          type: "category",
          data: arry
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: arrx,
            type: "line"
          }
        ]
      };
      myChart.setOption(options);
      //myChart1.setOption(options);
    },
    drawLine1(x, y) {
      var arrx = [];
      var arry = [];
      for (let i in x) {
        arrx.push(x[i]); //属性
        //arr.push(obj[i]); //值
      }
      for (let i in y) {
        arry.push(y[i]); //属性
        //arr.push(obj[i]); //值
      }

      let myChart = echarts.init(document.getElementById("myEchart1")); //这里是为了获得容器所在位置
      // let myChart1 = echarts.init(document.getElementById('myEchart1'));
      window.onresize = myChart.resize;
      let options = {
        title: {
          text: "设备离线趋势图",
          left: "left"
        },
        xAxis: {
          type: "category",
          data: arry
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: arrx,
            type: "line"
          }
        ]
      };
      myChart.setOption(options);
      //myChart1.setOption(options);
    }
  },
  components: {
    tableBarActive2,
    pageNation
  }
};
</script>

<style lang="less">
.myself-container {
  .devive_tab {
    width: 100%;
    height: auto;
    .switch_tab {
      position: absolute;
      right: 8%;
      top: 300px;
    }
    .device_tab_on {
      margin-top: 35px;
    }
  }

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
    margin-top: 50px;

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

.addaccout {
  .el-form--label-left .el-form-item__label {
    text-align: right;
    width: 90px;
  }

  .el-form-item__error {
    margin-left: 80px;
  }
}

.user-item {
  border: 1px solid #ebeef5;
}
</style>
