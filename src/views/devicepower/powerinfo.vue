<template>
  <section class="myself-container">
    <div class="device_form">
      <el-form ref="form" :model="form">
        <el-row type="flex">
          <div class="search-con">
            <i class="el-icon-search" style="color:#606266"></i>
            <el-input class="search-input" v-model="searchText" placeholder="设备SN、用户ID" @keyup.enter.native="searchInfo"></el-input>
          </div>
          <div @click="getShow()" class="div_show" style="color:#606266">筛选
                      <i
                class="el-icon-caret-bottom"
                :class="[rotate?'fa fa-arrow-down go':'fa fa-arrow-down aa']"
              ></i>
          </div>
        </el-row>
        <el-row type="flex" class="row_activess" v-show="showState">
      
          <el-form-item>
            <el-button type="primary" @click="search">确定</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="resetInfo">重置</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <div class="devide_table">
      <el-row type="flex" class="row_active">
        <el-col :span="24" style="display: flex;justify-content: flex-end">
          <el-button type="primary" @click="toexportExcel">导出</el-button>
        </el-col>
      </el-row>
      <el-row type="flex" class="row_active">
        <el-col :span="24">
          <el-table :data="tableData" border style="width: 100%" @sort-change="tableSortChange">
            <el-table-column prop="dev_sn" label="设备SN"></el-table-column>
            <el-table-column prop="dev_name" label="设备名称"></el-table-column>
            <el-table-column prop="user_id" label="绑定用户ID"></el-table-column>
            <el-table-column prop="total_value"  sortable="custom" label="算力值"></el-table-column>

          </el-table>
        </el-col>
      </el-row>
    </div>
    <div class="devide_pageNation" style="display: flex;justify-content: space-between;">
      <el-row type="flex"></el-row>
      <el-row type="flex">
        <el-col :span="6">
          <pageNation
            :pager="pager"
            @handleSizeChange="handleSizeChange"
            @handleCurrentChange="handleCurrentChange"
          ></pageNation>
        </el-col>
      </el-row>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <div class="addaccout">
        <el-form :model="ruleForm2" ref="ruleForm2" label-position="left" class="demo-ruleForm">
          <h3 class="title">调整算力系数</h3>
          <el-form-item prop="username">
            <el-form-item label="IP 系数:">
              <el-input v-model="ruleForm2.ip_radio" placeholder="请输入IP 系数" style="width:350px"></el-input>
            </el-form-item>
          </el-form-item>
          <el-form-item prop="nickname">
            <el-form-item label="存储系数:">
              <el-input v-model="ruleForm2.store_radio" placeholder="请输入存储系数" style="width:350px"></el-input>
            </el-form-item>
          </el-form-item>
          <el-form-item style="width:100%;display: flex;justify-content:center;">
            <el-button type="primary" @click="change()" :loading="logining">确定</el-button>
            <el-button type="primary" @click="dialogVisible=false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import tableBarActive2 from "../../components/tableBarActive2";
import mySearch from "../../components/mySearch";
import pageNation from "../../components/pageNation";
import {ptfs_query_cp_value_list } from "../../api/api";
import common from "../../common/js/util.js";

export default {
  data() {
    return {
      rotate: false,
      dialogVisible: false,
      searchText: "",
      start_time: "",
      end_time: "",
      tableData: [],
      ruleForm2: {
        ip_radio: "",
        store_radio: ""
      },
      pager: {
        count: 0,
        page: 1,
        rows: 100
      },
      showState: false,
      order: 0,
      tableData2: [],
      pageActive: 0
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    //重置
    resetInfo() {
      this.pager.page = 1;
      this.start_time = "";
      this.end_time = "";
      this.searchText=""
      this.getInfo()
    },
    //排序
    tableSortChange(column) {
      this.pager.page = 1;
      if (column.order == "descending") {
        this.order = 0;
      } else {
        this.order = 1;
      }
      this.getInfo();
    },
    searchInfo(){
         this.getInfo();

    },
    formatTime(row) {
      return this.common.getTimes(row.time_stamp * 1000);
    },
    formatNumber(row, column) {
      const property = column["property"];
      return (row[property] / 1000000).toFixed(6);
    },
    onlineTime(row) {
      return (row.online_time / 3600).toFixed(2) + "h";
    },
    getEarnParam(val) {
      let param = {
        param_type: val,
        store_radio:
          this.ruleForm2.store_radio === ""
            ? ""
            : Number(this.ruleForm2.store_radio),
        ip_radio:
          this.ruleForm2.ip_radio === "" ? "" : Number(this.ruleForm2.ip_radio)
      };
      set_earn_param(param)
        .then(res => {
          if (res.status === 0) {
            if (val === 0) {
              this.$message({
                type: "success",
                message: res.err_msg
              });
              this.dialogVisible = false;
            }
            this.ruleForm2.store_radio = this.scientificToNumber(
              res.data.store_radio / 10000000
            );
            this.ruleForm2.ip_radio = this.scientificToNumber(
              res.data.ip_radio / 10000000
            );
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getInfo() {
      // var data = {
      //   cur_page: this.pager.page - 1,
      //   order: this.order,
      //   start_time:
      //     this.start_time === "" ? 0 : new Date(this.start_time).getTime(),
      //   end_time: this.end_time === "" ? 0 : new Date(this.end_time).getTime()
      // };
      // if (this.judgeString(this.searchText)) {
      //   var arr = Object.keys(this.judgeString(this.searchText));
      //   data.query_type = arr.length === 0 ? 0 : 1;
      //   var param = Object.assign(this.judgeString(this.searchText), data);
      // } else {
      //   this.$message.error("请输入正确的设备SN、用户ID");
      //   return;
      // }
      let param =new Object()
   
          param.user_id= 0,
         param.dev_sn=this.searchText
         param.order=this.order,
        param.cur_page=this.pager.page - 1

      ptfs_query_cp_value_list(param)
        .then(res => {
          if (res.status === 0) {
            console.log(res)
            this.pager.count = res.data.total_num;
            this.pager.rows = res.data.total_page;
            //this.tableData = res.data.total_profit_list;
            let teamarr = [];
            if (res.data.com_power_list) {
              teamarr = res.data.com_power_list;
              for (var i = 0; i < teamarr.length; i++) {
                // teamarr[i].active1 =
                //   (teamarr[i].free_cap / 1024 / 1024 / 1024).toFixed(2) +
                //   "GB" +
                //   "/" +
                //   (teamarr[i].total_cap / 1024 / 1024 / 1024).toFixed(2) +
                //   "GB";
                // teamarr[i].active2 =
                //   (teamarr[i].up_bandwidth / 1024 / 1024 / 1024).toFixed(2) +
                //   "GB" +
                //   "/" +
                //   (teamarr[i].down_bandwidth / 1024 / 1024 / 1024).toFixed(2) +
                //   "GB";

                // teamarr[i].time_stamp = this.common.getTimess(
                //   teamarr[i].time_stamp * 1000
                // );
              }
            } else {
              let teamarr = [];
            }

            this.tableData = teamarr;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //导出
    toexportExcel() {
      var data = {
        cur_page: this.pageActive,
        order: this.order,
        start_time:
          this.start_time === "" ? 0 : new Date(this.start_time).getTime(),
        end_time: this.end_time === "" ? 0 : new Date(this.end_time).getTime()
      };
      if (this.judgeString(this.searchText)) {
        var arr = Object.keys(this.judgeString(this.searchText));
        data.query_type = arr.length === 0 ? 0 : 1;
        var param = Object.assign(this.judgeString(this.searchText), data);
      } else {
        this.$message.error("请输入正确的设备SN、用户ID");
        return;
      }

      getDevicePower(param)
        .then(res => {
          if (res.status === 0) {
            this.pageActive = res.data.cur_page;
            let teamarr = res.data.profit_detail_list;
            for (var i = 0; i < teamarr.length; i++) {
              if (teamarr[i].free_cap == 0) {
                teamarr[i].active1 = 0;
              } else {
                teamarr[i].active1 =
                  (teamarr[i].free_cap / 1024 / 1024 / 1024).toFixed(2) +
                  "MB" +
                  "/" +
                  (teamarr[i].total_cap / 1024 / 1024 / 1024).toFixed(2) +
                  "MB";
              }
              if (teamarr[i].up_bandwidth == 0) {
                teamarr[i].active2 = 0;
              } else {
                teamarr[i].active2 =
                  (teamarr[i].up_bandwidth / 1024 / 1024 / 1024).toFixed(2) +
                  "MB" +
                  "/" +
                  (teamarr[i].down_bandwidth / 1024 / 1024 / 1024).toFixed(2) +
                  "MB";
              }
              if (teamarr[i].time_stamp == 0) {
                teamarr[i].time_stamp = 0;
              } else {
                teamarr[i].time_stamp = this.common.getTimess(
                  teamarr[i].time_stamp * 1000
                );
              }

              teamarr[i].time_stamp = this.common.getTimess(
                teamarr[i].time_stamp * 1000
              );
            }
            this.tableData2 = this.tableData2.concat(teamarr);

            if (res.data.cur_page >= res.data.total_page) {
              this.exportExcel();
              this.common.monitoringLogs("导出", "导出算力系数表", 1);
            } else {
              this.pageActive++;
              this.toexportExcel();
            }

            // this.pager.count = res.data.total_num;
            // this.pager.rows = res.data.total_page;
            // //this.tableData = res.data.total_profit_list;
            // let teamarr = res.data.profit_detail_list;
            // for (var i = 0; i < teamarr.length; i++) {
            //     teamarr[i].active1 = (teamarr[i].free_cap / 1024 / 1024/1024).toFixed(2) + "MB" + "/" + (teamarr[i].total_cap / 1024 / 1024 / 1024).toFixed(2) + "MB"
            //     teamarr[i].active2 = (teamarr[i].up_bandwidth / 1024 / 1024/1024).toFixed(2) + "MB" + "/" + (teamarr[i].down_bandwidth / 1024 / 1024 / 1024).toFixed(2) + "MB"

            //     teamarr[i].time_stamp = this.common.getTimess(teamarr[i].time_stamp * 1000)

            // }
            // this.tableData = teamarr
          } else {
            this.$message({
              message: "导出失败",
              type: "error"
            });
            this.common.monitoringLogs("导出", "导出算力系数表", 0);
          }
        })
        .catch(error => {
          console.log(error);
          this.common.monitoringLogs("导出", "导出算力系数表", 0);
        });
    },
    getShow() {
      this.showState = !this.showState;
      this.rotate = !this.rotate;
    },
    search() {
      this.pager.page = 1;
      this.getInfo();
    },
    addAccout() {
      this.getEarnParam(1);
      this.dialogVisible = true;
    },
    handleCurrentChange(val) {
      this.pager.page = val.val;
      this.getInfo();
    },
    change() {
      if (
        this.ruleForm2.ip_radio > 1 ||
        this.ruleForm2.ip_radio < 0.000000001
      ) {
        this.$message.error("IP系数在0.000000001-1");
        return;
      } else if (
        this.ruleForm2.store_radio > 1 ||
        this.ruleForm2.store_radio < 0.000000001
      ) {
        this.$message.error("存储系数在0.000000001-1");
        return;
      }
      this.getEarnParam(0);
    },
    judgeString(str) {
      const reg1 = /^\d{8}$/;
      const reg3 = /^(SMM)[0-9]{9}$/;
      if (reg1.test(str)) {
        return {
          dev_sn: "",
          nick_name: "",
          user_id: Number(str)
        };
      } else if (reg3.test(str)) {
        return {
          user_id: 0,
          nick_name: "",
          dev_sn: str
        };
      } else if (str === "") {
        return {};
      } else {
        return false;
      }
    },
    scientificToNumber(num) {
      var str = num.toString();
      var reg = /^(\d+)(e)([\-]?\d+)$/;
      var arr,
        len,
        zero = "";

      /*6e7或6e+7 都会自动转换数值*/
      if (!reg.test(str)) {
        return num;
      } else {
        /*6e-7 需要手动转换*/
        arr = reg.exec(str);
        len = Math.abs(arr[3]) - 1;
        for (var i = 0; i < len; i++) {
          zero += "0";
        }
        return "0." + zero + arr[1];
      }
    },
    //导出的方法
    exportExcel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("../../excel/Export2Excel");
        const tHeader = [
          "设备SN",
          "绑定用户ID",
          "当日在线时长",
          "当日剩余空间/总空间",
          "当日平均上下行宽带",
          "当日IP",
          "当日存储值",
          "当日算力",
          "时间"
        ];
        // 上面设置Excel的表格第一行的标题
        const filterVal = [
          "dev_sn",
          "user_id",
          "online_time",
          "active1",
          "active2",
          "ip_value",
          "store_value",
          "store",
          "time_stamp"
        ];
        // 上面的index、nickName、name是tableData里对象的属性
        const list = this.tableData2; //把data里的tableData存到list
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "算力系数表");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    }
  },
  components: {
    pageNation: pageNation,
    tableBarActive2: tableBarActive2,
    mySearch: mySearch
  }
};
</script>

<style lang="less">
.myself-container {
  .devide_title {
    width: 100%;
    height: auto;
    overflow: hidden;
    margin-top: 10px;
    background: #f2f2f2;
    padding: 15px 0px;
    box-sizing: border-box;

    .el-col {
      padding: 0px 20px;
    }
  }

  .device_form {
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
  .title {
    width: 100%;
    text-align: center;
  }

  .el-dialog__body {
    padding: 0px;
  }

  .el-form-item {
    display: flex;
  }

  .el-form--label-left .el-form-item__label {
    text-align: right;
    width: 90px;
  }

  .el-form-item__error {
    margin-left: 80px;
  }
}
</style>
