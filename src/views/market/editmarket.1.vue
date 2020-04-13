<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <h3>一、上传软件应包</h3>
      <el-form-item label="上传APK;" prop="name">
        <el-button type="primary" @click="submitForm('ruleForm')">上传</el-button>
      </el-form-item>
      <el-form-item label="应用包名:" prop="name">
        <el-input v-model="ruleForm.name" placeholder :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="版本号:" prop="name">
        <el-input v-model="ruleForm.name" placeholder :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="应用大小:" prop="name">
        <el-input v-model="ruleForm.name" placeholder :disabled="true"></el-input>
      </el-form-item>
    
      <h3>二、选择应用分类</h3>

      <el-form-item label="一级分类" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择应用评分">
          <el-option label="1" value="shanghai"></el-option>
          <el-option label="2" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择应用评分">
          <el-option label="1" value="shanghai"></el-option>
          <el-option label="2" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <h3>三、填写应用基本信息</h3>
      <el-form-item label="应用LOGO:" prop="name">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="应用名称:" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入应用名称"></el-input>
      </el-form-item>
      <el-form-item label="开发者:" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入开发者信息"></el-input>
      </el-form-item>
      <el-form-item label="应用简述:" prop="name">
        <el-input v-model="ruleForm.name" placeholder="一句话描述该商品的广告词"></el-input>
      </el-form-item>
      <el-form-item label="应用评分" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择应用评分">
          <el-option label="5" value="shanghai"></el-option>
          <el-option label="4" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="下载次数:" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入下载次数"></el-input>
      </el-form-item>

      <el-form-item label="应用介绍" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc" placeholder="请输入应用介绍"></el-input>
      </el-form-item>
      <el-form-item label="应用图片:" prop="name">
        <div>上传图片的最佳尺寸：1920像素*1080像素（待定），其他尺寸会影响页面效果，格式png，jpeg，jpg，gif，大小不超过2M，应用图片最少上传4张，建议4-6张。</div>
      </el-form-item>
      <el-form-item label="    " prop="name">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button @click="resetForm('ruleForm')">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fileList: [
        {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, 
        {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
        ],

      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
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
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
           handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
  }
};
</script>
<style>
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
</style>
