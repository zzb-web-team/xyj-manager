<template>
<section class="myself-container">
    <div class="device_form">
        <el-form ref="form" :model="form">
            <el-row type="flex">
                <!-- <mySearch :searchText="searchText" @searchInfo="searchInfo" :placeholder="placeholder" ref="numberInput"></mySearch> -->
                <!-- <div class="search-con">
                    <i class="el-icon-search" @click="searchInfo" style="color:#606266"></i>
                    <el-input class="search-input" v-model="searchText" placeholder="请输入账号" @keyup.enter.native="onSubmitKey"></el-input>
                </div> -->
                 <el-col :span="4">
          <el-input
  v-model="searchText" placeholder="请输入账号" @keyup.enter.native="onSubmitKey"
    >
    <i slot="prefix" class="el-input__icon el-icon-search"  @click="onSubmitKey"></i>
  </el-input>
            </el-col>
                <div @click="getShow()" class="div_show" style="color:#606266">筛选
                    <i
                class="el-icon-caret-bottom"
                :class="[rotate?'fa fa-arrow-down go':'fa fa-arrow-down aa']"
              ></i>
                </div>
            </el-row>
            <el-row type="flex" class="row_activess" v-show="showState">
                <el-form-item label="状态" style="display: flex;">
                    <el-select v-model="value" placeholder="请选择" @change="onChange2">
                        <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchInfo">确定</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="resetInfo">重置</el-button>
                </el-form-item>
            </el-row>
        </el-form>
    </div>
    <div class="devide_table">
        <el-row type="flex" class="row_active">
            <el-col :span="6">
                <el-button type="primary" @click="addAccout">新建</el-button>
            </el-col>
        </el-row>
        <el-row type="flex" class="row_active">
            <el-col :span="24">
                <tableBarActiveAccount width="100%" id="rebateSetTable" ref="table1" tooltip-effect="dark" @tableSortChange='tableSortChange' :tableData="tableData" @toDetail="toDetail" @handleSelectionChange="handleSelectionChange" :clomnSelection="clomnSelection" :rowHeader="rowHeader" :tableOption="tableOption" @disable="disable" @toChange="toChange" @changePassword="changePassword" @toDelete="toDelete"></tableBarActiveAccount>
            </el-col>
        </el-row>
    </div>
    <div class="devide_pageNation" style="display: flex;justify-content: space-between;">
        <el-row type="flex">
            <el-col :span="6" style="display: flex;justify-content: justify-content: flex-start;">
                <el-button type="primary" size="small" @click="allOn">启用</el-button>
                <el-button type="primary" size="small" @click="allOff">禁用</el-button>
                <el-button type="primary" size="small" @click="allDelete">删除</el-button>
            </el-col>
        </el-row>
        <el-row type="flex">
            <el-col :span="6">
                <pageNation :pager="pager" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"></pageNation>
            </el-col>
        </el-row>

    </div>
    <el-dialog :visible.sync="dialogVisible" width="25%" :before-close="handleClose" @close="handleClose1">
        <div class="addaccout addaccout_active">
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" class="demo-ruleForm ">
                <h3 class="title">新建用户</h3>
                <el-form-item label="使用状态:">
                    <el-radio v-model="ruleForm2.radio" label="0">启用</el-radio>
                    <el-radio v-model="ruleForm2.radio" label="1">禁用</el-radio>
                </el-form-item>
                <el-form-item prop="username" :rules="[
      {validator: jiousername, trigger: 'blur' }
    ]">

                    <el-form-item label="账号:">

                        <el-input v-model="ruleForm2.username" placeholder="4-20位英文加数字组合"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item prop="password" :rules="[
      {validator: jiopwd, trigger: 'blur' }
    ]">
                    <el-form-item label="密码:" placeholder="密码">
                        <el-input v-model="ruleForm2.password" type="password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item prop="password2" :rules="[
      {validator: jiopwd1, trigger: 'blur' }
    ]">
                    <el-form-item label="确认密码:">
                        <el-input v-model="ruleForm2.password2" placeholder="请确认密码" type="password"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item prop="name" :rules="[
      {validator: jioname, trigger: 'blur' }
    ]">

                    <el-form-item label="真实姓名:">
                        <el-input v-model="ruleForm2.name" placeholder="真实姓名为4-20位汉字"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item prop="phone" :rules="[
      {validator: jiophone, trigger: 'blur' }
    ]">
                    <el-form-item label="联系方式:">
                        <el-input v-model="ruleForm2.phone" placeholder="11位有效手机号"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item style="width:100%;display: flex;justify-content:center;">
                    <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">立即提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible2" width="17%" :before-close="handleClose" @close="handleCloseDefail">
        <div class="addaccout addaccout_active">
            <el-form :model="ruleForm3" ref="ruleForm3" :rules="rules3" label-position="left" class="demo-ruleForm ">
                <h3 class="title">用户详情</h3>
                <el-form-item label="使用状态:">
                    <el-radio v-model="ruleForm3.radio" label="0">启用</el-radio>
                    <el-radio v-model="ruleForm3.radio" label="1">禁用</el-radio>
                </el-form-item>
                <el-form-item prop="username" :rules="[
      {validator: jiousername, trigger: 'blur' }
    ]">
                    <el-form-item label="账号:">
                        <el-input v-model="ruleForm3.username"></el-input>
                    </el-form-item>
                </el-form-item>

                <el-form-item prop="name" :rules="[
      {validator: jioname, trigger: 'blur' }
    ]">
                    <el-form-item label="真实姓名:">
                        <el-input v-model="ruleForm3.name" placeholder="真实姓名"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item prop="phone" :rules="[
      {validator: jiophone, trigger: 'blur' }
    ]">
                    <el-form-item label="联系方式:">
                        <el-input v-model="ruleForm3.phone" placeholder="联系方式"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item style="width:100%;display: flex;justify-content:center;">
                    <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit4" :loading="logining">修改</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible3" width="20%" :before-close="handleClose" @close="handleClosePassword">
        <div class="addaccout addaccout_active">
            <el-form :model="ruleForm4" :rules="rules4" ref="ruleForm4" label-position="left" class="demo-ruleForm ">
                <h3 class="title">密码重置</h3>

                <el-form-item prop="password" :rules="[
      {validator: jiopwd, trigger: 'blur' }
    ]">
                    <el-form-item label="新密码:">
                        <el-input v-model="ruleForm4.password" placeholder="请输入6~20个字符的英文数字组合密码" type="password"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item prop="password2" :rules="[
      {validator: jiopwd, trigger: 'blur' }
    ]">
                    <el-form-item label="请确认密码:">
                        <el-input v-model="ruleForm4.password2" placeholder="请输入6~20个字符的英文数字组合密码" type="password"></el-input>
                    </el-form-item>
                </el-form-item>

                <el-form-item style="width:100%;display: flex;justify-content:center;">
                    <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit5" :loading="logining">确认</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisibleDetail" width="17%" :before-close="handleClose">
        <div class="addaccout addaccout_active">
            <el-form :model="ruleForm3" ref="ruleForm3" :rules="rules3" label-position="left" class="demo-ruleForm ">
                <h3 class="title">用户详情</h3>
                <el-form-item label="使用状态:">
                    <el-radio v-model="ruleForm3.radio" label="0" :disabled="true">启用</el-radio>
                    <el-radio v-model="ruleForm3.radio" label="1" :disabled="true">禁用</el-radio>
                </el-form-item>
                <el-form-item prop="username" :rules="[
      {validator: jiousername, trigger: 'blur' }
    ]">
                    <el-form-item label="账号:">
                        <el-input v-model="ruleForm3.username" :disabled="true"></el-input>
                    </el-form-item>
                </el-form-item>

                <el-form-item prop="name" :rules="[
      {validator: jioname, trigger: 'blur' }
    ]">
                    <el-form-item label="真实姓名:">
                        <el-input v-model="ruleForm3.name" placeholder="真实姓名" :disabled="true"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item prop="phone" :rules="[
      {validator: jiophone, trigger: 'blur' }
    ]">
                    <el-form-item label="联系方式:">
                        <el-input v-model="ruleForm3.phone" placeholder="联系方式" :disabled="true"></el-input>
                    </el-form-item>
                </el-form-item>
                <!-- <el-form-item style="width:100%;display: flex;justify-content:center;">
                    <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit4" :loading="logining">修改</el-button>
                </el-form-item> -->
            </el-form>
        </div>
    </el-dialog>

</section>
</template>

<script>
import tableBarActiveAccount from "../../components/tableBarActiveAccount";
import mySearch from "../../components/mySearch";
import pageNation from "../../components/pageNation";
import {
  userlist,
  userinsert,
  userupdate,
  userdelete,
  userctrl
} from "../../api/api";
import common from "../../common/js/util.js";
export default {
  data() {
    return {
      order: "time_create desc",
      dialogVisible: false,
      dialogVisible2: false,
      dialogVisible3: false,
      dialogVisibleDetail: false,
      searchText: "",
       rotate: false,
      placeholder: "请输入账号",
      operatingStatus: true,
      clomnSelection: true,
      reserveselection: true,
      value1: "",
      value2: "",
      value: "",
      options2: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "0",
          label: "启用"
        },
        {
          value: "1",
          label: "禁用"
        }
      ],
      ruleForm2: {
        username: "",
        nickname: "",
        password: "",
        password2: "",
        value: "",
        radio: "0",
        name: "",
        phone: ""
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
        id: ""
      },
      ruleForm4: {
        username: "",
        nickname: "",
        password: "",
        password2: "",
        value: "",
        radio: "0",
        name: "",
        phone: ""
      },
      rules2: {
        username: [
          {
            required: true,
            message: "4-20位英文加数字组合2",
            trigger: "blur"
          }
        ],
        nickname: [
          {
            required: true,
            message: "请输入用户昵称",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ],
        password2: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "请输入真实姓名",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            message: "请输入联系方式",
            trigger: "blur"
          }
        ]
      },
      rules3: {
        username: [
          {
            required: true,
            message: "请输入用户名3",
            trigger: "blur"
          }
        ],
        nickname: [
          {
            required: true,
            message: "请输入用户昵称",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ],
        password2: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "请输入真实姓名",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: false,
            message: "请输入联系方式",
            trigger: "blur"
          }
        ]
      },
      rules4: {
        username: [
          {
            required: false,
            message: "请输入用户名4",
            trigger: "blur"
          }
        ],
        nickname: [
          {
            required: false,
            message: "请输入用户昵称",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: false,
            message: "请输入密码",
            trigger: "blur"
          }
        ],
        password2: [
          {
            required: false,
            message: "请输入密码",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: false,
            message: "请输入真实姓名",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: false,
            message: "请输入联系方式",
            trigger: "blur"
          }
        ]
      },
      rowHeader: [
        {
          prop: "status",
          label: "状态"
        },
        {
          prop: "username",
          label: "账号"
        },
        // {
        //     prop: "nickname",
        //     label: "用户名",
        //     width: "150px"
        // },
        {
          prop: "user_update",
          label: "修改人",
          width: "150px"
        },
        {
          prop: "time_update",
          label: "修改时间",
          sortable: "custom"
        }
      ],
      tableData: [],
      tableOption: {
        label: "操作",
        width: "500px",

        options: [
          {
            label: "修改",
            type: "primary",
            methods: "checkInfo"
          },

          {
            label: "密码重置",
            type: "danger",
            methods: "password"
          },
          {
            label: "禁用",
            type: "danger",
            methods: "disable"
          },
          {
            label: "删除",
            type: "danger",
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
      allId: [],
       uid:"",
       uname:""
    };
  },
  mounted: function() {
            let tempInfo =JSON.parse(this.get('userInfo'))
        this.uid =tempInfo.id;
        this.uname=tempInfo.username;
    this.queryUserList();
  },

  methods: {
    //密码取消清空
    handleClosePassword(){
      this.$refs.ruleForm4.resetFields();
      this.dialogVisible3=false

    }, 
      //修改详情取消清空
    handleCloseDefail(){
      this.$refs.ruleForm3.resetFields();
      this.dialogVisible2=false

    },
       get: function (name) {
        var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
          return v ? v[2] : null;

    },
    //排序
    tableSortChange(column) {
      this.pager.page = 1;
      if (column.order == "descending") {
        this.order = "time_update desc";
      } else {
        this.order = "time_update asc";
      }
      this.queryUserList();
    },

    //关闭新建弹窗清除验证消息

    handleClose1() {
      this.$refs.ruleForm2.resetFields();
      this.dialogVisible = false;
    },
    //重置
    resetInfo() {
      this.pager.page = 1;
      this.searchText = "";
      this.value = "";
      this.queryUserList();
    },
    onSubmitKey() {
      this.queryUserList();
    },
    //校验账号名
    jiousername(rule, value, callback) {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        var fsdusername = /^(?![0-9]+$)[0-9A-Za-z]{4,20}$/;
        //var fsdusername = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4,20}$/;必须英文和数字组合
        if (fsdusername.test(value) === false) {
          callback(new Error("账号格式错误"));
        } else {
          callback();
        }
      }
    },
    //校验真实姓名
    jioname(rule, value, callback) {
      if (value === "") {
        callback(new Error("请输入真实姓名"));
      } else {
        var fsdname = /^[\u4E00-\u9FA5A-Za-z]{2,20}$/;
        if (fsdname.test(value) === false) {
          callback(new Error("真实姓名格式错误"));
        } else {
          callback();
        }
      }
    },

    //校验密码
    jiopwd(rule, value, callback) {
      let fsdfpwd = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;
      if (fsdfpwd.test(value) === false) {
        callback(new Error("密码格式错误"));
      } else {
        if (this.ruleForm2.password == " ") {
          this.$refs.ruleForm2.validateField("password2");
        }
        callback();
      }
    },
    //校验再次输入密码
    jiopwd1(rule, value, callback) {
      let fsdfpwd = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;
      if (fsdfpwd.test(value) === false) {
        callback(new Error("密码格式错误"));
      } else {
        if (this.ruleForm2.password2 == "") {
          this.$refs.ruleForm2.validateField("password2");
        }
        callback();
      }
    },
    //校验确认密码
    jioqpwd(rule, value, callback) {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.password2) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    },
    //校验电话号
    jiophone(rule, value, callback) {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        var fsdtel = /^[1]([3-9])[0-9]{9}$/;
        if (fsdtel.test(value) === false) {
          callback(new Error("手机号格式错误"));
        } else {
          callback();
        }
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.allId = [];
      for (var i = 0; i < val.length; i++) {
        this.allId.push(val[i].id);
      }
    },
    //批量启用
    allDisable() {
      if (this.allId.length <= 0) {
        this.$message({
          message: "请至少勾选一项",
          type: "error"
        });
        return false;
      }
      this.$confirm("确定要批量启用账号吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          let param = new Object();
          param.ids = this.allId.join(",");
          param.type = 0;
          param.uid=this.uid;
          param.uname=this.uname
          userctrl(param)
            .then(res => {
              if (res.status == 0) {
                this.$message({
                  message: "操作成功",
                  type: "success"
                });
                this.queryUserList();
                this.common.monitoringLogs("修改", "批量启用账号", 1);
              } else {
                this.common.monitoringLogs("修改", "批量启用账号", 1);
              }
            })
            .catch(error => {});
        })
        .catch(() => {});
    },
    //批量启用
    allOn() {
      if (this.allId.length <= 0) {
        this.$message({
          message: "请至少勾选一项",
          type: "error"
        });
        return false;
      }
      this.$confirm("确定要批量启用账号吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          let param = new Object();
          param.ids = this.allId.join(",");
          param.type = 0;
          param.uid=this.uid;
          param.uname=this.uname
          userctrl(param)
            .then(res => {
              if (res.status == 0) {
                this.$message({
                  message: "操作成功",
                  type: "success"
                });
                this.common.monitoringLogs("修改", "批量启用账号", 1);

                this.queryUserList();
              } else {
                this.common.monitoringLogs("修改", "批量启用账号", 0);
              }
            })
            .catch(error => {});
        })
        .catch(() => {});
    },
    //批量禁用
    allOff() {
      if (this.allId.length <= 0) {
        this.$message({
          message: "请至少勾选一项",
          type: "error"
        });
        return false;
      }
      this.$confirm("确定要批量禁用账号吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          let param = new Object();
          param.ids = this.allId.join(",");
          param.type = 1;
          param.uid=this.uid;
          param.uname=this.uname
          userctrl(param)
            .then(res => {
              if (res.status == 0) {
                this.$message({
                  message: "操作成功",
                  type: "success"
                });
                this.queryUserList();
                this.common.monitoringLogs("修改", "批量禁用用账号", 1);
              } else {
                this.common.monitoringLogs("修改", "批量禁用用账号", 0);
              }
            })
            .catch(error => {});
        })
        .catch(() => {});
    },
    //批量删除
    allDelete() {
      if (this.allId.length <= 0) {
        this.$message({
          message: "请至少勾选一项",
          type: "error"
        });
        return false;
      }
      this.$confirm("确定要批量删除账号吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          let param = new Object();
          param.ids = this.allId.join(",");
          param.type = 2;
          param.uid=this.uid;
          param.uname=this.uname
          userctrl(param)
            .then(res => {
              if (res.status == 0) {
                this.$message({
                  message: "操作成功",
                  type: "success"
                });
                this.queryUserList();
                this.common.monitoringLogs("删除", "批量删除账号", 1);
              } else {
                this.common.monitoringLogs("删除", "批量删除账号", 0);
              }
            })
            .catch(error => {});
        })
        .catch(() => {});
    },

    queryUserList() {
      let param = new Object();
      param.page = this.pager.page - 1;
      param.search = this.searchText;
      param.status = parseInt(this.value);
      param.order = this.order;

      userlist(param).then(res => {
        if (res.status != 0) {
          this.$message({
            message: `${res.err_msg}`,
            type: "error"
          });
        } else {
          if (res.result.page == 0) {
            this.pager.count =
              res.result.cols.length * (res.result.page + 1) +
              res.result.les_count;
          } else {
            this.pager.count =
              res.result.cols.length +
              10 * res.result.page +
              res.result.les_count;
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
              nowArr[i].status = "启用";
            } else {
              nowArr[i].status = "禁用";
            }
          }
          this.tableData = nowArr;
        }
      });
    },
    //搜索
    searchInfo() {
      this.queryUserList();
    },
    getShow() {
      this.showState = !this.showState;
         this.rotate = !this.rotate;
    },
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
          this.logining = true;
          console.log(this.ruleForm2)
          var loginParams = {
            username: this.ruleForm2.username,
            nickname: "aa",
            password: this.ruleForm2.password,
            password2: this.ruleForm2.password2,
            role_id: 0,
            phone: this.ruleForm2.phone,
            status: parseInt(this.ruleForm2.radio),
            name: this.ruleForm2.name,
            uname:this.uname,
            uid:this.uid
          };
          userinsert(loginParams).then(data => {
            this.logining = false;
            this.dialogVisible = false;
            let { msg, status, user } = data;
            if (status !== 0) {
              this.$message({
                message: msg,
                type: "error"
              });
              this.common.monitoringLogs("新增", "新增账号", 0);
            } else {
              this.$message({
                message: "添加成功",
                type: "success"
              });

              this.queryUserList();
              this.common.monitoringLogs("新增", "新增账号", 1);
            }
          });
        } else {
          return false;
        }
      });
    },
    //禁用
    disable(val) {
      this.ruleForm3.username = val.username;
      this.ruleForm3.id = val.id;
      this.ruleForm3.name = val.name;
      this.ruleForm3.phone = val.phone;
      (this.ruleForm3.nickname = "aa"),
        (this.ruleForm3.password = ""),
        (this.ruleForm3.password2 = ""),
        (this.ruleForm3.role_id = 0);
      if (val.status == "启用") {
        this.ruleForm3.status = 1;
      } else {
        this.ruleForm3.status = 0;
      }
      this.ruleForm3.uid=this.uid
      this.ruleForm3.uname=this.uname
      let param = new Object();
      param = this.ruleForm3;
     
  

      this.$confirm("确定执行该操作吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          userupdate(param).then(data => {
            this.logining = false;
            this.dialogVisible2 = false;
            let { msg, status, user } = data;
            if (this.ruleForm3.status == 1) {
              if (status !== 0) {
                this.$message({
                  message: msg,
                  type: "error"
                });
                this.common.monitoringLogs("修改", "禁用账号", 0);
              } else {
                this.$message({
                  message: "禁用成功",
                  type: "success"
                });
                this.queryUserList();
                this.common.monitoringLogs("修改", "禁用账号", 1);
              }
            } else {
              if (status !== 0) {
                this.$message({
                  message: msg,
                  type: "error"
                });
                this.common.monitoringLogs("修改", "启用账号", 0);
              } else {
                this.$message({
                  message: "启用成功",
                  type: "success"
                });
                this.queryUserList();
                this.common.monitoringLogs("修改", "启用账号", 1);
              }
            }
          });
        })
        .catch(() => {});
    },
    //修改
    toChange(val) {
      this.dialogVisible2 = true;
      this.ruleForm3.username = val.username;
      this.ruleForm3.id = val.id;
      this.ruleForm3.name = val.name;
      this.ruleForm3.phone = val.phone;
      (this.ruleForm3.nickname = "aa"),
        (this.ruleForm3.password = ""),
        (this.ruleForm3.password2 = ""),
        (this.ruleForm3.role_id = 0);

      //this.ruleForm3.status = parseInt(this.ruleForm3.radio)
    },
    //详情
    toDetail(val) {
      this.dialogVisibleDetail = true;
      this.ruleForm3.username = val.username;
      this.ruleForm3.id = val.id;
      this.ruleForm3.name = val.name;
      this.ruleForm3.phone = val.phone;
      (this.ruleForm3.nickname = "aa"),
        (this.ruleForm3.password = ""),
        (this.ruleForm3.password2 = ""),
        (this.ruleForm3.role_id = 0);
    },
    //重置密码
    changePassword(val) {
      this.dialogVisible3 = true;
      this.ruleForm3.username = val.username;
      this.ruleForm3.id = val.id;
      this.ruleForm3.name = val.name;
      this.ruleForm3.phone = val.phone;
      (this.ruleForm3.nickname = "aa"), (this.ruleForm3.role_id = 0);
      this.ruleForm4.password = "";
      this.ruleForm4.password2 = "";
    },
    //删除
    toDelete(val) {
      let param = new Object();
      param.id = val.id;

      this.$confirm("确定要删除账号吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          userdelete(param)
            .then(res => {
              if (res.status != 0) {
                this.$message({
                  message: res.msg,
                  type: "error"
                });
                this.common.monitoringLogs("删除", "删除账号", 0);
              } else {
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
                this.common.monitoringLogs("删除", "删除账号", 1);

                this.queryUserList();
              }
            })
            .catch(error => {
              this.$message({
                message: res.msg,
                type: "error"
              });
              this.common.monitoringLogs("删除", "删除账号", 0);
            });
        })
        .catch(() => {});
    },
    //新建
    addAccout() {
      this.dialogVisible = true;
      //再次点击清空表单
      this.ruleForm2.username = "";
      this.ruleForm2.nickname = "";
      this.ruleForm2.password = "";
      this.ruleForm2.password2 = "";
      this.ruleForm2.value = "";
      this.ruleForm2.radio = "0";
      this.ruleForm2.name = "";
      this.ruleForm2.phone = "";
    },
    //修改确认
    handleSubmit4(ev) {
      //return false
      var _this = this;
      this.$refs.ruleForm3.validate(valid => {
        if (valid) {
          this.logining = true;
                this.ruleForm3.uid=this.uid
      this.ruleForm3.uname=this.uname
          var loginParams = this.ruleForm3;
          this.ruleForm3.status = parseInt(this.ruleForm3.radio);
          userupdate(loginParams).then(data => {
            this.logining = false;
            this.dialogVisible2 = false;
            let { msg, status, user } = data;
            if (status !== 0) {
              this.$message({
                message: msg,
                type: "error"
              });
              this.common.monitoringLogs("修改", "修改账号信息", 0);
            } else {
              this.$message({
                message: "修改成功",
                type: "success"
              });
              this.common.monitoringLogs("修改", "修改账号信息", 1);

              this.queryUserList();
            }
          });
        } else {
          return false;
        }
      });
    },
    //重置密码确认
    handleSubmit5(ev) {
      var _this = this;
      this.$refs.ruleForm4.validate(valid => {
        if (valid) {
          this.logining = true;
          var loginParams = this.ruleForm3;
          this.ruleForm3.password = this.ruleForm4.password;
          this.ruleForm3.password2 = this.ruleForm4.password2;
          this.ruleForm3.status = parseInt(this.ruleForm3.radio);
            this.ruleForm3.uid=this.uid
      this.ruleForm3.uname=this.uname

          userupdate(loginParams).then(data => {
            this.logining = false;

            let { msg, status, user } = data;
            if (status !== 0) {
              this.$message({
                message: msg,
                type: "error"
              });
              this.common.monitoringLogs("修改", "重置账号密码", 0);
            } else {
              this.dialogVisible3 = false;
              this.$message({
                message: "重置成功",
                type: "success"
              });
              this.common.monitoringLogs("修改", "重置账号密码", 1);
              this.queryUserList();
            }
          });
        } else {
          return false;
        }
      });
    }
  },
  components: {
    pageNation: pageNation,
    tableBarActiveAccount: tableBarActiveAccount,
    mySearch: mySearch
  }
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
    width: 100%;
    height: auto;
    overflow: hidden;
    margin-top: 20px;
    background: #f2f2f2;
    padding: 15px 10px;
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

  &.addaccout_active .el-form-item__error {
    margin-left: 90px;
  }
}
</style>
