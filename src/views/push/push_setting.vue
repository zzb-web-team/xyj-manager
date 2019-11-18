<template>
  <section class="myself-container">  
    <div class="device_form">
      <el-tabs type="border-card">
        <el-tab-pane label="通知">
          <el-form ref="form" :model="form" label-width="80px">
            <div class="title">基本设置</div>
            <el-form-item class= "label" label="消息标题：">
              <div class="space"></div>
              <el-input
                class="inputStyle"
                type="text"
                placeholder="请输入消息标题"
                v-model="title"
                maxlength="20"
                show-word-limit
              >
              </el-input>
            </el-form-item>
            <el-form-item class= "label" label="消息内容：">
              <div class="space"></div>
              <el-input
                class="inputStyle"
                type="textarea"
                placeholder="请输入消息内容"
                v-model="content"
                maxlength="500"
                show-word-limit
              >
              </el-input>
            </el-form-item>
            <div class="title">高级设置</div>
            <el-form-item label="发送对象">
              <el-radio-group v-model="form.object" @change="changeAssign">
                <el-radio label="所有人"></el-radio>
                <el-radio label="指定终端"></el-radio>
                <el-radio label="指定账号"></el-radio>
              </el-radio-group>
              <div class="inputWrap" v-show="assign==='指定终端'">
                <el-input
                  type="text"
                  placeholder="请输入DeviceID，多个终端用逗号分隔"
                  v-model="form.deviceId"
                >
                </el-input>
              </div>
              <div class="inputWrap" v-show="assign==='指定账号'">
                <el-input
                  v-show="assign==='指定账号'"
                  type="text"
                  placeholder="请输入账号，多个账号用逗号分隔"
                  v-model="form.account"
                >
                </el-input>
              </div>
            </el-form-item>
            <el-form-item label="发送时间">
              <el-radio-group v-model="form.time" @change="changeTiming">
                <el-radio label="立即发送"></el-radio>
                <el-radio label="定时发送"></el-radio>
              </el-radio-group>
              <div class="inputWrap" v-show=" timing === '定时发送' ">
                <el-date-picker
                  v-model="form.detailTime"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </div>
              
            </el-form-item>
            <el-form-item label="离线保存">
              <el-radio-group v-model="form.save" @change="changeOfflineSave">
                <el-radio label="不保存"></el-radio>
                <el-radio label="保存"></el-radio>
              </el-radio-group>
              <div class="inputWrap" v-show=" offlineSave === '保存' ">
                <span>保存</span>
                <el-input
                  class="saveTime"
                  type="number"
                  v-model="form.saveTime"
                  @mousewheel.native.prevent
                >
                </el-input>
                <span>小时，该时段之后再上线的用户将收不到推送</span>
              </div>
            </el-form-item>
            <el-form-item class="bottom">
              <el-button type="primary" @click="onSubmit">立即创建</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="公告">
          <div id="editor">
            <mavon-editor style="height: 100%"></mavon-editor>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </section>
</template>

<script>
import tableBarActive2 from "../../components/tableBarActive2";
import mySearch from "../../components/mySearch";
import pageNation from "../../components/pageNation";
import { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css'
export default {
    data() {
        return {
            form: {
              title: '',
              content: '',
              object: '',
              time: '',
              detailTime: '',
              save: '',
              saveTime: '',
              deviceId: '',
              account: ''
            },
            assign: '',
            timing: '',
            offlineSave: ''
        };
    },
    mounted: function () {

    },
    methods: {
      changeAssign(value){
          this.assign = value
      },
      changeTiming(value){
          this.timing = value
      },
      changeOfflineSave(value){
          this.offlineSave = value
      },
    },
    components: {
        pageNation,
        tableBarActive2,
        mySearch,
        mavonEditor
    }
};
</script>

<style lang="less">
.myself-container {
  .device_form {
    margin-top: 20px;
    background: #f2f2f2;
    padding: 15px 30px;

    .title {
      height: 40px;
      line-height: 40px;
      background: #f2f2f2;
      margin: 10px;
      padding-left: 10px;
    }
    .space {
      width: 100%;
      height: 40px;
    }
    .inputStyle {
      margin-left: -80px;
    }
    .el-form-item {
      margin-bottom: 0px;
      margin-left: 10px;
      .inputWrap{
        height: 60px;
        line-height: 60px;
        background: #f2f2f2;
        margin: 10px;
        padding-left: 10px;
        .saveTime {
          width:50px;
        }
      }
    }
    .bottom {
      margin-top: 30px;
      margin-bottom: 40px;
    }
    #editor {
      // margin: auto;
      // width: 80%;
      height: 580px;
    }
  }
}
</style>
