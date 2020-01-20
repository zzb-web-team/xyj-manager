<template>
<div style="height:100%;width:100%">
    <div class="Login-bg">
        <div class="login-con">
            <div class="login-con-l">
                <div class="item-h1">西柚机后台管理系统</div>
                <div class="item-h2">welcome欢迎登陆</div>
                <div class="item-user" style="margin-top:130px;">
                    <div class="item-user-l"></div>
                    <input placeholder="请输入用户名" v-model="ruleForm2.account">
                </div>
                <div class="item-user item-password" style="margin-top:30px;">
                    <div class="item-user-l"></div>
                    <input placeholder="请输入密码" v-model="ruleForm2.checkPass" type="password">
                </div>
                <div class="login-button" @click="handleSubmit2">
                    立即登录
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
// const _import = require('./router/_import_' + process.env.NODE_ENV)
import Login from '../views/Login.vue'

import {
    requestLoginOwn
} from '../api/api';
//import NProgress from 'nprogress'
export default {
    data() {
        return {
            logining: false,
            ruleForm2: {
                account: '',
                checkPass: ''
            },
            rules2: {
                account: [{
                        required: true,
                        message: '请输入账号',
                        trigger: 'blur'
                    },
                    //{ validator: validaePass }
                ],
                checkPass: [{
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    },
                    //{ validator: validaePass2 }
                ]
            },
            checked: true
        };
    },
    mounted: function () {
        console.log(this.$store.state.userRouter)
    },
    methods: {
        handleReset2() {
            this.$refs.ruleForm2.resetFields();
        },
        handleSubmit2(ev) {
            var _this = this;
                    var loginParams = {
                        username: this.ruleForm2.account,
                        password: this.ruleForm2.checkPass
                    };
                    if(this.ruleForm2.account==""){
                          this.$message({
                                message: "请输入用户名",
                                type: 'error'
                            });
                        return false
                    }
                    if(this.ruleForm2.checkPass==""){
                          this.$message({
                                message: "请输入密码",
                                type: 'error'
                            });
                               return false
                    }
                    //  this.$router.push({
                    //             path: '/adduser'
                    //         });
                    requestLoginOwn(loginParams).then(data => {
                        this.logining = false;
                        //  this.$router.push({
                        //         path: '/userinformation'
                        //     });
                        //NProgress.done();
                        console.log(data)
                        let {
                            msg,
                            status,

                        } = data;
                        if (status !== 0) {
                            this.$message({
                                message: msg,
                                type: 'error'
                            });
                        } else {
                            let userInfo = data.msg
                            this.$store.commit('setUserInfo', userInfo) //sessionStorage.setItem('user', JSON.stringify(msg));
                            // this.$router.push({
                            //     path: '/userinformation'
                            // });
                            window.location.href = "./"
                            //console.log(JSON.stringify(msg))
                            this.set('userInfo', JSON.stringify(msg), 1000)

                        }
                    })
              
           
        },
        set: function (name, value, days) {

            var d = new Date;

            d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);

            window.document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();

        },

    }
}
</script>

<style lang="scss">
.Login-bg {
    width: 100%;
    height: 100%;
    background: url('../assets/bg.png') no-repeat left;
    background-size: 60% 100%;
    margin: 0 auto;

    .login-con {
        width: 40%;
        height: 100%;
        float: right;
        display: flex;
        justify-content: center;
        align-items: center;

        .login-con-l {
            width: 600px;
            margin: 0 auto;
            height: auto;
            display: flex;
            flex-flow: column;

            .login-button {
                width: 603px;
                height: 79px;
                margin-top: 130px;
                background: rgba(51, 125, 247, 1);
                border: 1px solid rgba(26, 114, 254, 1);
                box-shadow: 0px 8px 21px 0px rgba(51, 125, 247, 0.5);
                border-radius: 39px;
                font-size: 30px;
                font-weight: bold;
                color: #ffffff;
                text-align: center;
                line-height: 79px;
                cursor: pointer;
            }

            .item-h1 {
                font-size: 56px;
                color: #333333;
             
                font-weight: 600;
            }

            .item-h2 {
                font-size: 30px;
                color: #A9A9A9;
                margin-top: 30px;
            }

            .item-user {
                width: 600;
                border-bottom: #EEEEEE solid 3px;
                height: 70px;

                &.item-password {
                    .item-user-l {
                        width: 80px;
                        height: 70px;
                        float: left;
                        background: url('../assets/password.png') no-repeat center;
                        background-size: 44px 44px;
                        text-align: center
                    }
                }

                // display: flex;
                // justify-content: flex-start;
                .item-user-l {
                    width: 80px;
                    height: 70px;
                    float: left;
                    background: url('../assets/yonghu.png') no-repeat center;
                    background-size: 44px 44px;
                    text-align: center
                }

                input {
                    width: 500;
                    background: none;
                    border: none;
                    font-size: 20px;
                    line-height: 70px;
                    color: #A9A9A9;
                    float: left;
                    outline: none
                }
            }
        }
    }
}



</style>
