<template>
<section class="myself-container">
    <div class="user-title">
        <el-row>
            <el-col :span="5">
                <div class="user-item">
                    <div class="item-count">{{user_form.total_num}}</div>
                    <div class="item-text">注册用户</div>
                </div>
            </el-col>
            <el-col :span="5" style="margin-left:30px;">
                <div class="user-item">
                    <div class="item-count">{{user_form.normal_num}}</div>
                    <div class="item-text">绑定用户</div>
                </div>
            </el-col>

        </el-row>
    </div>
    <div class="device_form">
        <el-form ref="form" :model="form">
            <el-row type="flex">
                <div class="search-con">
                    <i class="el-icon-search" @click="searchInfo" style="color:#606266"></i>
                    <el-input class="search-input" v-model="searchText" placeholder="请输入帐户"></el-input>
                </div>
                <div @click="getShow()" class="div_show" style="color:#606266">筛选</div>
            </el-row>
            <div v-show="showState">
                <el-row type="flex" class="row_activess">
                    <el-form-item label="状态" style="display: flex;">
                        <el-select v-model="form.statusText" placeholder="请选择" @change="onChange">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="性别" style="display: flex;">
                        <el-select v-model="form.sex" placeholder="请选择" @change="onChange2">
                            <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="注册时间" style="display: flex;">
                        <el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="首次绑定时间" style="display: flex;">
                        <el-date-picker v-model="value2" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                </el-row>
                <el-row type="flex" class="row_activess">
                    <el-form-item>
                        <el-button type="primary" style="margin-left:68px;" @click="onSumit()">确定</el-button>
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
            <el-col style="display: flex;justify-content: flex-end;">
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
import {
    ptfs_query_total_users,
    ptfs_query_user_list,
    ptfs_forbid_users,
    changePageCoreRecordData,
    ptfs_query_list_user_store_list,
    ptfs_query_user_total_profit_everyday
} from '../../api/api';
import common from "../../common/js/util.js"

export default {
    data() {
        return {
            dialogVisible: false,
            dialogVisible2: false,
            searchText: "用户ID、用户名、手机号",
            operatingStatus: true,
            clomnSelection: false,
            reserveselection: true,
            value1: "",
            value2: "",
            valueTime: "",
            valueTime1: "",
            form: {
                user_id: "",
                user_name: "",
                tel_num: "",
                sex: "全部",
                account_status: 0,
                statusText: "全部",
                statusActiveText: "全部",
                active_status: 0,
                reg_start_time: 0,
                reg_end_time: 0,
                bind_start_time: 0,
                bind_end_time: 0
            },
            user_form: {
                normal_num: "",
                active_num: "",
                total_num: ""
            },
            options: [{
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
                    prop: "sum_profit",
                    label: "总积分"
                },
                {
                    prop: "average_store",
                    label: "平均算力"
                },
                {
                    prop: "dev_num",
                    label: "设备总数"
                },
                {
                    prop: "first_reg_time",
                    label: "注册时间"
                },
                {
                    prop: "first_bind_time",
                    label: "首次绑定时间"
                },

            ],
            tableData: [],
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
            user_ids: [],
            tempdataArr1: [],
            tempdataArr2: []

        };
    },
    mounted: function () {
        this.queryUsersTotal()
        this.queryUserList()

    },
    methods: {
        queryInfo() {

        },
        onSumit() {
            this.pager.page = 1
            this.queryUserList()
        },
        searchInfo() {},
        getShow() {
            this.showState = !this.showState
        },
        handleButton(val, rows) {
            if (val == "edit") {
                this.dialogVisible2 = true
            } else if (val == "freeze") {
                this.$router.push({
                    path: "/userInfo",
                    query: {
                        user_id: rows.user_id,
                        reg_time:rows.first_reg_time
                    }
                })
            }

        },
        addAccout() {
            this.dialogVisible = true
        },
        //获取注册用户和绑定用户
        queryUsersTotal() {
            let param = new Object()
            ptfs_query_total_users(param)
                .then(res => {
                    if (res.status == 0 && res.err_code == 0) {
                        if (res.data) {
                            this.user_form.active_num = res.data.active_num
                            this.user_form.normal_num = res.data.normal_num
                            this.user_form.total_num = res.data.total_num
                        } else {

                        }
                    } else {
                        this.$message({
                            message: `${res.err_msg}`,
                            type: "error"
                        })
                    }

                })
                .catch(error => {
                    this.$message({
                        message: "网络出错，请重新请求",
                        type: "error"
                    });
                });

        },
        onChange(item) {

            this.form.account_status = parseInt(item)
            if (item == 0) {
                this.form.statusText = "全部"
            } else if (item == 1) {
                this.form.statusText = "正常"
            } else if (item == 2) {
                this.form.statusText = "冻结"
            }

        },
        onChange1(item) {

            this.form.active_status = parseInt(item)
            if (item == 0) {
                this.form.statusActiveText = "全部"
            } else if (item == 1) {
                this.form.statusActiveText = "否"
            } else if (item == 2) {
                this.form.statusActiveText = "是"
            }

        },
        onChange2(item) {
            console.log(item)
            if (item == 0) {
                this.form.sex = "全部"
            } else if (item == 1) {
                this.form.sex = "男"
            } else if (item == 2) {
                this.form.sex = "女"
            } else if (item == 3) {
                this.form.sex = ""
            }

        },
        //获取用户列表
        queryUserList() {
            let param = new Object()
            let phoneNumber = /^1(3|4|5|7|8)\d{9}$/
            let user_id = /^\d{7}$/
            if (this.searchText == "") {
                if (phoneNumber.test(this.searchText) == true) {
                    param.user_id = 0
                    param.tel_num = this.searchText
                    param.user_name = ""
                } else if (user_id.test(this.searchText) == true) {
                    param.user_id = parseInt(this.searchText)
                    param.tel_num = ""
                    param.user_name = ""
                } else {
                    param.user_id = 0
                    param.tel_num = ""
                    param.user_name = this.searchText
                }
            } else {
                param.user_id = 0
                param.tel_num = ""
                param.user_name = ""
            }
            param.account_status = this.form.account_status
            param.account_active = this.form.active_status
            param.sex = this.form.sex
            param.page = this.pager.page - 1

            if (this.value1[0] == undefined) {
                param.reg_start_time = 0
            } else {
                param.reg_start_time = this.value1[0].getTime() / 1000
            }
            if (this.value1[1] == undefined) {
                param.reg_end_time = 0
            } else {
                param.reg_end_time = this.value1[1].getTime() / 1000
            }
            if (this.value2[0] == undefined) {
                param.bind_start_time = 0
            } else {
                param.bind_start_time = this.value2[0].getTime() / 1000
            }
            if (this.value2[1] == undefined) {
                param.bind_end_time = 0
            } else {
                param.bind_end_time = this.value2[1].getTime() / 1000
            }
            if (this.form.user_id == "" && this.form.user_name == "" && this.form.tel_num == "" && this.form.status == 0 && this.form.active_status == 0 && this.sex == "全部" && this.value1[0] == undefined && this.value1[1] == undefined && this.value2[0] == undefined && this.value2[1] == undefined) {
                param.query_type = 0
            } else {
                param.query_type = 1
            }
            ptfs_query_user_list(param)
                .then(res => {
                    if (res.status == 0 && res.err_code == 0) {
                        if (res.data.user_info_list) {
                            let nowArr = res.data.user_info_list
                            this.user_ids = []
                            for (var i = 0; i < nowArr.length; i++) {
                                this.user_ids.push(nowArr[i].user_id)

                                if (nowArr[i].first_bind_time == 0) {
                                    nowArr[i].first_bind_time = "-"
                                } else {
                                    nowArr[i].first_bind_time = this.common.getTimes((nowArr[i].first_bind_time) * 1000)
                                }
                                if (nowArr[i].first_reg_time == 0) {
                                    nowArr[i].first_reg_time = "-"

                                } else {
                                    nowArr[i].first_reg_time = this.common.getTimes((nowArr[i].first_reg_time) * 1000)
                                }
                                if (nowArr[i].user_name === "") {
                                    nowArr[i].user_name = "-"
                                }
                                if (nowArr[i].status == 0) {
                                    nowArr[i].status = "正常"
                                } else {
                                    nowArr[i].status = "冻结"
                                }
                                if (nowArr[i].active_status == 0) {
                                    nowArr[i].active_status = "否"
                                } else {
                                    nowArr[i].active_status = "是"
                                }
                                if (nowArr[i].sex === "") {
                                    nowArr[i].sex = "-"
                                }
                            }
                            this.tempdataArr1 = []
                            this.tempdataArr1 = nowArr
                            this.pager.count = res.data.total_num
                            this.dataNum = res.data.total_num
                            let params = new Object()
                            params.user_id = this.user_ids
                            ptfs_query_list_user_store_list(params).then(res => {
                                if (res.status == 0) {
                                    if (res.data.store_list) {
                                        this.tempdataArr2 = []
                                        this.tableData = []
                                        let tempArr = res.data.store_list
                                        for (var j = 0; j < tempArr.length; j++) {
                                            let newObj = {
                                                dev_num: tempArr[j].dev_num,
                                                sum_profit: (tempArr[j].sum_profit) / 1000000,
                                                average_store: tempArr[j].average_store
                                            }
                                            this.tempdataArr2.push(newObj)
                                        }
                                        for (var k = 0; k < this.tempdataArr1.length; k++) {
                                            let newObj = Object.assign(this.tempdataArr1[k], this.tempdataArr2[k])
                                            this.tableData.push(newObj)
                                        }
                                        console.log(this.tableData)
                                    }

                                } else {
                                    this.$message({
                                        message: `${res.err_msg}`,
                                        type: "error"
                                    })
                                }

                            }).catch(error => {})
                        } else {
                            this.tableData = []
                        }

                    } else {
                        this.$message({
                            message: `${res.err_msg}`,
                            type: "error"
                        })
                    }

                })
                .catch(error => {
                    this.$message({
                        message: "网络出错，请重新请求",
                        type: "error"
                    });
                });
        },
        //分页
        handleCurrentChange(val) {
            this.pager.page = val.val
            this.queryUserList()
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
