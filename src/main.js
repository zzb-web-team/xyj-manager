import App from './App'

import store from './store/index'
import Vuex from 'vuex'
Vue.use(Vuex);

import VCharts from 'v-charts'
import common from "./common/js/util.js";
Vue.prototype.common = common
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
import router from './routes'


//---start

import NotFound from './views/404.vue'
import accountManagement from './views/account/accountManagement.vue'
import PushSetting from './views/push/push_setting.vue'
import PushRecord from './views/push/push_record.vue'
// import accountInfo from './views/account/accountInfo.vue'
// import accountManagement from './views/account/accountManagement.vue'
// import middle from './views/account/mid\dle.vue'

import Home from './views/Home.vue'

// import managementuser from './views/authority/managementuser.vue'
// import managementauthority from './views/authority/managementauthority.vue'

// import middledevive from './views/devicemanagement/middle.vue'

// import userinformation from './views/usercenter/deviceinformation.vue'

// import storagepower from './views/usercenter/storagepower.vue'
// import system from './views/devicemanagement/system.vue'
// import systemset from './views/devicemanagement/systemset.vue'
// import recording from './views/devicemanagement/recording.vue'

// import application from './views/application/applicationmanagement.vue'
// import applicationmiddle from './views/application/middle.vue'
// import releasemanagement from './views/application/releasemanagement.vue'
// import deviceinformation from './views/deviceinformation/information.vue'
// import monitor from './views/devicemanagement/monitor.vue'
// import detail from './views/devicemanagement/detail.vue'
// import storage from './views/devicemanagement/storage.vue'
// import income from './views/income/income.vue'

// import systems from './views/system/index.vue'




Vue.use(VCharts)
import echarts from 'echarts'

Vue.prototype.$echarts = echarts
Vue.use(echarts)

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
            'accountManagement':accountManagement,
            'PushSetting': PushSetting,
            'PushRecord': PushRecord
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
          var newRoutes=  [ {
            path: "/",
            component: 'Home',
            name: "后台管理",
            icon: 'el-icon-menu',
            children: [
                {
                    path: "/accountManagement",
                    name: "后台账户管理",
                    component: 'accountManagement',
                    icon: 'el-icon-menu',
                    meta : {                     
                        requireAuth:true    
                     }
                }]
            }, {
            path: "/",
            component: 'Home',
            name: "推送设置",
            icon: 'el-icon-menu',
            children: [
            
                    {
                        path: "/PushSetting",
                        name: "推送设置",
                        component: 'PushSetting',
                        icon: 'el-icon-menu',
                        meta : {                     
                            requireAuth:true    
                        }
                    },  {
                        path: "/PushRecord",
                        name: "推送记录",
                        component: 'PushRecord',
                        icon: 'el-icon-menu',
                        meta : {                     
                            requireAuth:true    
                        }
                    },
                ]
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