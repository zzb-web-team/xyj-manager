<template>
	<div class="content newsd">
		<!-- 面包屑  -->
		<!-- <el-breadcrumb separator="/" style="margin-bottom: 20px;">
      <el-breadcrumb-item>
        <a>设备监控详情</a>
      </el-breadcrumb-item>
    </el-breadcrumb> -->

		<section class="myself-container">
			<div class="device_form">
				<el-form ref="form" :model="form">
					<el-row type="flex" class="row_active row_active_monitor">
						<div>
							<el-input
								v-model="dev_sn_active"
								placeholder="请输入设备SN"
								@keyup.enter.native="onSubmitKey"
							></el-input>
						</div>
						<div class="seach_top_right" @click="option_display()">
							筛选
							<i
								class="el-icon-caret-bottom"
								:class="[
									rotate
										? 'fa fa-arrow-down go'
										: 'fa fa-arrow-down aa',
								]"
							></i>
						</div>
					</el-row>
				</el-form>
			</div>
			<div v-if="optiondisplay" class="seach_bottom">
				<span>状态：</span>
				<el-select
					v-model="valuestate"
					placeholder="请选择"
					@change="onChange"
				>
					<el-option label="全部" value="-1"></el-option>
					<el-option
						v-for="item in optionstate"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					></el-option>
				</el-select>

				<el-button plain @click="setInfo()">重置</el-button>
			</div>
			<div class="devide_table">
				<el-row type="flex" class="row_active">
					<el-col :span="24">
						<el-table
							:data="tableData"
							style="width: 100%"
							:cell-style="rowClass"
							:header-cell-style="headClass"
						>
							<el-table-column
								prop="dev_sn"
								label="设备SN"
							></el-table-column>
							<el-table-column label="设备状态">
								<template slot-scope="scope">
									{{ scope.row.online_status | formatStatus }}
								</template>
							</el-table-column>
							<el-table-column
								prop="default_process_num"
								label="预置进程数"
							>
							</el-table-column>
							<el-table-column
								prop="cur_process_num"
								label="当前进程数"
							>
							</el-table-column>
							<el-table-column label="CPU占用">
								<template slot-scope="scope">
									{{ scope.row.dev_cpu | formatCpu }}
								</template>
							</el-table-column>
							<el-table-column label="内存占用">
								<template slot-scope="scope">
									{{ scope.row.dev_mem | formatBytes }}
								</template>
							</el-table-column>
							<el-table-column label="使用流量">
								<template slot-scope="scope">
									{{ scope.row.dev_flow | formatBytes }}
								</template>
							</el-table-column>

							<el-table-column label="操作">
								<template slot-scope="scope">
									<el-button
										@click="handleButton(scope)"
										type="text"
										size="small"
										>查看详情</el-button
									>
								</template>
							</el-table-column>
						</el-table>
					</el-col>
				</el-row>
			</div>
			<div class="devide_pageNation">
				<div class="devide_pageNation_active">
					<el-row type="flex">
						<el-col :span="6">
							<pageNation
								:pager="pager"
								@handleSizeChange="handleSizeChange1"
								@handleCurrentChange="handleCurrentChange1"
							></pageNation>
						</el-col>
					</el-row>
				</div>
			</div>
			<el-dialog
				:visible.sync="monitorDetails"
				class="monitor-details"
				:close-on-click-modal="false"
			>
				<div class="monitor-con">
					<div class="monitorDetails-bottom">
						<div class="searach-con">
							<el-form ref="form" :model="form">
								' {{ snNum }} ' 设备进程监控详情
							</el-form>
						</div>
						<el-table
							:data="tableDataActive"
							style="width: 100%"
							:cell-style="rowClass"
							:header-cell-style="headClass"
						>
							<el-table-column
								prop="pid"
								label="进程ID"
								width="180"
							>
							</el-table-column>
							<el-table-column
								label="进程名"
								prop="pid_name"
								width="180"
							>
							</el-table-column>
							<el-table-column label="进程类型">
								<template slot-scope="scope">
									{{ scope.row.pid_type | formatName }}
								</template>
							</el-table-column>
							<el-table-column label="md5码是否变更">
								<template slot-scope="scope">
									{{ scope.row.change_md5 | formatMd5 }}
								</template>
							</el-table-column>
							<el-table-column label="CPU占用">
								<template slot-scope="scope">
									{{ scope.row.pid_cpu | formatCpu }}
								</template>
							</el-table-column>
							<el-table-column prop="" label="内存占用">
								<template slot-scope="scope">
									{{ scope.row.pid_mem | formatBytes }}
								</template>
							</el-table-column>

							<el-table-column prop="" label="使用流量">
								<template slot-scope="scope">
									{{ scope.row.pid_flow | formatBytes }}
								</template>
							</el-table-column>
							<el-table-column prop="" label="进程状态">
								<template slot-scope="scope">
									{{ scope.row.pid | formatStatuss }}
								</template>
							</el-table-column>
							<el-table-column label="操作">
								<template slot-scope="scope">
									<div
										v-if="scope.row.pid !== -1"
										style="cursor: pointer; color: blue"
										@click="onclickprocess(scope)"
									>
										关闭进程
									</div>
									<div
										v-else
										style="cursor: pointer; color: blue"
									>
										--
									</div>
								</template>
							</el-table-column>
						</el-table>
						<pageNation
							style="float: right; margin-top: 10px"
							:pager="pagerActive"
							@handleSizeChange="handleSizeChange2"
							@handleCurrentChange="handleCurrentChange2"
						></pageNation>
					</div>

					<div slot="footer" class="monitor-footer" style></div>
				</div>
			</el-dialog>
		</section>
	</div>
</template>

<script>
import pageNation from '../../components/pageNation';
import fenye from '@/components/fenye';
import {
	query_dev_pid_general_list,
	query_dev_pid_detail_list,
	ctrl_node_state,
} from '../../api/api.js';
import common from '../../common/js/util.js';

export default {
	data() {
		return {
			dev_sn_active: '',
			value1: '',
			rotate: false,
			operatingStatus: true,
			operatingStatus1: false,
			monitorDetails: false,
			currentPage: 1,
			valuestate: '-1',
			snNum: '',
			optionstate: [
				{
					value: 1,
					label: '在线',
				},
				{
					value: 0,
					label: '离线',
				},
				{
					value: 1000,
					label: '重启中',
				},
				{
					value: 1001,
					label: '关机中',
				},
			],
			tableDataActive: [],
			tableData: [],
			dev_sn: '',

			pager: {
				count: 0,
				page: 1,
				rows: 10,
			},
			pager1: {
				count: 0,
				page: 0,
				rows: 10,
			},
			pagerActive: {
				count: 1,
				page: 0,
				rows: 10,
			},
			total_cnt: 1,
			tolpage: 1,
			pagesize: 10,
			form: {
				node_id: '',
				dev_sn: '',
				start_time: '',
				end_time: '',
				alarm_type: '0',
				value1: '',
				value2: '',
			},
			showState: false,
			alertNum: 0,
			dataNum: '8888',
			clomnSelection: false,
			push_key: '',

			value: '',
			query_type: 0,
			details_table: {
				dev_sn: '',
				node_id: '',
				online_status: '',
				up_bandwidth: '',
				cap_num: 0,
				cpu_tem: '',
				mb_tem: '',
				hd_tmp: '',
			},
			start_time: '',
			end_time: '',
			start_time_active: '',
			end_time_active: '',
			alarm_type: 0,
			alarm_status: '',
			optiondisplay: false,
		};
	},
	filters: {
		formatStatus(data) {
			if (data == 1) {
				return '在线';
			} else if (data == 0) {
				return '离线';
			} else if (data == 1000) {
				return '重启中';
			} else if (data == 1001) {
				return '关机中';
			}
		},

		formatCpu(data) {
			if (data == 0) {
				return 0;
			} else {
				return (data / 100).toFixed(2) + '%';
			}
		},
		formatBytes(data) {
			let _this = this;
			if (data == 0) {
				return 0;
			} else {
				return common.formatByteActive(data);
			}
		},
		formatName(data) {
			if (data == 0) {
				return '预置进程';
			} else {
				return '未知进程';
			}
		},
		formatMd5(data) {
			if (data == 1) {
				return '否';
			} else if (data == 2) {
				return '是';
			} else if (data == 3) {
				return '--';
			}
		},
		formatStatuss(data) {
			if (data !== -1) {
				return '运行中';
			} else {
				return '关闭中';
			}
		},
	},
	mounted: function () {
		this.push_key = this.$route.query.push_key;
		this.dataNum = this.tableData.length;
		let nowTimes = new Date(
			new Date(new Date().toLocaleDateString()).getTime() +
				24 * 60 * 60 * 1000 -
				1
		);

		let befDate = new Date(nowTimes - 1 * 24 * 3600 * 1000);
		let befDateActive = new Date(nowTimes.getTime() - 1 * 24 * 3600 * 1000);
		(this.end_time = Math.round(nowTimes.getTime() / 1000)),
			// this.end_time_active = Math.round(nowTimes.getTime() / 1000),
			(this.start_time = Math.round(befDate.getTime() / 1000)),
			// this.start_time_active = Math.round(befDateActive.getTime() / 1000),
			this.queryInfo();
	},
	methods: {
		onclickprocess(data) {
			console.log(data);
			let param = new Object();
			(param.login_token = '8vAmfX19fX1NeaggfX19fQ=='),
				(param.dev_sn = this.snNum),
				(param.ctrl_type = 5),
				(param.pid = data.row.pid),
				(param.pname = data.row.pid_name);
			param.extra_info = {
				ctrl_type: 5,
				pid: data.row.pid,
				pname: data.row.pid_name,
			};
			ctrl_node_state(param)
				.then((res) => {
					if (res.status == 0) {
						this.$message({
							message: '关闭进程成功',
							type: 'success',
						});
					}
					this.monitorDetails = false;
				})
				.catch((error) => {
					console.log(error);
				});
		},
		//获取页码

		//获取每页数量
		handleCurrentChange1(pagetol) {
			this.pager.page = pagetol;
			this.queryInfo();
		},
		handleCurrentChange2(pagetol) {
			this.pager1.page = pagetol.val;
			let param = new Object();
			param.page = this.pager1.page - 1;

			param.dev_sn = this.snNum;

			query_dev_pid_detail_list(param)
				.then((res) => {
					console.log(res);
					if (res.status == 0 && res.err_code != 0) {
						let errorId = res.err_code;
						this.$message({
							message: `${this.common.getErrorcodeInfo(errorId)}`,
							type: 'info',
						});
						this.details_table = {};
					} else {
						this.tableDataActive = [];
						this.tableDataActive = res.data.detail_pid_list;
						this.pagerActive.count = res.data.total_num;
					}
					// this.queryDevInfo();
				})
				.catch((err) => {});
		},
		onClose() {
			this.monitorDetails = false;
		},
		onChange(item) {
			this.pager.page = 1;
			this.valuestate = item;
			this.queryInfo();
		},
		onChangeActive(item) {
			this.alarm_status = item;
			this.pagerActive.page = 1;
			this.queryDevInfo();
		},
		handleButton(val) {
			this.monitorDetails = true;
			this.pagerActive.page = 1;
			this.$forceUpdate(); //强制刷新组件
			let param = new Object();
			param.page = this.pagerActive.page;
			param.dev_sn = val.row.dev_sn;
			this.snNum = val.row.dev_sn;
			query_dev_pid_detail_list(param)
				.then((res) => {
					console.log(res);
					if (res.status == 0 && res.err_code != 0) {
						let errorId = res.err_code;
						this.$message({
							message: `${this.common.getErrorcodeInfo(errorId)}`,
							type: 'info',
						});
						this.details_table = {};
					} else {
						this.tableDataActive = [];
						this.tableDataActive = res.data.detail_pid_list;
						this.pagerActive.count = res.data.total_num;
					}
					// this.queryDevInfo();
				})
				.catch((err) => {});
		},
		//改变起始时间
		onChangeStartTime(val) {
			this.start_time = Math.round(val / 1000);
		},
		onChangeEndTime(val) {
			this.end_time = Math.round(val / 1000);
		},
		onChangeStartTimeActive(val) {
			this.start_time_active = Math.round(val / 1000);
		},
		onChangeEndTimeActive(val) {
			this.end_time_active = Math.round(val / 1000);
		},
		handleSelectionChange(val) {
			this.alertNum = val.length;
		},
		// handleSizeChange(val) {},
		// handleCurrentChange(val) {
		//   this.pager.page = val.val;
		//   this.queryInfo();
		// },
		// handleCurrentChange1(val) {
		//   this.pagerActive.page = val.val;
		//   this.queryDevInfo();
		// },
		getInfoActive() {
			if (this.end_time - this.start_time_active < 0) {
				this.$message({
					message: '结束时间不能小于起始时间',
					type: 'error',
				});
				return false;
			}
			this.queryDevInfo();
		},
		getInfo() {
			if (this.end_time - this.start_time < 0) {
				this.$message({
					message: '结束时间不能小于起始时间',
					type: 'error',
				});
				return false;
			}
			if (this.form.dev_sn != '') {
				this.query_type = 1;
			} else {
				this.query_type = 0;
			}
			this.queryInfo();
		},
		//回车键搜索
		onSubmitKey() {
			this.pager.page = 1;
			this.queryInfo();
		},
		//重置
		setInfo() {
			this.dev_sn_active = '';
			this.valuestate = '-1';
			this.queryInfo();
		},
		//查询发布版本历史信息
		queryInfo() {
			let param = new Object();
			(param.dev_sn = this.dev_sn_active),
				(param.online_status = parseInt(this.valuestate)),
				(param.page = this.pager.page - 1);
			query_dev_pid_general_list(param)
				.then((res) => {
					console.log(res);
					if (res.status == 0 && res.err_code != 0) {
						let errorId = res.err_code;
						this.$message({
							message: `${this.common.getErrorcodeInfo(errorId)}`,
							type: 'info',
						});
						this.tableData = [];
					} else {
						if (res.data.general_pid_list) {
							let nowarractive = res.data.general_pid_list;

							this.dataNum = nowarrLength;
							this.tableData = nowarractive;
						} else {
							this.tableData = [];
						}
					}
					let nowarrLength = res.data.total_num;
					this.pager.count = nowarrLength;
				})
				.catch((error) => {
					this.$message({
						message: '网络出错，请重新请求',
						type: 'error',
					});
				});
		},
		// 表头样式设置
		headClass() {
			return 'text-align: center;background:#eef1f6;';
		},
		// 表格样式设置
		rowClass() {
			return 'text-align: center;';
		},
		//筛选按钮
		option_display() {
			this.optiondisplay = !this.optiondisplay;
			this.rotate = !this.rotate;
		},
	},
	components: {
		pageNation: pageNation,
		fenye: fenye,
	},
};
</script>

<style lang="less">
// .newsd {
//   // min-width: 1755px;
// }
.myself-container {
	width: 100%;
	//min-width: 1600px;
	.devide_title {
		width: 100%;
		height: auto;
		overflow: hidden;
		margin-top: 10px;
		// background: #f2f2f2;
		// padding: 15px 0px;
		box-sizing: border-box;

		.el-col {
			padding: 0px 20px;
		}
	}

	.device_form {
		width: 100%;
		height: auto;
		overflow: hidden;
		// background: #f0f5f5;
		// padding: 15px 30px;
		box-sizing: border-box;

		.el-form-item {
			margin-bottom: 0px;
		}

		.row_active {
			display: flex;
			justify-content: space-between;
			align-items: center;

			&.row_active_monitor {
				.el-form-item__label {
					white-space: nowrap;
				}

				justify-content: flex-start;

				.el-form-item {
					margin-left: 30px;
				}
			}
		}

		.div_show {
			width: auto;
			display: flex;
			height: 40px;
			justify-content: center;
			align-items: center;
			color: #409eff;
			cursor: pointer;
		}
	}

	.devide_table {
		width: 100%;
		height: auto;
		overflow: hidden;
		// margin-top: 20px;

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
		padding-bottom: 20px;

		.devide_pageNation_active {
			float: right;
		}
	}

	.monitor-details {
		.el-dialog__body {
			padding-top: 0px;
		}

		.el-dialog {
			width: 70%;
		}

		.monitor-con {
			width: 100%;
			margin: 0 auto;

			.basic-table {
				border: 1px solid#DCDFE6;
				border-collapse: collapse;
				// width: 100%;
				margin-top: 20px;
				margin-bottom: 20px;

				td {
					border: 1px solid #dcdfe6;
					padding: 8px 0px;

					&.td-title {
						background: #ebebeb;
						text-align: center;
						width: 150px;
					}

					&.td-text {
						text-align: center;
						width: 400px;

						&.active {
							width: 200px;
						}
					}
				}
			}

			.monitor-footer {
				display: flex;
				justify-content: center;
				margin: 0 auto;
				margin-top: 10px;
			}

			.monitorDetails-bottom {
				.el-table td,
				.el-table th {
					padding: 6px 0px;
				}

				height: auto;
				overflow: hidden;

				.searach-con {
					display: flex;
					justify-content: flex-start;
					margin-bottom: 20px;

					.el-form-item {
						margin-left: 25px;
						margin-bottom: 0px;
					}
				}

				.monitorDetails-page {
					float: right;
					height: 40px;
					overflow: hidden;
					margin: 10px auto;
				}
			}
		}
	}
	.device_title_name {
		width: 16%;
		background: #eeeeee;
		color: #000000;
	}
	.device_title_content {
		width: 16%;
		background: #ffffff;
		color: #000000;
	}
}
.seach_top_right {
	float: left;
	height: 40px;
	line-height: 40px;
	margin-left: 10px;
}
.seach_bottom {
	text-align: left;
	background: #f0f5f5;
	border-radius: 0 0 10px 10px;
	padding: 10px 15px;
	// margin-top: 10px;
	.el-select {
		width: 150px;
	}
	.el-input {
		width: 150px;
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
