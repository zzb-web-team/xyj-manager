<template>
	<section>
		<!-- <div class="top_title">设备流量分析</div> -->
		<el-row
			type="flex"
			class="deviceflow_title"
			:gutter="30"
			justify="start"
		>
			<el-col :span="6" class="title_overview today_income">
				<div class="item_box">
					<div class="title_overview_bottom">今日总流量</div>
					<div class="title_overview_center">
						{{ total_today | setbytes }}
					</div>
					<div class="title_overview_top">
						<div>上行总流量：{{ up_today | setbytes }}</div>
						<div>下行总流量：{{ down_today | setbytes }}</div>
					</div>
				</div>
			</el-col>
			<el-col :span="6" class="title_overview yesterday_income">
				<div class="item_box">
					<div class="title_overview_bottom">昨日总流量</div>
					<div class="title_overview_center">
						{{ total_yesterday | setbytes }}
					</div>
					<div class="title_overview_top">
						<div>上行总流量：{{ up_yesterday | setbytes }}</div>
						<div>下行总流量：{{ down_yesterday | setbytes }}</div>
					</div>
				</div>
			</el-col>
			<el-col :span="6" class="title_overview month_income">
				<div class="item_box">
					<div class="title_overview_bottom">本月总流量</div>
					<div class="title_overview_center">
						{{ total_month | setbytes }}
					</div>
					<div class="title_overview_top">
						<div>上行总流量：{{ up_month | setbytes }}</div>
						<div>下行总流量：{{ down_month | setbytes }}</div>
					</div>
				</div>
			</el-col>
		</el-row>
		<!--  -->
		<el-row type="flex" justify="start" style="margin-bottom: 24px">
			<el-col>
				<el-radio-group
					v-show="shoudzyx == false"
					v-model="radio1"
					@change="onchangeTab"
				>
					<el-radio-button label="one">今天</el-radio-button>
					<el-radio-button label="two">昨天</el-radio-button>
					<el-radio-button label="three">自定义 </el-radio-button>
				</el-radio-group>
				<el-button
					@click="showpickerfs"
					v-show="shoudzyx"
					style="margin-right: 10px; margin-left: 10px"
					type="primary"
					>自定义</el-button
				>
				<el-date-picker
					v-show="shoudzyx"
					style="margin-left: 10px"
					v-model="val2"
					type="datetimerange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					align="left"
					@change="gettimes"
					:picker-options="pickerOptions"
				></el-date-picker>
			</el-col>
		</el-row>
		<el-row type="flex" justify="start" :gutter="20">
			<el-col :span="3">
				<el-input
					size="small"
					v-model="value1Activechanid"
					placeholder="请输入设备SN"
					@change="onchanidChange"
				></el-input>
			</el-col>
			<el-col :span="3">
				<el-select
					size="small"
					v-model="eqp_brd"
					placeholder="请选择设备品牌"
					@change="search_devtype"
				>
					<el-option label="全部" value="*"></el-option>
					<el-option
						v-for="item in eqp_brds"
						:key="item.name"
						:label="item.name"
						:value="item.name"
					></el-option>
				</el-select>
			</el-col>
			<el-col :span="3">
				<el-select
					size="small"
					v-model="pri_chan_prv"
					placeholder="请选择一级渠道"
				>
					<el-option label="全部" value="*"></el-option>
					<el-option
						v-for="item in pri_chan_prvs"
						:key="item"
						:label="item.label"
						:value="item.value"
					></el-option>
				</el-select>
			</el-col>
			<el-col :span="3">
				<el-select
					size="small"
					v-model="scd_chan_prv"
					placeholder="请选择二级渠道商"
				>
					<el-option label="全部" value="*"></el-option>
					<el-option
						v-for="item in scd_chan_prvs"
						:key="item"
						:label="item.label"
						:value="item.value"
					></el-option>
				</el-select>
			</el-col>
			<el-col :span="3">
				<el-select
					size="small"
					v-model="dev_type"
					placeholder="请选择设备型号"
				>
					<el-option label="全部" value="*"></el-option>
					<el-option
						v-for="item in dev_types"
						:key="item"
						:label="item"
						:value="item"
					></el-option>
				</el-select>
			</el-col>
			<el-col :span="5">
				<el-button
					size="small"
					style="margin-left: 10px"
					type="primary"
					@click="seachtu(1)"
					>搜索</el-button
				>
				<el-button size="small" style="margin-left: 10px" @click="reset"
					>重置</el-button
				>
			</el-col>
		</el-row>

		<!--  -->

		<div class="device_form">
			<div id="myChartMap" :style="{ height: '607px' }"></div>
		</div>
	</section>
</template>

<script>
import { dateToMs, getymdtime, getymdtime1 } from '../../servers/sevdate';
import pageNation from '@/components/pageNation';
import {
	manage_dataflow_curve,
	manage_dataflow_table,
	export_manage_dataflow_table_file,
	device_dataflow_analyse_curve,
} from '../../api/api';
import echarts from 'echarts';
import common from '../../common/js/util';

export default {
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

			dev_type: '',
			dev_types: [
				// {
				// 	value: 'RK33XX',
				// 	label: 'RK33XX',
				// },
				// {
				// 	value: 'AMS805W',
				// 	label: 'AMS805W',
				// },
				// {
				// 	value: 'AMS905M4C',
				// 	label: 'AMS905M4C',
				// },
				// {
				// 	value: 'AMS905M4',
				// 	label: 'AMS905M4',
				// },
				// {
				// 	value: 'AMS805QP1',
				// 	label: 'AMS805QP1',
				// },
				// {
				// 	value: 'AMS905N1',
				// 	label: 'AMS905N1',
				// },
				// {
				// 	value: 'AMS905JG1S',
				// 	label: 'AMS905JG1S',
				// },
			],
			pri_chan_prv: '',
			pri_chan_prvs: [
				{
					value: 'f.computer.unknown.pcgrapefruit',
					label: 'PC版西柚机',
				},
				{
					value: 'f.harddiskbox.grapefruit.grapefruit',
					label: '西柚机',
				},
				{
					value: 'f.harddiskbox.xunlei.onethingcloud',
					label: '玩客云',
				},
				{
					value: 'f.tvbox.xiaomi.xiaomi4c',
					label: '小米盒子4C',
				},
				{
					value: 'f.tvbox.xiaomi.xiaomi4',
					label: '小米盒子4',
				},
				{
					value: 'f.tvbox.skyworth.skyworthqplus1',
					label: '创维Q+一代',
				},
				{
					value: 'f.tvbox.phicomm.phicommn1',
					label: '斐讯N1盒子',
				},
				{
					value: 'f.tvbox.tencent.tencentjg1s',
					label: '企鹅极光1S',
				},
				{
					value: 'f.computer.unknown.yunlian',
					label: '云链',
				},
				{
					value: 'f.computer.unknown.hk',
					label: '香港运维',
				},
				{
					value: 'f.computer.unknown.rouji-kernel2-3',
					label: 'rouji-kernel2-3',
				},
				{
					value: 'f.computer.unknown.rouji-kernel4-5',
					label: 'rouji-kernel4-5',
				},
			],
			scd_chan_prv: '',
			scd_chan_prvs: [
				{
					value: 's.computer.unknown.pcgrapefruit',
					label: 'PC版西柚机',
				},
				{
					value: 's.harddiskbox.grapefruit.grapefruit',
					label: '西柚机',
				},
				{
					value: 'f.computer.unknown.yunlian',
					label: '云链',
				},
				{
					value: 's.computer.unknown.hk',
					label: '香港运维',
				},
				{
					value: 's.computer.unknown.rouji-kernel2-3',
					label: 'rouji-kernel2-3',
				},
				{
					value: 's.computer.unknown.rouji-kernel4-5',
					label: 'rouji-kernel4-5',
				},
			],
			eqp_brd: '',
			// eqp_brds: ['grapefruit', '迅雷', '小米', '创维', '斐讯', '腾讯'],
			eqp_brds: [
				{ name: 'linux', childen: ['PCGRAPE'] },
				{ name: 'grapefruit', childen: ['RK33XX'] },
				{ name: '迅雷', childen: ['AMS805W'] },
				{ name: '小米', childen: ['AMS905M4C', 'AMS905M4'] },
				{ name: '创维', childen: ['AMS805QP1'] },
				{ name: '斐讯', childen: ['AMS905N1'] },
				{ name: '腾讯', childen: ['AMS905JG1S'] },
			],
			eqp_type: '',
			eqp_types: ['PC服务器', '硬盘盒子', '电视盒子', 'PC服务器'],
			radio1: 'one',
			plain: '',
			valuedomian: '',
			value1acce1: '',
			duibi: false,
			chanIds: [],
			value1Activechanid: '',
			shoudzyx: false,
			value1: '',
			val2: [],
			timeUnit: 60,
			starttime: '',
			endtime: '',
			dataFlowArray: [], //图1
			timeArray: [], //图1
			pageSize: 10, //每页数量
			pageNo: 1, //当前页码
			pageActive: 0,
			flowunit: '',
			total_today: 0,
			up_today: 0,
			down_today: 0,
			total_yesterday: 0,
			up_yesterday: 0,
			down_yesterday: 0,
			total_month: 0,
			up_month: 0,
			down_month: 0,
		};
	},
	filters: {
		settimes(data) {
			var stat = getymdtime(data);
			return stat;
		},
		setbytes(data) {
			return common.formatByteActive(data);
		},
	},
	components: {
		pageNation,
	},
	mounted() {
		this.starttime =
			new Date(new Date().toLocaleDateString()).getTime() / 1000;
		this.endtime = Date.parse(new Date()) / 1000;
		this.gettable1();
	},
	methods: {
		//回源统计图表导出
		exoprtant_Yl() {
			this.dataFlowArray = [];
			this.timeArray = [];
			let params = new Object();
			params.startTs = this.starttime;
			params.endTs = this.endtime;
			if (this.value1Activechanid == '') {
				params.channelId = '*';
			} else {
				params.channelId = this.value1Activechanid;
			}

			if (this.valuedomian !== '') {
				params.domain = this.valuedomian;
			} else {
				params.domain = '*';
			}
			if (this.value1acce1 !== '-1') {
				params.terminalName = parseInt(this.valuedomian);
			} else {
				params.terminalName = -1;
			}
			params.timeUnit = this.common.timeUnitActive(
				this.starttime,
				this.endtime
			);
			(params.pageNo = 0),
				(params.pageSize = 10),
				export_manage_dataflow_table_file(params)
					.then((res) => {
						if (res.status == 0) {
							window.open(res.msg, '_blank');
						}
					})
					.catch((err) => {});
		},

		//输入渠道ID查询
		onchanidChange() {
			this.pageActive = 0;
			if (this.value1Activechanid.length != 12) {
				return false;
			}
			this.pageNo = 1;
		},
		//品牌筛选型号
		search_devtype() {
			this.devtype_value = '';
			var indexOf_child = (this.eqp_brds || []).findIndex(
				(item) => item.name == this.eqp_brd
			);
			if (indexOf_child == -1) {
				this.dev_types = [];
			} else {
				this.dev_types = this.eqp_brds[indexOf_child].childen;
			}
		},
		/** 请求数据 */
		gettable1() {
			this.dataFlowArray = [];
			this.timeArray = [];
			let params = new Object();
			params.startTime = this.starttime;
			params.endTime = this.endtime;

			if (this.value1Activechanid == '') {
				params.deviceSN = '*';
			} else {
				params.deviceSN = this.value1Activechanid;
			}
			if (this.eqp_brd == '') {
				params.deviceName = '*';
			} else {
				params.deviceName = this.eqp_brd;
			}
			if (this.pri_chan_prv == '') {
				params.firstChannel = '*';
			} else {
				params.firstChannel = this.pri_chan_prv;
			}
			if (this.scd_chan_prv == '') {
				params.secondChannel = '*';
			} else {
				params.secondChannel = this.scd_chan_prv;
			}

			if (this.dev_type == '') {
				params.deviceId = '*';
			} else {
				params.deviceId = this.dev_type;
			}
			if (params.endTime - params.startTime > 86399) {
				params.timeUnit = 120;
			} else {
				params.timeUnit = 1440;
			}
			device_dataflow_analyse_curve(params)
				.then((res) => {
					this.total_today = res.today_dataflow_total;
					this.up_today = res.today_dataflow_up;
					this.down_today = res.today_dataflow_down;
					this.total_yesterday = res.yesterday_dataflow_total;
					this.up_yesterday = res.yesterday_dataflow_up;
					this.down_yesterday = res.yesterday_dataflow_down;
					this.total_month = res.month_dataflow_total;
					this.up_month = res.month_dataflow_up;
					this.down_month = res.month_dataflow_down;
					this.$nextTick(() => {
						this.drawLine(res.upFlow, res.downFlow, res.timeArray);
					});
					if (res.status == 0) {
						this.total_today = res.today_dataflow_total;
						this.up_today = res.today_dataflow_up;
						this.down_today = res.today_dataflow_down;
						this.total_yesterday = res.yesterday_dataflow_total;
						this.up_yesterday = res.yesterday_dataflow_up;
						this.down_yesterday = res.yesterday_dataflow_down;
						this.total_month = res.month_dataflow_total;
						this.up_month = res.month_dataflow_up;
						this.down_month = res.month_dataflow_down;
						this.$nextTick(() => {
							this.drawLine(
								res.upFlow,
								res.downFlow,
								res.timeArray
							);
						});
					} else {
						this.$message.error(res.error_msg);
					}
				})
				.catch((err) => {});
		},
		seachtu(data) {
			if (this.endtime - this.starttime > 7776000) {
				this.$message({
					message: '起始时间和结束时间最大跨度不能超过三个月',
					type: 'error',
				});
				return false;
			}
			this.pageNo = 1;
			this.gettable1();
		},
		//重置
		reset() {
			this.value1Activechanid = '';
			this.eqp_brd = '';
			this.pri_chan_prv = '';
			this.scd_chan_prv = '';
			this.dev_type = '';
			this.radio1 = 'one';
			this.gettable1();
		},
		//今天
		onchangeTab(val) {
			if (val == 'one') {
				this.today();
			} else if (val == 'two') {
				this.yesterday();
			} else if (val == 'three') {
				this.shoudzyx = true;
			}
		},
		//自定义按钮
		showpickerfs() {
			this.shoudzyx = !this.shoudzyx;
			this.radio1 = 'one';
			this.today();
		},
		today(data) {
			this.plain = 'plain';
			let times =
				new Date(new Date().toLocaleDateString()).getTime() / 1000;
			this.starttime = times;
			this.endtime = Date.parse(new Date()) / 1000;
			this.timeUnit = 60;
			this.gettable1();
			// this.$refs.multipleTable.clearSelection();
		},
		//昨天
		yesterday(data) {
			this.plain = 'plain';
			let times =
				new Date(new Date().toLocaleDateString()).getTime() / 1000;
			this.starttime = times - 24 * 60 * 60 * 1;
			this.endtime = times;
			this.timeUnit = 60;
			this.gettable1();
			// this.$refs.multipleTable.clearSelection();
		},
		//自定义时间
		gettimes(cal) {
			this.starttime = dateToMs(this.val2[0]);
			this.endtime = dateToMs(this.val2[1]);
			console.log(this.starttime);
			console.log(this.endtime);
			if (this.endtime - this.starttime < 21600) {
				this.timeUnit = 60;
			} else if (
				this.endtime - this.starttime >= 21600 &&
				this.endtime - this.starttime < 86400
			) {
				this.timeUnit = 60;
			} else if (this.endtime - this.starttime >= 86400) {
				this.timeUnit = 60 * 24;
			}
			// this.$refs.multipleTable.clearSelection();
		},
		// 表头样式设置
		headClass() {
			return 'text-align: center;background:#F3F6FB;height:58px;';
		},
		// 表格样式设置
		rowClass() {
			return 'text-align: center;';
		},
		drawLine(x1, x2, y) {
			let _this = this;
			let myChart = echarts.init(document.getElementById('myChartMap')); //获得容器所在位置
			window.onresize = myChart.resize;
			let options = {
				color: ['#0A7CFF', '#FF823E'],
				tooltip: {
					trigger: 'axis',
					//     formatter: function(params) {
					//     return (
					//     //   params[0].name +
					//     //   "<br>" +
					//     //   params[0].seriesName +
					//     //   ":" +
					//     //   params[0].data +
					//     //   _this.flowunit
					//     );
					//   },
					axisPointer: {
						type: 'shadow',
					},
				},
				toolbox: {
					show: true,

					feature: {
						mydow: {
							show: true,
							title: '导出',
							icon:
								'path://M552 586.178l60.268-78.53c13.45-17.526 38.56-20.83 56.085-7.38s20.829 38.56 7.38 56.085l-132 172c-16.012 20.863-47.454 20.863-63.465 0l-132-172c-13.45-17.526-10.146-42.636 7.38-56.085 17.525-13.45 42.635-10.146 56.084 7.38L472 586.177V152c0-22.091 17.909-40 40-40s40 17.909 40 40v434.178zM832 512c0-22.091 17.909-40 40-40s40 17.909 40 40v288c0 61.856-50.144 112-112 112H224c-61.856 0-112-50.144-112-112V512c0-22.091 17.909-40 40-40s40 17.909 40 40v288c0 17.673 14.327 32 32 32h576c17.673 0 32-14.327 32-32V512z',
							onclick: function () {
								_this.exoprtant_Yl();
							},
						},
					},
				},
				legend: {
					data: ['上行流量', '下行流量'],
					top: '7.5%',
					left: '5%',
				},
				grid: {
					left: '3%', // 默认10%，给24就挺合适的。
					top: 80, // 默认60
					right: 35, // 默认10%
					bottom: 150, // 默认60
				},
				xAxis: [
					{
						type: 'category',
						axisTick: { show: false },
						data: y.map((item) => {
							return _this.common.getTimes(item * 1000);
						}),
						// data: [
						// 	'3-18',
						// 	'3-19',
						// 	'3-20',
						// 	'3-21',
						// 	'3-22',
						// 	'3-23',
						// 	'3-24',
						// ],
					},
				],
				yAxis: [
					{
						type: 'value',
						name: '流量',
					},
				],
				// series: x,
				series: [
					{
						name: '上行流量',
						type: 'bar',
						barGap: 0,
						label: {
							show: false,
						},
						barMaxWidth: 30,
						data: x1,
						// data: [320, 332, 301, 334, 390, 461, 140],
					},
					{
						name: '下行流量',
						type: 'bar',
						label: {
							show: false,
						},
						show: false,
						barMaxWidth: 30,
						data: x2,
						// data: [220, 182, 191, 234, 290, 140, 369],
					},
				],
			};
			myChart.clear();
			myChart.setOption(options);
		},
	},
};
</script>

<style lang="scss" scoped>
.device_form {
	width: 100%;
	height: auto;
	margin-top: 40px;
	background: #ffffff;
	padding: 15px 30px;
	box-sizing: border-box;
	border-radius: 2px;
	.bottom {
		margin-top: 20px;
	}
	.el-form-item__label {
		white-space: nowrap;
	}
	.el-form-item {
		margin-bottom: 0px;
		margin-left: 10px;
	}
	.row_activess {
		margin-top: 20px;
		display: flex;
		justify-content: flex-start;
	}
	.div_show {
		width: auto;
		display: flex;
		height: 40px;
		justify-content: center;
		align-items: center;
		color: #409eff;
		cursor: pointer;
		margin-left: 20px;
	}
	.user_item {
		width: auto;
		height: 130px;
		background: rgba(255, 255, 255, 1);
		border-radius: 2px;
		margin-top: 20px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		text-align: left;
		padding: 36px 71px;
		.item_left {
			width: 49%;
			height: 58px;
			border-right: 1px solid #e6e9ed;
			.item_text {
				font-size: 14px;
				color: #333333;
			}
			.item_count {
				line-height: 55px;
				span {
					font-size: 34px;
				}
			}
		}
		.item_right {
			height: 48px;
			width: 49%;
			padding-left: 40px;

			.item_text {
				font-size: 14px;
				color: #333333;
			}

			.item_count {
				line-height: 55px;

				span {
					font-size: 34px;
				}
			}
		}
	}
}
.devide_table {
	height: auto;
	margin-top: 20px;
	background: #ffffff;
	border-radius: 2px;
	border-radius: 2px;
	.el-table td,
	.el-table th {
		padding: 6px 0px;
	}
}
.devide_pageNation {
	width: 100%;
	height: auto;
	// overflow: hidden;
	margin-top: 20px;

	.devide_pageNation_active {
		float: right;
	}
}
.addaccout {
	.el-form--label-left .el-form-item__label {
		text-align: right;
		width: 90px;
	}

	.el-form-item__error {
		margin-left: 80px;
	}
}
.user_item {
	width: auto;
	height: 130px;
	background: rgba(255, 255, 255, 1);
	border-radius: 2px;
	margin-top: 20px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	text-align: left;
	padding: 36px 71px;
	.item_left {
		width: 49%;
		height: 58px;
		border-right: 1px solid #e6e9ed;
		.item_text {
			font-size: 14px;
			color: #333333;
		}
		.item_count {
			line-height: 55px;

			span {
				font-size: 34px;
			}
		}
	}
	.item_right {
		height: 48px;
		width: 49%;
		padding-left: 40px;
		.item_text {
			font-size: 14px;
			color: #333333;
		}
		.item_count {
			line-height: 55px;
			span {
				font-size: 34px;
			}
		}
	}
}
.deviceflow_title {
	margin: 25px 0 !important;
	background-color: #ffffff;
	.title_overview {
		border-radius: 12px;
		height: 174px;
		margin-right: 25px;
		color: #ffffff;
		.item_box {
			float: right;
			width: 50%;
			text-align: left;
			height: 100%;
			box-sizing: border-box;
			padding: 28px 0;
			.title_overview_top {
				font-size: 14px;
				font-weight: 400;
				opacity: 0.8;
				div {
					line-height: 18px;
				}
			}
			.title_overview_center {
				font-size: 36px;
				font-weight: 600;
				margin-top: 8px;
				margin-bottom: 13px;
			}
			.title_overview_bottom {
				font-size: 18px;
				opacity: 0.5;
				font-weight: 800;
			}
		}
	}
	.today_income {
		background: url(../../assets/today_income.png) no-repeat;
		background-size: 100% 100%;
	}
	.yesterday_income {
		background: url(../../assets/yesterday_income.png) no-repeat;
		background-size: 100% 100%;
	}
	.month_income {
		background: url(../../assets/month_incom.png) no-repeat;
		background-size: 100% 100%;
	}
}
</style>
