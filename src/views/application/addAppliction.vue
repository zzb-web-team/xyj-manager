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
    <el-dialog :visible.sync="dialogFormState" class="my_dialogForm" :show-close="false" :close-on-click-modal="false">
        <div class="dialog_div" v-loading="loading2" element-loading-text="上传中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
            <div class="dialog_div_con">
                <div class="dialog_div_title" style="margin-bottom:10px;">新增应用</div>
                <div class="dialog_div_upload">
                    <el-upload id="1" class="upload-demo" ref="upload1" :limit="1" drag name="configFile" :before-upload="beforeAvatarUpload" action="" :file-list="fileList" :http-request="uploadSectionFile1" :auto-upload="false">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">
                            <div>只能上传.APK文件.</div>
                            <el-button type="primary" class="el-upload__tip" @click="submitUpload1" style="margin-left:30px;">上传</el-button>
                        </div>
                    </el-upload>
                    <div class="dialog_div_uploadinfo" v-if="uploadinfoState1">
                        <div><span>版本号：</span>{{this.uploadinfo1.version}}</div>
                        <div><span>包名：</span>{{this.uploadinfo1.name}}</div>
                        <div><span>类型：</span>{{this.uploadinfo1.type}}</div>
                        <div><span>大小：</span>{{this.uploadinfo1.size}}M</div>
                        <div><span>md5：</span>{{this.uploadinfo1.md5}}</div>
                        <div><span>hashid:</span>{{this.uploadinfo1.hashid}}</div>
                    </div>
                </div>
            </div>
            <div class="dialog_item" style="margin-top:15px;">
                <div class="dialog_item_l">应用名称：</div>
                <div class="dialog_item_r">
                    <el-input v-model="newFrom.app_version" placeholder="请输入内容" :disabled="true"></el-input>
                </div>
            </div>
            <div class="dialog_item">
                <div class="dialog_item_l">应用版本：</div>
                <div class="dialog_item_r">
                    <el-input v-model="newFrom.app_name" placeholder="请输入内容" :disabled="true"></el-input>
                </div>
            </div>
            <div class="dialog_item dialog_div_desc">
                <div class="dialog_item_l">添加描述：</div>
                <div class="dialog_item_r">
                    <textarea placeholder="请输入文字描述" v-model="newFrom.app_info"></textarea>
                </div>
            </div>
            <div slot="footer" class="dialog-footer" style="">
                <el-button @click="dialogFormState = false">取 消</el-button>
                <el-button type="primary" @click="submitUpload()">确 定</el-button>
            </div>
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
            dialogFormState: false,
            searchText: "设备SN、用户ID",
            operatingStatus: true,
            clomnSelection: false,
            reserveselection: true,
            value1: "",
            value2: "",
            valueTime: "",
            activeName: 'first',
            devSn: "",
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
            newFrom: {
                app_version: "",
                app_name: "",
                app_info: "",
                app_download_url: "",
                size: "",
                app_info: ""

            },
            rules2: {

                username: [{
                    required: true,
                    message: '请输入用户名',
                    trigger: 'blur'
                }, ],
                nickname: [{
                    required: false,
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
                        label: "发布清单",
                        type: "primary",
                        methods: "freeze"
                    },
                    {
                        label: "更新",
                        type: "primary",
                        methods: "freeze"
                    },
                    {
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
        addAccout() {
            this.dialogFormState = true
        },
        submitUpload() {
            this.dialogFormState = false
        },
        searchInfo() {
            alert("搜索")
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
                    this.dialogVisible = false
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

    &.addaccoutActive {
        textarea {
            width: 285px;
            height: 80px;
            border: 1px solid #DCDFE6;
            resize: none;
            border-radius: 5px;
        }

        .appliction {
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

.my_dialogForm {
    .dialog_item {
        width: 90%;
        height: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 auto;
        margin-bottom: 10px;

        .dialog_item_l {
            width: 90px;
            height: 35px;
            line-height: 35px;
            text-align: left;
            float: left;
        }

        .dialog_item_r {
            width: 350px;

        }
    }
}

.my_dialogForm .el-dialog {
    width: 25%;

    .el-upload-dragger {
        width: 415px;
    }

    .dialog-footer {
        text-align: center;
    }

    textarea {
        width: 310px;
        height: 60px;
        resize: none;
        outline: none;
        border: 1px solid #DCDFE6;
        border-radius: 5px;
    }

    .el-upload__tip {
        justify-content: flex-start;
        display: flex;
        align-items: center;
    }
}
</style>
