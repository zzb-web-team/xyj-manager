<template>
  <div class="addmarket">
    <div class="goback" style="width: 100%;line-height: 50px;">
      <div style="margin-top:20px;">

        <el-button type="primary" class="el-upload__tip" @click="$router.go(-1)">返回</el-button>
      </div>

    </div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <h3>一、上传软件应包</h3>
      <el-form-item label="上传APK:" prop="name">
        <div class="item" style=" align-items: flex-start; display: flex;justify-content: center;">
          <div class="item-r" style="position: relative;">
            <!-- <el-button class="choose-file" size="mini">请选择要上传的文件</el-button> -->
            <input id="f" class="choose-input" type="file" name="file">
            <!-- <el-button type="primary" class="onchoose-file" @click="upFile()" :disabled="disableStatus">确定</el-button> -->
            <el-button type="primary" class="onchoose-file" @click="upFile()">确定</el-button>
            进度条
            <span id="per">{{perNum}}</span>%
            <div style="width: 350px;height: 16px;background-color: #999;margin-top:10px;">
              <div style="height: 16px;background-color: #67c23a" id="loading" v-bind:style="{'width': widthData+'%'}"></div>
            </div>
            <div id="result" style="margin-top:10px;"></div>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="应用包名:" prop="pkg_name">
        <div style="display: flex; justify-content: flex-start;">
          <el-input v-model="ruleForm.pkg_name" placeholder :disabled="true" style="width:300px;"></el-input>
          <div style="color:red;white-space:nowrap;margin-left:10px;">*</div>
        </div>
      </el-form-item>
      <el-form-item label="版本号:" prop="app_version">
        <div style="display: flex; justify-content: flex-start;">
          <el-input v-model="ruleForm.app_version" placeholder :disabled="true" style="width:300px;"></el-input>
          <div style="color:red;white-space:nowrap;margin-left:10px;">*</div>
        </div>
      </el-form-item>
      <el-form-item label="应用大小:" prop="app_size">
        <div style="display: flex; justify-content: flex-start;">
          <el-input v-model="ruleForm.app_size" placeholder :disabled="true" style="width:300px;"></el-input>
          <div style="color:red;white-space:nowrap;margin-left:10px;">*</div>
        </div>
      </el-form-item>

      <h3>二、选择应用分类</h3>

      <el-form-item label="一级分类:" prop="app_type1">
        <div style="display: flex; justify-content: flex-start;">
          <el-select v-model="ruleForm.app_type1" placeholder="请选择" @change="onChangeOne" style="width:300px;">
            <el-option v-for="item in options" :key="item.type" :label="item.name" :value="item.type"></el-option>
          </el-select>
          <div style="color:red;white-space:nowrap;margin-left:10px;">*</div>
        </div>
      </el-form-item>
      <el-form-item label="二级分类:" prop="app_type2">

        <el-select v-model="ruleForm.app_type2" placeholder="请选择" @change="onChangeTwo" style="width:300px;">
          <el-option v-for="item in options1" :key="item.type" :label="item.sub_name" :value="item.sub_type"></el-option>
        </el-select>
      </el-form-item>
      <h3>三、填写应用基本信息</h3>
      <el-form-item label="应用LOGO:" prop="name">
        <div class="crop-demo">
          <img :src="cropImg" class="pre-img" width="100" height="100" /> 上传尺寸：144像素*144像素（建议）
          <div style="color:red;white-space:nowrap;margin-left:10px;">*</div>

          <div class="crop-demo-btn">
            上传封面图
            <input class="crop-input" type="file" name="image" accept="image/*" @change="setImage" />

          </div>
        </div>
        <el-dialog title="裁剪图片" :visible.sync="dialogVisible" width="500px">
          <vue-cropper ref="cropper" :src="imgSrc" :ready="cropImage" :zoom="cropImage" :cropmove="cropImage" preview=".preview" style="width:100%;height:300px;"></vue-cropper>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancelCrop">取 消</el-button>
            <el-button type="primary" @click="onUpload">确 定</el-button>
          </span>
        </el-dialog>
      </el-form-item>
      <el-form-item label="应用名称:" prop="app_name">
        <div style="display: flex; justify-content: flex-start;">
          <el-input v-model="ruleForm.app_name" placeholder="请输入应用名称" style="width:300px;"></el-input>
          <div style="color:#9999;white-space:nowrap;margin-left:10px;">请输入1-16个字符</div>
        </div>
      </el-form-item>
      <el-form-item label="开发者:" prop="developer">
        <div style="display: flex; justify-content: flex-start;">
          <el-input v-model="ruleForm.developer " placeholder="请输入开发者信息" style="width:300px;"></el-input>
          <div style="color:#9999;white-space:nowrap;margin-left:10px;">字数不得超过50个字符</div>
        </div>
      </el-form-item>
      <el-form-item label="应用简述:" prop="snapshot">
        <div style="display: flex; justify-content: flex-start;">

          <el-input v-model="ruleForm.snapshot" placeholder="一句话描述该商品的广告词" style="width:300px;"></el-input>
          <div style="color:#9999;white-space:nowrap;margin-left:10px;">请输入2-20个字符</div>
        </div>
      </el-form-item>
      <el-form-item label="应用评分:" prop="app_score">
        <div style="display: flex; justify-content: flex-start;">
          <el-select v-model="ruleForm.app_score" placeholder="请选择应用评分" @change="onchangeScore" style="width:300px;">
            <el-option label="0" value="0"></el-option>
            <el-option label="0.5" value="0.5"></el-option>
            <el-option label="1" value="1"></el-option>
            <el-option label="1.5" value="1.5"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="2.5" value="2.5"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="3.5" value="3.5"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="4.5" value="4.5"></el-option>
            <el-option label="5" value="5"></el-option>

          </el-select>
          <div style="color:red;white-space:nowrap;margin-left:10px;">*</div>
        </div>
      </el-form-item>
      <el-form-item label="下载次数:" prop="dl_count">
        <el-input v-model="ruleForm.dl_count" placeholder="请输入下载次数" style="width:300px;"></el-input>
      </el-form-item>

      <el-form-item label="应用介绍:" prop="app_brief">
        <div style="display: flex; justify-content: flex-start;">
          <el-input type="textarea" v-model="ruleForm.app_brief" placeholder="请输入应用介绍" style="width:300px;"></el-input>
          <div style="color:#9999;white-space:nowrap;margin-left:10px;">请输入2-500个字符</div>
        </div>
      </el-form-item>
      <el-form-item label="应用图片:" prop="name">
        <div style="display: flex; justify-content: flex-start; align-items: center;">
          <div>上传图片的最佳尺寸：1920像素*1080像素（待定），其他尺寸会影响页面效果，格式png，jpeg，jpg，gif，大小不超过2M，应用图片最少上传4张，建议4-6张。</div>
          <div style="color:red;white-space:nowrap;margin-left:10px;">*</div>
        </div>
      </el-form-item>
      <el-form-item label="    " prop="name">
        <div class="posrev bg-white applay-uploadimg">
          <div class="weui-uploader__bd  plr-15">

            <div class="weui-uploader__input-box">
              <input id="fileid" class="weui-uploader__input" type="file" accept="image/*" @change="addImg" ref="inputer" multiple>
            </div>
            <div class="weui-uploader__input-box">
              <input id="fileid1" class="weui-uploader__input" type="file" accept="image/*" @change="addImg1" ref="inputer1" multiple>
            </div>
            <div class="weui-uploader__input-box">
              <input id="fileid2" class="weui-uploader__input" type="file" accept="image/*" @change="addImg2" ref="inputer2" multiple>
            </div>
            <div class="weui-uploader__input-box">
              <input id="fileid3" class="weui-uploader__input" type="file" accept="image/*" @change="addImg3" ref="inputer3" multiple>
            </div>
            <div class="weui-uploader__input-box">
              <input id="fileid4" class="weui-uploader__input" type="file" accept="image/*" @change="addImg4" ref="inputer4" multiple>
            </div>
            <div class="weui-uploader__input-box">
              <input id="fileid5" class="weui-uploader__input" type="file" accept="image/*" @change="addImg5" ref="inputer5" multiple>
            </div>
            <div>
              <el-button type="primary" @click="imgupload">确定上传</el-button>
            </div>

          </div>
        </div>
      </el-form-item>
      <el-form-item style="display: flex; justify-content: center; align-items: center;">
        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
        <!-- <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button> -->
        <el-button @click="$router.go(-1)">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import mySearch from "../../components/mySearch";
import pageNation from "../../components/pageNation";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import {
  updateMod,
  saveapp,
  applist,
  uploadapk,
  getappstatistics,
  saveimage,
  add_app,
  saveimagemore,
  hostUrl,
  get_apptype,
} from "../../api/api.js";
import common from "../../common/js/util.js";

export default {
  data() {
    return {
      options1: [],
      options: [],
      optionsAll: [],
      perNum: 0,
      widthData: 0,
      dialogVisible: false,
      cropImg: "",
      fileList: [],
      defaultSrc: require("../../assets/logo.png"),

      app_pics: "",
      ruleForm: {
        app_pic: [],
        app_name: "",
        developer: "",
        snapshot: "",
        app_score: 0,
        dl_count: 0,
        app_brief: "",
        app_type1: 1,
        app_type2: 1,
        pkg_name: "",
        app_version: "",
        app_size: "",
        dl_url: "",
        create_time: 0,
        app_icon: "",
      },
      imgdata: [],
   
    };
  },
  created() {
    this.cropImg = this.defaultSrc;
  },
  mounted: function() {
    this.getpptypeInfo();
  },
  methods: {
    //获取一级分类
    getpptypeInfo() {
      let param = {};
      get_apptype(param)
        .then(res => {
          console.log(res);
          if (res.status == 0) {
            let temparr = [];
            let templist = res.data;
            this.optionsAll = res.data;
            this.options = res.data;
            this.options1 = this.optionsAll[0].sub;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //一级分类
    onChangeOne(item) {
      this.ruleForm.app_type1 = item;
      console.log(item);
      if (item == "1") {
        this.options1 = this.optionsAll[0].sub;
      } else if (item == "2") {
        this.options1 = this.optionsAll[1].sub;
      } else if (item == "3") {
        this.options1 = this.optionsAll[2].sub;
      } else if (item == "4") {
      }
      // this.app_type1 = item;
    },
    //二级分类
    onChangeTwo(item) {
      this.ruleForm.app_type2 = item;
    },
    //字符长度限制
    getStringWidth(val) {
      let len = 0;
      for (let i = 0; i < val.length; i++) {
        let length = val.charCodeAt(i);
        if (length >= 0 && length <= 128) {
          len += 1;
        } else {
          len += 2;
        }
      }
      return len;
    },
    //图片上传
    imgupload() {
      let that = this;

      let param = {};
      param.data = this.imgdata;
      saveimagemore(param).then(function(res) {
        console.log(res);
        if (res.status == 0) {
          let temp = res.msg;
          let tempArr = [];
          for (var i = 0; i < temp.length; i++) {
            tempArr.push(temp[i].data);
            that.ruleForm.app_pic.push(temp[i].data);
          }
          that.$message({
            message: "图片上传成功",
            type: "success",
          });
        } else {
          that.$message({
            message: "图片上传失败",
            type: "error",
          });
        }
      });
    },
    //
    handseccess(response, file, fileList) {
      console.log(fileList);
      // console.log(response)
      // console.log(file)
    },
    getData() {
      this.data = JSON.stringify(this.$refs.cropper.getData(), null, 4);
    },
    onUpload() {
      this.dialogVisible = false;
      let param = {
        data: this.imgBase,
      };
      saveimage(param)
        .then(res => {
          if (res.status == 0) {
            //this.ruleForm.app_pic.push(res.data);
            this.ruleForm.app_icon = res.data;
            console.log(this.ruleForm);
          }
        })
        .catch(error => {
          console.log(error);
        });
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
      console.log(this.$refs.cropper.getCroppedCanvas().toDataURL());
      this.imgBase = this.$refs.cropper.getCroppedCanvas().toDataURL();
    },
    cancelCrop() {
      this.dialogVisible = false;
      this.cropImg = this.defaultSrc;
    },
    imageuploaded(res) {},
    handleError() {
      this.$notify.error({
        title: "上传失败",
        message: "图片上传接口上传失败，可更改为自己的服务器接口",
      });
    },
    uploadSectionFile1(param) {
      var fileObj = param.file;
      // FormData 对象
      var form = new FormData();
      // 文件对象
      form.append("file", fileObj);
      uploadapk(form)
        .then(res => {
          if (res.status == 0) {
            //this.loading2 = false;
          }
          var arr = Object.keys(res);
          if (arr.length > 0) {
            this.ruleForm.app_version = res.version;
            this.ruleForm.pkg_name = res.name;
            this.ruleForm.dl_url = res.url;
            this.ruleForm.app_size = res.size;
          }
          // this.uploadinfo1 = res;
        })
        .catch(error => {
          this.$message({
            message: "网络出错，请重新请求",
            type: "error",
          });
        });
    },
    //c上传前验证
    beforeAvatarUpload(file) {
      var fileName = new Array();
      fileName = file.name.split(".");
      // console.log(fileName)
      // if(fileName[1]!= "apk"){
      //       this.$message({
      //     message: "上传文件只能是.apk格式的压缩包",
      //     type: "warning"
      //   });
      // }
      //   return false;
      const extension = fileName[fileName.length - 1] === "apk";

      if (!extension) {
        this.$message({
          message: "上传文件只能是.apk格式的压缩包",
          type: "warning",
        });
        return false;
      } else {
        this.loading2 = true;
      }
      return extension;
    },
    //获取APK名称等信息
    submitUpload1() {
      let list = document.getElementsByClassName(
        "el-upload-list__item is-ready"
      );
      if (list.length == 0) {
        this.$message({
          type: "warning",
          message: "上传的FULL包不能为空！",
        });
        return false;
      }
      this.$refs.upload1.submit();
    },
    //应用评分
    onchangeScore(val) {
      // this.ruleForm.app_score = parseInt(val);
    },
    onchangeappType1(val) {
      this.ruleForm.app_type1 = parseInt(val);
    },
    onchangeappType2(val) {
      this.ruleForm.app_type2 = parseInt(val);
    },
    submitForm(formName) {
      if (this.ruleForm.pkg_name == "") {
        this.$message({
          message: "请选择上传.APK文件",
          type: "error",
        });
        return false;
      }
      if (this.ruleForm.app_type1 == 0) {
        this.$message({
          message: "请选择一级分类",
          type: "error",
        });
        return false;
      }

      if (this.ruleForm.app_icon == "") {
        this.$message({
          message: "请上传封面图",
          type: "error",
        });
        return false;
      }
      if (
        this.getStringWidth(this.ruleForm.app_name) > 16 ||
        this.getStringWidth(this.ruleForm.app_name) < 1
      ) {
        this.$message({
          message: "应用名称为1~16个字符",
          type: "error",
        });
        return false;
      }

      if (
        this.getStringWidth(this.ruleForm.developer) > 50 ||
        this.getStringWidth(this.ruleForm.developer) < 1
      ) {
        this.$message({
          message: "开发者信息应为1~50个字符",
          type: "error",
        });
        return false;
      }
      if (
        this.getStringWidth(this.ruleForm.snapshot) > 20 ||
        this.getStringWidth(this.ruleForm.snapshot) < 2
      ) {
        this.$message({
          message: "请输入2-20个字符",
          type: "error",
        });
        return false;
      }
      if (
        this.getStringWidth(this.ruleForm.app_brief) > 500 ||
        this.getStringWidth(this.ruleForm.app_brief) < 2
      ) {
        this.$message({
          message: "请输入2-500个字符",
          type: "error",
        });
        return false;
      }
      if (this.ruleForm.app_pic.length < 4) {
        this.$message({
          message: "请至少上传4张图片",
          type: "error",
        });
        return false;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.ruleForm);
          this.ruleForm.app_score = parseFloat(this.ruleForm.app_score) * 10;
          this.ruleForm.create_time = parseInt(Date.now() / 1000);
          this.ruleForm.dl_count = parseInt(this.ruleForm.dl_count);
          this.ruleForm.app_type1 = parseInt(this.ruleForm.app_type1);
          this.ruleForm.app_type2 = parseInt(this.ruleForm.app_type2);
          let param = this.ruleForm;

          add_app(param)
            .then(res => {
              console.log(res);
              if (res.status == 0) {
                this.$message({
                  type: "success",
                  message: "添加成功",
                });
                this.common.monitoringLogs("新增", "新增应用管理", 1);

                this.$router.push({
                  path: "/marketindex",
                });
              } else if (res.status == -7) {
                this.$message({
                  type: "error",
                  message: "当前应用已存在最高版本",
                });
                this.common.monitoringLogs("新增", "新增应用管理", 0);
              } else {
                this.$message({
                  type: "error",
                  message: "添加失败",
                });
                this.common.monitoringLogs("新增", "新增应用管理", 0);
              }
            })
            .catch(error => {
              this.$message({
                type: "error",
                message: "后台服务出错",
              });
            });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload1(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    addImg: function(event) {
      var that = this;
      // that.$toast('图片上传中...');
      let inputDOM1 = this.$refs.inputer;
      // 通过DOM取文件数据
      this.fil = inputDOM1.files;
      let oldLen = this.imgLen;
      let len = this.fil.length + oldLen;
      if (len > 2) {
        this.$toast("最多可上传2张，您还可以上传" + (2 - oldLen) + "张");
        return false;
      }
      for (let i = 0; i < this.fil.length; i++) {
        let size2 = Math.floor(this.fil[i].size / 1024);
        if (size2 > 3 * 1024) {
          this.$toast("请选择3M以内的图片！");
          return false;
        }
        this.imgLen++;
        var reader = new FileReader();
        reader.readAsDataURL(this.fil[i]);
        reader.onload = function(e) {
          // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
          var imgcode = e.target.result;
          that.imgdata.push(imgcode);
        };
      }
      //  console.log(this.entity.cardid_photo)
    },
    addImg1: function(event) {
      var that = this;
      // that.$toast('图片上传中...');
      let inputDOM1 = this.$refs.inputer1;
      // 通过DOM取文件数据
      this.fil = inputDOM1.files;
      let oldLen = this.imgLen;
      let len = this.fil.length + oldLen;
      if (len > 2) {
        this.$toast("最多可上传2张，您还可以上传" + (2 - oldLen) + "张");
        return false;
      }
      for (let i = 0; i < this.fil.length; i++) {
        let size2 = Math.floor(this.fil[i].size / 1024);
        if (size2 > 3 * 1024) {
          this.$toast("请选择3M以内的图片！");
          return false;
        }
        this.imgLen++;
        var reader = new FileReader();
        reader.readAsDataURL(this.fil[i]);
        reader.onload = function(e) {
          // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
          var imgcode = e.target.result;
          that.imgdata.push(imgcode);
        };
      }
      //  console.log(this.entity.cardid_photo)
    },
    addImg2: function(event) {
      var that = this;
      // that.$toast('图片上传中...');
      let inputDOM1 = this.$refs.inputer2;
      // 通过DOM取文件数据
      this.fil = inputDOM1.files;
      let oldLen = this.imgLen;
      let len = this.fil.length + oldLen;
      if (len > 2) {
        this.$toast("最多可上传2张，您还可以上传" + (2 - oldLen) + "张");
        return false;
      }
      for (let i = 0; i < this.fil.length; i++) {
        let size2 = Math.floor(this.fil[i].size / 1024);
        if (size2 > 3 * 1024) {
          this.$toast("请选择3M以内的图片！");
          return false;
        }
        this.imgLen++;
        var reader = new FileReader();
        reader.readAsDataURL(this.fil[i]);
        reader.onload = function(e) {
          // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
          var imgcode = e.target.result;
          that.imgdata.push(imgcode);
        };
      }
      //  console.log(this.entity.cardid_photo)
    },
    addImg3: function(event) {
      var that = this;
      // that.$toast('图片上传中...');
      let inputDOM1 = this.$refs.inputer3;
      // 通过DOM取文件数据
      this.fil = inputDOM1.files;
      let oldLen = this.imgLen;
      let len = this.fil.length + oldLen;
      if (len > 2) {
        this.$toast("最多可上传2张，您还可以上传" + (2 - oldLen) + "张");
        return false;
      }
      for (let i = 0; i < this.fil.length; i++) {
        let size2 = Math.floor(this.fil[i].size / 1024);
        if (size2 > 3 * 1024) {
          this.$toast("请选择3M以内的图片！");
          return false;
        }
        this.imgLen++;
        var reader = new FileReader();
        reader.readAsDataURL(this.fil[i]);
        reader.onload = function(e) {
          // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
          var imgcode = e.target.result;
          that.imgdata.push(imgcode);
        };
      }
      //  console.log(this.entity.cardid_photo)
    },
    addImg4: function(event) {
      var that = this;
      // that.$toast('图片上传中...');
      let inputDOM1 = this.$refs.inputer4;
      // 通过DOM取文件数据
      this.fil = inputDOM1.files;
      let oldLen = this.imgLen;
      let len = this.fil.length + oldLen;
      if (len > 2) {
        this.$toast("最多可上传2张，您还可以上传" + (2 - oldLen) + "张");
        return false;
      }
      for (let i = 0; i < this.fil.length; i++) {
        let size2 = Math.floor(this.fil[i].size / 1024);
        if (size2 > 3 * 1024) {
          this.$toast("请选择3M以内的图片！");
          return false;
        }
        this.imgLen++;
        var reader = new FileReader();
        reader.readAsDataURL(this.fil[i]);
        reader.onload = function(e) {
          // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
          var imgcode = e.target.result;
          that.imgdata.push(imgcode);
        };
      }
      //  console.log(this.entity.cardid_photo)
    },
    addImg5: function(event) {
      var that = this;
      // that.$toast('图片上传中...');
      let inputDOM1 = this.$refs.inputer5;
      // 通过DOM取文件数据
      this.fil = inputDOM1.files;
      let oldLen = this.imgLen;
      let len = this.fil.length + oldLen;
      if (len > 2) {
        this.$toast("最多可上传2张，您还可以上传" + (2 - oldLen) + "张");
        return false;
      }
      for (let i = 0; i < this.fil.length; i++) {
        let size2 = Math.floor(this.fil[i].size / 1024);
        if (size2 > 3 * 1024) {
          this.$toast("请选择3M以内的图片！");
          return false;
        }
        this.imgLen++;
        var reader = new FileReader();
        reader.readAsDataURL(this.fil[i]);
        reader.onload = function(e) {
          // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
          var imgcode = e.target.result;
          that.imgdata.push(imgcode);
        };
      }
      //  console.log(this.entity.cardid_photo)
    },
    //分偏上传
    upFile() {
      let _this = this;

      var file = document.getElementById("f");
      var f = file.files[0];
      if (f == undefined) {
        this.$message({
          type: "warning",
          message: "请选择要上传的文件",
        });
        return false;
      }
      this.disableStatus = true;
      var totalSize = f.size;
      if (totalSize == 0) {
        this.$message({
          message: "请选择文件SIZE大于0文件",
          type: "success",
        });
        return false;
      }
      var len = 2 * 1024 * 1024;
      var tota_temp = Math.ceil(totalSize / len);
      console.log(tota_temp);

      var start = 0;
      var end = start + len;
      var index = 1;

      var blobSlice =
        File.prototype.mozSlice ||
        File.prototype.webkitSlice ||
        File.prototype.slice;

      var fileReader = new FileReader();
      console.log(index);
      //  return false
      function sliceandpost() {
        //if (start >= totalSize)return;
        //if (index >= tota_temp)return;

        var temp = f.slice(start, end);
        var formData = new FormData();
        formData.append("file", temp);
        formData.append("fileName", f.name);
        formData.append("num", index);
        formData.append("start", start);
        formData.append("end", end);
        formData.append("totalSize", totalSize);
        formData.append("total", tota_temp);
        var url = hostUrl + "/admin/uploadapk2";
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = onchange;
        xhr.open("POST", url);
        xhr.send(formData);

        function onchange() {
          // 4 = "loaded"
          if (xhr.readyState == 4) {
            // 200 = "OK"
            if (xhr.status == 200) {
              //var headers =  JSON.parse(xhr.responseText);
              var headers = JSON.parse(xhr.response);
              console.log(headers);
              //分片上传成功
              if (headers.status == 0) {
                index = index + 1;
                // 改变下一次截取的位置
                start = end;
                end = start + len;
                // 因为截取可能超过totalSize，判断最后一次截取是否大于totalSize如果大于就直接让end等于totalSize
                if (end > totalSize) {
                  end = totalSize;
                }
                _this.widthData = Math.floor(index / tota_temp * 100);
                _this.perNum = Math.floor(index / tota_temp * 100);
                // document.getElementById("loading").style.width = Math.floor(index / tota_temp * 100) + "%";
                // document.getElementById('per').innerHTML = Math.floor(index / tota_temp * 100)
                sliceandpost();
              } else if (headers.status == 1) {
                _this.widthData = 100;
                _this.perNum = 100;
                document.getElementById("result").innerHTML =
                  "上传成功:" + headers.msg;
                _this.sdkUrl = headers.url;
                //_this.dialog = false
                // _this.queryInfo()
                _this.uploadForm = headers;
                _this.uploadType = true;
                _this.ruleForm.app_version = headers.version;
                _this.ruleForm.pkg_name = headers.name;
                _this.ruleForm.dl_url = headers.url;
                _this.ruleForm.app_size = headers.size;
              } else if (headers.status == -900) {
                _this.$message({
                  message: `${headers.msg}`,
                  type: "error",
                });
              }
            } else {
              alert("Problem retrieving XML data:" + xhr.statusText);
            }
          }
        }
      }
      sliceandpost();
    },
  },
  components: {
    pageNation,
    mySearch,
    mavonEditor,
    VueCropper,
  },
};
</script>
<style lang="less">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.addmarket {
  .pre-img {
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
