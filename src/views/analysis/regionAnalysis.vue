<template>
	<div>
		<div
			style="
				margin-top: 30px;
				display: flex;
				justify-content: flex-start;
				align-items: center;
			"
		>
			<el-date-picker
				v-model="valueTime"
				size="small"
				type="datetimerange"
				range-separator="至"
				start-placeholder="开始日期"
				end-placeholder="结束日期"
				align="left"
				:picker-options="pickerOptions"
			>
			</el-date-picker>
			<el-select
				v-model="deviceType"
				placeholder="请选择"
				size="small"
				@change="onChange"
				style="margin-left: 20px"
			>
				<el-option
					v-for="item in options"
					:key="item.value"
					:label="item.label"
					:value="item.value"
				>
				</el-option>
			</el-select>
			<el-button
				type="primary"
				@click="onQueryInfo"
				size="small"
				style="margin-left: 20px"
				>搜索</el-button
			>
			<el-button @click="reset" size="small" style="margin-left: 20px"
				>重置</el-button
			>
		</div>
		<div
			class="rank_con"
			style="
				margin-top: 30px;
				display: flex;
				justify-content: space-around;
			"
		>
			<div style="width: 800px; height: 800px" id="myEchart"></div>
			<div class="rank">
				<el-table border :data="tableData" style="width: 800">
					<el-table-column
						type="index"
						label="序号"
					></el-table-column>
					<el-table-column label="省市">
						<template slot-scope="scope">
							<div>
								{{
									scope.row.indexActive
								}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{
									scope.row.region
								}}
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="xiyou" label="西柚机">
						<template slot-scope="scope">
							<div>
								{{
									scope.row.xiyou == ''
										? '--'
										: scope.row.xiyou
								}}
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="xiaomi" label="小米盒子">
						<template slot-scope="scope">
							<div>
								{{
									scope.row.xiaomi == ''
										? '--'
										: scope.row.xiaomi
								}}
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="wanke" label="玩客云">
						<template slot-scope="scope">
							<div>
								{{
									scope.row.wanke == ''
										? '--'
										: scope.row.wanke
								}}
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="other_box" label="其他品牌">
						<template slot-scope="scope">
							<div>
								{{
									scope.row.other_box == ''
										? '--'
										: scope.row.other_box
								}}
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="incNum" label="新增设备">
					</el-table-column>
					<el-table-column prop="num" label="累计设备数">
					</el-table-column>
					<el-table-column label="累计占比">
						<template slot-scope="scope">
							<div>
								{{ (scope.row.percent * 100).toFixed(2) }}%
							</div>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
	</div>
</template>

<script>
import { app_usage_region_dist, device_typerom_all } from '../../api/api';
import echarts from 'echarts';
import '../../../node_modules/echarts/map/js/china.js'; // 引入中国地图数据
export default {
	name: 'echarts',
	props: ['userJson'],
	data() {
		let that = this;
		let _minTime = null;
		let _maxTime = null;
		return {
			pickerOptions: {
				onPick(time) {
					if (!time.maxDate) {
						let timeRange = 89 * 24 * 3600 * 1000;
						_minTime = time.minDate.getTime() - timeRange; // 最小时间
						_maxTime = time.minDate.getTime() + timeRange; // 最大时间
					} else {
						_minTime = _maxTime = null;
					}
				},
				disabledDate(time) {
					let afterToday = Date.now() - 3600 * 1000 * 24;
					if (_maxTime) {
						_maxTime =
							_maxTime <= afterToday ? _maxTime : afterToday;
					} else {
						return time.getTime() > Date.now() - 3600 * 1000 * 24;
					}
					if (_minTime && _maxTime) {
						return (
							time.getTime() < _minTime ||
							time.getTime() > _maxTime
						);
					}
				},
			},
			valueTime: [new Date(new Date().setHours(0, 0, 0, 0)), new Date()],
			chart: null,
			tableData: [],
			echartsX: [],
			echartsY: [],
			deviceType: '-1',
			options: [
				{
					value: '',
					label: '全部类型',
				},
				{
					value: '1',
					label: 'RK3328',
				},
				{
					value: '2',
					label: 'AMS805',
				},
			],
		};
	},
	mounted() {
		this.queryInfo();
		this.queryTypeInfo();
		// this.chinaConfigure();
	},
	beforeDestroy() {
		if (!this.chart) {
			return;
		}
		this.chart.dispose();
		this.chart = null;
	},
	methods: {
		//查询西柚机所有版本
		queryTypeInfo() {
			this.options = [];
			let param = {};
			this.options = [];
			device_typerom_all(param)
				.then((res) => {
					let tempArr = res.data;
					let obj1 = {
						value: '-1',
						label: '全部类型',
					};
					this.options.push(obj1);
					for (var i = 0; i < tempArr.length; i++) {
						let obj = {};
						if (tempArr[i].type == 0) {
							(obj.value = tempArr[i].type),
								(obj.label = '测试设备1');
						} else if (tempArr[i].type == 1) {
							(obj.value = tempArr[i].type),
								(obj.label = 'RK3328');
						} else if (tempArr[i].type == 2) {
							(obj.value = tempArr[i].type),
								(obj.label = 'AMS805');
						}
						this.options.push(obj);
					}
				})
				.catch((error) => {});
		},
		//确定查询
		onQueryInfo() {
			this.queryInfo();
		},
		//重置
		reset() {
			this.valueTime = [
				new Date(new Date().setHours(0, 0, 0, 0)),
				new Date(),
			];
			this.deviceType = '-1';
			this.queryInfo();
			this.queryTypeInfo();
		},
		//查询数据
		queryInfo() {
			let startTime =
				new Date(new Date().toLocaleDateString()).getTime() / 1000;
			let endTime = new Date().getTime() / 1000;
			if (this.valueTime) {
				if (this.valueTime == '') {
					startTime = new Date().getTime() / 1000;
					endTime =
						(new Date().getTime() - 60 * 60 * 24 * 7 * 1000) / 1000;
				} else {
					endTime = Math.floor(this.valueTime[1].getTime() / 1000);
					startTime = Math.floor(this.valueTime[0].getTime() / 1000);
				}
			} else {
				startTime = startTime;
				endTime = endTime;
			}
			// let endTime = new Date().getTime() / 1000;
			// let startTime = (new Date().getTime() - 60 * 60 * 24 * 30 * 1000) / 1000;
			// let param = {
			//   start_ts: parseInt(startTime),
			//   end_ts: parseInt(endTime),
			// };
			let paramActive = {};
			// paramActive.dayList = [];
			paramActive.start_ts = parseInt(startTime);
			(paramActive.end_ts = parseInt(endTime)),
				(paramActive.type = this.deviceType);
			app_usage_region_dist(paramActive)
				.then((res) => {
					if (res.status == 0) {
						let tempArr = res.data;
						//             tempArr.forEach((element) => {
						// element.percent=(element.percent*100).toFixed(2)
						//     });

						this.echartsX = [];
						for (var i = 0; i < tempArr.length; i++) {
							// let obj = {
							//   value: tempArr[i].num,
							//   name: tempArr[i].region.replace("省", ""),
							// };

							let obj = {};
							obj.name = tempArr[i].region.replace('省', '');
							obj.name = obj.name.replace('市', '');
							obj.name = obj.name.replace('维吾尔自治区', '');
							obj.value = tempArr[i].num;
							tempArr[i].xiyou = '';
							tempArr[i].xiaomi = '';
							tempArr[i].wanke = '';
							tempArr[i].other_box = '';
							// arr.push(obj);
							// tempArr[i].indexActive = i + 1;
							this.echartsX.push(obj);
						}
						console.log(tempArr);
						this.tableData = tempArr;
						this.chinaConfigure(this.echartsX);
					} else {
						this.$message({
							message: '服务出错',
							type: 'error',
						});
					}
				})
				.catch((error) => {});
		},

		chinaConfigure(a) {
			let myChart = echarts.init(document.getElementById('myEchart')); //这里是为了获得容器所在位置
			window.onresize = myChart.resize;
			myChart.setOption({
				// 进行相关配置
				title: {
					text: '区域分布',
				},
				tooltip: {
					// 鼠标移到图里面的浮动提示框
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
				visualMap: {
					// 左下角的颜色区域
					min: 0,
					max: 1000,
					inRange: {
						color: ['#c3e2f4', '#0b50b9'],
					},
					text: ['High', 'Low'], // 文本，默认为数值文本
					calculable: true,
				},
				// geo配置详解： https://echarts.baidu.com/option.html#geo
				geo: {
					// 地理坐标系组件用于地图的绘制
					map: 'china', // 表示中国地图
					// roam: true, // 是否开启鼠标缩放和平移漫游
					zoom: 1.2, // 当前视角的缩放比例（地图的放大比例）
					label: {
						show: true,
					},
					itemStyle: {
						// 地图区域的多边形 图形样式。
						borderColor: 'rgba(0, 0, 0, 0.2)',
						emphasis: {
							// 高亮状态下的多边形和标签样式
							emphasis: {
								label: {
									show: true,
								},
							},
						},
					},
				},
				series: [
					{
						name: '', // 浮动框的标题（上面的formatter自定义了提示框数据，所以这里可不写）
						type: 'map',
						geoIndex: 0,
						label: {
							show: true,
						},
						data: a,
					},
				],
			});
		},
	},
};
</script>

<style lang="less" scoped>
.rank_con {
	display: flex;
	justify-content: space-between;

	.rank {
		// width: 400px;
		height: 400px;
	}
}
</style>
