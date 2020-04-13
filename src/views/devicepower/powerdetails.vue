<template>
<section class="myself-container">
  
    <div class="device_form">
        <el-form ref="form" :model="form">
            <el-row type="flex">
                <div class="search-con">
                    <i class="el-icon-search" @click="searchInfo" style="color:#606266"></i>
                    <el-input class="search-input" v-model="searchText" placeholder="设备SN，用户ID" @keyup.enter.native="onSubmitKey"></el-input>
                </div>
                <div @click="getShow()" class="div_show" style="color:#606266">筛选
                             <i
                class="el-icon-caret-bottom"
                :class="[rotate?'fa fa-arrow-down go':'fa fa-arrow-down aa']"
              ></i>
                </div>
            </el-row>
            <div v-show="showState">
                <el-row type="flex" class="row_activess">
                    <el-form-item label="类型" style="display: flex;">
                        <el-select v-model="form.statusText" placeholder="请选择" @change="onChange">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                        <el-form-item label="时间" style="display: flex;">
                        <el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                 
                </el-row>
                <el-row type="flex" class="row_activess">
                    <el-form-item>
                        <el-button type="primary" style="margin-left:68px;" @click="onSumit()">确定</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="resetInfo">重置</el-button>
                    </el-form-item>
                </el-row>
            </div>

        </el-form>
    </div>
    <div class="devide_table">
        <el-row type="flex" class="row_active" style="display: flex;justify-content: flex-end;">
            <el-col style="display: flex;justify-content: flex-end;">
                <el-button type="primary" @click="toexportExcel">导出</el-button>
            </el-col>
        </el-row>
        <el-row type="flex" class="row_active">
            <el-col :span="24">
                <tableBarpower id="rebateSetTable" ref="table1" tooltip-effect="dark" :tableData="tableData" @tableSortChange="tableSortChange" @handleSelectionChange="handleSelectionChange" :clomnSelection="clomnSelection" :rowHeader="rowHeader" :tableOption="tableOption" @disable="disable" @toDetails="toDetails" @changePassword="changePassword" @toDelete="toDelete"></tableBarpower>
            </el-col>
        </el-row>
    </div>
    <div class="devide_pageNation" style="display: flex;justify-content: space-between;">
        <el-row type="flex">

        </el-row>
        <el-row type="flex">
            <el-col :span="6">
                <pageNation :pager="pager" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"></pageNation>
            </el-col>
        </el-row>

    </div>

</section>
</template>

<script>
import tableBarpower from "../../components/tableBarpower";
import mySearch from "../../components/mySearch";
import pageNation from "../../components/pageNation";
import {
  ptfs_query_node_info_list
} from "../../api/api";
import common from "../../common/js/util.js";

export default {
  data() {
    return {
       rotate: false,
      dialogVisible: false,
      dialogVisible2: false,
      searchText: "",
      operatingStatus: false,
      clomnSelection: false,
      reserveselection: true,
      value1: "",
      value2: "",
      valueTime: "",
      valueTime1: "",
      form: {
        user_id: "",
        user_name: "",
        tel_num: "",
        sex: "全部",
        account_status: 0,
        statusText: "全部",
        statusActiveText: "全部",
        active_status: 0,
        reg_start_time: 0,
        reg_end_time: 0,
        bind_start_time: 0,
        bind_end_time: 0
      },
      user_form: {
        normal_num: "",
        active_num: "",
        total_num: ""
      },
      options: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "新增"
        },
         {
          value: "2",
          label: "扣除"
        },
     
      ],
      options2: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "男"
        },
        {
          value: "2",
          label: "女"
        }
      ],

      rowHeader: [
        {
          prop: "dev_sn",
          label: "设备SN"
        },
        {
          prop: "user_id",
          label: "绑定用户ID"
        },
        {
          prop: "opt_active",
          label: "类型"
        },
        {
          prop: "type",
          label: "用户行为"
        },
       
        {
          prop: "opt_value",
          label: "变化值"
        },
        {
          prop: "total_value",
          label: "算力值"
        },
          {
          prop: "time_stamp",
          label: "日期",
          sortable: "custom"
        },

      ],
      tableData: [],
      tableOption: {
        label: "操作",
        options: [
          {
            label: "详情",
            type: "primary",
            methods: "freeze"
          },
          {
            label: "冻结",
            type: "danger",
            methods: "clickOff"
          }
        ]
      },
      pager: {
        count: 0,
        page: 1,
        rows: 100
      },

      showState: false,
      user_ids: [],
      tempdataArr1: [],
      tempdataArr2: [],
      order: 0,
      user_status: -1,
      user_sex: "",
      tableData2: [],
      pageActive: 0,
      pageActives: 1,
      ad_type:0,
      order:0
    };
  },
  mounted: function() {
    //this.queryUsersTotal();
    this.queryUserList();
    //this.queryInfoUser();
  },
  methods: {
    //排序
    tableSortChange(column, prop, order) {
         if (column.order == "descending") {
        this.order = 0;
      } else {
        this.order = 1;
      }

      this.pager.page = 1;
      // if (column.order == "descending") {
      //     this.order = 0
      // } else {
      //     this.order = 1
      // }
      this.queryUserList();
    },
    //绑定用户数查询
    queryInfoUser() {
      let param = new Object();
      (param.login_token = ""), (param.create_time = "");
      query_binded_user_cnt(param)
        .then(res => {
          if (res.status == 0) {
            if (res.data) {
              this.user_form.normal_num = res.data.binded_user_cnt;
            } else {
            }
          } else {
            this.user_form.normal_num = 0;
          }
        })
        .catch(error => {});
    },
    queryInfo() {},
    onSumit() {
      this.pager.page = 1;
      this.queryUserList();
    },
    searchInfo() {},
    getShow() {
      this.showState = !this.showState;
      this.rotate = !this.rotate;
    },
    //导出的方法

    exportExcel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("../../excel/Export2Excel");
        const tHeader = [
          "用户ID",
          "用户昵称",
          "手机号",
          "性别",
          "总积分",
          "平均算力",
          "设备总数",
          "注册时间",
          "首次绑定时间",
          "状态"
        ];
        // 上面设置Excel的表格第一行的标题
        const filterVal = [
          "user_id",
          "user_name",
          "user_tel",
          "sex",
          "sum_profit",
          "average_store",
          "dev_num",
          "first_login_time",
          "first_bind_time",
          "account_status"
        ];
        // 上面的index、nickName、name是tableData里对象的属性
        const list = this.tableData2; //把data里的tableData存到list
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "用户注册信息");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    //跳转至详情
    toDetails(val) {
      console.log(val);

      this.$router.push({
        path: "/userInfo",
        query: {
          user_id: val.user_id,
          reg_time: val.first_login_time,
          reg_time1: val.first_bind_time
        }
      });
    },
    //冻结，解冻
    disable(val) {
      console.log(val);
      let param = new Object();
      if (val.account_status == "正常") {
        param.forbid_status = 1;
      } else {
        param.forbid_status = 0;
      }

      let usr_id_list = [];
      usr_id_list[0] = val.user_id;
      param.usr_id_list = usr_id_list;

      ptfs_forbid_users(param).then(res => {
        if ((param.forbid_status == 1)) {
          if (res.status == 0) {
            this.$message({
              message: "冻结成功",
              type: "success"
            });
            this.queryUserList();
            this.common.monitoringLogs("修改", "冻结账户", 1);
          } else {
            this.$message({
              message: `${res.err_msg}`,
              type: "error"
            });
            this.common.monitoringLogs("修改", "冻结账户", 0);
          }
        } else {
          if (res.status == 0) {
            this.$message({
              message: "解冻成功",
              type: "success"
            });
            this.queryUserList();
            this.common.monitoringLogs("修改", "解冻账户", 1);
          } else {
            this.$message({
              message: `${res.err_msg}`,
              type: "error"
            });
            this.common.monitoringLogs("修改", "解冻账户", 0);
          }
        }
      });
    },

    addAccout() {
      this.dialogVisible = true;
    },
    //获取注册用户和绑定用户
    queryUsersTotal() {
      let param = new Object();
      ptfs_query_total_users(param)
        .then(res => {
          if (res.status == 0 && res.err_code == 0) {
            if (res.data) {
              this.user_form.active_num = res.data.active_num;
              this.user_form.total_num = res.data.total_num;
            } else {
            }
          } else {
            this.$message({
              message: `${res.err_msg}`,
              type: "error"
            });
          }
        })
        .catch(error => {
          this.$message({
            message: "后台服务无响应",
            type: "error"
          });
        });
    },
    onChange(item) {
      this.form.account_status = parseInt(item);
      this.ad_type=item
      this.queryUserList()
      // if (item == 0) {
      //   this.form.statusText = "全部";
      //   this.user_status = -1;
      // } else if (item == 1) {
      //   this.user_status = 0;
      //   this.form.statusText = "正常";
      // } else if (item == 2) {
      //   this.user_status = 1;
      //   this.form.statusText = "冻结";
      // }
    },
    onChange1(item) {
      this.form.active_status = parseInt(item);
      if (item == 0) {
        this.form.statusActiveText = "全部";
      } else if (item == 1) {
        this.form.statusActiveText = "否";
      } else if (item == 2) {
        this.form.statusActiveText = "是";
      }
    },
    onChange2(item) {
      console.log(item);
      if (item == 0) {
        this.form.sex = "全部";
        this.user_sex = "";
      } else if (item == 1) {
        this.form.sex = "男";
        this.user_sex = "男";
      } else if (item == 2) {
        this.form.sex = "女";
        this.user_sex = "女";
      }
    },
    //回车键绑定事件
    onSubmitKey() {
      this.queryUserList();
    },
    //重置
    resetInfo() {
      this.pager.page = 1;
      this.searchText = "";
      this.value = "";
      this.form.sex = "全部";
      this.form.statusText = "全部";
      this.form.account_status = 0;
      this.form.active_status = 0;
      this.value2 = "";
      this.value1 = "";
      this.user_sex = "";
      this.user_status = -1;
      this.queryUserList();
    },

    //获取用户列表
    queryUserList() {
      let param = new Object();
      let phoneNumber = /^1(3|4|5|7|8)\d{9}$/;
      let user_id = /^\d{7}$/;
      // if (this.searchText != "") {
      //   if (phoneNumber.test(this.searchText) == true) {
      //     param.user_id = 0;
      //     param.user_tel = this.searchText;
      //     param.user_name = "";
      //   } else if (user_id.test(this.searchText) == true) {
      //     param.user_id = parseInt(this.searchText);
      //     param.user_tel = "";
      //     param.user_name = "";
      //   } else {
      //     param.user_id = 0;
      //     param.user_tel = "";
      //     param.user_name = this.searchText;
      //   }
      // } else {
      //   param.user_id = "";
      //   param.user_tel = "";
      //   param.user_name = "";
      // }
      // param.user_status = this.user_status;
      // param.user_sex = this.user_sex;
      // param.cur_page = this.pager.page - 1;
      // param.order = this.order;

    
      // let routerparam = JSON.stringify(param);
      // localStorage.setItem("routerparam", routerparam);
      let paramactive=new Object()
     
     paramactive.order= this.order,
     paramactive.user_id= 0,
     paramactive.dev_sn=this.searchText,
     paramactive.ad_type= parseInt(this.ad_type),
     paramactive.cur_page= this.pager.page - 1,
     paramactive.start_time= 0,
     paramactive.end_time= 2493043200
       if (!this.value1) {
        paramactive.start_time = 0;
        paramactive.end_time = 2493043200;
      } else {
        if (this.value1[0] == undefined) {
          paramactive.start_time = 0;
        } else {
          paramactive.start_time = this.value1[0].getTime() / 1000;
        }
        if (this.value1[1] == undefined) {
          paramactive.end_time = 2493043200;
        } else {
          paramactive.end_time = this.value1[1].getTime() / 1000;
        }
      }
      ptfs_query_node_info_list(paramactive)
        .then(res => {
          if (res.status == 0) {
            console.log(res);
            let tempArr = [];
           

            tempArr = res.data.cp_list;
            for (var i = 0; i < tempArr.length; i++) {
              // tempArr[i].average_store = tempArr[i].average_store / 1000000;
              // tempArr[i].sum_profit = tempArr[i].sum_profit / 1000000;
              // if (tempArr[i].first_bind_time == 0) {
              //   tempArr[i].first_bind_time = 0;
              // } else {
              //   tempArr[i].first_bind_time = this.common.getTimes(
              //     tempArr[i].first_bind_time * 1000
              //   );
              // }
              // if (tempArr[i].first_login_time == 0) {
              //   tempArr[i].first_login_time = 0;
              // } else {
              //   tempArr[i].first_login_time = this.common.getTimes(
              //     tempArr[i].first_login_time * 1000
              //   );
              // }
                  tempArr[i].time_stamp = this.common.getTimes(
                  tempArr[i].time_stamp  * 1000
                );
                  switch (tempArr[i].type){
                       case 201:
                 tempArr[i].type="等级升级"
                   case 202:
                 tempArr[i].type="绑定"
                   break;
                  case 203:
                 tempArr[i].type="解绑"
                   break;
                       case 204:
                 tempArr[i].type="用户签到"
                   break;
                       case 205:
                 tempArr[i].type="在线24个小时"
                   break;
                       case 206:
                 tempArr[i].type="离线一次 扣除一分， 最多扣除3次 "
                   break;
             
                  

               }
              if (tempArr[i].opt_value >= 0) {
                tempArr[i].opt_active = "新增";
              } else {
                tempArr[i].opt_active = "扣除";
              }
            }
            this.tableData = tempArr;
            this.pager.count = res.data.total_num;
          } else {
            this.$message({
              message: "后台服务无响应",
              type: "error"
            });
          }
        })
        .catch(error => {
          this.$message({
            message: "网络出错，请重新请求",
            type: "error"
          });
        });
    },
    //导出
    toexportExcel() {
      let param = new Object();
      let phoneNumber = /^1(3|4|5|7|8)\d{9}$/;
      let user_id = /^\d{7}$/;
      if (this.searchText != "") {
        if (phoneNumber.test(this.searchText) == true) {
          param.user_id = 0;
          param.user_tel = this.searchText;
          param.user_name = "";
        } else if (user_id.test(this.searchText) == true) {
          param.user_id = parseInt(this.searchText);
          param.user_tel = "";
          param.user_name = "";
        } else {
          param.user_id = 0;
          param.user_tel = "";
          param.user_name = this.searchText;
        }
      } else {
        param.user_id = "";
        param.user_tel = "";
        param.user_name = "";
      }
      param.user_status = this.user_status;
      param.user_sex = this.user_sex;
      param.cur_page = this.pageActives - 1;
      param.order = this.order;

      if (!this.value1) {
        param.reg_start_time = 0;
        param.reg_end_time = 0;
      } else {
        if (this.value1[0] == undefined) {
          param.reg_start_time = 0;
        } else {
          param.reg_start_time = this.value1[0].getTime() / 1000;
        }
        if (this.value1[1] == undefined) {
          param.reg_end_time = 0;
        } else {
          param.reg_end_time = this.value1[1].getTime() / 1000;
        }
      }
      if (!this.value2) {
        param.bind_start_time = 0;
        param.bind_end_time = 0;
      } else {
        if (this.value2[0] == undefined) {
          param.bind_start_time = 0;
        } else {
          param.bind_start_time = this.value2[0].getTime() / 1000;
        }
        if (this.value2[1] == undefined) {
          param.bind_end_time = 0;
        } else {
          param.bind_end_time = this.value2[1].getTime() / 1000;
        }
      }
      ptfs_query_list_user_store_list(param)
        .then(res => {
          if (res.status == 0 && res.err_code == 0) {
            let tempArr = [];
            tempArr = res.data.store_list;
            for (var i = 0; i < tempArr.length; i++) {
              tempArr[i].average_store = tempArr[i].average_store / 1000000;
              tempArr[i].sum_profit = tempArr[i].sum_profit / 1000000;
              if (tempArr[i].first_bind_time == 0) {
                tempArr[i].first_bind_time = 0;
              } else {
                tempArr[i].first_bind_time = this.common.getTimes(
                  tempArr[i].first_bind_time * 1000
                );
              }
              if (tempArr[i].first_login_time == 0) {
                tempArr[i].first_login_time = 0;
              } else {
                tempArr[i].first_login_time = this.common.getTimes(
                  tempArr[i].first_login_time * 1000
                );
              }
              if (tempArr[i].account_status == 0) {
                tempArr[i].account_status = "正常";
              } else {
                tempArr[i].account_status = "冻结";
              }
            }

            this.tableData2 = this.tableData2.concat(tempArr);

            if (this.pageActives >= res.data.total_page) {
              console.log(this.pageActives);
              this.common.monitoringLogs("导出", "导出注册用户信息表", 1);
              this.exportExcel();
            } else {
              this.pageActives++;
              this.toexportExcel();
            }
          } else {
            this.$message({
              message: "后台服务无响应",
              type: "error"
            });
            this.common.monitoringLogs("导出", "导出注册用户信息表", 0);
          }
        })
        .catch(error => {
          console.log(error);
          this.$message({
            message: "后台服务无响应",
            type: "error"
          });
        });
    },
    //分页
    handleCurrentChange(val) {
      this.pager.page = val.val;
      this.queryUserList();
    }
  },
  components: {
    pageNation: pageNation,
    tableBarpower: tableBarpower,
    mySearch: mySearch
  }
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

    box-sizing: border-box;

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
