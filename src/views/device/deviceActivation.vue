<template>
  <section class="myself-container">
    <div class="user-title">
      <el-row>
        <el-col :span="5">
          <div class="user-item">
            <div class="item-count">{{total_dev_cnt}}</div>
            <div class="item-text">总设备</div>
          </div>
        </el-col>
        <el-col :span="5" style="margin-left:30px;">
          <div class="user-item">
            <div class="item-count">{{activated_dev_cnt}}</div>
            <div class="item-text">已激活设备</div>
          </div>
        </el-col>
        <el-col :span="5" style="margin-left:30px;">
          <div class="user-item">
            <div class="item-count">{{today_import_dev_cnt}}</div>
            <div class="item-text">今日新建</div>
          </div>
        </el-col>
        <el-col :span="5" style="margin-left:30px;">
          <div class="user-item">
            <div class="item-count">{{today_activated_dev_cnt}}</div>
            <div class="item-text">今日激活</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="device_form">
      <el-form ref="form" :model="form">
        <el-row type="flex">
          <div class="search-con">
            <i class="el-icon-search" style="color:#606266"></i>
            <el-input class="search-input" v-model="searchText" placeholder="设备SN、设备型号、CPU-ID"></el-input>
          </div>
          <div @click="getShow()" class="div_show" style="color:#606266">筛选</div>
        </el-row>
        <div v-show="showState">
          <el-row type="flex" class="row_activess">
            <el-form-item label="设备激活：" style="display: flex;">
              <el-select v-model="is_activated" placeholder="请选择">
                <el-option
                  v-for="item in actives"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="新建时间：" style="display: flex;">
              <el-date-picker
                style="width: 200px;"
                v-model="import_start_ts"
                type="datetime"
                placeholder="选择开始日期时间"
              ></el-date-picker>-
              <el-date-picker
                style="width: 200px;"
                v-model="import_end_ts"
                type="datetime"
                placeholder="选择结束日期时间"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="激活时间：" style="display: flex;">
              <el-date-picker
                style="width: 200px;"
                v-model="activate_start_ts"
                type="datetime"
                placeholder="选择开始日期时间"
              ></el-date-picker>-
              <el-date-picker
                style="width: 200px;"
                v-model="activate_end_ts"
                type="datetime"
                placeholder="选择结束日期时间"
              ></el-date-picker>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" style="margin-left:82px;" @click="search">确定</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">重置</el-button>
            </el-form-item>
          </el-row>
        </div>
      </el-form>
    </div>
    <div class="devide_table">
      <el-row type="flex" class="row_active">
        <el-col :span="6">
          <el-button type="primary" @click="addDev">新建设备</el-button>
          <el-button type="primary" @click="importDev">批量导入设备</el-button>
        </el-col>
      </el-row>
      <el-row type="flex" class="row_active">
        <el-col :span="24">
          <!-- <tableBarActive2
            id="rebateSetTable"
            ref="table1"
            tooltip-effect="dark"
            :tableData="tableData"
            :clomnSelection="clomnSelection"
            :rowHeader="rowHeader"
            :tableOption="tableOption"
            @handleButton="handleButton"
            :operatingStatus="operatingStatus"
            @toOperating="toOperating"
            @handleSelectionChange="handleSelectionChange"
            @selectCheckBox="selectCheckBox"
            @selectAll="selectAll"
          ></tableBarActive2> -->
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              fixed
              prop = "dev_sn"
              label = "设备SN"
              width="150">
            </el-table-column>
            <el-table-column
              prop="dev_type"
              :formatter="formatDevType"
              label="设备类型"
              width="120">
            </el-table-column>
            <el-table-column
              prop="rom_version"
              label="ROM"
              width="120">
            </el-table-column>
            <el-table-column
              prop="dev_mac"
              label="MAC地址"
              width="120">
            </el-table-column>
            <el-table-column
              prop="cpu_id"
              label="CPU-ID"
              width="300">
            </el-table-column>
            <el-table-column
              prop="total_cap"
              label="总容量"
              width="120">
            </el-table-column>
            <el-table-column
              prop="import_ts"
              label="新建时间"
              :formatter="formatterImport"
              width="180">
            </el-table-column>
            <el-table-column
              prop="is_activated"
              label="设备激活"
              :formatter="formatterType"
              width="120">
            </el-table-column>
            <el-table-column
              prop="activate_ts"
              label="激活时间"
              width="180"
              :formatter="formatterActive"
              >
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="200">
              <template slot-scope="scope">
                <el-button @click="open(scope.row)" type="text" size="small">开机</el-button>
                <el-button type="text" @click="open(scope.row)" size="small">重启</el-button>
                <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
                <el-button type="text" @click="del(scope.row)" size="small">删除</el-button>
              </template>
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
    <el-dialog :visible.sync="dialogVisible1" width="40%" :before-close="handleClose">
      <div class="addaccout">
        <el-form
          :model="ruleForm2"
          :rules="rules2"
          ref="ruleForm2"
          label-position="left"
          class="demo-ruleForm"
        >
          <h3 class="title">新建设备</h3>
          <el-form-item prop="username">
            <el-form-item label="设备SN:">
              <el-input v-model="ruleForm2.dev_sn" placeholder="请输入设备SN"></el-input>
            </el-form-item>
          </el-form-item>
          <el-form-item label="设备型号：" style="display: flex;">
            <el-select
              v-model="ruleForm2.dev_type"
              placeholder="请选择"
              @change="onChange2"
              style="width:200px;"
            >
              <el-option
                v-for="item in dev_types"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="ROM：" style="display: flex;">
            <el-select
              v-model="ruleForm2.rom_version"
              placeholder="请选择"
              @change="onChange2"
              style="width:200px;"
            >
              <el-option
                v-for="item in roms"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="nickname">
            <el-form-item label="MAC地址:">
              <el-input v-model="ruleForm2.dev_mac" placeholder="请输入MAC地址"></el-input>
            </el-form-item>
          </el-form-item>
          <el-form-item prop="nickname">
            <el-form-item label="CPU-ID:">
              <el-input v-model="ruleForm2.cpu_id" placeholder="请输入CPU-ID"></el-input>
            </el-form-item>
          </el-form-item>
          <el-form-item prop="nickname">
            <el-form-item label="总容量:">
              <el-input v-model="ruleForm2.total_cap" placeholder="请输入总容量"></el-input>
            </el-form-item>
          </el-form-item>
          <el-form-item style="width:100%;display: flex;justify-content:center;">
            <el-button type="primary" @click="importDevice">确定</el-button>
            <el-button type="primary" @click.native.prevent="handleSubmit3">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogVisible2"
      width="40%"
      :before-close="handleClose"
      v-model="rowsData"
    >
      <div class="addaccout">
        <el-form
          :model="ruleForm1"
          :rules="rules1"
          ref="ruleForm2"
          label-position="left"
          class="demo-ruleForm"
        >
          <h3 class="title">修改</h3>
          <el-form-item prop="username">
            <el-form-item label="设备SN:">
              <el-input v-model="ruleForm1.new_dev_sn" placeholder="请输入设备SN"></el-input>
            </el-form-item>
          </el-form-item>
          <el-form-item label="设备型号：" style="display: flex;">
            <el-select
              v-model="ruleForm1.dev_type"
              placeholder="请选择"
              @change="onChange2"
              style="width:200px;"
            >
              <el-option
                v-for="item in dev_type"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="ROM：" style="display: flex;">
            <el-select
              v-model="ruleForm1.rom_version"
              placeholder="请选择"
              @change="onChange2"
              style="width:200px;"
            >
              <el-option
                v-for="item in roms"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="nickname">
            <el-form-item label="MAC地址:">
              <el-input v-model="ruleForm1.dev_mac" placeholder="请输入MAC地址"></el-input>
            </el-form-item>
          </el-form-item>
          <el-form-item prop="nickname">
            <el-form-item label="CPU-ID:">
              <el-input v-model="ruleForm1.cpu_id" placeholder="请输入CPU-ID"></el-input>
            </el-form-item>
          </el-form-item>
          <el-form-item prop="nickname">
            <el-form-item label="总容量:">
              <el-input v-model="ruleForm1.total_cap" placeholder="请输入总容量"></el-input>
            </el-form-item>
          </el-form-item>
          <el-form-item label="设备激活：" style="display: flex;">
            <el-select v-model="ruleForm1.is_activated" placeholder="请选择">
              <el-option
                v-for="item in active"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="width:100%;display: flex;justify-content:center;">
            <el-button type="primary" @click="handleSubmit2">确定</el-button>
            <el-button type="primary" @click.native.prevent="handleSubmit3">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible3" width="50%" :before-close="handleClose">
      <div class="import">
        <div class="import-t">
          <el-button type="primary">上传Excel文件</el-button>
        </div>
        <div class="import-m">
          <textarea></textarea>
        </div>
        <div class="import-m">
          <el-button type="primary">导入</el-button>
        </div>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import tableBarActive2 from "../../components/tableBarActive2";
import mySearch from "../../components/mySearch";
import pageNation from "../../components/pageNation";
import {
  device_cnt_overview, // title查询
  query_devinfo_by_conditions, //查询表单
  change_device_bind_state, //解绑
  import_node_basicinfo //新建设备
} from "../../api/api";
import { log } from "util";
export default {
  data() {
    return {
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      searchText: "",
      operatingStatus: true,
      clomnSelection: false,
      reserveselection: true,
      total_dev_cnt: "",
      activated_dev_cnt: "",
      today_import_dev_cnt: "",
      today_activated_dev_cnt: "",
      is_activated: "",
      import_start_ts: "",
      import_end_ts: "",
      activate_start_ts: "",
      activate_end_ts: "",
      rowsData: "",
      actives: [
        {
          value: "-1",
          label: "全部"
        },
        {
          value: "100",
          label: "未激活"
        },
        {
          value: "101",
          label: "已激活"
        }
      ],
      active: [
        {
          value: "100",
          label: "未激活"
        },
        {
          value: "101",
          label: "已激活"
        }
      ],
      dev_types: [
        {
          value: "RK3328",
          label: "RK3328"
        },
        {
          value: "AMS805",
          label: "AMS805"
        }
      ],
      roms: [
        {
          value: "1.2.21",
          label: "1.2.21"
        },
        {
          value: "1.2.20",
          label: "1.2.20"
        },
        {
          value: "1.2.19",
          label: "1.2.19"
        },
        {
          value: "1.2.18",
          label: "1.2.18"
        },
        {
          value: "1.2.17",
          label: "1.2.17"
        },
        {
          value: "1.2.16",
          label: "1.2.16"
        },
        {
          value: "1.2.11",
          label: "1.2.11"
        },
        {
          value: "1.2.10",
          label: "1.2.10"
        },
        {
          value: "1.1.9",
          label: "1.1.9"
        },
        {
          value: "1.0.56",
          label: "1.0.56"
        },
        {
          value: "1.0.5",
          label: "1.0.5"
        },
        {
          value: "1.0.3",
          label: "1.0.3"
        },
        {
          value: "1.0.1",
          label: "1.0.1"
        }
      ],
      rowHeader: [  
      ],
      tableData: [],
      pager: {
        count: 0,
        page: 1,
        rows: 100
      },
      showState: true,
      ruleForm2: {
        dev_sn: "",
        dev_type: "",
        rom_version: "",
        dev_mac: "",
        cpu_id: "",
        total_cap: ""
      },
      ruleForm1: {
        new_dev_sn: "",
        dev_type: "",
        rom_version: "",
        dev_mac: "",
        cpu_id: "",
        total_cap: "",
        is_activated: ""
      }
    };
  },
  mounted() {
    this.getOverview();
    this.getInfo();
  },
  methods: {
    getInfo() {
      let data = {
        page_no: 1,
        page_size: 10,
        login_token: "",
        is_activated: this.is_activated === "" ? -1 : Number(this.is_activated),
        import_start_ts:
          this.import_start_ts === ""
            ? -1
            : new Date(this.import_start_ts).getTime(),
        import_end_ts:
          this.import_end_ts === ""
            ? -1
            : new Date(this.import_end_ts).getTime(),
        activate_start_ts:
          this.activate_start_ts === ""
            ? -1
            : new Date(this.activate_start_ts).getTime(),
        activate_end_ts:
          this.activate_end_ts === ""
            ? -1
            : new Date(this.activate_end_ts).getTime()
      };
      let param = Object.assign(this.common.judgeString(this.searchText), data);
      query_devinfo_by_conditions(param)
        .then(res => {
          if (res.status === 0) {
            this.tableData = res.data.dev_list;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getOverview() {
      let param = {
        login_token: ""
      };
      device_cnt_overview(param)
        .then(res => {
          if (res.status === 0) {
            this.total_dev_cnt = res.data.total_dev_cnt;
            this.activated_dev_cnt = res.data.activated_dev_cnt;
            this.today_import_dev_cnt = res.data.today_import_dev_cnt;
            this.today_activated_dev_cnt = res.data.today_activated_dev_cnt;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    editBasicinfo() {
      this.ruleForm1.dev_type = this.ruleForm1.dev_type === "RK3328" ? 1 : 2;
      this.ruleForm1.is_activated = this.ruleForm1.is_activated === "未激活" ? 100 : 101;
      this.ruleForm1.total_cap = Number(this.ruleForm1.total_cap);
      this.ruleForm1.login_token = "";
      let param = {
        login_token: "",
        dev_sn: this.rowsData.dev_sn,
        info: this.ruleForm1
      };
      console.log(param)
      device_cnt_basicinfo(param)
        .then(res => {
          this.$message({
            message: '修改成功',
            type: 'success'
          });
          this.getInfo();
          this.dialogVisible2 = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    importDevice() {
      this.ruleForm2.dev_type = this.ruleForm2.dev_type === "RK3328" ? 1 : 2;
      this.ruleForm2.total_cap = Number(this.ruleForm2.total_cap);
      this.ruleForm2.login_token = "";
      console.log(this.ruleForm2);
      import_node_basicinfo(this.ruleForm2)
        .then(res => {
          if (res.status === 0) {
            this.$message({
              message: '新建设备成功',
              type: 'success'
            });
            this.getInfo();
            this.dialogVisible1 = false;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    search() {
      this.getInfo();
    },
    getShow() {
      this.showState = !this.showState;
    },
    formatDevType(row){
      if(row.dev_type === 1){
        return 'RK3328'
      }else{
        return 'AMS805'
      }
    },
    formatterType(row){
      if(row.is_activated === 100 ){
        return '未激活'
      }else if(row.is_activated === 101){
        return '已激活'
      }
    },
    formatterActive(row){
      return this.common.getTimes(row.activate_ts)
    },
    formatterImport(row){
      return this.common.getTimes(row.import_ts)
    },
    open(rows){},
    restart(rows){},
    edit(rows){
      console.log(rows)
      this.dialogVisible2 = true;
      this.ruleForm1 = rows;
      this.rowsData = rows;
      rows.dev_type === 1
        ? (this.ruleForm1.dev_type = "RK3328")
        : (this.ruleForm1.dev_type = "AMS805");
      rows.is_activated === 100
      ? (this.ruleForm1.dev_type = "未激活")
      : (this.ruleForm1.dev_type = "已激活");
    },
    del(rows){},
    addDev() {
      this.dialogVisible1 = true;
    },
    handleSubmit2() {},
    handleSubmit3() {},
    handleClick() {}
  },
  components: {
    pageNation: pageNation,
    tableBarActive2: tableBarActive2,
    mySearch: mySearch
  }
};
</script>

<style lang="less">
.import {
  .import-m {
    margin-top: 20px;
    textarea {
      width: 100%;
      height: 200px;
    }
  }
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
}
</style>
