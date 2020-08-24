<template>
  <div class="content">

    <section class="myself-container">
      <div class="device_form">
        <el-form ref="form" :model="form">
          <el-row type="flex">
            <div class="search-con">
              <i class="el-icon-search" @click="searchInfo" style="color:#606266"></i>
              <el-input class="search-input" v-model="searchText" placeholder="请输入操作人" @keyup.enter.native="searchInfo"></el-input>
            </div>
            <div @click="getShow" class="div_show" style="color:#606266">
              筛选
              <i class="el-icon-caret-bottom" :class="[rotate?'fa fa-arrow-down go':'fa fa-arrow-down aa']"></i>
            </div>
          </el-row>
          <el-row type="flex" class="row_activess" v-show="showState">
            <el-form-item label="状态" style="display: flex;">
              <el-select v-model="value" placeholder="请选择">
                <el-option label="全部" value="-1"></el-option>
                <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="操作类型" style="display: flex;">
              <el-select v-model="value1" placeholder="请选择">
                <el-option label="全部" value="全部"></el-option>
                <el-option v-for="item in options2active" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="注册时间" style="display: flex;">
              <el-date-picker v-model="valueTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchInfo">确定</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="reset()">重置</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <div class="devide_table">
        <el-row type="flex" class="row_active">
          <el-col :span="24">
            <tableBarActivelogs id="rebateSetTable" ref="table1" tooltip-effect="dark" :tableData="tableData" :operatingStatus="operatingStatus" :clomnSelection="clomnSelection" :rowHeader="rowHeader" :tableOption="tableOption" @disable="disable" @toChange="toChange"></tableBarActivelogs>
          </el-col>
        </el-row>
      </div>
      <div class="devide_pageNation" style="display: flex;justify-content: flex-end; margin-bottom:30px;">

        <el-row type="flex">
          <el-col :span="6">
            <pageNation :pager="pager" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"></pageNation>
          </el-col>
        </el-row>
      </div>
    </section>
  </div>
</template>

<script>
import tableBarActivelogs from "../../components/tableBarActivelogs";

import pageNation from "../../components/pageNation";
import { actionlogactive } from "../../api/api";
import common from "../../common/js/util.js";

export default {
  data() {
    return {
      form: {},
      dialogVisible: false,
      rotate: false,
      dialogVisible2: false,
      dialogVisible3: false,
      searchText: "",
      valueTime: "",
      placeholder: "请输入账号",
      operatingStatus: false,
      clomnSelection: false,
      reserveselection: true,
      options2active: ["新增", "修改", "删除", "发布", "撤回", "导入", "导出"],
      value1: "全部",
      value2: "",
      value: "-1",
      options2: [
        {
          value: "1",
          label: "成功",
        },
        {
          value: "0",
          label: "失败",
        },
      ],
      ruleForm2: {
        username: "",
        nickname: "",
        password: "",
        password2: "",
        value: "",
        radio: "0",
        name: "",
        phone: "",
      },
      ruleForm3: {
        username: "",
        nickname: "",
        password: "",
        password2: "",
        value: "",
        radio: "0",
        name: "",
        phone: "",
        id: "",
      },
      ruleForm4: {
        password: "",
        password2: "",
      },
      //重置密码校验

      rowHeader: [
        {
          prop: "status",
          label: "状态",
        },
        {
          prop: "action",
          label: "操作类型",
        },
        {
          prop: "username",
          label: "操作人",
        },
        {
          prop: "beforevalue",
          label: "原始值",
        },
        {
          prop: "aftervalue",
          label: "修改值",
        },

        {
          prop: "description",
          label: "操作描述",
        },

        {
          prop: "time_update",
          label: "操作时间",
        },
      ],
      tableData: [],
      tableOption: {
        label: "操作",
        width: "400px",
        options: [
          {
            label: "修改",
            type: "primary",
            methods: "checkInfo",
          },

          {
            label: "密码重置",
            type: "danger",
            methods: "password",
          },
          {
            label: "禁用",
            type: "danger",
            methods: "disable",
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
      showState: false,
      allId: [],
      uid: "",
      uname: "",
    };
  },
  mounted: function() {
    let tempInfo = JSON.parse(this.get("userInfo"));
    this.uid = tempInfo.id;
    this.uname = tempInfo.username;
    this.queryUserList();
    function person(name){
      this.name='杨国栋',
      this.likes=function(){
       return "爱好玩"
      }
    }
    function test1(){

    }
    test1.prototype=new person()
    var nowtemp=new test1
    // console.log(nowtemp.name)
    //  console.log(nowtemp.likes)

     function test2(){
       person.call(this)
       this.name=name || "999"
     }
     var nowtemp1=new test2
     console.log(nowtemp1.name)
  


  },
  methods: {
   
    get: function(name) {
      var v = window.document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
      return v ? v[2] : null;
    },
    //重置
    reset() {
      this.value1 = "全部";
      this.searchText = "";
      this.pager.page = 1;
      this.search = " ";
      this.value = "-1";

      this.valueTime = "";
      this.queryUserList();
    },

    queryUserList() {
      let param = new Object();
      param.page = this.pager.page - 1;
      param.search = this.searchText;
      param.action = this.value1;
      param.utype = "app";
      param.status;
      if (this.value == "-1") {
        param.status = null;
      } else {
        param.status = parseInt(this.value);
      }
      if (this.value1 == "全部") {
        param.action = "";
      } else {
        param.action = this.value1;
      }
      var day1 = new Date();
      if (!this.valueTime) {
        param.end_ts = parseInt((day1.getTime() / 1000).toFixed(3));
        param.start_ts = parseInt(
          ((day1.getTime() - 3600 * 1000 * 24 * 90) / 1000).toFixed(3)
        );
        // param.start_ts = ""
        // param.end_ts = ""
      } else {
        if (this.valueTime[0] == undefined) {
          param.start_ts = parseInt(
            ((day1.getTime() - 3600 * 1000 * 24 * 90) / 1000).toFixed(3)
          );
        } else {
          param.start_ts = this.valueTime[0].getTime() / 1000;
        }
        if (this.valueTime[1] == undefined) {
          param.end_ts = parseInt((day1.getTime() / 1000).toFixed(3));
        } else {
          param.end_ts = this.valueTime[1].getTime() / 1000;
        }
      }

      actionlogactive(param)
        .then(res => {
          if (res.status != 0) {
            this.$message({
              message: `${res.err_msg}`,
              type: "error",
            });
          } else {
            if (res.result.page == 0) {
              this.pager.count =
                res.result.cols.length * (res.result.page + 1) +
                res.result.les_count;
            } else {
              this.pager.count =
                10 * res.result.page +
                res.result.les_count +
                res.result.cols.length;
            }
            let nowArr = res.result.cols;
            for (var i = 0; i < nowArr.length; i++) {
              nowArr[i].time_create = this.common.getTimes(
                parseInt(nowArr[i].time_create * 1000)
              );
              nowArr[i].time_update = this.common.getTimes(
                parseInt(nowArr[i].time_update * 1000)
              );
              if (nowArr[i].status == 0) {
                nowArr[i].status = "失败";
              } else {
                nowArr[i].status = "成功";
              }
            }
            this.tableData = nowArr;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //搜索
    searchInfo() {
      //this.showState = false;
      this.pager.page = 1;
      this.queryUserList();
    },
    getShow() {
      this.showState = !this.showState;
      this.rotate = !this.rotate;
    },
    //单页显示数据数量
    handleSizeChange() {},
    //分页
    handleCurrentChange(val) {
      this.pager.page = val.val;
      this.queryUserList();
    },
    //新增
    handleSubmit(ev) {
      //return false
      var _this = this;
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          var loginParams = {
            username: this.ruleForm2.username,
            nickname: "aa",
            password: this.ruleForm2.password,
            password2: this.ruleForm2.password2,
            role_id: 0,
            phone: this.ruleForm2.phone,
            status: parseInt(this.ruleForm2.radio),
            name: this.ruleForm2.name,
            uname: this.uname,
            uid: this.uid,
          };
          userinsert(loginParams).then(data => {
            this.dialogVisible = false;
            let { msg, status, user } = data;
            if (status !== 0) {
              this.$message({
                message: msg,
                type: "error",
              });
            } else {
              this.$message({
                message: "添加成功",
                type: "success",
              });
              this.queryUserList();
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //取消新增
    notall() {
      this.dialogVisible = false;
      this.ruleForm2.username = "";
      this.ruleForm2.password = "";
      this.ruleForm2.password2 = "";
      this.ruleForm2.phone = "";
      this.ruleForm2.name = "";
    },
    //禁用
    disable(val) {
      console.log(val);
      let nowstatus = 0;
      let tampArr = [];
      tampArr[0] = val.id;
      if (val.status == "正常") {
        nowstatus = 1;
      } else {
        nowstatus = 0;
      }
      let param = {
        id: tampArr,
        status: nowstatus,
      };

      this.$confirm("确定执行该操作麽吗", "提示", {
        type: "warning",
      })
        .then(() => {
          denyuser(param).then(res => {
            //return false
            if (res.status !== 0) {
              this.$message({
                message: msg,
                type: "error",
              });
            } else {
              this.$message({
                message: "操作成功",
                type: "success",
              });
              this.queryUserList();
            }
          });
        })
        .catch(() => {});
    },
    //修改
    toChange(val) {
      this.$router.push({
        path: "/useInfo",
        query: {
          id: val.id,
          time_create: val.time_create,
          phone: val.phone,
          username: val.username,
          email: val.email,
        },
      });

      //this.ruleForm3.status = parseInt(this.ruleForm3.radio)
    },

    addAccout() {
      this.dialogVisible = true;
    },
  },
  components: {
    pageNation: pageNation,
    tableBarActivelogs: tableBarActivelogs,
  },
};
</script>

<style lang="less">
.search-con {
  width: 250px;
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #999999;

  i {
  }

  .search-input {
    .el-input__inner {
      border: none;
      background: none;
    }
  }
}

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

//旋转
.aa {
  transition: all 1s;
}

.go {
  transform: rotate(-180deg);
  transition: all 1s;
}
</style>
