<template>
<div class="myownStyle">
    <el-row class="container">
        <el-col :span="24" class="header">
            <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">

                <div><img src="../assets/logo_new.png"></div>
                <div>西柚机后台管理系统</div>
            </el-col>
            <!-- <el-col :span="10">

<div class="tools" @click.prevent="collapse">

<i class="fa fa-align-justify"></i>

</div>

</el-col> -->
            <el-col :span="4" class="userinfo">
                <el-dropdown trigger="hover">
                    <span class="el-dropdown-link userinfo-inner"><img src="../assets/timg.jpg" /> {{sysUserName}}</span>
                    <el-dropdown-menu slot="dropdown">
                        <!-- <el-dropdown-item>我的消息</el-dropdown-item>

<el-dropdown-item>设置</el-dropdown-item> -->
                        <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-col>
        <el-col :span="24" class="main">
            <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
                <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect" unique-opened router>
                    <!-- 一级菜单 -->
                    <template v-for="item in  $router.options.routes" v-if="!item.hidden">
                        <el-submenu v-if="item.children && item.children.length" :index="item.path" :key="item.path">
                            <template slot="title"><i :class="item.icon"></i><span>{{item.name}}</span></template>

                            <!-- 二级菜单 -->
                            <template v-for="itemChild in item.children">
                                <el-submenu v-if="itemChild.children && itemChild.children.length" :index="itemChild.path" :key="itemChild.path">
                                    <template slot="title"><i :class="itemChild.icon"></i><span>{{itemChild.name}}</span></template>

                                    <!-- 三级菜单 -->
                                    <el-menu-item v-for="itemChild_Child in itemChild.children" :index="itemChild_Child.path" :key="itemChild_Child.path">
                                        <i :class="itemChild_Child.icon"></i><span slot="title">{{itemChild_Child.name}}</span></el-menu-item>
                                </el-submenu>

                                <el-menu-item v-else :index="itemChild.path" :key="itemChild.path"><i :class="itemChild.icon"></i><span slot="title">{{itemChild.name}}</span></el-menu-item>
                            </template>
                        </el-submenu>

                        <el-menu-item v-else :index="item.path" :key="item.path"><i :class="item.icon"></i><span slot="title">{{item.name}}</span></el-menu-item>
                    </template>

                </el-menu>

            </aside>
            <section class="content-container">
                <div class="grid-content bg-purple-light">
                    <el-col :span="24" class="breadcrumb-container">
                        <strong class="title">{{$route.name}}</strong>
                        <!-- <el-breadcrumb separator="/" class="breadcrumb-inner">

<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">

{{ item.name }}

</el-breadcrumb-item>

</el-breadcrumb> -->
                    </el-col>
                    <el-col :span="24" class="content-wrapper">
                        <transition name="fade" mode="out-in">
                            <router-view></router-view>
                        </transition>
                    </el-col>
                </div>
            </section>
        </el-col>
    </el-row>
</div>
</template>

<script>
export default {
    data() {
        return {
            sysName: "PTFS管理工具",
            collapsed: false,
            sysUserName: "",
            sysUserAvatar: "",
            form: {
                name: "",
                region: "",
                date1: "",
                date2: "",
                delivery: false,
                type: [],
                resource: "",
                desc: ""
            }
        };
    },
    mounted: function () {
        var user = JSON.parse(this.get("userInfo"));

        this.sysUserName = user.username || "";
    },
    methods: {
        set: function (name, value, days) {
            var d = new Date();

            d.setTime(d.getTime() + 1000 * days);

            window.document.cookie =
                name + "=" + value + ";path=/;expires=" + d.toGMTString();
        },
        get: function (name) {
            var v = window.document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");

            return v ? v[2] : null;
        },
        onSubmit() {
        },
        handleopen() {},
        handleclose() {},
        handleselect: function (a, b) {},

        //退出登录
        logout: function () {
            var _this = this;
            this.$confirm("确认退出吗?", "提示", {
                    type: "warning"
                })
                .then(() => {
                    _this.set("userInfo", "", -1);
                    _this.$store.commit("setUserInfo", {});
                    window.location.href = "./";
                })
                .catch(() => {});
        },
        //折叠导航栏
        collapse: function () {
            this.collapsed = !this.collapsed;
        },
        showMenu(i, status) {
            this.$refs.menuCollapsed.getElementsByClassName(
                "submenu-hook-" + i
            )[0].style.display = status ? "block" : "none";
        }
    }
    // mounted() {

    // 	 var user = sessionStorage.getItem('user');
    // 	if (user) {
    //  	user = JSON.parse(user);
    // 	 	this.sysUserName = user.username || '';
    // 		//this.sysUserAvatar = user.avatar || '';
    // 	}

    // }
};
</script>

<style lang="scss" scoped>
@import "../assets/newstyle.scss";

.container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;

    .el-menu {
        background: #283049 !important;
    }

    .header {
        height: 60px;
        line-height: 60px;
        //	background: $color-primary;
        color: #fff;

        .userinfo {
            text-align: right;
            padding-right: 35px;
            float: right;

            .userinfo-inner {
                cursor: pointer;
                color: #fff;

                img {
                    width: 40px;
                    height: 40px;
                    border-radius: 20px;
                    margin: 10px 0px 10px 10px;
                    float: right;
                }
            }
        }

        .logo {
            //width:230px;
            height: 60px;
            font-size: 22px;
            // padding-left: 20px;
            // padding-right: 20px;
            border-color: rgba(238, 241, 146, 0.3);
            border-right-width: 1px;

            img {
                width: auto;
                float: left;
                margin: 10px 10px 10px 18px;
            }

            .txt {
                color: #fff;
            }
        }

        .logo-width {
            width: 280px;
        }

        .logo-collapse-width {
            width: 60px;
        }

        .tools {
            padding: 0px 23px;
            width: 14px;
            height: 60px;
            line-height: 60px;
            cursor: pointer;
        }
    }

    .main {
        display: flex;
        // background: #324057;
        position: absolute;
        top: 60px;
        bottom: 0px;
        overflow: hidden;

        aside {
            flex: 0 0 230px;
            width: 280px;

            // position: absolute;
            // top: 0px;
            // bottom: 0px;
            .el-menu {
                height: 100%;
            }

            .collapsed {
                width: 60px;

                .item {
                    position: relative;
                }

                .submenu {
                    position: absolute;
                    top: 0px;
                    left: 60px;
                    z-index: 99999;
                    height: auto;
                    display: none;
                }
            }
        }

        .menu-collapsed {
            flex: 0 0 60px;
            width: 60px;
        }

        .menu-expanded {
            flex: 0 0 230px;
            width: 280px;
        }

        .content-container {
            // background: #f1f2f7;
            //flex: 1;
            // position: absolute;
            // right: 0px;
            // top: 0px;
            // bottom: 0px;
            // left: 230px;
            // overflow-y: scroll;
            // padding: 20px;
                -webkit-box-flex: 1;
                  
    -ms-flex: 1;
    flex: 1;
    overflow-y: scroll;
            background: rgba(239, 243, 245, 1);
            width: 100%;

            .grid-content {
                width: 95%;
                margin: 0 auto;
                background: #ffffff;
                // padding:0px 20px;
            }

            .breadcrumb-container {
                height: 60px;
                line-height: 60px;
                background: rgba(239, 243, 245, 1);

                //margin-bottom: 15px;
                .title {
                    width: 200px;
                    float: left;
                    color: #475669;
                }

                .breadcrumb-inner {
                    float: right;
                }
            }

            .content-wrapper {
                background-color: #fff;
                box-sizing: border-box;
                  padding: 0 20px;
            }
        }
    }
}
</style>
