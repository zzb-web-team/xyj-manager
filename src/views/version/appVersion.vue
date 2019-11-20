<template>
  <section class="myself-container">
    <el-button type="primary" style="margin:15px 0px 0px 0px;" @click="add">新增发布</el-button>
    <div class="devide_table">
      <div>当前发布版本(全网)</div>
      <el-row type="flex" class="row_active">
        <el-col :span="24">
          <tableBarActive2
            id="rebateSetTable"
            ref="table"
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
    <div class="devide_table">
      <div>当前发布版本(灰度)</div>
      <el-row type="flex" class="row_active">
        <el-col :span="24">
          <tableBarActive2
            id="rebateSetTable1"
            ref="table1"
            tooltip-effect="dark"
            :tableData="tableData1"
            :clomnSelection="clomnSelection"
            :rowHeader="rowHeader"
            :tableOption="tableOption"
            @handleButton="handleButton1"
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
    <div class="devide_table">
      <div>历史发布</div>
      <el-row type="flex" class="row_active">
        <el-col :span="24">
          <tableBarActive2
            id="rebateSetTable2"
            ref="table2"
            tooltip-effect="dark"
            :tableData="tableData2"
            :clomnSelection="clomnSelection"
            :rowHeader="rowHeader"
            :tableOption="tableOption1"
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
    <el-dialog :visible.sync="dialogVisible2" width="40%" :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="发布类型">
          <el-select v-model="form.type" placeholder="请选择发布类型">
            <el-option label="1" value="正式发布"></el-option>
            <el-option label="2" value="灰度发布"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布版本">
          <el-input v-model="form.version"></el-input>
        </el-form-item>
        <el-form-item label="发布渠道">
          <el-radio-group v-model="form.channel">
            <el-radio label="HTTP"></el-radio>
            <el-radio label="PTFS"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="发布描述">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item label="发布用户">
          <el-radio-group v-model="form.user" @change="changeAssign">
            <el-radio label="全网用户" border></el-radio>
            <el-radio label="指定用户" border></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="" v-show="assigning==='指定用户'">
          <el-radio-group v-model="form.assign">
            <el-radio label="指定终端"></el-radio>
            <el-radio label="指定账号"></el-radio>
            <el-button type="text">批量导入</el-button>
          </el-radio-group>
          <el-input v-model="form.version" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="发布时间">
          <el-radio-group v-model="form.time" @change="changeTime">
            <el-radio label="立即发布"></el-radio>
            <el-radio label="定时发布"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="" v-show="timing==='定时发布'">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="80px">
        <p><b>版本详情</b></p>
        <el-form-item label="发布类型:">
          <span>全网发布</span>
        </el-form-item>
        <el-form-item label="发布版本:">
          <span>1.0.5</span>
        </el-form-item>
        <el-form-item label="发布渠道:">
           <span>HTTP</span>
        </el-form-item>
        <el-form-item label="发布描述:">
          <span>就啊的功夫哈紧身裤和发掘苏里科夫等哈就是奋斗吧就好</span>
        </el-form-item>
        <el-form-item label="发布时间:">
          <span>2019-11-20</span>
        </el-form-item>
        <el-form-item label="发布用户:">
          <span>全网用户</span>
        </el-form-item>
        <p><b>版本撤回选项</b></p>
        <el-form-item label="撤回用户">
          <el-radio-group v-model="form.user" @change="changeAssign">
            <el-radio label="全网用户" border></el-radio>
            <el-radio label="指定用户" border></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="" v-show="assigning==='指定用户'">
          <el-radio-group v-model="form.assign">
            <el-radio label="指定终端"></el-radio>
            <el-radio label="指定账号"></el-radio>
            <el-button type="text">批量导入</el-button>
          </el-radio-group>
          <el-input v-model="form.version" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="撤回至版本">
          <el-select v-model="form.type" placeholder="请选择版本">
            <el-option label="1" value="1.0.4"></el-option>
            <el-option label="2" value="1.0.3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="撤回时间">
          <el-radio-group v-model="form.time" @change="changeTime">
            <el-radio label="立即撤回"></el-radio>
            <el-radio label="定时撤回"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="" v-show="timing==='定时发布'">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">撤回</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>

<script>
import tableBarActive2 from "../../components/tableBarActive2";
import mySearch from "../../components/mySearch";
import pageNation from "../../components/pageNation";
export default {
  data() {
    return {
      form: {
        type: '',
        version: '',
        channel: '',
        desc: '',
        user: '',
        assign: '',
        time: '',
        date: ''
      },
      assigning: '',
      timing: '',
      dialogVisible: false,
      dialogVisible2: false,
      rowHeader: [
        {
          prop: "version",
          label: "版本号"
        },
        {
          prop: "channel",
          label: "发布渠道"
        },
        {
          prop: "desc",
          label: "版本描述"
        },
      ],
      tableData: [
        {
          version: "测试数据1",
          channel: "测试数据1",
          desc: "测试数据1",
        }
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
            label: "发布清单",
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
      showState: true
    };
  },
  mounted: function() {},
  methods: {
    searchInfo() {
      alert("搜做");
    },
    getShow() {
      this.showState = !this.showState;
    },
    handleButton(val, rows) {
      if (val == "edit") {
        this.dialogVisible2 = true;
      } else if (val == "freeze") {
        this.$router.push({
          path: "/userInfo"
        });
      }
      console.log(val);
      console.log(rows);
    },
    add() {
      this.dialogVisible = true;
    },
    changeTime(value) {
      this.timing = value;
    },
    changeAssign(value) {
      this.assigning = value;
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
  width: 100%;
  min-width: 1600px;

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
