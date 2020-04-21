<template>
  <section class="myself-container">
    <div class="device_form">
      <el-form ref="form" :model="form">
        <el-row type="flex">
          <div class="search-con">
            <i class="el-icon-search" @click="searchInfo" style="color:#606266"></i>
            <el-input
              class="search-input"
              v-model="app_name"
              placeholder="应用名称"
              @keyup.enter.native="onSubmitKey"
            ></el-input>
          </div>
          <div @click="getShow()" class="div_show" style="color:#606266">
            筛选
            <i
              class="el-icon-caret-bottom"
              :class="[rotate?'fa fa-arrow-down go':'fa fa-arrow-down aa']"
            ></i>
          </div>
        </el-row>
        <div v-show="showState">
          <el-row type="flex" class="row_activess">
            <el-form-item label="一级分类" style="display: flex;">
              <el-select v-model="app_type1" placeholder="请选择" @change="onChangeOne">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="二级分类" style="display: flex;">
              <el-select v-model="app_type2" placeholder="请选择" @change="onChangeTwo">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态" style="display: flex;">
              <el-select v-model="pub_status" placeholder="请选择" @change="onChangeStatus">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
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
      <el-row type="flex" class="row_active" style="display: flex;justify-content: flex-start;">
        <el-col style="display: flex;justify-content: flex-start;">
          <el-button type="primary" @click="addmarket">新增应用</el-button>
        </el-col>
      </el-row>
      <el-row type="flex" class="row_active">
        <el-col :span="24">
          <tableBarMarketindex
            id="rebateSetTable"
            ref="table1"
            tooltip-effect="dark"
            :tableData="tableData"
            :operatingStatus="operatingStatus"
            @handleButton="handleButton"
            @tableSortChange="tableSortChange"
            @handleSelectionChange="handleSelectionChange"
            :clomnSelection="clomnSelection"
            :rowHeader="rowHeader"
            :tableOption="tableOption"
            @disable="disable"
            @toDetails="toDetails"
            @changePassword="changePassword"
            @toDelete="toDelete"
            @toEdit="toEdit"
            @toOperating="toOperating"
          ></tableBarMarketindex>
          <!-- <tableBarMarketindex id="rebateSetTable" ref="table1" tooltip-effect="dark" :tableData="tableData" @tableSortChange="tableSortChange" @handleSelectionChange="handleSelectionChange" :clomnSelection="clomnSelection" :rowHeader="rowHeader" :tableOption="tableOption" @disable="disable" @toDetails="toDetails" @changePassword="changePassword" @toDelete="toDelete"></tableBarMarketindex> -->
        </el-col>
      </el-row>
    </div>
    <div class="devide_pageNation" style="display: flex;justify-content: space-between;">
      <el-row type="flex">
        <el-col :span="6" style="display: flex;justify-content: justify-content: flex-start;">
          <el-button type="primary" size="small" @click="clickAppon">发布</el-button>
          <el-button type="primary" size="small" @click="clickAppoff">下架</el-button>
        </el-col>
      </el-row>
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
  </section>
</template>

<script>
import tableBarMarketindex from "../../components/tableBarMarketindex";
import mySearch from "../../components/mySearch";
import pageNation from "../../components/pageNation";
import {
  ptfs_query_node_grade,
  get_all_app,
  app_on,
  app_off,
} from "../../api/api";
import common from "../../common/js/util.js";

export default {
  data() {
    return {
      app_name: "",
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
          label: "影音",
        },
        {
          value: "2",
          label: "教育",
        },
        {
          value: "3",
          label: "游戏",
        },
        {
          value: "4",
          label: "工具",
        },
      ],
      options1: [],
      options2: [
        {
          value: "-1",
          label: "全部",
        },
        {
          value: "1",
          label: "已发布",
        },
        {
          value: "0",
          label: "未发布",
        },
      ],

      rowHeader: [
        // {
        //   prop: "app_icon",
        //   label: "LOGO",
        // },
        {
          prop: "app_name",
          label: "应用名称",
        },
        {
          prop: "app_type1",
          label: "一级分类",
        },
        {
          prop: "app_type2",
          label: "二级标签",
        },

        {
          prop: "app_version",
          label: "应用版本",
        },
        {
          prop: "pkg_name",
          label: "包名",
        },
        {
          prop: "stateactive",
          label: "应用状态",
        },
        {
          prop: "create_time",
          label: "创建时间",
          sortable: "custom",
        },
        {
          prop: "publish_time",
          label: "修改时间",
          sortable: "custom",
        },
      ],
      tableData: [],
      tableOption: {
        label: "操作",
        width: 300,
        options: [
          {
            label: "发布",
            type: "primary",
            methods: "onapp",
          },
          {
            label: "下架",
            type: "danger",
            methods: "offapp",
          },
          {
            label: "编辑",
            type: "danger",
            methods: "edit",
          },
          {
            label: "详情",
            type: "danger",
            methods: "goddetail",
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
      appIds: [],
      linkappid: 0,
      pub_status: "-1",
      app_type1: "0",
      app_type2: "",
    };
  },
  mounted: function() {
    //this.queryUsersTotal();
    this.queryUserList();
    //this.queryInfoUser();
  },
  methods: {
    //详情
    toDetails(val) {
      console.log(val);
      let linkappid = val.app_id;
      let pub_status = val.state;

      this.$router.push({
        path: "/marketdetail",
        query: {
          linkappid: linkappid,
          pub_status: pub_status,
        },
      });
    },
    //编辑
    toEdit(val) {
      let linkappid = val.row.app_id;
      let pub_status = val.row.state;
      this.$router.push({
        path: "/editmarket",
        query: {
          linkappid: linkappid,
        },
      });
    },
    //发布下架
    toOperating(val) {
      let linkappid = val.row.app_id;
      if (val.row.state == 0) {
        let param = new Object();
        param.app_array = [];
        param.app_array.push(linkappid);
        param.publish_time = parseInt(Date.now() / 1000);
        // param.data_count = 1;

        app_on(param)
          .then(res => {
            if (res.status == 0) {
              this.$message({
                message: "发布成功",
                type: "success",
              });
               this.common.monitoringLogs("发布", "发布应用管理", 1);
            } else {
              this.$message({
                message: "发布失败",
                type: "error",
              });
                this.common.monitoringLogs("发布", "发布应用管理", 0);
            }
            this.queryUserList();
          })
          .catch(error => {
            this.$message({
              message: "后台服务出错",
              type: "error",
            });
              this.common.monitoringLogs("发布", "发布应用管理", 0);
          });
      } else {
        let param = new Object();
        param.app_array = [];
        param.app_array.push(linkappid);

        app_off(param)
          .then(res => {
            if (res.status == 0) {
              this.$message({
                message: "下架成功",
                type: "success",
              });
                                    this.common.monitoringLogs("下架", "下架应用管理", 1);

            } else {
              this.$message({
                message: "下架失败",
                type: "error",
              });
                                                  this.common.monitoringLogs("下架", "下架应用管理", 0);

            }
            this.queryUserList();
          })
          .catch(error => {
            this.$message({
              message: "后台服务出错",
              type: "error",
            });
                                                this.common.monitoringLogs("下架", "下架应用管理", 0);

          });
      }
    },
    //编辑
    handleButton(val) {
      console.log(val);

      if (val.methods == "edit") {
      } else if (val.methods == "onapp") {
      } else if (val.methods == "offapp") {
      } else if (val.methods == "goddetail") {
      }
    },
    //新增
    addmarket() {
      this.$router.push({
        path: "/addmarket",
      });
    },
    //批量上架选择ID
    handleSelectionChange(val) {
      let temp = val;
      for (var i = 0; i < temp.length; i++) {
        if (temp.length > 0) {
          this.appIds.push(temp[i].app_id);
        }
      }
    },
    //上架
    clickAppon() {
      if (this.appIds.length == 0) {
        this.$message({
          message: "请至少勾选一项",
          type: "error",
        });
        return false;
      }

      let param = new Object();
      param.publish_time=parseInt((new Date()).getTime()/1000)
      param.app_array = this.appIds;
      param.data_count = this.appIds.length;

      app_on(param)
        .then(res => {
          if (res.status == 0) {
            this.$message({
              message: "批量发布成功",
              type: "success",
            });
                                                this.common.monitoringLogs("发布", "批量发布应用管理", 1);

          } else {
            this.$message({
              message: "批量发布失败",
              type: "error",
            });
                                                            this.common.monitoringLogs("发布", "批量发布应用管理", 0);

          }
          this.queryUserList();
        })

        .catch(error => {
                                                          this.common.monitoringLogs("发布", "批量发布应用管理", 1);

        });
    },
    //下架
    clickAppoff() {
      if (this.appIds.length == 0) {
        this.$message({
          message: "请至少勾选一项",
          type: "error",
        });
        return false;
      }

      let param = new Object();
      param.app_array= this.appIds;
      param.data_count = this.appIds.length;

      app_off(param)
        .then(res => {
          if (res.status == 0) {
            this.$message({
              message: "批量下架成功",
              type: "success",
            });
                                                            this.common.monitoringLogs("下架", "批量下架应用管理", 1);

          } else {
            this.$message({
              message: "批量下架失败",
              type: "error",
            });
                                                            this.common.monitoringLogs("下架", "批量下架应用管理", 0);

          }
          this.queryUserList();
        })
        .catch(error => {
                                                                      this.common.monitoringLogs("下架", "批量下架应用管理", 1);

        });
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
    //导出的方法

    addAccout() {
      this.dialogVisible = true;
    },
    onChangeStatus(val) {
      this.pub_status = val;
      this.queryUserList();
    },

    onChangeOne(item) {
      this.app_type1 = item;
      console.log(item);
      if (item == "1") {
        this.options1 = [
          {
            value: "0",
            label: "全部",
          },
          {
            value: "1",
            label: "电视直播",
          },
          {
            value: "2",
            label: "视频点播",
          },
          {
            value: "3",
            label: "音乐娱乐",
          },
        ];
      } else if (item == "2") {
        this.options1 = [
          {
            value: "0",
            label: "全部",
          },
          {
            value: "1",
            label: "幼儿教育",
          },
          {
            value: "2",
            label: "中小学教育",
          },
          {
            value: "3",
            label: "职业教育",
          },
        ];
      } else if (item == "3") {
        this.options1 = [
          {
            value: "0",
            label: "全部",
          },
          {
            value: "1",
            label: "棋牌桌游",
          },
          {
            value: "2",
            label: "竞速体育",
          },
          {
            value: "3",
            label: "休闲益智",
          },
          {
            value: "4",
            label: "战争策略",
          },
          {
            value: "5",
            label: "飞行射击",
          },
          {
            value: "6",
            label: "动作冒险",
          },
          {
            value: "7",
            label: "模拟经营",
          },
        ];
      } else if (item == "4") {
        this.options1 = [
          {
            value: "0",
            label: "全部",
          },
          {
            value: "1",
            label: "运动健康",
          },
          {
            value: "2",
            label: "便捷生活",
          },
          {
            value: "3",
            label: "实用工具",
          },
        ];
      }
      this.app_type1 = item;
      this.queryUserList();
    },
    onChangeTwo(item) {
      this.app_type2 = item;
      this.queryUserList();
    },
    // onChange2(item) {
    //   console.log(item);
    //   if (item == 0) {
    //     this.form.sex = "全部";
    //     this.user_sex = "";
    //   } else if (item == 1) {
    //     this.form.sex = "男";
    //     this.user_sex = "男";
    //   } else if (item == 2) {
    //     this.form.sex = "女";
    //     this.user_sex = "女";
    //   }
    // },
    //回车键绑定事件
    onSubmitKey() {
      this.queryUserList();
    },
    //重置
    resetInfo() {
      this.pager.page = 1;
      this.searchText = "";
      this.value = "";
      this.app_type1 = "0";
      this.app_type2 = "0";
      this.value2 = "";
      this.value1 = "";
      this.user_sex = "";
      this.user_status = -1;
      (this.nodegrade = 0), (this.user_nick_name = "");
      this.app_name = "";
      this.pub_status="-1"
      this.queryUserList();
    },

    //获取用户列表
    queryUserList() {
      let param = new Object();
      let phoneNumber = /^1(3|4|5|7|8)\d{9}$/;
      let user_id = /^\d{7}$/;
      let app_type2s = 0;
      if (this.app_type2 == "") {
        app_type2s = 0;
      } else {
        app_type2s = this.app_type2;
      }
      let paramactive = new Object();
      {
        (paramactive.app_name = this.app_name),
          (paramactive.page = this.pager.page - 1),
          (paramactive.app_type1 = parseInt(this.app_type1));
        paramactive.app_type2 = parseInt(app_type2s);
        paramactive.state=parseFloat(this.pub_status)
        
      }

      get_all_app(paramactive)
        .then(res => {
          console.log(res);
          if (res.status == 0) {
            console.log(res);
            //         if(res.data.appinfo){
            //    this.tableData = res.data.appinfo;
            // }

            this.pager.count = res.data.total;
            let tempArr = [];

            tempArr = res.data.appinfo;
            for (var i = 0; i < tempArr.length; i++) {
              if(tempArr[i].state==0){
                tempArr[i].stateactive="未发布"
              }else{
                tempArr[i].stateactive="已发布"
              }
              if (tempArr[i].publish_time == 0) {
                tempArr[i].publish_time = "--";
              } else {
                tempArr[i].publish_time = this.common.getTimes(
                  tempArr[i].publish_time * 1000
                );
              }
              if (tempArr[i].create_time == 0) {
                tempArr[i].create_time = "--";
              } else {
                tempArr[i].create_time = this.common.getTimes(
                  tempArr[i].create_time * 1000
                );
              }
              if (tempArr[i].app_type1 == 1) {
                switch (tempArr[i].app_type2) {
                   case 0:
                     tempArr[i].app_type2 = "全部";
                    break;
                  case 1:
                    tempArr[i].app_type2 = "电视直播";
                    break;
                  case 2:
                    tempArr[i].app_type2 = "视频点播";
                    break;
                  case 3:
                    tempArr[i].app_type2 = "音乐娱乐";
                    break;
                }
              } else if (tempArr[i].app_type1 == 2) {
                switch (tempArr[i].app_type2) {
                      case 0:
                    tempArr[i].app_type2 = "全部";
                    break;
                  case 1:
                    tempArr[i].app_type2 = "幼儿教育";
                    break;
                  case 2:
                    tempArr[i].app_type2 = "中小学教育";
                    break;
                  case 3:
                    tempArr[i].app_type2 = "职业教育";
                    break;
                }
              } else if (tempArr[i].app_type1 == 3) {
                switch (tempArr[i].app_type2) {
                      case 0:
                  tempArr[i].app_type2 = "全部";
                    break;
                  case 1:
                    tempArr[i].app_type2 = "棋牌桌游";
                    break;
                  case 2:
                    tempArr[i].app_type2 = "竞速体育";
                    break;
                  case 3:
                    tempArr[i].app_type2 = "休闲益智";
                    break;
                  case 4:
                    tempArr[i].app_type2 = "战争策略";
                    break;
                  case 5:
                    tempArr[i].app_type2 = "飞行射击";
                    break;
                  case 6:
                    tempArr[i].app_type2 = "动作冒险";
                    break;
                  case 7:
                    tempArr[i].app_type2 = "模拟经营";
                    break;
                }
              } else if (tempArr[i].app_type1 == 4) {
                switch (tempArr[i].app_type2) {
                      case 0:
                    tempArr[i].app_type2 = "全部";
                    break;
                  case 1:
                    tempArr[i].app_type2 = "运动健康";
                    break;
                  case 2:
                    tempArr[i].app_type2 = "便捷生活";
                    break;
                  case 3:
                    tempArr[i].app_type2 = "实用工具";
                    break;
                }
              }
              switch (tempArr[i].app_type1) {
                case 1:
                  tempArr[i].app_type1 = "影音";
                  break;
                case 2:
                  tempArr[i].app_type1 = "教育";
                  break;
                case 3:
                  tempArr[i].app_type1 = "教育";
                  break;
                case 4:
                  tempArr[i].app_type1 = "工具";
                  break;
              }
            }
            this.tableData = tempArr;
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
    tableBarMarketindex: tableBarMarketindex,
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
