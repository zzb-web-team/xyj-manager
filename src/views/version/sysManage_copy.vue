<template>
  <section class="myself-container">
    <div class="devide_table">
      <el-row type="flex" class="row_active" style="display: flex;justify-content: flex-start;">
        <el-col style="display: flex;justify-content: flex-start;">
          <el-button type="primary" @click="upload">上传应用包</el-button>
          <el-button type="primary" @click="publish">版本发布</el-button>
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
  </section>
</template>

<script>
import tableBarActive2 from "../../components/tableBarActive2";
import mySearch from "../../components/mySearch";
import pageNation from "../../components/pageNation";
export default {
  data() {
    return {
      dialogVisible: false,
      dialogVisible2: false,
      searchText: "设备SN、设备型号、设备名称",
      operatingStatus: true,
      clomnSelection: false,
      reserveselection: true,
      value1: "",
      value2: "",
      valueTime: "",
      valueTime1: "",
      rowHeader: [
        {
          prop: "user_id",
          label: "应用包名"
        },
        {
          prop: "user_name",
          label: "包类型"
        },
        {
          prop: "user_tel",
          label: "md5"
        },
        {
          prop: "sex",
          label: "hashid"
        },
        {
          prop: "status",
          label: "是否上传到IPFS节点"
        },
        {
          prop: "status",
          label: "版本号"
        },
        {
          prop: "status",
          label: "文件描述"
        },
        {
          prop: "status",
          label: "发布方式"
        },
        {
          prop: "status",
          label: "上传日期户"
        },
        {
          prop: "status",
          label: "最近修改日期"
        }
      ],
      tableData: [
        {
          user_id: "测试数据1",
          user_name: "测试数据1",
          user_tel: "测试数据1",
          user_id: "测试数据1",
          sex: "测试数据1",
          status: "测试数据1"
        }
      ],
      tableOption: {
        label: "操作",
        options: [
          {
            label: "修改",
            type: "danger",
            methods: "edit"
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
    upload() {

    },
    publish() {
      this.$router.push({
        path:"/SysVersion"
      })
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
    addAccout() {
      this.dialogVisible = true;
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
}
</style>
