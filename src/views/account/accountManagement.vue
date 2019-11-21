<template>
<section class="myself-container">
    <div class="device_form">
        <el-form ref="form" :model="form">
            <el-row type="flex">
                <!-- <mySearch :searchText="searchText" @searchInfo="searchInfo" :placeholder="placeholder" ref="numberInput"></mySearch> -->
                <div class="search-con">
                    <i class="el-icon-search" @click="searchInfo" style="color:#606266"></i>
                    <el-input class="search-input" v-model="searchText" placeholder="请输入帐户"></el-input>
                </div>
                <div @click="getShow()" class="div_show" style="color:#606266">筛选</div>
            </el-row>
            <el-row type="flex" class="row_activess" v-show="showState">
                <el-form-item label="状态" style="display: flex;">
                    <el-select v-model="value" placeholder="请选择" @change="onChange2">
                        <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchInfo">确定</el-button>
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
                <tableBarActive1 id="rebateSetTable" ref="table1" tooltip-effect="dark" :tableData="tableData" :clomnSelection="clomnSelection" :rowHeader="rowHeader" :tableOption="tableOption" @disable="disable" @toChange="toChange" @changePassword="changePassword" @toDelete="toDelete"></tableBarActive1>
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
                <el-form-item label="使用状态:">
                    <el-radio v-model="ruleForm2.radio" label="0">启用</el-radio>
                    <el-radio v-model="ruleForm2.radio" label="1">禁用</el-radio>
                </el-form-item>
                <el-form-item prop="username">
                    <el-form-item label="用户名:">
                        <el-input v-model="ruleForm2.username" placeholder="请输入账号"></el-input>
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
                <el-form-item prop="name">
                    <el-form-item label="真实姓名:">
                        <el-input v-model="ruleForm2.name" placeholder="真实姓名"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item prop="phone">
                    <el-form-item label="联系方式:">
                        <el-input v-model="ruleForm2.phone" placeholder="联系方式"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item style="width:100%;display: flex;justify-content:center;">
                    <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">立即提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible2" width="17%" :before-close="handleClose">
        <div class="addaccout">
            <el-form :model="ruleForm3.radio" :rules="rules3" ref="ruleForm3" label-position="left" class="demo-ruleForm ">
                <h3 class="title">用户详情</h3>
                <el-form-item label="用户名:">
                    <el-radio v-model="ruleForm3.radio" label="0">启用</el-radio>
                    <el-radio v-model="ruleForm3.radio" label="1">禁用</el-radio>
                </el-form-item>
                <el-form-item prop="username">
                    <el-form-item label="账号:">
                        <el-input v-model="ruleForm3.username"></el-input>
                    </el-form-item>
                </el-form-item>

                <el-form-item prop="name">
                    <el-form-item label="真实姓名:">
                        <el-input v-model="ruleForm3.name" placeholder="真实姓名"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item prop="phone">
                    <el-form-item label="联系方式:">
                        <el-input v-model="ruleForm3.phone" placeholder="联系方式"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item style="width:100%;display: flex;justify-content:center;">
                    <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit4" :loading="logining">修改</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible3" width="20%" :before-close="handleClose">
        <div class="addaccout">
            <el-form :model="ruleForm4" :rules="rules4" ref="ruleForm4" label-position="left" class="demo-ruleForm ">
                <h3 class="title">密码重置</h3>

                <el-form-item prop="username">
                    <el-form-item label="用户名:">
                        <el-input v-model="ruleForm4.password" placeholder="新密码" type="password"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item prop="nickname">
                    <el-form-item label="确认密码:">
                        <el-input v-model="ruleForm4.password2" placeholder="确认密码" type="password"></el-input>
                    </el-form-item>
                </el-form-item>

                <el-form-item style="width:100%;display: flex;justify-content:center;">
                    <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit5" :loading="logining">确认</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-dialog>

</section>
</template>

<script>
import tableBarActive1 from "../../components/tableBarActive1";
import mySearch from "../../components/mySearch";
import pageNation from "../../components/pageNation";
import {
    userlist,
    userinsert,
    userupdate,
    userdelete
} from '../../api/api';
import common from "../../common/js/util.js"
export default {
    data() {
        return {
            dialogVisible: false,
            dialogVisible2: false,
            dialogVisible3: false,
            searchText: "",
            placeholder: "请输入账号",
            operatingStatus: true,
            clomnSelection: true,
            reserveselection: true,
            value1: "",
            value2: "",
            value: "",
            options2: [{
                    value: '0',
                    label: '启用'
                },
                {
                    value: '1',
                    label: '禁用'
                },
            ],
            ruleForm2: {
                username: '',
                nickname: '',
                password: "",
                password2: "",
                value: "",
                radio: "0",
                name: "",
                phone: "",

            },
            ruleForm3: {
                username: '',
                nickname: '',
                password: "",
                password2: "",
                value: "",
                radio: "0",
                name: "",
                phone: "",
                id: ""

            },
            ruleForm4: {
                username: '',
                nickname: '',
                password: "",
                password2: "",
                value: "",
                radio: "0",
                name: "",
                phone: "",
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
                name: [{
                    required: true,
                    message: '请输入真实姓名',
                    trigger: 'blur'
                }, ],
                phone: [{
                    required: true,
                    message: '请输入联系方式',
                    trigger: 'blur'
                }, ],
            },
            rules3: {

                username: [{
                    required: false,
                    message: '请输入用户名',
                    trigger: 'blur'
                }, ],
                nickname: [{
                    required: false,
                    message: '请输入用户昵称',
                    trigger: 'blur'
                }, ],
                password: [{
                    required: false,
                    message: '请输入密码',
                    trigger: 'blur'
                }, ],
                password2: [{
                    required: false,
                    message: '请输入密码',
                    trigger: 'blur'
                }, ],
                name: [{
                    required: false,
                    message: '请输入真实姓名',
                    trigger: 'blur'
                }, ],
                phone: [{
                    required: false,
                    message: '请输入联系方式',
                    trigger: 'blur'
                }, ],
            },
            rules4: {

                username: [{
                    required: false,
                    message: '请输入用户名',
                    trigger: 'blur'
                }, ],
                nickname: [{
                    required: false,
                    message: '请输入用户昵称',
                    trigger: 'blur'
                }, ],
                password: [{
                    required: false,
                    message: '请输入密码',
                    trigger: 'blur'
                }, ],
                password2: [{
                    required: false,
                    message: '请输入密码',
                    trigger: 'blur'
                }, ],
                name: [{
                    required: false,
                    message: '请输入真实姓名',
                    trigger: 'blur'
                }, ],
                phone: [{
                    required: false,
                    message: '请输入联系方式',
                    trigger: 'blur'
                }, ],
            },
            rowHeader: [{
                    prop: "status",
                    label: "状态"
                },
                {
                    prop: "username",
                    label: "账号"
                },
                {
                    prop: "nickname",
                    label: "用户名",
                    width: "150px"
                },
                {
                    prop: "sex",
                    label: "修改人",
                    width: "150px"
                },
                {
                    prop: "time_update",
                    label: "修改时间"
                },

            ],
            tableData: [],
            tableOption: {
                label: "操作",
                options: [{
                        label: "修改",
                        type: "primary",
                        methods: "checkInfo"
                    },

                    {
                        label: "密码重置",
                        type: "danger",
                        methods: "password"
                    },
                    {
                        label: "禁用",
                        type: "danger",
                        methods: "disable"
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
            showState: false,

        };
    },
    mounted: function () {
        this.queryUserList()

    },
    methods: {

        queryUserList() {
            let param = new Object()
            param.page = this.pager.page - 1
            param.search = this.searchText
            param.status = parseInt(this.value)

            userlist(param)
                .then(res => {
                    console.log(res)
                    if (res.status != 0) {
                        this.$message({
                            message: `${res.err_msg}`,
                            type: "error"
                        })
                    } else {
                        if (res.result.page == 0) {
                            this.pager.count = res.result.cols.length * (res.result.page + 1) + res.result.les_count

                        } else {
                            this.pager.count = 10 + res.result.cols.length * (res.result.page) + res.result.les_count
                        }
                        let nowArr = res.result.cols
                        for (var i = 0; i < nowArr.length; i++) {
                            nowArr[i].time_create = this.common.getTimes(parseInt(nowArr[i].time_create * 1000))
                            nowArr[i].time_update = this.common.getTimes(parseInt(nowArr[i].time_update * 1000))
                            if (nowArr[i].status == 0) {
                                nowArr[i].status = "启用"
                            } else {
                                nowArr[i].status = "禁用"

                            }

                        }
                        this.tableData = nowArr
                    }

                })

        },
        //搜索
        searchInfo() {
            this.queryUserList()

        },
        getShow() {
            this.showState = !this.showState
        },
        //分页
        handleCurrentChange(val) {
            this.pager.page = val.val
            this.queryUserList()
        },
        //新增
        handleSubmit(ev) {
            //return false
            var _this = this;
            this.$refs.ruleForm2.validate((valid) => {
                if (valid) {
                    this.logining = true;

                    var loginParams = {
                        username: this.ruleForm2.username,
                        nickname: "aa",
                        password: this.ruleForm2.password,
                        password2: this.ruleForm2.password2,
                        role_id: 0,
                        phone: this.ruleForm2.phone,
                        status: parseInt(this.ruleForm2.radio),
                        name: this.ruleForm2.name
                    };
                    userinsert(loginParams).then(data => {
                        this.logining = false;
                        this.dialogVisible = false
                        let {
                            msg,
                            status,
                            user
                        } = data;
                        if (status !== 0) {
                            this.$message({
                                message: msg,
                                type: 'error'
                            });
                        } else {
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                            this.queryUserList()
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //禁用
        disable(val) {
            this.ruleForm3.username = val.username
            this.ruleForm3.id = val.id
            this.ruleForm3.name = val.name
            this.ruleForm3.phone = val.phone
            this.ruleForm3.nickname = "aa",
                this.ruleForm3.password = "",
                this.ruleForm3.password2 = "",
                this.ruleForm3.role_id = 0
            if (val.status == "启用") {
                this.ruleForm3.status = 1
            } else {
                this.ruleForm3.status = 0
            }
            let param = new Object()
            param = this.ruleForm3

            this.$confirm('确定执行该操作麽吗', '提示', {
                type: 'warning'
            }).then(() => {
                userupdate(param).then(data => {
                    this.logining = false;
                    this.dialogVisible2 = false
                    let {
                        msg,
                        status,
                        user
                    } = data;
                    if (status !== 0) {
                        this.$message({
                            message: msg,
                            type: 'error'
                        });
                    } else {
                        this.$message({
                            message: '禁用成功',
                            type: 'success'
                        });
                        this.queryUserList()
                    }
                });
            }).catch(() => {

            });
        },
        //修改
        toChange(val) {
            this.dialogVisible2 = true
            this.ruleForm3.username = val.username
            this.ruleForm3.id = val.id
            this.ruleForm3.name = val.name
            this.ruleForm3.phone = val.phone
            this.ruleForm3.nickname = "aa",
                this.ruleForm3.password = "",
                this.ruleForm3.password2 = "",
                this.ruleForm3.role_id = 0

            //this.ruleForm3.status = parseInt(this.ruleForm3.radio)

        },
        //重置密码
        changePassword(val) {
            this.dialogVisible3 = true
            this.ruleForm3.username = val.username
            this.ruleForm3.id = val.id
            this.ruleForm3.name = val.name
            this.ruleForm3.phone = val.phone
            this.ruleForm3.nickname = "aa",

                this.ruleForm3.role_id = 0
        },
        //删除
        toDelete(val) {
            let param = new Object()
            param.id = val.id
            this.$confirm('确定要删除角色吗?', '提示', {
                type: 'warning'
            }).then(() => {
                userdelete(param).then(res => {
                    if (status != 0) {
                        this.$message({
                            message: msg,
                            type: 'error'
                        });
                    } else {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        })
                        this.queryUserList()
                    }
                }).catch(error => {

                })
            }).catch(() => {

            });
        },
        addAccout() {
            this.dialogVisible = true
        },
        //修改确认
        handleSubmit4(ev) {
            //return false
            var _this = this;
            this.$refs.ruleForm3.validate((valid) => {
                if (valid) {
                    this.logining = true;
                    var loginParams = this.ruleForm3
                    this.ruleForm3.status = parseInt(this.ruleForm3.radio)
                    userupdate(loginParams).then(data => {
                        this.logining = false;
                        this.dialogVisible2 = false
                        let {
                            msg,
                            status,
                            user
                        } = data;
                        if (status !== 0) {
                            this.$message({
                                message: msg,
                                type: 'error'
                            });
                        } else {
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                            this.queryUserList()
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //重置密码确认
        handleSubmit5(ev) {
            var _this = this;
            this.$refs.ruleForm4.validate((valid) => {
                if (valid) {
                    this.logining = true;
                    var loginParams = this.ruleForm3
                    this.ruleForm3.password = this.ruleForm4.password
                    this.ruleForm3.password2 = this.ruleForm4.password2
                    this.ruleForm3.status = parseInt(this.ruleForm3.radio)

                    userupdate(loginParams).then(data => {
                        this.logining = false;

                        let {
                            msg,
                            status,
                            user
                        } = data;
                        if (status !== 0) {
                            this.$message({
                                message: msg,
                                type: 'error'
                            });
                        } else {
                            this.dialogVisible3 = false
                            this.$message({
                                message: '重置成功',
                                type: 'success'
                            });
                            this.queryUserList()
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    },
    components: {
        pageNation: pageNation,
        tableBarActive1: tableBarActive1,
        mySearch: mySearch
    }
};
</script>

<style lang="less">
.search-con {
    width: 250px;
    height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid #999999;

    i {}

    .search-input {
        .el-input__inner {
            border: none;
            background: none;
        }
    }

}

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
