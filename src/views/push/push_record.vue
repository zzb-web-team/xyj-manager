<template>
<section class="myself-container">
  <el-tabs type="border-card">
    <el-tab-pane label="通知记录">
      <div class="device_form">
        <el-form ref="form" :model="form" :inline="true" :label-position="labelPosition">
          <el-row type="flex">
            <mySearch :searchText="searchText" @searchInfo="searchInfo"></mySearch>
            <div @click="getShow()" class="div_show" style="color:#606266">筛选</div>
          </el-row>
          <el-row type="flex" class="row_activess">
              <el-form-item label="状态">
                <el-select v-model="value" placeholder="请选择" @change="onChange2">
                  <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="发送时间">
                <el-date-picker
                  v-model="time"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </el-form-item>
          </el-row>
          <el-form-item class="bottom">
            <el-button type="primary">确定</el-button>
              <el-button type="primary">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="devide_table">
          <el-row type="flex" class="row_active">
              <el-col :span="24">
                  <tableBarActive2 
                    id="rebateSetTable" 
                    ref="table1" 
                    tooltip-effect="dark" 
                    :tableData="tableData" 
                    
                    :rowHeader="rowHeader" 
                    :tableOption="tableOption" 
                    @handleButton="handleButton" 
                    :operatingStatus="operatingStatus" 
                    @toOperating="toOperating" 
                    
                    ></tableBarActive2>
              </el-col>
          </el-row>
      </div>
      <div class="devide_pageNation" style="display: flex;justify-content: space-between;">
        <el-row type="flex" >
            <el-col :span="6">
                <pageNation :pager="pager" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"></pageNation>
            </el-col>
        </el-row>
      </div>
    </el-tab-pane>
    <el-tab-pane label="公告记录">
      <div class="device_form">
        <el-form ref="form" :model="form" :inline="true" :label-position="labelPosition">
          <el-row type="flex">
            <mySearch :searchText="searchText" @searchInfo="searchInfo"></mySearch>
            <div @click="getShow()" class="div_show" style="color:#606266">筛选</div>
          </el-row>
          <el-row type="flex" class="row_activess">
              <el-form-item label="状态">
                <el-select v-model="value" placeholder="请选择" @change="onChange2">
                  <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="发送时间">
                <el-date-picker
                  v-model="time"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </el-form-item>
          </el-row>
          <el-form-item class="bottom">
            <el-button type="primary">确定</el-button>
              <el-button type="primary">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="devide_table">
          <el-row type="flex" class="row_active">
              <el-col :span="24">
                  <tableBarActive2 
                    id="rebateSetTable" 
                    ref="table1" 
                    tooltip-effect="dark" 
                    :tableData="tableData" 
                    
                    :rowHeader="rowHeader" 
                    :tableOption="tableOption" 
                    @handleButton="handleButton1" 
                    :operatingStatus="operatingStatus" 
                    @toOperating="toOperating" 
                    
                    ></tableBarActive2>
              </el-col>
          </el-row>
      </div>
      <div class="devide_pageNation" style="display: flex;justify-content: space-between;">
        <el-row type="flex" >
            <el-col :span="6">
                <pageNation :pager="pager" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"></pageNation>
            </el-col>
        </el-row>
      </div>
    </el-tab-pane>
  </el-tabs>
  <el-dialog :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
    <p>通知详情</p>
    <p>
        <span>标题</span>
        <span>重大通知</span>
    </p>
    <p>
        <span>内容</span>
        <span>通知通知，重大通知</span>
    </p>
    <p>
        <span>发送设备</span>
        <span>所有设备</span>
    </p>
    <p>
        <span>发送对象</span>
        <span>指定账号(16623122475，12323122475)</span>
    </p>
    <p>到达详情</p>
    <p>
        <span>发送数</span>
        <span>6146条</span>
    </p>
    <p>
        <span>到达数</span>
        <span>5039条</span>
    </p>
    <p>
        <span>打开数</span>
        <span>907条</span>
    </p>
    <p>
        <span>删除数</span>
        <span>705条</span>
    </p>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
  <el-dialog :visible.sync="dialogVisible2" width="40%" :before-close="handleClose">
    <p>关于平台调整的公告</p>
    <p>2019-05-23 14:15:45</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget odio.
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget odio.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget odio.</p>
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
            labelPosition: 'left',
            dialogVisible: false,
            dialogVisible2: false,
            searchText: "账户名，ID",
            operatingStatus: true,
            clomnSelection: true,
            reserveselection: true,
            value1: "",
            value2: "",
            time: '',
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
            rowHeader: [
                {
                    prop: "user_id",
                    label: "状态"
                },
                {
                    prop: "user_name",
                    label: "发送对象"
                },
                {
                    prop: "user_tel",
                    label: "标题"
                },
                {
                    prop: "sex",
                    label: "内容"
                },
                {
                    prop: "status",
                    label: "发送时间"
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
                        label: "撤回",
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
        freeze() {
            this.dialogVisible = true;
        },
        searchInfo() {
            alert("搜做")
        },
        getShow() {
            this.showState = !this.showState
        },
        handleButton(val, rows) {
            if(val=="freeze"){
                this.dialogVisible=true
            }
            console.log(val)
            console.log(rows)
        },
        handleButton1(val, rows) {
            if(val=="freeze"){
                this.dialogVisible2=true
            }
            console.log(val)
            console.log(rows)
        },
        addAccout(){
            this.dialogVisible=true

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
    .device_form {
        width: 100%;
        height: auto;
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
.addaccout{
    .el-form--label-left .el-form-item__label {
    text-align: right;
    width: 90px;
}
.el-form-item__error{
    margin-left: 80px;
}
}
</style>
