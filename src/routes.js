//新路由
import Login from './views/Login.vue'


import VueRouter from 'vue-router'



Vue.use(VueRouter)


var routes = [{
        path: '/',
        component: Login,
        hidden: true,
        meta: {
            requireAuth: false
        }
    }
    ,
    {
        path: "*",
        redirect: "/"
    }
]


var router = new VueRouter({
    routes: routes
})

export default router;