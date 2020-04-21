<template>
<section class="myself-container version_active version_active_new">
    <div class="devide_table">
        <div>贡献值增长</div>
        <el-row type="flex" class="row_active">
            <el-col :span="24">
                <tableBarIndex id="rebateSetTable2" ref="table2" tooltip-effect="dark" :tableData="tableActive" :clomnSelection="clomnSelection" :rowHeader="rowHeader" :tableOption="tableOption1" @handleButton="handleButtonAdd" :operatingStatus="operatingStatus" @toOperating="toOperating" @handleSelectionChange="handleSelectionChange" @selectCheckBox="selectCheckBox" @selectAll="selectAll"></tableBarIndex>
            </el-col>
        </el-row>
    </div>

   

    <div class="devide_table">
        <div>贡献值扣除</div>
        <el-row type="flex" class="row_active">
            <el-col :span="24">
                <tableBarIndex id="rebateSetTable2" ref="table2" tooltip-effect="dark" :tableData="tableActive1" :clomnSelection="clomnSelection" :rowHeader="rowHeader2" :tableOption="tableOption2" @handleButton="handleButtonDes" :operatingStatus="operatingStatus" @toOperating="toOperating" @handleSelectionChange="handleSelectionChange" @selectCheckBox="selectCheckBox" @selectAll="selectAll"></tableBarIndex>
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
    <!---->
    <el-dialog :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <el-form ref="form">
             <el-form-item label="新增贡献值修改:">
                  <el-input v-model="addvalue"  type='number'></el-input>
            </el-form-item>
           
            <div style="text-align: center;">
                <el-button type="primary" @click="onSubmitAdd">确定</el-button>
                <el-button @click="dialogVisible=false">取消</el-button>
            </div>
        </el-form>
    </el-dialog>

    <el-dialog :visible.sync="dialogVisible1" width="30%" :before-close="handleClose">
        <el-form ref="form">
             <el-form-item label="扣除贡献值修改:">
                  <el-input v-model="desvalue"></el-input>
            </el-form-item>
           
            <div style="text-align: center;">
                <el-button type="primary" @click="onSubmitDes">确定</el-button>
                <el-button @click="dialogVisible1=false">取消</el-button>
            </div>
        </el-form>
    </el-dialog>

    <!--发布清单-->

    <el-dialog class="dialog_active1" :before-close="beforeclose" :visible.sync="dialogVisible5" title="发布清单" width="15%">
        <div class="pub_con">
            <p v-for="item in pubUser" :key="item">{{item.user}}</p>

        </div>
    </el-dialog>
</section>
</template>

<script>
import {
  ptfs_get_con_param_add,
  ptfs_get_con_param_dec,
  ptfs_set_con_param_add,
  ptfs_set_con_param_dec
} from "../../api/api.js";
import tableBarIndex from "../../components/tableBarIndex";

import mySearch from "../../components/mySearch";
import pageNation from "../../components/pageNation";
import common from "../../common/js/util.js";

export default {
  data() {
    return {
      addvalue:0,
      desvalue:0,
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
      dialogVisible1: false,
      rowHeader: [
         {
          prop: "behavior",
          label: "用户行为"
        },

        {
          prop: "earn_pensent",
          label: "新增贡献值"
        }
      ],
      rowHeader2: [
          {
          prop: "behavior",
          label: "用户行为"
        },

        {
          prop: "earn_pensent",
          label: "贡献值扣除"
        }

      ],
      rowHeader1: [
        {
          prop: "id",
          label: "ID",
          width: "100px"
        },
        {
          prop: "time_create",
          label: "发布日期"
        },
        {
          prop: "packet_version",
          label: "版本号"
        },
        {
          prop: "push_type",
          label: "发布类型"
        },

        {
          prop: "description",
          label: "发布描述",
          width: "400px"
        },
        {
          prop: "push_type_active",
          label: "发布用户"
        }
      ],
      tableData2: [],
      tableData3: [],
      tableData: [
        {
          version: "测试数据1",
          channel: "测试数据1",
          desc: "测试数据1"
        },
        {
          version: "测试数据2",
          channel: "测试数据2",
          desc: "测试数据2"
        }
      ],
         tableDatanew: [
        {
          behavior: "用户矿机绑定设备",
        },
        {
          behavior: "用户矿机设备每日累计在线1小时",
        },
         {
          behavior: "用户的矿机节点网络宽带被调用1次",
        },
         {
          behavior: "用户的矿机节点储存空间每日被调用>=8小时",
        },
    
      ],
       tableDatanew1: [
           {
          behavior: "用户解绑矿机设备",
        },
        {
          behavior: "用户矿机设备每日离线累计>=1小时",
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
            label: "修改",
            type: "primary",
            methods: "freeze"
          } ,
          
  
        ]
      },
      tableOption2: {
        label: "操作",
        options: [
          {
            label: "修改",
            type: "primary",
            methods: "freeze"
          } ,
        
  
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
            tableActive1:[],
            addindex:0,
            desindex:0

    };
  },
  mounted: function() {
    //this.queryPublishlist()
    //this.queryVersionlist()

    //this.queryPublishlistApp();
    //this.queryversionlistNew();
    // this.queryPublishuser()
    this.queryaddInfo()
    this.querydesInfo()
  },

  methods: {
    keydownhandle(event) {
      const { key } = event;
      // 或者根据键码判断, 下面过滤掉除数字和退格外的所有输入
      if (new RegExp(/[0-9]/).test(key) || key === 'Backspace') return;
      event.preventDefault();
    },
    //增长设置
    onSubmitAdd(){
    
      let param=new Object()
      param.con_param_add_type=this.addindex,
      param.con_param_add_value=parseInt(this.addvalue) 
      ptfs_set_con_param_add(param).then(res=>{
        if(res.status==0){
           this.$message({
            message: "修改成功",
            type: "success"
          });
           this.common.monitoringLogs("修改", "修改贡献值增长", 1);
         this.queryaddInfo()
    this.dialogVisible=false
        }
        else{
           this.$message({
            message: "修改失败",
            type: "error"
          });
        }
         this.common.monitoringLogs("修改", "修改贡献值增长", 0);

      }).catch(error=>{

      })

    },
    //减少设置
     onSubmitDes(){
       
      let param=new Object()
      param.con_param_dec_type=this.desindex,
      param.con_param_dec_value=parseFloat(this.desvalue) 
       param.con_param_dec_limit=6

      ptfs_set_con_param_dec(param).then(res=>{
        if(res.status==0){
           this.$message({
            message: "修改成功",
            type: "success"
          });
          this.common.monitoringLogs("修改", "修改贡献值扣除", 1);
          this.querydesInfo()
          this.dialogVisible1=false

        }
        else{
           this.$message({
            message: "修改失败",
            type: "error"
          });
        }
        this.common.monitoringLogs("修改", "修改贡献值扣除", 0);

      }).catch(error=>{

      })

    },
      //增长获取
  queryaddInfo(){
    this.tableActive=[]
    let param =new Object()
    param.time=0
    ptfs_get_con_param_add(param)
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
    }).catch(
            error => {
          this.$message({
            message: "网络出错，请重新请求",
            type: "error"
          });
        }
    )
    
    
  },
        //减少获取
  querydesInfo(){
    this.tableActive1=[]
    let param =new Object()
        param.time=0
    ptfs_get_con_param_dec(param)
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
      this.tableActive1=this.tableDatanew1
    
      }else{
        this.$message({
              message: "后台服务无响应",
              type: "error"
            });
      }
    }).catch(
            error => {
          this.$message({
            message: "网络出错，请重新请求",
            type: "error"
          });
        }
    )
    
    
  },
     //导出地址变量
        // UploadUrl(){
        //     return hostUrl+"/url_mgmt/excel_url"
        // },
    //关闭回调
    beforeclose() {
      this.dialogVisible = false;
      this.pubUser = [];
    },
    //新增贡献值修改
    handleButtonAdd(val) {
        this.addindex=val.row
        this.addvalue=val.methods.earn_pensent 
      this.dialogVisible = true;
  

    },
    //扣除贡献值修改
       handleButtonDes(val) {
         this.desindex=val.row
             this.desvalue=val.methods.earn_pensent
         this.dialogVisible1=true
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

    searchInfo() {
      alert("搜做");
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
  
  },
  components: {
    pageNation: pageNation,
    mySearch: mySearch,
    tableBarIndex: tableBarIndex
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
