<template>
	<section class="myself-container">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="账户明细" name="first">
				<div class="device_form">
					<el-form ref="form" :model="form">
						<el-row type="flex">
							<el-form-item>
								<el-input
									size="small"
									v-model="searchText"
									placeholder="用户ID、用户昵称"
									@keyup.enter.native="onSubmitKey"
								>
									<i
										slot="prefix"
										class="el-input__icon el-icon-search"
										@click="onSubmitKey"
									></i>
								</el-input>
							</el-form-item>
							<el-row type="flex">
								<el-form-item
									label="类型"
									style="display: flex"
								>
									<el-select
										size="small"
										v-model="profit_type"
										placeholder="请选择"
									>
										<el-option
											v-for="item in profit_types"
											:key="item.value"
											:label="item.label"
											:value="item.value"
										></el-option>
									</el-select>
								</el-form-item>

								<el-form-item
									label="时间"
									style="display: flex"
								>
									<!-- <el-date-picker
										size="small"
										v-model="start_time"
										style="width: 160px"
										type="datetime"
										placeholder="选择开始日期时间"
										:picker-options="pickerOptions1"
									></el-date-picker>
									-
									<el-date-picker
										size="small"
										v-model="end_time"
										style="width: 160px"
										type="datetime"
										placeholder="选择结束日期时间"
										:picker-options="pickerOptions"
									></el-date-picker> -->
	                            <el-date-picker
									size="small"
									v-model="start_time"
									type="daterange"
									range-separator="至"
									start-placeholder="开始日期"
									end-placeholder="结束日期"
                                    :picker-options="pickerOptions"
								>
								</el-date-picker>


								</el-form-item>
								<el-form-item>
									<el-button
										size="small"
										type="primary"
										@click="search"
										>确定</el-button
									>
									<el-button
										type="primary"
										@click="onReset"
										size="small"
										>重置</el-button
									>
								</el-form-item>
							</el-row>
						</el-row>
					</el-form>
				</div>
				<div class="devide_table">
					<el-row
						type="flex"
						class="row_active"
						style="display: flex; justify-content: flex-end"
					>
						<el-col
							style="display: flex; justify-content: flex-end"
						>
							<el-button
								type="primary"
								@click="toexportExcelactive"
								>导出</el-button
							>
						</el-col>
					</el-row>
					<el-row type="flex" class="row_active">
						<el-col :span="24">
							<el-table
								:data="tableData"
								border
								style="width: 100%"
								@sort-change="tableSortChange"
								:cell-style="rowClass"
								:header-cell-style="headClass"
							>
								<el-table-column type="index" label="序号">
								</el-table-column>
								<el-table-column prop="user_id" label="用户ID">
								</el-table-column>
								<el-table-column
									prop="user_nick_name"
									label="用户昵称"
								>
								</el-table-column>
								<!-- <el-table-column prop="dev_sn" label="设备SN">
								</el-table-column> -->
								<el-table-column
									prop="profit_type"
									label="收支类型"
								>
								</el-table-column>
								<el-table-column
									prop="c_profit"
									label="金额（积分）"
								>
								</el-table-column>

								<el-table-column
									prop="t_profit"
									label="收益账户余额"
									:formatter="formatNumber"
								>
								</el-table-column>
								<el-table-column
									prop="time_stamp"
									sortable="custom"
									label="时间"
								>
								</el-table-column>
							</el-table>
						</el-col>
					</el-row>
				</div>
				<div
					class="devide_pageNation"
					style="display: flex; justify-content: space-between"
				>
					<el-row type="flex"></el-row>
					<el-row type="flex">
						<el-col :span="6">
							<pageNation
								:pager="pager"
								@handleSizeChange="handleSizeChange"
								@handleCurrentChange="handleCurrentChange"
							></pageNation>
						</el-col>
					</el-row>
				</div>
			</el-tab-pane>
			<el-tab-pane label="收益记录" name="second">
				<div class="device_form">
					<el-form ref="form" :model="form">
						<el-row type="flex">
							<el-form-item>
								<el-input
									size="small"
									v-model="searchText"
									placeholder="用户ID、用户昵称"
									@keyup.enter.native="onSubmitKey"
								>
									<i
										slot="prefix"
										class="el-input__icon el-icon-search"
										@click="onSubmitKey"
									></i>
								</el-input>
							</el-form-item>
							<el-row type="flex">
								<el-form-item
									label="时间"
									style="display: flex"
								>
									<!-- <el-date-picker
										size="small"
										v-model="start_time"
										style="width: 160px"
										type="datetime"
										placeholder="选择开始日期时间"
										:picker-options="pickerOptions1"
									></el-date-picker>
									-
									<el-date-picker
										size="small"
										v-model="end_time"
										style="width: 160px"
										type="datetime"
										placeholder="选择结束日期时间"
										:picker-options="pickerOptions"
									></el-date-picker> -->
                                     <el-date-picker
									size="small"
									v-model="start_time"
									type="daterange"
									range-separator="至"
									start-placeholder="开始日期"
									end-placeholder="结束日期"
                                    :picker-options="pickerOptions"
								>
								</el-date-picker>
                                    
								</el-form-item>
								<el-form-item>
									<el-button
										size="small"
										type="primary"
										@click="search(2)"
										>确定</el-button
									>
									<el-button
										type="primary"
										size="small"
										@click="onReset"
										>重置</el-button
									>
								</el-form-item>
							</el-row>
						</el-row>
					</el-form>
				</div>
				<div class="devide_table">
					<el-row
						type="flex"
						class="row_active"
						style="display: flex; justify-content: flex-end"
					>
						<!-- <el-col>
							<el-button type="primary" @click="setparam"
								>调整收益参数</el-button
							>
						</el-col> -->
						<el-col
							style="display: flex; justify-content: flex-end"
						>
							<el-button
								type="primary"
								@click="toexportExcelactive"
								>导出</el-button
							>
						</el-col>
					</el-row>
					<el-row type="flex" class="row_active">
						<el-col :span="24">
							<el-table
								:data="tab_data"
								border
								style="width: 100%"
								@sort-change="tableSortChange"
								:cell-style="rowClass"
								:header-cell-style="headClass"
							>
								<el-table-column type="index" label="序号">
								</el-table-column>
								<el-table-column prop="user_id" label="用户ID">
								</el-table-column>
								<el-table-column
									prop="user_nick_name"
									label="用户昵称"
								>
								</el-table-column>
								<el-table-column prop="dev_sn" label="设备SN">
								</el-table-column>
								<el-table-column
									prop="profit_typeActive"
									label="收益金额（积分）"
								>
								</el-table-column>

								<!-- <el-table-column prop="total_profit" label="账户余额" :formatter="formatNumber">
            </el-table-column> -->
								<el-table-column
									prop="time_stamp"
									sortable="custom"
									label="时间"
								>
								</el-table-column>
							</el-table>
						</el-col>
					</el-row>
				</div>
				<div
					class="devide_pageNation"
					style="display: flex; justify-content: space-between"
				>
					<el-row type="flex"></el-row>
					<el-row type="flex">
						<el-col :span="6">
							<pageNation
								:pager="pager"
								@handleSizeChange="handleSizeChange"
								@handleCurrentChange="handleCurrentChange"
							></pageNation>
						</el-col>
					</el-row>
				</div>
			</el-tab-pane>
		</el-tabs>
	</section>
</template>

<script>
import mySearch from '../../components/mySearch';
import pageNation from '../../components/pageNation';
import {
	query_user_total_profit_everyday,
	ptfs_query_user_profit_list,
} from '../../api/api';
import common from '../../common/js/util.js';

export default {
	data() {
		return {
			activeName: 'first',
			pickerOptions: {
				disabledDate(time) {
					return time.getTime() > Date.now() - 8.64e6; //如果没有后面的-8.64e6就是不可以选择今天的
				},
			},
			pickerOptions1: {
				// disabledDate(time) {
				//   let beiginTime = parseInt(Date.now()) - 86400 * 92 * 1000;
				//   return time.getTime() < beiginTime; //如果没有后面的-8.64e6就是不可以选择今天的
				// },
			},
			searchText: '',
			start_time: '',
			end_time: '',
			rotate: false,
			profit_type: '',
			profit_types: [
				{
					value: '0',
					label: '全部',
				},
				{
					value: '1',
					label: '收益',
				},
				{
					value: '2',
					label: '兑换',
				},
			],
			tableData: [],
			tab_data: [],
			pager: {
				count: 0,
				page: 1,
				rows: 100,
			},
			showState: false,
			order: 0,
			tableData2: [],
			pageActive: 0,
			exportLinks: '',
		};
	},
	mounted() {
		this.get_data();
	},
	methods: {
		handleClick(tab, event) {
			this.pager.page = 1;
			this.pager.count = 0;
			this.tableData = [];
			this.tableData2 = [];
			this.searchText = '';
			this.profit_type = '';
			this.start_time = '';
			this.end_time = '';
			if (this.activeName == 'first') {
				this.get_data();
			} else {
				this.getInfo();
			}
		},
		setparam() {
			this.$router.push({
				path: '/setparam',
			});
		},
		//排序
		tableSortChange(column) {
			this.pager.page = 1;
			if (column.order == 'descending') {
				this.order = 0;
			} else {
				this.order = 1;
			}
			if (this.activeName == 'first') {
				this.get_data();
			} else {
				this.getInfo();
			}
		},
		//导出的方法
		toexportExcelactive() {
			this.common.monitoringLogs('导出', '导出积分明细', 1);
			window.open(this.exportLinks);
		},

		//重置
		onReset() {
			this.pager.page = 1;
			this.start_time = '';
			this.end_time = '';
			this.searchText = '';
			this.profit_type = '';
			if (this.activeName == 'first') {
				this.get_data();
			} else {
				this.getInfo();
			}
		},
		//input按钮搜索
		onSubmitKey() {
			this.pager.page = 1;
			if (this.activeName == 'first') {
				this.get_data();
			} else {
				this.getInfo(2);
			}
		},
		formatType(row) {
			if (row.profit_type === 1) {
				return '收益';
			} else {
				return '兑换';
			}
		},
		// formatNumber(row, column) {
		// 	const property = column['property'];
		// 	return (row[property] / 100).toFixed(2);
		// },
		formatTime(row) {
			return this.common.getTimess(row.time_stamp * 1000);
		},
		get_data() {
			let data = {
				query_type: 0,
				cur_page: this.pager.page - 1,
				order: this.order,
				profit_type:
					this.profit_type === '' ? 0 : Number(this.profit_type),
				start_time:
					this.start_time === ''
						? parseInt(new Date().getTime() / 1000) - 86400 * 90
						: new Date(this.start_time[0]).getTime() / 1000,
				end_time:
					this.start_time === ''
						? parseInt(new Date().getTime() / 1000)
						: new Date(this.start_time[1]).getTime() / 1000,
			};
			if (this.judgeString(this.searchText)) {
				var arr = Object.keys(this.judgeString(this.searchText));
				data.query_type = arr.length === 0 ? 0 : 1;
				// data.query_type = arr.length === 0 ? 0 : 1;
				var param = Object.assign(
					this.judgeString(this.searchText),
					data
				);
			} else {
				this.$message.error('请输入正确的用户ID、用户昵称');
				return;
			}
			if (data.end_time - data.start_time > 7948801) {
				this.$message({
					message: '只能查询任意当前结束时间往前的90天以内的数据',
					type: 'error',
				});
				return false;
			}
			query_user_total_profit_everyday(param)
				.then((res) => {
					if (res.status === 0) {
						this.exportLinks = res.data.filename;

						let teamarr = res.data.total_profit_list;
						for (var i = 0; i < teamarr.length; i++) {
							if (teamarr[i].profit_type === 1) {
								teamarr[i].profit_type = '收益';
							} else {
								teamarr[i].profit_type = '兑换';
							}
							teamarr[i].c_profit = (
								teamarr[i].cur_profit / 100
							).toFixed(2);
							teamarr[i].t_profit = (
								teamarr[i].total_profit / 100
							).toFixed(2);
							teamarr[i].time_stamp = this.common.getTimess(
								teamarr[i].time_stamp * 1000
							);
						}
						this.tableData = [];
						this.tableData = teamarr;
						this.pager.count = res.data.total_num;
						this.pager.rows = res.data.total_page;
					} else {
						this.$message.error(res.err_msg);
					}
				})
				.catch((error) => {});
		},
		getInfo(num) {
			let data = {
				query_type: 0,
				cur_page: this.pager.page - 1,
				order: this.order,
				// profit_type:
				// 	this.profit_type === '' ? 0 : Number(this.profit_type),
				start_time:
					this.start_time === ''
						? parseInt(new Date().getTime() / 1000) - 86400 * 90
						: new Date(this.start_time[0]).getTime() / 1000,
				end_time:
					this.start_time === ''
						? parseInt(new Date().getTime() / 1000)
						: new Date(this.start_time[1]).getTime() / 1000,
			};
			if (num) {
				data.query_type = 1;
				data.profit_type = 0;
			} else {
				data.query_type = 0;
				data.profit_type = 0;
			}
			if (this.judgeString(this.searchText)) {
				var arr = Object.keys(this.judgeString(this.searchText));
				// data.query_type = arr.length === 0 ? 0 : 1;
				var param = Object.assign(
					this.judgeString(this.searchText),
					data
				);
			} else {
				this.$message.error('请输入正确的用户ID、用户昵称');
				return;
			}
			if (data.end_time - data.start_time > 7948801) {
				this.$message({
					message: '只能查询任意当前结束时间往前的90天以内的数据',
					type: 'error',
				});
				return false;
            }
			// if (this.end_time != ''||this.searchText!="") {
			// 	param.query_type = 1;
			// } else {
			// 	param.query_type = 0;
			// }
			console.log(this.end_time);
			ptfs_query_user_profit_list(param)
				.then((res) => {
					if (res.status === 0) {
						this.exportLinks = res.data.filename;
						let teamarr = res.data.profit_detail_list;
						for (var i = 0; i < teamarr.length; i++) {
							if (teamarr[i].profit_type === 1) {
								teamarr[i].profit_type = '收益';
								teamarr[i].profit_typeActive = (
									teamarr[i].profit / 100
								).toFixed(2);
							} else {
								teamarr[i].profit_type = '兑换';
								teamarr[i].profit_typeActive = (
									teamarr[i].profit / 100
								).toFixed(2);
							}
							teamarr[i].time_stamp = this.common.getTimess(
								teamarr[i].time_stamp * 1000
							);
						}
						this.tab_data = [];
						this.tab_data = teamarr;
						this.pager.count = res.data.total_num;
						this.pager.rows = res.data.total_page;
					} else {
						this.$message.error(res.err_msg);
					}
				})
				.catch((error) => {});
		},

		toexportExcel() {
			let data = {
				cur_page: this.pageActive,
				order: this.order,
				profit_type:
					this.profit_type === '' ? 0 : Number(this.profit_type),
				start_time:
					this.start_time === ''
						? 0
						: new Date(this.start_time[0]).getTime() / 1000,
				end_time:
					this.start_time === ''
						? 0
						: new Date(this.start_time[1]).getTime() / 1000,
			};
			if (this.judgeString(this.searchText)) {
				var arr = Object.keys(this.judgeString(this.searchText));
				data.query_type = arr.length === 0 ? 0 : 1;
				var param = Object.assign(
					this.judgeString(this.searchText),
					data
				);
			} else {
				this.$message.error('请输入正确的用户ID、用户昵称');
				return;
			}

			query_user_total_profit_everyday(param)
				.then((res) => {
					if (res.status === 0) {
						this.pageActive = res.data.cur_page;
						if (res.data.cur_page >= res.data.total_page) {
							this.exportExcel();
							this.common.monitoringLogs(
								'导出',
								'导出积分明细',
								1
							);
						} else {
							let teamarr = res.data.total_profit_list;
							for (var i = 0; i < teamarr.length; i++) {
								if (teamarr[i].profit_type === 1) {
									teamarr[i].profit_type = '收益';
									teamarr[i].profit_typeActive = (
										teamarr[i].cur_profit / 100
									).toFixed(2);
								} else {
									teamarr[i].profit_type = '兑换';
									teamarr[i].profit_typeActive = (
										teamarr[i].cur_amount / 100
									).toFixed(2);
								}
								teamarr[i].time_stamp = this.common.getTimess(
									teamarr[i].time_stamp * 1000
								);
							}
							//this.tableData2 = teamarr
							this.tableData2 = this.tableData2.concat(teamarr);
							this.pageActive++;
							this.toexportExcel();
						}
					} else {
						this.common.monitoringLogs('导出', '导出积分明细', 0);
					}
				})
				.catch((error) => {});
		},
		search(num) {
			this.pager.page = 1;

			if (this.activeName == 'first') {
				this.get_data();
			} else {
				this.getInfo(2);
			}
		},
		getShow() {
			this.showState = !this.showState;
			this.rotate = !this.rotate;
		},
		addAccout() {
			this.dialogVisible = true;
		},
		handleCurrentChange(val) {
			this.pager.page = val.val;
			if (this.activeName == 'first') {
				this.get_data();
			} else {
				this.getInfo();
			}
		},
		judgeString(str) {
			// const reg1 = /^\d{8}$/;
			const reg1 = /^(\d{7}|\d{8})$/;
			const reg2 = /^[\u4E00-\u9FA5A-Za-z0-9-_./\/]{4,20}$/;
			const reg7 = /^\d+$/;
			if (reg1.test(str)) {
				return {
					user_id: Number(str),
				};
			} else if (reg2.test(str)) {
				return {
					nick_name: str,
				};
			} else if (str === '') {
				return {};
			} else {
				return false;
			}
		},
		// 表头样式设置
		headClass() {
			return 'text-align: center;background:#F3F6FB;height:58px;';
		},
		// 表格样式设置
		rowClass() {
			return 'text-align: center;';
		},
	},
	components: {
		pageNation: pageNation,
		mySearch: mySearch,
	},
};
</script>

<style lang="less">
.user-title {
	margin-top: 30px;

	.user-item {
		background: #f2f2f2;
		padding: 25px;
		border-radius: 5px;
		display: flex;
		justify-content: center;
		flex-direction: column;

		.item-count,
		.item-text {
			display: flex;
			justify-content: center;
		}
	}
}

.myself-container {
	.el-table th > .cell {
		text-align: center;
	}

	.el-table .cell {
		text-align: center;
	}

	.devide_title {
		width: 100%;
		height: auto;
		overflow: hidden;
		margin-top: 10px;
		background: #f2f2f2;
		padding: 15px 0px;
		box-sizing: border-box;

		.el-col {
			padding: 0px 20px;
		}
	}

	.device_form {
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
	.title {
		width: 100%;
		text-align: center;
	}

	.el-dialog__body {
		padding: 0px;
	}

	.el-form-item {
		display: flex;
	}

	.el-form--label-left .el-form-item__label {
		text-align: right;
		width: 90px;
	}

	.el-form-item__error {
		margin-left: 80px;
	}

	.search-con {
		width: 250px;
		height: 40px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		border-bottom: 1px solid #999999;

		.search-input {
			.el-input__inner {
				border: none;
				background: none;
			}
		}
	}
}
</style>
