<template>
<section class="myself-container">
    <div style="margin-top:30px;">
        <!-- <el-date-picker v-model="valueTime" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="left">
        </el-date-picker>
        <el-button type="primary" @click="onQueryInfo" style="margin-left:20px;">确定</el-button> -->

        <div class="device_form">
            <div id="myEchart" style="width: 600px; height: 300px;"></div>
            <div id="myEchart1" style="width: 600px; height: 300px;"></div>
        </div>
        <div class="devide_table">
            <el-row type="flex" class="row_active">
                <el-col :span="24">
                    <tableBarActive2 id="rebateSetTable" ref="table1" tooltip-effect="dark" :tableData="tableData" :clomnSelection="clomnSelection" :rowHeader="rowHeader" :tableOption="tableOption" @handleButton="handleButton" :operatingStatus="operatingStatus" @toOperating="toOperating" @handleSelectionChange="handleSelectionChange" @selectCheckBox="selectCheckBox" @selectAll="selectAll"></tableBarActive2>
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
    </div>
</section>
</template>

<script>
import {
    device_online_table,
    app_version_dist_curve,
    app_version_dist_table,
    app_version_online_dist
} from '../../api/api'
import pageNation from "../../components/pageNation";

import echarts from "echarts";
import tableBarActive2 from "../../components/tableBarActive2";
export default {
    data() {
        return {
            valueTime: "",
            pickerOptions: {
                shortcuts: [{
                        text: "昨天",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
                            picker.$emit("pick", [start, end]);
                        }
                    },
                    {
                        text: "今天",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(new Date(new Date().setHours(0, 0, 0, 0)).getTime());
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: "最近一周",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit("pick", [start, end]);
                        }
                    },
                    {
                        text: "最近一个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit("pick", [start, end]);
                        }
                    }
                ]
            },
            rowHeader: [{
                    prop: "version",
                    label: "版本"
                },
                {
                    prop: "upgradeCnt",
                    label: "升级用户"
                },
                {
                    prop: "registerCnt",
                    label: "新用户数"
                },
                {
                    prop: "totalCnt",
                    label: "升级+新用户数"
                },
                {
                    prop: "turnOnCnt",
                    label: "启动次数"
                },
                {
                    prop: "userCnt",
                    label: "启动用户(分布)"
                }
            ],
            tableData: [],
            echartsTable: [],
            echartsTable2: [],
            echartsLine:[],
            echartsLine1:[],
            echartsLine2:[],


pager: {
                count: 0,
                page: 1,
                rows: 100
            },
        };
    },
    mounted() {
        this.configure1()
        this.queryversionEchars()
        this.queryversionTable()
        this.queryversonLine()
    },
    beforeDestroy() {
        if (!this.chart) {
            return;
        }
        this.chart.dispose();
        this.chart = null;
    },
    methods: {
        //版本在线分布图
        queryversonLine() {
            let startTime = (new Date().getTime() / 1000)
            let endTime = ((new Date().getTime()) - 60 * 60 * 24 * 7 * 1000) / 1000

            if (this.valueTime) {
                if (this.valueTime == "") {
                    startTime = (new Date().getTime() / 1000)
                    endTime = ((new Date().getTime()) - 60 * 60 * 24 * 7 * 1000) / 1000
                } else {
                    endTime = Math.floor(this.valueTime[1].getTime() / 1000)
                    startTime = Math.floor(this.valueTime[0].getTime() / 1000)
                }

            } else {
                startTime = (new Date().getTime() / 1000)
                endTime = ((new Date().getTime()) - 60 * 60 * 24 * 7 * 1000) / 1000
            }
            let param = {
                "start_ts": parseInt(startTime),
                "end_ts": parseInt(endTime),

            }
            app_version_online_dist(param).then(res => {
           
                if (res.status == 0) {
                    let tempArr = []
                    let tempArr1 = []
                    let tempArr2 = []
                    let tempArr3 = []
                    tempArr = res.data.list
                    for (var i = 0; i < tempArr.length; i++) {
                        let obj = {
                            value: tempArr[i].cnt,
                            name: tempArr[i].version
                        }
                        tempArr1.push(obj)
                        tempArr1.push(tempArr[i].offlineCnt)
                        tempArr2.push(tempArr[i].onlineCnt)
                        tempArr3.push(tempArr[i].version)
                    }
                    this.echartsLine = tempArr1
                    this.echartsLine1 = tempArr2
                    this.echartsLine2 = tempArr3
                    this.configure1()

                } else {
                    this.$message({
                        message: "服务出错",
                        type: "error"
                    });

                }

            }).catch(error => {

            })
        },

        // //确定查询
        // onQueryInfo() {
        //     this.queryversionEchars()
        //     this.queryversionTable()
        // },
        //分页
        handleCurrentChange(val) {
            this.pager.page = val.val
            this.queryversionTable()
        },
        //分页
        handleCurrentChange1(val) {
            this.pager1.page = val.val
            this.queryversionTable()
        },
        //查询版本分布表格
        queryversionTable() {
            let startTime = (new Date().getTime() / 1000)
            let endTime = ((new Date().getTime()) - 60 * 60 * 24 * 7 * 1000) / 1000

            if (this.valueTime) {
                if (this.valueTime == "") {
                    startTime = (new Date().getTime() / 1000)
                    endTime = ((new Date().getTime()) - 60 * 60 * 24 * 7 * 1000) / 1000
                } else {
                    endTime = Math.floor(this.valueTime[1].getTime() / 1000)
                    startTime = Math.floor(this.valueTime[0].getTime() / 1000)
                }

            } else {
                startTime = (new Date().getTime() / 1000)
                endTime = ((new Date().getTime()) - 60 * 60 * 24 * 7 * 1000) / 1000
            }
            let param = {
                "start_ts": parseInt(startTime),
                "end_ts": parseInt(endTime),
                "pageNo": 0,
                "pageSize": 10
            }
            app_version_dist_table(param).then(res => {
                console.log(res)
                if (res.status == 0) {
                    this.pager.count = res.data.totalCnt
                    this.tableData = res.data.list

                } else {
                    this.$message({
                        message: "服务出错",
                        type: "error"
                    });

                }
            }).catch(error => {

            })

        },
        //查询版本饼图
        queryversionEchars() {
            let startTime = (new Date().getTime() / 1000)
            let endTime = ((new Date().getTime()) - 60 * 60 * 24 * 7 * 1000) / 1000

            if (this.valueTime) {
                if (this.valueTime == "") {
                    startTime = (new Date().getTime() / 1000)
                    endTime = ((new Date().getTime()) - 60 * 60 * 24 * 7 * 1000) / 1000
                } else {
                    endTime = Math.floor(this.valueTime[1].getTime() / 1000)
                    startTime = Math.floor(this.valueTime[0].getTime() / 1000)
                }

            } else {
                startTime = (new Date().getTime() / 1000)
                endTime = ((new Date().getTime()) - 60 * 60 * 24 * 7 * 1000) / 1000
            }
            let param = {
                "start_ts": parseInt(startTime),
                "end_ts": parseInt(endTime)
            }
            app_version_dist_curve(param).then(res => {
                console.log(res)
                if (res.status == 0) {
                    let tempArr = []
                    let tempArr1 = []
                    let tempArr2 = []
                    tempArr = res.data.list
                    for (var i = 0; i < tempArr.length; i++) {
                        let obj = {
                            value: tempArr[i].cnt,
                            name: tempArr[i].version
                        }
                        tempArr1.push(obj)
                        tempArr2.push(tempArr[i].version)
                    }
                    this.echartsTable = tempArr1
                    this.echartsTable2 = tempArr2
                    this.configure()

                } else {
                    this.$message({
                        message: "服务出错",
                        type: "error"
                    });

                }
            }).catch(error => {

            })

        },

        //
        configure() {
            let myChart = echarts.init(document.getElementById('myEchart')); //这里是为了获得容器所在位置    
            window.onresize = myChart.resize;
            let options = {
                title: {
                    text: '版本分布图',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: this.echartsTable2
                },
                series: [{
                    name: '版本分布图',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    // data: [{
                    //         value: 335,
                    //         name: '1.1.1版本'
                    //     },
                    //     {
                    //         value: 310,
                    //         name: '1.1.2版本'
                    //     },
                    //     {
                    //         value: 234,
                    //         name: '1.1.3版本'
                    //     },
                    // ],
                    data: this.echartsTable,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }]
            }

            myChart.setOption(options);
        },

        configure1() {
            let myChart1 = echarts.init(document.getElementById('myEchart1'));
            window.onresize = myChart1.resize;

            let options1 = {
                title: {
                    text: '版本在线分布图',
                    x: 'center',
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['在线', '离线'],
                    top: 24
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    data: this.echartsLine2
                },
                series: [{
                        name: '在线',
                        type: 'bar',
                        data: this.echartsLine1
                    },
                    {
                        name: '离线',
                        type: 'bar',
                        data:this.echartsLine
                    }
                ]
            };

            myChart1.setOption(options1);
        },

    },
    components: {
        tableBarActive2,
        pageNation
    }
};
</script>

<style lang="less">
.myself-container {
    width: 100%;
    min-width: 1600px;

    .device_form {
        width: 100%;
        height: auto;
        display: flex;
        overflow: hidden;
        margin-top: 20px;
        background: #f2f2f2;
        padding: 15px 30px;
        box-sizing: border-box;

        .bottom {
            margin-top: 20px;
        }

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
    .el-form--label-left .el-form-item__label {
        text-align: right;
        width: 90px;
    }

    .el-form-item__error {
        margin-left: 80px;
    }
}
</style>
