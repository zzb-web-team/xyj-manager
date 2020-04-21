<template>
<div class="simple">
    <div class="top_title" style=" display: flex;margin-top:30px;    margin-left: 40px;">
        <span @click="goback" style="font-size: 24px;color: #202020;"><i class="el-icon-arrow-left" style="color:#297AFF;font-size: 18px;font-weight: 600;margin-right:23px;"></i>批量导入URL</span>
    </div>
    <div class="con">

        <el-upload class="upload-demo" ref="upload" :limit="1" :action="UploadUrl()" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :on-success="handleAvatarSuccess" name="excel" :auto-upload="false">
            <el-button slot="trigger" size="small" class="MyctiveButton" type="primary">上传Excel文件</el-button>
            <el-button type="primary" @click="down" plain id="dwonexcel" style="padding: 11px 20px;">下载模板</el-button>

            <el-button style="position: absolute;left: 37px;bottom: 23px;width:85px;" size="small" type="success" :disabled="buttonActive" @click="submitUpload">导 入</el-button>
            <el-button style="position: absolute;left: 130px;bottom: 23px;width:85px;" size="small" type="success" :disabled="noClick" @click="submitUploadOK">确定</el-button>
        </el-upload>
        <div class="url_con" v-if="tableType">
            <!-- 表格 -->
            <el-table border :data="tableList" style="width: 100%" height="405px">
                <el-table-column label="设备SN">
                    <template slot-scope="scope">
                        <span v-if="scope.row.urlstatus===false" style="color:red">{{scope.row.dev_sn}}</span>
                        <span v-else style="color:green">{{scope.row.dev_sn}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="设备型号">
                    <template slot-scope="scope">
                        <span v-if="scope.row.urlType===false" style="color:red">{{scope.row.dev_type}}</span>
                        <span v-else style="color:green">{{scope.row.dev_type}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="ROM">
                    <template slot-scope="scope">
                        <span v-if="scope.row.urlName===false" style="color:red">{{scope.row.rom_version}}</span>
                        <span v-else style="color:green">{{scope.row.rom_version}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="MAC地址">
                    <template slot-scope="scope">
                        <span v-if="scope.row.idType===false" style="color:red">{{scope.row.dev_mac}}</span>
                        <span v-else style="color:green">{{scope.row.dev_mac}}</span>
                    </template>
                </el-table-column>
                <el-table-column  label="CPU-ID">
                    <template slot-scope="scope">
                        <span v-if="scope.row.urllabel===false" style="color:red">{{scope.row.cpu_id}}</span>
                        <span v-else style="color:green">{{scope.row.cpu_id}}</span>
                    </template>
                </el-table-column>
                <el-table-column  label="总容量">
                      <template slot-scope="scope">
                        <span v-if="scope.row.urllabel2===false" style="color:red">{{scope.row.total_cap}}</span>
                        <span v-else style="color:green">{{scope.row.total_cap}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <!-- <span v-if="scope.row.status=='失败'" style="color:red">失败</span>
                        <span v-else-if="scope.row.status=='成功'" style="color:green">成功</span> -->
                        <span style="color:grey">{{scope.row.status}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" v-if="scope.row.errstatus==0" size="small" @click="deleteRow(scope.$index,tableList)" style="color:#000000">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog :title="title" :visible.sync="dialogVisible" width="30%">
            <div v-for="item in message" :key="item" class="cerr">
                <span>{{ item.url }}</span><span>{{ item.state }}</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</div>
</template>

<script>
import {
    add_url,
    hostUrl,
    batch_import_devices
} from "../../api/api";
export default {
    data() {
        return {
            buttonActive:false,
            noClick: true,
            fileList: [],
            message: [],
            tableList: [],
            title: "",
            dialogVisible: false,
            tableType: false,
            errorcount: 0,
            activeStatus:true
        };
    },
    mounted:function(){
        console.log(hostUrl)
    },
    methods: {
        //导出地址变量
        UploadUrl(){
            return hostUrl+"/url_mgmt/excel_url"
        },
        // 
        deleteRow(index, rows) {
            rows.splice(index, 1);
            this.errorcount--
            if (this.errorcount == 0) {
                this.noClick = false
            }
        },
        splitData(list) {
            this.uploadData(list, 1);
             setTimeout(this.gorouter, 3000);
             
               
                   
        },
        gorouter(){
            if(this.activeStatus==true){
                this.$router.push({
                 path: "/domain_management"
                });
            }
           
        },
        // uploadData(list, page) {
        //     let len = list.length;
        //     let i = (page - 1) * 10;
        //     if (i > len) {
        //         return false;
        //     }
        //     var res = [];
        //     res = list.slice(i, i + 10);
        //     let param = new Object()
        //     param.data_count = res.length
        //     param.arr = res
        //     //  return false
        //     add_url(param).then(res => {
                
            
        //         if (res.status == 0) {
        //             console.log(res)
        //             if (res.data.res_data.length > 0) {
        //                 let nowarr = res.data.res_data
        //                 for (var i = 0; i < nowarr.length; i++) {
        //                     for (var j = 0; j < this.tableList.length; j++) {
        //                         if (this.tableList[j].url == nowarr[i][0]) {
        //                             if (nowarr[i][1] == 0) {
        //                                 this.tableList[j].status = "成功"
        //                                 this.activeStatus=true
        //                             } else if (nowarr[i][1] == 1) {
        //                                 this.tableList[j].status = "格式错误"
        //                                 this.activeStatus=false
        //                             } else if (nowarr[i][1] == 2) {
        //                                 this.tableList[j].status = "URl重复"
        //                                 this.activeStatus=false
        //                             } else if (nowarr[i][1] == 3) {
        //                                 this.tableList[j].status = "label重复"
        //                                 this.activeStatus=false
        //                             } else if (nowarr[i][1] == 4) {
        //                                 this.tableList[j].status = "渠道ID不存在"
        //                                 this.activeStatus=false
        //                             } else if (nowarr[i][1] == 5) {
        //                                 this.tableList[j].status = "数据库写人错误"
        //                                 this.activeStatus=false
        //                             }
                                 
        //                         }
                              
        //                     }
                        
        //                 }
        //                 page++;
        //                 this.uploadData(list, page)
        //             } else {
        //                 this.$message({
        //                     showClose: true,
        //                     message: "上传失败",
        //                     type: "error"
        //                 });
        //             }
        //         }
        //     }).catch(error => {
        //     })
        // },
        uploadData(list, page) {
            let len = list.length;
            let i = (page - 1) * 10;
            if (i > len) {
                return false;
            }
            var res = [];
            res = list.slice(i, i + 10);
            let param = new Object()
            //param.data_count = res.length
            param.arr = res
            //  return false
            batch_import_devices(param).then(res => {
                console.log(res)
                
            
                if (res.status == 0) {
                    console.log(res)
                    if (res.data.res_data.length > 0) {
                        let nowarr = res.data.res_data
                        for (var i = 0; i < nowarr.length; i++) {
                            for (var j = 0; j < this.tableList.length; j++) {
                                if (this.tableList[j].url == nowarr[i][0]) {
                                    if (nowarr[i][1] == 0) {
                                        this.tableList[j].status = "成功"
                                        this.activeStatus=true
                                    } else if (nowarr[i][1] == 1) {
                                        this.tableList[j].status = "格式错误"
                                        this.activeStatus=false
                                    } else if (nowarr[i][1] == 2) {
                                        this.tableList[j].status = "URl重复"
                                        this.activeStatus=false
                                    } else if (nowarr[i][1] == 3) {
                                        this.tableList[j].status = "label重复"
                                        this.activeStatus=false
                                    } else if (nowarr[i][1] == 4) {
                                        this.tableList[j].status = "渠道ID不存在"
                                        this.activeStatus=false
                                    } else if (nowarr[i][1] == 5) {
                                        this.tableList[j].status = "数据库写人错误"
                                        this.activeStatus=false
                                    }
                                 
                                }
                              
                            }
                        
                        }
                        page++;
                        this.uploadData(list, page)
                    } else {
                        this.$message({
                            showClose: true,
                            message: "上传失败",
                            type: "error"
                        });
                    }
                }
            }).catch(error => {
            })
        },
        //确定上传
        submitUploadOK() {
            this.splitData(this.tableList)
            this.buttonActive=false
            
        },
        goback() {
            this.$router.go(-1);
        },
        //文件列表移除文件
        submitUpload() {
            this.$refs.upload.submit();
            this.buttonActive=true
            console.log(this.buttonActive)
        },
        //上传
        handlePreview(file) {},
        //移除上传文件
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        handleRemove(file, fileList) {},
        //上传成功
        handleAvatarSuccess(res, file) {
            this.message = [];
            this.title = "";
            if (res.status == 0) {
                if (res.err_code == 0) {
                    console.log(res)
                    this.tableType = true
                    // let obj={
                    //   status:"待上传"
                    // }
                    //var resyzm = /^http(s)?:\/\/([\w-]+(\.[\w-]+)*\/?)+(\?([\w\-\.,?^=%&:\/~\+#]*)+)?$/;
                    //                     var resyzm = /^SME[0-9a-zA-Z]{1}[0-9]{4}[0-9a-zA-Z]{7}$/;

                    
                    // var resType = /^[0-2]{1}$/;
                    // var resName = /^(?!(\d+)$)[\u4e00-\u9fffa-zA-Z\d]{2,50}$/;
                    // var resID = /^\d{12}$/;
                    // var reslabel = /^[\u4e00-\u9fffa-zA-Z\d]{4,64}$/
                    // var reslabe2 = /^[0-9]*$/

                    var resyzm = /^SME[0-9a-zA-Z]{1}[0-9]{4}[0-9a-zA-Z]{7}$/;
                    var resType = /^[0-2]{1}$/;
                    var resName = /^([0-9a-f]{2}:){5}[0-9a-f]{2}$/;
                    var resID = /^\d{12}$/;
                    var reslabel = /^[\u4e00-\u9fffa-zA-Z\d]{4,64}$/
                    this.errorcount = 0;
                    for (var i = 0; i < res.data.length; i++) {
                        var err = 0
                        if (resyzm.test(res.data[i].url_type) === false) {
                            res.data[i].urlstatus = false
                            err++;
                        } else {
                            res.data[i].urlstatus = true
                        }
                        // if (resyzm.test(res.data[i].url_type) === false) {
                        //     res.data[i].urlType = false
                        //     err++;
                        // } else {
                        //     res.data[i].urlType = true
                        // }
                        if (resType.test(res.data[i].url_name) === false) {
                            res.data[i].urlName = false
                            err++;
                        } else {
                            res.data[i].urlName = true
                        }
                        if (reslabel.test(res.data[i].label) === false) {
                            res.data[i].urllabel = false
                            err++;
                        } else {
                            res.data[i].urllabel = true
                        }
                        // if (reslabe2.test(res.data[i].label2) === false) {
                        //     res.data[i].urllabel2 = false
                        //     err++;
                        // } else {
                        //     res.data[i].urllabel2 = true
                        // }
                        if (resName.test(res.data[i].buser_id) === false) {
                            res.data[i].idType = false
                            res.data[i].busercheck = "格式错误"
                            if (!res.data[i].buser_id) {
                                res.data[i].busercheck = "暂无内容"
                            }
                            err++;
                        } else {
                            res.data[i].idType = true
                        }
                        if (err > 0) {
                            this.errorcount++;
                            res.data[i].errstatus = "0"
                        }
                        res.data[i].status = "待上传"
                    }
                    if (this.errorcount == 0) {
                        this.noClick = false;
                    } else {
                    }
                    console.log(res.data)
                    //let temp=[{}] 
                    let temp=res.data
                    for(var i=0;i<res.data.length;i++){
                    //     let obj={
                    //        dev_sn:res.data[i].url_type,
                    //        dev_mac:res.data[i].buser_id,
                    //         cpu_id:res.data[i].label,
                    //    rom_version:res.data[i].url,
                    //    total_cap:res.data[i].label2,
                    //    dev_type:res.data[i].url_name,
                    //     }
                    //     temp[i]=obj
                    //     console.log(res.data[i].url_type)
                        temp[i].dev_sn=res.data[i].url_type
                        temp[i].dev_mac=res.data[i].buser_id
                        temp[i].cpu_id=res.data[i].label
                        temp[i].rom_version=res.data[i].url
                        temp[i].total_cap=res.data[i].label2
                        temp[i].dev_type=res.data[i].url_name

                    }
                    
                    this.tableList = temp
                    // this.$message({
                    //     showClose: true,
                    //     message: "全部插入成功",
                    //     type: "success"
                    // });
                } else {
                    this.$message({
                        showClose: true,
                        message: `${res.msg}`,
                        type: "error"
                    });
                    // this.dialogVisible = true;
                    // this.title = res.data.failed_count + "条数据插入失败";
                    // res.data.res_data.forEach((item, index) => {
                    //     let curl = {};
                    //     curl.url = item[0];
                    //     if (this.message.push(item[1]) == false) {
                    //         curl.state = "插入失败";
                    //     }
                    //     this.message.push(curl);
                    // });
                }
            } else {
                this.$message({
                    showClose: true,
                    message: "服务器响应超时",
                    type: "error"
                });
            }
        },
        errormove(err, file, fileList) {},
        down() {
            var url = 'http://zzb.onezen.net/static/device.xls'
            window.location.href = url;
        }
    }
};
</script>

<style lang="scss" scoped>
.con {
    position: relative;
    width: 90%;
    height: 600px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 3px 0px rgba(6, 17, 36, 0.14);
    border-radius: 2px;
    margin: auto;
    margin-top: 20px;
    padding: 18px 37px;
    text-align: left;
}
.MyctiveButton {
    position: absolute;
    top: 18px;
    left: 150px;
}
.el-button--small {
    padding: 12px 15px !important;
}
.url_con {
    width: 100%;
    height: 300px;
    background: #999999;
}
</style>