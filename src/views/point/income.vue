<template>
<section class="myself-container">
    <div class="user-title">
        <el-row>
            <el-col :span="5">
                <div class="user-item">
                    <div class="item-count">{{yes_total_profit/1000000}} gfp</div>
                    <div class="item-text">昨日总发放积分</div>
                </div>
            </el-col>
            <el-col :span="5" style="margin-left:30px;">
                <div class="user-item">
                    <div class="item-count">{{yes_total_num}} 人</div>
                    <div class="item-text">总发放用户</div>
                </div>
            </el-col>
        </el-row>
    </div>
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
                    <el-form-item label="时间" style="display: flex;">
                        <el-date-picker v-model="start_time" style="width:200px;" type="datetime" placeholder="选择开始日期时间"></el-date-picker> -
                        <el-date-picker v-model="end_time" style="width:200px;" type="datetime" placeholder="选择结束日期时间"></el-date-picker>
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
                    <el-table-column prop="profit" label="收益金额" :formatter="formatNumber">
                    </el-table-column>
                    <el-table-column prop="ip_value" label="当日IP值" :formatter="formatNumber">
                    </el-table-column>
                    <el-table-column prop="store_value" label="当日存储值" :formatter="formatNumber">
                    </el-table-column>
                    <el-table-column prop="store" label="当日算力" sortable="custom" :formatter="formatNumber">
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
import tableBarActive2 from "../../components/tableBarActive2";
import mySearch from "../../components/mySearch";
import pageNation from "../../components/pageNation";
import {
    query_node_info_list
} from "../../api/api";
export default {
    data() {
        return {
            dialogVisible: false,
            searchText: "",
            yes_total_num: '',
            yes_total_profit: '',
            start_time: "",
            end_time: "",
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
                    "收益金额",
                    "当日IP值",
                    "当日存储值",
                    "当日算力",
                    "时间",

                ];
                // 上面设置Excel的表格第一行的标题
                const filterVal = [

                    "user_id",
                    "user_nick_name",
                    "profit",
                    "ip_value",
                    "store_value",
                    "store",
                    "time_stamp",

                ];
                // 上面的index、nickName、name是tableData里对象的属性
                const list = this.tableData2; //把data里的tableData存到list
                const data = this.formatJson(filterVal, list);
                export_json_to_excel(tHeader, data, "用户收益明细表");
            });

        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]));
        },
        //重置
        //重置
        onReset() {
            this.pager.page = 1
            this.start_time = ""
            this.end_time = ""
            this.searchText = ""
            this.getInfo()

        },
        //input回车搜索

        onSubmitKey() {
            this.getInfo()
        },
        formatNumber(row, column) {
            const property = column['property'];
            return (row[property] / 1000000).toFixed(6)
        },
        formatTime(row) {
            return this.common.getTimess(row.time_stamp * 1000);
        },
        getInfo() {
            var data = {
                order: this.order,
                cur_page: this.pager.page - 1,
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

            query_node_info_list(param)
                .then(res => {
                    if (res.status === 0) {
                        // this.tableData = res.data.profit_detail_list;
                        this.yes_total_num = res.data.yes_total_num;
                        this.yes_total_profit = res.data.yes_total_profit;
                        this.pager.count = res.data.total_num;
                        this.pager.rows = res.data.total_page;
                        let teamarr = res.data.profit_detail_list;
                        for (var i = 0; i < teamarr.length; i++) {

                            teamarr[i].time_stamp = this.common.getTimess(teamarr[i].time_stamp * 1000)

                        }
                        this.tableData = teamarr
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        toexportExcel() {
            var data = {
                order: this.order,
                cur_page: this.pageActive,
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

            query_node_info_list(param)
                .then(res => {
                    if (res.status === 0) {
                        this.pageActive = res.data.cur_page
                        if (res.data.cur_page >= res.data.total_page) {
                            console.log(this.tableData2)
                            this.exportExcel()
                            this.common.monitoringLogs('导出', '导出收益明细', 1)

                        } else {
                            this.yes_total_num = res.data.yes_total_num;
                            this.yes_total_profit = res.data.yes_total_profit;
                            this.pager.count = res.data.total_num;
                            this.pager.rows = res.data.total_page;
                            let teamarr = res.data.profit_detail_list;
                            for (var i = 0; i < teamarr.length; i++) {
                                teamarr[i].time_stamp = this.common.getTimess(teamarr[i].time_stamp * 1000)
                            }
                            this.tableData2 = this.tableData2.concat(teamarr);
                            this.pageActive++;
                            this.toexportExcel();
                        }
                    } else {
                        this.common.monitoringLogs('导出', '导出收益明细', 0)
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        getShow() {
            this.showState = !this.showState;
        },
        search() {
            this.pager.page = 1;
            this.getInfo();
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
