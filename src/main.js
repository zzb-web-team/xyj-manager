import App from './App'

import store from './store/index'
import Vuex from 'vuex'

Vue.use(Vuex);

import './assets/inon_frent/iconfont.css'

import VCharts from 'v-charts'
import common from "./common/js/util.js";
Vue.prototype.common = common
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
import router from './routes'


//---start

import NotFound from './views/404.vue'
import accountManagement from './views/account/accountManagement.vue'
import userCenter from './views/user/userCenter.vue'
import userInfo from './views/user/useInfo.vue'
import deviceInfo from './views/device/deviceInfo.vue'
import middle from './views/device/middle.vue'
import devicePower from './views/device/devicePower.vue'
import deviceActivation from './views/device/deviceActivation.vue'
import pointsDetails from './views/point/pointsDetails.vue'
import income from './views/point/income.vue'
import addAppliction from './views/application/addAppliction.vue'
import releaseAppliction from './views/application/releaseAppliction.vue'


import PushSetting from './views/push/push_setting.vue'
import PushRecord from './views/push/push_record.vue'
import DeviceAnalysis from './views/analysis/deviceAnalysis.vue'
import RegionAnalysis from './views/analysis/regionAnalysis.vue'
import UserAnalysis from './views/analysis/userAnalysis.vue'
import VersionAnalysis from './views/analysis/versionAnalysis.vue'
import AppVersion from './views/version/appVersion.vue'
import SysVersion1 from './views/version/sysVersion_copy.vue'
import SysManage from './views/version/sysManage.vue'
import SysManage1 from './views/version/sysManage_copy.vue'
import SysManageMiddle from './views/version/middle.vue'
import SysManageMiddleActive from './views/version/middleActive.vue'

import AppManage from './views/version/AppManage.vue'
import Log from './views/log/log.vue'
// import accountInfo from './views/account/accountInfo.vue'
// import accountManagement from './views/account/accountManagement.vue'

import Home from './views/Home.vue'






Vue.use(VCharts)
import echarts from 'echarts'

Vue.prototype.$echarts = echarts
// Vue.use(echarts)

import "babel-polyfill";

import {
    menulistfortree
} from './api/api';
var user = JSON.parse(common.get('userInfo'))
if (user) {
    let param = new Object
    if (store.state.userInfo.id) {
        param.id = store.state.userInfo.id
    }


    menulistfortree(param).then(res => {
        var newRoutes
        var keymap = {
            'Home': Home,
            'accountManagement': accountManagement,
            'userCenter': userCenter,
            'userInfo': userInfo,
            'deviceInfo': deviceInfo,
            'PushSetting': PushSetting,
            'PushRecord': PushRecord,
            'middle': middle,
            'devicePower': devicePower,
            'deviceActivation': deviceActivation,
            'income': income,
            'pointsDetails': pointsDetails,
            'DeviceAnalysis': DeviceAnalysis,
            'RegionAnalysis': RegionAnalysis,
            'UserAnalysis': UserAnalysis,
            'VersionAnalysis': VersionAnalysis,
            'addAppliction': addAppliction,
            'releaseAppliction': releaseAppliction,
            'AppVersion': AppVersion,
            'AppManage': AppManage,
            'SysVersion': AppVersion,
            'SysManage': SysManage,
            'SysManageMiddle': SysManageMiddle,
            'SysManageMiddleActive': SysManageMiddleActive,

            'SysVersion1': SysVersion1,
            'SysManage': SysManage,
            'AppManage': AppManage,
            "Log": Log
            // 'userinformation': userinformation,
            // 'storagepower': storagepower,
            // 'deviceinformation': deviceinformation,
            // 'monitor': monitor,
            // 'detail': detail,
            // 'application': application,
            // 'releasemanagement': releasemanagement,
            // 'storage': storage,
            // 'system': system,
            // 'systemset': systemset,
            // 'recording': recording,
            // 'income': income,
            // 'managementmeun': managementmeun,
            // 'managementuser': managementuser,
            // 'managementauthority': managementauthority,
            // 'middledevive': middledevive,
            // 'applicationmiddle': applicationmiddle,
            // 'systems': systems,
            //'userinformation1':userinformation1, 


        }
        //var newRoutes = res.msg
        var newRoutes = [
            {
                path: "/",
                component: 'Home',
                name: "后台管理",
                icon: 'iconfont icon-houtaiguanli',
                titleActive:"账户",
                children: [{
                    path: "/",
                    name: "后台账户管理",
                    component: 'accountManagement',
                    icon: 'iconfont icon-dian',
                    meta: {
                        requireAuth: true
                    }
                }]
            },
            {
                path: "/a",
                component: 'Home',
                name: "用户管理",
                icon: 'iconfont icon-yonghu',
                children: [{
                        path: "/userCenter",
                        name: "注册用户",
                        component: 'userCenter',
                        icon: 'iconfont icon-dian',
                        meta: {
                            requireAuth: true
                        }
                    },
                    {
                        path: "/userInfo",
                        name: "用户个人详情",
                        component: 'userInfo',
                        icon: 'iconfont icon-dian',
                        meta: {
                            requireAuth: true
                        }
                    },

                ]
            },
            {
                path: "/c",
                component: 'Home',
                name: "设备管理",
                titleActive:"设备",
                icon: 'iconfont icon-shebeiguanli1',
                children: [{
                        path: "/deviceInfo",
                        name: "设备信息",
                        component: 'deviceInfo',
                        icon: 'iconfont icon-dian',
                        meta: {
                            requireAuth: true
                        }
                    },
                    {
                        path: "/devicePower",
                        name: "设备算力",
                        component: 'devicePower',
                        icon: 'iconfont icon-dian',
                        meta: {
                            requireAuth: true
                        }

                    },
                    {
                        path: "/deviceActivation",
                        name: "设备激活",
                        component: 'deviceActivation',
                        icon: 'iconfont icon-dian',
                        meta: {
                            requireAuth: true
                        }

                    },

                ]
            },
            {
                path: "/f",
                component: 'Home',
                name: "盒子应用管理",
                titleActive:false,
                icon: 'iconfont icon-dianbozhibov1213',
                children: [{
                        path: "/releaseAppliction",
                        name: "应用发布管理",
                        component: 'releaseAppliction',
                        icon: 'iconfont icon-dian',
                        meta: {
                            requireAuth: true
                        }
                    },
                    {
                        path: "/addAppliction",
                        name: "应用新增管理",
                        component: 'addAppliction',
                        icon: 'iconfont icon-dian',
                        meta: {
                            requireAuth: true
                        }

                    },

                ]
            },
            {
                path: "/d",
                component: 'Home',
                name: "积分管理",
                titleActive:"积分",
                icon: 'iconfont icon-jifenguanli',
                children: [{
                        path: "/pointsDetails",
                        name: "积分明细",
                        component: 'pointsDetails',
                        icon: 'iconfont icon-dian',
                        meta: {
                            requireAuth: true
                        }
                    },
                    {
                        path: "/income",
                        name: "收益明细",
                        component: 'income',
                        icon: 'iconfont icon-dian',
                        meta: {
                            requireAuth: true
                        }

                    },

                ]
            },
            {
                path: "/b",
                component: 'Home',
                name: "推送设置",
                titleActive:"内容推送",
                icon: 'iconfont icon-tuisongguanli',
                children: [

                    {
                        path: "/PushSetting",
                        name: "推送设置",
                        component: 'PushSetting',
                        icon: 'iconfont icon-dian',
                        meta: {
                            requireAuth: true
                        }
                    }, {
                        path: "/PushRecord",
                        name: "推送记录",
                        component: 'PushRecord',
                        icon: 'iconfont icon-dian',
                        meta: {
                            requireAuth: true
                        }
                    },
                ]
            },

            {
                path: "/e",
                component: 'Home',
                name: "数据分析",
                titleActive:"数据分析",
                icon: 'iconfont icon-shujufenxi',
                children: [
                    // {
                    // path: "/UserAnalysis",
                    // name: "APP用户分析",
                    // icon: 'el-icon-menu',
                    // children: [
                    {
                        path: "/UserAnalysis",
                        name: "APP用户分析",
                        component: 'UserAnalysis',
                        icon: 'iconfont icon-dian',
                        meta: {
                            requireAuth: true
                        }
                    },
                    {
                        path: "/RegionAnalysis",
                        name: "地域分析",
                        component: 'RegionAnalysis',
                        icon: 'iconfont icon-dian',
                        meta: {
                            requireAuth: true
                        }
                    },
                    {
                        path: "/VersionAnalysis",
                        name: "版本分析",
                        component: 'VersionAnalysis',
                        icon: 'iconfont icon-dian',
                        meta: {
                            requireAuth: true
                        }
                    },
                    // ]
                    // },
                    {
                        path: "/DeviceAnalysis",
                        name: "设备在线分析",
                        component: 'DeviceAnalysis',
                        icon: 'iconfont icon-dian',
                        meta: {
                            requireAuth: true
                        }
                    }
                ]
            },
            {
                path: "/g",
                component: 'Home',
                name: "版本管理",
                titleActive:"系统版本",
                icon: 'iconfont icon-xitong',
                children: [{
                        path: "/SysManageMiddle",
                        name: "APP应用版本管理",
                        component: 'SysManageMiddle',
                        icon: 'iconfont icon-banbenguanli',
                        children: [{
                                path: "/AppVersion",
                                name: "版本发布管理",
                                component: 'AppVersion',
                                icon: 'iconfont icon-dian',
                                meta: {
                                    requireAuth: true
                                }
                            },
                            {
                                path: "/AppManage",
                                name: "应用包管理",
                                component: 'AppManage',
                                icon: 'iconfont icon-dian',
                                meta: {
                                    requireAuth: true
                                }
                            },

                        ],
                        meta: {
                            requireAuth: true
                        }
                    },
                    {
                        path: "/SysManageMiddleActive",
                        name: "设备系统版本管理",
                        component: 'SysManageMiddleActive',
                        icon: 'iconfont icon-ziyuanguanli',
                        children: [{
                                path: "/SysVersion1",
                                name: "设备系统版本管理",
                                component: 'SysVersion1',
                                icon: 'iconfont icon-dian',
                                meta: {
                                    requireAuth: true
                                }
                            },
                            {
                                path: "/SysManage",
                                name: "系统包管理",
                                component: 'SysManage',
                                icon: 'iconfont icon-dian',
                                meta: {
                                    requireAuth: true
                                }
                            },

                        ],
                        meta: {
                            requireAuth: true
                        }
                    },
                ]
            },
            {
                path: "/h",
                component: 'Home',
                name: "操作管理",
                icon: 'iconfont icon-rizhi',
                children: [{
                    path: "/Log",
                    name: "操作日志",
                    component: 'Log',
                    icon: 'iconfont icon-dian',
                    meta: {
                        requireAuth: true
                    }
                }]
            }

        ]
        var routes = common.trans(newRoutes, keymap)
        var router = new VueRouter({
            routes: routes
        })
        new Vue({
            //el: '#app',
            //template: '<App/>',
            router,
            store,
            //components: { App }
            render: h => h(App)
        }).$mount('#app')
    }).catch(error => {
        console.log(error)
    })

} else {
    new Vue({
        //el: '#app',
        //template: '<App/>',
        router,
        store,
        //components: { App }
        render: h => h(App)
    }).$mount('#app')
}
///--end