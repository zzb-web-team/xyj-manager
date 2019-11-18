<template>
<section class="myself-container">
    <div class="device_form">
        <el-form ref="form" :model="form">
            <el-row type="flex">
                <mySearch :searchText="searchText" @searchInfo="searchInfo"></mySearch>
                <div @click="getShow()" class="div_show" style="color:#606266">筛选</div>
            </el-row>
            <el-row type="flex" class="row_activess" v-show="showState">
                <el-form-item label="性别" style="display: flex;">
                    <el-select v-model="value" placeholder="请选择" @change="onChange2">
                        <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
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
                <el-button type="primary" @click="addAccout">新建</el-button>
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
            <el-col :span="6" style="display: flex;justify-content: justify-content: flex-start;">
                <el-button type="primary" size="small">启用</el-button>
                <el-button type="primary" size="small">禁用</el-button>
                <el-button type="primary" size="small">删除</el-button>
            </el-col>
        </el-row>
        <el-row type="flex">
            <el-col :span="6">
                <pageNation :pager="pager" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"></pageNation>
            </el-col>
        </el-row>

    </div>
    <el-dialog :visible.sync="dialogVisible" width="17%" :before-close="handleClose">
        <div class="addaccout">
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" class="demo-ruleForm ">
                <h3 class="title">新建用户</h3>
                <el-form-item label="用户名:">
                    <el-radio v-model="ruleForm2.radio" label="1">备选项</el-radio>
                    <el-radio v-model="ruleForm2.radio" label="2">备选项</el-radio>
                </el-form-item>
                <el-form-item prop="username">
                    <el-form-item label="用户名:">
                        <el-input v-model="ruleForm2.username" placeholder="用户名"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item prop="nickname">
                    <el-form-item label="用户昵称:">
                        <el-input v-model="ruleForm2.nickname" placeholder="用户昵称"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item prop="password">
                    <el-form-item label="密码:" placeholder="密码">
                        <el-input v-model="ruleForm2.password" type="password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item prop="password2">
                    <el-form-item label="确认密码:">
                        <el-input v-model="ruleForm2.password2" placeholder="请再次密码" type="password"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item prop="nickname">
                    <el-form-item label="真实姓名:">
                        <el-input v-model="ruleForm2.nickname" placeholder="真实姓名"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item prop="nickname">
                    <el-form-item label="联系方式:">
                        <el-input v-model="ruleForm2.nickname" placeholder="联系方式"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item style="width:100%;display: flex;justify-content:center;">
                    <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">立即提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible2" width="17%" :before-close="handleClose">
        <div class="addaccout">
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" class="demo-ruleForm ">
                <h3 class="title">用户详情</h3>
                       <el-form-item label="用户名:">
                    <el-radio v-model="ruleForm2.radio" label="1">备选项</el-radio>
                    <el-radio v-model="ruleForm2.radio" label="2">备选项</el-radio>
                </el-form-item>
                <el-form-item prop="username">
                    <el-form-item label="用户名:">
                        <el-input v-model="ruleForm2.username" placeholder="用户名"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item prop="nickname">
                    <el-form-item label="用户昵称:">
                        <el-input v-model="ruleForm2.nickname" placeholder="用户昵称"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item prop="nickname">
                    <el-form-item label="真实姓名:">
                        <el-input v-model="ruleForm2.nickname" placeholder="真实姓名"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item prop="nickname">
                    <el-form-item label="联系方式:">
                        <el-input v-model="ruleForm2.nickname" placeholder="联系方式"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item style="width:100%;display: flex;justify-content:center;">
                    <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">修改</el-button>
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
            searchText: "账户名，ID",
            operatingStatus: true,
            clomnSelection: true,
            reserveselection: true,
            value1: "",
            value2: "",
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
                    label: "状态"
                },
                {
                    prop: "user_name",
                    label: "账号"
                },
                {
                    prop: "user_tel",
                    label: "用户名"
                },
                {
                    prop: "sex",
                    label: "修改人"
                },
                {
                    prop: "status",
                    label: "修改时间"
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
            showState: false,

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
        width: 81px;
    }

    .el-form-item__error {
        margin-left: 80px;
    }
}
</style>
