<template>
  <section class="myself-container">
    <div class="device_form">
      <el-form ref="form" :model="form">
        <el-row type="flex">
          <div class="search-con">
            <i class="el-icon-search" style="color:#606266"></i>
            <el-input class="search-input" v-model="searchText" placeholder="设备SN、用户ID"></el-input>
          </div>
          <div @click="getShow()" class="div_show" style="color:#606266">筛选</div>
        </el-row>
        <el-row type="flex" class="row_activess" v-show="showState">
          <el-form-item label="日期" style="display: flex;">
            <el-date-picker
              v-model="start_time"
              style="width:200px;"
              type="datetime"
              placeholder="选择开始日期时间"
            ></el-date-picker> -
            <el-date-picker
              v-model="end_time"
              style="width:200px;"
              type="datetime"
              placeholder="选择结束日期时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">确定</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">重置</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <div class="devide_table">
      <el-row type="flex" class="row_active">
        <el-col :span="6">
          <el-button type="primary" @click="addAccout">调整算力系数</el-button>
        </el-col>
      </el-row>
      <el-row type="flex" class="row_active">
        <el-col :span="24">
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              prop = "dev_sn"
              label = "设备SN"
            >
            </el-table-column>
            <el-table-column
              prop="user_id"
              label="绑定用户ID"
            >
            </el-table-column>
            <el-table-column
              prop=""
              label="当日剩余空间/总空间"
            >
                <template slot-scope="scope">
                  <span disable-transitions>{{(scope.row.free_cap/1024/1024/1024).toFixed(2)}}G/
                  </span>
                  <span disable-transitions>{{(scope.row.total_cap/1024/1024/1024).toFixed(2)}}G
                  </span>
                </template>
            </el-table-column>
            <el-table-column
              prop=""
              label="当日平均上下行宽带"
            >
              <template slot-scope="scope">
                  <span disable-transitions>{{(scope.row.up_bandwidth/1024/1024).toFixed(2)}}MB/
                  </span>
                  <span disable-transitions>{{(scope.row.down_bandwidth/1024/1024).toFixed(2)}}MB
                  </span>
                </template>
            </el-table-column>
            <el-table-column
              prop="online_time"
              label="当日在线时长"
              :formatter="onlineTime"
            >
            </el-table-column>
            <el-table-column
              prop="ip_value"
              label="当日IP"
              :formatter="formatNumber"
            >
            </el-table-column>
            <el-table-column
              prop="store_value"
              label="当日存储值"
              :formatter="formatNumber"
            >
            </el-table-column>
            <el-table-column
              prop="store"
              label="当日算力"
              :formatter="formatNumber"
            >
            </el-table-column>
            <el-table-column
              prop="time_stamp"
              :formatter="formatTime"
              label="时间"
            >
            </el-table-column>
          </el-table>
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
    <el-dialog :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <div class="addaccout">
        <el-form
          :model="ruleForm2"
          :rules="rules2"
          ref="ruleForm2"
          label-position="left"
          class="demo-ruleForm"
        >
          <h3 class="title">调整算力系数</h3>
          <el-form-item prop="username">
            <el-form-item label="IP 系数:">
              <el-input v-model="ruleForm2.ip_radio" placeholder="请输入IP 系数"></el-input>
            </el-form-item>
          </el-form-item>
          <el-form-item prop="nickname">
            <el-form-item label="存储系数:">
              <el-input v-model="ruleForm2.store_radio" placeholder="请输入存储系数"></el-input>
            </el-form-item>
          </el-form-item>
          <el-form-item style="width:100%;display: flex;justify-content:center;">
            <el-button type="primary" @click="change" :loading="logining">确定</el-button>
            <el-button type="primary" @click="handleSubmit3">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import tableBarActive2 from "../../components/tableBarActive2";
import mySearch from "../../components/mySearch";
import pageNation from "../../components/pageNation";
import { getDevicePower, set_earn_param } from "../../api/api";
export default {
  data() {
    return {
      dialogVisible: false,
      dialogVisible2: false,
      searchText: "",
      start_time: "",
      end_time: "",
      tableData: [],
      ruleForm2: {
          ip_radio: '',
          store_radio: ''
      },
      pager: {
        count: 0,
        page: 1,
        rows: 100
      },
      showState: true
    };
  },
  mounted() {
      this.getInfo();
      this.getEarnParam(1)
  },
  methods: {
    formatTime(row){
        return this.common.getTimes(row.time_stamp*1000);
    },
    formatNumber(row, column){
      const property = column['property'];
      return (row[property]/1000000).toFixed(6)
    },
    onlineTime(row){
      return (row.online_time/3600).toFixed(2) + 'h'
    },
    getEarnParam(val) {
      let param = {
        param_type: val,
        store_radio: this.ruleForm2.store_radio === '' ? '' : Number(this.ruleForm2.store_radio),
        ip_radio: this.ruleForm2.ip_radio === '' ? '' : Number(this.ruleForm2.ip_radio),
      };
      set_earn_param(param)
        .then(res => {
          if (res.status === 0) {
              if(val === 0) {
                  this.$message({
                    type: "success",
                    message: res.err_msg
                });
              }
              this.ruleForm2.store_radio = res.data.store_radio/10000000;
              this.ruleForm2.ip_radio = res.data.ip_radio/10000000;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getInfo() {
      var data = {
        cur_page: this.pager.page - 1,
        start_time:
          this.start_time === "" ? 0 : new Date(this.start_time).getTime(),
        end_time: this.end_time === "" ? 0 : new Date(this.end_time).getTime()
      };
      if(this.judgeString(this.searchText)){
        var arr = Object.keys(this.judgeString(this.searchText));
        data.query_type = arr.length === 0 ?  0 : 1;
        var param = Object.assign(this.judgeString(this.searchText), data);
      }else{
        this.$message.error('请输入正确的设备SN、用户ID')
        return;
      }
      
      getDevicePower(param)
        .then(res => {
          if (res.status === 0) {
            this.tableData = res.data.profit_detail_list;
            this.pager.count = res.data.total_num;
            this.pager.rows = res.data.total_page;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getShow() {
      this.showState = !this.showState;
    },
    search() {
      this.pager.page = 1;
      this.getInfo()
    },
    addAccout() {
      this.dialogVisible = true;
    },
    handleCurrentChange(val){
      this.pager.page = val.val;
      this.getInfo()
    },
    change(){
        this.getEarnParam(0)
    },
    judgeString(str){
      const reg1 = /^\d{8}$/;
      const reg3 = /^(SMM)[0-9]{9}$/;
      if(reg1.test(str)){
        return {
          dev_sn: '',
          nick_name: '',
          user_id: Number(str)
        }
      }else if(reg3.test(str)){
        return {
          user_id: 0,
          nick_name: '',
          dev_sn: str
        }
      }else if(str === ''){
        return {}
      }else{
        return false
      }
    }
  },
  components: {
    pageNation: pageNation,
    tableBarActive2: tableBarActive2,
    mySearch: mySearch
  }
};
</script>

<style lang="less">
.myself-container {
  width: 100%;
  min-width: 1600px;

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
    padding: 15px 30px;
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
