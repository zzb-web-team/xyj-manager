<template>
<div class="rank_con" style="margin-top:30px;display: flex;justify-content: space-around">
    <div style='width:800px;height:800px;' id="myEchart"></div>
    <div class="rank">
        <el-table border :data="tableData" style="width: 100%">
            <el-table-column  label="地域分布">
                  <template slot-scope="scope">
                        <div>{{scope.row.indexActive}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{scope.row.region}}</div>

                </template>
            </el-table-column>
            <el-table-column prop="times" label="启动次数">
            </el-table-column>
            <el-table-column  label="启动次数占比">
                <template slot-scope="scope">
                        <div>{{(scope.row.percent)*100}}%</div>

                </template>
            </el-table-column>
        </el-table>
    </div>
</div>
</template>

<script>
import {
    app_usage_region_dist
} from '../../api/api'
import echarts from "echarts";
import '../../../node_modules/echarts/map/js/china.js' // 引入中国地图数据
export default {
    name: "echarts",
    props: ["userJson"],
    data() {
        return {
            chart: null,
            tableData: [],
            echartsX:[],
            echartsY:[]

        };
    },
    mounted() {
        this.queryInfo()
        this.chinaConfigure();
    },
    beforeDestroy() {
        if (!this.chart) {
            return;
        }
        this.chart.dispose();
        this.chart = null;
    },
    methods: {
        //查询数据
        queryInfo() {
            let endTime = (new Date().getTime() / 1000)
            let startTime = ((new Date().getTime()) - 60 * 60 * 24 * 30 * 1000) / 1000
            let param = {
                start_ts: parseInt(startTime),
                end_ts: parseInt(endTime)
            }
            app_usage_region_dist(param).then(res => {
                console.log(res)
                if (res.status == 0) {
                   
                    let tempArr=res.data.regionList
                     this.echartsX=[]
                    for(var i=0;i<tempArr.length;i++){

                        let obj={
                            value:tempArr[i].times,
                            name:tempArr[i].region

                        }
                        tempArr[i].indexActive=i+1
                            this.echartsX.push(obj)
                    }
                     this.tableData =tempArr
                    
                    this.chinaConfigure()
                } else {
                    this.$message({
                        message: "服务出错",
                        type: "error"
                    });
                }

            }).catch(error => {

            })
        },

        chinaConfigure() {
            console.log(this.userJson)
            let myChart = echarts.init(document.getElementById('myEchart')); //这里是为了获得容器所在位置    
            window.onresize = myChart.resize;
            myChart.setOption({ // 进行相关配置
                title: {
                    text: '区域分布'
                },
                tooltip: { // 鼠标移到图里面的浮动提示框
                    // formatter详细配置： https://echarts.baidu.com/option.html#tooltip.formatter
                    //         formatter(params, ticket, callback) {
                    //             // params.data 就是series配置项中的data数据遍历
                    //             let localValue,
                    //                 perf,
                    //                 downloadSpeep,
                    //                 usability,
                    //                 point
                    //             if (params.data) {
                    //                 localValue = params.data.value
                    //                 perf = params.data.perf
                    //                 downloadSpeep = params.data.downloadSpeep
                    //                 usability = params.data.usability
                    //                 point = params.data.point
                    //             } else { // 为了防止没有定义数据的时候报错写的
                    //                 localValue = 0
                    //                 perf = 0
                    //                 downloadSpeep = 0
                    //                 usability = 0
                    //                 point = 0
                    //             }
                    //             let htmlStr = `
                    //   <div style='font-size:18px;'> ${params.name}</div>
                    //   <p style='text-align:left;margin-top:-10px;'>
                    //     区域对应数据value：${localValue}<br/>
                    //     性能perf：${perf}<br/>
                    //     下载速度downloadSpeep：${downloadSpeep}<br/>
                    //     可用性usability：${usability}<br/>
                    //     监测点数point：${point}<br/>
                    //   </p>
                    // `
                    //             return htmlStr
                    //         }
                    // backgroundColor:"#ff7f50",//提示标签背景颜色
                    // textStyle:{color:"#fff"} //提示标签字体颜色
                },
                // visualMap的详细配置解析：https://echarts.baidu.com/option.html#visualMap
                visualMap: { // 左下角的颜色区域
                    min: 0,
                    max: 1000,
                    inRange: {
                        color: ["#c3e2f4", "#0b50b9"]
                    },
                    text: ['High', 'Low'], // 文本，默认为数值文本
                    calculable: true
                },
                // geo配置详解： https://echarts.baidu.com/option.html#geo
                geo: { // 地理坐标系组件用于地图的绘制
                    map: 'china', // 表示中国地图
                    // roam: true, // 是否开启鼠标缩放和平移漫游
                    zoom: 1.2, // 当前视角的缩放比例（地图的放大比例）
                    label: {
                        show: true
                    },
                    itemStyle: { // 地图区域的多边形 图形样式。
                        borderColor: 'rgba(0, 0, 0, 0.2)',
                        emphasis: { // 高亮状态下的多边形和标签样式
                            emphasis: {
                                label: {
                                    show: true
                                }
                            }
                        }
                    }
                },
                series: [{
                    name: '', // 浮动框的标题（上面的formatter自定义了提示框数据，所以这里可不写）
                    type: 'map',
                    geoIndex: 0,
                    label: {
                        show: true
                    },
                    data:this.echartsX
                }]

            })
        }
    }
}
</script>

<style lang="less" scoped>
.rank_con {
    display: flex;
    justify-content: space-between;

    .rank {
        width: 400px;
        height: 400px;
    }
}
</style>
