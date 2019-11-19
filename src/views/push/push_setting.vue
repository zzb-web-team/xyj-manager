<template>
  <div>
  <section class="myself-container">
    <el-tabs type="border-card">
      <el-tab-pane label="通知">
        <div class="device_form">
          <el-form ref="form" :model="form" label-width="80px">
            <div class="title">基本设置</div>
            <el-form-item class="label" label="消息标题：">
              <div class="space"></div>
              <el-input
                class="inputStyle"
                type="text"
                placeholder="请输入消息标题"
                v-model="title"
                maxlength="20"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item class="label" label="消息内容：">
              <div class="space"></div>
              <el-input
                class="inputStyle"
                type="textarea"
                placeholder="请输入消息内容"
                v-model="content"
                maxlength="500"
                show-word-limit
              ></el-input>
            </el-form-item>
            <div class="title">高级设置</div>
            <el-form-item label="发送对象">
              <el-radio-group v-model="form.object" @change="changeAssign">
                <el-radio label="所有人"></el-radio>
                <el-radio label="指定终端"></el-radio>
                <el-radio label="指定账号"></el-radio>
              </el-radio-group>
              <div class="inputWrap" v-show="assign==='指定终端'">
                <el-input type="text" placeholder="请输入DeviceID，多个终端用逗号分隔" v-model="form.deviceId"></el-input>
              </div>
              <div class="inputWrap" v-show="assign==='指定账号'">
                <el-input
                  v-show="assign==='指定账号'"
                  type="text"
                  placeholder="请输入账号，多个账号用逗号分隔"
                  v-model="form.account"
                ></el-input>
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
                ></el-input>
                <span>小时，该时段之后再上线的用户将收不到推送</span>
              </div>
            </el-form-item>
            <el-form-item class="bottom">
              <el-button type="primary" @click="onSubmit">立即创建</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="公告">
        <div class="crop-demo">
          <img :src="cropImg" class="pre-img" />
          <div class="crop-demo-btn">
            上传封面图
            <input
              class="crop-input"
              type="file"
              name="image"
              accept="image/*"
              @change="setImage"
            />
          </div>
        </div>

        <el-dialog title="裁剪图片" :visible.sync="dialogVisible" width="500px">
          <vue-cropper
            ref="cropper"
            :src="imgSrc"
            :ready="cropImage"
            :zoom="cropImage"
            :cropmove="cropImage"
            style="width:100%;height:300px;"
          ></vue-cropper>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancelCrop">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
        <div id="editor">
          <mavon-editor style="height: 100%"></mavon-editor>
        </div>
      </el-tab-pane>
    </el-tabs>
  </section>
  </div>
</template>

<script>
import tableBarActive2 from "../../components/tableBarActive2";
import VueCropper from "vue-cropperjs";
import 'cropperjs/dist/cropper.css';
import mySearch from "../../components/mySearch";
import pageNation from "../../components/pageNation";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  data() {
    return {
      form: {
        title: "",
        content: "",
        object: "",
        time: "",
        detailTime: "",
        save: "",
        saveTime: "",
        deviceId: "",
        account: ""
      },
      assign: "",
      timing: "",
      offlineSave: "",
      imgSrc: "",
      cropImg: "",
      dialogVisible: false,
      defaultSrc: require("../../assets/logo.png")
    };
  },
  created() {
    this.cropImg = this.defaultSrc;
  },
  mounted: function() {},
  methods: {
    changeAssign(value) {
      this.assign = value;
    },
    changeTiming(value) {
      this.timing = value;
    },
    changeOfflineSave(value) {
      this.offlineSave = value;
    },
    setImage(e) {
      const file = e.target.files[0];
      if (!file.type.includes("image/")) {
        return;
      }
      const reader = new FileReader();
      reader.onload = event => {
        this.dialogVisible = true;
        this.imgSrc = event.target.result;
        this.$refs.cropper && this.$refs.cropper.replace(event.target.result);
      };
      reader.readAsDataURL(file);
    },
    cropImage() {
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
    },
    cancelCrop() {
      this.dialogVisible = false;
      this.cropImg = this.defaultSrc;
    },
    imageuploaded(res) {
      console.log(res);
    },
    handleError() {
      this.$notify.error({
        title: "上传失败",
        message: "图片上传接口上传失败，可更改为自己的服务器接口"
      });
    }
  },
  components: {
    pageNation,
    tableBarActive2,
    mySearch,
    mavonEditor,
    VueCropper
  }
};
</script>

<style lang="less">
.myself-container {
  .device_form {
    width: 100%;
    height: auto;
    margin-top: 20px;
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
      .inputWrap {
        height: 60px;
        line-height: 60px;
        background: #f2f2f2;
        margin: 10px;
        padding-left: 10px;
        .saveTime {
          width: 50px;
        }
      }
    }
    .bottom {
      margin-top: 30px;
      margin-bottom: 40px;
    }
  }
  #editor {
    // margin: auto;
    // width: 80%;
    height: 580px;
  }
  .pre-img{   
    width: 100px;
    height: 100px;
    background: #f8f8f8;
    border: 1px solid #eee;
    border-radius: 5px;
  }
  .crop-demo {
    display: flex;
    align-items: flex-end;
  }
  .crop-demo-btn {
    position: relative;
    width: 100px;
    height: 40px;
    line-height: 40px;
    padding: 0 15px;
    margin-left: 30px;
    background-color: #409eff;
    color: #fff;
    font-size: 14px;
    border-radius: 4px;
    box-sizing: border-box;
  }
  .crop-input {
    position: absolute;
    width: 100px;
    height: 40px;
    left: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
  }
}
</style>
