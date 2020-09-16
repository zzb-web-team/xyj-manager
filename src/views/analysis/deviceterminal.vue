<template>
	<section class="myself-container">
		<div style="margin-bottom: 20px">
			<el-radio-group
				v-model="radio1"
				@change="onchangeTab"
				style="
					display: flex;
					justify-content: flex-start;
					margin-bottom: 20px;
				"
			>
				<el-radio-button label="设备类型"></el-radio-button>
				<el-radio-button label="设备型号"></el-radio-button>
				<el-radio-button label="设备ROM"></el-radio-button>
			</el-radio-group>
			<!-- <el-select
				v-model="versointype"
				size="small"
				placeholder="请选择"
				@change="onChange"
				v-if="radio1 == '设备ROM'"
			>
				<el-option
					v-for="item in options"
					:key="item.value"
					:label="item.label"
					:value="item.value"
				>
				</el-option>
			</el-select> -->

			<el-date-picker
				v-model="valueTime4"
				size="small"
				type="datetimerange"
				range-separator="至"
				start-placeholder="开始日期"
				end-placeholder="结束日期"
				align="left"
				:picker-options="pickerOptions"
			>
			</el-date-picker>
			<el-button
				type="primary"
				style="margin-left: 20px"
				size="small"
				@click="onsumbit()"
				>确定</el-button
			>
		</div>
		<div class="devive_tab">
			<div class="device_tab_on" v-if="radio1 == '设备类型'">
				<div class="device_form" style="display: flex;space-between">
					<div
						id="myEchart"
						style="width: 100%; height: 300px; margin-top: 50px"
					></div>
					<div class="devide_table">
						<el-row type="flex" class="row_active">
							<el-col :span="24">
								<tableBarActive2
									id="rebateSetTable"
									ref="table1"
									tooltip-effect="dark"
									:tableData="tableData"
									:clomnSelection="clomnSelection"
									:rowHeader="rowHeader"
									:tableOption="tableOption"
									@handleButton="handleButton"
									:operatingStatus="operatingStatus"
									@toOperating="toOperating"
									@handleSelectionChange="
										handleSelectionChange
									"
									@selectCheckBox="selectCheckBox"
									@selectAll="selectAll"
								></tableBarActive2>
							</el-col>
						</el-row>
						<el-row
							type="flex"
							style="
								display: flex;
								justify-content: end;
								margin: 20px 0;
							"
						>
							<el-col :span="6">
								<pageNation
									:pager="pager"
									@handleSizeChange="handleSizeChange"
									@handleCurrentChange="handleCurrentChange"
								></pageNation>
							</el-col>
						</el-row>
					</div>
				</div>
			</div>
			<div class="device_tab_on" v-if="radio1 == '设备型号'">
				<div
					class="device_form device_form_active"
					style="display: flex;space-between"
				>
					<div
						id="myEchart1"
						style="width: 100%; height: 300px; margin-top: 50px"
					></div>
					<div class="devide_table">
						<el-row type="flex" class="row_active">
							<el-col :span="24">
								<tableBarActive2
									id="rebateSetTable"
									ref="table1"
									tooltip-effect="dark"
									:tableData="tableData2"
									:clomnSelection="clomnSelection"
									:rowHeader="rowHeader2"
									:tableOption="tableOption"
									@handleButton="handleButton"
									:operatingStatus="operatingStatus"
									@toOperating="toOperating"
									@handleSelectionChange="
										handleSelectionChange
									"
									@selectCheckBox="selectCheckBox"
									@selectAll="selectAll"
								></tableBarActive2>
							</el-col>
						</el-row>
						<el-row
							type="flex"
							style="
								display: flex;
								justify-content: end;
								margin: 20px 0;
							"
						>
							<el-col :span="6">
								<pageNation
									:pager="pager"
									@handleSizeChange="handleSizeChange"
									@handleCurrentChange="handleCurrentChange"
								></pageNation>
							</el-col>
						</el-row>
					</div>
				</div>
			</div>
			<div class="device_tab_on" v-if="radio1 == '设备ROM'">
				<div
					class="device_form device_form_active"
					style="display: flex;space-between"
				>
					<div
						id="myEchart1"
						style="width: 100%; height: 300px; margin-top: 50px"
					></div>
					<div class="devide_table">
						<el-row type="flex" class="row_active">
							<el-col :span="24">
								<tableBarActive2
									id="rebateSetTable"
									ref="table1"
									tooltip-effect="dark"
									:tableData="tableData1"
									:clomnSelection="clomnSelection"
									:rowHeader="rowHeader1"
									:tableOption="tableOption1"
									@handleButton="handleButton"
									:operatingStatus="operatingStatus"
									@toOperating="toOperating"
									@handleSelectionChange="
										handleSelectionChange
									"
									@selectCheckBox="selectCheckBox"
									@selectAll="selectAll"
								></tableBarActive2>
							</el-col>
						</el-row>
						<el-row
							type="flex"
							style="
								display: flex;
								justify-content: end;
								margin: 20px 0;
							"
						>
							<el-col :span="6">
								<pageNation
									:pager="pager1"
									@handleSizeChange1="handleSizeChange1"
									@handleCurrentChange1="handleCurrentChange1"
								></pageNation>
							</el-col>
						</el-row>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import echarts from 'echarts';
import tableBarActive2 from '../../components/tableBarActive2';
import {
	device_online_curve,
	device_online_table,
	query_playdata_table,
	device_type,
	device_rom,
	device_typerom_all,
	device_name_analyse_curve,
	device_name_analyse_table,
	device_type_analyse_curve,
	device_type_analyse_table,
	device_rom_analyse_curve,
	device_rom_analyse_table,
} from '../../api/api';
import pageNation from '../../components/pageNation';
import common from '../../common/js/util.js';

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
			radio1: '设备类型',
			versointype: 1,
			versointime: '0',
			options: [
				{
					value: '1',
					label: '3.2.2',
				},
				{
					value: '2',
					label: '3.2.3',
				},
			],
			options1: [
				{
					value: '0',
					label: '时段对比',
				},
				{
					value: '1',
					label: '00:00:00-05:59:59',
				},
				{
					value: '2',
					label: '06:00:00-11:59:59',
				},
				{
					value: '2',
					label: '12:00:00-17:59:59',
				},
				{
					value: '2',
					label: '18:00:00-23:59:59',
				},
			],
			shoudzyx: false,
			showzdyz: false,

			valueTime4: [new Date(new Date().setHours(0, 0, 0, 0)), new Date()],
			activeName: 'first',
			value1: [
				new Date(2000, 10, 10, 10, 10),
				new Date(2000, 10, 11, 10, 10),
			],
			value2: '',
			rowHeader: [
				{
					prop: 'devType',
					label: '设备品牌',
				},
				{
					prop: 'incNum',
					label: '新增设备',
				},
				{
					prop: 'percent',
					label: '占比(%)',
				},
			],
			rowHeader1: [
				{
					prop: 'romType',
					label: '设备ROM',
				},
				{
					prop: 'incNum',
					label: '新增设备',
				},
				{
					prop: 'percent',
					label: '占比(%)',
				},
			],
			rowHeader2: [
				{
					prop: 'devType',
					label: '设备型号',
				},
				{
					prop: 'incNum',
					label: '新增设备',
				},
				{
					prop: 'percent',
					label: '占比(%)',
				},
			],
			tableData: [],
			tableData1: [],
			starttime: '',
			endtime: '',
			onLineX: [],
			onLineY: [],
			offLineX: [],
			offLineY: [],
			tableData2: [],
			pager: {
				count: 0,
				page: 1,
				rows: 100,
			},
			pager1: {
				count: 0,
				page: 1,
				rows: 100,
			},
			onlinePer: 0,
			avgOnlineTimeInSec: 0,
			offlinePer: 0,
			avgofflineTimeInSec: 0,
			flag: 1,
			pageActives: 1,
		};
	},
	mounted() {
		this.get_dav_brand_data();
		this.get_dav_brand_table();
		// this.querydeviceType();
		// this.queryTypeInfo();

		// this.queryOnlineTable();
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
			device_typerom_all(param)
				.then((res) => {
					let tempArr = res.data;
					// let obj1={
					//    value:"-1",
					//   label:"全部类型"
					// }
					// this.options.push(obj1)
					for (var i = 0; i < tempArr.length; i++) {
						let obj = {};
						if (tempArr[i].type == 0) {
							(obj.value = tempArr[i].type),
								(obj.label = '测试类型1');
						}
						if (tempArr[i].type == 1) {
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
		onchangeTab(val) {
			if (val == '设备类型') {
				// this.querydeviceType();
				// this.flag = 1;
				this.valueTime4 = [
					new Date(new Date().setHours(0, 0, 0, 0)),
					new Date(),
				];
				this.get_dav_brand_data();
				this.get_dav_brand_table();
			} else if (val == '设备型号') {
				this.valueTime4 = [
					new Date(new Date().setHours(0, 0, 0, 0)),
					new Date(),
				];
				this.get_dav_type_data();
				this.get_dav_type_table();
			} else {
				// this.flag = 0;
				this.valueTime4 = [
					new Date(new Date().setHours(0, 0, 0, 0)),
					new Date(),
				];

				this.get_dav_rom_data();
				this.get_dav_rom_table();
			}
		},
		//请求数据 设备类型-- 图表
		get_dav_brand_data() {
			let params = new Object();
			let startTime =
				new Date(new Date().toLocaleDateString()).getTime() / 1000;
			let endTime = new Date().getTime() / 1000;
			if (this.valueTime4) {
				if (this.valueTime4 == '') {
					startTime = new Date().getTime() / 1000;
					endTime =
						(new Date().getTime() - 60 * 60 * 24 * 7 * 1000) / 1000;
				} else {
					endTime = Math.floor(this.valueTime4[1].getTime() / 1000);
					startTime = Math.floor(this.valueTime4[0].getTime() / 1000);
				}
			} else {
				startTime = startTime;
				endTime = endTime;
			}
			params.startTime = startTime;
			params.endTime = endTime;
			device_name_analyse_curve(params)
				.then((res) => {
					if (res.status == 0) {
					} else {
						this.$message.error(res.err_msg);
					}
				})
				.catch((error) => {});
		},
		//请求数据 设备类型-- 表格
		get_dav_brand_table() {
			let params = new Object();
			let startTime =
				new Date(new Date().toLocaleDateString()).getTime() / 1000;
			let endTime = new Date().getTime() / 1000;
			if (this.valueTime4) {
				if (this.valueTime4 == '') {
					startTime = new Date().getTime() / 1000;
					endTime =
						(new Date().getTime() - 60 * 60 * 24 * 7 * 1000) / 1000;
				} else {
					endTime = Math.floor(this.valueTime4[1].getTime() / 1000);
					startTime = Math.floor(this.valueTime4[0].getTime() / 1000);
				}
			} else {
				startTime = startTime;
				endTime = endTime;
			}
			params.startTime = startTime;
			params.endTime = endTime;
			device_name_analyse_table(params)
				.then((res) => {
					if (res.status == 0) {
					} else {
						this.$message.error(res.err_msg);
					}
				})
				.catch((error) => {});
		},
		//请求数据 设备型号-- 图表
		get_dav_type_data() {
			let params = new Object();
			let startTime =
				new Date(new Date().toLocaleDateString()).getTime() / 1000;
			let endTime = new Date().getTime() / 1000;
			if (this.valueTime4) {
				if (this.valueTime4 == '') {
					startTime = new Date().getTime() / 1000;
					endTime =
						(new Date().getTime() - 60 * 60 * 24 * 7 * 1000) / 1000;
				} else {
					endTime = Math.floor(this.valueTime4[1].getTime() / 1000);
					startTime = Math.floor(this.valueTime4[0].getTime() / 1000);
				}
			} else {
				startTime = startTime;
				endTime = endTime;
			}
			params.startTime = startTime;
			params.endTime = endTime;
			device_type_analyse_curve(params)
				.then((res) => {
					if (res.status == 0) {
					} else {
						this.$message.error(res.err_msg);
					}
				})
				.catch((error) => {});
		},
		//请求数据 设备型号-- 表格
		get_dav_type_table() {
			let params = new Object();
			let startTime =
				new Date(new Date().toLocaleDateString()).getTime() / 1000;
			let endTime = new Date().getTime() / 1000;
			if (this.valueTime4) {
				if (this.valueTime4 == '') {
					startTime = new Date().getTime() / 1000;
					endTime =
						(new Date().getTime() - 60 * 60 * 24 * 7 * 1000) / 1000;
				} else {
					endTime = Math.floor(this.valueTime4[1].getTime() / 1000);
					startTime = Math.floor(this.valueTime4[0].getTime() / 1000);
				}
			} else {
				startTime = startTime;
				endTime = endTime;
			}
			params.startTime = startTime;
			params.endTime = endTime;
			device_type_analyse_table(params)
				.then((res) => {
					if (res.status == 0) {
					} else {
						this.$message.error(res.err_msg);
					}
				})
				.catch((error) => {});
		},
		//请求数据 设备ROM-- 图表
		get_dav_rom_data() {
			let params = new Object();
			let startTime =
				new Date(new Date().toLocaleDateString()).getTime() / 1000;
			let endTime = new Date().getTime() / 1000;
			if (this.valueTime4) {
				if (this.valueTime4 == '') {
					startTime = new Date().getTime() / 1000;
					endTime =
						(new Date().getTime() - 60 * 60 * 24 * 7 * 1000) / 1000;
				} else {
					endTime = Math.floor(this.valueTime4[1].getTime() / 1000);
					startTime = Math.floor(this.valueTime4[0].getTime() / 1000);
				}
			} else {
				startTime = startTime;
				endTime = endTime;
			}
			params.startTime = startTime;
			params.endTime = endTime;
			device_rom_analyse_curve(params)
				.then((res) => {
					if (res.status == 0) {
					} else {
						this.$message.error(res.err_msg);
					}
				})
				.catch((error) => {});
		},
		//请求数据 设备ROM-- 表格
		get_dav_rom_table() {
			let params = new Object();
			let startTime =
				new Date(new Date().toLocaleDateString()).getTime() / 1000;
			let endTime = new Date().getTime() / 1000;
			if (this.valueTime4) {
				if (this.valueTime4 == '') {
					startTime = new Date().getTime() / 1000;
					endTime =
						(new Date().getTime() - 60 * 60 * 24 * 7 * 1000) / 1000;
				} else {
					endTime = Math.floor(this.valueTime4[1].getTime() / 1000);
					startTime = Math.floor(this.valueTime4[0].getTime() / 1000);
				}
			} else {
				startTime = startTime;
				endTime = endTime;
			}
			params.startTime = startTime;
			params.endTime = endTime;
			device_rom_analyse_table(params)
				.then((res) => {
					if (res.status == 0) {
					} else {
						this.$message.error(res.err_msg);
					}
				})
				.catch((error) => {});
		},
		showzdyx() {
			this.shoudzyx = !this.shoudzyx;
		},

		//确定查询
		onsumbit() {
			this.querydeviceRom();
			this.querydeviceType();
		},
		handleSizeChange() {},
		//分页
		handleCurrentChange(val) {
			this.pager.page = val.val;
			this.querydeviceType();
		},
		handleSizeChange1() {},
		//分页
		handleCurrentChange1(val) {
			this.pager1.page = val.val;
			this.querydeviceRom();
		},

		//设备类型查询
		querydeviceType() {
			let startTime =
				new Date(new Date().toLocaleDateString()).getTime() / 1000;
			let endTime = new Date().getTime() / 1000;
			if (this.valueTime4) {
				if (this.valueTime4 == '') {
					startTime = new Date().getTime() / 1000;
					endTime =
						(new Date().getTime() - 60 * 60 * 24 * 7 * 1000) / 1000;
				} else {
					endTime = Math.floor(this.valueTime4[1].getTime() / 1000);
					startTime = Math.floor(this.valueTime4[0].getTime() / 1000);
				}
			} else {
				startTime = startTime;
				endTime = endTime;
			}

			let paramActive = {};
			paramActive.start_ts = parseInt(startTime);
			paramActive.end_ts = parseInt(endTime);
			paramActive.pageNo = this.pager.page - 1;
			paramActive.pageSize = 10;
			device_type(paramActive)
				.then((res) => {
					if (res.status == 0) {
						this.offLineX = [];
						this.offLineY = [];
						let tempArr = res.data;
						res.data.forEach((element) => {
							element.percent = (element.percent * 100).toFixed(
								2
							);
						});
						for (var i = 0; i < tempArr.length; i++) {
							switch (tempArr[i].devType) {
								case '0':
									tempArr[i].devType = 'RK3328111';
									break;
								case '1':
									tempArr[i].devType = 'RK3328';
									break;
								case '2':
									tempArr[i].devType = 'AMS805';
									break;
							}
							this.offLineX.push(tempArr[i].devType);
							this.offLineY.push(tempArr[i].incNum);
						}
						this.tableData = tempArr;
						this.pager.count = res.totalCnt;

						this.drawLine(this.offLineX, this.offLineY);
					} else {
						this.$message({
							message: '服务出错',
							type: 'error',
						});
					}
				})
				.catch((error) => {});
		},

		//设备ROM查询
		querydeviceRom() {
			let startTime =
				new Date(new Date().toLocaleDateString()).getTime() / 1000;
			let endTime = new Date().getTime() / 1000;
			if (this.valueTime4) {
				if (this.valueTime4 == '') {
					startTime = new Date().getTime() / 1000;
					endTime =
						(new Date().getTime() - 60 * 60 * 24 * 7 * 1000) / 1000;
				} else {
					endTime = Math.floor(this.valueTime4[1].getTime() / 1000);
					startTime = Math.floor(this.valueTime4[0].getTime() / 1000);
				}
			} else {
				startTime = startTime;
				endTime = endTime;
			}

			let paramActive = {};
			paramActive.start_ts = parseInt(startTime);
			paramActive.end_ts = parseInt(endTime);
			paramActive.type = this.versointype;
			paramActive.pageNo = this.pager1.page - 1;
			paramActive.pageSize = 10;

			device_rom(paramActive)
				.then((res) => {
					this.tableData1 = [];
					if (res.status == 0) {
						let tempArr = res.data;
						res.data.forEach((element) => {
							element.percent = (element.percent * 100).toFixed(
								2
							);
						});
						this.offLineX = [];
						this.offLineY = [];
						for (var i = 0; i < tempArr.length; i++) {
							this.offLineX.push(tempArr[i].romType);
							this.offLineY.push(tempArr[i].incNum);
						}

						this.tableData1 = tempArr;
						this.pager1.count = res.totalCnt;

						this.drawLine1(this.offLineX, this.offLineY);
					}
				})
				.catch((error) => {});
		},

		drawLine(x, y) {
			var arrx = [];
			var arry = [];
			for (let i in x) {
				arrx.push(x[i]); //属性
				//arr.push(obj[i]); //值
			}
			for (let i in y) {
				arry.push(y[i]); //属性
				//arr.push(obj[i]); //值
			}

			let myChart = echarts.init(document.getElementById('myEchart')); //这里是为了获得容器所在位置
			// let myChart1 = echarts.init(document.getElementById('myEchart1'));
			window.onresize = myChart.resize;
			let options = {
				color: ['#3398DB'],
				tooltip: {
					trigger: 'axis',
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true,
				},
				xAxis: [
					{
						type: 'category',
						data: x,
						axisTick: {
							alignWithLabel: true,
						},
					},
				],
				yAxis: [
					{
						type: 'value',
						name: '设备数量',
						minInterval: 1,
					},
				],
				series: [
					{
						name: '设备数量',
						type: 'bar',
						barWidth: '10%',
						barMaxWidth: 30,
						data: y,
						itemStyle: {
							normal: {
								color: function (params) {
									let colorList = [
										'#0A7CFF',
										'#FF7264',
										'#FFB04A',
										'#5CD63E',
									];
									if (params.dataIndex > 3) {
										return colorList[params.dataIndex % 4];
									} else {
										return colorList[params.dataIndex];
									}
								},
							},
						},
					},
				],
			};
			myChart.setOption(options);
			//myChart1.setOption(options);
		},
		drawLine1(x, y) {
			var arrx = [];
			var arry = [];
			for (let i in x) {
				arrx.push(x[i]); //属性
				//arr.push(obj[i]); //值
			}
			for (let i in y) {
				arry.push(y[i]); //属性
				//arr.push(obj[i]); //值
			}
			let myChart = echarts.init(document.getElementById('myEchart1')); //这里是为了获得容器所在位置
			// let myChart1 = echarts.init(document.getElementById('myEchart1'));
			window.onresize = myChart.resize;
			let options = {
				title: {
					text: '设备ROM',
				},
				color: ['#3398DB'],
				tooltip: {
					trigger: 'axis',
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true,
				},
				xAxis: {
					type: 'category',
					// boundaryGap: [0, 0.01],
					data: x,
					name: '设备ROM',
				},
				yAxis: {
					type: 'value',
					name: '设备数量',
					minInterval: 1,
				},
				series: [
					{
						name: '设备数量',
						type: 'bar',
						barMaxWidth: 30,
						data: y,
						itemStyle: {
							normal: {
								color: function (params) {
									let colorList = [
										'#0A7CFF',
										'#FF7264',
										'#FFB04A',
										'#5CD63E',
									];
									// console.log(params.dataIndex);
									if (params.dataIndex > 3) {
										return colorList[params.dataIndex % 4];
									} else {
										return colorList[params.dataIndex];
									}
								},
							},
						},
					},
				],
			};
			myChart.setOption(options);
			//myChart1.setOption(options);
		},
		drawLine2(x, y) {
			var arrx = [];
			var arry = [];
			for (let i in x) {
				arrx.push(x[i]); //属性
				//arr.push(obj[i]); //值
			}
			for (let i in y) {
				arry.push(y[i]); //属性
				//arr.push(obj[i]); //值
			}
			let myChart = echarts.init(document.getElementById('myEchart1')); //这里是为了获得容器所在位置
			// let myChart1 = echarts.init(document.getElementById('myEchart1'));
			window.onresize = myChart.resize;
			let options = {
				title: {
					text: '设备型号',
				},
				color: ['#3398DB'],
				tooltip: {
					trigger: 'axis',
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true,
				},
				xAxis: {
					type: 'category',
					// boundaryGap: [0, 0.01],
					data: x,
					name: '设备型号',
				},
				yAxis: {
					type: 'value',
					name: '设备数量',
					minInterval: 1,
				},
				series: [
					{
						name: '设备数量',
						type: 'bar',
						barMaxWidth: 30,
						data: y,
						itemStyle: {
							normal: {
								color: function (params) {
									let colorList = [
										'#0A7CFF',
										'#FF7264',
										'#FFB04A',
										'#5CD63E',
									];
									// console.log(params.dataIndex);
									if (params.dataIndex > 3) {
										return colorList[params.dataIndex % 4];
									} else {
										return colorList[params.dataIndex];
									}
								},
							},
						},
					},
				],
			};
			myChart.setOption(options);
			//myChart1.setOption(options);
		},
	},
	components: {
		tableBarActive2,
		pageNation,
	},
};
</script>

<style lang="less" scoped>
.devide_table {
	width: 650px !important;
}
.myself-container {
	.devive_tab {
		width: 100%;
		height: auto;

		.switch_tab {
			right: 9%;
			height: 40px;
			float: right;
			// background: red;
		}

		.device_tab_on {
			margin-top: 35px;
		}
	}

	.device_form {
		&.device_form_active {
			position: relative;
		}

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
	}

	.devide_table {
		width: 100%;
		height: auto;
		overflow: hidden;
		margin-top: 20px;
		margin-left: 50px;
		.el-table td,
		.el-table th {
			padding: 6px 0px;
		}

		.row_active {
			margin-top: 10px;
		}
	}

	.devide_pageNation {
		width: 100%;
		height: auto;
		overflow: hidden;
		margin-top: 20px;

		.devide_pageNation_active {
			float: right;
		}
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

.user-item {
	border: 1px solid #ebeef5;
}
</style>
