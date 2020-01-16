import App from './App'

import store from './store/index'
import Vuex from 'vuex'

Vue.use(Vuex);

//import './assets/fonts/iconfont.css'
//import './assets/inco-frent/iconfont.js'

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
    console.log(store.state.userInfo.id)
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
        var newRoutes = [{
                path: "/",
                component: 'Home',
                name: "后台管理",
                icon: 'el-icon-menu',
                children: [{
                    path: "/",
                    name: "后台账户管理",
                    component: 'accountManagement',
                    icon: 'el-icon-menu',
                    meta: {
                        requireAuth: true
                    }
                }]
            },
            {
                path: "/a",
                component: 'Home',
                name: "用户管理",
                icon: 'el-icon-menu',
                children: [{
                        path: "/userCenter",
                        name: "注册用户",
                        component: 'userCenter',
                        icon: 'el-icon-menu',
                        meta: {
                            requireAuth: true
                        }
                    },
                    {
                        path: "/userInfo",
                        name: "用户个人详情",
                        component: 'userInfo',
                        icon: 'el-icon-menu',
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
                icon: 'el-icon-menu',
                children: [{
                        path: "/deviceInfo",
                        name: "设备信息",
                        component: 'deviceInfo',
                        icon: 'el-icon-menu',
                        meta: {
                            requireAuth: true
                        }
                    },
                    {
                        path: "/devicePower",
                        name: "设备算力",
                        component: 'devicePower',
                        icon: 'el-icon-menu',
                        meta: {
                            requireAuth: true
                        }

                    },
                    {
                        path: "/deviceActivation",
                        name: "设备激活",
                        component: 'deviceActivation',
                        icon: 'el-icon-menu',
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
                icon: 'el-icon-menu',
                children: [{
                        path: "/releaseAppliction",
                        name: "应用发布管理",
                        component: 'releaseAppliction',
                        icon: 'el-icon-menu',
                        meta: {
                            requireAuth: true
                        }
                    },
                    {
                        path: "/addAppliction",
                        name: "应用新增管理",
                        component: 'addAppliction',
                        icon: 'el-icon-menu',
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
                icon: 'el-icon-menu',
                children: [{
                        path: "/pointsDetails",
                        name: "积分明细",
                        component: 'pointsDetails',
                        icon: 'el-icon-menu',
                        meta: {
                            requireAuth: true
                        }
                    },
                    {
                        path: "/income",
                        name: "收益明细",
                        component: 'income',
                        icon: 'el-icon-menu',
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
                icon: 'el-icon-menu',
                children: [

                    {
                        path: "/PushSetting",
                        name: "推送设置",
                        component: 'PushSetting',
                        icon: 'el-icon-menu',
                        meta: {
                            requireAuth: true
                        }
                    }, {
                        path: "/PushRecord",
                        name: "推送记录",
                        component: 'PushRecord',
                        icon: 'el-icon-menu',
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
                icon: 'el-icon-menu',
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
                        icon: 'el-icon-menu',
                        meta: {
                            requireAuth: true
                        }
                    },
                    {
                        path: "/RegionAnalysis",
                        name: "地域分析",
                        component: 'RegionAnalysis',
                        icon: 'el-icon-menu',
                        meta: {
                            requireAuth: true
                        }
                    },
                    {
                        path: "/VersionAnalysis",
                        name: "版本分析",
                        component: 'VersionAnalysis',
                        icon: 'el-icon-menu',
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
                        icon: 'el-icon-menu',
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
                icon: 'el-icon-menu',
                children: [{
                        path: "/SysManageMiddle",
                        name: "APP应用版本管理",
                        component: 'SysManageMiddle',
                        icon: 'el-icon-menu',
                        children: [{
                                path: "/AppVersion",
                                name: "版本发布管理",
                                component: 'AppVersion',
                                icon: 'el-icon-menu',
                                meta: {
                                    requireAuth: true
                                }
                            },
                            {
                                path: "/AppManage",
                                name: "应用包管理",
                                component: 'AppManage',
                                icon: 'el-icon-menu',
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
                        icon: 'el-icon-menu',
                        children: [{
                                path: "/SysVersion1",
                                name: "设备系统版本管理",
                                component: 'SysVersion1',
                                icon: 'el-icon-menu',
                                meta: {
                                    requireAuth: true
                                }
                            },
                            {
                                path: "/SysManage",
                                name: "系统包管理",
                                component: 'SysManage',
                                icon: 'el-icon-menu',
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
                icon: 'el-icon-menu',
                children: [{
                    path: "/Log",
                    name: "操作日志",
                    component: 'Log',
                    icon: 'el-icon-menu',
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