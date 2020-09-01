<template>
	<section class="myself-container">
		<el-tabs
			type="border-card"
			v-model="activeName"
			@tab-click="handleClick"
			style="margin-top: 30px"
		>
			<el-tab-pane label="通知记录" name="frist">
				<div class="device_form">
					<el-form
						ref="form"
						:model="form"
						:inline="true"
						:label-position="labelPosition"
					>
						<el-row type="flex">
							<el-form-item>
								<el-input
									v-model="notice_title"
									size="small"
									placeholder="请输入标题"
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
								<el-form-item label="状态">
									<el-select
										v-model="sendValue"
										size="small"
										placeholder="请选择"
										@change="onChange2"
									>
										<el-option
											v-for="item in options2"
											:key="item.value"
											:label="item.label"
											:value="item.value"
										>
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="发送时间">
									<el-date-picker
										v-model="times"
										size="small"
										type="datetimerange"
										value-format="timestamp"
										range-separator="至"
										start-placeholder="开始日期"
										end-placeholder="结束日期"
									></el-date-picker>
								</el-form-item>
							</el-row>
							<el-form-item>
								<el-button
									type="primary"
									size="small"
									@click="onSumit"
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
					</el-form>
				</div>
				<div class="devide_table">
					<el-row type="flex" class="row_active">
						<el-col :span="24">
							<tableBarActiveUserPushing
								id="rebateSetTable"
								ref="table1"
								@tableSortChange="tableSortChange"
								@toDetails="toDetails"
								@disable="disable"
								tooltip-effect="dark"
								:tableData="tableData"
								:rowHeader="rowHeader"
								:tableOption="tableOption"
								@handleButton="handleButton"
								:operatingStatus="operatingStatus"
								@toOperating="toOperating"
							></tableBarActiveUserPushing>
						</el-col>
					</el-row>
				</div>
				<div
					class="devide_pageNation"
					style="display: flex; justify-content: flex-end"
				>
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
			<el-tab-pane label="公告记录" name="second">
				<div class="device_form">
					<el-form
						ref="form"
						:model="form"
						:inline="true"
						:label-position="labelPosition"
					>
						<el-row type="flex">
                            <el-form-item>

								<el-input
									size="small"
									v-model="notice_title"
									placeholder="请输入标题"
									@keyup.enter.native="onSubmitKey"
								>
									<i
										slot="prefix"
										class="el-input__icon el-icon-search"
										@click="onSubmitKey"
									></i>
								</el-input>
                            </el-form-item>
						<el-row
							type="flex"
						>
							<el-form-item label="状态">
								<el-select
									size="small"
									v-model="value"
									placeholder="请选择"
									@change="onChange2"
								>
									<el-option
										v-for="item in options2"
										:key="item.value"
										:label="item.label"
										:value="item.value"
									>
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="发送时间">
								<el-date-picker
									size="small"
									v-model="times"
									type="datetimerange"
									value-format="timestamp"
									range-separator="至"
									start-placeholder="开始日期"
									end-placeholder="结束日期"
								></el-date-picker>
							</el-form-item>
						</el-row>
						<el-form-item>
							<el-button
								type="primary"
								@click="onSumit"
								size="small"
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
					</el-form>
				</div>
				<div class="devide_table">
					<el-row type="flex" class="row_active">
						<el-col :span="24">
							<tableBarActiveUserPushing
								id="rebateSetTable"
								ref="table1"
								tooltip-effect="dark"
								@tableSortChange="tableSortChange1"
								@toDetails="toDetails1"
								@disable="disable1"
								:tableData="tableData"
								:rowHeader="rowHeader"
								:tableOption="tableOption"
								@handleButton="handleButton1"
								:operatingStatus="operatingStatus"
								@toOperating="toOperating"
							></tableBarActiveUserPushing>
						</el-col>
					</el-row>
				</div>
				<div
					class="devide_pageNation"
					style="display: flex; justify-content: flex-end"
				>
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
		<el-dialog
			:visible.sync="dialogVisible"
			width="40%"
			:before-close="handleClose"
		>
			<p>通知详情</p>
			<p>
				<span>标题：</span>
				<span>{{ formInfo.Notice_title }}</span>
			</p>
			<p>
				<span>内容：</span>
				<span>{{ Notice_contentActive }}</span>
			</p>
			<p>
				<span>发送设备：</span>
				<span>所有设备</span>
			</p>
			<p>
				<span>发送对象：</span>
				<span>{{ formInfo.Notice_audice_typeActive }}</span>
			</p>
			<p>到达详情</p>
			<p>
				<span>发送数：</span>
				<span>{{ formInfo.Notice_send_nums }}条</span>
			</p>
			<p>
				<span>到达数：</span>
				<span>{{ Notice_reach_nums_active }}条</span>
			</p>
			<p>
				<span>打开数：</span>
				<span>{{ Notice_open_nums_active }}条</span>
			</p>
			<p>
				<span>删除数：</span>
				<span>{{ Notice_del_nums_active }}条</span>
			</p>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false"
					>确 定</el-button
				>
			</span>
		</el-dialog>
		<el-dialog
			:visible.sync="dialogVisible2"
			width="40%"
			:before-close="handleClose"
		>
			<p style="width: 100%; text-align: center">
				{{ this.formInfo1.Notice_title }}
			</p>
			<p style="width: 100%; text-align: center">
				{{ this.formInfo1.Notice_push_time }}
			</p>
			<p style="width: 100%; text-align: center">
				{{ Notice_contentActive1 }}
			</p>
			<iframe
				:src="this.htmlUrl"
				frameborder="0"
				width="100%"
				height="100%"
			></iframe>
		</el-dialog>
	</section>
</template>

<script>
import tableBarActive2 from '../../components/tableBarActive2';
import tableBarActiveUserPushing from '../../components/tableBarActiveUserPushing';

import mySearch from '../../components/mySearch';
import pageNation from '../../components/pageNation';
import {
	query_push_history_list,
	delete_push_on_timer,
	getnotice,
	setactionlog,
} from '../../api/api';
import common from '../../common/js/util.js';

export default {
	data() {
		return {
			rotate: false,
			Notice_reach_nums_active: 0,
			Notice_open_nums_active: 0,
			Notice_del_nums_active: 0,
			form: {},
			Notice_contentActive: '',
			Notice_contentActive1: '',
			activeName: 'frist',
			query_type: 0,
			notice_type: 0,
			notice_status: -1,
			notice_title: '',
			start_time: 0,
			end_time: 1595532599,
			cur_page: 0,

			labelPosition: 'left',
			dialogVisible: false,
			dialogVisible2: false,
			searchText: '',
			operatingStatus: true,
			clomnSelection: true,
			reserveselection: true,
			value1: '',
			value2: '',
			sendValue: '',
			times: '',
			modify_user_name: '',

			options2: [
				{
					value: '-1',
					label: '全部',
				},
				{
					value: '0',
					label: '已发送',
				},
				{
					value: '1',
					label: '待发送',
				},
				{
					value: '2',
					label: '已撤回',
				},
				{
					value: '3',
					label: '失败',
				},
			],
			rowHeader: [
				{
					prop: 'Notice_status',
					label: '状态',
				},
				{
					prop: 'Notice_audice_type',
					label: '发送对象',
				},
				{
					prop: 'Notice_title',
					label: '标题',
				},
				{
					prop: 'Notice_content',
					label: '内容',
				},
				{
					prop: 'Notice_push_time',
					label: '发送时间',
					sortable: 'custom',
				},
				{
					prop: 'Notice_modify_user_name',
					label: '修改人',
				},
				{
					prop: 'Notice_modify_time',
					label: '修改时间',
					sortable: 'custom',
				},
			],
			tableData: [],
			tableOption: {
				label: '操作',
				options: [
					{
						label: '详情',
						type: 'primary',
						methods: 'freeze',
					},
					{
						label: '撤回',
						type: 'danger',
						methods: 'thaw',
					},
				],
			},
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
			showState: false,
			showState1: false,
			formInfo: {},
			formInfo1: {},
			htmlUrl: '',
			order: 0,
		};
	},
	mounted: function () {
		this.queryInfo();
		var user = JSON.parse(this.get('userInfo'));
		this.modify_user_name = user.username || '';
	},
	methods: {
		//排序
		tableSortChange(column) {
			this.pager.page = 1;
			if (column.order == 'descending') {
				this.order = 0;
			} else {
				this.order = 1;
			}
			this.queryInfo();
		},
		//排序
		tableSortChange1(column) {
			this.pager.page = 1;
			if (column.order == 'descending') {
				this.order = 0;
			} else {
				this.order = 1;
			}
			this.queryInfo();
		},
		//通知input筛选
		onSubmitKey() {
			this.queryInfo();
		},
		//重置
		onReset() {
			this.notice_status = -1;
			this.notice_title = '';
			this.times = '';
			this.sendValue = ' 全部';
			this.queryInfo();
		},
		//获取存在cookies中的userInfo信息
		get: function (name) {
			var v = window.document.cookie.match(
				'(^|;) ?' + name + '=([^;]*)(;|$)'
			);

			return v ? v[2] : null;
		},
		//选项卡切换
		handleClick(val) {
			this.queryInfo();
		},
		onChange2(val) {
			switch (val) {
				case '-1':
					this.notice_status = parseInt(val);
					this.sendValue = ' 全部';
					break;

				case '0':
					this.notice_status = parseInt(val);
					this.sendValue = ' 已发送';
					break;
				case '1':
					this.notice_status = parseInt(val);
					this.sendValue = ' 待发送';
					break;
				case '2':
					this.notice_status = parseInt(val);
					this.sendValue = ' 已撤回';
					break;
				case '3':
					this.notice_status = parseInt(val);
					this.sendValue = ' 失败';
					break;

				default:
					break;
			}
		},
		//筛选隐藏显示

		queryInfo() {
			if (this.activeName == 'frist') {
				this.notice_type = 0;
			} else {
				this.notice_type = 1;
			}
			let param = new Object();

			param.notice_type = this.notice_type;
			param.notice_status = this.notice_status;
			param.notice_title = this.notice_title;
			if (this.times) {
				param.start_time = this.times[0] / 1000;
				param.end_time = this.times[1] / 1000;
			} else {
				var day1 = new Date();
				param.end_time = parseInt((day1.getTime() / 1000).toFixed(3));
				param.start_time = parseInt(
					((day1.getTime() - 3600 * 1000 * 24 * 90) / 1000).toFixed(3)
				);
			}
			if (param.notice_status == -1 && param.notice_title == '') {
				param.query_type = 1;
			} else {
				param.query_type = 1;
			}

			param.order = this.order;
			param.cur_page = this.pager.page - 1;
			query_push_history_list(param)
				.then((res) => {
					if (res.status == 0) {
						if (res.data.data) {
							let nowArr = [];
							nowArr = res.data.data;
							for (var i = 0; i < nowArr.length; i++) {
								if (nowArr[i] == null) {
									nowArr.splice(i, 1);
									i = i - 1;
								}
							}
							let tempArr = nowArr;
							for (var i = 0; i < tempArr.length; i++) {
								switch (tempArr[i].Notice_status) {
									case 0:
										tempArr[i].Notice_status = '已发送';
										break;
									case 1:
										tempArr[i].Notice_status = '待发送';
										break;
									case 2:
										tempArr[i].Notice_status = '已撤回';
										break;
									case 3:
										tempArr[i].Notice_status = '失败';
										break;

									default:
										break;
								}
								if (tempArr[i].Notice_audice_type == 1) {
									tempArr[i].Notice_audice_type = '指定对象';
									tempArr[i].Notice_audice_typeActive =
										tempArr[i].Notice_uid_list;
								} else {
									tempArr[i].Notice_audice_type = '所有人';
									tempArr[i].Notice_audice_typeActive =
										'所有人';
								}

								if (tempArr[i].Notice_modify_user_name == '') {
									tempArr[i].Notice_modify_user_name =
										tempArr[i].Notice_push_user_name;
								}
								if (tempArr[i].Notice_modify_time == 0) {
									tempArr[i].Notice_modify_time =
										tempArr[i].Notice_push_time;
								}

								tempArr[
									i
								].Notice_push_time = this.common.getTimes(
									tempArr[i].Notice_push_time * 1000
								);
								tempArr[
									i
								].Notice_modify_time = this.common.getTimes(
									tempArr[i].Notice_modify_time * 1000
								);
							}

							this.tableData = tempArr;
							this.pager.count = res.data.total_num;
						}
					} else {
						this.$message({
							message: '服务出错',
							type: 'error',
						});
					}
				})
				.catch((error) => {
				});
		},
		freeze() {
			this.dialogVisible = true;
		},

		getShow() {
			this.showState = !this.showState;
			this.rotate = !this.rotate;
		},
		getShow1() {
			this.showState1 = !this.showState1;
			this.rotate = !this.rotate;
		},
		//通知详情
		toDetails(val) {
			this.formInfo = val;
			this.dialogVisible = true;
			let param = {
				push_id: val.Notice_push_id,
			};

			getnotice(param)
				.then((res) => {
					this.Notice_contentActive = res.data.data[0].Notice_content;
					this.Notice_open_nums_active =
						res.data.data[0].Notice_open_nums;
					this.Notice_del_nums_active =
						res.data.data[0].Notice_del_nums;
					this.Notice_reach_nums_active =
						res.data.data[0].Notice_reach_nums;
				})
				.catch((error) => {
				});
		},
		//公告详情
		toDetails1(val) {
			this.dialogVisible2 = true;
			this.formInfo1 = val;
			let param = {
				push_id: val.Notice_push_id,
			};

			getnotice(param)
				.then((res) => {
					this.Notice_contentActive1 =
						res.data.data[0].Notice_content;
					this.Notice_open_nums_active =
						res.data.data[0].Notice_open_nums;
					this.Notice_del_nums_active =
						res.data.data[0].Notice_del_nums;
					this.Notice_reach_nums_active =
						res.data.data[0].Notice_reach_nums;
				})
				.catch((error) => {
				});
			this.htmlUrl = val.Notice_url;
		},
		//通知撤回
		disable(val) {
			let param = {
				push_id: val.Notice_push_id,
				modify_user_name: this.modify_user_name,
			};
			delete_push_on_timer(param)
				.then((res) => {
					if (res.status == 0) {
						this.$message({
							message: '撤回成功',
							type: 'success',
						});
						this.common.monitoringLogs('撤回', '撤回通知', 1);
						this.queryInfo();
					} else {
						this.$message({
							message: '撤回失败',
							type: 'error',
						});
						this.common.monitoringLogs('撤回', '撤回通知', 0);
					}
				})
				.catch((error) => {
					this.common.monitoringLogs('撤回', '撤回通知', 0);
				});
		},
		//公告撤回
		disable1(val) {
			let param = {
				push_id: val.Notice_push_id,
				modify_user_name: this.modify_user_name,
			};
			delete_push_on_timer(param)
				.then((res) => {
					if (res.status == 0) {
						this.$message({
							message: '撤回成功',
							type: 'success',
						});
						this.common.monitoringLogs('撤回', '撤回公告', 1);
						this.queryInfo();
					} else {
						this.$message({
							message: '撤回失败',
							type: 'success',
						});
						this.common.monitoringLogs('撤回', '撤回公告', 0);
					}
				})
				.catch((error) => {
					this.common.monitoringLogs('撤回', '撤回公告', 0);
				});
		},

		//公告详情

		handleButton1(val, rows) {
			if (val == 'freeze') {
				this.dialogVisible2 = true;
				this.htmlUrl = rows.Notice_url;
			} else {
				let param = {
					push_id: rows.Notice_push_id,
					modify_user_name: this.modify_user_name,
				};
				delete_push_on_timer(param)
					.then((res) => {
						if (res.status == 0) {
							this.$message({
								message: '撤回成功',
								type: 'success',
							});
							this.queryInfo();
						}
					})
					.catch((error) => {
					});
			}
		},
		addAccout() {
			this.dialogVisible = true;
		},
		//分页
		handleCurrentChange(val) {
			this.pager.page = val.val;
			this.queryInfo();
		},
		//确定查询
		onSumit() {
			// return false
			this.queryInfo();
		},
	},
	components: {
		pageNation: pageNation,
		tableBarActive2: tableBarActive2,
		mySearch: mySearch,
		tableBarActiveUserPushing: tableBarActiveUserPushing,
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
</style>
