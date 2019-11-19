<template>
<section class="myself-container">
    <div class="device_form">
        <el-form ref="form" :model="form">
            <el-row type="flex">
                <mySearch :searchText="searchText" @searchInfo="searchInfo"></mySearch>
                <div @click="getShow()" class="div_show" style="color:#606266">筛选</div>
            </el-row>
            <el-row type="flex" class="row_activess" v-show="showState">
               <el-form-item label="日期" style="display: flex;">
                        <el-date-picker v-model="valueTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                <el-form-item>
                    <el-button type="primary">确定</el-button>
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
    <el-dialog :visible.sync="dialogVisible" width="20%" :before-close="handleClose">
        <div class="addaccout">
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" class="demo-ruleForm ">
                <h3 class="title">调整算力系数</h3>
                <el-form-item prop="username">
                    <el-form-item label="IP 系数:">
                        <el-input v-model="ruleForm2.username" placeholder="请输入IP 系数"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item prop="nickname">
                    <el-form-item label="存储系数:">
                        <el-input v-model="ruleForm2.nickname" placeholder="请输入存储系数"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item style="width:100%;display: flex;justify-content:center;">
                    <el-button type="primary"  @click.native.prevent="handleSubmit2" :loading="logining">确定</el-button>
                    <el-button type="primary"  @click.native.prevent="handleSubmit3">取消</el-button>
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
export default {
    data() {
        return {
            dialogVisible: false,
            dialogVisible2: false,
            searchText: "设备SN、用户ID",
            operatingStatus: false,
            clomnSelection: true,
            reserveselection: true,
            value1: "",
            value2: "",
            valueTime:"",
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
            ruleForm2: {
                username: '',
                nickname: '',
                password: "",
                password2: "",
                value: "",
                 radio:"1",

            },
            rules2: {
               
                username: [{
                    required: true,
                    message: '请输入用户名',
                    trigger: 'blur'
                }, ],
                nickname: [{
                    required: true,
                    message: '请输入用户昵称',
                    trigger: 'blur'
                }, ],
                password: [{
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur'
                }, ],
                password2: [{
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur'
                }, ],
            },
            rowHeader: [{
                    prop: "user_id",
                    label: "设备SN"
                },
                {
                    prop: "user_name",
                    label: "绑定用户ID"
                },
                {
                    prop: "user_tel",
                    label: "当日剩余空间/总空间"
                },
                {
                    prop: "sex",
                    label: "当日上行宽带"
                },
                {
                    prop: "status",
                    label: "当日IP值"
                },
                  {
                    prop: "status",
                    label: "当日存储值"
                },
                  {
                    prop: "status",
                    label: "当日算力"
                },
                  {
                    prop: "status",
                    label: "日期"
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
                        label: "修改",
                        type: "danger",
                        methods: "edit"
                    },
                    {
                        label: "禁用",
                        type: "danger",
                        methods: "thaw"
                    },
                    {
                        label: "删除",
                        type: "danger",
                        methods: "thaw"
                    }
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
            console.log(val)
            console.log(rows)
        },
        addAccout() {
            this.dialogVisible = true

        },
              handleSubmit3(ev) {
    this.dialogVisible =false
              },
        handleSubmit2(ev) {
            //return false
            var _this = this;
            this.$refs.ruleForm2.validate((valid) => {
                if (valid) {
                    this.logining = true;
                    var loginParams = {
                        username: this.ruleForm2.username,
                        nickname: this.ruleForm2.nickname,
                        password: this.ruleForm2.password,
                        password2: this.ruleForm2.password2,
                        role_id: this.ruleForm2.value,
                    };
                    //     userinsert(loginParams).then(data => {
                    //         this.logining = false;
                    //         this.dialogVisible = false
                    //         let {
                    //             msg,
                    //             status,
                    //             user
                    //         } = data;
                    //         if (status !== 0) {
                    //             this.$message({
                    //                 message: msg,
                    //                 type: 'error'
                    //             });
                    //         } else {
                    //             this.$message({
                    //                 message: '添加成功',
                    //                 type: 'success'
                    //             });
                    //             this.queryUserList()
                    //         }
                    //     });
                    // } else {
                    //     console.log('error submit!!');
                    //     return false;
                }
            });
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
    .title{
    width: 100%;
        text-align: center;
    }
    .el-dialog__body{
        padding: 0px;
    }
    .el-form-item{
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
