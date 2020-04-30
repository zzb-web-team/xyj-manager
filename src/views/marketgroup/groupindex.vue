<template>
  <section class="myself-container">
    <div class="devide_table">
      <el-row type="flex" class="row_active" style="display: flex;justify-content: flex-start;">
        <el-col style="display: flex;justify-content: flex-start;">
          <el-button type="primary" @click="addmarket">新增应用分组</el-button>
        </el-col>
      </el-row>
      <el-row type="flex" class="row_active">
        <el-col :span="24">
          <tableBar id="rebateSetTable" ref="table1" tooltip-effect="dark" :tableData="tableData" :operatingStatus="operatingStatus" @handleButton="handleButton" @tableSortChange="tableSortChange" @handleSelectionChange="handleSelectionChange" :clomnSelection="clomnSelection" :rowHeader="rowHeader" :tableOption="tableOption" @disable="disable" @toDetails="toDetails" @changePassword="changePassword" @toDelete="toDelete"></tableBar>
          <!-- <tableBar id="rebateSetTable" ref="table1" tooltip-effect="dark" :tableData="tableData" @tableSortChange="tableSortChange" @handleSelectionChange="handleSelectionChange" :clomnSelection="clomnSelection" :rowHeader="rowHeader" :tableOption="tableOption" @disable="disable" @toDetails="toDetails" @changePassword="changePassword" @toDelete="toDelete"></tableBar> -->
        </el-col>
      </el-row>
    </div>
    <div class="devide_pageNation" style="display: flex;justify-content: space-between;">
      <!-- <el-row type="flex">
            <el-col :span="6" style="display: flex;justify-content: justify-content: flex-start;">
                <el-button type="primary" size="small" @click="allOn">发布</el-button>
                <el-button type="primary" size="small" @click="allOff">下架</el-button>
            </el-col>
     

      </el-row>-->
      <el-row type="flex">
        <el-col :span="6">
          <pageNation :pager="pager" @handleSizeChange="handleSizeChange1" @handleCurrentChange="handleCurrentChange1"></pageNation>
        </el-col>
      </el-row>
    </div>
    <el-dialog :visible.sync="dialogVisibleGroupEdit" width="20%" :before-close="handleClose">
      <el-form ref="form">
        <h3 style="width: 100%;
    border-bottom: 1px solid #999999;
    padding-bottom: 20px;
    text-align: center;">新增应用分组</h3>
        <el-form-item label="分组名称:">
          <el-input v-model="groupform.group_name"></el-input>
        </el-form-item>
        <el-form-item label="关联应用">
          <el-button type="primary" @click="addrelate">添加</el-button>
        </el-form-item>
        <el-form-item label>
          <el-input type="textarea" v-model="app_arrayname" style="width:240px;" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="分组说明:">
          <el-input v-model="groupform.group_describe"></el-input>
        </el-form-item>
        <el-form-item label="是否推荐到首页:">
          <el-select v-model="is_recommend" placeholder="请选择"  style="width:143px;">
            <el-option label="推荐" value="1">
            </el-option>
            <el-option label="不推荐" value="0">
            </el-option>
          </el-select>
        </el-form-item>

        <div style="text-align: center;">
          <el-button type="primary" @click="onSubmitaddgroup">保存</el-button>
          <el-button @click="dialogVisibleGroupEdit=false">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisibleGroupEdit1" width="25%" :before-close="handleClose">
      <el-form ref="form">
        <h3 style="width: 100%;
    border-bottom: 1px solid #999999;
    padding-bottom: 20px;
    text-align: center;">编辑应用分组</h3>
        <el-form-item label="分组名称:">
          <el-input v-model="groupformupdate.group_name"></el-input>
        </el-form-item>
        <el-form-item label="关联应用">
          <el-button type="primary" @click="addrelate">添加</el-button>
        </el-form-item>
        <el-form-item label>
          <el-input type="textarea" v-model="app_arrayname" style="width:240px;" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="分组说明:">
          <el-input v-model="groupformupdate.group_describe"></el-input>
        </el-form-item>
          <el-form-item label="是否推荐到首页:">
          <el-select v-model="is_recommend" placeholder="请选择" style="width:143px;">
            <el-option label="推荐" value="1">
            </el-option>
            <el-option label="不推荐" value="0">
            </el-option>
          </el-select>
        </el-form-item>

        <div style="text-align: center;">
          <el-button type="primary" @click="onSubmitgroupupadte">保存</el-button>
          <el-button @click="dialogVisibleGroupEdit1=false">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisiblereleta" width="45%" :before-close="handleClose">
      <div class="device_form">
        <el-form ref="form" :model="form">
          <el-row type="flex">
            <div class="search-con">
              <i class="el-icon-search" @click="searchInfo" style="color:#606266"></i>
              <el-input class="search-input" v-model="group_app_name" placeholder="  请输入你要搜索的应用" @keyup.enter.native="onSubmitKey"></el-input>
            </div>
            <el-button type="primary" style="margin-left:68px;" @click="onSeach()">确定</el-button>
          </el-row>
        </el-form>
      </div>
      <el-row type="flex" class="row_active">
        <el-col :span="24">
          <tableBar id="rebateSetTable" ref="table1" tooltip-effect="dark" :tableData="tableData1" :operatingStatus="operatingStatus1" @handleButton="handleButton1" @tableSortChange="tableSortChange" @handleSelectionChange="handleSelectionChange1" :clomnSelection="clomnSelection" :rowHeader="rowHeader1" :tableOption="tableOption" @disable="disable" @toDetails="toDetails" @changePassword="changePassword" @toDelete="toDelete"></tableBar>
          <!-- <tableBar id="rebateSetTable" ref="table1" tooltip-effect="dark" :tableData="tableData" @tableSortChange="tableSortChange" @handleSelectionChange="handleSelectionChange" :clomnSelection="clomnSelection" :rowHeader="rowHeader" :tableOption="tableOption" @disable="disable" @toDetails="toDetails" @changePassword="changePassword" @toDelete="toDelete"></tableBar> -->
        </el-col>
      </el-row>

      <div class="devide_pageNation" style="display: flex;justify-content: space-between;">
        <el-row type="flex">已选择{{this.tabcount}}个应用</el-row>
        <el-row type="flex">
          <el-col :span="6">
            <pageNation :pager="pager1" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"></pageNation>
          </el-col>
        </el-row>
      </div>
      <div style="text-align: center;margin-top:30px;">
        <el-button type="primary" @click="onSubmitreleta">确定</el-button>
        <el-button @click="dialogVisiblereleta=false">取消</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import tableBar from "../../components/tableBar";
import mySearch from "../../components/mySearch";
import pageNation from "../../components/pageNation";
import {
  ptfs_query_node_grade,
  query_all_group,
  add_group,
  get_app,
  del_group,
  update_group,
} from "../../api/api";
import common from "../../common/js/util.js";

export default {
  data() {
    return {
      is_recommend:"1",
      group_app_name: "",
      operatingStatus1: false,
      dialogVisiblereleta: false,
      dialogVisibleGroupEdit: false,
      dialogVisible: false,
      dialogVisible2: false,
      searchText: "",
      operatingStatus: true,
      clomnSelection: true,
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

      app_arrayname: "",
      groupform: {
        group_name: "",
        group_describe: "",
        app_array: [],
        create_time: 0,
      },
      groupformupdate: {
        group_name: "",
        group_describe: "",
        app_array: [],
        create_time: 0,
      },

      rowHeader: [
        {
          prop: "group_name",
          label: "分组名称",
        },
        {
          prop: "group_app_count",
          label: "应用数目",
        },
        {
          prop: "create_time",
          label: "创建时间",
        },
        {
          prop: "group_describe",
          label: "分组说明",
        },
      ],
      rowHeader1: [
        {
          prop: "app_name",
          label: "应用名称",
        },

        {
          prop: "create_time",
          label: "创建时间",
        },
      ],
      tableData: [],
      tableOption: {
        label: "操作",
        width: 200,
        options: [
          {
            label: "编辑",
            type: "danger",
            methods: "edit",
          },
          {
            label: "删除",
            type: "danger",
            methods: "delete",
          },
        ],
      },
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
      tableData1: [],
      tabcount: 0,
      tempid: [],
      tempidname: [],
      dialogVisibleGroupEdit1: false,
      group_ids: "",
    };
  },
  mounted: function() {
    this.queryUserList();
    this.queryApp();
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
    onSubmitgroupupadte() {
      if (
        this.getStringWidth(this.groupformupdate.group_name) < 1 ||
        this.getStringWidth(this.groupformupdate.group_name) > 16
      ) {
        this.$message({
          message: "分组名称为1~16个字符",
          type: "error",
        });
        return false;
      }

      if (this.getStringWidth(this.groupformupdate.group_describe) > 20) {
        this.$message({
          message: "分组说明不能超过20个字符",
          type: "error",
        });
        return false;
      }
      this.dialogVisibleGroupEdit1 = false;
      let param = {};

      param.group_id = this.group_ids;
      (param.group_name = this.groupformupdate.group_name),
        (param.group_describe = this.groupformupdate.group_describe),
        (param.app_array = []);
      param.app_array = this.groupform.app_array;
      param.is_recommend= parseInt(this.is_recommend) 

      update_group(param)
        .then(res => {
          if (res.status == 0) {
            this.$message({
              message: "更新成功",
              type: "success",
            });
            this.common.monitoringLogs("修改", "修改分组管理", 1);
            this.queryUserList();
          } else {
            this.$message({
              message: "更新失败",
              type: "error",
            });
            this.common.monitoringLogs("修改", "修改分组管理", 0);
             this.queryUserList();
          }
         
        })
        .catch(error => {});
    },
    unique(arr) {
      return Array.from(new Set(arr));
    },
    //应用关联取消
    onSubmitreleta() {
      this.dialogVisiblereleta = false;
      console.log(this.tempidname);
      if (this.tempidname.length > 0) {
        this.groupform.app_array = this.unique(this.tempid);
        this.app_arrayname = this.unique(this.tempidname).join(",");
      } else {
        this.groupform.app_array = [];
        this.app_arrayname = "";
      }

      console.log(this.groupform.app_array);
    },
    handleSelectionChange1(val) {
      this.tabcount = val.length;
      console.log(val);

      for (var i = 0; i < val.length; i++) {
        this.tempid.push(val[i].app_id);
        this.tempidname.push(val[i].app_name);
      }

      console.log(this.tempidname);
    },
    onSeach() {
      this.queryApp();
    },
    //新增分组
    onSubmitaddgroup() {
      if (
        this.getStringWidth(this.groupform.group_name) < 1 ||
        this.getStringWidth(this.groupform.group_name) > 16
      ) {
        this.$message({
          message: "分组名称为1~16个字符",
          type: "error",
        });
        return false;
      }
      // if (this.app_arrayname == "") {
      //   this.$message({
      //     message: "请先关联应用",
      //     type: "error",
      //   });
      //   return false;
      // }
      if (this.getStringWidth(this.groupform.group_describe) > 20) {
        this.$message({
          message: "分组说明不能超过20个字符",
          type: "error",
        });
        return false;
      }
      this.dialogVisibleGroupEdit = false;
      this.groupform.create_time = parseInt(Date.now() / 1000);
      //this.groupform.create_time = 0;
      let param = this.groupform;
      param.is_recommend=parseInt(this.is_recommend) 
      add_group(param)
        .then(res => {
          if (res.status == 0) {
            this.$message({
              message: "新增成功",
              type: "success",
            });
            this.common.monitoringLogs("新增", "新增分组管理", 1);

            this.queryUserList();
          } else {
            this.$message({
              message: "新增失败",
              type: "error",
            });
            this.common.monitoringLogs("新增", "新增分组管理", 1);
          }
          this.queryUserList();
        })
        .catch(error => {});
    },
    //操作
    handleButton(val, row) {
      console.log(val.row.is_recommend)
      this.groupform = val.row;
      this.group_ids = val.row.group_id;
      if (val.methods == "edit") {
        this.groupformupdate.group_name = val.row.group_name;
        this.groupformupdate.group_describe = val.row.group_describe;
        this.dialogVisibleGroupEdit1 = true;
        this.is_recommend=val.row.is_recommend+""
      } else {
        this.$confirm("确定要删除吗?", "提示", {
          type: "warning",
        })
          .then(() => {
            let group_ids = [];
            group_ids.push(val.row.group_id);
            let param = new Object();
            param.group_id = group_ids;
            del_group(param)
              .then(res => {
                if (res.status == 0) {
                  this.$message({
                    message: "删除成功",
                    type: "success",
                  });
                  this.common.monitoringLogs("删除", "删除分组管理", 1);

                  this.queryUserList();
                } else {
                  this.$message({
                    message: "删除失败",
                    type: "error",
                  });
                  this.common.monitoringLogs("删除", "删除分组管理", 0);
                }
                this.queryUserList();
              })
              .catch(error => {
                this.$message({
                  message: "后台服务出错",
                  type: "error",
                });
              });
          })
          .catch(() => {});
      }
    },
    queryApp() {
      let paramactive = new Object();
      {
        paramactive.page = this.pager1.page - 1;
        paramactive.app_name = this.group_app_name;
      }

      get_app(paramactive)
        .then(res => {
          if (res.status == 0) {
            if (res.data.appinfo) {
              //

              this.pager1.count = res.data.total;
              let tempArr = [];

              tempArr = res.data.appinfo;
              for (var i = 0; i < tempArr.length; i++) {
                if (tempArr[i].create_time == 0) {
                  tempArr[i].create_time = 0;
                } else {
                  tempArr[i].create_time = this.common.getTimes(
                    tempArr[i].create_time * 1000
                  );
                }
              }
              this.tableData1 = [];
              this.tableData1 = tempArr;
              console.log(this.tableData1);
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
    addmarket() {
      this.dialogVisibleGroupEdit = true;
      this.groupform.group_name = "";
      this.app_arrayname = "";
      this.groupform.group_describe = "";
    },
    addrelate() {
      this.dialogVisiblereleta = true;
    },
    onSubmitGroupEdit() {},
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

    onChange(item) {
      console.log(item);
      this.nodegrade = item;
      this.queryUserList();
    },

    //回车键绑定事件
    onSubmitKey() {
      this.queryUserList();
    },

    //获取用户列表
    queryUserList() {
      let paramactive = new Object();
      {
        paramactive.page = this.pager.page - 1;
      }

      query_all_group(paramactive)
        .then(res => {
          if (res.status == 0) {
            if (res.data.result) {
            
              this.pager.count = res.data.total;
              let tempArr = [];

              tempArr = res.data.result;
              for (var i = 0; i < tempArr.length; i++) {
                if (tempArr[i].create_time == 0) {
                  tempArr[i].create_time = 0;
                } else {
                  tempArr[i].create_time = this.common.getTimes(
                    tempArr[i].create_time * 1000
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
    handleCurrentChange1(val) {
      this.pager.page = val.val;
      this.queryUserList();
    },
    //分页
    handleCurrentChange(val) {
      this.pager1.page = val.val;
      this.queryApp();
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
