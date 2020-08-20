<template>
  <section class="myself-container">

    <div class="goback" style="width: 100%;line-height: 50px;">
      <div style="margin-top:20px;">
        <el-button type="primary" class="el-upload__tip" @click="$router.go(-1)">返回</el-button>
      </div>

    </div>
    <div style="height:40px;line-height:40px;">硬件收益配置</div>
    <el-button  type="primary" @click="addList">添加</el-button>
    <div style="width:600px">
      <el-table :data="tableData" border width="100%" style="margin-top:20px;">
      <el-table-column prop="date" label="范围" >
      </el-table-column>
      <el-table-column prop="name" label="在线时间" >
      </el-table-column>
      <el-table-column prop="province" label="奖励" >
      </el-table-column>

      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <div style="    display: flex;justify-content: space-evenly;">
            <el-button type="text" size="small" @click.native.prevent="goEdit(scope.$index, tableData
            )">
              编辑
            </el-button>
            <el-button type="text" size="small"  @click.native.prevent="deleteRow(scope.$index, tableData)">
              删除
            </el-button>
          </div>

        </template>
      </el-table-column>
    </el-table>
    </div>
    
    <el-dialog title="修改配置" :visible.sync="dialogFormVisible" width="20%" center>
  <el-form :model="form">
       <el-form-item label="在线范围" :label-width="formLabelWidth">
      <el-select v-model="form.date" placeholder="请选择在线范围" style="width:200px">
        <el-option label="大于" value="1"></el-option>
        <el-option label="等于" value="2"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="在线时间" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off" style="width:200px" oninput = "value=value.replace(/[^\d]/g,'')"></el-input>
    </el-form-item>
     <el-form-item label="在线奖励" :label-width="formLabelWidth">
      <el-input v-model="form.province" autocomplete="off" style="width:200px" oninput = "value=value.replace(/[^\d]/g,'')"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>

  </section>
</template>

<script>
import tableBarActive2 from "../../components/tableBarActive2";
import mySearch from "../../components/mySearch";
import pageNation from "../../components/pageNation";
import {
  query_node_info_list,
  ptfs_query_user_profit_list,
  ptfs_set_earn_param,
} from "../../api/api";
import common from "../../common/js/util.js";

export default {
  data() {
    return {
      dialogFormVisible:false,
      tableData: [
        {
          date: "大于",
          name: "8",
          province: "1",
        },
        {
          date: "大于",
          name: "8",
          province: "2",
        },
        {
          date: "等于",
          name: "24",
          province: "3",
        },
      ],
      form: {
          date: '',
          province: '',
          name: '',
       
        },
    };
  },
  mounted() {
  },
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    goEdit(index,rows){
      this.dialogFormVisible=true
      console.log(index,rows)
      console.log(rows[index])
      this.form=rows[index]
    },
    addList(){
      let obj={
          date: '等于',
          province: '0',
          name: '0',
      }
      this.tableData.push(obj)
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
