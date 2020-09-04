//新路由
import Login from './views/Login.vue'


import VueRouter from 'vue-router'

import NotFound from './views/404.vue'
import accountManagement from './views/account/accountManagement.vue'
import userCenter from './views/user/userCenter.vue'
import userInfo from './views/user/useInfo.vue'
import deviceInfo from './views/device/deviceInfo.vue'
import middle from './views/device/middle.vue'
import devicePower from './views/device/devicePower.vue'
import deviceActivation from './views/device/deviceActivation.vue'
import deviceMiddle from './views/deviceActive/middle.vue'
import newsd from './views/deviceActive/newsd.vue'
import device_etails from './views/deviceActive/device_etails.vue'
import deviceProcess from './views/deviceActive/deviceprocess.vue'
import reverse_ssh from './views/device/reverse_ssh.vue'


import deviceupload from './views/device/upload.vue'
import pointsmiddle from './views/point/middle.vue'
import pointsDetails from './views/point/pointsDetails.vue'
import income from './views/point/income.vue'
import setparam from './views/point/setparam.vue'
import Applictionmiddle from './views/application/middle.vue'
import addAppliction from './views/application/addAppliction.vue'
import releaseAppliction from './views/application/releaseAppliction.vue'
import PushSetting from './views/push/push_setting.vue'
import PushRecord from './views/push/push_record.vue'
import DeviceAnalysis from './views/analysis/deviceAnalysis.vue'
import Analysismiddle from './views/analysis/middle.vue'
import deviceflow from './views/analysis/deviceflow.vue'
import deviceterminal from './views/analysis/deviceterminal.vue'

import RegionAnalysis from './views/analysis/regionAnalysis.vue'
import UserAnalysis from './views/analysis/userAnalysis.vue'
// import deviceflow from './views/analysis/userAnalysis.vue'
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

import miningmiddle from './views/mining/middle.vue'
import miningindex from './views/mining/miningindex.vue'
import contributionindex from './views/mining/contributionindex.vue'
import powerindex from './views/mining/powerindex.vue'
import devicepower from './views/devicepower/middle.vue'
import powerinfo from './views/devicepower/powerinfo.vue'
import powerdetails from './views/devicepower/powerdetails.vue'
import powermanagement from './views/devicepower/powermanagement.vue'
import helpmiddle from './views/help/middle.vue'
import contentindex from './views/help/contentindex.vue'
import groupindex from './views/help/groupindex.vue'
import marketmiddle from './views/market/middle.vue'
import marketindex from './views/market/marketindex.vue'
import addmarket from './views/market/addmarket.vue'
import marketdetail from './views/market/marketdetail.vue'
import editmarket from './views/market/editmarket.vue'
import marketgroupmiddle from './views/marketgroup/middle.vue'
import marketgroupindex from './views/marketgroup/groupindex.vue'
import marketrelatedindex from './views/marketgroup/relatedindex.vue'


import Home from './views/Home.vue'


Vue.use(VueRouter)


var routes = [{
        path: '/',
        component: Login,
        hidden: true,
        meta: {
            requireAuth: false
        }
    },
    {
        path: "*",
        redirect: "/"
    },
    {
        path: "/a1",
        component: Home,
        name: "西柚机APP管理",
        icon: 'iconfont icon-yonghu',
        children: [{
                path: "/userCenter",
                name: "用户信息",
                component: userCenter,
                icon: 'iconfont icon-dian',
                meta: {
                    requireAuth: true
                }
            },
            {
                path: "/userInfo",
                name: "用户个人详情",
                component: userInfo,
                icon: 'iconfont icon-dian',
                hidden: true,
                meta: {
                    requireAuth: true
                }
            },

            {
                path: "/helpmiddle",
                component: helpmiddle,
                name: "推送设置",
                icon: 'iconfont icon-dian',
                children: [

                    {
                        path: "/PushSetting",
                        name: "推送设置",
                        component: PushSetting,
                        icon: 'iconfont icon-dian',
                        meta: {
                            requireAuth: true
                        }
                    }, {
                        path: "/PushRecord",
                        name: "推送记录",
                        component: PushRecord,
                        icon: 'iconfont icon-dian',
                        meta: {
                            requireAuth: true
                        }
                    },
                ]
            },
            {
                path: "/SysManageMiddle",
                name: "APP应用版本管理",
                component: SysManageMiddle,
                // icon: 'iconfont icon-banbenguanli',
                icon: 'iconfont icon-dian',
                children: [{
                        path: "/AppVersion",
                        name: "版本发布管理",
                        component: AppVersion,
                        icon: 'iconfont icon-dian',
                        meta: {
                            requireAuth: true
                        }
                    },
                    {
                        path: "/AppManage",
                        name: "应用包管理",
                        component: AppManage,
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
        path: "/c1",
        component: Home,
        name: "设备管理",
        icon: 'iconfont icon-shebeiguanli1',
        children: [{
                path: "/deviceInfo",
                name: "设备信息",
                component: deviceInfo,
                icon: 'iconfont icon-dian',
                meta: {
                    requireAuth: true
                }
            },
            {
                path: "/deviceActivation",
                name: "设备激活",
                component: deviceActivation,
                icon: 'iconfont icon-dian',
                meta: {
                    requireAuth: true
                }

            },
            {
                path: "/RegionAnalysis",
                name: "地域分布",
                component: RegionAnalysis,
                icon: 'iconfont icon-dian',
                meta: {
                    requireAuth: true
                }
            },
            {
                path: "/deviceupload",
                name: "批量导入",
                component: deviceupload,
                icon: 'iconfont icon-dian',
                hidden: true,
                meta: {
                    requireAuth: true
                }

            },
            {
                path: "/deviceMiddle",
                name: "设备监控",
                component: deviceMiddle,
                icon: 'iconfont icon-dian',
                children: [{
                        path: "/newsd",
                        name: "设备监控详情",
                        component: newsd,
                        icon: 'iconfont icon-dian',
                        meta: {
                            requireAuth: true
                        }
                    },
                    {
                        path: "/deviceProcess",
                        name: "设备进程监控",
                        component: deviceProcess,
                        icon: 'iconfont icon-dian',
                        meta: {
                            requireAuth: true
                        }
                    },

                    {
                        path: "/device_etails",
                        name: "设备异常记录",
                        component: device_etails,
                        icon: 'iconfont icon-dian',
                        meta: {
                            requireAuth: true
                        }
                    },

                ],
                meta: {
                    requireAuth: true
                },

            },
            {
                path: "/reverse_ssh",
                name: "反向ssh管理",
                component: reverse_ssh,
                icon: 'iconfont icon-dian',
                meta: {
                    requireAuth: true
                }
            },

            {
                path: "/SysManageMiddleActive",
                name: "设备ROM版本",
                component: SysManageMiddleActive,
                // icon: 'iconfont icon-ziyuanguanli',
                icon: 'iconfont icon-dian',
                children: [{
                        path: "/SysVersion1",
                        name: "设备ROM版本",
                        component: SysVersion1,
                        icon: 'iconfont icon-dian',
                        meta: {
                            requireAuth: true
                        }
                    },
                    {
                        path: "/SysManage",
                        name: "ROM包管理",
                        component: SysManage,
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
        path: "/g1",
        component: Home,
        name: "西柚机盒子应用",
        icon: 'iconfont icon-hezi',
        children: [{
                path: "/Applictionmiddle",
                component: Applictionmiddle,
                name: "内嵌应用",
                titleActive: false,
                // icon: 'iconfont icon-dianbozhibov1213',
                icon: 'iconfont icon-dian',
                children: [{
                        path: "/releaseAppliction",
                        name: "应用发布管理",
                        component: releaseAppliction,
                        icon: 'iconfont icon-dian',
                        meta: {
                            requireAuth: true
                        }
                    },
                    {
                        path: "/addAppliction",
                        name: "应用新增管理",
                        component: addAppliction,
                        icon: 'iconfont icon-dian',
                        meta: {
                            requireAuth: true
                        }

                    },

                ]
            },
            {
                path: "/marketmiddle",
                component: marketmiddle,
                name: "应用市场",
                titleActive: false,
                // icon: 'iconfont icon-shichang',
                icon: 'iconfont icon-dian',
                children: [{
                        path: "/marketindex",
                        name: "应用管理",
                        component: marketindex,
                        icon: 'iconfont icon-dian',
                        meta: {
                            requireAuth: true
                        }
                    },
                    {
                        path: "/addmarket",
                        name: "新增应用",
                        component: addmarket,
                        icon: 'iconfont icon-dian',
                        hidden: true,
                        meta: {
                            requireAuth: true
                        }
                    },
                    {
                        path: "/marketdetail",
                        name: "应用详请",
                        component: marketdetail,
                        icon: 'iconfont icon-dian',
                        hidden: true,
                        meta: {
                            requireAuth: true
                        }
                    },

                    {
                        path: "/editmarket",
                        name: "编辑应用",
                        component: editmarket,
                        icon: 'iconfont icon-dian',
                        hidden: true,
                        meta: {
                            requireAuth: true
                        }
                    },
                    {
                        path: "/marketgroupindex",
                        name: "分组管理",
                        component: marketgroupindex,
                        icon: 'iconfont icon-dian',
                        meta: {
                            requireAuth: true
                        }
                    },

                ],
            },


        ]
    },
    {
        path: "/g2",
        component: Home,
        name: "数据分析",
        icon: 'iconfont icon-shuju',
        children: [{
                path: "/Analysismiddle",
                name: "西柚机APP",
                component: Analysismiddle,
                // icon: 'iconfont icon-APPkaifa',
                icon: 'iconfont icon-dian',
                children: [{
                        path: "/UserAnalysis",
                        name: "APP用户分析",
                        component: UserAnalysis,
                        icon: 'iconfont icon-dian',
                        meta: {
                            requireAuth: true
                        }
                    },
                    {
                        path: "/VersionAnalysis",
                        name: "版本分析",
                        component: VersionAnalysis,
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
                path: "/Analysismiddle1",
                name: "西柚机设备",
                component: Analysismiddle,
                // icon: 'iconfont icon-shebei',
                icon: 'iconfont icon-dian',
                children: [{
                        path: "/deviceflow",
                        name: "设备流量分析",
                        component: deviceflow,
                        icon: 'iconfont icon-dian',
                        meta: {
                            requireAuth: true
                        }
                    },
                    {
                        path: "/DeviceAnalysis",
                        name: "设备在线分析",
                        component: DeviceAnalysis,
                        icon: 'iconfont icon-dian',
                        meta: {
                            requireAuth: true
                        }
                    },

                    {
                        path: "/deviceterminal",
                        name: "设备终端",
                        component: deviceterminal,
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
        path: "/accountManagement",
        component: Home,
        name: "后台管理",
        icon: 'iconfont icon-houtaiguanli',
        children: [{
                path: "/accountManagement",
                name: "后台账户管理",
                component: accountManagement,
                icon: 'iconfont icon-dian',
                meta: {
                    requireAuth: true
                }
            },
            {
                path: "/pointsmiddle",
                name: "奖励管理",
                component: pointsmiddle,
                // icon: 'iconfont icon-jifenguanli',
                icon: 'iconfont icon-dian',
                children: [{
                        path: "/setparam",
                        name: "调整收益参数",
                        component: setparam,
                        icon: 'iconfont icon-dian',
                        meta: {
                            requireAuth: true
                        }
                    },
                    {
                        path: "/pointsDetails",
                        name: "西柚机设备奖励",
                        component: pointsDetails,
                        icon: 'iconfont icon-dian',
                        meta: {
                            requireAuth: true
                        }
                    },
                    {
                        path: "/income",
                        name: "账户收益",
                        component: income,
                        icon: 'iconfont icon-dian',
                        hidden: true,
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
                path: "/helpmiddle",
                name: "帮助中心",
                component: helpmiddle,
                // icon: 'iconfont icon-bangzhu',
                icon: 'iconfont icon-dian',
                children: [{
                        path: "/groupindex",
                        name: "分组管理",
                        component: groupindex,
                        icon: 'iconfont icon-dian',
                        meta: {
                            requireAuth: true
                        }
                    },
                    {
                        path: "/contentindex",
                        name: "内容管理",
                        component: contentindex,
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
                path: "/Log",
                name: "操作日志",
                component: Log,
                icon: 'iconfont icon-dian',
                meta: {
                    requireAuth: true
                }
            }

        ]
    }
]


var router = new VueRouter({
    routes: routes
})

export default router;