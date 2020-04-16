<template>
  <section class="myself-container">
    <div class="device_form">
      <el-form ref="form" :model="form">
        <el-row type="flex">
          <div class="search-con">
            <i class="el-icon-search" @click="searchInfo" style="color:#606266"></i>
            <el-input
              class="search-input"
              v-model="searchText"
              placeholder="分组名称"
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
            <el-form-item label="分组" style="display: flex;">
              <el-select v-model="form.statusText" placeholder="请选择" @change="onChange">
                <el-option
                  v-for="item in tableData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="时间" style="display: flex;">
              <el-date-picker
                v-model="value1"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
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
        <el-col style="display: flex;justify-content: flex-start;">
          <el-button type="primary" @click="onImport">新建</el-button>
        </el-col>
      </el-row>
      <el-row type="flex" class="row_active">
        <el-col :span="24">
          <tableBar
            id="rebateSetTable"
            ref="table1"
            tooltip-effect="dark"
            :tableData="tableContent"
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
          ></tableBar>
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
    <!-- <el-dialog :visible.sync="dialogVisibleGroup" width="30%" :before-close="handleClose">
      <el-form ref="form">
        <el-form-item label="分组名称:">
          <el-input v-model="groupvalue"></el-input>
        </el-form-item>

        <div style="text-align: center;">
          <el-button type="primary" @click="onSubmitGroup">确定</el-button>
          <el-button @click="dialogVisibleGroup=false">取消</el-button>
        </div>
      </el-form>
    </el-dialog> -->
  
    <el-dialog :visible.sync="dialogVisiblecontent" width="50%" :before-close="handleClose">
      <el-form ref="form">
        <el-form-item label="选择分组:" style="display: flex;">
          <el-select v-model="form.statusText" placeholder="请选择" @change="onChange">
            <el-option
              v-for="item in tableData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章标题:">
          <el-input v-model="contentTitle"></el-input>
        </el-form-item>
        <el-form-item label>
          <div id="editor">
            <mavon-editor
              style="height: 100%"
              v-model="handbook"
              @save="saveClick"
              @htmlCode="htmlCode"
            ></mavon-editor>
            <!-- <div><el-button @click="saveClickOwn" type="primary"  style="margin-top:20px;">保存</el-button></div>  -->
          </div>
        </el-form-item>

        <div style="text-align: center;">
          <el-button type="primary" @click="onSubmitContent">确定</el-button>
          <el-button @click="dialogVisibleGroupEdit=false">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisibleDetail" width="50%" :before-close="handleClose">
      <div class="addaccout">
        <div class="title" style="font-weight: bold;">
          {{contentTitleactive}}
          <div class="act-form" style="margin-top:30px;">
            <iframe :src="src" width="90%" height="500" border="0"></iframe>
          </div>
        </div>

        <!-- <el-form ref="ruleForm3" label-position="left" class="demo-ruleForm">
          <h3 class="title">内容详情</h3>
          <el-form-item label="分组名称:" width="200px">
            <el-input v-model="ruleForm3.cat_name" :disabled="true" width="200px"></el-input>
          </el-form-item>
          <el-form-item label="标题:">
            <el-input v-model="ruleForm3.item_title" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="发布时间:">
            <el-input v-model="ruleForm3.item_pub_tm" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="修改人:">
            <el-input v-model="ruleForm3.item_owner" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="修改时间:">
            <el-input v-model="ruleForm3.item_change_tm" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item style="width:100%;display: flex;justify-content:center;">
            <el-button
              type="primary"
              style="width:100%;"
              @click.native.prevent="handleSubmit4"
              :loading="logining"
            >确定</el-button>
          </el-form-item>
        </el-form>-->
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisiblecontentedit" width="50%" :before-close="handleClose">
      <el-form ref="form">
        <el-form-item label="选择分组:" style="display: flex;">
          <el-select v-model="editname" placeholder="请选择" @change="onChange">
            <el-option
              v-for="item in tableData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章标题:">
          <el-input v-model="contentTitleEdit"></el-input>
        </el-form-item>
        <el-form-item label>
          <div id="editor">
            <mavon-editor
              style="height: 100%"
              v-model="handbook"
              @save="saveClick"
              @htmlCode="htmlCode"
            ></mavon-editor>
            <!-- <div><el-button @click="saveClickOwn" type="primary"  style="margin-top:20px;">保存</el-button></div>  -->
          </div>
        </el-form-item>

        <div style="text-align: center;">
          <el-button type="primary" @click="onSubmitContentedit">确定</el-button>
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
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import {
  ptfs_query_node_grade,
  create_help_cat_info,
  query_help_cat_info,
  modify_help_cat_info,
  delete_help_cat_info,
  query_help_item_info,
  create_help_item_info,
  savehtml,
  delete_help_item_info,
  modify_help_item_info
} from "../../api/api";
import common from "../../common/js/util.js";

export default {
  data() {
    return {
      contentTitleactive: "",
      contentTitleEdit: "",
      dialogVisiblecontentedit: false,
      ruleForm3: {},
      dialogVisibleDetail: false,
      contentTitle: "",
      notice_url: "",
      handbook: "",
      src: "",
      dialogVisiblecontent: false,
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
        bind_end_time: 0
      },
      user_form: {
        normal_num: "",
        active_num: "",
        total_num: ""
      },
      rowHeader: [
        {
          prop: "cat_name",
          label: "分组"
        },
        {
          prop: "item_title",
          label: "标题"
        },
        {
          prop: "item_pub_tm",
          label: "发布时间"
        },
        {
          prop: "item_owner",
          label: "修改人"
        },
        {
          prop: "item_change_tm",
          label: "修改时间"
        }
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
            label: "修改",
            type: "primary",
            methods: "edit"
          },
          {
            label: "移动",
            type: "primary",
            methods: "move"
          },
          {
            label: "删除",
            type: "primary",
            methods: "delete"
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
      nodegrade: 0,
      user_nick_name: "",
      uname: "",
      cat_name: "",
      cat_id: "",
      cat_owner: "",
      optionsActive: [],

      tableContent: [],
      editname: "",
      item_id: 0,
      edit_id: 0
    };
  },
  mounted: function() {
    //this.queryUsersTotal();
    this.queryUserList();
    this.queryGroups();
    let tempInfo = JSON.parse(this.get("userInfo"));
    this.uname = tempInfo.username;
    this.uid = tempInfo.id;
    //this.queryInfoUser();
  },
  methods: {
    //编辑保存

    onSubmitContentedit() {
      let param = new Object();
      (param.item_title = this.contentTitleEdit),
        (param.item_owner = this.uname),
        (param.item_url = this.notice_url);
      (param.cat_id = this.edit_id), (param.item_id = this.item_id);
      modify_help_item_info(param)
        .then(res => {
          if (res.status == 0) {
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.dialogVisiblecontentedit = false;
          } else {
            this.$message({
              message: "修改失败",
              type: "success"
            });
            this.dialogVisiblecontentedit = false;
          }
          this.queryUserList();
        })
        .catch(error => {});
    },
    //详情
    handleSubmit4() {
      this.dialogVisibleDetail = false;
    },
    //选择ID
    onChange(val) {
      this.cat_id = val;
      console.log(this.cat_id);
    },
    //保存地址
    saveClick(val, render) {
      console.log(val);
      console.log(render);
      this.htmlText = render;
      let tempHtml = "";
      tempHtml =
        "<!DOCTYPE html>" +
        "<html>" +
        "<head>" +
        "<meta charset='utf-8'>" +
        "<body>" +
        "<div>" +
        this.htmlText +
        "</div>" +
        "</body" +
        "</head>" +
        "</html>";

      let param = {
        data: tempHtml
      };
      savehtml(param)
        .then(res => {
          if (res.status == 0) {
            this.notice_url = res.msg;
          }
        })
        .catch(error => {});
    },
    onSubmitContent() {
      let param = new Object();
      param.cat_id = this.cat_id;
      param.cat_owner = this.cat_owner;
      param.cat_name = this.groupEditvalue;
      param.item_title = this.contentTitle;
      param.item_owner = this.uname;
      param.item_url = this.notice_url;
      param.cat_id = this.cat_id;
      create_help_item_info(param).then(res => {
        if (res.status == 0) {
          this.$message({
            message: "发布成功",
            type: "success"
          });
          this.dialogVisiblecontent = false;
        } else {
          this.$message({
            message: "发布失败",
            type: "success"
          });
          this.dialogVisiblecontent = false;
        }
        this.queryUserList();
      });
    },
    //修改和删除
    handleButton(val, row) {
      if (val.methods == "freeze") {
        this.contentTitleactive = val.row.item_title;
        this.src = val.row.item_url;
        this.ruleForm3 = val.row;
        this.dialogVisibleDetail = true;
      } else if (val.methods == "edit") {
        this.dialogVisiblecontentedit = true;
        this.editname = val.row.cat_name;
        this.item_id = val.row.item_id;
        this.contentTitleEdit = val.row.item_title;
        this.edit_id = val.row.cat_id;
      } else if (val.methods == "move") {
        alert("移动");
      } else if (val.methods == "delete") {
        alert("删除");

        let param = new Object();
        param.item_id = val.row.item_id;
        delete_help_item_info(param)
          .then(res => {
            if (res.status == 0) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
            } else {
              this.$message({
                message: "删除失败",
                type: "success"
              });
            }
            this.queryUserList();
          })
          .catch(error => {});
      }

      // if (val.methods == "freeze") {
      //   this.dialogVisibleGroupEdit = true;
      //   this.groupEditvalue = val.row.cat_name;
      //   (this.cat_id = val.row.cat_id), (this.cat_owner = this.uname);
      // } else {
      //   let param = new Object();
      //   param.cat_id = val.row.cat_id;
      //   delete_help_cat_info(param)
      //     .then(res => {
      //       if (res.status == 0) {
      //         this.$message({
      //           message: "删除成功",
      //           type: "success"
      //         });
      //       } else {
      //         this.$message({
      //           message: "删除失败",
      //           type: "success"
      //         });
      //       }
      //       this.queryUserList();
      //     })
      //     .catch(error => {});
      // }
    },
    get: function(name) {
      var v = window.document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
      return v ? v[2] : null;
    },
    // onSubmitGroup() {
    //   let param = new Object();
    //   (param.cat_name = this.groupvalue), (param.cat_owner = this.uname);
    //   create_help_item_info(param)
    //     .then(res => {
    //       if (res.status == 0) {
    //         this.$message({
    //           message: "创建成功",
    //           type: "success"
    //         });
    //         this.dialogVisibleGroup = false;
    //       } else {
    //         this.$message({
    //           message: "创建失败",
    //           type: "error"
    //         });
    //         this.dialogVisibleGroup = false;
    //       }
    //       this.queryUserList();
    //     })
    //     .catch(error => {});
    // },
    //新建
    onImport() {
      this.dialogVisiblecontent = true;
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
        if (param.forbid_status == 1) {
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

    //回车键绑定事件
    onSubmitKey() {
      this.queryUserList();
    },
    //重置
    resetInfo() {
      this.pager.page = 1;
      (this.nodegrade = 0), (this.user_nick_name = "");
      this.queryUserList();
      this.value1 = "";
    },

    //获取用户列表
    queryUserList() {
      // let param = new Object();
      // let phoneNumber = /^1(3|4|5|7|8)\d{9}$/;
      // let user_id = /^\d{7}$/;
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

      let paramactive = new Object();
      {
        paramactive.page_no = this.pager.page - 1;

        (paramactive.page_size = 10),
          (paramactive.cat_id = 0),
          (paramactive.item_name = ""),
          (paramactive.begin_tm = 0),
          (paramactive.end_tm = 0),
          (paramactive.order_by = 0),
          (paramactive.order_type = 0);
      }
      if (!this.value1) {
        paramactive.begin_tm = 0;
        paramactive.end_tm = 0;
      } else {
        if (this.value1[0] == undefined) {
          paramactive.begin_tm = 0;
        } else {
          paramactive.begin_tm = this.value1[0].getTime() / 1000;
        }
        if (this.value1[1] == undefined) {
          paramactive.end_tm = 0;
        } else {
          paramactive.end_tm = this.value1[1].getTime() / 1000;
        }
      }

      query_help_item_info(paramactive)
        .then(res => {
          console.log(res);
          console.log("666");
          if (res.status == 0) {
            if (res.data.item_list) {
              this.pager.count = res.data.total_num;
              let tempArr = [];

              tempArr = res.data.item_list;
              for (var i = 0; i < tempArr.length; i++) {
                if (tempArr[i].item_pub_tm == 0) {
                  tempArr[i].item_pub_tm = 0;
                } else {
                  tempArr[i].item_pub_tm = this.common.getTimes(
                    tempArr[i].item_pub_tm * 1000
                  );
                }
                 if (tempArr[i].item_change_tm == 0) {
                  tempArr[i].item_change_tm = "暂无修改";
                } else {
                  tempArr[i].item_change_tm = this.common.getTimes(
                    tempArr[i].item_change_tm * 1000
                  );
                }
              }
              this.tableContent = tempArr;
            }
          } else {
            this.$message({
              message: "后台服务无响应",
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

    //获取用户列表
    queryGroups() {
      // let param = new Object();
      // let phoneNumber = /^1(3|4|5|7|8)\d{9}$/;
      // let user_id = /^\d{7}$/;
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

      let paramactive = new Object();
      {
        paramactive.page_no = this.pager.page - 1;

        paramactive.page_size = 10;

        (paramactive.cat_name = ""), (paramactive.cat_order = 0);
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
                //   let obj={
                //     value:tempArr[i].cat_id
                //   }
                //   //debugger
                //  this.optionsActive[i].push(obj)

                tempArr[i].value = tempArr[i].cat_id;
                tempArr[i].label = tempArr[i].cat_name;
                // optionsActive[i].label=tempArr[i].cat_name
                // if (tempArr[i].cat_tm == 0) {
                //   tempArr[i].cat_tm = 0;
                // } else {
                //   tempArr[i].cat_tm = this.common.getTimes(
                //     tempArr[i].cat_tm * 1000
                //   );
                // }
              }
              //this.options=optionsActive
              console.log(this.optionsActive);
              this.tableData = tempArr;
            }
          } else {
            this.$message({
              message: "后台服务无响应1",
              type: "error"
            });
          }
        })
        .catch(error => {
          console.log(error);
          this.$message({
            message: "后台服务无响应2",
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
    tableBar: tableBar,
    mySearch: mySearch,
    mavonEditor
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
