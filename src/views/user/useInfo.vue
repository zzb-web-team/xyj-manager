<template>
<section class="myself-container">
    <div class="user-title">
        <el-row>
            <el-col :span="5">
                <div class="user-item">
                    <div class="item-count">1000POC</div>
                    <div class="item-text" style="margin-top:7px;">总分积分</div>
                    <div class="item-text" style="margin-top:7px;">
                        <el-button type="primary" size="mini" @click="getQueryInfo">查看明细</el-button>
                    </div>
                </div>
            </el-col>
            <el-col :span="5" style="margin-left:30px;">
                <div class="user-item">
                    <div class="item-count">1000POC</div>
                    <div class="item-text" style="margin-top:7px;">累计收益</div>
                    <div class="item-text" style="margin-top:7px;">
                        <el-button type="primary" size="mini" @click="getQueryInfo">查看明细</el-button>
                    </div>
                </div>
            </el-col>
            <el-col :span="5" style="margin-left:30px;">
                <div class="user-item">
                    <div class="item-count">3台</div>
                    <div class="item-text" style="margin-top:7px;">设备总数</div>
                    <div class="item-text" style="margin-top:7px;">
                        <el-button type="primary" size="mini" @click="getQueryInfo">查看明细</el-button>
                    </div>
                </div>
            </el-col>
            <el-col :span="5" style="margin-left:30px;">
                <div class="user-item">
                    <div class="item-count">2.36232</div>
                    <div class="item-text" style="margin-top:7px;">平均算例</div>
                    <div class="item-text" style="margin-top:7px;">
                        <el-button type="primary" size="mini" @click="getQueryInfo">查看明细</el-button>
                    </div>
                </div>
            </el-col>

        </el-row>
    </div>
    <div class="user-info">
        <div class="title">
            <div class="title-text">基本信息</div>

        </div>
        <div class="h3">
            基本信息
        </div>
        <div class="user-con">
            <div class="item" style="margin-top:10px;">
                <div class="item-l">用户ID:</div>
                <div class="item-r">ayi001</div>
            </div>
            <div class="item">
                <div class="item-l">用户昵称:</div>
                <div class="item-r">我是大南瓜</div>
            </div>
            <div class="item">
                <div class="item-l">手 机 号:</div>
                <div class="item-r">15951813234</div>
            </div>
            <div class="item">
                <div class="item-l">注册时间:</div>
                <div class="item-r">20190215 12:12:21</div>
            </div>
        </div>
    </div>
        <el-dialog :visible.sync="dialogVisible2" width="50%" :before-close="handleClose">
        <div class="userdetails">
            <el-row style="height:40px;line-height:40px;font-weight: bold;">
                <el-col :span="24">
                用户积分明细
                </el-col>
            </el-row>
              <el-row type="flex" class="row_active">
            <el-col :span="24">
                <tableBarActive2 id="rebateSetTable" ref="table1" tooltip-effect="dark" :tableData="tableData" :clomnSelection="clomnSelection" :rowHeader="rowHeader" :tableOption="tableOption" @handleButton="handleButton" :operatingStatus="operatingStatus" @toOperating="toOperating" @handleSelectionChange="handleSelectionChange" @selectCheckBox="selectCheckBox" @selectAll="selectAll"></tableBarActive2>
            </el-col>
        </el-row>
        </div>
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
            dialogVisible: false,
            dialogVisible2: false,
            searchText: "用户ID、用户名、手机号",
            operatingStatus: false,
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
                    label: '正常'
                },
                {
                    value: '2',
                    label: '冻结'
                },
                {
                    value: '3',
                    label: '未知'
                },
            ],
            options2: [{
                    value: '0',
                    label: '全部'
                },
                {
                    value: '1',
                    label: '男'
                },
                {
                    value: '2',
                    label: '女'
                },
                {
                    value: '3',
                    label: '未知'
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
                    label: "手机号"
                },
                {
                    prop: "sex",
                    label: "性别"
                },
                {
                    prop: "status",
                    label: "平均算力"
                },
                {
                    prop: "status",
                    label: "设备总数"
                },
                {
                    prop: "status",
                    label: "注册时间"
                },
                {
                    prop: "status",
                    label: "首次绑定时间"
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
                        label: "详情",
                        type: "primary",
                        methods: "freeze"
                    },
                    {
                        label: "冻结",
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
        getQueryInfo(){
            this.dialogVisible2=true

        },
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

.user-info {
    width: 100%;
    margin-top: 30px;

    .title {
        width: 100%;
        border-bottom: 2px solid #999999;
        height: 40px;

        .title-text {
            width: 100px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background: #66b1ff;
            color: #ffffff;
        }
    }

    .h3 {
        width: 100%;
        height: 40px;
        background: #f2f2f2;
        border-radius: 4px;
        margin-top: 10px;
        line-height: 40px;
        text-indent: 20px;
        font-size: 14px;
    }

    .user-con {
        width: 100%;

        .item {
            width: 100%;
            display: flex;
            align-items: center;
            margin-left: 25px;
            height: 25px;
            line-height: 25px;
            box-sizing: border-box;
            justify-content: flex-start;
            font-size: 14px;
            color: #666666;
        }
    }
}

.myself-container {
    .el-table th>.cell {
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
