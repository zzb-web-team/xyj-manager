<template>
<section class="myself-container">
  
    <div class="device_form">
        <el-form ref="form" :model="form">
            <el-row type="flex">
                <div class="search-con">
                    <i class="el-icon-search" @click="searchInfo" style="color:#606266"></i>
                    <el-input class="search-input" v-model="searchText" placeholder="用户昵称，节点编号" @keyup.enter.native="onSubmitKey"></el-input>
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
                    <el-form-item label="节点等级" style="display: flex;">
                        <el-select v-model="form.statusText" placeholder="请选择" @change="onChange">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
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
                <el-button type="primary" :disabled="exportStatus" @click="toexportExcel">导出</el-button>
            </el-col>
        </el-row>
        <el-row type="flex" class="row_active">
            <el-col :span="24">
                <tableBarminging id="rebateSetTable" ref="table1" tooltip-effect="dark" :tableData="tableData" @tableSortChange="tableSortChange" @handleSelectionChange="handleSelectionChange" :clomnSelection="clomnSelection" :rowHeader="rowHeader" :tableOption="tableOption" @disable="disable" @toDetails="toDetails" @changePassword="changePassword" @toDelete="toDelete"></tableBarminging>
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
import tableBarminging from "../../components/tableBarminging";
import mySearch from "../../components/mySearch";
import pageNation from "../../components/pageNation";
import { ptfs_query_node_grade } from "../../api/api";
import common from "../../common/js/util.js";

export default {
  data() {
    return {
      exportStatus: true,
      dialogVisible: false,
      dialogVisible2: false,
      searchText: "",
      operatingStatus: false,
      clomnSelection: false,
      reserveselection: true,
      rotate: false,
      value1: "",
      value2: "",
      valueTime: "",
      valueTime1: "",
      form: {
        user_id: "",
        user_name: "",
        tel_num: "",
        order: 0,
        sex: "全部",
        account_status: 0,
        statusText: "全部",
        statusActiveText: "全部",
        active_status: 0,
        reg_start_time: 0,
        reg_end_time: 0,
        bind_start_time: 0,
        bind_end_time: 0,
      },
      user_form: {
        normal_num: "",
        active_num: "",
        total_num: "",
      },
      options: [
        {
          value: "-1",
          label: "全部",
        },
        {
          value: "0",
          label: "普通节点",
        },
        {
          value: "2000",
          label: "黄金节点",
        },
        {
          value: "6000",
          label: "铂金节点",
        },
        {
          value: "18000",
          label: "钻石节点",
        },
      ],
      options2: [
        {
          value: "0",
          label: "全部",
        },
        {
          value: "1",
          label: "男",
        },
        {
          value: "2",
          label: "女",
        },
      ],

      rowHeader: [
        {
          prop: "user_id",
          label: "用户ID",
        },
        {
          prop: "nick_name",
          label: "用户昵称",
        },
        {
          prop: "node_index",
          label: "节点编号",
        },
        {
          prop: "node_id",
          label: "节点ID",
        },

        {
          prop: "node_lve",
          label: "节点等级",
        },
        {
          prop: "total_value",
          label: "节点贡献值",
          sortable: "custom",
        },
      ],
      tableData: [],
      tableOption: {
        label: "操作",
        options: [
          {
            label: "详情",
            type: "primary",
            methods: "freeze",
          },
          {
            label: "冻结",
            type: "danger",
            methods: "clickOff",
          },
        ],
      },
      pager: {
        count: 0,
        page: 1,
        rows: 100,
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
      nodegrade: 0,
      user_nick_name: "",
      exportLinks: "",
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
      this.pager.page = 1;
      if (column.order == "descending") {
        this.order = 0;
      } else {
        this.order = 1;
      }

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

    //跳转至详情
    toDetails(val) {
      console.log(val);

      this.$router.push({
        path: "/userInfo",
        query: {
          user_id: val.user_id,
          reg_time: val.first_login_time,
          reg_time1: val.first_bind_time,
        },
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
        if (param.forbid_status == 1) {
          if (res.status == 0) {
            this.$message({
              message: "冻结成功",
              type: "success",
            });
            this.queryUserList();
            this.common.monitoringLogs("修改", "冻结账户", 1);
          } else {
            this.$message({
              message: `${res.err_msg}`,
              type: "error",
            });
            this.common.monitoringLogs("修改", "冻结账户", 0);
          }
        } else {
          if (res.status == 0) {
            this.$message({
              message: "解冻成功",
              type: "success",
            });
            this.queryUserList();
            this.common.monitoringLogs("修改", "解冻账户", 1);
          } else {
            this.$message({
              message: `${res.err_msg}`,
              type: "error",
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
              type: "error",
            });
          }
        })
        .catch(error => {
          this.$message({
            message: "后台服务无响应",
            type: "error",
          });
        });
    },
    onChange(item) {
      console.log(item);
      this.nodegrade = item;
      this.queryUserList();
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
      (this.nodegrade = 0), (this.user_nick_name = "");
      this.queryUserList();
    },

    //获取用户列表
    queryUserList() {
      let paramactive = new Object();
      let phoneNumber = /^[0-9]*[1-9][0-9]*$/;
      if (this.searchText != "") {
        if (phoneNumber.test(this.searchText) == true) {
          paramactive.user_nick_name = "";
          paramactive.node_index = parseInt(this.searchText);
        } else {
          paramactive.user_nick_name = this.searchText;
          paramactive.node_index = 0;
        }
      } else {
        paramactive.user_nick_name = "";
        paramactive.node_index = 0;
      }
      {
        (paramactive.node_grade = parseInt(this.nodegrade)),
          (paramactive.cur_page = this.pager.page - 1),
          (paramactive.order = this.order);
      }

      ptfs_query_node_grade(paramactive)
        .then(res => {
          console.log(res);
          if (res.status == 0) {
            console.log(res);
            if (res.data.con_value_list) {
              if ((res.data.con_value_list.length == 0)) {
                this.exportStatus = true;
              } else {
                this.exportStatus = false;
              }

              this.exportLinks = res.data.filename;

              this.pager.count = res.data.total_num;
              this.tableData = [];
              let tempArr = [];

              tempArr = res.data.con_value_list;
              for (var i = 0; i < tempArr.length; i++) {
                if (
                  tempArr[i].total_value >= 0 &&
                  tempArr[i].total_value < 2000
                ) {
                  tempArr[i].node_lve = "普通节点";
                } else if (
                  tempArr[i].total_value >= 2000 &&
                  tempArr[i].total_value < 6000
                ) {
                  tempArr[i].node_lve = "黄金节点";
                } else if (
                  tempArr[i].total_value >= 6000 &&
                  tempArr[i].total_value < 18000
                ) {
                  tempArr[i].node_lve = "铂金节点";
                } else if (tempArr[i].total_value >= 18000) {
                  tempArr[i].node_lve = "钻石节点";
                }
                this.tableData = tempArr;
              }
            }
          } else {
            this.$message({
              message: "后台服务无响应",
              type: "error",
            });
          }
        })
        .catch(error => {
          console.log(error);
          this.$message({
            message: "后台服务无响应",
            type: "error",
          });
        });
    },
    //导出
    toexportExcel() {
      this.common.monitoringLogs("导出", "贡献值明细", 1);
      window.location.href = this.exportLinks;
    },
    //分页
    handleCurrentChange(val) {
      this.pager.page = val.val;
      this.queryUserList();
    },
  },
  components: {
    pageNation: pageNation,
    tableBarminging: tableBarminging,
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
