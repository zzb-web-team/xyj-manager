<template>
	<section @click="closeSel">
		<!-- <div class="top_title">设备流量分析</div> -->
		<el-row
			type="flex"
			class="deviceflow_title"
			:gutter="30"
			justify="start"
		>
			<el-col :span="3" class="title_overview">
				<div class="title_overview_top">
					<div>上行总流量：{{ totalYl | setbytes }}</div>
					<div>下行总流量：{{ totalYl | setbytes }}</div>
				</div>
				<div class="title_overview_center">
					{{ totalYl | setbytes }}
				</div>
				<div class="title_overview_bottom">今日总流量</div>
			</el-col>
			<el-col :span="3" class="title_overview">
				<div class="title_overview_top">
					<div>上行总流量：{{ totalYl | setbytes }}</div>
					<div>下行总流量：{{ totalYl | setbytes }}</div>
				</div>
				<div class="title_overview_center">
					{{ totalYl | setbytes }}
				</div>
				<div>昨日总流量</div>
			</el-col>
			<el-col :span="3" class="title_overview">
				<div class="title_overview_top">
					<div>上行总流量：{{ totalYl | setbytes }}</div>
					<div>下行总流量：{{ totalYl | setbytes }}</div>
				</div>
				<div class="title_overview_center">
					{{ totalYl | setbytes }}
				</div>
				<div>本月总流量</div>
			</el-col>
		</el-row>
		<!--  -->

		<el-row type="flex" justify="start" :gutter="20">
			<el-col :span="3">
				<el-input
					size="small"
					v-model="value1Activechanid"
					placeholder="设备SN"
					@change="onchanidChange"
				></el-input>
			</el-col>
			<el-col :span="3">
				<el-select
					size="small"
					v-model="pri_chan_prv"
					placeholder="请选择一级渠道商"
				>
					<el-option label="全部" value=""></el-option>
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
					v-model="eqp_brd"
					placeholder="请选择设备品牌"
				>
					<el-option label="全部" value=""></el-option>
					<el-option
						v-for="item in eqp_brds"
						:key="item"
						:label="item"
						:value="item"
					></el-option>
				</el-select>
			</el-col>
			<el-col :span="3">
				<el-select
					size="small"
					v-model="scd_chan_prv"
					placeholder="请选择二级渠道商"
				>
					<el-option label="全部" value=""></el-option>
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
					<el-option label="全部" value=""></el-option>
					<el-option
						v-for="item in dev_types"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					></el-option>
				</el-select>
			</el-col>
			<el-col :span="10">
				<el-radio-group
					v-show="shoudzyx == false"
					size="small"
					v-model="radio1"
					@change="onchangeTab"
				>
					<el-radio-button label="one">今天</el-radio-button>
					<el-radio-button label="two">昨天</el-radio-button>
					<el-radio-button label="three">近7天</el-radio-button>
					<el-radio-button label="four">近30天</el-radio-button>
					<el-radio-button label="five"
						>自定义
						<i class="el-icon-date"></i>
					</el-radio-button>
				</el-radio-group>
				<el-button
					size="small"
					@click="showpickerfs"
					v-show="shoudzyx"
					style="margin-right: 10px; margin-left: 10px"
					type="primary"
					>自定义</el-button
				>
				<el-date-picker
					size="medium"
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
				<el-button
					size="small"
					style="margin-left: 10px"
					type="primary"
					@click="seachtu(1)"
					>确定</el-button
				>
			</el-col>
			<el-col :span="3"> </el-col>
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
				{
					value: 'RK33XX',
					label: 'RK33XX',
				},
				{
					value: 'AMS805W',
					label: 'AMS805W',
				},
				{
					value: 'AMS905M4C',
					label: 'AMS905M4C',
				},
				{
					value: 'AMS905M4',
					label: 'AMS905M4',
				},
				{
					value: 'AMS805QP1',
					label: 'AMS805QP1',
				},
				{
					value: 'AMS905N1',
					label: 'AMS905N1',
				},
				{
					value: 'AMS905JG1S',
					label: 'AMS905JG1S',
				},
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
			eqp_brds: ['grapefruit', '迅雷', '小米', '创维', '斐讯', '腾讯'],
			eqp_type: '',
			eqp_types: ['PC服务器', '硬盘盒子', '电视盒子', 'PC服务器'],
			radio1: 'one',
			plain: '',
			search: '',
			valuedomian: '',
			value1acce1: '',
			duibi: false,
			chanIds: [],
			value1Activechanid: '',
			shoudzyx: false,
			value1: '',
			tablecdn: [],
			val2: [],
			timeUnit: 60,
			starttime: '',
			endtime: '',
			dataFlowArray: [], //图1
			timeArray: [], //图1
			pageSize: 10, //每页数量
			pageNo: 1, //当前页码
			total_cnt: 1, //数据总量
			chanid: '',
			pageActive: 0,
			pageActive1: 0,
			flowunit: '',
			totalYl: 0,
		};
	},
	filters: {
		settimes(data) {
			var stat = getymdtime(data);
			return stat;
		},
		setbytes(data) {
			return common.formatByteActive(data);
		}
	},
	components: {
		pageNation,
	},
	mounted() {
		this.drawLine();
		let monitorUrlname = this.$route.query.monitorUrlname;
		if (monitorUrlname) {
			this.value1 = monitorUrlname;
		} else {
			this.value1 = '';
		}
		let monitorChanId = this.$route.query.monitorChanId;
		if (monitorChanId) {
			this.value1Activechanid = monitorChanId;
		} else {
			this.value1Activechanid = '';
		}

		this.starttime =
			new Date(new Date().toLocaleDateString()).getTime() / 1000;
		this.endtime = Date.parse(new Date()) / 1000;

		this.gettable1();
		this.gettable2();
	},
	beforeDestroy() {
		if (!this.chart) {
			return;
		}
		this.chart.dispose();
		this.chart = null;
		this.drawLine();
		this.drawLine1();
	},
	methods: {
		closeSel(event) {
			var currentCli = document.getElementById('sellineName');
			var shopw = document.getElementById('shopw');
			if (currentCli || shopw) {
				if (
					!currentCli.contains(event.target) &&
					!shopw.contains(event.target)
				) {
					//点击到了id为sellineName以外的区域，隐藏下拉框
					this.duibi = false;
				}
			}
		},
		showduibi() {
			this.duibi = !this.duibi;
		},
		searchid() {
			this.pageActive1 = 0;
			this.querychanId(this.search);
		},
		handleSelectionChange(val) {
			let arrlist = [];
			if (val.length > 0) {
				val.forEach((item) => {
					arrlist.push(item.value);
				});
				this.chanIds = arrlist;
				this.gettable1(arrlist);
				this.gettable2(arrlist);
			} else {
				this.gettable1(val);
				this.gettable2(val);
			}
		},
		cellClass(row) {
			if (row.columnIndex === 0) {
				//你需要判断的条件
				return 'disabledCheck';
			}
		},
		//终端查询信息
		getdata2(val) {
			this.value1acce1 = val;
			this.gettable1();
			this.gettable2();
		},
		//失去焦点事件
		onblurs(event) {
			this.chanIds = event;
		},
		//获取页码
		handleCurrentChange(pages) {
			this.pageNo = pages;
			this.gettable2();
		},

		//获取每页数量
		handleSizeChange(pagetol) {
			//this.pagesize = pagetol;
			// this.getuserlist();
		},
		//回源统计图表导出
		exoprtant_Yl() {
			this.dataFlowArray = [];
			this.timeArray = [];
			let params = new Object();
			params.startTs = this.starttime;
			params.endTs = this.endtime;
			// params.chanId = this.chanid + "";
			if (this.value1) {
				params.urlName = this.value1;
			} else {
				params.urlName = '*';
			}
			if (this.chanIds.length == 0) {
				if (this.value1Activechanid == '') {
					params.channelId = '*';
				} else {
					params.channelId = this.value1Activechanid;
				}
			} else {
				let nowstr = this.chanIds.join(',');
				params.channelId = nowstr;
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
			this.queryInfoVideo();
		},
		//获取页码
		getpage(pages) {
			this.pageNo = pages;
			this.getbot();
		},
		//获取每页数量
		gettol(pagetol) {
			this.pagesize = pagetol;
			// this.getuserlist();
		},
		getdata() {
			this.pageNo = 1;
			this.gettable1();
		},
		getdata1() {
			this.gettable2();
		},

		/** 请求数据 */
		gettable1(data) {
			this.dataFlowArray = [];
			this.timeArray = [];
			let params = new Object();
			params.startTs = this.starttime;
			params.endTs = this.endtime;
			// params.chanId = this.chanid + "";
			if (this.value1) {
				params.urlName = this.value1;
			} else {
				params.urlName = '*';
			}
			if (data) {
				// let temparr1 = [];
				// temparr1 = data;
				// temparr1.push(parseInt(this.value1Activechanid));
				params.channelId = data;
			} else {
				if (this.value1Activechanid !== '') {
					params.channelId = [];
					params.channelId.push(this.value1Activechanid);
				} else {
					params.channelId = [];
				}
			}
			if (this.valuedomian !== '') {
				params.domain = this.valuedomian;
			} else {
				params.domain = '*';
			}
			if (this.value1acce1 !== '-1') {
				params.terminalName = parseInt(this.value1acce1);
			} else {
				params.terminalName = -1;
			}
			params.timeUnit = this.common.timeUnitActive(
				this.starttime,
				this.endtime
			);
			(params.pageNo = 0),
				(params.pageSize = 10),
				manage_dataflow_curve(params)
					.then((res) => {
						this.totalYl = res.data.total;
						let nowlengh = res.data.data.length;
						let nowtemp = res.data.data;
						let nowarr = [];
						let childlist = [];
						var num = res.data.data[0].dataflowArray;
						var max = Math.max.apply(null, num);
						this.flowunit = this.common.formatByteActiveunit(max);
						for (var i = 0; i < nowlengh; i++) {
							childlist.push(res.data.data[i].channelid);
							let obj = {};
							obj.type = 'bar';
							obj.barGap = '6%';
							(obj.barMaxWidth = 30),
								(obj.name = res.data.data[i].channelid);
							let nowarr1 = [];
							nowtemp[i].dataflowArray.forEach((item, index) => {
								nowarr1.push(
									this.common.formatByteNum(
										item,
										this.flowunit
									)
								);
							});
							obj.data = nowarr1;
							nowarr.push(obj);
						}

						res.data.data[0].timeArray.forEach((item, index) => {
							this.timeArray.push(getymdtime1(item));
						});
						// this.getbot();
						this.drawLine(nowarr, this.timeArray, childlist);
					})
					.catch((err) => {});
		},
		//用量查询列表
		gettable2(data) {
			this.dataFlowArray = [];
			this.timeArray = [];
			let params = new Object();
			params.startTs = this.starttime;
			params.endTs = this.endtime;
			// params.chanId = this.chanid + "";
			if (this.value1) {
				params.urlName = this.value1;
			} else {
				params.urlName = '*';
			}
			if (data) {
				params.channelId = data;
			} else {
				if (this.value1Activechanid !== '') {
					params.channelId = [];
					params.channelId.push(this.value1Activechanid);
				} else {
					params.channelId = [];
				}
			}
			if (this.valuedomian !== '') {
				params.domain = this.valuedomian;
			} else {
				params.domain = '*';
			}
			if (this.value1acce1 !== '-1') {
				params.terminalName = parseInt(this.value1acce1);
			} else {
				params.terminalName = -1;
			}
			params.timeUnit = this.common.timeUnitActive(
				this.starttime,
				this.endtime
			);
			(params.pageNo = this.pageNo - 1),
				(params.pageSize = 10),
				manage_dataflow_table(params)
					.then((res) => {
						if (res.status == 0) {
							this.tablecdn = res.data.list;
							this.total_cnt = res.data.totalCnt;
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
			this.gettable2();
		},
		//今天
		onchangeTab(val) {
			if (val == 'one') {
				this.today();
			} else if (val == 'two') {
				this.yesterday();
			} else if (val == 'three') {
				this.sevendat();
			} else if (val == 'four') {
				this.thirtyday();
			} else if (val == 'five') {
				this.shoudzyx = true;
			}
		},
		//自定义按钮
		showpickerfs() {
			this.shoudzyx = !this.shoudzyx;
			this.radio1 = 'one';
		},
		today(data) {
			this.plain = 'plain';
			let times =
				new Date(new Date().toLocaleDateString()).getTime() / 1000;
			this.starttime = times;
			this.endtime = Date.parse(new Date()) / 1000;
			this.timeUnit = 60;
			this.gettable1();
			this.gettable2();
			this.$refs.multipleTable.clearSelection();
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
			this.gettable2();
			this.$refs.multipleTable.clearSelection();
		},
		//七天
		sevendat(data) {
			this.plain = 'plain';
			let times = parseInt(new Date(new Date()).getTime() / 1000);
			this.starttime = times - 24 * 60 * 60 * 6;
			this.endtime = times;
			this.timeUnit = 60 * 24;
			this.gettable1();
			this.gettable2();
			this.$refs.multipleTable.clearSelection();
		},
		//三十天
		thirtyday(data) {
			this.plain = 'plain';
			let times = parseInt(new Date(new Date()).getTime() / 1000);
			this.starttime = times - 24 * 60 * 60 * 29;
			this.endtime = times;
			this.timeUnit = 60 * 24;
			this.gettable1();
			this.gettable2();
			this.$refs.multipleTable.clearSelection();
		},
		//自定义时间
		gettimes(cal) {
			this.shoudzyx = !this.shoudzyx;
			console.log(this.shoudzyx);
			this.starttime = dateToMs(this.val2[0]);
			this.endtime = dateToMs(this.val2[1]);
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
			this.$refs.multipleTable.clearSelection();
		},
		// 表头样式设置
		headClass() {
			return 'text-align: center;background:#F3F6FB;height:58px;';
		},
		// 表格样式设置
		rowClass() {
			return 'text-align: center;';
		},
		drawLine(x, y, idlist) {
			let _this = this;
			let myChart = echarts.init(document.getElementById('myChartMap')); //获得容器所在位置
			window.onresize = myChart.resize;
			var posList = [
				'left',
				'right',
				'top',
				'bottom',
				'inside',
				'insideTop',
				'insideLeft',
				'insideRight',
				'insideBottom',
				'insideTopLeft',
				'insideTopRight',
				'insideBottomLeft',
				'insideBottomRight',
			];

			app.configParameters = {
				rotate: {
					min: -90,
					max: 90,
				},
				align: {
					options: {
						left: 'left',
						center: 'center',
						right: 'right',
					},
				},
				verticalAlign: {
					options: {
						top: 'top',
						middle: 'middle',
						bottom: 'bottom',
					},
				},
				position: {
					options: echarts.util.reduce(
						posList,
						function (map, pos) {
							map[pos] = pos;
							return map;
						},
						{}
					),
				},
				distance: {
					min: 0,
					max: 100,
				},
			};

			app.config = {
				rotate: 90,
				align: 'left',
				verticalAlign: 'middle',
				position: 'insideBottom',
				distance: 15,
				onChange: function () {
					var labelOption = {
						normal: {
							rotate: app.config.rotate,
							align: app.config.align,
							verticalAlign: app.config.verticalAlign,
							position: app.config.position,
							distance: app.config.distance,
						},
					};
					myChart.setOption({
						series: [
							{
								label: labelOption,
							},
							{
								label: labelOption,
							},
							{
								label: labelOption,
							},
							{
								label: labelOption,
							},
						],
					});
				},
			};

			var labelOption = {
				show: true,
				position: app.config.position,
				distance: app.config.distance,
				align: app.config.align,
				verticalAlign: app.config.verticalAlign,
				rotate: app.config.rotate,
				formatter: '{c}  {name|{a}}',
				fontSize: 16,
				rich: {
					name: {
						textBorderColor: '#fff',
					},
				},
			};
			let options = {
				color: [
					'#42a6f5',
					'#ffa726',
					'#f65f54',
					'#67bb6a',
					'#42a6f5',
					'#5eb2f6',
				],
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
					data: ['上行', '下行'],
					top: 0,
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
						data: y,
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
						name: '上行',
						type: 'bar',
						barGap: 0,
						label: {
							show: false,
						},
						barMaxWidth: 30,
						data: x,
						// data: [320, 332, 301, 334, 390, 461, 140],
					},
					{
						name: '下行',
						type: 'bar',
						label: {
							show: false,
						},
						show: false,
						barMaxWidth: 30,
						data: x,
						// data: [220, 182, 191, 234, 290, 140, 369],
					},
				],
			};
			myChart.clear();
			myChart.setOption(options);
		}
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
		border: 2px solid #f2f2f2;
		border-radius: 5px;
		height: 140px;
		text-align: center;
		margin-right: 25px;
		.title_overview_top {
			text-align: center;
			margin-top: 10px;
			font-size: 12px;
		}
		.title_overview_center {
			font-size: 20px;
			margin-top: 10px;
			margin-bottom: 10px;
		}
		.title_overview_bottom {
			height: 60px;
		}
	}
}
</style>
