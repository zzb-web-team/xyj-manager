<template>
  <section class="myself-container">
    <div class="goback" style="width: 100%;line-height: 50px;">
      <div style="margin-top:20px;">

        <el-button type="primary" class="el-upload__tip" @click="$router.go(-1)">返回</el-button>
      </div>

    </div>
    <div class="device_form device_form_detail">
      <div class="detail_left">
        <div class="item itemactiveimg">
          <div class="item-l">
            <img :src="cropImg" class="pre-img" width="100" height="100" /> </div>
          <div class="item-r">{{ruleForm.app_name}}</div>
        </div>
        <div class="item">
          <div class="item-l">应用名称：{{ruleForm.app_name}}</div>
          <div class="item-r">一级分类：{{oneType}}</div>
        </div>
        <div class="item">
          <div class="item-l">版本号{{ruleForm.app_version}}</div>
          <div class="item-r">二级分类：{{twoType}}</div>
        </div>
        <div class="item">
          <div class="item-l">应用包名：{{ruleForm.pkg_name}}</div>
          <div class="item-r">应用简介：{{ruleForm.snapshot}}</div>
        </div>
        <div class="item">
          <div class="item-l">应用大小：{{ruleForm.app_size}}</div>
          <div class="item-r">下载次数：{{ruleForm.dl_count}}</div>
        </div>
        <div class="item">
          <div class="item-l">开发者：{{ruleForm.developer}}</div>
          <div class="item-r">应用评分：{{(ruleForm.app_score)/10}}</div>
        </div>
        <div class="item itemactive">
          <div class="item-l">应用详情：{{ruleForm.app_brief}}</div>
        </div>
      </div>
      <div class="detail_right">
        <div>
          <el-button type="primary" size="small" @click="goEdit">编辑</el-button>
          <el-button type="primary" size="small" @click="godelete" v-show="pub_status">删除</el-button>
        </div>
        <div class="block">
          <el-carousel trigger="click" height="250px">
            <el-carousel-item class="lun_img" v-for="item in imgs" v-bind:key="item">
              <img :src="item" />
            </el-carousel-item>

          </el-carousel>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import tableBar from "../../components/tableBar";
import mySearch from "../../components/mySearch";
import pageNation from "../../components/pageNation";
import { get_app_by_appid, del_app, get_apptype } from "../../api/api";
import common from "../../common/js/util.js";

export default {
  data() {
    return {
      cropImg: "",
      imgs: [],

      tableOption: {
        label: "操作",
        width: 200,
        options: [
          {
            label: "发布",
            type: "primary",
            methods: "freeze",
          },
          {
            label: "下架",
            type: "danger",
            methods: "clickOff",
          },
          {
            label: "编辑",
            type: "danger",
            methods: "clickOff",
          },
          {
            label: "详情",
            type: "danger",
            methods: "clickOff",
          },
        ],
      },
      pager: {
        count: 0,
        page: 1,
        rows: 100,
      },
      ruleForm: {},
      optionsAll: [],
      first: {},
      oneType: "",
      twoType: "",

      linkappid: "",
      pub_status: false,
    };
  },
  mounted: function() {
    //this.queryUsersTotal();
    // this.queryUserList();
    this.getpptypeInfo();
    // this.queryAppInfo()
    this.linkappid = this.$route.query.linkappid;

    if (this.$route.query.pub_status == 1) {
      this.pub_status = false;
    } else {
      this.pub_status = true;
    }
  },
  methods: {
    //获取一级分类
    getpptypeInfo() {
      let param = {};
      get_apptype(param)
        .then(res => {
          if (res.status == 0) {
            this.optionsAll = res.data;
            var second = {};
            let _this = this;
            var data = this.optionsAll.filter(function(item) {
              _this.first[item.type] = {};
              _this.first[item.type].name = item.name;
              _this.first[item.type].sub = {};
              for (var i = 0; i < item.sub.length; i++) {
                _this.first[item.type].sub[item.sub[i].sub_type] =
                  item.sub[i].sub_name;
              }
            });

            this.queryAppInfo();
          }
        })
        .catch(error => {
        });
    },
    //删除
    godelete() {
      let param = new Object();
      param.app_id = this.linkappid;
      del_app(param)
        .then(res => {
          if (res.status == 0) {
            this.$message({
              message: "删除成功",
              type: "success",
            });
            this.common.monitoringLogs("删除", "删除应用管理", 1);
            this.$router.push({
              path: "/marketindex",
              query: {
                linkappid: this.linkappid,
              },
            });
          } else {
            this.$message({
              message: "删除失败",
              type: "error",
            });
            this.common.monitoringLogs("删除", "删除应用管理", 0);
          }
        })
        .catch(error => {
          this.$message({
            message: "后台服务出错",
            type: "error",
          });
          this.common.monitoringLogs("删除", "删除应用管理", 0);
        });
    },
    //查询APP信息
    queryAppInfo() {
      let param = new Object();
      param.app_id = this.$route.query.linkappid;
      get_app_by_appid(param)
        .then(res => {
          if (res.status == 0) {
            this.cropImg = res.data.app_icon;
            this.imgs = res.data.app_pic;
            this.ruleForm = res.data;
            if (this.first[this.ruleForm.app_type1].name) {
              this.oneType = this.first[this.ruleForm.app_type1].name;
            }
            if (
              this.first[this.ruleForm.app_type1].sub[this.ruleForm.app_type2]
            ) {
              this.twoType = this.first[this.ruleForm.app_type1].sub[
                this.ruleForm.app_type2
              ];
            }

          }
        })
        .catch(error => {});
    },
    goEdit() {
      this.$router.push({
        path: "/editmarket",
        query: {
          linkappid: this.linkappid,
        },
      });
    },
  },
  components: {
    pageNation: pageNation,
    tableBar: tableBar,
    mySearch: mySearch,
  },
};
</script>

<style lang="less">
.device_form_detail {
  display: flex;
  justify-content: space-around;
  padding-bottom: 50px;
  height: 500px;

  .detail_left {
    width: 700px;
    .item {
      display: flex;
      justify-content: flex-start;
      margin-top: 10px;
      .item-l {
        width: 300px;
        font-size: 14px;
      }
      .item-r {
        margin-left: 50px;
      }
      &.itemactive {
        .item-l {
          width: 500px;
        }
      }
      &.itemactiveimg {
        .item-r {
          display: flex;
          align-items: center;
        }
      }
    }
  }
  .detail_right {
    width: 500px;
    height: 300px;
    padding-bottom: 50px;
  }
}
.user-title {
  margin-top: 30px;

  .user-item {
    background: #f2f2f2;
    padding: 25px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    flex-direction: column;

    .item-count,
    .item-text {
      display: flex;
      justify-content: center;
    }
  }
}

.myself-container {
  .device_form {
    box-sizing: border-box;

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

.addaccout {
  .title {
    width: 100%;
    text-align: center;
  }

  .el-dialog__body {
    padding: 0px;
  }

  .el-form-item {
    display: flex;
  }

  .el-form--label-left .el-form-item__label {
    text-align: right;
    width: 90px;
  }

  .el-form-item__error {
    margin-left: 80px;
  }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
