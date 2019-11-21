<template>
  <section class="myself-container">
    <div class="user-title">
      <el-row>
        <el-col :span="5">
          <div class="user-item">
            <div class="item-count">1000</div>
            <div class="item-text">总设备</div>
          </div>
        </el-col>
        <el-col :span="5" style="margin-left:30px;">
          <div class="user-item">
            <div class="item-count">1000</div>
            <div class="item-text">已激活设备</div>
          </div>
        </el-col>
        <el-col :span="5" style="margin-left:30px;">
          <div class="user-item">
            <div class="item-count">1000</div>
            <div class="item-text">今日新建</div>
          </div>
        </el-col>
        <el-col :span="5" style="margin-left:30px;">
          <div class="user-item">
            <div class="item-count">1000</div>
            <div class="item-text">今日激活</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="device_form">
      <el-form ref="form" :model="form">
        <el-row type="flex">
          <mySearch :searchText="searchText" @searchInfo="searchInfo"></mySearch>
          <div @click="getShow()" class="div_show" style="color:#606266">筛选</div>
        </el-row>
        <div v-show="showState">
          <el-row type="flex" class="row_activess">
            <el-form-item label="设备激活：" style="display: flex;">
              <el-select v-model="value1" placeholder="请选择" @change="onChange2">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="新建时间：" style="display: flex;">
              <el-date-picker
                style="width: 200px;"
                v-model="time1"
                type="datetime"
                placeholder="选择开始日期时间"
              ></el-date-picker>-
              <el-date-picker
                style="width: 200px;"
                v-model="time2"
                type="datetime"
                placeholder="选择结束日期时间"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="激活时间：" style="display: flex;">
              <el-date-picker
                style="width: 200px;"
                v-model="valueTime"
                type="datetime"
                placeholder="选择开始日期时间"
              ></el-date-picker>-
              <el-date-picker
                style="width: 200px;"
                v-model="valueTime1"
                type="datetime"
                placeholder="选择结束日期时间"
              ></el-date-picker>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" style="margin-left:82px;">确定</el-button>
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
          <el-button type="primary" @click="addAccout">新建设备</el-button>
          <el-button type="primary" @click="addAccout1">批量导入设备</el-button>
        </el-col>
      </el-row>
      <el-row type="flex" class="row_active">
        <el-col :span="24">
          <tableBarActive2
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
          ></tableBarActive2>
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
    <el-dialog
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
      v-model="dialogForm"
    >
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
              <el-input v-model="ruleForm2.new_dev_sn" placeholder="请输入设备SN"></el-input>
            </el-form-item>
          </el-form-item>
          <el-form-item label="设备型号：" style="display: flex;">
            <el-select
              v-model="dev_type"
              placeholder="请选择"
              @change="onChange2"
              style="width:200px;"
            >
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="ROM：" style="display: flex;">
            <el-select
              v-model="rom_version"
              placeholder="请选择"
              @change="onChange2"
              style="width:200px;"
            >
              <el-option
                v-for="item in options2"
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
            <el-button type="primary" @click="handleSubmit2">确定</el-button>
            <el-button type="primary" @click.native.prevent="handleSubmit3">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible2" width="50%" :before-close="handleClose">
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
  devicelist,
  device_cnt_overview,
  device_cnt_basicinfo
} from "../../api/api";
import { log } from "util";
export default {
  data() {
    return {
      dialogVisible: false,
      dialogVisible2: false,
      searchText: "设备SN、设备型号、CPU-ID",
      operatingStatus: true,
      clomnSelection: false,
      reserveselection: true,
      value1: "",
      value2: "",
      time1: "",
      time2: "",
      valueTime: "",
      valueTime1: "",
      options1: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "未激活"
        },
        {
          value: "2",
          label: "已激活"
        }
      ],
      options2: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "设备1"
        },
        {
          value: "2",
          label: "设备2"
        }
      ],

      rowHeader: [
        {
          prop: "dev_sn",
          label: "设备SN"
        },
        {
          prop: "dev_type",
          label: "设备型号"
        },
        {
          prop: "dev_mac",
          label: "MAC地址"
        },
        {
          prop: "cpu_id",
          label: "CPU-ID"
        },
        {
          prop: "total_cap",
          label: "总容量"
        },
        {
          prop: "status",
          label: "新建时间"
        },
        {
          prop: "bind_timestamp",
          label: "激活时间"
        }
      ],
      tableData: [],
      tableOption: {
        label: "操作",
        options: [
          {
            label: "关机",
            type: "primary",
            methods: "freeze"
          },
          {
            label: "重启",
            type: "danger",
            methods: "edit"
          },
          {
            label: "修改",
            type: "danger",
            methods: "edit"
          },
          {
            label: "删除",
            type: "danger",
            methods: "edit"
          }
        ]
      },
      pager: {
        count: 0,
        page: 1,
        rows: 100
      },
      showState: true,
      ruleForm2: {
        new_dev_sn: "",
        dev_type: 1,
        rom_version: "",
        dev_mac: "",
        cpu_id: "",
        total_cap: "",
        is_activated: ""
      },
      rules2: {
        username: [
          {
            required: true,
            message: "请输入用户名",
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
        ]
      }
    };
  },
  mounted() {
    let obj = {
      login_token: ""
    };
    this.getOverview(obj);
    let param = {
      page_no: 1,
      page_size: 10,
      dev_type: -1,
      online_state: -1,
      bind_start_ts: -1,
      bind_end_ts: -1
    };
    this.getInfo(param);
  },
  methods: {
    getInfo(param) {
      devicelist(param)
        .then(res => {
          this.tableData = res.data.dev_list;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getOverview(param) {
      // alert(wrwer)
      device_cnt_overview(param)
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    },
    editBasicinfo(param) {
      device_cnt_basicinfo(param)
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    },
    searchInfo() {
      alert("搜做");
    },
    search() {
      let data = {
        page_no: 1,
        page_size: 10,
        online_state: this.value === "" ? -1 : Number(this.value),
        new_start_ts:
          this.valueTime === "" ? -1 : new Date(this.time1).getTime(),
        new_end_ts:
          this.valueTime1 === "" ? -1 : new Date(this.time2).getTime(),
        bind_start_ts:
          this.valueTime === "" ? -1 : new Date(this.valueTime).getTime(),
        bind_end_ts:
          this.valueTime1 === "" ? -1 : new Date(this.valueTime1).getTime()
      };
      let param = Object.assign(this.common.judgeString(this.searchText), data);
      this.getInfo(param);
    },
    getShow() {
      this.showState = !this.showState;
    },
    handleButton(val, rows) {
      if (val == "edit") {
        this.dialogVisible = true;
        this.ruleForm2 = rows;
      }
      console.log(val);
      console.log(rows);
    },
    addAccout() {
      this.dialogVisible = true;
    },
    addAccout1() {
      this.dialogVisible2 = true;
    },
    handleSubmit2() {
      let param = {
        login_token: "",
        dev_sn: "RKDEV2016081618403",
        info: {
          new_dev_sn: "ARKDEV2016081618403",
          dev_type: 1,
          rom_version: "1.0.6",
          dev_mac: "",
          cpu_id: "",
          total_cap: 1,
          is_activated: 0
        }
      };
      this.editBasicinfo(param);
      this.dialogVisible = false;
      this.getInfo()
    },
    handleSubmit3() {
      this.dialogVisible = false;
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
}
</style>
