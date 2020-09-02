<template>
  <section class="myself-container deviceAvtive">
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
      <el-form ref="form" :model="form" style="margin-top:20px;">
        <el-row type="flex">
                 <el-form-item  style="display: flex;">
                <el-input v-model="searchText" size="small" placeholder="设备SN、CPU-ID" @keyup.enter.native="onSubmitKey">
                        <i slot="prefix" class="el-input__icon el-icon-search"  @click="onSubmitKey"></i>
                </el-input>
                  </el-form-item>
                <el-row type="flex">
                    <el-form-item label="设备激活：">
                        <el-select v-model="is_activated" size="small" placeholder="请选择" style="width:180px;">
                            <el-option v-for="item in actives" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="新建时间：" style="display: flex;">
                        <el-date-picker
                        size="small"
                        v-model="import_time_value"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"></el-date-picker>
                        </el-form-item>
                    <el-form-item label="激活时间：" style="display: flex;">
                        <el-date-picker
                        size="small"
                            v-model="time_value"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                    <el-button type="primary" size="small" style="margin-left:10px;" @click="search">确定</el-button>
                    </el-form-item>
                    <el-form-item>
                    <el-button type="primary" size="small" @click="resetInfo">重置</el-button>
                    </el-form-item>
                </el-row>
        </el-row>
        <div v-show="showState">
        </div>
      </el-form>
    </div>
    <div class="devide_table">
      <el-row type="flex" class="row_active" style="display: flex;justify-content: space-between;">
        <el-col :span="6">
          <el-button type="primary" @click="addDev">新建设备</el-button>
          <el-button type="primary" @click="importDev">批量导入设备</el-button>
        </el-col>
        <el-col :span="6" style="  display: flex; justify-content: flex-end">
          <el-button type="primary" @click="toexportExcel">导出</el-button>
        </el-col>

      </el-row>
      <el-row type="flex" class="row_active">
        <el-col :span="24">
          <el-table :data="tableData" border style="width: 100%" @sort-change="changeTableSort">
            <el-table-column fixed prop="dev_sn" label="设备SN" width="300"></el-table-column>
            <el-table-column prop="dev_type" :formatter="formatDevType" label="设备类型" width="120"></el-table-column>
            <el-table-column prop="rom_version" label="ROM"></el-table-column>
            <el-table-column prop="dev_mac" label="MAC地址"></el-table-column>
            <el-table-column prop="cpu_id" label="CPU-ID" width="300"></el-table-column>
            <el-table-column prop="total_cap" label="总容量" :formatter="formatDevCap" width="150"></el-table-column>
            <el-table-column prop="import_ts" label="创建时间" :sortable="'custom'" :formatter="formatterImport" width="170"></el-table-column>
            <el-table-column prop="activate_ts" label="激活时间" :sortable="'custom'" width="150" :formatter="formatterActive">
            </el-table-column>
            <el-table-column prop="is_activated" label="设备激活状态" :formatter="formatterType" width="120">
                <template slot-scope="scope">
                <span v-if="scope.row.is_activated!=99">已激活</span>
                <span v-else style="color:#F59A23">未激活</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                <div style="display: flex;justify-content: flex-start;">
                  <!-- <el-button v-show="scope.row.is_activated!==100" @click="shut(scope.row)" type="text" size="small">关机</el-button>
                  <el-button v-show="scope.row.is_activated!==100" type="text" @click="restart(scope.row)" size="small">重启</el-button> -->
                  <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
                  <el-button v-show="(scope.row.bind_flag==0 || scope.row.bind_flag==102) && scope.row.is_activated!=99" type="text" @click="tieactive(scope.row)" size="small">绑定</el-button>
                  <el-button v-if="scope.row.is_activated==99" type="text" @click="activationactive(scope.row)" size="small" style="color:#F59A23">激活</el-button>
                  <el-button type="text" @click="del(scope.row)"  size="small">删除</el-button>
                </div>
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
    <el-dialog :visible.sync="dialogVisible1" width="30%" :before-close="handleClose" @close="handleCloseDefail">
      <div class="addaccout addaccout_add">
        <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" class="demo-valiForm">
          <h3 class="title">新建设备</h3>
          <el-form-item label="设备SN：" prop="dev_sn">
            <el-input v-model="ruleForm2.dev_sn" placeholder="请输入设备SN" style="width:250px;"></el-input>
          </el-form-item>
          <el-form-item label="设备型号：">
            <el-select v-model="ruleForm2.dev_type" placeholder="请选择" @change="onChange2Type1" style="width:250px;">
              <el-option v-for="item in dev_types" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="ROM：">
            <el-select v-model="ruleForm2.rom_version" placeholder="请选择" @change="onChange2" style="width:250px;">
              <el-option v-for="item in roms" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="MAC地址:" prop="dev_mac">
            <el-input v-model="ruleForm2.dev_mac" placeholder="请输入MAC地址" style="width:250px;"></el-input>
          </el-form-item>
          <el-form-item label="CPU-ID:" prop="cpu_id">
            <el-input v-model="ruleForm2.cpu_id" placeholder="请输入CPU-ID" style="width:250px;"></el-input>
          </el-form-item>
          <!-- <el-form-item label="总容量:">
            <div style="display: flex; justify-content: flex-start; align-items: center;">
              <el-input v-model="ruleForm2.total_capss" placeholder="请输入总容量" style="width:250px;"></el-input>
              <div style="white-space:nowrap;margin-left:10px;">GB</div>
            </div>
          </el-form-item> -->
          <el-form-item style="width:100%;display: flex;justify-content:center;">
            <el-button type="primary" @click="importDevice('ruleForm2')">确定</el-button>
            <el-button type="primary" @click.native.prevent="handleSubmit3">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible2" width="30%" :before-close="handleClose" v-model="rowsData">
      <div class="addaccout addaccout_add">
        <el-form :model="ruleForm1" :rules="rules1" ref="ruleForm2" label-position="left" class="demo-ruleForm">
          <h3 class="title">修改设备</h3>
            <el-form-item label="设备SN:" prop="username">
              <el-input v-model="ruleForm1.new_dev_sn" placeholder="请输入设备SN" style="width:300px;"></el-input>
          </el-form-item>
          <el-form-item label="设备型号：">
            <el-select v-model="ruleForm1.dev_type" placeholder="请选择" @change="onChange2Type" style="width:300px;">
              <el-option v-for="item in dev_types" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="ROM：">
            <el-select v-model="ruleForm1.rom_version" placeholder="请选择" @change="onChange2" style="width:300px;">
              <el-option v-for="item in roms" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
            <el-form-item label="MAC地址:">
              <el-input v-model="ruleForm1.dev_mac" placeholder="请输入MAC地址" style="width:300px;"></el-input>
          </el-form-item>
            <el-form-item label="CPU-ID:">
              <el-input v-model="ruleForm1.cpu_id" placeholder="请输入CPU-ID" style="width:300px;"></el-input>
          </el-form-item>
            <el-form-item label="总容量:">
              <div style="display: flex; justify-content: flex-start; align-items: center;">
                <el-input v-model="ruleForm1.total_cap" placeholder="请输入总容量" style="width:270px;"></el-input>
                <div style="white-space:nowrap;margin-left:10px;">GB</div>
              </div>
          </el-form-item>
          <!-- <el-form-item label="设备激活：">
            <el-select v-model="ruleForm1.is_activated" placeholder="请选择" style="width:300px;" :disabled="true">
              <el-option v-for="item in active" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item style="width:100%;display: flex;justify-content:center;">
            <el-button type="primary" @click="editBasicinfo">确定</el-button>
            <el-button type="primary" @click="dialogVisible2=false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisibleactive" width="20%" :before-close="handleClose">
      <el-form ref="form">
        <el-form-item label="绑定ID:" style="dispaly:flex;justify-content:center;">
          <el-input v-model="user_id_active" style="margin-left:10px;"></el-input>
        </el-form-item>
        <el-form-item label="设备昵称:" style="dispaly:flex;justify-content:center;">
          <el-input v-model="active_dev_name" style="margin-left:10px;" maxlength="10"></el-input>
        </el-form-item>
        <div style="text-align: center;">
          <el-button type="primary" @click="onSubmitBind">确定</el-button>
          <el-button @click="dialogVisibleactive=false">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible3" width="20%" :before-close="handleClose">
      <el-upload style="text-align: center;margin：0 auto;" class="upload-demo" ref="upload" name="excel" :action="UploadUrl()" :before-upload="beforeUpload" :on-success="handleSuccess" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">确定上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传.XLS的文件！！！</div>
      </el-upload>
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
  import_node_basicinfo, //新建设备
  edit_device_basicinfo, //编辑
  delete_device_basicinfo, //删除
  hostUrl,
  web_change_device_state,
  ctrl_node_state,
  chg_device_state, // 激活
} from "../../api/api";
import { log } from "util";
import common from "../../common/js/util.js";
export default {
  data() {
    let nameRule1 = (rule, value, callback) => {
      let regExp = new RegExp(/^SME[0-9a-zA-Z]{1}[0-9]{4}[0-9a-zA-Z]{7}$/);
      if (regExp.test(value) === false) {
        callback(new Error("请输入正确的SN号"));
      } else {
        callback();
      }
    };
    let nameRule2 = (rule, value, callback) => {
      let regExp = new RegExp(/^([0-9a-f]{2}:){5}[0-9a-f]{2}$/);
      if (regExp.test(value) === false) {
        callback(new Error("请输入正确的MAC号"));
      } else {
        callback();
      }
    };
    let nameRule3 = (rule, value, callback) => {
      let regExp = new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{9}$/);
      if (regExp.test(value) === false) {
        callback(new Error("请输入正确的CPU-ID"));
      } else {
        callback();
      }
    };
    let nameRule4 = (rule, value, callback) => {
      let regExp = new RegExp(/^\d{3,7}(\.\d{0,2})?$/g);
      if (regExp.test(value) === false) {
        callback(new Error("请输入正确的容量"));
      } else {
        callback();
      }
    };
    return {
      dialogVisibleactive: false,
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      searchText: "",
      rotate: false,
      total_dev_cnt: "",
      activated_dev_cnt: "",
      today_import_dev_cnt: 0,
      today_activated_dev_cnt: 0,
      is_activated: "-1",
      import_start_ts: "",
      import_end_ts: "",
      activate_start_ts: "",
      activate_end_ts: "",
      rowsData: "",
      actives: [
        {
          value: "-1",
          label: "全部",
        },
        {
          value: "99",
          label: "未激活",
        },
        {
          value: "101",
          label: "已激活",
        },
      ],
      active: [
        {
          value: "100",
          label: "未激活",
        },
        {
          value: "101",
          label: "已激活",
        },
      ],
      dev_types: [
        {
          value: "1",
          label: "RK3328",
        },
        {
          value: "0",
          label: "AMS805",
        },
      ],
      roms: [
        {
          value: "1.2.21",
          label: "1.2.21",
        },
        {
          value: "1.2.20",
          label: "1.2.20",
        },
        {
          value: "1.2.19",
          label: "1.2.19",
        },
        {
          value: "1.2.18",
          label: "1.2.18",
        },
        {
          value: "1.2.17",
          label: "1.2.17",
        },
        {
          value: "1.2.16",
          label: "1.2.16",
        },
        {
          value: "1.2.11",
          label: "1.2.11",
        },
        {
          value: "1.2.10",
          label: "1.2.10",
        },
        {
          value: "1.1.9",
          label: "1.1.9",
        },
        {
          value: "1.0.56",
          label: "1.0.56",
        },
        {
          value: "1.0.5",
          label: "1.0.5",
        },
        {
          value: "1.0.3",
          label: "1.0.3",
        },
        {
          value: "1.0.1",
          label: "1.0.1",
        },
      ],
      tableData: [],
      pager: {
        count: 0,
        page: 1,
        rows: 100,
      },
      showState: false,
      ruleForm2: {
        dev_sn: "",
        dev_type: "0",
        dev_typess: "",
        rom_version: "",
        dev_mac: "",
        cpu_id: "",
        total_cap: "",
        total_capss: "",
      },
      ruleForm1: {
        new_dev_sn: "",
        dev_type: "",
        rom_version: "",
        dev_typess: "",
        dev_mac: "",
        cpu_id: "",
        total_cap: "",
        is_activated: "",
      },
      tableData2: [],
      pageActive: 0,
      todayBuilds: 0,
      todayactivaed: 0,
      user_id_active: "",
      dev_sn_active: "",
      bind_user_tel_num: "",
      order_item: 0,
      order_type: 1,
      active_dev_name: "",
      rules: {
        dev_sn: [
          { required: true, message: "请输入设备SN", trigger: "blur" },
          {
            max: 15,
            message: "长度最大15个字符",
            trigger: "blur",
          },
          { validator: nameRule1, trigger: "blur" },
        ],
        dev_mac: [
          { required: true, message: "请输入MAC地址", trigger: "blur" },
          {
            max: 17,
            message: "长度最大17个字符",
            trigger: "blur",
          },
          { validator: nameRule2, trigger: "blur" },
        ],
        cpu_id: [
          { required: true, message: "请输入CPU-ID", trigger: "blur" },
          // {
          //   max: 9,
          //   message: "长度最大9个字符",
          //   trigger: "blur",
          // },
          // { validator: nameRule3, trigger: "blur" },
        ],
        total_cap: [
          { required: true, message: "请输入名称", trigger: "blur" },
          {
            // min: 3,
            // max: 10,
            message: "长度在 6到 10 个字符",
            trigger: "blur",
          },
          { validator: nameRule4, trigger: "blur" },
        ],
      },
      old_dev_sn: "",
      dev_type_active: 1,
      import_time_value:'',
      time_value:'',
    };
  },
  mounted() {
    this.getOverview();
    this.getInfo();
  },
  methods: {
         //添加设备取消清空
    handleCloseDefail(){
      this.$refs.ruleForm2.resetFields();
      this.dialogVisible1=false

    },
    onChange2Type(val) {
      this.dev_type_active = val;
      // if (val == "RK3328") {
      //   this.dev_type_active = val;
      // } else {
      //   this.dev_type_active = 2;
      // }
      //   alert(this.dev_type_active)
    },
    //排序
    changeTableSort(column) {
      if (column.prop == "import_ts") {
        if (column.order == "descending") {
          this.order_type = 1;
          this.order_item = 0;
        } else {
          this.order_type = 2;
          this.order_item = 0;
        }
      } else {
        if (column.order == "descending") {
          this.order_type = 1;
          this.order_item = 1;
        } else {
          this.order_type = 2;
          this.order_item = 1;
        }
      }
      this.pager.page = 1;
      this.getInfo();
    },
    //绑定
    onSubmitBind() {
      let param = new Object();
      if (this.user_id_active.length == 0) {
        this.$message({
          message: "绑定ID不能为空",
          type: "error",
        });
        return false;
      }
      if (this.active_dev_name.length == 0) {
        this.$message({
          message: "设备昵称不能为空",
          type: "error",
        });
        return false;
      }
      if (!/^[\u4E00-\u9FA5A-Za-z0-9_]+$/.test(this.active_dev_name)) {
        this.$message({
          message: "昵称格式不对",
          type: "error",
        });
        return false;
      }
        param.bind_type = 1;
        param.user_id = parseInt(this.user_id_active);
        param.dev_sn = this.dev_sn_active;
        param.bind_user_tel_num = this.bind_user_tel_num;
        param.dev_name = this.active_dev_name;
        web_change_device_state(param)
        .then(res => {
          if (res.status == 0 && res.err_code == 0) {
            this.$message({
              message: "绑定成功",
              type: "success",
            });
            this.dialogVisibleactive = false;
          } else if (res.status == -4 && res.err_code == 236) {
            this.$message({
              message: "同一用户下绑定昵称不可以重复！",
              type: "error",
            });
          } 
          else if (res.status == 0 && res.err_code == 225) {
            this.$message({
              message: "设备不存在,无法绑定！",
              type: "error",
            });
          }else {
            this.$message({
              message: "用户ID不存在，绑定失败",
              type: "error",
            });
          }

          this.getInfo();
        })
        .catch(error => {
          this.$message({
            message: "后台服务出错",
            type: "error",
          });
        });
    },
    tieactive(val) {
      this.user_id_active = "";
      this.active_dev_name = "";
      this.dev_sn_active = val.dev_sn;
      this.dialogVisibleactive = true;
    },
    onSubmitKey() {
      this.getInfo();
    },
    //重置
    resetInfo() {
      this.import_start_ts = "";
      this.import_end_ts = "";
      this.activate_start_ts = "";
      this.activate_end_ts = "";
      this.import_time_value="",
      this.time_value="";
      this.searchText = "";
      this.is_activated=""
      this.getInfo();
    },
    //导出地址变量
    UploadUrl() {
      return hostUrl + "/url_mgmt/excel_url";
    },

    //导出的方法
    exportExcel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("../../excel/Export2Excel");
        const tHeader = [
          "设备SN",
          "设备类型",
          "ROM",
          "MAC地址",
          "CPU-ID",
          "总容量",
          "新建时间",
          "设备激活",
          "激活时间",
        ];
        // 上面设置Excel的表格第一行的标题
        const filterVal = [
          "dev_sn",
          "dev_type",
          "rom_version",
          "dev_mac",
          "cpu_id",
          "total_cap",
          "import_ts",
          "is_activated",
          "activate_ts",
        ];
        // 上面的index、nickName、name是tableData里对象的属性
        const list = this.tableData2; //把data里的tableData存到list
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "设备激活信息表");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },

    //文件上传前回调
    beforeUpload(file) {
      let tempName = file.name;
      let nowName = tempName.split(".");
      if (nowName[1] !== "xls") {
        this.$message({
          message: "请上传.xls的文件",
          type: "warning",
        });
        return false;
      }
    },
    //文件批量导入
    submitUpload() {
      this.$refs.upload.submit();
    },
    //上传成功回调
    handleSuccess(response) {
      if (response.status == 0) {
        this.$message({
          message: `总条数:+${response.data.total}+上传至数据库:+${
            response.data.success
          }+成功条数:+${response.data.right}`,
          type: "success",
        });
        this.dialogVisible3 = false;
        this.getInfo();
      } else {
        this.$message({
          message: `${response.msg}`,
          type: "error",
        });
        this.dialogVisible3 = false;
      }
    },
    //上传弹层

    importDev() {
      // this.dialogVisible3 = true;
      this.$router.push({
        path: "/deviceupload",
      });
    },
    getInfo() {
      var data = {
        order_item: this.order_item,
        page_no: this.pager.page - 1,
        order_type: this.order_type,
        page_size: 10,
        login_token: "",
        is_activated: this.is_activated === "" ? -1 : Number(this.is_activated),
        import_start_ts:
          this.import_time_value == ""
            ? -1
            : new Date(this.import_time_value[0]).getTime() / 1000,
        import_end_ts:
          this.import_time_value == ""
            ? -1
            : new Date(this.import_time_value[1]).getTime() / 1000,
         activate_start_ts:
          this.time_value == ""
            ? -1
            : new Date(this.time_value[0]).getTime() / 1000,
        activate_end_ts:
          this.time_value == ""
            ? -1
            : new Date(this.time_value[1]).getTime() / 1000,
            
      };
    //   let SME = /^SME[0-9a-zA-Z]{1}[0-9]{4}[0-9a-zA-Z]{7}$/;
    //   let cpuid = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{9}$/;
        let SME=/^SME{1}[0-9a-zA-Z]/;
      if (this.searchText != "") {
        if (SME.test(this.searchText) == true) {
          data.dev_sn = this.searchText;
          data.cpu_id = "";
        } else{
          data.dev_sn = "";
          data.cpu_id = this.searchText;
        }
      } else {
        data.dev_sn = "";
        data.cpu_id = "";
      }
      query_devinfo_by_conditions(data)
        .then(res => {
          if (res.status === 0) {
            let tempArr = [];
            tempArr = res.data.dev_list;
            if (res.data.dev_list) {
              for (var i = 0; i < tempArr.length; i++) {
                switch (tempArr[i].is_activated) {
                  case 99:
                    tempArr[i].is_activatedss = false;
                    break;
                  case 101:
                    tempArr[i].is_activatedss = false;
                    break;

                  default:
                    tempArr[i].is_activatedss = true;
                }
              }
            }
            this.tableData = [];
            this.tableData = tempArr;
            this.pager.count = res.data.total_num;
            this.pager.rows = res.data.total_page;
          }
        })
        .catch(error => {
        });
    },

    //导出
    toexportExcel() {
      var data = {
        dev_sn: "",
        cpu_id: "",
        page_no: this.pageActive,
        order_type: this.order_type,
        order_item: this.order_item,
        page_size: 10,
        login_token: "",
        is_activated: this.is_activated === "" ? -1 : Number(this.is_activated),
        import_start_ts:
          this.import_time_value == ""
            ? -1
            : new Date(this.import_time_value[0]).getTime() / 1000,
        import_end_ts:
          this.import_time_value=== ""
            ? -1
            : new Date(this.import_time_value[1]).getTime() / 1000,
          activate_start_ts:
          this.time_value == ""
            ? -1
            : new Date(this.time_value[0]).getTime() / 1000,
        activate_end_ts:
          this.time_value == ""
            ? -1
            : new Date(this.time_value[1]).getTime() / 1000,
      };
      if (this.judgeString(this.searchText)) {
        var param = Object.assign(this.judgeString(this.searchText), data);
      } else {
        this.$message.error("请输入正确的设备SN、CPU-ID");
        return;
      }
      query_devinfo_by_conditions(param)
        .then(res => {
          if (res.status === 0) {
            //this.tableData2 = res.data.dev_list;
            // this.pager.count = res.data.total_num;
            // this.pager.rows = res.data.total_page;
            this.pageActive = res.data.cur_page;
            let tempArr = [];
            tempArr = res.data.dev_list;
            for (var i = 0; i < tempArr.length; i++) {
              switch (tempArr[i].is_activated) {
                case 0:
                  tempArr[i].is_activated = "已激活";
                  break;

                default:
                  tempArr[i].is_activated = "未激活";
              }
              switch (tempArr[i].bind_flag) {
                case 0:
                  tempArr[i].bind_flag = "是";
                  break;
                case 1:
                  tempArr[i].bind_flag = "否";
                  break;
              }

              switch (tempArr[i].total_cap) {
                case 0:
                  tempArr[i].total_cap = "0GB";
                  break;
                default:
                  tempArr[i].total_cap =
                    (tempArr[i].total_cap / 1024 / 1024 / 1024).toFixed(2) +
                    "GB";
              }
              switch (tempArr[i].activate_ts) {
                case 0:
                  tempArr[i].activate_ts = "暂无";
                  break;
                default:
                  tempArr[i].activate_ts = this.common.getTimes(
                    tempArr[i].activate_ts * 1000
                  );
              }
              switch (tempArr[i].import_ts) {
                case 0:
                  tempArr[i].import_ts = "暂无";
                  break;
                default:
                  tempArr[i].import_ts = this.common.getTimes(
                    tempArr[i].import_ts * 1000
                  );
              }
              switch (tempArr[i].dev_type) {
                case 2:
                  tempArr[i].dev_type = "AMS805";
                  break;
                default:
                  tempArr[i].dev_type = "RRK328";
              }
            }
            if (res.data.cur_page >= res.data.total_page) {
              this.exportExcel();
              this.common.monitoringLogs("导出", "导出设备激活表", 1);
            } else {
              this.tableData2 = this.tableData2.concat(tempArr);
              this.pageActive++;
              this.toexportExcel();
            }
          } else {
            this.$message({
              message: `${res.err_msg}`,
              type: "error",
            });
            this.common.monitoringLogs("导出", "导出设备激活表", 0);
          }
        })
        .catch(error => {
          this.common.monitoringLogs("导出", "导出设备激活表", 0);
        });
    },
    getOverview() {
      let param = {
        login_token: "",
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
        });
    },
    editBasicinfo() {
      if (this.ruleForm1.total_cap.toString().split(".")[1]) {
        if (this.ruleForm1.total_cap.toString().split(".")[1].length > 2) {
          this.$message({
            message: "总容量最多两位小数",
            type: "error",
          });
          return false;
        }
      }

      let param = {
        login_token: "sad",
        new_dev_sn: this.rowsData.dev_sn,
      };
      let dev_type = 1;
      if (this.ruleForm1.dev_type == "3328") {
        dev_type = 1;
      } else {
        dev_type = 2;
      }
      let nowactivated = 1;
      if (this.ruleForm1.is_activated == "已激活") {
        nowactivated = 0;
      } else {
        nowactivated = 1;
      }
      param.dev_sn = this.old_dev_sn;
      param.info = {
        new_dev_sn: this.ruleForm1.new_dev_sn,
        dev_type: parseInt(this.dev_type_active),
        rom_version: this.ruleForm1.rom_version,
        dev_mac: this.ruleForm1.dev_mac,
        cpu_id: this.ruleForm1.cpu_id,
        total_cap: parseInt(this.ruleForm1.total_cap) * 1024 * 1024 * 1024,
        is_activated: nowactivated,
      };
      edit_device_basicinfo(param)
        .then(res => {
          if (res.status == 0) {
            this.$message({
              message: "修改成功",
              type: "success",
            });
          } else {
            this.$message({
              message: "修改失败",
              type: "error",
            });
          }

          this.getInfo();
          this.dialogVisible2 = false;
        })
        .catch(error => {
        });
    },

    importDevice(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // if (this.ruleForm2.dev_typess === "RK3328") {
          //   this.ruleForm2.dev_type = 1;
          // } else {
          //   this.ruleForm2.dev_type = 2;
          // }
          if (this.ruleForm2.total_capss.toString().split(".")[1]) {
            if (
              this.ruleForm2.total_capss.toString().split(".")[1].length > 2
            ) {
              this.$message({
                message: "总容量最多两位小数",
                type: "error",
              });
              return false;
            }
          }
          //通过验证执行
          this.ruleForm2.dev_type = parseInt(this.ruleForm2.dev_type);

          this.ruleForm2.total_cap =
            parseInt(this.ruleForm2.total_capss) * 1024 * 1024 * 1024;
          this.ruleForm2.login_token = "";
          import_node_basicinfo(this.ruleForm2)
            .then(res => {
              if (res.status === 0 && res.err_code == 0) {
                this.$message({
                  message: "新建设备成功",
                  type: "success",
                });
                this.getInfo();
                this.getOverview();
                this.dialogVisible1 = false;
              } else if (res.status === 0 && res.err_code == 290) {
                this.$message({
                  message: "设备已存在，请勿重复上传",
                  type: "error",
                });
              }
            })
            .catch(error => {
            });
        } else {
          //验证失败执行
          return false;
        }
      });
    },
    search() {
      this.pager.page = 1;
      this.getInfo();
    },
    activation(row) {
      let param = {
        login_token: "",
        dev_sn: row.dev_sn,
        info: {
          new_dev_sn: row.dev_sn,
          dev_type: row.dev_type,
          rom_version: row.rom_version,
          dev_mac: row.dev_mac,
          cpu_id: row.cpu_id,
          total_cap: row.total_cap,
          is_activated: 101,
        },
      };
      edit_device_basicinfo(param)
        .then(res => {
          this.$message({
            message: "激活成功",
            type: "success",
          });
          this.getInfo();
          this.getOverview();
          this.dialogVisible2 = false;
        })
        .catch(error => {
        });
    },
    activationactive(row) {
      let param = {
        login_token: "",
        dev_sn: row.dev_sn,
        state_code: 1,
      };
      chg_device_state(param)
        .then(res => {
          if (res.status == 0) {
            this.$message({
              message: "激活成功",
              type: "success",
            });
          } else {
            this.$message({
              message: "激活失败",
              type: "error",
            });
          }

          this.getInfo();
          this.getOverview();
          this.dialogVisible2 = false;
        })
        .catch(error => {
        });
    },
    closeRestore(type, sn) {
      let obj = {
        login_token: "8vAmfX19fX1NeaggfX19fQ==",
        dev_sn: sn, // 需要重启的设备sn
        extra_info: {
          ctrl_type: type, // 1 表示重启(已实现)；2 表示 关机(当前西柚机客户端还未实现此功能)
        },
      };
      ctrl_node_state(obj)
        .then(res => {
          if (res.status === 0) {
            this.$message({
              message: type === 1 ? "重启成功" : "关机成功",
              type: "success",
            });
            this.getInfo();
          } else {
            this.$message({
              message: `${res.err_msg}`,
              type: "error",
            });
          }
        })
        .catch(error => {
          this.$message({
            message: "网络出错，请重新请求",
            type: "error",
          });
        });
    },
    getShow() {
      this.showState = !this.showState;
      this.rotate = !this.rotate;
    },
    formatDevCap(row) {
      if (row.total_cap == 0) {
        return 0 + "GB";
      } else {
        return this.common.formatByteActive(row.total_cap);
      }
    },
    formatFileSize(size) {
      const scale = 1000;
      const digitList = ["KB", "MB", "GB", "TB"];
      let _integer = size / scale; //最小单位kb
      let digit = 0;
      while (_integer > scale) {
        _integer = Math.round(_integer / scale);
        digit++;
      }
      return `${_integer}${digitList[digit]}`;
    },
    formatDevType(row) {
      if (row.dev_type === 1) {
        return "RK3328";
      } else {
        return "AMS805";
      }
    },
    formatterType(row) {
      if (row.is_activated === 99) {
        return "未激活";
      } else {
        return "已激活";
      }
    },
    formatterActive(row) {
      if (row.activate_ts == 0) {
        return "--";
      } else {
        return this.common.getTimes(row.activate_ts * 1000);
      }
    },
    formatterImport(row) {
      return this.common.getTimes(row.import_ts * 1000);
    },
    open(rows) {
      this.$confirm("确定关机？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let param = new object();
          param.dev_sn = rows.dev_sn;
          let extra_info = {
            ctrl_type: 2,
            login_token: "",
          };
          param.extra_info = extra_info;
          ctrl_node_state(param)
            .then(res => {
              if (res.status == 0) {
                this.$message({
                  type: "success",
                  message: "关机成功",
                });
              } else {
                this.$message({
                  type: "error",
                  message: "关机失败",
                });
              }
            })
            .catch(error => {});
        })
        .catch(() => {});
    },
    edit(rows) {
      this.old_dev_sn = rows.dev_sn;
      this.dialogVisible2 = true;
      this.ruleForm1.new_dev_sn = rows.dev_sn;
      this.ruleForm1.total_cap = rows.total_cap / 1024 / 1024 / 1024;
      this.ruleForm1.dev_mac = rows.dev_mac;
      this.ruleForm1.cpu_id = rows.cpu_id;
      this.ruleForm1.dev_type = rows.dev_type + "";
      this.ruleForm1.rom_version = rows.rom_version;
      this.rowsData = rows;
      this.ruleForm1.new_dev_sn = rows.dev_sn;
      rows.is_activated === 100
        ? (this.ruleForm1.is_activated = "未激活")
        : (this.ruleForm1.is_activated = "已激活");
    },
    del(rows) {
      this.$confirm("即将删除该设备，是否继续", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.confirmDel(rows);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    shut(rows) {
      //关机
      this.$confirm("确定关机?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.closeRestore(2, rows.dev_sn);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消关机",
          });
        });
    },
    restart(rows) {
      //重启
      this.$confirm("确定重启?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.closeRestore(1, rows.dev_sn);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消重启",
          });
        });
    },
    confirmDel(rows) {
      let param = {
        login_token: "",
        dev_sn: rows.dev_sn,
      };
      delete_device_basicinfo(param)
        .then(res => {
          if (res.status === 0) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            //this.pager.page = 1;
            this.getInfo();
          }
        })
        .catch(error => {
        });
    },
    addDev() {
      this.dialogVisible1 = true;

      (this.ruleForm2.dev_sn = ""),
        (this.ruleForm2.dev_type = ""),
        (this.ruleForm2.dev_typess = ""),
        (this.ruleForm2.rom_version = ""),
        (this.ruleForm2.dev_mac = ""),
        (this.ruleForm2.cpu_id = ""),
        (this.ruleForm2.total_cap = ""),
        (this.ruleForm2.total_capss = "");
    },
    handleCurrentChange(val) {
      this.pager.page = val.val;
      this.getInfo();
    },
    handleSubmit2() {},
    handleSubmit3() {
      this.dialogVisible1 = false;
    },
    handleClick() {},
    judgeString(str) {
      const reg3 = /^(SMM)[0-9]{9}$/;
      if (reg3.test(str)) {
        return {
          dev_sn: str,
        };
      } else if (str === "") {
        return {};
      } else {
        return false;
      }
    },
  },
  components: {
    pageNation: pageNation,
    tableBarActive2: tableBarActive2,
    mySearch: mySearch,
  },
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
      margin-top: 20px;
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

.addaccout,.addaccout_add {
  .title {
    width: 100%;
    text-align: left;
  }

  .el-dialog__body {
    padding: 0px;
  }

  .el-form-item {
    display: flex;
    justify-content: center;
    text-align: left;
    .el-form-item__label{
        width: 100px;
        text-align: left;
    }
  }

  .el-form--label-left .el-form-item__label {
      width:100px;
    text-align: left;
  }

  .el-form-item__error {
    margin-left: 0px;
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
.deviceAvtive {
  .el-button {
    padding: 8px 8px !important;
  }
}
</style>
