<template>
  <section class="myself-container">
        <div class="goback" style="width: 100%;line-height: 50px;">
      <div style="margin-top:20px;">
        
        <el-button type="primary" class="el-upload__tip" @click="$router.go(-1)">返回</el-button>
      </div>
      
    </div>
   
    <div class="device_form">
      <el-form ref="form">
        <el-form-item label>
          
          <p>收益公式介绍</p>
         <p>收益=P-(P1+P2)/2*R={{B1*V1*(T1/24）+B2*V1*(T2/24）+B3*V1*(T3/24）*45%}*（1+1/4）+F1*V2+F2*V2+F3*V2*45%}/2*R</p>
        <p>P1每日节点理论收益，B1/B2/B3：节点日平均带宽（单位：Mbps）  ，T：日累计在线时长[ T1、T2 电信联通网络在线时长,T3 移动网络在线时长]（单位：小时），V1：日单位带宽的价值（单位：元）
P2每日节点贡献产生收益，F：节点当日实际贡献的流量（单位：GB），V2：单位流量的价值（单位：元）</p>
        </el-form-item>
        <el-form-item label="单位宽带价值=" style="margin-top:10px;">
             <div style="display: flex; justify-content: flex-start;">
          <el-input v-model="param_v1" :disabled="toeditone"></el-input>
             <div style="margin-left:20px;">
                 <el-button type="primary" @click="onSubmitparam1" style="padding:11px 20px" >{{toedittext}}</el-button>
               </div>
          </div>
        </el-form-item>
        <el-form-item label="单位流量价值="  style="margin-top:10px;">
                       <div style="display: flex; justify-content: flex-start;">

          <el-input v-model="param_v2" :disabled="toedittwo" ></el-input>
            <div style="margin-left:20px;">
                 <el-button type="primary" @click="onSubmitparam2" style="padding:11px 20px" >{{toedittext1}}</el-button>
               </div>
          </div>
        </el-form-item>
        <!-- <div style="text-align: center;">
          <el-button type="primary" @click="onSubmitparam">确定</el-button>
          <el-button @click="$router.go(-1)">取消</el-button>
        </div> -->
      </el-form>
   
    </div>
   
  
    <el-dialog :visible.sync="dialogVisibleparam" width="30%" :before-close="handleClose">
     
    </el-dialog>
  </section>
</template>

<script>
import tableBarActive2 from "../../components/tableBarActive2";
import mySearch from "../../components/mySearch";
import pageNation from "../../components/pageNation";
import {
  query_node_info_list,
  ptfs_query_user_profit_list,
  ptfs_set_earn_param,
} from "../../api/api";
import common from "../../common/js/util.js";

export default {
  data() {
    return {
      toeditone: true,
      toedittext: "修改",
      toedittext1: "修改",
      toedittwo: true,
      param_v1: 0,
      param_v2: 0,
      dialogVisibleparam: false,
      dialogVisible: false,
      searchText: "",
      rotate: false,
      yes_total_num: "",
      yes_total_profit: "",
      start_time: "",
      end_time: "",
      tableData: [],
      pager: {
        count: 0,
        page: 1,
        rows: 100,
      },
      showState: false,
      order: 0,
      tableData2: [],
      pageActive: 0,
    };
  },
  mounted() {
    this.getInfo();
    this.queryInfo();
  },
  methods: {
    onSubmitparam1() {
      this.toeditone = !this.toeditone;
      if (this.toeditone == false) {
        this.toedittext = "保存";
      } else {
        this.toedittext = "修改";
        this.onSubmitparam();
      }
    },
    onSubmitparam2() {
      this.toedittwo = !this.toedittwo;
      if (this.toedittwo == false) {
        this.toedittext1 = "保存";
      } else {
        this.toedittext1 = "修改";
        this.onSubmitparam();
      }
    },
    //参数查询
    queryInfo() {
      let param = new Object();
      param.param_type = 1;
      param.param_v1 = this.param_v1;
      param.param_v2 = this.param_v2;
      ptfs_set_earn_param(param)
        .then(res => {
          console.log(res);
          if (res.status == 0) {
            this.param_v1 = res.data.param_v1;
            this.param_v2 = res.data.param_v2;
          } else {
            this.$message({
              message: "后台服务出错",
              type: "error",
            });
          }
        })
        .catch(error => {
          this.$message({
            message: "后台服务出错",
            type: "error",
          });
        });
    },

    //参数设置
    onSubmitparam() {
      let param = new Object();
      param.param_type = 0;
      if (
        parseFloat(this.param_v1) < 0.01 ||
        parseFloat(this.param_v1) > 1.0 ||
        this.param_v1.toString().split(".")[1].length > 2
      ) {
        this.$message({
          message: "单位宽带价值应为0.01≦V1≦1.00",
          type: "error",
        });
        return false;
      }
      if (
        parseFloat(this.param_v2) < 0.01 ||
        parseFloat(this.param_v2) > 5.0 ||
        this.param_v2.toString().split(".")[1].length > 2
      ) {
        this.$message({
          message: "单位流量价值应为0.01≦V1≦1.00",
          type: "error",
        });
        return false;
      }
      param.param_v1 = parseFloat(this.param_v1);
      param.param_v2 = parseFloat(this.param_v2);
      ptfs_set_earn_param(param)
        .then(res => {
          if (res.status == 0) {
            this.$message({
              message: "修改成功",
              type: "success",
            });
         this.common.monitoringLogs("修改", "修改收益参数", 1);
          } else {
            this.$message({
              message: "设置失败",
              type: "error",
            });
                     this.common.monitoringLogs("修改", "修改收益参数", 0);

          }
        })
        .catch(error => {
          this.$message({
            message: "后台服务出错",
            type: "error",
          });
                   this.common.monitoringLogs("修改", "修改收益参数", 0);

        });
    },
    //排序
    tableSortChange(column) {
      this.pager.page = 1;
      if (column.order == "descending") {
        this.order = 2;
      } else {
        this.order = 3;
      }
      this.getInfo();
    },
    //导出的方法
    exportExcel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("../../excel/Export2Excel");
        const tHeader = [
          "用户ID",
          "用户昵称",
          "收益金额",
          "当日IP值",
          "当日存储值",
          "当日算力",
          "时间",
        ];
        // 上面设置Excel的表格第一行的标题
        const filterVal = [
          "user_id",
          "user_nick_name",
          "profit",
          "ip_value",
          "store_value",
          "store",
          "time_stamp",
        ];
        // 上面的index、nickName、name是tableData里对象的属性
        const list = this.tableData2; //把data里的tableData存到list
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "用户收益明细表");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    //重置
    //重置
    onReset() {
      this.pager.page = 1;
      this.start_time = "";
      this.end_time = "";
      this.searchText = "";
      this.getInfo();
    },
    //input回车搜索

    onSubmitKey() {
      this.getInfo();
    },
    formatNumber(row, column) {
      const property = column["property"];
      return (row[property] / 1000000).toFixed(6);
    },
    formatUp(row, column) {
      if (row.up_bandwidth == 0) {
        return 0 + "Mbps";
      } else {
        return row.up_bandwidth + "Mbps";
      }
      //return (row[property] / 1000000).toFixed(6)
    },
    formatDown(row, column) {
      if (row.down_bandwidth == 0) {
        return 0 + "Mbps";
      } else {
        return row.down_bandwidth + "Mbps";
      }
      //return (row[property] / 1000000).toFixed(6)
    },
    formatCap(row, column) {
      if (row.total_cap == 0) {
        return 0;
      } else {
        return this.common.formatByteActive(row.total_cap);
      }
      //return (row[property] / 1000000).toFixed(6)
    },

    formatTime(row) {
      return this.common.getTimess(row.time_stamp * 1000);
    },
    getInfo() {
      var data = {
        dev_sn: "",
        nick_name: "",
        user_id: "",
        order: this.order,
        cur_page: this.pager.page - 1,
        start_time:
          this.start_time === ""
            ? 0
            : new Date(this.start_time).getTime() / 1000,
        end_time:
          this.end_time === "" ? 0 : new Date(this.end_time).getTime() / 1000,
      };
      if (this.judgeString(this.searchText)) {
        var arr = Object.keys(this.judgeString(this.searchText));
        data.query_type = arr.length === 0 ? 0 : 1;
        var param = Object.assign(this.judgeString(this.searchText), data);
      } else {
        this.$message.error("请输入正确的用户ID、用户昵称");
        return;
      }

      ptfs_query_user_profit_list(param)
        .then(res => {
          if (res.status === 0) {
            // this.tableData = res.data.profit_detail_list;
            this.yes_total_num = res.data.yes_total_num;
            this.yes_total_profit = res.data.yes_total_profit;
            this.pager.count = res.data.total_num;
            this.pager.rows = res.data.total_page;
            let teamarr = res.data.profit_detail_list;
            for (var i = 0; i < teamarr.length; i++) {
              teamarr[i].time_stamp = this.common.getTimess(
                teamarr[i].time_stamp * 1000
              );
            }
            this.tableData = teamarr;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    toexportExcel() {
      var data = {
        order: this.order,
        cur_page: this.pageActive,
        start_time:
          this.start_time === ""
            ? 0
            : new Date(this.start_time).getTime() / 1000,
        end_time:
          this.end_time === "" ? 0 : new Date(this.end_time).getTime() / 1000,
      };
      if (this.judgeString(this.searchText)) {
        var arr = Object.keys(this.judgeString(this.searchText));
        data.query_type = arr.length === 0 ? 0 : 1;
        var param = Object.assign(this.judgeString(this.searchText), data);
      } else {
        this.$message.error("请输入正确的用户ID、用户昵称");
        return;
      }

      query_node_info_list(param)
        .then(res => {
          if (res.status === 0) {
            this.pageActive = res.data.cur_page;
            if (res.data.cur_page >= res.data.total_page) {
              console.log(this.tableData2);
              this.exportExcel();
              this.common.monitoringLogs("导出", "导出收益明细", 1);
            } else {
              this.yes_total_num = res.data.yes_total_num;
              this.yes_total_profit = res.data.yes_total_profit;
              this.pager.count = res.data.total_num;
              this.pager.rows = res.data.total_page;
              let teamarr = res.data.profit_detail_list;
              for (var i = 0; i < teamarr.length; i++) {
                teamarr[i].time_stamp = this.common.getTimess(
                  teamarr[i].time_stamp * 1000
                );
              }
              this.tableData2 = this.tableData2.concat(teamarr);
              this.pageActive++;
              this.toexportExcel();
            }
          } else {
            this.common.monitoringLogs("导出", "导出收益明细", 0);
          }
        })
        .catch(error => {
          console.log(error);
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
      this.dialogVisible = true;
    },
    handleCurrentChange(val) {
      this.pager.page = val.val;
      this.getInfo();
    },
    judgeString(str) {
      const reg1 = /^\d{7}$/;
      const reg2 = /^[\u4E00-\u9FA5A-Za-z0-9]{4,20}$/;
      const reg7 = /^\d+$/;
      if (reg1.test(str)) {
        return {
          user_id: Number(str),
        };
      } else if (reg2.test(str) && !reg7.test(str)) {
        return {
          nick_name: str,
        };
      } else if (str === "") {
        return {};
      } else {
        return false;
      }
    },
  },
  components: {
    pageNation: pageNation,
    tableBarActive2: tableBarActive2,
    mySearch: mySearch,
  },
};
</script>

<style lang="less">
.user-title {
  margin-top: 30px;

  .user-item {
    background: #f2f2f2;
    padding: 25px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    flex-direction: column;

    .item-count,
    .item-text {
      display: flex;
      justify-content: center;
    }
  }
}

.myself-container {
  .el-table th > .cell {
    text-align: center;
  }

  .el-table .cell {
    text-align: center;
  }

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

  .search-con {
    width: 250px;
    height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid #999999;

    .search-input {
      .el-input__inner {
        border: none;
        background: none;
      }
    }
  }
}
</style>
