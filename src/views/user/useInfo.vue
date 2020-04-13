<template>
<section class="myself-container">
    <div class="user-title">
        <el-row>
            <el-col :span="5">
                <div class="user-item">
                    <div class="item-count">{{sum_profit}}</div>
                    <div class="item-text" style="margin-top:7px;">总分积分</div>
                    <div class="item-text" style="margin-top:7px;">
                        <el-button type="primary" size="mini" @click="getQueryInfo">查看明细</el-button>
                    </div>
                </div>
            </el-col>
            <el-col :span="5" style="margin-left:30px;">
                <div class="user-item">
                    <div class="item-count">{{sum_profit1}}</div>
                    <div class="item-text" style="margin-top:7px;">累计收益</div>
                    <div class="item-text" style="margin-top:7px;">
                        <el-button type="primary" size="mini" @click="getQueryInfo1">查看明细</el-button>
                    </div>
                </div>
            </el-col>
            <el-col :span="5" style="margin-left:30px;">
                <div class="user-item">
                    <div class="item-count">{{dev_num}}</div>
                    <div class="item-text" style="margin-top:7px;">设备总数</div>
                    <div class="item-text" style="margin-top:7px;">
                        <el-button type="primary" size="mini" @click="getQueryInfo2">查看明细</el-button>
                    </div>
                </div>
            </el-col>
            <el-col :span="5" style="margin-left:30px;">
                <div class="user-item">
                    <div class="item-count">{{average_store}}</div>
                    <div class="item-text" style="margin-top:7px;">日平均算力</div>
                    <div class="item-text" style="margin-top:7px;">
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
                <div class="item-r">{{user_id}}</div>
            </div>
            <div class="item">
                <div class="item-l">用户昵称:</div>
                <div class="item-r">{{user_name}}</div>
            </div>
            <div class="item">
                <div class="item-l">手 机 号:</div>
                <div class="item-r">{{user_tel}}</div>
            </div>

            <div class="item">
                <div class="item-l">注册时间:</div>
                <div class="item-r">{{reg_time}}</div>
            </div>
            <div class="item">
                <div class="item-l">首次绑定时间:</div>
                <div class="item-r">{{reg_time1}}</div>
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
                    <tableBarActive2 id="rebateSetTable1" ref="table1" tooltip-effect="dark" @tableSortChange="tableSortChange" :tableData="tableData1" :clomnSelection="clomnSelection" :rowHeader="rowHeader1" :tableOption="tableOption" @handleButton="handleButton" :operatingStatus="operatingStatus" @toOperating="toOperating" @handleSelectionChange="handleSelectionChange" @selectCheckBox="selectCheckBox" @selectAll="selectAll"></tableBarActive2>
                </el-col>
            </el-row>
            <pageNation :pager="pager1" @handleSizeChange="handleSizeChange1" @handleCurrentChange="handleCurrentChange1"></pageNation>

        </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible3" width="50%" :before-close="handleClose">
        <div class="userdetails">
            <el-row style="height:40px;line-height:40px;font-weight: bold;">
                <el-col :span="24">
                   '{{user_ids}}' 用户收益明细
                </el-col>
            </el-row>
            <el-row type="flex" class="row_active">
                <el-col :span="24">
                    <tableBarActive2 id="rebateSetTable" ref="table1" tooltip-effect="dark" :tableData="tableData" @tableSortChange="tableSortChange" :clomnSelection="clomnSelection" :rowHeader="rowHeader" :tableOption="tableOption" @handleButton="handleButton" :operatingStatus="operatingStatus" @toOperating="toOperating" @handleSelectionChange="handleSelectionChange" @selectCheckBox="selectCheckBox" @selectAll="selectAll"></tableBarActive2>
                </el-col>
            </el-row>
            <pageNation :pager="pager" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"></pageNation>

        </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible4" width="50%" :before-close="handleClose">
        <div class="userdetails">
            <el-row style="height:40px;line-height:40px;font-weight: bold;">
                <el-col :span="24">
                    '{{user_ids}}' 用户设备明细
                </el-col>
            </el-row>
            <el-row type="flex" class="row_active">
                <el-col :span="24">
                    <tableBarActive2 id="rebateSetTable" ref="table1" tooltip-effect="dark" :tableData="tableData2" :clomnSelection="clomnSelection" :rowHeader="rowHeader2" :tableOption="tableOption" @handleButton="handleButton" :operatingStatus="operatingStatus" @toOperating="toOperating" @handleSelectionChange="handleSelectionChange" @selectCheckBox="selectCheckBox" @selectAll="selectAll"></tableBarActive2>
                </el-col>
            </el-row>
            <pageNation :pager="pager2" @handleSizeChange="handleSizeChange2" @handleCurrentChange="handleCurrentChange2"></pageNation>

        </div>
    </el-dialog>

</section>
</template>

<script>
import tableBarActive2 from "../../components/tableBarActive2";
import mySearch from "../../components/mySearch";
import pageNation from "../../components/pageNation";
import {
    ptfs_query_list_user_store_list,
    ptfs_query_node_info_list,
    ptfs_query_user_total_profit_everyday,
    ptfs_query_user_store_list,
    devicelist,
    ptfs_query_user_profit_list

} from '../../api/api';
import common from "../../common/js/util.js"
export default {
    data() {
        return {
            pager: {
                count: 0,
                page: 1,
                rows: 100
            },
            pager1: {
                count: 0,
                page: 1,
                rows: 100
            },
            pager2: {
                count: 0,
                page: 1,
                rows: 100
            },
            dialogVisible: false,
            dialogVisible2: false,
            dialogVisible3: false,
            dialogVisible4: false,
            searchText: "用户ID、用户名、手机号",
            operatingStatus: false,
            clomnSelection: false,
            reserveselection: true,
            value1: "",
            value2: "",
            valueTime: "",
            valueTime1: "",
            dev_num: "",
            sum_profit: "",
            sum_profit1: "",
            average_store: "",
            user_id: "",
            user_name: "",
            user_tel: "",
            user_email: "",
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
                    prop: "profit",
                    label: "收益金额"
                },

                {
                    prop: "dev_sn",
                    label: "设备SN"
                },
                {
                    prop: "total_cap",
                    label: "挖矿空间"
                },
                {
                    prop: "up_bandwidth",
                    label: "上行宽带"
                },
                {
                    prop: "down_bandwidth",
                    label: "下行宽带"
                },
                 {
                    prop: "com_power",
                    label: "当日算力"
                },

                {
                    prop: "time_stamp",
                    label: "时间",
                    sortable: true,
                },

            ],
            rowHeader1: [{
                    prop: "profit_type",
                    label: "收支类型"
                },
                {
                    prop: "cur_profit",
                    label: "金额"
                },
                {
                    prop: "total_profit",
                    label: "账户余额"
                },
                {
                    prop: "time_stamp",
                    label: "时间"
                },

            ],
            rowHeader2: [{
                    prop: "dev_sn",
                    label: "设备SN"
                },
                {
                    prop: "dev_type",
                    label: "设备型号"
                },
                {
                    prop: "dev_name",
                    label: "设备名称"
                },
                   {
                    prop: "dev_name",
                    label: "ROM"
                },
                {
                    prop: "dev_mac",
                    label: "MAC地址"
                },
                {
                    prop: "dev_ip",
                    label: "设备IP"
                },
                {
                    prop: "online_state",
                    label: "设备状态"
                },

            ],
            tableData: [],
            tableData1: [],
            tableData2: [],
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
            user_id: "",
            is_activated: "",
            import_start_ts: "",
            import_end_ts: "",
            activate_start_ts: "",
            activate_end_ts: "",
            dev_type: "",
            online_state: "",
            rom_version: "",
            bind_flag: "",
            bind_start_ts: "",
            bind_end_ts: "",
            user_ids: [],
            reg_time: "",
            reg_time1: "",
            order: 0,

        };
    },
    mounted: function () {
        if (this.$route.query.user_id) {
            this.user_ids = parseInt(this.$route.query.user_id)

        } else {
            this.user_ids = ""
        }
        if (this.$route.query.reg_time) {
            this.reg_time = this.$route.query.reg_time
        } else {
            this.reg_time = ""
        }
        if (this.$route.query.reg_time1) {
            this.reg_time1 = this.$route.query.reg_time1
        } else {
            this.reg_time1 = ""
        }

        this.queryInfo()
        this.queryInfo1()
        this.getQueryInfo2Active()

    },
    methods: {

        //排序
        tableSortChange(column) {
            if (column.order == "descending") {
                this.order = 0
            } else {
                this.order = 1
            }
            this.getQueryInfo1()

        },
        //分页
        handleCurrentChange(val) {
            this.pager.page = val.val
            this.getQueryInfo1()
        },
        //分页
        handleCurrentChange1(val) {
            this.pager1.page = val.val
            this.getQueryInfo()
        },
        //分页
        handleCurrentChange2(val) {
            this.pager1.page = val.val
            this.getQueryInfo2()
        },

        queryInfo() {

            //let routerParam=localStorage.getItem('routerparam')
            let params = new Object()
            params.user_id = this.user_ids
            ptfs_query_list_user_store_list(params).then(res => {
                if (res.status == 0) {
                    if (res.data.store_list.length > 0) {
                       // this.dev_num = res.data.store_list[0].dev_num
                        this.average_store = (res.data.store_list[0].average_store) / 1000000
                        this.user_id = res.data.store_list[0].user_id
                        this.user_name = res.data.store_list[0].user_name
                        this.user_tel = res.data.store_list[0].user_tel
                        this.sum_profit = (res.data.store_list[0].sum_profit) / 1000000

                    } else {
                      //  this.dev_num = 0
                        this.sum_profit = 0
                        this.average_store = 0
                    }

                } else {
                    // this.$message({
                    //     message: `${res.err_msg}`,
                    //     type: "error"
                    // })
                }

            }).catch(error => {

            })
        },
        queryInfo1() {

            let param = new Object()
            param.query_type = 1
            if (this.$route.query.user_id) {
                param.user_id = parseInt(this.$route.query.user_id)
            } else {
                param.user_id = ""
            }
            param.user_name = "",
                param.tel_num = "",
                param.cur_page = this.pager.page - 1,
                ptfs_query_user_store_list(param).then(res => {
                    console.log(res)
                    if (res.data.store_list) {
                        this.sum_profit1 = (res.data.store_list[0].sum_profit) / 1000000

                    } else {}

                }).catch(error => {

                })

        },
        getQueryInfo() {

            let param = new Object()
            param.query_type = 1
            if (this.$route.query.user_id) {
                param.user_id = parseInt(this.$route.query.user_id)
            } else {
                param.user_id = ""
            }
            param.profit_type = 0,
                param.cur_page = this.pager1.page - 1,
                param.nick_name = "",
                param.order = this.order
            param.start_time = ((new Date(new Date().toLocaleDateString()).getTime()) - 7 * 24 * 60 * 60 * 1000) / 1000,
                param.end_time = (new Date(new Date().toLocaleDateString()).getTime()) / 1000;

            ptfs_query_user_total_profit_everyday(param).then(res => {
                console.log(res)
                this.dialogVisible2 = true
                if (res.data.total_profit_list) {
                    this.tableData1 = []
                    let nowarr = res.data.total_profit_list
                    for (var i = 0; i < nowarr.length; i++) {
                        nowarr[i].cur_profit = nowarr[i].cur_profit / 1000000
                        nowarr[i].total_profit = nowarr[i].total_profit / 1000000
                        if (nowarr[i].profit_type == 1) {
                            nowarr[i].profit_type = "收益"
                        } else {
                            nowarr[i].profit_type = "兑换"
                        }
                        nowarr[i].time_stamp = this.common.getTimes(nowarr[i].time_stamp * 1000)
                    }
                    this.tableData1 = nowarr
                    this.pager1.count = res.data.total_num
                }

            }).catch(error => {

            })

        },
        // getQueryInfo1() {

        //     let param = new Object()
        //     param.query_type = 1
        //     if (this.$route.query.user_id) {
        //         param.user_id = parseInt(this.$route.query.user_id)
        //     } else {
        //         param.user_id = ""
        //     }
        //     param.order = this.order
        //     param.dev_sn = "",
        //         param.cur_page = this.pager.page - 1,
        //         // param.start_time = 0,
        //         // param.end_time = (new Date(new Date().toLocaleDateString()).getTime()) / 1000
        //         param.start_time = ((new Date(new Date().toLocaleDateString()).getTime()) - 7 * 24 * 60 * 60 * 1000) / 1000,
        //         param.end_time = (new Date(new Date().toLocaleDateString()).getTime()) / 1000;
        //     ptfs_query_node_info_list(param).then(res => {
        //         this.dialogVisible3 = true
        //         if (res.data.profit_detail_list) {
        //             this.tableData = []
        //             let nowarr = res.data.profit_detail_list
        //             for (var i = 0; i < nowarr.length; i++) {
        //                 nowarr[i].profit = nowarr[i].profit / 1000000
        //                 nowarr[i].store = nowarr[i].store / 1000000
        //                 nowarr[i].store_value = nowarr[i].store_value / 1000000
        //                 nowarr[i].ip_value = nowarr[i].ip_value / 1000000
        //                 nowarr[i].time_stamp = this.common.getTimes(nowarr[i].time_stamp * 1000)

        //             }
        //             this.tableData = nowarr
        //             this.pager.count = res.data.total_num
        //         }

        //     }).catch(error => {

        //     })

        // },
        getQueryInfo1() {








            let param = new Object()
            param.query_type = 0
            if (this.$route.query.user_id) {
                param.user_id = parseInt(this.$route.query.user_id)
            } else {
                param.user_id = ""
            }
            param.order = this.order
            param.dev_sn = "",
            param.nick_name=""
            param.order=0
                param.cur_page = this.pager.page - 1,
                param.start_time = ((new Date(new Date().toLocaleDateString()).getTime()) - 7 * 24 * 60 * 60 * 1000) / 1000,
                param.end_time = (new Date(new Date().toLocaleDateString()).getTime()) / 1000;
            ptfs_query_user_profit_list(param).then(res => {
                this.dialogVisible3 = true
                if (res.data.profit_detail_list) {
                    this.tableData = []
                    let nowarr = res.data.profit_detail_list
                    for (var i = 0; i < nowarr.length; i++) {
                        nowarr[i].profit = nowarr[i].profit / 1000000
                        nowarr[i].store = nowarr[i].store / 1000000
                        nowarr[i].store_value = nowarr[i].store_value / 1000000
                        nowarr[i].ip_value = nowarr[i].ip_value / 1000000
                        nowarr[i].com_power = nowarr[i].com_power / 1000000
                        
                        nowarr[i].time_stamp = this.common.getTimes(nowarr[i].time_stamp * 1000)
                        if( nowarr[i].up_bandwidth==0 ){
                           nowarr[i].up_bandwidth==0 
                        }
                        else{
                            nowarr[i].up_bandwidth=((nowarr[i].up_bandwidth/1024/1024).toFixed(2))+"Mbps"
                        }
                           if( nowarr[i].down_bandwidth==0 ){
                           nowarr[i].down_bandwidth==0 
                        }
                        else{
                            nowarr[i].down_bandwidth=((nowarr[i].down_bandwidth/1024/1024).toFixed(2))+"Mbps"
                        }
                         if( nowarr[i].total_cap==0 ){
                           nowarr[i].total_cap==0 
                        }
                        else{
                            nowarr[i].total_cap=this.common.formatByteActive(nowarr[i].total_cap)
                            

                        }
                        
                        

                    }
                    this.tableData = nowarr
                    this.pager.count = res.data.total_num
                }

            }).catch(error => {

            })

        },
        
        getQueryInfo2() {
            let data = {
                page_no: this.pager.page - 1,
                page_size: 10,
                dev_type: this.dev_type === '' ? -1 : this.dev_type === 'RK3328' ? 1 : 2,
                online_state: this.online_state === '' ? -1 : Number(this.online_state),
                rom_version: this.rom_version === '' ? '' : this.rom_version,
                bind_flag: this.bind_flag === '' ? -1 : Number(this.bind_flag),
                bind_start_ts: this.bind_start_ts === "" ?
                    -1 : new Date(this.bind_start_ts).getTime(),
                bind_end_ts: this.bind_end_ts === "" ?
                    -1 : new Date(this.bind_end_ts).getTime(),
                bind_user_id: parseInt(this.$route.query.user_id),
                dev_name: "",
                dev_mac: "",
                dev_ip: "",
                ipfs_id: "",
                dev_sn: "",
                order: this.order

            }

            let param = data
            devicelist(param).then(res => {
                    this.dialogVisible4 = true
                    console.log(res)
                    if (res.status === 0) {
                       let nowarr=[] 
                         nowarr = res.data.dev_list
                         if(nowarr.length>0){
                              for (var i = 0; i < nowarr.length; i++) {
                            if (nowarr[i].dev_name == "") {
                                nowarr[i].dev_name = "我的西柚机"
                            }
                            switch (nowarr[i].online_state) {
                                case 0:
                                    nowarr[i].online_state = "离线"
                                    break;
                                case 1:
                                    nowarr[i].online_state = "在线"

                                    break;
                                case 2:
                                    nowarr[i].online_state = "鉴权失败"
                                    break;
                                case 3:
                                    nowarr[i].online_state = "鉴权成功"
                                    break;
                                case 100:
                                    nowarr[i].online_state = "未激活"
                                    break;
                                case 101:
                                    nowarr[i].online_state = "已激活"
                                    break;
                                default:
                                    break;
                            }
                        }
                         }
                         else{

                         }
                      
                        this.tableData2 = nowarr;
                        this.pager2.count = res.data.total_num
                        this.dev_num=res.data.total_num

                    }
                })
                .catch(error => {
                    console.log(error);
                });

        },
        getQueryInfo2Active() {
            let data = {
                page_no: this.pager.page - 1,
                page_size: 10,
                dev_type: this.dev_type === '' ? -1 : this.dev_type === 'RK3328' ? 1 : 2,
                online_state: this.online_state === '' ? -1 : Number(this.online_state),
                rom_version: this.rom_version === '' ? '' : this.rom_version,
                bind_flag: this.bind_flag === '' ? -1 : Number(this.bind_flag),
                bind_start_ts: this.bind_start_ts === "" ?
                    -1 : new Date(this.bind_start_ts).getTime(),
                bind_end_ts: this.bind_end_ts === "" ?
                    -1 : new Date(this.bind_end_ts).getTime(),
                bind_user_id: parseInt(this.$route.query.user_id),
                dev_name: "",
                dev_mac: "",
                dev_ip: "",
                ipfs_id: "",
                dev_sn: "",
                order: this.order

            }

            let param = data
            devicelist(param).then(res => {
                    console.log(res)
                    if (res.status === 0) {
                       let nowarr=[] 
                         nowarr = res.data.dev_list
                         if(nowarr.length>0){
                              for (var i = 0; i < nowarr.length; i++) {
                            if (nowarr[i].dev_name == "") {
                                nowarr[i].dev_name = "我的西柚机"
                            }
                            switch (nowarr[i].online_state) {
                                case 0:
                                    nowarr[i].online_state = "离线"
                                    break;
                                case 1:
                                    nowarr[i].online_state = "在线"

                                    break;
                                case 2:
                                    nowarr[i].online_state = "鉴权失败"
                                    break;
                                case 3:
                                    nowarr[i].online_state = "鉴权成功"
                                    break;
                                case 100:
                                    nowarr[i].online_state = "未激活"
                                    break;
                                case 101:
                                    nowarr[i].online_state = "已激活"
                                    break;
                                default:
                                    break;
                            }
                        }
                         }
                         else{

                         }
                      
                        this.tableData2 = res.data.nowarr;
                        this.pager2.count = res.data.total_num
                        this.dev_num=res.data.total_num

                    }
                })
                .catch(error => {
                    console.log(error);
                });

        },
        searchInfo() {

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
        height: 90px;

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
