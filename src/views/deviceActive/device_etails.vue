<template>
	<div class="content" style="padding-bottom: 20px">
		<!-- 头部 -->
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="硬件异常记录" name="first">
				<!-- 搜索 -->
				<div class="seach">
					<div class="seach_top">
						<el-input
							size="small"
							placeholder="设备SN，节点ID"
							v-model="input"
							@keyup.enter.native="seachuser()"
							class="input-with-select"
						>
							<i
								slot="prefix"
								class="el-input__icon el-icon-search"
								@click="seachuser()"
							></i>
						</el-input>
						<span style="margin-left: 10px">异常类型：</span>
						<el-select
							size="small"
							v-model="value"
							placeholder="请选择"
							@change="seachuser"
						>
							<el-option label="全部" value="0"></el-option>
							<el-option
								v-for="(item, index) in options"
								:key="index"
								:label="item.label"
								:value="item.value"
							></el-option>
						</el-select>
						<span style="margin-left: 10px">选择日期：</span>

						<el-date-picker
							size="small"
							@change="queryHardware()"
							v-model="value1"
							type="datetimerange"
							:picker-options="pickerOptions"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							align="right"
						></el-date-picker>
						<el-button
							size="small"
							type="primary"
							@click="seachuser()"
							style="margin-left: 10px"
							>确定</el-button
						>
						<el-button
							@click="reset()"
							size="small"
							style="margin-left: 10px"
							>重置</el-button
						>
					</div>
				</div>

				<!-- 表格 -->
				<div>
					<div style="text-align: right; margin: 10px 0">
						<el-button
							type="primary"
                            size="small"
							@click="geydata2()"
							:disabled="showdisabled"
							>导出</el-button
						>
					</div>
					<el-table
						:data="tableData"
						border
						:cell-style="rowClass"
						:header-cell-style="headClass"
					>
						<el-table-column
							prop="now_date"
							label="日期"
							width="180"
						>
							<template slot-scope="scope">
								<span>{{ scope.row.time_stamp | getymd }}</span>
							</template>
						</el-table-column>
						<el-table-column label="异常类型" width="220">
							<template slot-scope="scope">
								<span
									v-if="scope.row.badstade == '正常'"
									style="color: green"
									>{{ scope.row.badstade }}</span
								>
								<span v-else style="color: red"
									>{{ scope.row.badstade }}
								</span>
							</template>
						</el-table-column>
						<el-table-column
							prop="dev_sn"
							label="设备SN"
							width="180"
						></el-table-column>
						<el-table-column
							prop="node_id"
							label="节点ID"
						></el-table-column>

						<el-table-column
							prop="cpu_temperature"
							label="当前使用空间/总空间"
						>
							<template slot-scope="scope">
								<span v-if="!scope.row.user_cap">--</span>
								<span v-else>{{ scope.row.user_cap }}</span
								>/
								<span v-if="!scope.row.total_cap">--</span>
								<span v-else>{{ scope.row.total_cap }}</span>
							</template>
						</el-table-column>
						<el-table-column
							prop="upstream_bandwidth"
							label="当前上行/下行宽带"
						>
							<template slot-scope="scope">
								<span>{{ scope.row.down_bandwidth }}</span
								>/
								<span>{{ scope.row.up_bandwidth }}</span>
							</template>
						</el-table-column>
						<el-table-column label="CPU温度">
							<template slot-scope="scope">
								<span
									v-if="scope.row.cputem_color"
									style="color: red"
									>{{ scope.row.cpu_tem }}</span
								>
								<span v-else>{{ scope.row.cpu_tem }}</span>
							</template>
						</el-table-column>

						<el-table-column label="硬盘温度">
							<template slot-scope="scope">
								<span
									v-if="scope.row.hdtem_color"
									style="color: red"
									>{{ scope.row.hd_tem }}
								</span>
								<span v-else>{{ scope.row.hd_tem }}</span>
							</template>
						</el-table-column>
						<el-table-column label="磁盘剩余容量">
							<template slot-scope="scope">
								<span
									v-if="scope.row.cap_color"
									style="color: red"
									>{{ scope.row.cap_ratio }}
								</span>
								<span v-else>{{ scope.row.cap_ratio }}</span>
							</template>
						</el-table-column>
						<el-table-column label="内存占用">
							<template slot-scope="scope">
								<span
									v-if="scope.row.memtem_color"
									style="color: red"
									>{{ scope.row.mem_ratio }}</span
								>
								<span v-else>{{ scope.row.mem_ratio }}</span>
							</template>
						</el-table-column>
					</el-table>
				</div>
				<pageNation
					style="float: right; margin-top: 10px"
					:pager="pagerActive"
					@handleSizeChange="handleSizeChange1"
					@handleCurrentChange="handleCurrentChange1"
				></pageNation>
			</el-tab-pane>
			<el-tab-pane label="进程异常记录" name="second">
				<!-- 搜索 -->
				<div class="seach">
					<div class="seach_top">
						<el-input
							size="small"
							placeholder="设备SN"
							v-model="inputsn"
							@keyup.enter.native="seachuser1()"
							class="input-with-select"
						>
							<i
								slot="prefix"
								class="el-input__icon el-icon-search"
								@click="seachuser1()"
							></i>
						</el-input>
						<span style="margin-left: 10px">异常类型：</span>
						<el-select
							size="small"
							v-model="valuess"
							placeholder="请选择"
							@change="seachProcess"
						>
							<el-option label="全部" value="0"></el-option>
							<el-option
								v-for="(item, index) in optionsss"
								:key="index"
								:label="item.label"
								:value="item.value"
							></el-option>
						</el-select>
						<span style="margin-left: 10px">选择日期：</span>

						<el-date-picker
							size="small"
							@change="queryProcess()"
							v-model="value1"
							type="datetimerange"
							:picker-options="pickerOptions"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							align="right"
                            
						></el-date-picker>
						<el-button
							size="small"
							type="primary"
							@click="seachuser1()"
							style="margin-left: 10px"
							>确定</el-button
						>
						<el-button
							@click="reset1()"
							size="small"
							style="margin-left: 10px"
							>重置</el-button
						>
						<div class="seach_bottom_btn"></div>
					</div>
				</div>

				<!-- 表格 -->
				<div>
					<div style="text-align: right; margin: 10px 0">
						<el-button
							type="primary"
                            size="small"
							@click="toExport"
							:disabled="showdisabled"
							>导出</el-button
						>
					</div>
					<el-table
						:data="tableDataProcess"
						border
						:cell-style="rowClass"
						:header-cell-style="headClass"
						@sort-change="tableSortChange"
					>
						<el-table-column
							label="日期"
							width="180"
							sortable="costum"
						>
							<template slot-scope="scope">
								<span>{{ scope.row.time | getymd }}</span>
							</template>
						</el-table-column>
						<el-table-column label="进程ID">
							<template slot-scope="scope">
								<span>{{ scope.row.pid }}</span>
							</template>
						</el-table-column>
						<el-table-column label="进程名">
							<template slot-scope="scope">
								<span>{{ scope.row.pid_name }}</span>
							</template>
						</el-table-column>
						<el-table-column label="进程异常">
							<template slot-scope="scope">
								<span style="color: red">{{
									scope.row.md5_type | formatMd5
								}}</span>
							</template>
						</el-table-column>
						<el-table-column label="设备SN">
							<template slot-scope="scope">
								<span>{{ scope.row.dev_sn }}</span>
							</template>
						</el-table-column>
					</el-table>
				</div>
				<pageNation
					style="float: right; margin-top: 10px"
					:pager="pagerActive1"
					@handleSizeChange="handleSizeChange2"
					@handleCurrentChange="handleCurrentChange2"
				></pageNation>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import pageNation from '../../components/pageNation';

import fenye from '@/components/fenye';
import {
	query_detail_info_list,
	query_dev_pid_history_list,
} from '../../api/api.js';

import {
	getlocaltimes,
	settime,
	getymdtime,
	setbatime,
} from '../../servers/sevdate';
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
			exportLinks: '',
			activeName: 'first',
			pagerActive: {
				count: 0,
				page: 0,
				rows: 10,
			},
			pagerActive1: {
				count: 0,
				page: 0,
				rows: 10,
			},
			currentPage: 1,
			rotate: false,
			showdisabled: false,
			errTableVisible: false,
			device_show: false,
			value1: '',
			total_cnt: 1,
			tolpage: 0,
			pagesize: 10,
			input: '',
			inputsn: '',
			value: '0',
			input1: '', //开始时间
			input2: '', //结束时间
			optiondisplay: false,
			dev_devation: {},
			sizeForm: {
				date1: '',
				date2: '',
			},
			options: [
				{
					value: '1',
					label: 'CPU温度报警',
				},
				{
					value: '2',
					label: '主板温度报警',
				},
				{
					value: '3',
					label: '磁盘温度报警',
				},
				{
					value: '4',
					label: '磁盘剩余容量报警',
				},
				{
					value: '5',
					label: '内存比例报警',
				},
			],
			optionsss: [
				{
					value: '1',
					label: '进程md5变更',
				},
				{
					value: '2',
					label: '新增未知进程',
				},
			],
			tableData: [],
			tableData_dao: [],
			tolpage_dao: 0,
			tableDataProcess: [],
			order: 0,
			valuess: '0',
		};
	},
	filters: {
		//时间戳转时间
		getymd(time) {
			return getymdtime(time);
		},
		formatMd5(data) {
			if (data == 1) {
				return '正常';
			} else if (data == 2) {
				return '进程md5变更';
			} else if (data == 3) {
				return '新增未知进程';
			}
		},
	},
	components: { fenye, pageNation },
	mounted() {
		this.getdata();
	},
	methods: {
		seachProcess() {
			this.queryProcess();
		},
		//时间排序
		tableSortChange(column) {
			if (column.column.order == 'descending') {
				this.order = 0;
			} else {
				this.order = 1;
			}
			this.queryProcess();
		},
		//进程异常时间确认
		queryProcess() {
			this.getdataProcess();
		},
		//硬件时间确认筛选
		queryHardware() {
			this.getdata();
		},
		//进程记录分页
		handleSizeChange2(val) {},
		handleCurrentChange2(val) {
			this.pagerActive1.page = val.val;
			this.getdataProcess();
		},
		//导出
		toExport() {
			window.open(this.exportLinks, '_blank');
		},
		//tab选项卡
		handleClick(tab) {
			this.value1 = '';
			this.input = '';
			if (tab.index == 0) {
				this.getdata();
			} else {
				this.getdataProcess();
			}
		},
		//获取页码
		handleCurrentChange1(pages) {
			this.pagerActive.page = pages.val;
			this.getdata();
		},
		//获取每页数量
		gettol(pagetol) {
			this.pagesize = pagetol;
			this.getdata();
		},
		//请求数据
		getdata() {
			this.tableData = [];
			//只能输入由数字和26个英文字母组成的字符串
			let nounied = /^[A-Za-z0-9]+$/;
			//匹配节点ID
			let das = /^Ci/;
			let params = new Object();
			if (nounied.test(this.input) == true) {
				if (das.test(this.input) == true) {
					params.node_id = this.input;
					params.dev_sn = '';
				} else {
					params.dev_sn = this.input;
					params.node_id = '';
				}
			} else if (this.input == '') {
				params.dev_sn = '';
				params.node_id = '';
			} else {
				this.$message.error('搜索条件超出搜索范围');
				return false;
			}
			if (this.value1) {
				params.start_time = setbatime(this.value1[0]);
				params.end_time = setbatime(this.value1[1]);
			} else {
				params.start_time =
					new Date(new Date().toLocaleDateString()).getTime() / 1000;
				params.end_time = setbatime(new Date());
			}
			params.page = this.pagerActive.page - 1;
			if (this.value == '全部') {
				params.alarm_type = 0;
			} else {
				params.alarm_type = this.value;
			}
			if (this.input != '') {
				params.query_type = 1;
			} else {
				params.query_type = 0;
			}
			query_detail_info_list(params)
				.then((res) => {
					if (res.status == 0) {
						if (res.data.dev_detail_info_list) {
							this.showdisabled = false;
							res.data.dev_detail_info_list.forEach(
								(item, index) => {
									let devm = {};
									devm.dev_sn = item.dev_sn;
									devm.node_id = item.node_id;
									devm.time_stamp = item.time_stamp;
									devm.cpu_tem = item.cpu_tem / 100 + '℃';
									devm.mb_tem = item.mb_tem / 100 + '℃';
									devm.hd_tem = item.hd_tem / 100 + '℃';
									devm.cap_ratio = item.cap_ratio / 100 + '%';
									devm.mem_ratio = item.mem_ratio / 100 + '%';
									devm.total_cap = this.common.formatByteActive(
										item.total_cap
									);
									devm.user_cap = this.common.formatByteActive(
										item.user_cap
									);
									devm.up_bandwidth = this.common.formatByteActive(
										item.up_bandwidth
									);
									devm.down_bandwidth = this.common.formatByteActive(
										item.down_bandwidth
									);
									devm.badstade = '';
									if (item.cpu_tem >= 8000) {
										devm.badstade = 'CPU温度报警' + ' / ';
										devm.cputem_color = 'red';
									}
									if (item.mb_tem >= 4000) {
										devm.badstade =
											devm.badstade +
											'主板温度报警' +
											' / ';
										devm.mbtem_color = 'red';
									}
									if (item.hd_tem >= 4000) {
										devm.badstade =
											devm.badstade + '硬盘温度报警';
										devm.hdtem_color = 'red';
									}
									if (item.mem_ratio >= 8000) {
										devm.badstade =
											devm.badstade +
											'内存容量报警' +
											' / ';
										devm.memtem_color = 'red';
									}
									if (item.cap_ratio <= 500) {
										devm.badstade =
											devm.badstade + '磁盘剩余容量报警';
										devm.cap_color = 'red';
									}
									if (devm.badstade == '') {
										devm.badstade = '正常';
									}

									this.tableData.push(devm);
								}
							);
							// this.tableData = res.data.dev_detail_info_list;
							this.pagerActive.count = res.data.total_num;
						} else {
							this.showdisabled = true;
							this.$message('暂无数据');
							this.pagerActive.count = res.data.total_num;
						}
					} else {
						this.$message.error(res.err_msg);
					}
				})
				.catch((err) => {});
		},
		//进程异常记录
		getdataProcess() {
			this.tableData = [];
			let params = new Object();
			let param = new Object();
			if (this.value1) {
				param.start_time = setbatime(this.value1[0]);
				param.end_time = setbatime(this.value1[1]);
			} else {
				param.start_time =
					new Date(new Date().toLocaleDateString()).getTime() / 1000;
				param.end_time = setbatime(new Date());
			}

			(param.dev_sn = this.inputsn),
				(param.md5_type = parseInt(this.valuess)),
				(param.page = this.pagerActive1.page - 1),
				(param.order = this.order);
			query_dev_pid_history_list(param)
				.then((res) => {
					if (res.status == 0) {
						this.tableDataProcess = [];
						if (res.data.pid_unsual_list) {
							this.showdisabled = false;
							this.tableDataProcess = [];
							this.exportLinks = res.data.filename;
							this.tableDataProcess = res.data.pid_unsual_list;
						} else {
							this.showdisabled = true;
							this.$message('暂无数据');
						}
						this.pagerActive1.count = res.data.total_num;
					} else {
						this.$message.error(res.err_msg);
					}
				})
				.catch((err) => {});
		},
		//筛选按钮
		option_display() {
			this.optiondisplay = !this.optiondisplay;
			this.rotate = !this.rotate;
		},

		//确定搜索
		seachuser() {
			this.pagerActive.page = 1;
			this.getdata();
			this.tolpage = 0;
		},
		//确定搜索
		seachuser1() {
			this.pagerActive1.page = 1;
			this.getdataProcess();
		},
		//重置
		reset() {
			this.value = '0';
			this.input = '';
			this.value1 = '';
			this.valuess = '0';
			this.pagerActive1.page = 1;
			this.pagerActive.page = 1;
			this.getdata();
		},
		reset1() {
			this.value = '0';
			this.input = '';
			this.value1 = '';
			(this.inputsn = ''), (this.valuess = '0');
			this.pagerActive1.page = 1;
			this.pagerActive.page = 1;
			this.getdataProcess();
		},
		geydata2() {
			//只能输入由数字和26个英文字母组成的字符串
			let nounied = /^[A-Za-z0-9]+$/;
			//匹配节点ID
			let das = /^Ci/;
			let params = new Object();
			if (nounied.test(this.input) == true) {
				if (das.test(this.input) == true) {
					params.node_id = this.input;
					params.dev_sn = '';
				} else {
					params.dev_sn = this.input;
					params.node_id = '';
				}
			} else if (this.input == '') {
				params.dev_sn = '';
				params.node_id = '';
			} else {
				this.$message.error('搜索条件超出搜索范围');
				return false;
			}
			if (this.value1) {
				params.start_time = setbatime(this.value1[0]);
				params.end_time = setbatime(this.value1[1]);
			} else {
				params.start_time =
					setbatime(
						new Date(
							new Date(new Date().toLocaleDateString()).getTime()
						)
					) -
					7 * 24 * 60 * 60;
				params.end_time = setbatime(new Date());
			}
			params.page = this.tolpage_dao;
			if (this.value == '全部') {
				params.alarm_type = 0;
			} else {
				params.alarm_type = this.value;
			}
			if (this.input != '') {
				params.query_type = 1;
			} else {
				params.query_type = 0;
			}
			params.export_file = 1;
			query_detail_info_list(params)
				.then((res) => {
					if (res.status == 0) {
						window.open(res.data.filename);
						this.common.monitoringLogs('导出', '设备异常记录', 1);
					} else {
						this.common.monitoringLogs('导出', '设备异常记录', 0);
						this.$message.error(res.err_msg);
					}
				})
				.catch((err) => {
					this.common.monitoringLogs('导出', '设备异常记录', 0);
				});
		},
		exportExcel() {
			require.ensure([], () => {
				const {
					export_json_to_excel,
				} = require('../../excel/Export2Excel.js');
				const tHeader = [
					'日期',
					'异常类型',
					'设备SN',
					'节点ID',
					'当前使用空间/总空间',
					'CPU温度',
					'硬盘温度',
					'磁盘剩余容量',
					'内存占用',
				];
				// 上面设置Excel的表格第一行的标题
				const filterVal = [
					'time_stamp',
					'badstade',
					'dev_sn',
					'node_id',
					'cap_mem',
					'cpu_tem',
					'hd_tem',
					'cap_ratio',
					'mem_ratio',
				];
				// 上面的index、nickName、name是tableData里对象的属性
				const list = this.tableData_dao; //把data里的tableData存到list
				const data = this.formatJson(filterVal, list);
				export_json_to_excel(tHeader, data, '设备异常记录');
				this.tableData_dao = [];
				this.tolpage_dao = 0;
			});
		},
		formatJson(filterVal, jsonData) {
			return jsonData.map((v) => filterVal.map((j) => v[j]));
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
};
</script>

<style lang="scss" scoped>
.content {
	width: 100%;
	height: 100%;
	text-align: left;
	.seach {
		width: 100%;
		margin-top: 20px;
		.seach_top {
			width: 100%;
			height: 60px;
			.input-with-select {
				width: 15%;
				float: left;
			}
			.seach_top_right {
				float: left;
				height: 40px;
				line-height: 40px;
				margin-left: 10px;
			}
		}
		.seach_bottom {
			text-align: left;
			background: #f0f5f5;
			border-radius: 10px;
			padding: 10px 15px 3px 15px;
			margin-bottom: 10px;
			.el-select {
				width: 150px;
			}
			.el-input {
				width: 150px;
			}
			.seach_bottom_btn {
				margin: 10px 10px;
			}
		}
	}
	.con_lable {
		width: 100%;
	}
	.device_title_name {
		width: 16%;
		background: #eeeeee;
		color: #000000;
	}
	.device_title_content {
		width: 15%;
		background: #ffffff;
		color: #000000;
	}
	.tableclose {
		width: 100%;
		padding-top: 10px;
		text-align: center;
	}
}
//旋转
.aa {
	transition: all 1s;
}
.go {
	transform: rotate(-180deg);
	transition: all 1s;
}
</style>
