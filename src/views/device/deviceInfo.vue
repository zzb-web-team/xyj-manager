<template>
<section class="myself-container">
    <div class="user-title">
        <el-row>
            <el-col :span="5">
                <div class="user-item">
                    <div class="item-count">{{bound_dev_cnt}}</div>
                    <div class="item-text">已绑定设备</div>
                </div>
            </el-col>
            <el-col :span="5" style="margin-left:30px;">
                <div class="user-item">
                    <div class="item-count">{{online_dev_cnt}}</div>
                    <div class="item-text">在线设备</div>
                </div>
            </el-col>
        </el-row>
    </div>
    <div class="device_form">
        <el-form ref="form" :model="form">
            <el-row type="flex">
                <div class="search-con">
                    <i class="el-icon-search" style="color:#606266"></i>
                    <el-input class="search-input" v-model="searchText" placeholder="设备SN、设备名称、MAC地址、设备IP、节点ID" @keyup.enter.native="onSubmitKey"></el-input>
                </div>
                <div @click="getShow()" class="div_show" style="color:#606266">筛选</div>
            </el-row>
            <div v-show="showState">
                <el-row type="flex" class="row_activess">
                    <el-form-item label="设备类型" style="display: flex;width:180px;">
                        <el-select v-model="dev_type" placeholder="请选择">
                            <el-option v-for="item in dev_types" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="ROM：" style="display: flex; width:180px;">
                        <el-select v-model="rom_version" placeholder="请选择">
                            <el-option v-for="item in roms" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="设备状态" style="display: flex;width:180px;">
                        <el-select v-model="online_state" placeholder="请选择">
                            <el-option v-for="item in onlineStates" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="绑定" style="display: flex;width:180px;">
                        <el-select v-model="bind_flag" placeholder="请选择" @change="onChange2">
                            <el-option v-for="item in bindFlags" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="注册时间" style="display: flex;">
                        <el-date-picker v-model="bind_start_ts" style="width:150px;" type="datetime" placeholder="选择开始日期时间"></el-date-picker>-
                        <el-date-picker v-model="bind_end_ts" style="width:150px;" type="datetime" placeholder="选择结束日期时间"></el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" style="" @click="search">确定</el-button>
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
            <el-col style="display: flex;justify-content: flex-end;">
                <el-button type="primary" @click="toexportExcel">导出</el-button>
            </el-col>
        </el-row>
        <el-row type="flex" class="row_active">
            <el-col>
                <el-table :data="tableData" border width="100%" >
                    <el-table-column prop="dev_sn" label="设备SN" ></el-table-column>
                    <el-table-column :formatter="formatDevType" prop="dev_type" label="设备类型" ></el-table-column>
                    <el-table-column prop="rom_version" label="ROM" ></el-table-column>
                    <el-table-column prop="dev_name" label="设备名称" ></el-table-column>
                    <el-table-column prop="dev_mac" label="MAC地址" ></el-table-column>
                    <el-table-column prop="cpu_id" label="CPU-ID" ></el-table-column>
                    <el-table-column prop="total_cap" :formatter="formatDevCap" label="总容量"></el-table-column>
                    <el-table-column prop="dev_ip" label="设备IP" ></el-table-column>
                    <el-table-column prop="online_state" :formatter="formatState" label="设备状态" ></el-table-column>
                    <el-table-column prop="bind_flag" :formatter="formatBind" label="是否绑定" ></el-table-column>
                    <el-table-column prop="bind_timestamp" :formatter="formatDevTime" label="绑定时间" sortable ></el-table-column>
                    <el-table-column prop="ipfs_id" label="节点ID"></el-table-column>
                    <el-table-column prop="bind_user_id" label="绑定用户ID" ></el-table-column>
                    <el-table-column label="操作" width="200px">
                        <template slot-scope="scope">
                            <el-button @click="shut(scope.row)" type="text" size="small">关机</el-button>
                            <el-button type="text" @click="restart(scope.row)" size="small">重启</el-button>
                            <el-button v-show="scope.row.bind_flag===1" @click="untied(scope.row)" type="text" size="small">强制解绑</el-button>
                            <el-button v-show="scope.row.bind_flag===0" type="text" @click="tie(scope.row)" size="small">绑定</el-button>
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
                <pageNation :pager="pager" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"></pageNation>
            </el-col>
        </el-row>
    </div>
</section>
</template>

<script>
import tableBarActive2 from "../../components/tableBarActive2";
import mySearch from "../../components/mySearch";
import pageNation from "../../components/pageNation";
import {
  devicelist, //table查询
  device_cnt_overview, //查询title
  change_device_bind_state, //强制解绑
  ctrl_node_state //关机重启
} from "../../api/api";
import common from "../../common/js/util.js";
export default {
  data() {
    return {
      dialogVisible: false,
      dialogVisible2: false,
      searchText: "",
      bound_dev_cnt: "",
      online_dev_cnt: "",
      operatingStatus: true,
      clomnSelection: false,
      reserveselection: true,
      rom_version: "",
      dev_type: "",
      online_state: "",
      bind_flag: "",
      bind_start_ts: "",
      bind_end_ts: "",
      dev_types: [
        {
          value: "-1",
          label: "全部"
        },
        {
          value: "RK3328",
          label: "RK3328"
        },
        {
          value: "AMS805",
          label: "AMS805"
        }
      ],
      onlineStates: [
        {
          value: "-1",
          label: "全部"
        },
        {
          value: "0",
          label: "离线"
        },
        {
          value: "1",
          label: "在线"
        },
        {
          value: "2",
          label: "鉴权失败"
        },
        {
          value: "3",
          label: "鉴权成功"
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
      bindFlags: [
        {
          value: "-1",
          label: "全部"
        },
        {
          value: "0",
          label: "否"
        },
        {
          value: "1",
          label: "是"
        }
      ],
      roms: [
        {
          value: "",
          label: "全部"
        },
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
      tableData: [],
      tableOption: {
        label: "操作",
        options: [
          {
            label: "关机",
            type: "primary",
            methods: "shutdown"
          },
          {
            label: "重启",
            type: "danger",
            methods: "restart"
          },
          {
            label: "解绑",
            type: "danger",
            methods: "untied"
          }
        ]
      },
      pager: {
        count: 0,
        page: 1,
        rows: 100
      },
      showState: false,
      tableData2: [],
      pageActive: 0
    };
  },
  mounted() {
    this.getOverview();
    this.getInfo();
  },
  methods: {
    //回车键搜索
    onSubmitKey() {
      this.getInfo();
    },

    //导出的方法
    exportExcel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("../../excel/Export2Excel");
        const tHeader = [
          "设备SN",
          "设备类型",
          "ROM",
          "设备名称",
          "MAC地址",
          "CPU-ID",
          "总容量",
          "设备IP",
          "设备状态",
          "是否绑定",
          "绑定时间",
          "节点ID",
          "绑定用户ID"
        ];
        // 上面设置Excel的表格第一行的标题
        const filterVal = [
          "dev_sn",
          "dev_type",
          "rom_version",
          "dev_name",
          "dev_mac",
          "cpu_id",
          "total_cap",
          "dev_ip",
          "online_state",
          "bind_flag",
          "bind_timestamp",
          "ipfs_id",
          "bind_user_id"
        ];

        // 上面的index、nickName、name是tableData里对象的属性
        const list = this.tableData2; //把data里的tableData存到list
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "设备信息表");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    //重置
    resetInfo() {
      this.pager.page = 1;
      this.searchText = "";
      this.bind_end_ts = "";
      this.bind_flag = "";
      this.bind_start_ts = "";
      this.dev_type = "";
      this.online_state = "";
      this.getInfo();
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    formatDevCap(row) {
      return (row.total_cap / 1024 / 1024 / 1024).toFixed(2) + "G";
    },
    formatDevType(row) {
      if (row.dev_type === 1) {
        return "RK3328";
      } else {
        return "AMS805";
      }
    },
    formatDevTime(row) {
      return this.common.getTimes(row.bind_timestamp * 1000);
    },
    formatState(row) {
      if (row.online_state === 0) {
        return "离线";
      } else if (row.online_state === 1) {
        return "在线";
      } else if (row.online_state === 2) {
        return " 鉴权失败";
      } else if (row.online_state === 3) {
        return "鉴权成功";
      } else if (row.online_state === 100) {
        return "未激活";
      } else if (row.online_state === 101) {
        return "已激活";
      }
    },
    formatBind(row) {
      if (row.bind_flag === 0) {
        return "否";
      } else if (row.bind_flag === 1) {
        return "是";
      }
    },
    getInfo() {
      var data = {
        page_no: this.pager.page - 1,
        page_size: 10,
        dev_type:
          this.dev_type === "" ? -1 : this.dev_type === "RK3328" ? 1 : 2,
        online_state: this.online_state === "" ? -1 : Number(this.online_state),
        rom_version: this.rom_version === "" ? "" : this.rom_version,
        bind_flag: this.bind_flag === "" ? -1 : Number(this.bind_flag),

        bind_start_ts:
          this.bind_start_ts === ""
            ? -1
            : this.bind_start_ts == null
              ? -1
              : new Date(this.bind_start_ts).getTime() / 1000,
        bind_end_ts:
          this.bind_end_ts === ""
            ? -1
            : this.bind_end_ts == null
              ? -1
              : new Date(this.bind_end_ts).getTime() / 1000
      };
      if (this.judgeString(this.searchText)) {
        var param = Object.assign(this.judgeString(this.searchText), data);
      } else {
        this.$message.error(
          "请输入正确的设备SN、设备名称、MAC地址、设备IP、节点ID"
        );
        return;
      }
      devicelist(param)
        .then(res => {
          if (res.status === 0) {
            this.tableData = res.data.dev_list;
            this.pager.count = res.data.total_num;
            this.pager.rows = res.data.total_page;
          } else {
            this.$message({
              message: `${res.err_msg}`,
              type: "error"
            });
          }
        })
        .catch(error => {
          this.$message({
            message: "网络出错，请重新请求",
            type: "error"
          });
        });
    },
    toexportExcel() {
      var data = {
        page_no: this.pageActive,
        page_size: 10,
        dev_type:
          this.dev_type === "" ? -1 : this.dev_type === "RK3328" ? 1 : 2,
        online_state: this.online_state === "" ? -1 : Number(this.online_state),
        rom_version: this.rom_version === "" ? "" : this.rom_version,
        bind_flag: this.bind_flag === "" ? -1 : Number(this.bind_flag),

        bind_start_ts:
          this.bind_start_ts === ""
            ? -1
            : this.bind_start_ts == null
              ? -1
              : new Date(this.bind_start_ts).getTime() / 1000,
        bind_end_ts:
          this.bind_end_ts === ""
            ? -1
            : this.bind_end_ts == null
              ? -1
              : new Date(this.bind_end_ts).getTime() / 1000
      };
      if (this.judgeString(this.searchText)) {
        var param = Object.assign(this.judgeString(this.searchText), data);
      } else {
        this.$message.error(
          "请输入正确的设备SN、设备名称、MAC地址、设备IP、节点ID"
        );
        return;
      }
      devicelist(param)
        .then(res => {
          if (res.status === 0) {
            //this.tableData2 = res.data.dev_list;
            // this.pager.count = res.data.total_num;
            // this.pager.rows = res.data.total_page;
            this.pageActive = res.data.cur_page;
            if (res.data.cur_page >= res.data.total_page) {
              this.exportExcel();
              this.common.monitoringLogs("导出", "导出设备信息表", 1);
            } else {
              this.tableData2 = this.tableData2.concat(res.data.dev_list);
              this.pageActive++;
              this.toexportExcel();
            }
          } else {
            this.$message({
              message: `${res.err_msg}`,
              type: "error"
            });
            this.common.monitoringLogs("导出", "导出设备信息表", 0);
          }
        })
        .catch(error => {
          console.log(error);
          this.common.monitoringLogs("导出", "导出设备信息表", 0);
          // this.$message({
          //     message: "网络出错，请重新请求",
          //     type: "error"
          // });
        });
    },

    getOverview() {
      device_cnt_overview()
        .then(res => {
          if (res.status === 0) {
            this.bound_dev_cnt = res.data.bound_dev_cnt;
            this.online_dev_cnt = res.data.online_dev_cnt;
          }
        })
        .catch(error => {
          this.$message({
            message: "网络出错，请重新请求",
            type: "error"
          });
        });
    },
    comfirmUntied(type, sn) {
      let obj = {
        login_token: "8vAmfX19fX3gkqggfX19fQ++",
        bind_user_tel_num: "",
        dev_sn: sn,
        ctrl_token: "8vAmfX19fX3gkqggfX19fQ++",
        bind_type: type // 0 表示解绑； 1 表示绑定
      };
      change_device_bind_state(obj)
        .then(res => {
          if (res.status === 0) {
            this.$message({
              message: type === 0 ? "解绑成功" : "绑定成功",
              type: "success"
            });
            this.getInfo();
          } else {
            this.$message({
              message: `${res.err_msg}`,
              type: "error"
            });
          }
        })
        .catch(error => {
          this.$message({
            message: "网络出错，请重新请求",
            type: "error"
          });
        });
    },
    closeRestore(type, sn) {
      let obj = {
        login_token: "8vAmfX19fX1NeaggfX19fQ==",
        dev_sn: sn, // 需要重启的设备sn
        extra_info: {
          ctrl_type: type // 1 表示重启(已实现)；2 表示 关机(当前西柚机客户端还未实现此功能)
        }
      };
      ctrl_node_state(obj)
        .then(res => {
          if (res.status === 0) {
            this.$message({
              message: type === 1 ? "重启成功" : "关机成功",
              type: "success"
            });
            this.getInfo();
          } else {
            this.$message({
              message: `${res.err_msg}`,
              type: "error"
            });
          }
        })
        .catch(error => {
          this.$message({
            message: "网络出错，请重新请求",
            type: "error"
          });
        });
    },
    getShow() {
      this.showState = !this.showState;
    },
    untied(rows) {
      this.$confirm("确定解绑?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.comfirmUntied(0, rows.dev_sn);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消解绑"
          });
        });
    },
    tie(rows) {
      this.$confirm("确定绑定?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.comfirmUntied(1, rows.dev_sn);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消绑定"
          });
        });
    },
    shut(rows) {
      //关机
      this.$confirm("确定关机?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.closeRestore(2, rows.dev_sn);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消关机"
          });
        });
    },
    restart(rows) {
      //重启
      this.$confirm("确定重启?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.closeRestore(1, rows.dev_sn);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消重启"
          });
        });
    },
    search() {
      this.pager.page = 1;
      this.getInfo();
    },
    addAccout() {
      this.dialogVisible = true;
    },
    handleCurrentChange(val) {
      this.pager.page = val.val;
      this.getInfo();
    },
    judgeString(str) {
      const reg3 = /^(SMM)[0-9]{9}$/;
      const reg5 = /^[\u4E00-\u9FA5A-Za-z0-9]{4,20}$/;
      const reg7 = /^\d+$/;
      if (reg3.test(str)) {
        return {
          dev_sn: str
        };
      } else if (reg5.test(str) && !reg7.test(str) && !reg3.test(str)) {
        return {
          dev_name: str
        };
      } else if (str === "") {
        return {};
      } else {
        return false;
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

  background: #ffffff;
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

  .search-con {
    width: 250px;
    height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid #999999;

    .search-input {
      .el-input__inner {
        border: none;
        background: none;
      }
    }
  }
}
</style>
