<template>
	<section class="myself-container">
		<div class="user_title">
			<el-row
				style="
					margin-top: 20px;
					display: flex;
					justify-content: flex-start;
				"
			>
				<el-col :span="4">
					<div class="user-item all_user">
						<div class="item-count">{{ total_user }}</div>
						<div class="item-text">注册用户(总)</div>
					</div>
				</el-col>
				<el-col :span="4" style="">
					<div class="user-item band_user">
						<div class="item-count">{{ total_bind_num }}</div>
						<div class="item-text">绑定用户(总)</div>
					</div>
				</el-col>
				<el-col :span="4" style="">
					<div class="user-item new_user">
						<div class="item-count">{{ range_total_user }}</div>
						<div class="item-text">新用户</div>
					</div>
				</el-col>

				<!-- <el-col :span="4" style="">
					<div class="user-item">
						<div class="item-count">{{ percentage }}%</div>
						<div class="item-text">新用户占比</div>
					</div>
				</el-col> -->
			</el-row>
		</div>
		<div style="width: 100%; margin: 20px 0">
			<el-date-picker
				v-model="value2"
				size="small"
				type="datetimerange"
				:picker-options="pickerOptions"
				range-separator="至"
				start-placeholder="开始日期"
				end-placeholder="结束日期"
				align="left"
			>
			</el-date-picker>
			<el-button type="primary" size="small" @click="onQueryInfo" style="margin-left:10px;hright:92px;"
				>确定</el-button
			>
		</div>
		<div class="device_form">
			<div id="myEchart" style="width: 100%; height: 300px"></div>
		</div>
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
						@handleSelectionChange="handleSelectionChange"
						@selectCheckBox="selectCheckBox"
						@selectAll="selectAll"
					></tableBarActive2>
				</el-col>
			</el-row>
			<el-row type="flex" style="margin: 20px 0px; text-align: right">
				<el-col>
					<pageNation
						:pager="pager"
						@handleSizeChange="handleSizeChange"
						@handleCurrentChange="handleCurrentChange"
					></pageNation>
				</el-col>
			</el-row>
		</div>
	</section>
</template>

<script>
import echarts from 'echarts';
import tableBarActive2 from '../../components/tableBarActive2';
import pageNation from '../../components/pageNation';

import {
	ptfs_query_user_trend_list,
	query_binded_user_cnt,
} from '../../api/api';
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
			value2: [new Date(new Date().setHours(0, 0, 0, 0)), new Date()],
			// value2: "",

			rowHeader: [
				{
					prop: 'time_stamp',
					label: '日期',
				},
				{
					prop: 'old_user',
					label: '注册用户(总)',
				},

				{
					prop: 'reg_num',
					label: '新用户数',
				},
				{
					prop: 'old_user_num',
					label: '老用户数',
				},

				{
					prop: 'percentage',
					label: '新用户占比',
				},
			],
			tableData: [
				{
					time: '测试数据1',
					totals: '测试数据1',
					online_devices: '测试数据1',
					average_online: '测试数据1',
					new_percent: '测试数据1',
				},
			],
			dataArrX: [],
			dataArrY: [],
			pager: {
				count: 0,
				page: 1,
				rows: 10,
			},

			range_total_user: 0,
			total_user: 0,
			total_bind_num: 0,
			range_total_bind_num: 0,
			percentage: 0,
		};
	},
	mounted() {
		this.queryInfoUser();

		this.queryInfo();
	},
	beforeDestroy() {
		if (!this.chart) {
			return;
		}
		this.chart.dispose();
		this.chart = null;
	},
	methods: {
		queryInfoUser() {
			let param = {
				create_time: '',
				login_token: '',
			};
			query_binded_user_cnt(param)
				.then((res) => {
					if (res.status == 0) {
						this.total_bind_num = res.data.binded_user_cnt;
					}
				})
				.catch((error) => {});
		},
		//确定查询
		onQueryInfo() {
			this.queryInfo();
		},
		//分页
		handleCurrentChange(val) {
			this.pager.page = val.val;
			this.queryInfo();
		},
		//获取APP用户信息
		queryInfo() {
			let statimeActive = new Date().getTime() / 1000;
			//  statimeActive.setTime(statimeActive- 3600 * 1000 * 24 * 90);
			let startTime =
				new Date(new Date().toLocaleDateString()).getTime() / 1000;
			let endTime = new Date().getTime() / 1000;
			if (!this.value2) {
				startTime = startTime;
				endTime = endTime;
			} else {
				if (this.value2 == '') {
					startTime = new Date().getTime() / 1000;
					endTime = endTime;
				} else {
					startTime = this.value2[0].getTime() / 1000;
					endTime = this.value2[1].getTime() / 1000;
				}
			}

			//let startTime
			let param = {
				reg_start_time: parseInt(startTime),
				reg_end_time: parseInt(endTime),
				cur_page: this.pager.page - 1,
			};
			ptfs_query_user_trend_list(param)
				.then((res) => {
					this.tableData = [];
					if (res.status == 0) {
						if (res.data.user_trend_list) {
							this.range_total_user = res.data.range_total_user;
							this.total_user = res.data.total_user;
							// this.total_bind_num = res.data.total_bind_num
							this.range_total_bind_num =
								res.data.range_total_bind_num;
							this.percentage = (
								(this.range_total_user / this.total_user) *
								100
							).toFixed(2);
							this.tableData = res.data.user_trend_list;
							for (var i = 0; i < this.tableData.length; i++) {
								this.tableData[
									i
								].time_stamp = this.common.getTimess(
									this.tableData[i].time_stamp * 1000
								);
								this.tableData[i].old_user =
									this.tableData[i].reg_num +
									this.tableData[i].old_user_num;
								if (
									this.tableData[i].reg_num +
										this.tableData[i].old_user_num ==
									0
								) {
									this.tableData[i].percentage = 0 + '%';
								} else {
									this.tableData[i].percentage =
										(
											(this.tableData[i].reg_num /
												(this.tableData[i].reg_num +
													this.tableData[i]
														.old_user_num)) *
											100
										).toFixed(2) + '%';
								}
							}
							this.pager.count = res.data.total_num_info;
							let tempArr = res.data.time_stamp;
							this.dataArrX = [];
							this.dataArrY = res.data.user_num;
							for (var i = 0; i < tempArr.length; i++) {
								// this.dataArrX.push(tempArr[i].time_stamp)
								// this.dataArrY.push(tempArr[i].old_user_num)
								this.dataArrX.push(
									this.common.getTimess(tempArr[i] * 1000)
								);
								// this.dataArrY.push(tempArr[i].old_user_num)
							}
							this.dataArrX = this.dataArrX.reverse();
							this.dataArrY = this.dataArrY.reverse();
						} else {
							this.dataArrX = [];
							this.dataArrY = [];
							this.range_total_user = 0;
							this.percentage = 0;
						}
						this.configure(this.dataArrX, this.dataArrY);
					}
				})
				.catch((error) => {});
		},
		configure(x, y) {
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
				xAxis: {
					type: 'category',
					data: x,
					name: '注册时间',
				},
				yAxis: {
					type: 'value',
					name: '人数',
				},
				series: [
					{
						data: y,
						type: 'bar',
						barMaxWidth: 50,
						itemStyle: {
							color: '#0a7cff',
						},
					},
				],
			};
			myChart.setOption(options);
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

.user-title-active {
	.user-item {
		margin: 25px;
		margin-left: 0;
	}
}
.user_title {
	.user-item {
		border: 2px solid #ebeef5;
		box-sizing: border-box;
		height: 120px;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 40px;
		margin-right: 25px;
		.item-count {
			font-size: 20px;
		}
		.item-text {
			font-size: 16px;
		}
    }
    .all_user{
        background:  url(../../assets/all_user.png) no-repeat;
        background-size: 100% 100%;
    }
     .band_user{
        background:  url(../../assets/bind_user.png) no-repeat;
        background-size: 100% 100%;
    }
     .new_user{
        background:  url(../../assets/new_user.png) no-repeat;
        background-size: 100% 100%;
    }
}
</style>
