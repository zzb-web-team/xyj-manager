<template>
  <div class="addmarket">
    <div class="goback" style="width: 100%;line-height: 50px;">
      <div style="margin-top:20px;">
        
        <el-button type="primary" class="el-upload__tip" @click="$router.go(-1)">返回</el-button>
      </div>
      
    </div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <h3>一、上传软件应包</h3>
      <el-form-item label="上传APK;" prop="name">
        <el-upload
          id="1"
          class="upload-demo"
          ref="upload1"
          :limit="1"
          drag
          name="configFile"
          :before-upload="beforeAvatarUpload"
          action
          :file-list="fileList"
          :http-request="uploadSectionFile1"
          :auto-upload="false"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">
            <div>只能上传.APK文件.</div>
            <el-button type="primary" class="el-upload__tip" @click="submitUpload1">上传</el-button>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="应用包名:" prop="pkg_name">
        <el-input v-model="ruleForm.pkg_name" placeholder :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="版本号:" prop="app_version">
        <el-input v-model="ruleForm.app_version" placeholder :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="应用大小:" prop="app_size">
        <el-input v-model="ruleForm.app_size" placeholder :disabled="true"></el-input>
      </el-form-item>

      <h3>二、选择应用分类</h3>

      <el-form-item label="一级分类" prop="app_type1" @change="onchangeappType1">
        <el-select v-model="ruleForm.app_type1" placeholder="请选择应用评分">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" prop="app_type2">
        <el-select v-model="ruleForm.app_type2" placeholder="请选择应用评分" @change="onchangeappType2">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
        </el-select>
      </el-form-item>
      <h3>三、填写应用基本信息</h3>
      <el-form-item label="应用LOGO:" prop="name">
        <div class="crop-demo">
          <img :src="cropImg" class="pre-img" width="100" height="100" />
          上传尺寸：144像素*144像素（建议）
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
            preview=".preview"
            style="width:100%;height:300px;"
          ></vue-cropper>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancelCrop">取 消</el-button>
            <el-button type="primary" @click="onUpload">确 定</el-button>
          </span>
        </el-dialog>
      </el-form-item>
      <el-form-item label="应用名称:" prop="app_name">
        <el-input v-model="ruleForm.app_name" placeholder="请输入应用名称"></el-input>
      </el-form-item>
      <el-form-item label="开发者:" prop="developer">
        <el-input v-model="ruleForm.developer " placeholder="请输入开发者信息"></el-input>
      </el-form-item>
      <el-form-item label="应用简述:" prop="snapshot">
        <el-input v-model="ruleForm.snapshot" placeholder="一句话描述该商品的广告词"></el-input>
      </el-form-item>
      <el-form-item label="应用评分" prop="app_score">
        <el-select v-model="ruleForm.app_score" placeholder="请选择应用评分" @change="onchangeScore">
          <el-option label="5" value="5"></el-option>
          <el-option label="4" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="下载次数:" prop="dl_count">
        <el-input v-model="ruleForm.dl_count" placeholder="请输入下载次数"></el-input>
      </el-form-item>

      <el-form-item label="应用介绍" prop="app_brief">
        <el-input type="textarea" v-model="ruleForm.app_brief" placeholder="请输入应用介绍"></el-input>
      </el-form-item>
      <el-form-item label="应用图片:" prop="name">
        <div>上传图片的最佳尺寸：1920像素*1080像素（待定），其他尺寸会影响页面效果，格式png，jpeg，jpg，gif，大小不超过2M，应用图片最少上传4张，建议4-6张。</div>
      </el-form-item>
      <el-form-item label="    " prop="name">
       <div class="posrev bg-white applay-uploadimg">
                <div class="weui-uploader__bd  plr-15">

                    <div class="weui-uploader__input-box">
                        <input id="fileid" class="weui-uploader__input" type="file" accept="image/*" @change="addImg"  ref="inputer" multiple>
                    </div>
                     <div class="weui-uploader__input-box">
                        <input id="fileid1" class="weui-uploader__input" type="file" accept="image/*" @change="addImg1"  ref="inputer1" multiple>
                    </div>
                     <div class="weui-uploader__input-box">
                        <input id="fileid2" class="weui-uploader__input" type="file" accept="image/*" @change="addImg2"  ref="inputer2" multiple>
                    </div>
                     <div class="weui-uploader__input-box">
                        <input id="fileid3" class="weui-uploader__input" type="file" accept="image/*" @change="addImg3"  ref="inputer3" multiple>
                    </div>
                    <div>
                                <el-button type="primary" @click="imgupload">确定上传</el-button>

                    </div>
                    
                </div>
            </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
        <!-- <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button> -->
        <el-button @click="resetForm('ruleForm')">返回</el-button>
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
  saveimagemore
} from "../../api/api.js";

export default {
  data() {
    return {
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
        app_type1: 0,
        app_type2: 0,
        pkg_name: "",
        app_version: "",
        app_size: "",
        dl_url: "",
        create_time: 0,
        app_icon: "",
     
        // region: "",
        // date1: "",
        // date2: "",
        // delivery: false,
        // type: [],
        // resource: "",
        // desc: ""
      },
         imgdata:[],
      rules: {
        name: [
          { required: false, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: false, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: false, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },
  created() {
    this.cropImg = this.defaultSrc;
  },
  methods: {
      //图片上传
      imgupload(){
          let that=this
       console.log(this.imgdata) 
            let param={}
            param.data=this.imgdata
         saveimagemore(param).then(function(res){
             console.log(res)
             if(res.status==0){
                 let temp=res.msg
                 let tempArr=[]
                 for(var i=0;i<temp.length;i++){
                     tempArr.push(temp[i].data)
                      that.ruleForm.app_pic.push(temp[i].data);
                 }
                 console.log(that.ruleForm.app_pic)
             }
            //  axios.post('/api/uploads/add',{file:imgcode}).then(function(res){
                //  if(res.data.code == 0){
                //      that.entity.cardid_photo.push(res.data.data.url);
                //  }else{
                //      that.$toast(res.data.message);
                //  }
             })  
      },
    //
    handseccess(response, file, fileList){
      console.log(fileList)
      // console.log(response)
      // console.log(file)

    },
    getData() {
      this.data = JSON.stringify(this.$refs.cropper.getData(), null, 4);
    },
    onUpload() {
      this.dialogVisible = false;
      let param = {
        data: this.imgBase
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
        message: "图片上传接口上传失败，可更改为自己的服务器接口"
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
            type: "error"
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
          type: "warning"
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
          message: "上传的FULL包不能为空！"
        });
        return false;
      }
      this.$refs.upload1.submit();
    },
    //应用评分
    onchangeScore(val) {
      this.ruleForm.app_score = parseInt(val);
    },
    onchangeappType1(val) {
      this.ruleForm.app_type1 = parseInt(val);
    },
    onchangeappType2(val) {
      this.ruleForm.app_type2 = parseInt(val);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.ruleForm);
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
                  message: "添加成功"
                });
              }
             else  if (res.status ==-7) {
                this.$message({
                  type: "error",
                  message: "不能添加重复的APK"
                });
              }
               else {
                this.$message({
                  type: "error",
                  message: "添加失败"
                });
              }
            })
            .catch(error => {
              this.$message({
                type: "error",
                message: "后台服务出错"
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
     addImg:function(event){
     var that=this;
    // that.$toast('图片上传中...');
     let inputDOM1 = this.$refs.inputer;
     // 通过DOM取文件数据
     this.fil = inputDOM1.files;
     let oldLen=this.imgLen;
     let len=this.fil.length+oldLen;
     if(len>2){
         this.$toast('最多可上传2张，您还可以上传'+(2-oldLen)+'张');
         return false;
     }
     for (let i=0; i < this.fil.length; i++) {
         let size2 = Math.floor(this.fil[i].size / 1024);
         if (size2 > 3*1024) {
             this.$toast('请选择3M以内的图片！');
             return false
         }
         this.imgLen++;
         var reader = new FileReader();
         reader.readAsDataURL(this.fil[i]);
         reader.onload = function (e) {
             // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
             var imgcode = e.target.result;
             that.imgdata.push(imgcode)
           
         }
     }
//  console.log(this.entity.cardid_photo)
 },
  addImg1:function(event){
     var that=this;
    // that.$toast('图片上传中...');
     let inputDOM1 = this.$refs.inputer1;
     // 通过DOM取文件数据
     this.fil = inputDOM1.files;
     let oldLen=this.imgLen;
     let len=this.fil.length+oldLen;
     if(len>2){
         this.$toast('最多可上传2张，您还可以上传'+(2-oldLen)+'张');
         return false;
     }
     for (let i=0; i < this.fil.length; i++) {
         let size2 = Math.floor(this.fil[i].size / 1024);
         if (size2 > 3*1024) {
             this.$toast('请选择3M以内的图片！');
             return false
         }
         this.imgLen++;
         var reader = new FileReader();
         reader.readAsDataURL(this.fil[i]);
         reader.onload = function (e) {
             // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
             var imgcode = e.target.result;
              that.imgdata.push(imgcode)
        
         }
     }
//  console.log(this.entity.cardid_photo)
 },
  addImg2:function(event){
     var that=this;
    // that.$toast('图片上传中...');
     let inputDOM1 = this.$refs.inputer2;
     // 通过DOM取文件数据
     this.fil = inputDOM1.files;
     let oldLen=this.imgLen;
     let len=this.fil.length+oldLen;
     if(len>2){
         this.$toast('最多可上传2张，您还可以上传'+(2-oldLen)+'张');
         return false;
     }
     for (let i=0; i < this.fil.length; i++) {
         let size2 = Math.floor(this.fil[i].size / 1024);
         if (size2 > 3*1024) {
             this.$toast('请选择3M以内的图片！');
             return false
         }
         this.imgLen++;
         var reader = new FileReader();
         reader.readAsDataURL(this.fil[i]);
         reader.onload = function (e) {
             // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
             var imgcode = e.target.result;
              that.imgdata.push(imgcode)
        
         }
     }
//  console.log(this.entity.cardid_photo)
 },
  addImg3:function(event){
     var that=this;
    // that.$toast('图片上传中...');
     let inputDOM1 = this.$refs.inputer3;
     // 通过DOM取文件数据
     this.fil = inputDOM1.files;
     let oldLen=this.imgLen;
     let len=this.fil.length+oldLen;
     if(len>2){
         this.$toast('最多可上传2张，您还可以上传'+(2-oldLen)+'张');
         return false;
     }
     for (let i=0; i < this.fil.length; i++) {
         let size2 = Math.floor(this.fil[i].size / 1024);
         if (size2 > 3*1024) {
             this.$toast('请选择3M以内的图片！');
             return false
         }
         this.imgLen++;
         var reader = new FileReader();
         reader.readAsDataURL(this.fil[i]);
         reader.onload = function (e) {
             // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
             var imgcode = e.target.result;
              that.imgdata.push(imgcode)
 
          
         }
     }
//  console.log(this.entity.cardid_photo)
 },
    
  },
  components: {
    pageNation,
    mySearch,
    mavonEditor,
    VueCropper
  }
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
