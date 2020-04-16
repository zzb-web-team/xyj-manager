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
                <tableBarcontribution id="rebateSetTable" ref="table1" tooltip-effect="dark" :tableData="tableData" @tableSortChange="tableSortChange" @handleSelectionChange="handleSelectionChange" :clomnSelection="clomnSelection" :rowHeader="rowHeader" :tableOption="tableOption" @disable="disable" @toDetails="toDetails" @changePassword="changePassword" @toDelete="toDelete"></tableBarcontribution>
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
import tableBarcontribution from "../../components/tableBarcontribution";
import mySearch from "../../components/mySearch";
import pageNation from "../../components/pageNation";
import { ptfs_query_con_value_list } from "../../api/api";
import common from "../../common/js/util.js";

export default {
  data() {
    return {
      orderActive: "",
      user_nick_name: "",
      dialogVisible: false,
      dialogVisible2: false,
      searchText: "",
      operatingStatus: false,
      clomnSelection: false,
      reserveselection: true,
      value1: "",
      value2: "",
      valueTime: "",
      rotate: false,
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
        bind_end_time: 0,
      },
      user_form: {
        normal_num: "",
        active_num: "",
        total_num: "",
      },
      options: [
        {
          value: "0",
          label: "全部",
        },
        {
          value: "1",
          label: "新增",
        },
        {
          value: "2",
          label: "扣除",
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
          prop: "user_nick_name",
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
          prop: "opt_active",
          label: "类型",
        },
        {
          prop: "type",
          label: "用户行为",
        },
        {
          prop: "opt_value",
          label: "变化值",
        },
        {
          prop: "total_value",
          label: "贡献值",
          // sortable: "custom"
        },
        {
          prop: "time_stamp",
          label: "日期",
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
      order: 0,
      ad_type: 0,
      tableDataActive: [],
      exportLinks:""
      
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
      // if (column.column.label == "平均算力") {
      //   if (column.column.order == "descending") {
      //     this.order = 6;
      //   } else {
      //     this.order = 7;
      //   }
      // } else if (column.column.label == "总积分") {
      //   if (column.column.order == "descending") {
      //     this.order = 4;
      //   } else {
      //     this.order = 5;
      //   }
      // } else if (column.column.label == "注册时间") {
      //   if (column.column.order == "descending") {
      //     this.order = 0;
      //   } else {
      //     this.order = 1;
      //   }
      // } else if (column.column.label == "首次绑定时间") {
      //   if (column.column.order == "descending") {
      //     this.order = 2;
      //   } else {
      //     this.order = 3;
      //   }
      // }
      this.pager.page = 1;
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

    addAccout() {
      this.dialogVisible = true;
    },

    onChange(item) {
      this.ad_type = item;
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
      this.ad_type = 0;
      this.queryUserList();
    },

    //获取用户列表
    queryUserList() {
      if (this.searchText == "") {
        this.user_nick_name = "";
      } else {
        this.user_nick_name = this.searchText;
      }
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
        (paramactive.node_grade = this.nodegrade),
          (paramactive.cur_page = this.pager.page - 1),
          (paramactive.order = this.order),
          (paramactive.ad_type = parseInt(this.ad_type));
      }

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

      ptfs_query_con_value_list(paramactive)
        .then(res => {
          if (res.status == 0) {
           
            let tempArr = [];
            tempArr = res.data.con_list;
            this.exportLinks=res.data.filename
            for (var i = 0; i < tempArr.length; i++) {
              if (tempArr[i].opt_value >= 0) {
                tempArr[i].opt_active = "新增";
              } else {
                tempArr[i].opt_active = "扣除";
              }
              tempArr[i].time_stamp = this.common.getTimes(
                tempArr[i].time_stamp * 1000
              );
              console.log(tempArr[i].type);
              switch (tempArr[i].type) {
                case 101:
                  tempArr[i].type = "绑定";
                  break;
                case 102:
                  tempArr[i].type = "解绑";
                  break;
                case 103:
                  tempArr[i].type = "在线"+tempArr[i].time_hour+"小时";
                  break;
                case 104:
                  tempArr[i].type = "离线"+tempArr[i].time_hour+"小时";
                  break;
                case 105:
                  tempArr[i].type = "宽带利用";
                  break;
                case 106:
                  tempArr[i].type = "磁盘利用";
                  break;
              }
              switch (tempArr[i].dev_id) {
                case 13:
                  tempArr[i].dev_id = "新增";
                  break;
                case 2:
                  tempArr[i].dev_id = "扣除";
                  break;
              }
            }
            this.tableData = tempArr;
            // this.tableDataActive
            this.pager.count = res.data.total_num;
          } else {
            this.$message({
              message: "后台服务无响应",
              type: "error",
            });
          }
        })
        .catch(error => {
          this.$message({
            message: "网络出错，请重新请求",
            type: "error",
          });
        });
    },
    //导出
    toexportExcel() {
       window.location.href = this.exportLinks
    
    },
    //分页
    handleCurrentChange(val) {
      this.pager.page = val.val;
      this.queryUserList();
    },
  },
  components: {
    pageNation: pageNation,
    tableBarcontribution: tableBarcontribution,
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
