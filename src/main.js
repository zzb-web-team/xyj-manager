import App from './App'

import store from './store/index'
import Vuex from 'vuex'

Vue.use(Vuex);
import ElementUI from 'element-ui';
Vue.use(ElementUI)
import './assets/inon_frent/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css';

import VCharts from 'v-charts'
import common from "./common/js/util.js";
Vue.prototype.common = common
    //import NProgress from 'nprogress'
    //import 'nprogress/nprogress.css'
import router from './routes'


//---start




Vue.use(VCharts)
import echarts from 'echarts'

Vue.prototype.$echarts = echarts
    // Vue.use(echarts)

import "babel-polyfill";


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

///--end