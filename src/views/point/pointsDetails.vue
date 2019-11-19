<template>
<section class="myself-container">
    <div class="device_form">
        <el-form ref="form" :model="form">
            <el-row type="flex">
                <mySearch :searchText="searchText" @searchInfo="searchInfo"></mySearch>
                <div @click="getShow()" class="div_show" style="color:#606266">筛选</div>
            </el-row>
            <div v-show="showState">
                <el-row type="flex" class="row_activess">
                    <el-form-item label="设备状态" style="display: flex;">
                        <el-select v-model="value1" placeholder="请选择" @change="onChange2">
                            <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
             
                    <el-form-item label="注册时间" style="display: flex;">
                        <el-date-picker v-model="valueTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" style="margin-left:68px;">确定</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary">重置</el-button>
                    </el-form-item>
               
                </el-row>
              
            </div>

        </el-form>
    </div>
    <div class="devide_table">
      <el-row type="flex" class="row_active" style="display: flex;justify-content: flex-end;">
            <el-col style="display: flex;justify-content: flex-end;" >
                <el-button type="primary" @click="addAccout">导出</el-button>
            </el-col>
        </el-row>
        <el-row type="flex" class="row_active">
            <el-col :span="24">
                <tableBarActive2 id="rebateSetTable" ref="table1" tooltip-effect="dark" :tableData="tableData" :clomnSelection="clomnSelection" :rowHeader="rowHeader" :tableOption="tableOption" @handleButton="handleButton" :operatingStatus="operatingStatus" @toOperating="toOperating" @handleSelectionChange="handleSelectionChange" @selectCheckBox="selectCheckBox" @selectAll="selectAll"></tableBarActive2>
            </el-col>
        </el-row>
    </div>
    <div class="devide_pageNation" style="display: flex;justify-content: space-between;">
        <el-row type="flex">
          
        </el-row>
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
export default {
    data() {
        return {
            dialogVisible: false,
            dialogVisible2: false,
            searchText: "用户ID、用户昵称",
            operatingStatus: true,
            clomnSelection: false,
            reserveselection: true,
            value1: "",
            value2: "",
            valueTime: "",
            valueTime1: "",
            options1: [{
                    value: '0',
                    label: '全部'
                },
                {
                    value: '1',
                    label: '收益'
                },
                {
                    value: '2',
                    label: '兑换'
                },
               
            ],
            options2: [{
                    value: '0',
                    label: '全部'
                },
                {
                    value: '1',
                    label: '是'
                },
                {
                    value: '2',
                    label: '否'
                },
              
            ],
     
    
            rowHeader: [{
                    prop: "user_id",
                    label: "用户ID"
                },
                {
                    prop: "user_name",
                    label: "用户昵称"
                },
                {
                    prop: "user_tel",
                    label: "收支类型"
                },
                {
                    prop: "sex",
                    label: "金额"
                },
                {
                    prop: "status",
                    label: "账户余额"
                },
                 {
                    prop: "status",
                    label: "时间"
                },

            ],
            tableData: [{
                user_id: "测试数据1",
                user_name: "测试数据1",
                user_tel: "测试数据1",
                user_id: "测试数据1",
                sex: "测试数据1",
                status: "测试数据1",

            }],
            tableOption: {
                label: "操作",
                options: [{
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
                        label: "解绑",
                        type: "danger",
                        methods: "edit"
                    },
                ]
            },
            pager: {
                count: 0,
                page: 1,
                rows: 100
            },
            showState: true,

        };
    },
    mounted: function () {

    },
    methods: {
        searchInfo() {
            alert("搜做")
        },
        getShow() {
            this.showState = !this.showState
        },
        handleButton(val, rows) {
            if (val == "edit") {
                this.dialogVisible2 = true
            }
            else if(val=="freeze"){
                this.$router.push({
                    path:"/userInfo"
                })
            }
            console.log(val)
            console.log(rows)
        },
        addAccout() {
            this.dialogVisible = true

        },
   
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
    .el-table th>.cell{
    text-align: center;
    }
    .el-table .cell{
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
        display: flex
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
