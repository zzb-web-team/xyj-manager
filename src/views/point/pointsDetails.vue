<template>
<section class="myself-container">
    <div class="device_form">
        <el-form ref="form" :model="form">
            <el-row type="flex">
                <div class="search-con">
                    <i class="el-icon-search" style="color:#606266"></i>
                    <el-input class="search-input" v-model="searchText" placeholder="用户ID、用户昵称" @keyup.enter.native="onSubmitKey"></el-input>
                </div>
                <div @click="getShow()" class="div_show" style="color:#606266">筛选</div>
            </el-row>
            <div v-show="showState">
                <el-row type="flex" class="row_activess">
                    <el-form-item label="类型" style="display: flex;">
                        <el-select v-model="profit_type" placeholder="请选择">
                            <el-option v-for="item in profit_types" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="时间" style="display: flex;">
                        <el-date-picker v-model="start_time" style="width:150px;" type="datetime" placeholder="选择开始日期时间"></el-date-picker> -
                        <el-date-picker v-model="end_time" style="width:150px;" type="datetime" placeholder="选择结束日期时间"></el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" style="margin-left:68px;" @click="search">确定</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onReset">重置</el-button>
                    </el-form-item>
                </el-row>
            </div>
        </el-form>
    </div>
    <div class="devide_table">
        <el-row type="flex" class="row_active" style="display: flex;justify-content: flex-end;">
            <el-col style="display: flex;justify-content: flex-end;">
                <el-button type="primary" @click="toexportExcel">导出</el-button>
            </el-col>
        </el-row>
        <el-row type="flex" class="row_active">
            <el-col :span="24">
                <el-table :data="tableData" border style="width: 100%" @sort-change='tableSortChange'>
                    <el-table-column prop="user_id" label="用户ID">
                    </el-table-column>
                    <el-table-column prop="user_nick_name" label="用户昵称">
                    </el-table-column>
                    <el-table-column prop="profit_type" label="收支类型">
                    </el-table-column>
                    <el-table-column prop="profit_typeActive" label="金额">
                        <!-- <template slot-scope="scope">
                            <div v-if="scope.row.profit_type === 1 " disable-transitions>{{(scope.row.cur_profit/1000000).toFixed(6)}}
                            </div>
                            <div v-if="scope.row.profit_type === 2 " disable-transitions>{{(scope.row.cur_amount/1000000).toFixed(6)}}
                            </div>
                        </template> -->
                    </el-table-column>

                    <el-table-column prop="total_profit" label="账户余额" :formatter="formatNumber">
                    </el-table-column>
                    <el-table-column prop="time_stamp" sortable="custom" label="时间">
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
</section>
</template>

<script>
import mySearch from "../../components/mySearch";
import pageNation from "../../components/pageNation";
import {
    query_user_total_profit_everyday
} from "../../api/api";
import common from "../../common/js/util.js"

export default {
    data() {
        return {
            searchText: "",
            start_time: "",
            end_time: "",
            profit_type: "",
            profit_types: [{
                    value: "0",
                    label: "全部"
                },
                {
                    value: "1",
                    label: "收益"
                },
                {
                    value: "2",
                    label: "兑换"
                }
            ],
            tableData: [],
            pager: {
                count: 0,
                page: 1,
                rows: 100
            },
            showState: false,
            order: 0,
            tableData2: [],
            pageActive: 0
        };
    },
    mounted() {
        this.getInfo();
    },
    methods: {
        //排序
        tableSortChange(column) {
            this.pager.page = 1
            if (column.order == "descending") {
                this.order = 0
            } else {
                this.order = 1
            }
            this.getInfo()

        },
        //导出的方法
        exportExcel() {
            require.ensure([], () => {
                const {
                    export_json_to_excel
                } = require("../../excel/Export2Excel");
                const tHeader = [

                    "用户ID",
                    "用户昵称",
                    "收支类型",
                    "金额",
                    "账户余额",
                    "时间",

                ];
                // 上面设置Excel的表格第一行的标题
                const filterVal = [

                    "user_id",
                    "user_nick_name",
                    "profit_type",
                    "profit_typeActive",
                    "total_profit",
                    "time_stamp",

                ];
                // 上面的index、nickName、name是tableData里对象的属性
                const list = this.tableData2; //把data里的tableData存到list
                const data = this.formatJson(filterVal, list);
                export_json_to_excel(tHeader, data, "积分明细表");
            });
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]));
        },
        //重置
        onReset() {
            this.pager.page = 1
            this.start_time = ""
            this.end_time = ""
            this.searchText = ""
            this.profit_type = ""
            this.getInfo()

        },
        //input按钮搜索
        onSubmitKey() {
            this.getInfo()
        },
        formatType(row) {
            if (row.profit_type === 1) {
                return '收益'
            } else {
                return '兑换'
            }
        },
        formatNumber(row, column) {
            const property = column['property'];
            return (row[property] / 1000000).toFixed(6)
        },
        formatTime(row) {
            return this.common.getTimess(row.time_stamp * 1000);
        },
        getInfo() {
            let data = {
                cur_page: this.pager.page - 1,
                order: this.order,
                profit_type: this.profit_type === "" ? 0 : Number(this.profit_type),
                start_time: this.start_time === "" ?
                    0 : new Date(this.start_time).getTime() / 1000,
                end_time: this.end_time === "" ?
                    0 : new Date(this.end_time).getTime() / 1000,
            };
            if (this.judgeString(this.searchText)) {
                var arr = Object.keys(this.judgeString(this.searchText));
                data.query_type = arr.length === 0 ? 0 : 1;
                var param = Object.assign(this.judgeString(this.searchText), data);
            } else {
                this.$message.error('请输入正确的用户ID、用户昵称')
                return;
            }

            query_user_total_profit_everyday(param)
                .then(res => {
                    if (res.status === 0) {

                        let teamarr = res.data.total_profit_list;
                        for (var i = 0; i < teamarr.length; i++) {
                            if (teamarr[i].profit_type === 1) {
                                teamarr[i].profit_type = "收益"
                                teamarr[i].profit_typeActive = ((teamarr[i].cur_profit) / 1000000).toFixed(6)
                            } else {
                                teamarr[i].profit_type = "兑换"
                                teamarr[i].profit_typeActive = ((teamarr[i].cur_amount) / 1000000).toFixed(6)

                            }
                            teamarr[i].time_stamp = this.common.getTimess(teamarr[i].time_stamp * 1000)

                        }

                        this.tableData = teamarr
                        console.log(this.tableData)
                        this.pager.count = res.data.total_num;
                        this.pager.rows = res.data.total_page;
                    }

                })
                .catch(error => {
                    console.log(error);
                });
        },

        toexportExcel() {
            let data = {
                cur_page: this.pageActive,
                order: this.order,
                profit_type: this.profit_type === "" ? 0 : Number(this.profit_type),
                start_time: this.start_time === "" ?
                    0 : new Date(this.start_time).getTime() / 1000,
                end_time: this.end_time === "" ?
                    0 : new Date(this.end_time).getTime() / 1000,
            };
            if (this.judgeString(this.searchText)) {
                var arr = Object.keys(this.judgeString(this.searchText));
                data.query_type = arr.length === 0 ? 0 : 1;
                var param = Object.assign(this.judgeString(this.searchText), data);
            } else {
                this.$message.error('请输入正确的用户ID、用户昵称')
                return;
            }

            query_user_total_profit_everyday(param)
                .then(res => {
                    if (res.status === 0) {
                        this.pageActive = res.data.cur_page
                        if (res.data.cur_page >= res.data.total_page) {
                            console.log(this.tableData2)
                            this.exportExcel()
                            this.common.monitoringLogs('导出', '导出积分明细', 1)

                        } else {
                            let teamarr = res.data.total_profit_list;
                            for (var i = 0; i < teamarr.length; i++) {
                                if (teamarr[i].profit_type === 1) {
                                    teamarr[i].profit_type = "收益"
                                    teamarr[i].profit_typeActive = ((teamarr[i].cur_profit) / 1000000).toFixed(6)
                                } else {
                                    teamarr[i].profit_type = "兑换"
                                    teamarr[i].profit_typeActive = ((teamarr[i].cur_amount) / 1000000).toFixed(6)

                                }
                                teamarr[i].time_stamp = this.common.getTimess(teamarr[i].time_stamp * 1000)

                            }
                            //this.tableData2 = teamarr
                            this.tableData2 = this.tableData2.concat(teamarr);
                            this.pageActive++;
                            this.toexportExcel();

                        }

                    } else {
                        this.common.monitoringLogs('导出', '导出积分明细', 0)

                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        search() {
            this.pager.page = 1;
            this.getInfo()
        },
        getShow() {
            this.showState = !this.showState;
        },
        addAccout() {
            this.dialogVisible = true;
        },
        handleCurrentChange(val) {
            this.pager.page = val.val;
            this.getInfo()
        },
        judgeString(str) {
            const reg1 = /^\d{7}$/;
            const reg2 = /^[\u4E00-\u9FA5A-Za-z0-9]{4,20}$/;
            const reg7 = /^\d+$/
            if (reg1.test(str)) {
                return {
                    user_id: Number(str)
                }
            } else if (reg2.test(str) && !reg7.test(str)) {
                return {
                    nick_name: str
                }
            } else if (str === '') {
                return {}
            } else {
                return false
            }
        }
    },
    components: {
        pageNation: pageNation,
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
