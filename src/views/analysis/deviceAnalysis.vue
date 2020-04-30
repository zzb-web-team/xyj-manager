<template>
<section class="myself-container">
       <div class="switch_tab">
            <el-radio-group v-model="radio1" @change="onchangeTab"  style="display: flex;justify-content: flex-start;margin-top:50px;">
                <el-radio-button label="在线时长"></el-radio-button>
                <el-radio-button label="离线次数"></el-radio-button>
              
                 <!-- <el-button style="margin-left:20px;" type="text" @click="toexportExcel">导出</el-button> -->
            </el-radio-group>
           
        </div>
    <div class="user-title" style="margin-bottom:20px;">
        <el-button-group>
            <!-- <el-button v-show="!shoudzyx" @click="today()">今天</el-button> -->
            <el-button v-show="!shoudzyx" @click="yesterday()">昨天</el-button>
            <el-button v-show="!shoudzyx" @click="sevendat()">近7天</el-button>
            <el-button v-show="!shoudzyx" @click="thirtyday()">近30天</el-button>
            <el-button @click="showzdyx">自定义<i class="el-icon-date"></i></el-button>
        </el-button-group>
        <el-date-picker v-show="shoudzyx" style="margin-left:10px;" v-model="val2" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="left" @change="gettimes"></el-date-picker>
    <el-select v-model="versointime" placeholder="请选择" @change="onChange" v-if="timeArr">
                            <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
            </el-select> 
             <el-date-picker style="margin-left:10px;"
      v-model="valueele"
      type="datetime"
      placeholder="时间对比">
    </el-date-picker>
                <el-select v-model="versointime" placeholder="请选择" @change="onChange">
                            <el-option v-for="item in options11" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
            </el-select>     
  <el-select v-model="versointype" placeholder="请选择" @change="onChange">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
            </el-select>        
            <el-button type="primary" style="margin-left:20px;" @click="onsumbit()">确定</el-button>

    </div>
    <div class="devive_tab">
      
        <div class="device_tab_on" v-if="showType">
           
            <div class="device_form" style="display: flex;space-between" >
                <div id="myEchart" style="width: 90%; height: 300px;margin-top:50px;"></div>
                <div style="height:300px;display: flex;align-items: flex-end; justify-content: flex-start;white-space:nowrap">日累计在线时长(h)</div>
            </div>
            <div class="devide_table">
                <el-row type="flex" class="row_active">
                    <el-col :span="24">
                        <tableBarActive2 id="rebateSetTable" ref="table1" tooltip-effect="dark" :tableData="tableDatanew11" :clomnSelection="clomnSelection" :rowHeader="rowHeader" :tableOption="tableOption" @handleButton="handleButton" :operatingStatus="operatingStatus" @toOperating="toOperating" @handleSelectionChange="handleSelectionChange" @selectCheckBox="selectCheckBox" @selectAll="selectAll"></tableBarActive2>
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
            <div class="device_form device_form_active" style="display: flex;space-between">
                <div id="myEchart1" style="width: 90%; height: 300px;margin-top:50px;"></div>
                                <div style="height:300px;display: flex;align-items: flex-end; justify-content: flex-start;white-space:nowrap">日累计离线次数(h)</div>

            </div>
            <div class="devide_table">
                <el-row type="flex" class="row_active">
                    <el-col :span="24">
                        <tableBarActive2 id="rebateSetTable" ref="table1" tooltip-effect="dark" :tableData="tableDatanew22" :clomnSelection="clomnSelection" :rowHeader="rowHeader1" :tableOption="tableOption1" @handleButton="handleButton" :operatingStatus="operatingStatus" @toOperating="toOperating" @handleSelectionChange="handleSelectionChange" @selectCheckBox="selectCheckBox" @selectAll="selectAll"></tableBarActive2>
                    </el-col>
                </el-row>
                <el-row type="flex" style="display: flex;justify-content: flex-end;margin-top:10px;">
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
  query_playdata_table,
} from "../../api/api";
import pageNation from "../../components/pageNation";
import common from "../../common/js/util.js";

export default {
  data() {
    return {
      timeArr:false,
      valueele: "",
      versointype: "0",
      versointime: "0",
      versointime1: "0",
      options: [
        {
          value: "0",
          label: "全部版本",
        },
        {
          value: "1",
          label: "3.2.2",
        },
        {
          value: "2",
          label: "3.2.3",
        },
      ],
      options11: [
        {
          value: "0",
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
      options1: [
        {
          value: "0",
          label: "时段对比",
        },
        {
          value: "1",
          label: "00:00:00-05:59:59",
        },
        {
          value: "2",
          label: "06:00:00-11:59:59",
        },
        {
          value: "2",
          label: "12:00:00-17:59:59",
        },
        {
          value: "2",
          label: "18:00:00-23:59:59",
        },
      ],
      radio1: "在线时长",
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
            },
          },
          {
            text: "今天",
            onClick(picker) {
              const end = new Date();
              const start = new Date(
                new Date(new Date().toLocaleDateString()).getTime()
              );
              picker.$emit("pick", [start, end]);
            },
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
            },
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
            },
          },
        ],
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      valueTime4: "",
      activeName: "first",
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: "",
      rowHeader: [
        {
          prop: "timeStamp",
          label: "在线时长区间",
        },
        {
          prop: "totalDevCnt",
          label: "设备数",
        },
        {
          prop: "onlineDevCnt",
          label: "占比(%)",
        },
      ],
      rowHeader1: [
        {
          prop: "timeStamp",
          label: "离线次数区间",
        },
        {
          prop: "totalDevCnt",
          label: "设备数",
        },
        {
          prop: "onlineDevCnt",
          label: "占比",
        },
        // {
        //   prop: "percent",
        //   label: "设备离线率"
        // },
        // {
        //   prop: "avgTime",
        //   label: "平均离线时长"
        // }
      ],

      tableDatanew11: [
        {
          timeStamp: "21-24h",
          totalDevCnt: "23",
          onlineDevCnt: "5",
        },
        {
          timeStamp: "16-20h",
          totalDevCnt: "234",
          onlineDevCnt: "55",
        },
        {
          timeStamp: "11-15h",
          totalDevCnt: "233",
          onlineDevCnt: "15",
        },
        {
          timeStamp: "6-10h",
          totalDevCnt: "232",
          onlineDevCnt: "25",
        },
        {
          timeStamp: "1-5h",
          totalDevCnt: "231",
          onlineDevCnt: "5",
        },
        {
          timeStamp: "<1h",
          totalDevCnt: "23",
          onlineDevCnt: "35",
        },
      ],
      data: ["0次", "1-3次", "4-6次", "6-10次", ">10次"],
      tableDatanew22: [
        {
          timeStamp: "0次",
          totalDevCnt: "23",
          onlineDevCnt: "5",
        },
        {
          timeStamp: "1-3次",
          totalDevCnt: "234",
          onlineDevCnt: "55",
        },
        {
          timeStamp: "4-6次",
          totalDevCnt: "233",
          onlineDevCnt: "15",
        },
        {
          timeStamp: "6-10次",
          totalDevCnt: "232",
          onlineDevCnt: "25",
        },
        {
          timeStamp: ">10次",
          totalDevCnt: "231",
          onlineDevCnt: "5",
        },
      ],
      tableData: [],
      tableData1: [],
      starttime: "",
      endtime: "",
      onLineX: [],
      onLineY: [],
      offLineX: [],
      offLineY: [],
      tableData2: [],
      pager: {
        count: 0,
        page: 1,
        rows: 100,
      },
      pager1: {
        count: 0,
        page: 1,
        rows: 100,
      },
      onlinePer: 0,
      avgOnlineTimeInSec: 0,
      offlinePer: 0,
      avgofflineTimeInSec: 0,
      flag: 1,
      pageActives: 1,
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
      if (val == "在线时长") {
        this.showType = true;
        this.timeArr=false
        this.queryOnlineinfo();
        this.queryOnlineTable();
        this.flag = 1;
      } else {
        this.flag = 0;
        this.showType = false;
        this.timeArr=true
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
        pageSize: 10,
      };
      device_online_table(param)
        .then(res => {
          if (res.status == 0) {

            let tempArr = res.data.list;
            for (var i = 0; i < tempArr.length; i++) {
              tempArr[i].percent = (tempArr[i].percent * 100).toFixed(4) + "%";
              if (tempArr[i].timeStamp == 0) {
                tempArr[i].timeStamp = 0;
              } else {
                tempArr[i].timeStamp = this.common.getTimes(
                  tempArr[i].timeStamp * 1000
                );
              }

              if (tempArr[i].avgTime == 0) {
                tempArr[i].avgTime = 0;
              } else {
                tempArr[i].avgTime =
                  (tempArr[i].avgTime / 60 / 60).toFixed(2) + "h";
              }
            }
            this.tableData = tempArr;
            this.pager.count = res.data.totalCnt;
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
    exportExcel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("../../excel/Export2Excel");
        const tHeader = [
          "日期",
          "总设备",
          "设备在线",
          "设备在线率",
          "平均在线时长",
        ];
        // 上面设置Excel的表格第一行的标题
        const filterVal = [
          "timeStamp",
          "totalDevCnt",
          "onlineDevCnt",
          "percent",
          "avgTime",
        ];
        // 上面的index、nickName、name是tableData里对象的属性
        const list = this.tableData2; //把data里的tableData存到list
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "设备趋势图");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    toexportExcel() {
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
        pageNo: this.pageActives - 1,
        pageSize: 10,
      };
      device_online_table(param)
        .then(res => {
          if (res.status == 0) {

            let tempArr = res.data.list;
            for (var i = 0; i < tempArr.length; i++) {
              tempArr[i].percent = (tempArr[i].percent * 100).toFixed(4) + "%";
            }
            this.tableData2 = this.tableData2.concat(tempArr);

            if (this.pageActives >= res.data.totalPageCnt) {
              this.common.monitoringLogs("导出", "导出设备趋势图", 1);
              this.exportExcel();
            } else {
              this.pageActives++;
              this.toexportExcel();
            }
          } else {
            this.common.monitoringLogs("导出", "导出设备趋势图", 0);
          }
        })
        .catch(error => {
          console.log(error);
          this.$message({
            message: "服务出错",
            type: "error",
          });
          this.common.monitoringLogs("导出", "导出设备趋势图", 0);
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
        start_ts: this.starttime,
        end_ts: this.endtime,
        flag: 0,
        pageNo: this.pager1.page - 1,
        pageSize: 10,
      };
      device_online_table(param)
        .then(res => {
          if (res.status == 0) {
            let tempArr = res.data.list;
            for (var i = 0; i < tempArr.length; i++) {
              tempArr[i].percent = (tempArr[i].percent * 100).toFixed(4) + "%";
              if (tempArr[i].timeStamp == 0) {
                tempArr[i].timeStamp = 0;
              } else {
                tempArr[i].timeStamp = this.common.getTimes(
                  tempArr[i].timeStamp * 1000
                );
              }

              if (tempArr[i].avgTime == 0) {
                tempArr[i].avgTime = 0;
              } else {
                tempArr[i].avgTime =
                  (tempArr[i].avgTime / 60 / 60).toFixed(2) + "h";
              }
            }
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
        flag: this.flag,
      };
      device_online_curve(param)
        .then(res => {
          if (res.status == 0) {
            this.onlinePer = res.data.onlinePer * 100 + "%";
            if (res.data.avgOnlineTimeInSec == 0) {
              this.avgOnlineTimeInSec = 0;
            } else {
              this.avgOnlineTimeInSec =
                (res.data.avgOnlineTimeInSec / 60 / 60).toFixed(2) + "h";
            }
            this.onLineX = [];
            this.onLineX = res.data.onlineCntArray;
            let temp = [];
            temp = res.data.timeArray;
            for (var i = 0; i < temp.length; i++) {
              temp[i] = this.common.getTimess(temp[i] * 1000);
            }
            this.onLineY = [];
            this.onLineY = temp;

            this.drawLine(this.onLineX, this.onLineY);
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
        flag: this.flag,
      };
      device_online_curve(param)
        .then(res => {
          if (res.status == 0) {
            this.offlinePer = res.data.onlinePer;
            if (res.data.avgOnlineTimeInSec == 0) {
              this.avgOnlineTimeInSec = 0;
            } else {
              this.avgOnlineTimeInSec =
                (res.data.avgOnlineTimeInSec / 60 / 60).toFixed(2) + "h";
            }
            this.offLineX = [];
            this.offLineX = res.data.onlineCntArray;
            let temp = [];
            temp = res.data.timeArray;
            for (var i = 0; i < temp.length; i++) {
              temp[i] = this.common.getTimess(temp[i] * 1000);
            }
            this.offLineY = [];
            this.offLineY = temp;

            this.drawLine1(this.offLineX, this.offLineY);
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
      // let options = {
      //   title: {
      //     text: "在线时长趋势图",
      //     left: "left",
      //   },
      //   xAxis: {
      //     type: "category",
      //     data: arry,
      //   },
      //   yAxis: {
      //     type: "value",
      //   },
      //   series: [
      //     {
      //       data: arrx,
      //       type: "line",
      //     },
      //   ],
      // };
      let options = {
        title: {
          text: "设备数（台）",
          left: "left",
        },
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["21-24h", "16-20h", "11-15h", "6-10h", "1-5h", "<1h"],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "新增设备",
            type: "bar",
            barWidth: "10%",
            data: [52, 200, 300, 20, 300, 20],
          },
        ],
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
          text: "设备数（台）",
          left: "left",
        },
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["0次", "1-3次", "4-6次", "6-10次", ">10次"],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "新增设备",
            type: "bar",
            barWidth: "10%",
            data: [52, 200, 300, 20, 300, 20],
          },
        ],
      };
      myChart.setOption(options);
      //myChart1.setOption(options);
    },
  },
  components: {
    tableBarActive2,
    pageNation,
  },
};
</script>

<style lang="less">
.myself-container {
  .devive_tab {
    width: 100%;
    height: auto;

    .switch_tab {
      right: 9%;
      height: 40px;
      float: right;
      // background: red;
    }

    .device_tab_on {
      margin-top: 35px;
    }
  }

  .device_form {
    &.device_form_active {
      position: relative;
    }

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
