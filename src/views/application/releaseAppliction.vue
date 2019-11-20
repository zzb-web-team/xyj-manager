<template>
<section class="myself-container">

    <div class="devide_table">
        <el-row type="flex" class="row_active">
            <el-col :span="6">
                <el-button type="primary" @click="addAccout">新增应用</el-button>
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
    <el-dialog :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
        <div class="addaccout addaccoutActive">
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" class="demo-ruleForm ">
                <h3 class="title">新增发布</h3>
                <el-form-item label="选定应用：" style="display: flex;">
                    <el-select v-model="value2" placeholder="请选择" @change="onChange2" style="width:200px;">
                        <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="nickname" class="appliction">
                    <el-form-item label="发布设备:">
                        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                            <el-tab-pane label="全网设备" name="first">
                                <textarea v-model="devSn" placeholder="请输入SN号，多个逗号分隔"></textarea>
                            </el-tab-pane>
                            <el-tab-pane label="指定设备" name="second">
                                                                <el-input v-model="devSn" placeholder="请输入SN号，多个逗号分隔"></el-input>

                            </el-tab-pane>
                            <el-tab-pane label="批量导入" name="third">
                                <el-button type="primary">导入</el-button>
                            </el-tab-pane>
                        </el-tabs>
                    </el-form-item>
                </el-form-item>
                <el-form-item style="width:100%;display: flex;justify-content:center;">
                    <el-button type="primary" @click.native.prevent="handleSubmit2" :loading="logining">发布</el-button>
                    <el-button type="primary" @click.native.prevent="handleSubmit3">取消</el-button>
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
            operatingStatus: true,
            clomnSelection: false,
            reserveselection: true,
            value1: "",
            value2: "",
            valueTime: "",
            activeName: 'first',
            devSn:"",
            options2: [{
                    value: '0',
                    label: '全部'
                },
                {
                    value: '1',
                    label: ' 应用1'
                },
                {
                    value: '2',
                    label: '应用2'
                },

            ],
            ruleForm2: {
                username: '',
                nickname: '',
                password: "",
                password2: "",
                value: "",
                radio: "1",

            },
            rules2: {

                username: [{
                    required: true,
                    message: '请输入用户名',
                    trigger: 'blur'
                }, ],
                nickname: [{
                    required:false,
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
                    label: "应用名称"
                },
                {
                    prop: "user_name",
                    label: "应用ID",
                },
                {
                    prop: "user_tel",
                    label: "应用版本"
                },
                {
                    prop: "sex",
                    label: "应用大小"
                },
                {
                    prop: "status",
                    label: "包名"
                },
                {
                    prop: "status",
                    label: "文件名"
                },
                {
                    prop: "status",
                    label: "描述"
                },
                {
                    prop: "status",
                    label: "上传日期"
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
                        label: "删除",
                        type: "primary",
                        methods: "freeze"
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
            console.log(val)
            console.log(rows)
        },
        addAccout() {
            this.dialogVisible = true

        },
        handleSubmit3(ev) {
            this.dialogVisible = false
        },
        handleSubmit2(ev) {
            //return false
            var _this = this;
            this.$refs.ruleForm2.validate((valid) => {
                if (valid) {
                    this.logining = false
                    var loginParams = {
                        username: this.ruleForm2.username,
                        nickname: this.ruleForm2.nickname,
                        password: this.ruleForm2.password,
                        password2: this.ruleForm2.password2,
                        role_id: this.ruleForm2.value,
                    };
                    this.dialogVisible=false
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
    &.addaccoutActive{
         textarea{
            width: 285px;
            height: 80px;
            border: 1px solid #DCDFE6;
            resize: none;
            border-radius: 5px;
        }
        .appliction{
   .el-form--label-left .el-form-item__label {
        text-align: right;
        width: 100%;
    }
        }
 
    }

  

    .el-form-item__error {
        margin-left: 80px;
    }
}
</style>
