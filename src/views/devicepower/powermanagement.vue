<template>
<section class="myself-container version_active version_active_new">
    <div class="devide_table">
        <div>算力值收益占比</div>
        <el-row type="flex" class="row_active">
            <el-col :span="24">
                <tableBarIndex id="rebateSetTable2" ref="table2" tooltip-effect="dark" :tableData="tableActive" :clomnSelection="clomnSelection" :rowHeader="rowHeader" :tableOption="tableOption2" @handleButton="handleButtonscale" :operatingStatus="operatingStatus" @toOperating="toOperating" @handleSelectionChange="handleSelectionChange" @selectCheckBox="selectCheckBox" @selectAll="selectAll"></tableBarIndex>
            </el-col>
        </el-row>
    </div>

   

    <div class="devide_table">
        <div>算力值增长</div>
        <el-row type="flex" class="row_active">
            <el-col :span="24">
                <tableBarIndex id="rebateSetTable2" ref="table2" tooltip-effect="dark" :tableData="tableActiveAdd" :clomnSelection="clomnSelection" :rowHeader="rowHeader2" :tableOption="tableOption2" @handleButton="handleButtonAdd" :operatingStatus="operatingStatus" @toOperating="toOperating" @handleSelectionChange="handleSelectionChange" @selectCheckBox="selectCheckBox" @selectAll="selectAll"></tableBarIndex>
            </el-col>
        </el-row>
    </div>
      <div class="devide_table">
        <div>算力值扣除</div>
        <el-row type="flex" class="row_active">
            <el-col :span="24">
                <tableBarIndex id="rebateSetTable2" ref="table2" tooltip-effect="dark" :tableData="tableActiveDes" :clomnSelection="clomnSelection" :rowHeader="rowHeader3" :tableOption="tableOption2" @handleButton="handleButtonDes" :operatingStatus="operatingStatus" @toOperating="toOperating" @handleSelectionChange="handleSelectionChange" @selectCheckBox="selectCheckBox" @selectAll="selectAll"></tableBarIndex>
            </el-col>
        </el-row>
    </div>
    <div class="devide_pageNation" style="display: flex;justify-content: space-between;">
        <el-row type="flex"></el-row>
        <el-row type="flex">
            <el-col :span="6">
                <pageNation :pager="pager" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"></pageNation>
            </el-col>
        </el-row>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <el-form ref="form">
             <el-form-item label="收益占比修改:">
                  <el-input v-model="scalevalue"></el-input>
            </el-form-item>
           
            <div style="text-align: center;">
                <el-button type="primary" @click="onSubmitScale">确定</el-button>
                <el-button @click="dialogVisible=false">取消</el-button>
            </div>
        </el-form>
    </el-dialog>
      <el-dialog :visible.sync="dialogVisible1" width="30%" :before-close="handleClose">
        <el-form ref="form">
             <el-form-item label="新增算力值修改:">
                  <el-input v-model="addvalue"></el-input>
            </el-form-item>
           
            <div style="text-align: center;">
                <el-button type="primary" @click="onSubmitAdd">确定</el-button>
                <el-button @click="dialogVisible1=false">取消</el-button>
            </div>
        </el-form>
    </el-dialog>
          <el-dialog :visible.sync="dialogVisible2" width="30%" :before-close="handleClose">
        <el-form ref="form">
             <el-form-item label="扣除算力值修改:">
                  <el-input v-model="desvalue"></el-input>
            </el-form-item>
           
            <div style="text-align: center;">
                <el-button type="primary" @click="onSubmitDes">确定</el-button>
                <el-button @click="dialogVisible2=false">取消</el-button>
            </div>
        </el-form>
    </el-dialog>

  
</section>
</template>

<script>
import {
  // publishlistApp,
  // publishApp,
  // getversionApp,
  // versionlistNew,
  // publishuser,
  // hostUrl,
  ptfs_get_com_power_scale,
  ptfs_get_com_power_add,
  ptfs_get_com_power_dec,
  ptfs_set_com_power_dec,
  ptfs_set_com_power_add,
  ptfs_set_com_power_scale,
} from "../../api/api.js";
import tableBarActive2 from "../../components/tableBarActive2";
import tableBarIndex from "../../components/tableBarIndex";

import mySearch from "../../components/mySearch";
import pageNation from "../../components/pageNation";
import common from "../../common/js/util.js";

export default {
  data() {
    return {
      addvalue: 0,
      desvalue: 0,
      scalevalue: 0,
      operatingStatus1: false,
      tableType: false,
      dialogVisible5: false,
      dialogVisible4: false,
      allType: false,
      oneType: false,
      tabPosition: "top",
      form: {
        type: "",
        version: "",
        channel: "",
        desc: "",
        user: "",
        assign: "指定账号",
        time: "立即发布",
        date: "",
        versions: "",
      },
      versionsList: [],
      assigning: "",
      timing: "",
      operatingStatus: true,
      dialogVisible: false,
      dialogVisible2: false,
      dialogVisible1: false,
      rowHeader: [
        {
          prop: "behavior",
          label: "算力值区间",
        },

        {
          prop: "earn_pensent",
          label: "收益百分比",
        },
      ],
      rowHeader2: [
        {
          prop: "behavior",
          label: "用户行为",
        },

        {
          prop: "earn_pensent",
          label: "新增算力值",
        },
      ],
      rowHeader3: [
        {
          prop: "behavior",
          label: "用户行为",
        },

        {
          prop: "earn_pensent",
          label: "扣除算力值",
        },
      ],

      tableDatanew: [
        {
          behavior: "0-99",
        },
        {
          behavior: "100-199",
        },
        {
          behavior: "200-299",
        },
        {
          behavior: "300-499",
        },
        {
          behavior: "500-969",
        },
        {
          behavior: "700-899",
        },
        {
          behavior: ">=900",
        },
      ],
      tableDatanew1: [
        {
          behavior: "用户绑定矿机设备",
        },
        {
          behavior: "用户每日签到",
        },
        {
          behavior: "用户的矿机设备日累计在线24小时",
        },
        {
          behavior: "用户矿机节点等级升级为黄金等级",
        },
        {
          behavior: "用户矿机节点等级升级为铂金等级",
        },
        {
          behavior: "用户矿机节点等级升级为钻石等级",
        },
      ],
      tableDatanew2: [
        {
          behavior: "用户解绑矿机设备",
        },
        {
          behavior: "用户矿机设备离线1次",
        },
      ],
      tableOption: {
        label: "操作",
        options: [
          {
            label: "撤回",
            type: "primary",
            methods: "withdraw",
          },
        ],
      },
      tableOption1: {
        label: "操作",
        options: [
          {
            label: "撤回",
            type: "primary",
            methods: "withdraw",
          },
        ],
      },
      tableOption2: {
        label: "操作",
        options: [
          {
            label: "修改",
            type: "primary",
            methods: "freeze",
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
      pager2: {
        count: 0,
        page: 1,
        rows: 100,
      },
      tableData2: [],
      showState: true,
      dialogVisible3: false,
      pageActive: 0,
      noClick: true,
      pagePublic: 0,
      pubUser: [],
      tableActive: [],
      tableActiveAdd: [],
      tableActiveDes: [],
      scaleindex: 0,
      addindex: 0,
      desindex: 0,
    };
  },
  mounted: function() {
    //this.queryPublishlist()
    //this.queryVersionlist()

    //this.queryPublishlistApp();
    // this.queryPublishuser()
    this.queryscaleInfo();
    this.queryaddInfo();
    this.querydesInfo();
  },

  methods: {
    // 算力值收益占比获取
    queryscaleInfo() {
      this.tableActive = [];
      let param = new Object();
      param.time = "0";
      ptfs_get_com_power_scale(param)
        .then(res => {
          if (res.status == 0) {
            let obj = res.data;
            let tempArr = [];
            for (var i in obj) {
              tempArr.push(obj[i]);
            }
            for (var i = 0; i < tempArr.length; i++) {
              this.tableDatanew[i].earn_pensent = tempArr[i] + "%";
            }
            this.tableActive = this.tableDatanew;
          } else {
            this.$message({
              message: "后台服务无响应",
              type: "error",
            });
          }
        })
        .catch(error => {});
    },

    // 算力值增长条件获取
    queryaddInfo() {
      this.tableActiveAdd = [];
      let param = new Object();
      param.time = "0";
      ptfs_get_com_power_add(param)
        .then(res => {
          if (res.status == 0) {
            let obj = res.data;
            let tempArr = [];
            for (var i in obj) {
              tempArr.push(obj[i]);
            }
            for (var i = 0; i < tempArr.length; i++) {
              if(i>2){
  this.tableDatanew1[i].earn_pensent = tempArr[i]+"%";
              }else{
                  this.tableDatanew1[i].earn_pensent = tempArr[i];
              }
            
            }
            this.tableActiveAdd = this.tableDatanew1;
          } else {
            this.$message({
              message: "后台服务无响应",
              type: "error",
            });
          }
        })
        .catch(error => {});
    },
    // 算力值增长条件扣除
    querydesInfo() {
      this.tableActiveDes = [];
      let param = new Object();
      param.time = "0";
      ptfs_get_com_power_dec(param)
        .then(res => {
          if (res.status == 0) {
            let obj = res.data;
            let tempArr = [];
            for (var i in obj) {
              tempArr.push(obj[i]);
            }
            for (var i = 0; i < tempArr.length; i++) {
              this.tableDatanew2[i].earn_pensent = tempArr[i];
            }
            this.tableActiveDes = this.tableDatanew2;
          } else {
            this.$message({
              message: "后台服务无响应",
              type: "error",
            });
          }
        })
        .catch(error => {});
    },
    //修改收益占比
    handleButtonscale(val) {
      this.scaleindex = val.row;
      this.scalevalue = val.methods.earn_pensent.replace("%", "");
      console.log(this.scalevalue);

      this.dialogVisible = true;
    },
    ////增长设置
    handleButtonAdd(val) {
      this.addindex = val.row;
      this.addvalue = val.methods.earn_pensent;
      this.dialogVisible1 = true;
    },
    //扣除设置
    handleButtonDes(val) {
      this.desindex = val.row;
      this.desvalue = val.methods.earn_pensent;
      this.dialogVisible2 = true;
    },
    //增长设置
    onSubmitAdd() {
      this.dialogVisible1 = false;
      let param = new Object();
      if(this.addindex>2){
        this.addvalue=  this.addvalue.replace("%", "");
      }
      (param.cp_param_set_type = this.addindex),
        (param.cp_param_set_value = parseInt(this.addvalue));
      ptfs_set_com_power_add(param)
        .then(res => {
          if (res.status == 0) {
            this.$message({
              message: "修改成功",
              type: "success",
            });
            this.common.monitoringLogs("修改", "修改算力值增长", 1);
          } else {
            this.$message({
              message: "修改失败",
              type: "error",
            });
                      this.common.monitoringLogs("修改", "修改算力值增长", 0);

          }
          this.queryaddInfo();
        })
        .catch(error => {});
    },
    //增长设置
    onSubmitScale() {
      this.dialogVisible = false;
 
      let param = new Object();
      this.scalevalue=this.scalevalue.replace("%", "");
      if (this.scaleindex == 0) {
        this.tableActive[this.scaleindex].earn_pensent=this.tableActive[this.scaleindex].earn_pensent.replace("%", "");
        if (
          // parseInt(this.scalevalue) <=
          //  parseInt(this.tableActive[this.scaleindex].earn_pensent ) ||
          parseInt(this.scalevalue) <= 0 ||
          parseInt(this.scalevalue) > 100
        ) {
          this.$message({
            message: "设置有问题，后值不能大于前值且小于100，请重新设置",
            type: "error",
          });
          return false;
        }
      } else {
               this.tableActive[this.scaleindex - 1].earn_pensent=this.tableActive[this.scaleindex - 1].earn_pensent.replace("%", "");

        if (
          parseInt(this.scalevalue) <=parseInt(this.tableActive[this.scaleindex - 1].earn_pensent) ||
          parseInt(this.scalevalue) <= 0 ||
          parseInt(this.scalevalue) > 100
        ) {
          this.$message({
            message: "设置有问题，后值不能大于前值且小于100，请重新设置",
            type: "error",
          });
          return false;
        }
      }

      (param.cp_param_set_type = this.scaleindex),
        (param.cp_param_set_value = parseInt(this.scalevalue));
      if (parseInt(this.scalevalue) <= 0 || parseInt(this.scalevalue) > 100) {
        this.$message({
          message: "设置有问题，设置值应该在0~100之间，请重新设置",
          type: "error",
        });
        return false;
      }
      ptfs_set_com_power_scale(param)
        .then(res => {
          if (res.status == 0) {
            this.$message({
              message: "修改成功",
              type: "success",
            });
            this.common.monitoringLogs("修改", "修改算力值收益占比", 1);
          } else {
            this.$message({
              message: "设置有问题，请重新设置",
              type: "error",
            });
                        this.common.monitoringLogs("修改", "修改算力值收益占比", 0);

          }
          this.queryscaleInfo();
        })
        .catch(error => {});
    },
    //扣除设置
    onSubmitDes() {
      this.dialogVisible2 = false;
      let param = new Object();
      (param.cp_param_set_type = this.desindex),
        (param.cp_param_set_value = parseInt(this.desvalue));
      ptfs_set_com_power_dec(param)
        .then(res => {
          if (res.status == 0) {
            this.$message({
              message: "修改成功",
              type: "success",
            });
             this.common.monitoringLogs("修改", "修改算力值扣除", 1);
          } else {
            this.$message({
              message: "修改失败",
              type: "error",
            });
             this.common.monitoringLogs("修改", "修改算力值扣除", 1);
          }

          this.querydesInfo();
        })
        .catch(error => {});
    },
    //导出地址变量
    // UploadUrl(){
    //     return hostUrl+"/url_mgmt/excel_url"
    // },
    //关闭回调
    beforeclose() {
      this.dialogVisible5 = false;
      this.pubUser = [];
    },

    //分页
    handleCurrentChange(val) {
      this.pager.page = val.val;
      this.queryPublishlistApp();
    },
    //分页
    handleCurrentChange1(val) {
      this.pager1.page = val.val;
    },

    getShow() {
      this.showState = !this.showState;
    },
    handleButton(val, rows) {
      if (val == "withdraw") {
        this.dialogVisible2 = true;
        this.romVersion = rows.rom_version;
      }
    },
    handleButton1(val, rows) {
      if (val == "withdraw") {
        this.dialogVisible3 = true;
        this.romVersion = rows.rom_version;
      }
    },
    add() {
      this.dialogVisible = true;
      this.form.desc = "";
      this.form.version = "";
      this.form.type = "";
      this.form.version = "";
      this.querygetversion();
    },
    changeTime(value) {
      this.timing = value;
    },
    changeAssign(value) {
      this.assigning = value;
    },
    //确定上传
    submitUploadOK() {
      let tempstr = "";
      for (var i = 0; i < this.tableList.length; i++) {
        tempstr += this.tableList[i].phone + ",";
      }
      tempstr = tempstr.slice(0, -1);
      this.form.version = tempstr;
      this.dialogVisible4 = false;
    },
    goback() {
      this.$router.go(-1);
    },
    //文件列表移除文件
    submitUpload() {
      this.$refs.upload.submit();
    },
    //上传
    handlePreview(file) {},
    //移除上传文件
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleRemove(file, fileList) {},
    //上传成功
    handleAvatarSuccess(res, file) {
      this.message = [];
      this.title = "";
      if (res.status == 0) {
        this.tableType = true;
        var resID = /^1[34578]\d{9}$/;
        this.errorcount = 0;
        for (var i = 0; i < res.data.length; i++) {
          var err = 0;
          if (resID.test(res.data[i].phone) === false) {
            res.data[i].urlstatus = false;
            err++;
          } else {
            res.data[i].urlstatus = true;
          }

          if (err > 0) {
            this.errorcount++;
            res.data[i].errstatus = "0";
          }
        }
        if (this.errorcount == 0) {
          this.noClick = false;
        } else {
          this.noClick = true;
        }

        this.tableList = res.data;
      } else {
        this.$message({
          showClose: true,
          message: "服务器响应超时",
          type: "error",
        });
      }
    },
    errormove(err, file, fileList) {},
    down() {
      var url = hostUrl + "/static/app_user.xls";
      // window.location.href = url;
      window.open(url, "_blank");
    },
  },
  components: {
    pageNation: pageNation,
    tableBarActive2: tableBarActive2,
    mySearch: mySearch,
    tableBarIndex: tableBarIndex,
  },
};
</script>

<style lang="less">
.version_active_new .dialog_active2 {
  .el-dialog__body {
    height: 550px;
  }
}

.dialog_active1 {
  .el-dialog__body {
    padding-top: 0px;
  }
}

.el-button {
  padding: 8px 20px;
}

.upload-demo {
  // height: 400px;
}

.version_active {
  .el-form-item {
    margin-bottom: 10px;
  }
}

.changetab {
  margin-top: 20px;
}

.changetab .grey {
  color: #606266;
}

.changetab .grey.active {
  color: #409eff;
}

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

.pub_con {
  max-height: 500px;
  text-align: center;
  overflow: auto;
}
</style>
