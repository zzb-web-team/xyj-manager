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
              placeholder="内容标题"
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
              <el-select v-model="form.statusText" placeholder="请选择" @change="onChangeGroup">
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
   
    <el-dialog :visible.sync="dialogVisiblecontent" width="50%" :before-close="handleCloseactive" :close-on-click-modal="false"> 
      <el-form ref="form">
        <el-form-item label="选择分组:" style="display: flex;">
          <el-select v-model="form.statusText" placeholder="请选择" @change="onChange" style="width:300px;">
            <el-option
              v-for="item in tableData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章标题:">
          <el-input v-model="contentTitle" style="width:300px;"></el-input>
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
          <el-button @click="dialogVisibleDetail1=true">预览</el-button>
          <el-button type="primary" @click="onSubmitContent">发布</el-button>

        </div>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisibleDetail" width="50%" :before-close="handleClose" >
      <div class="addaccout">
        <div class="title" style="font-weight: bold;">
          {{contentTitleactive}}
          <br>
           <div style="margin-top:10px;font-weight:100">{{contentTime}}</div>
          <div class="act-form" style="margin-top:30px;">
            <iframe :src="src" width="90%" height="500" border="0"></iframe>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisibleDetail1" width="50%" :before-close="handleClose">
      <div class="addaccout">
        <div class="title" style="font-weight: bold;">
          {{contentTitle}}
             <br>
           <div style="margin-top:10px;font-weight:100">{{contentTime1}}</div>
          <div class="act-form" style="margin-top:30px;">
            <iframe :src="src1" width="90%" height="500" border="0"></iframe>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisibleDetail2" width="50%" :before-close="handleClose" >
      <div class="addaccout">
        <div class="title" style="font-weight: bold;">
          {{contentTitle}}
          <br>
           <div style="margin-top:10px;font-weight:100">{{contentTime2}}</div>
          <div class="act-form" style="margin-top:30px;">
            <!-- {{handbookedit}} -->
            <iframe :src="src1" width="90%" height="500" border="0"></iframe>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisiblecontentedit" width="50%" :before-close="handleClose" :close-on-click-modal="false">
      <el-form ref="form">
        <el-form-item label="选择分组:" style="display: flex;">
          <el-select v-model="editname" placeholder="请选择" @change="onChange" :disabled="true">
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
              v-model="handbookedit"
              @save="saveClick"
              @htmlCode="htmlCode"
            ></mavon-editor>
            <!-- <div><el-button @click="saveClickOwn" type="primary"  style="margin-top:20px;">保存</el-button></div>  -->
          </div>
        </el-form-item>

        <div style="text-align: center;">
          <el-button @click="dialogVisibleDetail2=true">预览</el-button>
          <el-button type="primary" @click="onSubmitContentedit">发布</el-button>

        </div>
      </el-form>
    </el-dialog>
    
      <el-dialog :visible.sync="dialogVisiblecontentmove" width="20%" title="移动分组" style="text-align:center;" :before-close="handleClose">
      <el-form ref="form">
        <el-form-item label="分组名称:" style="display: flex;justify-content: center;">
          <el-select v-model="editname1" placeholder="请选择" @change="onChangemove" style="width:300px;">
            <el-option
              v-for="item in tableData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

   

        <div style="text-align: center;">
          <el-button type="primary" @click="onSubmitContentmove">确定</el-button>
          <el-button @click="dialogVisiblecontentmove=false">取消</el-button>
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
  modify_help_item_info,
  move_help_item,
  back_data,
} from "../../api/api";
import common from "../../common/js/util.js";

export default {
  data() {
    return {
      handbookedit: "",
      dialogVisibleDetail1: false,
      dialogVisibleDetail2: false,
      dialogVisiblecontentmove: false,
      contentTitleactive: "",
      contentTitleEdit: "",
      dialogVisiblecontentedit: false,
      ruleForm3: {},
      dialogVisibleDetail: false,
      contentTitle: "",
      contentTitle2: "",
      contentTime: 0,
      contentTime1: 0,
      contentTime2: 0,
      notice_url: "",
      handbook: "",
      src: "",
      src1: "",
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
          label: "分组",
        },
        {
          prop: "item_title",
          label: "标题",
        },
        {
          prop: "item_pub_tm",
          label: "发布时间",
        },
        {
          prop: "item_owner",
          label: "修改人",
        },
        {
          prop: "item_change_tm",
          label: "修改时间",
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
            label: "修改",
            type: "primary",
            methods: "edit",
          },
          {
            label: "移动",
            type: "primary",
            methods: "move",
          },
          {
            label: "删除",
            type: "primary",
            methods: "delete",
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
      optionsActive: [],

      tableContent: [],
      editname: "",
      item_id: 0,
      edit_id: 0,
      releaseActive: false,
      temp_name: "",
      new_cat_id: 0,
      editname1: "",
      groupId:0
    };
  },
  mounted: function() {
    //this.queryUsersTotal();
    this.queryUserList();
    this.queryGroups();
    let tempInfo = JSON.parse(this.get("userInfo"));
    this.uname = tempInfo.username;
    this.uid = tempInfo.id;
    this.contentTime1 = this.common.getTimes(new Date().getTime());
    //    if(window.localStorage.getItem("cat_name"){
    //      alert(window.localStorage.setIgetItemtem("cat_name"))
    // }
  },

  methods: {
    //选择分组
    onChangeGroup(val){
      console.log(val)
      this.groupId=val

    },
    //移动分组
    onChangemove(val) {
      this.new_cat_id = val;
    },
    //关闭回调
    handleCloseactive() {
      // this.dialogVisiblecontent = false;
      if (this.releaseActive == true) {
        this.dialogVisiblecontent = false;
      } else {
        this.$confirm("项目尚未发布，确认离开吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.dialogVisiblecontent = false;
            var requesteducatData = {
              contentTitle: this.contentTitle,
              handbookActive: this.htmlText,
              "cat_id_active ": this.cat_id,
            };
            window.localStorage.setItem(
              "educatList",
              JSON.stringify(requesteducatData)
            );
          })
          .catch(() => {
            window.localStorage.setItem("educatList", "");
          });
      }
    },
    onSubmitContentmove() {
      this.dialogVisiblecontentmove = false;
      let param = new Object();
      param.new_cat_id = this.new_cat_id;
      param.item_id = this.item_id;
      move_help_item(param)
        .then(res => {
          console.log(res);
          if (res.status == 0 && res.err_code == 0) {
            this.$message({
              message: "移动分组成功",
              type: "success",
            });
            this.common.monitoringLogs("修改", "移动分组管理", 1);
          } else {
            this.$message({
              message: "移动分组失败",
              type: "error",
            });
            this.common.monitoringLogs("修改", "移动分组管理", 0);
          }
          this.queryUserList();
        })
        .catch(error => {
          this.$message({
            message: "后台服务出错",
            type: "error",
          });
          this.common.monitoringLogs("修改", "移动分组管理", 0);
        });
    },
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
              type: "success",
            });
            this.common.monitoringLogs("修改", "修改内容管理", 1);

            this.dialogVisiblecontentedit = false;
          } else {
            this.$message({
              message: "修改失败",
              type: "success",
            });
            this.common.monitoringLogs("修改", "修改内容管理", 0);

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

    arrayLookup(data, key, value, targetKey) {
      var targetValue = "";
      for (var i = 0; i < data.length; i++) {
        if (data[i][key] == value) {
          targetValue = data[i][targetKey];
          break;
        }
      }
      return targetValue;
    },

    //选择ID
    onChange(val) {
      this.cat_id = val;
      var name = this.arrayLookup(
        this.tableData,
        "cat_id",
        this.cat_id,
        "label"
      );
      this.cat_name = name;
      var requestid = {
        cat_name: this.cat_name,
        cat_id: this.cat_id,
      };
      window.localStorage.setItem("requestid", JSON.stringify(requestid));
    },
    //保存地址
    saveClick(val, render) {
      this.htmlText = render;
      let tempHtml = "";
      tempHtml =
        "<!DOCTYPE html><html><head><meta charset='utf-8'></head><body>" +
        this.htmlText +
        "</body></html>";

      let param = {
        data: tempHtml,
      };
      savehtml(param)
        .then(res => {
          if (res.status == 0) {
            this.notice_url = res.msg;
            this.src1 = res.msg;
          }
        })
        .catch(error => {});
    },
    onSubmitContent() {
      this.releaseActive = true;
      if (this.cat_id == "" || this.form.statusText == "全部") {
        this.$message({
          message: "请选择分组",
          type: "error",
        });
        return false;
      }
      if (this.contentTitle == "") {
        this.$message({
          message: "请输入文章标题",
          type: "error",
        });
        return false;
      }
      if (this.getStringWidth(this.contentTitle) > 60) {
        this.$message({
          message: "标题不超过60个字符",
          type: "error",
        });
        return false;
      }
      if (this.htmlText == "" || this.htmlText == undefined) {
        this.$message({
          message: "富文本编辑器编辑完内容请按下CTRL+S键保存",
          type: "warning",
        });
        return false;
      }

      if (this.htmlText == "" || this.htmlText == undefined) {
        this.$message({
          message: "还有未填写完的内容，请填写后发布",
          type: "error",
        });
        return false;
      }

      let param = new Object();
      let tempobj = JSON.parse(window.localStorage.getItem("requestid"));
      if (tempobj.cat_name) {
        param.cat_name = tempobj.cat_name;
      } else {
        param.cat_name = tempobj.cat_name;
      }
      param.cat_id = this.cat_id;
      param.cat_owner = this.cat_owner;
      if (tempobj.cat_id) {
        param.cat_id = tempobj.cat_id;
      } else {
        param.cat_id = this.cat_id;
      }

      param.item_title = this.contentTitle;
      param.item_owner = this.uname;
      param.item_url = this.notice_url;
      create_help_item_info(param).then(res => {
        if (res.status == 0) {
          this.$message({
            message: "发布成功",
            type: "success",
          });
          this.common.monitoringLogs("发布", "发布内容管理", 1);

          this.dialogVisiblecontent = false;
        } else {
          this.$message({
            message: "发布失败",
            type: "error",
          });
          this.common.monitoringLogs("发布", "发布内容管理", 0);

          this.dialogVisiblecontent = false;
        }
        window.localStorage.setItem("educatList", "");
        window.localStorage.setItem("requestid", "");
        this.queryUserList();
      });
    },
    //修改和删除
    handleButton(val, row) {
      if (val.methods == "freeze") {
        this.dialogVisibleDetail = true;
        this.contentTitleactive = val.row.item_title;
        this.src = val.row.item_url;
        this.ruleForm3 = val.row;

        this.contentTime = this.common.getTimes(val.row.item_pub_tm);
      } else if (val.methods == "edit") {
        let nowUrl = val.row.item_url;
        let param = {
          data: nowUrl,
        };
        back_data(param)
          .then(res => {
            let nowcontent = "";

            nowcontent = res.replace(
              "<!DOCTYPE html><html><head><meta charset='utf-8'></head><body>",
              ""
            );
            nowcontent = nowcontent.replace("</body></html>", "");
            nowcontent = nowcontent.replace("<p>", "");
            nowcontent = nowcontent.replace("</p>", "");
            this.handbookedit = nowcontent;
          })
          .catch(error => {
            console.log(error);
          });
        this.dialogVisiblecontentedit = true;
        this.editname = val.row.cat_name;
        this.item_id = val.row.item_id;
        this.contentTitleEdit = val.row.item_title;
        this.contentTitle2 = val.row.item_title;
        this.contentTitle=val.row.item_title
        this.contentTime2 = val.row.item_pub_tm;
        this.edit_id = val.row.cat_id;
      } else if (val.methods == "move") {
        this.dialogVisiblecontentmove = true;
        this.item_id = val.row.item_id;
        this.editname1 = val.row.cat_name;
      } else if (val.methods == "delete") {
        this.$confirm("确定要删除吗?", "提示", {
          type: "warning",
        })
          .then(() => {
            let param = new Object();
            param.item_id = val.row.item_id;
            delete_help_item_info(param)
              .then(res => {
                if (res.status == 0 && res.err_code == 0) {
                  this.$message({
                    message: "删除成功",
                    type: "success",
                  });
                  this.common.monitoringLogs("删除", "删除内容管理", 1);
                } else {
                  this.$message({
                    message: "删除失败",
                    type: "error",
                  });
                  this.common.monitoringLogs("删除", "删除内容管理", 1);
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

    //新建
    onImport() {
      if (window.localStorage.getItem("educatList")) {
        this.$confirm("上次编辑的内容未完成，是否继续", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            let templist = JSON.parse(
              window.localStorage.getItem("educatList")
            );
            console.log(templist);
            this.contentTitle = templist.contentTitle;
            this.handbook = templist.handbookActive;
            this.cat_id = templist.cat_id_active;
            let tempobj={}
            if(window.localStorage.getItem("requestid")){
            tempobj = JSON.parse(window.localStorage.getItem("requestid"));
            }else{
                 tempobj.cat_name=""
            }
            this.form.statusText = tempobj.cat_name;
                        this.dialogVisiblecontent = true;

            console.log(this.contentTitle)

            // var requesteducatData = {
            //   "contentTitle": this.contentTitle,
            //   "handbookActive": this.htmlText,
            //   "cat_id_active ": this.cat_id,
            // };
            // window.localStorage.setItem(
            //   "educatList",
            //   JSON.stringify(requesteducatData)
            // );
          })
          .catch(() => {
            this.contentTitle = "";
            this.htmlText = "";
            this.cat_id = "";
            //this.dialogVisiblecontent = true;
            this.releaseActive = false;
            this.contentTitle = "";
            this.handbook = "";
            this.cat_id = "";
            this.groupvalue = "";
            // this.form.statusText = "全部";
            window.localStorage.removeItem("educatList")
          });
      } else {
        this.contentTitle = "";
        this.htmlText = "";
        this.cat_id = "";
        this.dialogVisiblecontent = true;
        this.releaseActive = false;
        this.contentTitle = "";
        this.handbook = "";
        this.cat_id = "";
        this.groupvalue = "";
       // this.form.statusText = "全部";
      }
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
      this.searchText = "";
         this.value1 = "";
      this.form.statusText='全部'
      this.groupId=0
      this.queryUserList();
   
    },

    //获取用户列表
    queryUserList() {
      let paramactive = new Object();
      
      {
        paramactive.page_no = this.pager.page - 1;

        (paramactive.page_size = 10),
          (paramactive.cat_id =  parseInt(this.groupId)),
          (paramactive.item_name = this.searchText),
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

    //获取用户列表
    queryGroups() {
      let paramactive = new Object();
      {
        paramactive.page_no = 0;

        paramactive.page_size = 100;

        (paramactive.cat_name = ""), (paramactive.cat_order = 0);
      }

      query_help_cat_info(paramactive)
        .then(res => {
          console.log(res);
          if (res.status == 0) {
            if (res.data.cat_list) {
              let tempArr = [];
              this.tableData=[]

              tempArr = res.data.cat_list;
              for (var i = 0; i < tempArr.length; i++) {
                tempArr[i].value = tempArr[i].cat_id;
                tempArr[i].label = tempArr[i].cat_name;
              }
            this.tableData = tempArr;
              this.groupId=tempArr[0].cat_id
              this.form.statusText=tempArr[0].cat_name
              this.cat_name=tempArr[0].cat_name
              this.cat_id=tempArr[0].cat_id
              
              // let obj={
              //   value:"0",
              //   label:"全部"
              // }
              // this.tableData.unshift(obj)
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
    mavonEditor,
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
