<template>
  <section class="myself-container">
    <div class="switch_tab">
      <el-radio-group v-model="radio1" @change="onchangeTab" style="display: flex;justify-content: flex-start;margin-top:50px;">
        <el-radio-button label="在线时长"></el-radio-button>
        <el-radio-button label="离线次数"></el-radio-button>

        <!-- <el-button style="margin-left:20px;" type="text" @click="toexportExcel">导出</el-button> -->
      </el-radio-group>

    </div>
    <div class="user-title" style="margin-bottom:20px;">

      <el-date-picker style="margin-left:10px;" placeholder="选择日期时间" v-model="valueActive" type="date" align="left" @change="gettimes"></el-date-picker>

      <el-date-picker style="margin-left:10px;" v-model="valueele" type="dates" placeholder="时间对比" @change="timeChange">
      </el-date-picker>
      <el-select v-model="versointime1" placeholder="时段对比" @change="changePeriod" v-if="timeArr">
        <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="devicetype" placeholder="请选择" @change="changeType">
        <el-option v-for="item in options11" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="versointype" placeholder="请选择">
        <el-option v-for="item in options" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-button type="primary" style="margin-left:20px;" @click="onsumbit()">确定</el-button>

    </div>
    <div class="devive_tab">

      <div class="device_tab_on" v-if="showType">

        <div class="device_form" style="display: flex;space-between">
          <div id="myEchart" style="width: 100%; height: 500px;margin-top:50px;"></div>
          <div style="height:500px;display: flex;align-items: flex-end; justify-content: flex-start;white-space:nowrap">日累计在线时长(h)</div>
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
          <div id="myEchart1" style="width: 90%; height: 500px;margin-top:50px;"></div>
          <div style="height:500px;display: flex;align-items: flex-end; justify-content: flex-start;white-space:nowrap">日累计离线次数(h)</div>

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
  device_online,
  device_offline,
  device_typerom_all,
} from "../../api/api";
import pageNation from "../../components/pageNation";
import common from "../../common/js/util.js";

export default {
  data() {
    return {
      valueActive: "",
      timeArr: false,
      valueele: "",
      versointype: "",
      devicetype: "-1",
      versointime1: "",
      options: [
        // {
        //   value: "",
        //   label: "全部版本",
        // },
        // {
        //   value: "3.2.2",
        //   label: "3.2.2",
        // },
        // {
        //   value: "3.2.3",
        //   label: "3.2.3",
        // },
      ],
      options11: [],
      options1: [
        {
          value: "1",
          label: "00:00:00-05:59:59",
        },
        {
          value: "2",
          label: "06:00:00-11:59:59",
        },
        {
          value: "3",
          label: "12:00:00-17:59:59",
        },
        {
          value: "4",
          label: "18:00:00-23:59:59",
        },
      ],
      radio1: "在线时长",
      showType: true,
      shoudzyx: false,
      showzdyz: false,

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
          prop: "num",
          label: "设备数",
        },
        {
          prop: "percent",
          label: "占比(%)",
        },
      ],
      rowHeader1: [
        {
          prop: "timeStamp",
          label: "离线次数区间",
        },
        {
          prop: "num",
          label: "设备数",
        },
        {
          prop: "percent",
          label: "占比(%)",
        },
      ],

      tableDatanew11: [],
      data: ["0次", "1-3次", "4-6次", "6-10次", ">10次"],
      tableDatanew22: [],
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
      compareArr: [],
      romArr: [],
    };
  },
  mounted() {
    //this.configure();

    // this.queryOnlineinfo();
    // this.queryOnlineTable();
    this.drawLine();
    this.queryTypeInfo();
    this.querydeviceOnline();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    //选这类型过滤版本
    changeType(val) {
      console.log(val);
      if (val == -1) {
        this.options = [];
      } else {
        this.options = this.romArr[val].romSet;
      }
    },
    //查询西柚机所有版本
    queryTypeInfo() {
      this.options11 = [];
      this.options = [];
      let param = {};
      let obj2 = {
        value: "-1",
        label: "全部类型",
      };
      this.options11.push(obj2);
      device_typerom_all(param)
        .then(res => {
          let tempArr = res.data;
          this.romArr = res.data;

          for (var i = 0; i < tempArr.length; i++) {
            let obj = {};
            let obj1 = {};

            if (tempArr[i].type == 0) {
              (obj.value = tempArr[i].type), (obj.label = "测试类型1");
              this.options = tempArr[i].romSet;
            } else if (tempArr[i].type == 1) {
              (obj.value = tempArr[i].type), (obj.label = "RK3328");
              this.options = tempArr[i].romSet;
            } else if (tempArr[i].type == 2) {
              (obj.value = tempArr[i].type), (obj.label = "AMS805");
              this.options = tempArr[i].romSet;
            }
            this.options11.push(obj);
          }
          console.log(this.options11);
        })
        .catch(error => {});
    },
    //时段选择
    changePeriod(val) {
      let compareArrActive = [];

      for (var i = 0; i < this.compareArr.length; i++) {
        if (val == 1) {
          compareArrActive.push(this.compareArr[i]);
        } else if (val == 2) {
          compareArrActive.push(this.compareArr[i] + 3600 * 6);
        } else if (val == 3) {
          compareArrActive.push(this.compareArr[i] + 3600 * 12);
        } else if (val == 4) {
          compareArrActive.push(this.compareArr[i] + 3600 * 18);
        }
      }
      this.compareArr = compareArrActive;
    },
    //对比时间确认
    timeChange() {
      this.compareArr = [];

      for (var i = 0; i < this.valueele.length; i++) {
        this.compareArr.push(this.valueele[i].getTime() / 1000);
      }
    },
    onchangeTab(val) {
      this.radio1 = val;
      if (val == "在线时长") {
        this.showType = true;
        this.timeArr = false;

        (this.versointype = ""),
          (this.devicetype = ""),
          this.querydeviceOnline();
        //this.flag = 1;
      } else {
        //this.flag = 0;
        this.showType = false;
        (this.versointype = ""), (this.devicetype = ""), (this.timeArr = true);

        this.querydeviceOffline();
      }
    },

    showzdyx() {
      this.shoudzyx = !this.shoudzyx;
    },

    //确定查询
    onsumbit() {
      if (this.radio1 == "在线时长") {
        this.querydeviceOnline();
      } else {
        this.querydeviceOffline();
      }
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
        this.queryOnlineTable();
      } else {
        this.querydeviceOffline();
      }
    },

    querydeviceOnline() {
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
      let nowtime = 0;

      if (this.valueActive == "") {
        nowtime = Math.floor(new Date().getTime() / 1000);
      } else {
        nowtime = Math.floor(this.valueActive.getTime() / 1000);
      }
      let paramActive = {};
      let dayList = [];
      paramActive.dayList = this.compareArr;
      paramActive.dayList[0] = nowtime;
      (paramActive.type = this.devicetype),
        (paramActive.version = this.versointype);
      device_online(paramActive)
        .then(res => {
          if (res.status == 0) {
            this.tableDatanew11 = [];
            let tempArr = res.data[0].devNumList;
            tempArr.forEach(element => {
              element.percent = (element.percent * 100).toFixed(2);
            });

            let tempArrActive = res.data;
            let nowArr = [];
            var list = {
              1: { timeStamp: "<1h", num: 0, percent: 0 },
              2: { timeStamp: "1-5h", num: 0, percent: 0 },
              3: { timeStamp: "6-10h", num: 0, percent: 0 },
              4: { timeStamp: "11-15h", num: 0, percent: 0 },
              5: { timeStamp: "16-20h", num: 0, percent: 0 },
              6: { timeStamp: "21-24h", num: 0, percent: 0 },
            };
            for (var i = 0; i < tempArr.length; i++) {
              list[tempArr[i].type].num = tempArr[i].num;
              list[tempArr[i].type].percent = tempArr[i].percent;
            }
            for (let key in list) {
              this.tableDatanew11.push(list[key]);
            }
            var list1 = [];
            for (var j = 0; j < tempArrActive.length; j++) {
              list1[j] = [0, 0, 0, 0, 0, 0];
              for (var k = 0; k < tempArrActive[j].devNumList.length; k++) {
                list1[j][tempArrActive[j].devNumList[k].type - 1] =
                  tempArrActive[j].devNumList[k].num;
              }
            }
            let echarsArr = [];
            for (var i = 0; i < list1.length; i++) {
              let obj = {
                type: "bar",
                data: list1[i],
              };
              echarsArr.push(obj);
            }
            this.drawLine(echarsArr);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    querydeviceOffline() {
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
      let nowtime = 0;
      if (this.valueActive == "") {
        nowtime = Math.floor(new Date().getTime() / 1000);
      } else {
        if (this.versointime1 == 1) {
          nowtime = this.valueActive.getTime() / 1000;
        } else if (this.versointime1 == 2) {
          nowtime = this.valueActive.getTime() / 1000 + 3600 * 6;
        } else if (this.versointime1 == 3) {
          nowtime = this.valueActive.getTime() / 1000 + 3600 * 12;
        } else if (this.versointime1 == 4) {
          nowtime = this.valueActive.getTime() / 1000 + 3600 * 18;
        }
        nowtime = Math.floor(nowtime);
      }
      let paramActive = {};
      let dayList = [];
      paramActive.dayList = this.compareArr;
      paramActive.dayList[0] = nowtime;
      (paramActive.type = this.devicetype),
        (paramActive.version = this.versointype);
      device_offline(paramActive)
        .then(res => {
          if (res.status == 0) {
            this.tableDatanew22 = [];
            let tempArr = res.data[0].devNumList;
            tempArr.forEach(element => {
              element.percent = (element.percent * 100).toFixed(2);
            });
            let tempArrActive = res.data;

            let nowArr = [];
            var list = {
              1: { timeStamp: "0次", num: 0, percent: 0 },
              2: { timeStamp: "1-3次", num: 0, percent: 0 },
              3: { timeStamp: "4-6次", num: 0, percent: 0 },
              4: { timeStamp: "6-10次", num: 0, percent: 0 },
              5: { timeStamp: ">10次", num: 0, percent: 0 },
            };
            for (var i = 0; i < tempArr.length; i++) {
              list[tempArr[i].type].num = tempArr[i].num;
              list[tempArr[i].type].percent = tempArr[i].percent;
            }
            for (let key in list) {
              this.tableDatanew22.push(list[key]);
            }
            var list1 = [];
            for (var j = 0; j < tempArrActive.length; j++) {
              list1[j] = [0, 0, 0, 0, 0];
              for (var k = 0; k < tempArrActive[j].devNumList.length; k++) {
                list1[j][tempArrActive[j].devNumList[k].type - 1] =
                  tempArrActive[j].devNumList[k].num;
              }
            }
            let echarsArr = [];
            for (var i = 0; i < list1.length; i++) {
              let obj = {
                type: "bar",
                data: list1[i],
              };
              echarsArr.push(obj);
            }
            this.drawLine1(echarsArr);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    drawLine(list) {
      console.log(list);
      let myChart = echarts.init(document.getElementById("myEchart")); //这里是为了获得容器所在位置
      window.onresize = myChart.resize;

      var posList = [
        "left",
        "right",
        "top",
        "bottom",
        "inside",
        "insideTop",
        "insideLeft",
        "insideRight",
        "insideBottom",
        "insideTopLeft",
        "insideTopRight",
        "insideBottomLeft",
        "insideBottomRight",
      ];

      app.configParameters = {
        rotate: {
          min: -90,
          max: 90,
        },
        align: {
          options: {
            left: "left",
            center: "center",
            right: "right",
          },
        },
        verticalAlign: {
          options: {
            top: "top",
            middle: "middle",
            bottom: "bottom",
          },
        },
        position: {
          options: echarts.util.reduce(
            posList,
            function(map, pos) {
              map[pos] = pos;
              return map;
            },
            {}
          ),
        },
        distance: {
          min: 0,
          max: 100,
        },
      };

      app.config = {
        rotate: 90,
        align: "left",
        verticalAlign: "middle",
        position: "insideBottom",
        distance: 15,
        onChange: function() {
          var labelOption = {
            normal: {
              rotate: app.config.rotate,
              align: app.config.align,
              verticalAlign: app.config.verticalAlign,
              position: app.config.position,
              distance: app.config.distance,
            },
          };
          myChart.setOption({
            series: [
              {
                label: labelOption,
              },
              {
                label: labelOption,
              },
              {
                label: labelOption,
              },
              {
                label: labelOption,
              },
            ],
          });
        },
      };

      var labelOption = {
        show: true,
        position: app.config.position,
        distance: app.config.distance,
        align: app.config.align,
        verticalAlign: app.config.verticalAlign,
        rotate: app.config.rotate,
        formatter: "{c}  {name|{a}}",
        fontSize: 12,
        rich: {
          name: {
            textBorderColor: "#fff",
          },
        },
      };

      let options = {
        color: ["#003366", "#006699", "#4cabce", "#e5323e"],
        title: {
          text: "设备数（台）",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: ["Forest", "Steppe", "Desert", "Wetland"],
        },
        grid: {
          left: "2%",
          right: "2%",
          bottom: "5%",
          containLabel: true,
        },

        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: ["<1h", "1-5h", "6-10h", "11-15h", "16-20h", "21-24h"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: list,
      };
      myChart.clear();
      myChart.setOption(options);
      //myChart1.setOption(options);
    },
    drawLine1(list) {
      let myChart = echarts.init(document.getElementById("myEchart1")); //这里是为了获得容器所在位置
      window.onresize = myChart.resize;

      var posList = [
        "left",
        "right",
        "top",
        "bottom",
        "inside",
        "insideTop",
        "insideLeft",
        "insideRight",
        "insideBottom",
        "insideTopLeft",
        "insideTopRight",
        "insideBottomLeft",
        "insideBottomRight",
      ];

      app.configParameters = {
        rotate: {
          min: -90,
          max: 90,
        },
        align: {
          options: {
            left: "left",
            center: "center",
            right: "right",
          },
        },
        verticalAlign: {
          options: {
            top: "top",
            middle: "middle",
            bottom: "bottom",
          },
        },
        position: {
          options: echarts.util.reduce(
            posList,
            function(map, pos) {
              map[pos] = pos;
              return map;
            },
            {}
          ),
        },
        distance: {
          min: 0,
          max: 100,
        },
      };

      app.config = {
        rotate: 90,
        align: "left",
        verticalAlign: "middle",
        position: "insideBottom",
        distance: 15,
        onChange: function() {
          var labelOption = {
            normal: {
              rotate: app.config.rotate,
              align: app.config.align,
              verticalAlign: app.config.verticalAlign,
              position: app.config.position,
              distance: app.config.distance,
            },
          };
          myChart.setOption({
            series: [
              {
                label: labelOption,
              },
              {
                label: labelOption,
              },
              {
                label: labelOption,
              },
              {
                label: labelOption,
              },
            ],
          });
        },
      };

      var labelOption = {
        show: true,
        position: app.config.position,
        distance: app.config.distance,
        align: app.config.align,
        verticalAlign: app.config.verticalAlign,
        rotate: app.config.rotate,
        formatter: "{c}  {name|{a}}",
        fontSize: 12,
        rich: {
          name: {
            textBorderColor: "#fff",
          },
        },
      };

      let options = {
        color: ["#003366", "#006699", "#4cabce", "#e5323e"],
        title: {
          text: "设备数（台）",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: ["Forest", "Steppe", "Desert", "Wetland"],
        },
        grid: {
          left: "2%",
          right: "2%",
          bottom: "5%",
          containLabel: true,
        },

        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: ["0次", "1-3次", "4-6次", "6-10次", ">10次"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: list,
      };
      myChart.clear();
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
