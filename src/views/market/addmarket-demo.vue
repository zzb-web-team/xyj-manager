<template>
<div>
  
<div class="van-cell van-field">
    <div class="van-cell__title">
        <span>身份证照片</span>
    </div>
    <div class="van-cell__value font-size12 font-metud  mt-5">
         大小不超过3M,最多上传2张!
    </div>
</div>
<div class="posrev bg-white applay-uploadimg">
    <div class="weui-uploader__bd  plr-15">
        <ul class="weui-uploader__files" id="uploaderFiles">
            <template  v-for='(value, key) in  entity.cardid_photo'>
                <li class="weui-uploader__file"  :style="'background-image:url('+value+')'"><a href="javascript:;" class="font-white text-center upload-del"  style=""   @click="delImg(key)"><van-icon name="delete" :size="16" /></a></li>
            </template>
        </ul>
        <div  v-if="imgLen>=2 ? false : true" class="weui-uploader__input-box">
            <input id="fileid" class="weui-uploader__input" type="file" accept="image/*" @change="addImg"  ref="inputer" multiple>
        </div>
    </div>
</div>

</div>
</template>
<script>
import {
 saveimagemore
} from "../../api/api";
export default {
    data() {
        return {

finished:false,
loading:false,
formData:new FormData(),//参数；暂时没有；可以扩展；
imgs: {},//上传身份证图片；暂时没有；可以扩展；
imgLen:0, //上传身份证图片长度；
imgCoverLen: 0,//上传门店图片长度；
entity:{
wechat_openid:"",
role_id:"",//等级
cover:[],
cardid:'',
cardid_photo:[],


        
    }
}
    },
    methods:{
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
             console.log(imgcode)
                    let param={}
             param.data=[]
             param.data.push(imgcode)
             console.log(imgcode)
             console.log(param)
          
            //saveimagemore('/api/uploads/add',{file:imgcode2}).then(function(res){
            saveimagemore(param).then(function(res){
            //  axios.post('/api/uploads/add',{file:imgcode}).then(function(res){
                 if(res.data.code == 0){
                     that.entity.cardid_photo.push(res.data.data.url);
                 }else{
                     that.$toast(res.data.message);
                 }
             })
         }
     }
//  console.log(this.entity.cardid_photo)
 },
 //删除上传的身份证照片；
 delImg:function(key){
     this.$delete(this.entity.cardid_photo,key);
     this.imgLen--;
     this.entity.cardid_photo=this.entity.cardid_photo;
    // console.log(this.entity.cardid_photo)
 },



    }
}
</script>
<style lang="less">

</style>
