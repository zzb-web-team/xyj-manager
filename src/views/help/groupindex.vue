<template>
<section class="myself-container">
  
    <div class="device_form">
        <el-form ref="form" :model="form">
            <el-row type="flex">
                <div class="search-con">
                    <i class="el-icon-search" @click="searchInfo" style="color:#606266"></i>
                    <el-input class="search-input" v-model="cat_name" placeholder="分组名称" @keyup.enter.native="onSubmitKey"></el-input>
                </div>
                <!-- <div @click="getShow()" class="div_show" style="color:#606266">筛选
                    <i
                class="el-icon-caret-bottom"
                :class="[rotate?'fa fa-arrow-down go':'fa fa-arrow-down aa']"
              ></i>
                </div> -->
            </el-row>
            <div v-show="showState">
                <!-- <el-row type="flex" class="row_activess">
                    <el-form-item label="节点等级" style="display: flex;">
                        <el-select v-model="form.statusText" placeholder="请选择" @change="onChange">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                 
                </el-row> -->
                <!-- <el-row type="flex" class="row_activess">
                    <el-form-item>
                        <el-button type="primary" style="margin-left:68px;" @click="onSumit()">确定</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="resetInfo">重置</el-button>
                    </el-form-item>
                </el-row> -->
            </div>

        </el-form>
    </div>
    <div class="devide_table">
        <el-row type="flex" class="row_active" style="display: flex;justify-content: flex-end;">
            <el-col style="display: flex;justify-content: flex-start;">
                <el-button type="primary" @click="onImport">新建</el-button>
            </el-col>
        </el-row>
        <el-row type="flex" class="row_active">
            <el-col :span="24">
                <tableBar id="rebateSetTable" ref="table1" tooltip-effect="dark" :tableData="tableData"  :operatingStatus="operatingStatus" @handleButton="handleButton" @tableSortChange="tableSortChange" @handleSelectionChange="handleSelectionChange" :clomnSelection="clomnSelection" :rowHeader="rowHeader" :tableOption="tableOption" @disable="disable" @toDetails="toDetails" @changePassword="changePassword" @toDelete="toDelete"></tableBar>
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
       <el-dialog :visible.sync="dialogVisibleGroup" width="25%" :before-close="handleClose">
        <el-form ref="form" >
             <el-form-item label="分组名称:"  style=":display: flex;justify-content: center; white-space: nowrap;  text-overflow:ellipsis">
                  <el-input v-model="groupvalue"  style="width:300px"></el-input>
            </el-form-item>
           
            <div style="text-align: center;">
                <el-button type="primary" @click="onSubmitGroup">确定</el-button>
                <el-button @click="dialogVisibleGroup=false">取消</el-button>
            </div>
        </el-form>
    </el-dialog>
      <el-dialog :visible.sync="dialogVisibleGroupEdit" width="25%" :before-close="handleClose">
        <el-form ref="form">
             <el-form-item label="分组名称:" style="display: flex;justify-content: center;">
                  <el-input v-model="groupEditvalue" style="width:350px;"></el-input>
            </el-form-item>
           
            <div style="text-align: center;">
                <el-button type="primary" @click="onSubmitGroupEdit">确定</el-button>
                <el-button @click="dialogVisibleGroupEdit=false">取消</el-button>
            </div>
        </el-form>
    </el-dialog>

</section>
</template>

<script>
import tableBar from "../../components/tableBar";
import mySearch from "../../components/mySearch";
import pageNation from "../../components/pageNation";
import {
  ptfs_query_node_grade,
  create_help_cat_info,
  query_help_cat_info,
  modify_help_cat_info,
  delete_help_cat_info,
} from "../../api/api";
import common from "../../common/js/util.js";

export default {
  data() {
    return {
      groupvalue: "",
      groupEditvalue: "",
      dialogVisibleGroup: false,
      dialogVisibleGroupEdit: false,
      dialogVisible: false,
      dialogVisible2: false,
      searchText: "",
      operatingStatus: true,
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
      rowHeader: [
        {
          prop: "cat_name",
          label: "分组名称",
        },
        {
          prop: "cat_owner",
          label: "修改人",
        },
        {
          prop: "cat_tm",
          label: "修改时间",
        },
      ],
      tableData: [],
      tableOption: {
        label: "操作",
        options: [
          {
            label: "修改",
            type: "primary",
            methods: "freeze",
          },
          {
            label: "删除",
            type: "delete",
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
      uname: "",
      cat_name: "",
      cat_id: "",
      cat_owner: "",
    };
  },
  mounted: function() {
    //this.queryUsersTotal();
    this.queryUserList();
    let tempInfo = JSON.parse(this.get("userInfo"));
    this.uname = tempInfo.username;
    this.uid = tempInfo.id;
    //this.queryInfoUser();
  },
  methods: {
    //字符长度限制
    getStringWidth(val) {
      let len = 0;
      for (let i = 0; i < val.length; i++) {
        let length = val.charCodeAt(i);
        if (length >= 0 && length <= 128) {
          len += 1;
        } else {
          len += 2;
        }
      }
      return len;
    },
    onSubmitGroupEdit() {
      if (this.getStringWidth(this.groupEditvalue) >= 30) {
        this.$message({
          message: "分组名称字符长度30个字符以内",
          type: "error",
        });
        return false;
      }

      if (this.groupEditvalue == "") {
        this.$message({
          message: "分组名称不能为空",
          type: "error",
        });
        return false;
      }
      var fsdusername = /^[a-zA-Z\u4e00-\u9fa5]+$/;
      if (fsdusername.test(this.groupEditvalue) === false) {
        this.$message({
          message: "分组名称英文和汉字组成",
          type: "error",
        });
        return false;
      }

      let param = new Object();
      param.cat_id = this.cat_id;
      param.cat_owner = this.cat_owner;
      param.cat_name = this.groupEditvalue;
      modify_help_cat_info(param).then(res => {
        if (res.status == 0) {
          this.$message({
            message: "修改成功",
            type: "success",
          });
                  this.common.monitoringLogs("修改", "修改分组管理", 1);

          this.dialogVisibleGroupEdit = false;
        } else if (res.status == -1) {
          this.$message({
            message: "分组名称不能重复",
            type: "error",
          });
                  this.common.monitoringLogs("修改", "修改分组管理", 0);

        } else {
          this.$message({
            message: "修改失败",
            type: "success",
          });
                  this.common.monitoringLogs("修改", "修改分组管理", 0);

          this.dialogVisibleGroupEdit = false;
        }
        this.queryUserList();
      });
    },
    //修改和删除
    handleButton(val, row) {
      if (val.methods == "freeze") {
        this.dialogVisibleGroupEdit = true;
        this.groupEditvalue = val.row.cat_name;
        (this.cat_id = val.row.cat_id), (this.cat_owner = this.uname);
      } else {
        this.$confirm("确定要删除吗?", "提示", {
          type: "warning",
        })
          .then(() => {
            let param = new Object();
            param.cat_id = val.row.cat_id;
            delete_help_cat_info(param)
              .then(res => {
                if (res.status == 0) {
                  this.$message({
                    message: "删除成功",
                    type: "success",
                  });
                          this.common.monitoringLogs("删除", "删除分组管理", 1);

                } else {
                  this.$message({
                    message: "删除失败",
                    type: "success",
                  });
                          this.common.monitoringLogs("删除", "删除分组管理", 0);

                }
                this.queryUserList();
              })
              .catch(error => {});
          })
          .catch(() => {});
      }
    },
    get: function(name) {
      var v = window.document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
      return v ? v[2] : null;
    },
    onSubmitGroup() {
      if (this.getStringWidth(this.groupvalue) >= 30) {
        this.$message({
          message: "分组名称字符长度30个字符以内",
          type: "error",
        });
        return false;
      }

      if (this.groupvalue == "") {
        this.$message({
          message: "分组名称不能为空",
          type: "error",
        });
        return false;
      }
      var fsdusername = /^[a-zA-Z\u4e00-\u9fa5]+$/;
      if (fsdusername.test(this.groupvalue) === false) {
        this.$message({
          message: "分组名称由英文和汉字组成",
          type: "error",
        });
        return false;
      }
      let param = new Object();
      (param.cat_name = this.groupvalue), (param.cat_owner = this.uname);
      create_help_cat_info(param)
        .then(res => {
          if (res.status == 0) {
            this.$message({
              message: "创建成功",
              type: "success",
            });
                                      this.common.monitoringLogs("新增", "新增分组管理", 1);

            this.dialogVisibleGroup = false;
          } else if (res.status == -1) {
            this.$message({
              message: "分组名称不能重复",
              type: "error",
            });
            this.common.monitoringLogs("新增", "新增分组管理", 0);
          } else {
            this.$message({
              message: "创建失败",
              type: "error",
            });
            this.common.monitoringLogs("新增", "新增分组管理", 0);
            this.dialogVisibleGroup = false;
          }
          this.queryUserList();
        })
        .catch(error => {});
    },
    //新建
    onImport() {
      this.dialogVisibleGroup = true;
      this.groupvalue = "";
    },
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
 

    addAccout() {
      this.dialogVisible = true;
    },

    //回车键绑定事件
    onSubmitKey() {
      this.queryUserList();
    },
    //重置
    resetInfo() {
      this.pager.page = 1;
      (this.nodegrade = 0), (this.user_nick_name = "");
      this.queryUserList();
    },

    //获取用户列表
    queryUserList() {
 

      let paramactive = new Object();
      {
        (paramactive.page_no = this.pager.page - 1),
          (paramactive.page_size = 10);

        (paramactive.cat_name = this.cat_name), (paramactive.cat_order = 0);
      }

      query_help_cat_info(paramactive)
        .then(res => {
          console.log(res);
          if (res.status == 0) {
            if (res.data.cat_list) {
              this.pager.count = res.data.total_num;
              let tempArr = [];

              tempArr = res.data.cat_list;
              for (var i = 0; i < tempArr.length; i++) {
                if (tempArr[i].cat_tm == 0) {
                  tempArr[i].cat_tm = 0;
                } else {
                  tempArr[i].cat_tm = this.common.getTimes(
                    tempArr[i].cat_tm * 1000
                  );
                }
              }
              this.tableData = tempArr;
            }
          } else {
            this.$message({
              message: "后台服务无响应",
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
 
    //分页
    handleCurrentChange(val) {
      this.pager.page = val.val;
      this.queryUserList();
    },
  },
  components: {
    pageNation: pageNation,
    tableBar: tableBar,
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
