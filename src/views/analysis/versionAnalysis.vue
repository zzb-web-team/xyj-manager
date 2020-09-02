<template>
	<section class="myself-container">
		<div style="margin-top: 30px">
			<div style="margin-bottom: 20px">
				<el-date-picker
					size="small"
					v-model="valueTime"
					type="datetimerange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					align="left"
				>
				</el-date-picker>
				<el-select
					size="small"
					v-model="versointype"
					placeholder="请选择"
					@change="onChange"
				>
					<el-option label="全部" value="*"> </el-option>
					<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					>
					</el-option>
				</el-select>
				<el-button
					size="small"
					type="primary"
					@click="onQueryInfo"
					style="margin-left: 20px"
					>确定</el-button
				>
			</div>

			<div
				class="device_form"
				style="display: flex; justify-content: space-around"
			>
				<div id="myEchart" style="width: 100%; height: 300px"></div>
				<!-- <div id="myEchart1" style="width: 600px; height: 300px;"></div> -->
			</div>
			<div class="devide_table">
				<el-row type="flex">
					<el-button
						:class="{ activebutton: isActive }"
						plain
						@click="changeTab(1)"
						>今日</el-button
					>
					<el-button
						:class="{ activebutton1: isActive1 }"
						plain
						@click="changeTab(2)"
						>昨日</el-button
					>
				</el-row>
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
							@handleSelectionChange="handleSelectionChange"
							@selectCheckBox="selectCheckBox"
							@selectAll="selectAll"
						></tableBarActive2>
					</el-col>
				</el-row>
			</div>
			<div class="devide_pageNation">
				<el-row type="flex" justify="flex-end">
					<el-col :span="24">
						<pageNation
							:pager="pager"
							@handleSizeChange="handleSizeChange"
							@handleCurrentChange="handleCurrentChange"
						></pageNation>
					</el-col>
				</el-row>
			</div>
		</div>
	</section>
</template>

<script>
import {
	device_online_table,
	app_version_dist_curve,
	app_version_dist_table,
	app_version_online_dist,
	device_version,
	device_version_day,
	app_version_all,
} from '../../api/api';
import pageNation from '../../components/pageNation';

import echarts from 'echarts';
import tableBarActive2 from '../../components/tableBarActive2';
import common from '../../common/js/util.js';

export default {
	data() {
		return {
			isActive: true,
			isActive1: false,
			primaryActive: 'primary',
			versointype: '*',
			valueTime: [new Date(new Date().setHours(0, 0, 0, 0)), new Date()],

			options: [
				// {
				//   value: "",
				//   label: "全部版本",
				// },
				// {
				//   value: "1",
				//   label: "3.2.2",
				// },
				// {
				//   value: "2",
				//   label: "3.2.3",
				// },
			],
			rowHeader: [
				{
					prop: 'version',
					label: '版本',
				},
				{
					prop: 'totalUserPercent',
					label: '截至今日版本累计用户(%)',
				},
				{
					prop: 'installUserNum',
					label: '版本安装用户',
				},
				{
					prop: 'newUserNum',
					label: '新用户数',
				},
				// {
				//     prop: "totalCnt",
				//     label: "升级+新用户数"
				// },
				{
					prop: 'startupNum',
					label: '启动次数',
				},
				{
					prop: 'startupUserPercent',
					label: '启动用户(%)',
				},
			],
			tableData: [],
			echartsTable: [],
			echartsTable2: [],
			echartsLine: [],
			echartsLine1: [],
			echartsLine2: [],

			pager: {
				count: 0,
				page: 1,
				rows: 100,
			},
			daytype: '1',
			versionType: '',
		};
	},
	mounted() {
		//  this.configure1()
		// this.queryversionEchars();
		//this.queryversionTable();
		//this.queryversonLine();
		this.queryDeviceversion();
		this.querydeviceversionDay();
		this.queryAppInfo();
	},
	beforeDestroy() {
		if (!this.chart) {
			return;
		}
		this.chart.dispose();
		this.chart = null;
	},
	methods: {
		//获取APP 所有版本
		queryAppInfo() {
			let param = {};
			app_version_all(param)
				.then((res) => {
					if (res.status == 0) {
						this.options = [];

						for (var i = 0; i < res.data.length; i++) {
							let obj = {
								value: res.data[i],
								label: res.data[i],
							};
							this.options.push(obj);
						}
					}
				})
				.catch((error) => {});
		},
		//今日昨日切换
		changeTab(val) {
			if (val == 1) {
				this.daytype = 1;
				this.isActive = true;
				this.isActive1 = false;
			} else {
				this.daytype = 2;
				this.isActive = false;
				this.isActive1 = true;
			}
			// val == 1 ? (this.daytype = 1) : (this.daytype = 2);
			// this.primaryActive = !this.primaryActive;
			this.querydeviceversionDay();
		},
		//版本在线分布图
		queryDeviceversion() {
			// let startTime = new Date().getTime() / 1000;
			// let endTime = (new Date().getTime() - 60 * 60 * 24 * 7 * 1000) / 1000;
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
				startTime = parseInt(startTime);
				endTime = parseInt(endTime);
			}

			let paramActive = {};
			paramActive.dayList = [];
			paramActive.dayList[0] = startTime;
			paramActive.dayList[1] = endTime;
			paramActive.version = this.versointype;
			device_version(paramActive)
				.then((res) => {
					if (res.status == 0) {
						let tempArr = [];
						let tempArr1 = [];
						let tempArr2 = [];
						let tempArr3 = [];
						tempArr = res.data;
						for (var i = 0; i < tempArr.length; i++) {
							let obj = {
								value: tempArr[i].cnt,
								name: tempArr[i].version,
							};
							tempArr1.push(obj);
							tempArr1.push(tempArr[i].offlineCnt);
							tempArr2.push(
								this.common.getTimes(
									tempArr[i].timestamp * 1000
								)
							);
							tempArr3.push(tempArr[i].userNum);
						}
						this.echartsLine = tempArr1;
						this.echartsLine1 = tempArr2;
						this.echartsLine2 = tempArr3;
						this.configure(this.echartsLine1, this.echartsLine2);
					} else {
						this.$message({
							message: '服务出错',
							type: 'error',
						});
					}
				})
				.catch((error) => {});
		},

		//确定查询
		onQueryInfo() {
			this.queryDeviceversion();
			// this.queryversionTable()
		},
		//分页
		handleCurrentChange(val) {
			this.pager.page = val.val;
			this.querydeviceversionDay();
		},
		//分页
		handleCurrentChange1(val) {
			this.pager1.page = val.val;
			// this.queryversionTable();
		},
		//查询版本分布表格
		querydeviceversionDay() {
			let startTime = new Date().getTime() / 1000;
			let endTime =
				(new Date().getTime() - 60 * 60 * 24 * 7 * 1000) / 1000;

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
				startTime = new Date().getTime() / 1000;
				endTime =
					(new Date().getTime() - 60 * 60 * 24 * 7 * 1000) / 1000;
			}
			let paramActive = {
				dayType: this.daytype,
				version: '*',
				pageNo: this.pager.page - 1,
				pageSize: 10,
			};
			device_version_day(paramActive)
				.then((res) => {
					if (res.status == 0) {
						this.pager.count = res.totalCnt;
						// this.pager.count = res.data.total_num;
						res.data.forEach((element) => {
							element.startupUserPercent = (
								element.startupUserPercent * 100
							).toFixed(2);
							element.totalUserPercent =
								element.totalUserNum +
								'(' +
								((element.totalUserPercent * 100).toFixed(2) +
									'%') +
								')';
						});
						this.tableData = res.data;
					} else {
						this.$message({
							message: '服务出错',
							type: 'error',
						});
					}
				})
				.catch((error) => {
					this.$message({
						message: '服务出错',
						type: 'error',
					});
				});
		},
		//查询版本饼图
		configure(a, b) {
			let myChart = echarts.init(document.getElementById('myEchart')); //这里是为了获得容器所在位置
			window.onresize = myChart.resize;
			let options = {
				title: {
					text: '',
					x: 'left',
				},
				tooltip: {
					trigger: 'axis',
				},
				legend: {
					data: ['版本安装用户数'],
				},
				xAxis: {
					type: 'category',
                    data: a,
                    // name:"版本号",
				},
				yAxis: {
					type: 'value',
					name: '人数',
				},
				series: [
					{
						name: '版本安装用户数',
						// type: 'line',
						// stack: '总量',
						// data: [120, 132, 101, 134, 90, 230, 210]
						// // data: [820, 932, 901, 934, 1290, 1330, 1320],
						data: b,
						type: 'bar',
					},
				],
			};

			myChart.setOption(options);
		},
		configure1() {
			let myChart1 = echarts.init(document.getElementById('myEchart1'));
			window.onresize = myChart1.resize;

			let options1 = {
				title: {
					text: '版本在线分布图',
					x: 'center',
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow',
					},
				},
				legend: {
					data: ['在线', '离线'],
					top: 24,
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true,
				},
				xAxis: {
					type: 'value',
					boundaryGap: [0, 0.01],
				},
				yAxis: {
					type: 'category',
					data: this.echartsLine2,
				},
				series: [
					{
						name: '在线',
						type: 'bar',
						data: this.echartsLine1,
					},
					{
						name: '离线',
						type: 'bar',
						data: this.echartsLine,
					},
				],
			};

			myChart1.setOption(options1);
		},
	},
	components: {
		tableBarActive2,
		pageNation,
	},
};
</script>

<style lang="less">
.myself-container {
	.activebutton {
		border: 1px solid #409eff;
	}
	.activebutton1 {
		border: 1px solid #409eff;
	}
	.device_form {
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
		margin-top: 20px;
		text-align: right;
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
</style>
