<template>
<section class="myself-container">
    <div class="devide_table">
        <el-row type="flex" class="row_active">
            <el-col :span="2" style="display: flex;justify-content: flex-start;">
                <el-button type="primary" @click="dialogFormVisible">上传系统包</el-button>
            </el-col>
            <el-col :span="2" >
                <el-button type="primary" @click="golink()">版本发布</el-button>
            </el-col>
        </el-row>
        <el-row type="flex" class="row_active">
            <el-col :span="24">
                <!-- <tableBarActive :tableData="tableData" :rowHeader="rowHeader" :clomnSelection="clomnSelection" :tableOption="tableOption" @toSet="toSet" @toRelease="toRelease" @toChange="toChange" @toDelete="toDelete" @handleButton="handleButton"></tableBarActive> -->
            </el-col>
        </el-row>
        <el-row type="flex" class="row_active">
            <el-col :span="24">
                <el-table :data="tableData11" style="width: 100%;margin-bottom: 20px;" border row-key="id">
                    <el-table-column prop="version_name" label="包名" width="150">
                        <template slot-scope="scope">

                            <div style="text-align:center" v-for="(item,index) in scope.row.version_name" :key="index">{{item}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="equip_type" label="包类型" width="70">
                        <template slot-scope="scope">
                            <div style="text-align:center" v-for="(item,index) in scope.row.equip_type" :key="index">{{item}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="rom_size" label="文件大小" width="90" :formatter="common.formatByte">
                        <template slot-scope="scope">
                            <div style="text-align:center" v-for="(item,index) in scope.row.rom_size" :key="index">{{item}}</div>

                        </template>
                    </el-table-column>
                    <el-table-column prop="md5" label="md5" width="250">
                        <template slot-scope="scope">
                            <div style="text-align:center" v-for="(item,index) in scope.row.md5" :key="index">{{item}}</div>

                        </template>
                    </el-table-column>
                    <el-table-column prop="hashid" label="hashid" width="200">
                        <template slot-scope="scope">
                            <div style="text-align:center" v-for="(item,index) in scope.row.hashid" :key="index">{{item}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="ptfs_file_upload_status" label="是否上传到PTFS节点" width="150">
                        <template slot-scope="scope">
                            <div style="text-align:center" v-for="(item,index) in scope.row.ptfs_file_upload_status" :key="index">
                                <div v-if="item==0">
                                  <span>未上传</span>
                                  <br>
                                    <el-button type="primary" class="button_active" style="margin-left:0px;" @click="Reonload(scope.row,index)">重新上传</el-button>
                                </div>
                                <div v-if="item==1"><span>已上传</span></div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="rom_version" label="版本号" width="70">
                    </el-table-column>
                    <el-table-column prop="" label="文件描述" width="300px;">
                        <template slot-scope="scope">
                            <div style="overflow:hidden;text-overflow:ellipsis;white-space: nowrap;width:280px;margin:0 auto;">{{scope.row.rom_desc}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="time_create" label="上传日期" width="200">
                    </el-table-column>
                    <el-table-column prop="push_mod" label="发布方式" width="70">
                    </el-table-column>
                    <el-table-column prop="time_update" label="近发布日期" width="200">
                    </el-table-column>
                    <el-table-column width="100" label="操作">
                        <template slot-scope="scope"  >
                            <a style="color:#6699ff;cursor: pointer;" @click="toDelete(scope.row)" type="danger" size="small">删除</a>
                            <a style="color:#6699ff;cursor: pointer;" @click="toChange(scope.row)" type="primary" size="small">修改</a>
                        </template>
                    </el-table-column>

                </el-table>
            </el-col>
        </el-row>
        <el-row type="flex" class="row_active">
            <el-col :span="24">
                <myDatanums :dataNum="dataNum"></myDatanums>
            </el-col>
        </el-row>

    </div>
    <div class="devide_pageNation">
        <div class="devide_pageNation_active">
            <el-row type="flex">
                <el-col :span="6">
                    <pageNation :pager="pager" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"></pageNation>
                </el-col>
            </el-row>
        </div>
    </div>
    <el-dialog :visible.sync="dialogFormState" id="my_dialogForm" :show-close="false"  :close-on-click-modal="false">
        <div class="dialog_div" width="28%" v-loading="loading2" element-loading-text="上传中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">

            <div v-for="item in uploadsize" :key="item">
                <div class="dialog_div_con">
                    <div class="dialog_div_title" v-if="item==1">上传FULL包</div>
                    <div class="dialog_div_title" v-else>上传DIFF包</div>
                    <div class="dialog_div_warning">
                        <p v-if="item==1">*必传，full包为包含完整系统资源的文件，一般带有full后缀，如1.0.0_full.zip</p>
                        <p v-else>*diff包为包含增量系统资源的文件，一般带有diff后缀，如：1.0.0_1.0.1_diff.zip</p>
                        </div>
                    <div class="dialog_div_upload">
                        <div class="add-sdk">
                            <div class="item">
                                <div class="item_l">应用包：</div>
                                <div class="item-r" style="position: relative;">
                                    <!-- <el-button class="choose-file" size="mini">请选择要上传的文件</el-button> -->
                                    <input :id="['f'+item]" type="file" name="file">
                                    <el-button type="primary" class="onchoose-file" @click="upFile(item)" :disabled="disableStatus">确定</el-button>
                                     <span :id="['per'+item]"></span>%
                                    <div style="width: 400px;height: 16px;background-color: #999;margin-top:10px;">
                                        <!-- <div style="width: 0%;height: 16px;background-color: #67c23a" id="loading" v-bind:style="{'width': widthData+'%'}"></div> -->
                                        <div style="width: 0%;height: 16px;background-color: green;" :id="['loading'+item]"></div>
                                    </div>
                                    <div :id="['result'+item]" style="margin-top:10px;"></div>
                                </div>
                            </div>
                        </div>
                      
                    </div>
                      <div class="dialog_div_uploadinfo" v-if="uploadList[item-1].showType">
                            <div><span>版本号：</span>{{uploadList[item-1].info.rom_version}}</div>
                            <div><span>包名：</span>{{uploadList[item-1].info.version_name}}</div>
                            <div><span>类型：</span>{{uploadList[item-1].info.push_mod}}</div>
                            <div><span>大小：</span>{{uploadList[item-1].info.rom_size}}</div>
                            <div><span>md5：</span>{{uploadList[item-1].info.md5}}</div>
                        </div>
                </div>

            </div>
            <div class="dialog_div_desc">
                <textarea placeholder="请输入文字描述" v-model="textareaText"></textarea>
            </div>
                    <div style="display:flex;justify-content: center;padding-bottom: 20px;"><el-button style="color:#ffffff;cursor: pointer;" @click="plus" type="primary" size="small">+</el-button></div>

            <div slot="footer" class="dialog-footer" style="">
                <el-button @click="dialogFormState = false">取 消</el-button>
                <el-button type="primary" @click="onUpload()">确 定</el-button>
            </div>
        </div>

    </el-dialog>
    <el-dialog :visible.sync="dialogSetState" class="my_dialog_release" :show-close="false" :close-on-click-modal="false">
        <el-table :data="arr">
            <el-table-column prop="types" label="发布渠道">
            </el-table-column>
            <el-table-column prop="name" label="发布优先级渠道">
                <template slot-scope="scope">
                    <el-radio v-model="radio" :label="scope.row.name">优先</el-radio>
                </template>
            </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer" style="">
            <el-button @click="dialogSetState = false">取 消</el-button>
            <el-button type="primary" @click="onSet()">确 定</el-button>
        </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogReleaseState" class="my_dialog_set" :show-close="false" :close-on-click-modal="false">
        <div>
            <div>版本号：{{releaseVersion}}</div>
            <div v-for="(item,index) in releaseInfo" :key="index">
                <div>名称：{{item.version_name}}</div>
                <div>发布渠道：{{item.push_mod}}</div>
            </div>
            <div>点击确认后，系统包将分发给上述渠道</div>
        </div>
        <div slot="footer" class="dialog-footer" style="">
            <el-button @click="dialogReleaseState = false">取 消</el-button>
            <el-button type="primary" @click="determine()">确 定</el-button>
        </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogUpdate" class="my_dialog_update" :show-close="false" :close-on-click-modal="false">
        <div class="dialog_div" v-loading="loading2" element-loading-text="上传中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
            <div class="dialog_div_con">
                <div class="dialog_div_title" style="text-align:center">修改文件描述</div>
                <div class="dialog_div_item">
                    <div class="item_l">文件描述：</div>
                    <div>
                        <el-input v-model="updateFrom.rom_desc" placeholder="请输入内容"></el-input>
                    </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer" style="">
                <el-button @click="dialogUpdate = false">取 消</el-button>
                <el-button type="primary" @click="onUpdate()">确 定</el-button>
            </div>
        </div>
    </el-dialog>

</section>
</template>

<script>
import tableBarActive from "../../components/tableBarActive";

import pageNation from "../../components/pageNation";
import formInput from "../../components/formInput";
import genderSelector from "../../components/genderSelector";
import dateTimePicker from "../../components/dateTimePicker";
import myDropdown from "../../components/myDropdown";
import myAlert from "../../components/myAlert";
import myDatanums from "../../components/myDatanums";
import {
  updateNodeConfigtest,
  queryRom,
  saveRom,
  deleteRom,
  findRomById,
  updateRom,
  getpacketbyversion,
  publish,
  updateMod,
  uploadpfts,
  hostUrl
} from "../../api/api.js";
import common from "../../common/js/util.js";
import echarts from "echarts";

// import FileSaver from 'file-saver'
// import XLSX from 'xlsx'

export default {
  data() {
    return {
      uploadList: [
        {
          showType: false,
          info: {}
        }
      ],
      uploadsize: 1,
      tableList: 3,
      dialogFormState: false,
      uploadinfoState1: false,
      uploadinfoState2: false,
      uploadinfoState3: false,
      dialogReleaseState: false,
      dialogSetState: false,
      dialogUpdate: false,
      loading2: false,
      tableData11: [],
      rowHeader: [
        // 未做任何格式化处理的数据
        {
          prop: "id",
          label: "文件ID"
        },
        {
          prop: "version_name",
          label: "包名",
          width: "150"
        },
        {
          prop: "equip_type",
          label: "包类型",
          width: "100"
        },
        {
          prop: "rom_size",
          label: "文件大小",
          formatter: "formatterSize"
        },
        {
          prop: "md5",
          label: "md5",
          width: "150"
        },
        {
          prop: "hashid",
          label: "hashid",
          width: "150"
        },
        {
          prop: "rom_version",
          label: "版本号",
          width: "80"
        },
        {
          prop: "rom_desc",
          label: "文件描述",
          width: "150"
        },
        {
          prop: "time_create",
          label: "上传日期",
          width: "150"
        },
        {
          prop: "push_mod",
          label: "发布方式"
        },
        {
          prop: "time_update",
          label: "最近发布日期",
          width: "150"
        }
      ],
      tableOption: {
        label: "操作",
        width: "250",
        options: [
          {
            label: "删除",
            type: "danger",
            methods: "toDelete"
          },
          {
            label: "修改",
            type: "primary",
            methods: "toChange"
          },
          {
            label: "设置发布渠道",
            type: "success",
            methods: "toSet"
          },
          {
            label: "发布",
            type: "info",
            methods: "toRelease"
          }
        ]
      },
      pager: {
        count: 40,
        page: 1,
        rows: 10
      },
      alertNum: 0,
      dataNum: "",
      clomnSelection: false,
      uploadinfo1: {},
      uploadinfo2: {},
      uploadinfo3: {},
      arr: [
        {
          name: "1",
          types: "HTTP"
        },
        {
          name: "2",
          types: "PTFS"
        }
      ],
      textareaText: "添加版本描述",
      pushType: "HTTP",
      setArr: [],
      radio: "1",
      newObject1: {},
      newObject2: {},
      newObject3: {},
      updateFrom: {
        version_name: "",
        rom_desc: "",
        rom_size: "",
        md5: "",
        rom_version: "",
        rom_url: "",
        time_create: "",
        push_mod: "",
        time_update: ""
      },
      releaseInfo: [],
      releaseVersion: "",
      dialogStatus: "",
      perNum: 0,
      widthData: 0
    };
  },
  mounted: function() {
    this.getinfo();
    // this.drawLine();
    // this.drawColumn();

    // 绘制图表
  },

  methods: {
    plus() {
      this.uploadsize++;
      let obj = {
        showType: false,
        info: {}
      };
      this.uploadList.push(obj);
    },
    //发布设置跳转
    golink() {
      this.$router.push({
        path: "/SysVersion1"
      });
    },
    //上传到PTFS
    Reonload(val, indexTab) {
      let param = new Object();

      param.rom_url = val.rom_url[indexTab];
      param.md5 = val.md5[indexTab];
      uploadpfts(param)
        .then(res => {
          if (res.status != 0) {
            this.$message({
              message: `${res.msg}`,
              type: "error"
            });
          } else {
            this.$message({
              type: "success",
              message: "上传成功"
            });
            this.getinfo();
          }
        })
        .catch(error => {
          this.$message({
            message: "网络出错，请重新请求",
            type: "error"
          });
        });
    },

    toDelete(val) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let param = new Object();
          console.log(val);
          param.rom_version = val.rom_version;
          deleteRom(param)
            .then(res => {
              console.log(res);
              if (res.status != 0) {
                this.$message({
                  message: `${res.msg}`,
                  type: "error"
                });
              } else {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getinfo();
              }
            })
            .catch(error => {
              this.$message({
                message: "网络出错，请重新请求",
                type: "error"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //修改
    toChange(val) {
      this.dialogUpdate = true;
      let param = new Object();
      param.rom_version = val.rom_version;
      findRomById(param)
        .then(res => {
          this.updateFrom = res.result;
        })
        .catch(error => {
          this.$message({
            message: "网络出错，请重新请求",
            type: "error"
          });
        });
    },
    //发布时查询展示信息
    toRelease(val) {
      this.dialogReleaseState = true;
      let param = new Object();
      param.version = val.rom_version;
      getpacketbyversion(param)
        .then(res => {
          //this.updateFrom = res.result
          console.log(res);
          this.releaseVersion = val.rom_version;
          this.releaseInfo = res.result.cols;
        })
        .catch(error => {
          this.$message({
            message: "网络出错，请重新请求",
            type: "error"
          });
        });
    },
    //设置发布渠道
    toSet(val) {
      this.dialogSetState = true;

      this.releaseVersion = val.rom_version;
    },

    //确定选中发布渠道方式
    onSet() {
      this.dialogSetState = false;
      if (this.radio == 1) {
        this.pushType = "HTTP";
      } else {
        this.pushType = "PTFS";
      }
      let param = new Object();
      param.rom_version = this.releaseVersion;
      param.push_mod = this.pushType;
      updateMod(param)
        .then(res => {
          if (res.status != 0) {
            this.$message({
              message: `${res.msg}`,
              type: "error"
            });
          } else {
            this.$message({
              type: "success",
              message: "修改发布渠道成功"
            });
            this.getinfo();
          }
        })
        .catch(error => {
          this.$message({
            message: "网络出错，请重新请求",
            type: "error"
          });
        });
    },
    handleSizeChange(val) {},
    handleCurrentChange(val) {
      this.getinfo();
    },

    dialogFormVisible() {
      this.dialogFormState = true;
    },
    //确定发布
    determine() {
      this.dialogReleaseState = false;
      let param = new Object();
      param.version = this.releaseVersion;
      publish(param)
        .then(res => {
          if (res.status != 0) {
            this.$message({
              message: `${res.msg}`,
              type: "error"
            });
          } else {
            this.$message({
              type: "success",
              message: "发布成功!"
            });
            this.getinfo();
          }
        })
        .catch(error => {
          this.$message({
            message: "网络出错，请重新请求",
            type: "error"
          });
        });
    },

    //获取页面表格数据
    getinfo() {
      let param = new Object();
      param.page = this.pager.page - 1;
      queryRom(param)
        .then(res => {
          if (res.status != 0) {
            this.$message({
              message: `${res.msg}`,
              type: "error"
            });
          } else {
            let nowarr = res.result.cols;
            let nowarractive = res.data;

            let nowarractives = res.result.cols;
            let nowarrLength =
              res.result.page * 10 +
              nowarractives.length +
              res.result.les_count;
            this.pager.count = nowarrLength;
            this.dataNum = nowarrLength;

            this.pager.page = res.result.page + 1;
            for (var i = 0; i < nowarractive.length; i++) {
              nowarractive[i].time_create = this.common.getTimes(
                parseInt(nowarractive[i].time_create * 1000)
              );
              nowarractive[i].time_update = this.common.getTimes(
                parseInt(nowarractive[i].time_update * 1000)
              );

              var sizearr = nowarractive[i].rom_size;
              for (var j = 0; j < sizearr.length; j++) {
                nowarractive[i].rom_size[j] = this.common.formatByteActive(
                  sizearr[j]
                );
              }
            }
            this.tableData = nowarr;
            this.tableData11 = nowarractive;
            console.log(this.tableData1);
          }
        })
        .catch(error => {
          this.$message({
            message: "网络出错，请重新请求",
            type: "error"
          });
        });
    },
    //确定上传
    onUpload() {
      console.log(this.uploadList);
      let param = new Object();
      let data = [];
      for (var i = 0; i < this.uploadList.length; i++) {
        data.push(this.uploadList[i].info);
      }
      param.data = data;
      //data=this.uploadList

      //   let nowarr1 = Object.keys(this.newObject1);
      //   let nowarr2 = Object.keys(this.newObject2);
      //   let nowarr3 = Object.keys(this.newObject3);
      //   if (nowarr1.length > 0) {
      //     this.newObject1.rom_desc = this.textareaText;
      //     data.push(this.newObject1);
      //   }
      //   if (nowarr2.length > 0) {
      //     this.newObject2.rom_desc = this.textareaText;
      //     data.push(this.newObject2);
      //   }
      //   if (nowarr3.length > 0) {
      //     this.newObject3.rom_desc = this.textareaText;
      //     data.push(this.newObject3);
      //   }
      param.data = data;
      console.log(param);

      this.dialogFormState = false;
      this.dialogUpdate = false;
      this.uploadsize = 1;
      saveRom(param)
        .then(res => {
          if (res.status == -6) {
            this.$message({
              message: "上传包重复，请仔细检阅后重新上传",
              type: "error"
            });
            this.common.monitoringLogs("新增", "新增ROM升级包", 0);
          } else {
            this.$message({
              type: "success",
              message: "新增i成功!"
            });
            this.getinfo();
            this.common.monitoringLogs("新增", "新增ROM升级包", 1);
          }
        })
        .catch(error => {
          this.$message({
            message: "新增失败",
            type: "error"
          });
          this.common.monitoringLogs("新增", "新增ROM升级包", 0);
        });
    },
    //确定修改
    onUpdate() {
      this.dialogUpdate = false;
      let param = new Object();
      param = this.updateFrom;
      updateRom(param)
        .then(res => {
          if (res.status != 0) {
            this.$message({
              message: "上传包重复，请仔细检阅后重新上传",
              type: "error"
            });
          } else {
            this.$message({
              type: "success",
              message: "修改成功"
            });
          }
          this.getinfo();
        })
        .catch(error => {
          this.$message({
            message: "网络出错，请重新请求",
            type: "error"
          });
        });
    },
    //分偏上传
    upFile(item) {
      let _this = this;

      var file = document.getElementById("f" + item);
      var f = file.files[0];

      if (f == undefined) {
        this.$message({
          type: "warning",
          message: "请选择要上传的文件"
        });
        return false;
      }
      this.disableStatus = true;
      var totalSize = f.size;
      if (totalSize == 0) {
        this.$message({
          message: "请选择文件SIZE大于0文件",
          type: "success"
        });
        return false;
      }
      // let tempstr = (f.name).search("full") != -1
      // if (tempstr == false) {
      //     this.$message({
      //         type: "warning",
      //         message: "上传文件格式错误，一般带有full后缀，如1.0.0_full.zip"
      //     });
      //     return false
      // }

      this.disableStatus = true;
      var totalSize = f.size;
      var len = 2 * 1024 * 1024;
      var tota_temp = Math.ceil(totalSize / len);
      var start = 0;
      var end = start + len;
      var index = 1;

      var blobSlice =
        File.prototype.mozSlice ||
        File.prototype.webkitSlice ||
        File.prototype.slice;

      var fileReader = new FileReader();

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
        var url = hostUrl +"/admin/upload";
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
                //        _this.widthData = Math.floor(index / tota_temp * 100);
                // _this.perNum = Math.floor(index / tota_temp * 100)
                document.getElementById("loading" + item).style.width =
                  Math.floor(index / tota_temp * 100) + "%";
                document.getElementById("per" + item).innerHTML = Math.floor(
                  index / tota_temp * 100
                );
                sliceandpost();
              } else if (headers.status == 1) {
                document.getElementById("loading" + item).style.width =
                  100 + "%";
                document.getElementById("per" + item).innerHTML = 100;
                //         _this.widthData = 100
                // _this.perNum = 100
                // document.getElementById('result').innerHTML = "上传成功:" + headers.msg
                document.getElementById("result" + item).innerHTML =
                  "上传成功:" + headers.msg;
                let itemActive = item - 1;
                _this.uploadList[itemActive].showType = true;
                console.log(_this.uploadList[itemActive]);
                _this.uploadList[itemActive].info = headers;

                console.log(_this.uploadList);
                _this.sdkUrl = headers.url;
                _this.disableStatus = false;
                // _this.uploadinfoState1 = true
                // console.log(headers)
                _this.uploadList[itemActive].info.equip_type = headers.type;
                _this.uploadList[itemActive].info.rom_version = headers.version;
                _this.uploadList[itemActive].info.version_name = headers.name;
                _this.uploadList[itemActive].info.rom_url = headers.url;
                _this.uploadList[itemActive].info.rom_size = headers.size;
                _this.uploadList[itemActive].info.md5 = headers.md5;
                _this.uploadList[itemActive].info.push_mod = _this.pushType;
                _this.uploadList[itemActive].info.hashid = headers.hashid;
                _this.uploadList[itemActive].info.rom_desc = _this.textareaText;
                // _this.uploadinfo1 = headers;
              } else if (headers.status == -900) {
                _this.$message({
                  type: "error",
                  message: `${headers.msg}`
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
    upFile1() {
      let _this = this;

      var file = document.getElementById("f1");
      var f = file.files[0];
      if (f == undefined) {
        this.$message({
          type: "warning",
          message: "请选择要上传的文件"
        });
        return false;
      }
      this.disableStatus = true;
      var totalSize = f.size;
      var len = 2 * 1024 * 1024;
      var tota_temp = Math.ceil(totalSize / len);
      var start = 0;
      var end = start + len;
      var index = 1;

      var blobSlice =
        File.prototype.mozSlice ||
        File.prototype.webkitSlice ||
        File.prototype.slice;

      var fileReader = new FileReader();

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
        var url = hostUrl + "/admin/upload";
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
                document.getElementById("loading1").style.width =
                  Math.floor(index / tota_temp * 100) + "%";
                document.getElementById("per1").innerHTML = Math.floor(
                  index / tota_temp * 100
                );
                sliceandpost();
              } else if (headers.status == 1) {
                document.getElementById("result1").innerHTML =
                  "上传成功:" + headers.msg;
                _this.sdkUrl = headers.url;
                _this.disableStatus = false;
                _this.uploadinfoState2 = true;
                console.log(headers);
                _this.newObject2.equip_type = headers.type;
                _this.newObject2.rom_version = headers.version;
                _this.newObject2.version_name = headers.name;
                _this.newObject2.rom_url = headers.url;
                _this.newObject2.rom_size = headers.size;
                _this.newObject2.md5 = headers.md5;
                _this.newObject2.push_mod = _this.pushType;
                _this.newObject2.hashid = headers.hashid;
                _this.uploadinfo2 = headers;
              } else if (headers.status == -900) {
                _this.$message({
                  type: "error",
                  message: `${headers.msg}`
                });
              }
            } else {
              alert("Problem retrieving XML data:" + xhr.statusText);
            }
          }
        }
      }
      sliceandpost();
    }
  },

  components: {
    tableBarActive: tableBarActive,
    pageNation: pageNation,
    formInput: formInput,
    genderSelector: genderSelector,
    dateTimePicker: dateTimePicker,
    myDropdown: myDropdown,
    myAlert: myAlert,
    myDatanums: myDatanums
  }
};
</script>

<style lang="less">
.myself-container {


  #my_dialogForm {
    .upload-demo {
      margin-left: 0px;
    }

    .el-dialog {
      width: 35%;

      .dialog-footer {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
        margin-bottom: 20px;
      }

      .el-dialog__body {
        padding: 0px;
        padding-bottom: 0px;
      }
    }

    .el-upload-dragger .el-icon-upload {
      font-size: 36px;
      line-height: 20px;
    }
  }

  .my_dialog_release {
    .el-dialog {
      width: 20%;

      .el-dialog__body {
        padding: 0px 20px;
        padding-bottom: 0px;
      }

      .el-dialog__header {
        padding: 0px;
      }

      .el-dialog__footer {
        text-align: center;

        .el-button {
          padding: 6px 10px;
        }
      }
    }
  }

  .my_dialog_set {
    .el-dialog {
  

      .el-dialog__body {
        padding: 0px 20px;
        padding-bottom: 0px;
      }

      .el-dialog__footer {
        text-align: center;

        .el-button {
          padding: 6px 10px;
        }
      }
    }
  }

  .my_dialog_update {
    .el-dialog {
      width: 30%;

      .el-dialog__body {
        padding: 0px;
      }
    }

    .dialog_div {
      .dialog_div_item {
        width: 100%;
        height: auto;
        overflow: hidden;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 10px;

        .item_l {
          width: 90px;
        }

        .el-input {
          width: 360px;
        }
      }

      .dialog-footer {
        margin-top: 15px;
        text-align: center;
        margin-bottom: 15px;
      }

      .el-upload-dragger {
        width: 450px;
        height: 100px;
      }
    }
  }

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

  .device_form {
  

    .el-form-item {
      margin-bottom: 0px;
    }

    .row_active {
      margin-top: 20px;
    }

    .div_show {
      width: auto;
      display: flex;
      height: 40px;
      justify-content: center;
      align-items: center;
      color: #409eff;
      cursor: pointer;
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

.dialog_div {
  width: 100%;
  height: auto;
  overflow: hidden;

  .dialog_div_con {
    width: 100%;
    height: auto;
    overflow: hidden;
    padding-left: 20px;
    box-sizing: border-box;
  }

  .dialog_div_title {
    width: 100%;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    font-weight: bold;
    margin-top: 10px;
  }

  .dialog_div_upload {
    width: 100%;
    height: auto;
    overflow: hidden;
    display: flex;
    justify-content: flex-start;

    .el-upload-dragger {
      width: 260px;
      height: 75px;
    }

    .el-upload-dragger .el-icon-upload {
      margin-top: 10px;
    }

    .el-upload__tip {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .el-button {
        padding: 7px 10px;
        margin-left: 10px;
      }
    }
  }

  .dialog_div_warning {
    font-size: 12px;
    color: red;
    height: 30px;
    line-height: 30px;
    width: 100%;
  }

  .dialog_div_uploadinfo {
    width: auto;
    height: auto;
    overflow: hidden;
    padding: 10px;
    font-size: 12px;
    margin-top: 0px;
    width: 400px;
    margin: 0 auto;
  }

  .dialog_div_desc {
    width: 90%;
    margin-top: 20px;
    height: auto;
    overflow: hidden;
    padding-left: 20px;
    box-sizing: border-box;
    margin: 0 auto;
    margin-bottom: 20px;

    textarea {
      width: 255px;
      padding: 5px 5px;
      font-family: "微软雅黑";
      height: 60px;
      border: 1px solid #999999;
      border-radius: 5px;
      resize: none;
    }
  }

  .el-upload-list__item:first-child {
    margin-top: 0px;
  }
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.el-table th > .cell {
  text-align: center;
}

.el-table .cell {
  text-align: center;
}

.device-echars {
  width: 100%;
  height: 300px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

h2 {
  text-align: center;
  padding: 30px;
  font-size: 18px;
}

#device_echars_l {
  width: 50%;
  height: 300px;
  margin: 0 auto;
}

#device_echars_r {
  width: 50%;
  height: 300px;
  margin: 0 auto;
}

.button_active {
  padding: 2px 5px;
  margin-left: 10px;
  font-size: 10px;
}

.add-sdk {
  width: 100%;
  height: auto;
  margin: 0 auto;

  .item {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-flow: row;
    align-items: center;

    .choose-file {
      width: 130px;
      height: 25px;
      position: absolute;
      padding: 2px;
      z-index: 99;
    }

    .choose-input {
      position: absolute;
      z-index: 100;
      width: auto;
      // opacity: 0;
      height: auto;
    }

    .onchoose-file {
      padding: 7px 20px;
      margin-top: 35px;
    }

    .item_l {
      width: 100px;
      text-align: right;
      margin-right: 10px;
    }
  }
}
</style>
