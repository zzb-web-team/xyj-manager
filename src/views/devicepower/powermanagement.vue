<template>
<section class="myself-container version_active version_active_new">
    <div class="devide_table">
        <div>算力值收益占比</div>
        <el-row type="flex" class="row_active">
            <el-col :span="24">
                <tableBar id="rebateSetTable2" ref="table2" tooltip-effect="dark" :tableData="tableActive" :clomnSelection="clomnSelection" :rowHeader="rowHeader" :tableOption="tableOption2" @handleButton="handleButtonscale" :operatingStatus="operatingStatus" @toOperating="toOperating" @handleSelectionChange="handleSelectionChange" @selectCheckBox="selectCheckBox" @selectAll="selectAll"></tableBar>
            </el-col>
        </el-row>
    </div>

   

    <div class="devide_table">
        <div>算力值增长</div>
        <el-row type="flex" class="row_active">
            <el-col :span="24">
                <tableBar id="rebateSetTable2" ref="table2" tooltip-effect="dark" :tableData="tableActiveAdd" :clomnSelection="clomnSelection" :rowHeader="rowHeader2" :tableOption="tableOption2" @handleButton="handleButtonAdd" :operatingStatus="operatingStatus" @toOperating="toOperating" @handleSelectionChange="handleSelectionChange" @selectCheckBox="selectCheckBox" @selectAll="selectAll"></tableBar>
            </el-col>
        </el-row>
    </div>
      <div class="devide_table">
        <div>算力值扣除</div>
        <el-row type="flex" class="row_active">
            <el-col :span="24">
                <tableBar id="rebateSetTable2" ref="table2" tooltip-effect="dark" :tableData="tableActiveDes" :clomnSelection="clomnSelection" :rowHeader="rowHeader3" :tableOption="tableOption2" @handleButton="handleButtonDes" :operatingStatus="operatingStatus" @toOperating="toOperating" @handleSelectionChange="handleSelectionChange" @selectCheckBox="selectCheckBox" @selectAll="selectAll"></tableBar>
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
  ptfs_set_com_power_scale
} from "../../api/api.js";
import tableBarActive2 from "../../components/tableBarActive2";
import tableBar from "../../components/tableBar";

import mySearch from "../../components/mySearch";
import pageNation from "../../components/pageNation";
export default {
  data() {
    return {
         addvalue:0,
      desvalue:0,
      scalevalue:0,
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
        versions: ""
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
          label: "算力值区间"
        },

        {
          prop: "earn_pensent",
          label: "收益百分比1"
        }
      ],
      rowHeader2: [
          {
          prop: "behavior",
          label: "用户行为"
        },

        {
          prop: "earn_pensent",
          label: "新增算力值"
        }

      ],
        rowHeader3: [
          {
          prop: "behavior",
          label: "用户行为"
        },

        {
          prop: "earn_pensent",
          label: "扣除算力值"
        }

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
          behavior: "用户矿机节点等级升级为专钻石等级",
        },
      ],
          tableDatanew2: [
          {
          behavior: "用户解绑矿机设备",
        },
        {
          behavior: "用户矿机设备离线1次",
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
            methods: "withdraw"
          }
        ]
      },
      tableOption1: {
        label: "操作",
        options: [
          {
            label: "撤回",
            type: "primary",
            methods: "withdraw"
          }
        ]
      },
      tableOption2: {
        label: "操作",
        options: [
          {
            label: "修改",
            type: "primary",
            methods: "freeze"
          }
        ]
      },
      pager: {
        count: 0,
        page: 1,
        rows: 100
      },
      pager1: {
        count: 0,
        page: 1,
        rows: 100
      },
      pager2: {
        count: 0,
        page: 1,
        rows: 100
      },
      tableData2: [],
      showState: true,
      dialogVisible3: false,
      pageActive: 0,
      noClick: true,
      pagePublic: 0,
      pubUser: [],
      tableActive:[],
      tableActiveAdd:[],
      tableActiveDes:[]
    };
  },
  mounted: function() {
    //this.queryPublishlist()
    //this.queryVersionlist()

    //this.queryPublishlistApp();
   // this.queryversionlistNew();
    // this.queryPublishuser()
    this.queryscaleInfo()
    this.queryaddInfo()
    this.querydesInfo()
  },

  methods: {
      // 算力值收益占比获取
  queryscaleInfo(){
    let param=new Object()
    param.time="0"
    ptfs_get_com_power_scale(param)
    .then(res=>{
      if(res.status==0){
        let obj=res.data
        let tempArr=[]
        for(var i in obj) {
     tempArr.push(obj[i])
    }
     for(var i=0;i<tempArr.length;i++){
       this.tableDatanew[i].earn_pensent=tempArr[i]
     }
      this.tableActive=this.tableDatanew
    
      }else{
        this.$message({
              message: "后台服务无响应",
              type: "error"
            });
      }

    }).catch(error=>{

    })

  },

      // 算力值增长条件获取
  queryaddInfo(){
    let param=new Object()
    param.time="0"
    ptfs_get_com_power_add(param)
    .then(res=>{
      if(res.status==0){
        let obj=res.data
        let tempArr=[]
        for(var i in obj) {
     tempArr.push(obj[i])
    }
     for(var i=0;i<tempArr.length;i++){
       this.tableDatanew1[i].earn_pensent=tempArr[i]
     }
      this.tableActiveAdd=this.tableDatanew1
    
      }else{
        this.$message({
              message: "后台服务无响应",
              type: "error"
            });
      }

    }).catch(error=>{

    })

  },
    // 算力值增长条件扣除
  querydesInfo(){
    let param=new Object()
    param.time="0"
    ptfs_get_com_power_dec(param)
    .then(res=>{
      if(res.status==0){
        let obj=res.data
        let tempArr=[]
        for(var i in obj) {
     tempArr.push(obj[i])
    }
     for(var i=0;i<tempArr.length;i++){
       this.tableDatanew2[i].earn_pensent=tempArr[i]
     }
      this.tableActiveDes=this.tableDatanew2
      console.log(this.tableActiveAdd)
    
      }else{
        this.$message({
              message: "后台服务无响应",
              type: "error"
            });
      }

    }).catch(error=>{

    })

  },
  //修改收益占比
  handleButtonscale(val,row){
    this.scalevalue=val.row.earn_pensent
    
       this.dialogVisible = true;

  },
    ////增长设置
  handleButtonAdd(val,row){
    this.addvalue=val.row.earn_pensent
       this.dialogVisible1 = true;

  },
      ////增长设置
  handleButtonDes(val,row){
    this.desvalue=val.row.earn_pensent
       this.dialogVisible2 = true;

  },
     //增长设置
    onSubmitAdd(){
      this.dialogVisible1=false
      let param=new Object()
      param.con_param_add_type=0,
      param.con_param_add_value=this.addvalue
      ptfs_set_com_power_add(param).then(res=>{
        if(res.status==0){
           this.$message({
            message: "修改成功",
            type: "success"
          });

        }
        else{
           this.$message({
            message: "修改失败",
            type: "error"
          });
        }

      }).catch(error=>{

      })

    },
       //增长设置
    onSubmitScale(){
      this.dialogVisible=false
      let param=new Object()
      param.con_param_add_type=0,
      param.con_param_add_value=this.scalevalue
      ptfs_set_com_power_scale(param).then(res=>{
        if(res.status==0){
           this.$message({
            message: "修改成功",
            type: "success"
          });

        }
        else{
           this.$message({
            message: "修改失败",
            type: "error"
          });
        }

      }).catch(error=>{

      })

    },
       //扣除设置
    onSubmitDes(){
      this.dialogVisible2=false
      let param=new Object()
      param.con_param_add_type=0,
      param.con_param_add_value=this.scalevalue
      ptfs_set_com_power_scale(param).then(res=>{
        if(res.status==0){
           this.$message({
            message: "修改成功",
            type: "success"
          });

        }
        else{
           this.$message({
            message: "修改失败",
            type: "error"
          });
        }

      }).catch(error=>{

      })

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
    //发布清单
    handleButton2(val, row) {
      this.dialogVisible5 = true;
      let param = {
        push_key: row.push_key,
        page: this.pagePublic
      };
      publishuser(param)
        .then(res => {
          if (res.status == 0) {
            let tempArr = res.result.cols;
            this.pubUser = this.pubUser.concat(tempArr);

            if (res.result.les_count == 0) {
              return false;
            } else {
              this.pagePublic++;
              this.handleButton2(val, row);
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //查询灰度发布
    queryversionlistNew() {
      let param = {
        page: this.pager1.page - 1
      };
      versionlistNew(param)
        .then(res => {
          if (res.status == 0) {
            if (res.result.page == 0) {
              this.pager1.count =
                res.result.cols.length * (res.result.page + 1) +
                res.result.les_count;
            } else {
              this.pager1.count =
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

              if (nowArr[i].description.length >= 20) {
                nowArr[i].description =
                  nowArr[i].description.substr(0, 20) + "...";
              }
            }
            if (res.high_version_info >= 20) {
              res.high_version_info =
                res.high_version_info.substr(0, 20) + "...";
            }
            let obj = {
              high_version_info: res.high_version_info,
              packet_version: res.packet_version
            };
            this.tableData3 = [];
            this.tableData3.push(obj);

            this.tableData2 = nowArr;
          } else {
          }
        })
        .catch(error => {});
    },
    //
    onclickimport() {
      this.dialogVisible4 = true;
      this.$refs.upload.clearFiles();
      this.tableType = false;
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
      this.errorcount--;
      if (this.errorcount == 0) {
        this.noClick = false;
      }
    },
    //发布APP
    onSubmitApp() {
      let timetype = 1;
      let timeNums = 0;
      let user_list = [];
      if (this.form.time == "立即发布") {
        timetype = 1;
        timeNums = 0;
      } else {
        timetype = 0;
        timeNums =parseInt(this.form.date / 1000)
        if(timeNums<=Date.parse(new Date())/1000) {
           this.$message({
          message: "指定时间不能小于当前时间",
          type: "error"
        });
        return false;
        }
      }
      if (this.form.type == "") {
        this.$message({
          message: "请选择发布类型",
          type: "error"
        });
        return false;
      }
      if (this.form.versions == "") {
        this.$message({
          message: "请选择发布版本",
          type: "error"
        });
        return false;
      }
      if (this.form.desc == "") {
        this.$message({
          message: "发布描述不可为空",
          type: "error"
        });
        return false;
      }
      if (this.form.user == "指定用户") {
        if (this.form.version == "") {
          this.$message({
            message: "请输入指定账号",
            type: "error"
          });
          return false;
        }
      }
    
      if (this.form.type == "正式发布") {
        user_list = [];
      } else {
        user_list = this.form.version.split(",");
        var resIDActive = /^1[34578]\d{9}$/;
        for (var i = 0; i < user_list.length; i++) {
          if (resIDActive.test(user_list[i]) == false) {
            this.$message({
              message: "指定账号格式错误",
              type: "error"
            });
            return false;
          }
        }
      }
      let param = {
        packet_version: this.form.versions,
        push_type: this.form.type,
        description: this.form.desc,
        atonce: timetype,
        timing: timeNums,
        user_list: user_list
      };

      publishApp(param)
        .then(res => {
          if (res.status == 0) {
            this.$message({
              message: "发布成功",
              type: "success"
            });
            this.common.monitoringLogs("发布", "发布app安装包", 1);

            this.dialogVisible = false;
            this.queryPublishlistApp();
            this.queryversionlistNew();
            this.form.versions=""
          } else {
            this.$message({
              message: `${res.msg}`,
              type: "error"
            });
            this.common.monitoringLogs("发布", "发布app安装包", 0);

            this.dialogVisible = false;
          }
        })
        .catch(error => {
          this.common.monitoringLogs("发布", "发布app安装包", 0);

          console.log(error);
        });
    },
  





    //分页
    handleCurrentChange(val) {
      this.pager.page = val.val;
      this.queryPublishlistApp();
    },
    //分页
    handleCurrentChange1(val) {
      this.pager1.page = val.val;
      this.queryversionlistNew();
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
        console.log(res);

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
        console.log(this.tableList);
      } else {
        this.$message({
          showClose: true,
          message: "服务器响应超时",
          type: "error"
        });
      }
    },
    errormove(err, file, fileList) {},
    down() {
      var url = hostUrl + "/static/app_user.xls";
      // window.location.href = url;
      window.open(url, "_blank");
    }
  },
  components: {
    pageNation: pageNation,
    tableBarActive2: tableBarActive2,
    mySearch: mySearch,
    tableBar: tableBar
  }
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
