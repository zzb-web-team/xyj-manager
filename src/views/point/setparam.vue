<template>
	<section class="myself-container">
		<div class="goback" style="width: 100%; line-height: 50px">
			<div style="margin-top: 20px">
				<el-button
					type="primary"
					class="el-upload__tip"
					@click="$router.go(-1)"
					>返回</el-button
				>
			</div>
		</div>
		<div style="height: 40px; line-height: 40px">硬件收益配置</div>
		<el-button type="primary" @click="addList">添加</el-button>
		<div style="width: 600px">
			<el-table
				:data="tableData"
				border
				width="100%"
				style="margin-top: 20px"
			>
				<el-table-column prop="date_value" label="范围">
					<template slot-scope="scope">
						<span v-if="scope.row.hour == 24">等于</span>
						<span v-else>大于</span></template
					>
				</el-table-column>
				<el-table-column prop="hour" label="在线时间">
				</el-table-column>
				<el-table-column prop="reward" label="奖励"> </el-table-column>

				<el-table-column label="操作" width="120">
					<template slot-scope="scope">
						<div
							style="display: flex; justify-content: space-evenly"
						>
							<el-button
								type="text"
								size="small"
								@click.native.prevent="
									goEdit(scope.$index, tableData)
								"
							>
								编辑
							</el-button>
							<el-button
								type="text"
								size="small"
								@click.native.prevent="
									deleteRow(scope.$index, tableData)
								"
							>
								删除
							</el-button>
						</div>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<el-dialog
			title="修改配置"
			:visible.sync="dialogFormVisible"
			width="20%"
			center
			@close="noset_earn"
		>
			<el-form :model="form">
				<el-form-item label="在线范围" :label-width="formLabelWidth">
					<el-select
						v-model="form.types"
						placeholder="请选择在线范围"
						style="width: 200px"
					>
						<el-option label="大于" value="大于"></el-option>
						<el-option label="等于" value="等于"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="在线时间" :label-width="formLabelWidth">
					<el-input
						v-model="form.hour"
						autocomplete="off"
						style="width: 200px"
						oninput="value=value.replace(/[^\d]/g,'')"
					></el-input>
				</el-form-item>
				<el-form-item label="在线奖励" :label-width="formLabelWidth">
					<el-input
						v-model="form.reward"
						autocomplete="off"
						style="width: 200px"
						oninput="value=value.replace(/[^\d]/g,'')"
					></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="noset_earn">取 消</el-button>
				<el-button type="primary" @click="set_earn">确 定</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
import tableBarActive2 from '../../components/tableBarActive2';
import mySearch from '../../components/mySearch';
import pageNation from '../../components/pageNation';
import {
	query_node_info_list,
	ptfs_query_user_profit_list,
	ptfs_set_earn_param,
	set_earn_dot_value,
} from '../../api/api';
import common from '../../common/js/util.js';

export default {
	data() {
		return {
			dialogFormVisible: false,
			tableData: [],
			form: {
				date: '',
				province: '',
				name: '',
			},
		};
	},
	mounted() {
		this.get_data(1);
	},
	methods: {
		get_data(get_type, type) {
			let params = new Object();
			params.type = get_type;
			if (get_type == 1) {
				// params.hour = [];
				// params.reward = [];
			} else {
				let name_list = [];
				let province_list = [];
				this.tableData.forEach((item, idnex) => {
					name_list.push(parseInt(item.hour));
					province_list.push(parseInt(item.reward));
				});
				params.hour = name_list;
				params.reward = province_list;
				this.dialogFormVisible = false;
			}
			set_earn_dot_value(params)
				.then((res) => {
					console.log(res);
					this.tableData = [];
					if (res.status == 0) {
						if (get_type != 1) {
							this.get_data(1);
						}
						if (type && type == 1) {
							this.$message.success('设置成功');
						} else if (type && type == 2) {
							this.$message.success('删除成功');
						}
						let tempArr = res.data.reward_list;
						tempArr.forEach((item, idnex) => {
							let obj = {};
							obj.hour = item.hour;
							obj.reward = item.reward;
							if (item.hour == 24) {
								obj.types = '等于';
							} else {
								obj.types = '大于';
							}
							this.tableData.push(obj);
							// name_list.push(item.hour);
							// province_list.push(item.reward);
						});
					} else {
						this.$message.error(res.err_msg);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
		noset_earn() {
			this.dialogFormVisible = false;
			this.get_data(1);
		},
		set_earn() {
			if (this.tableData.indexOf(this.form.hour) != -1) {
				this.$message.error('不能设置重复的时间范围');
				return false;
			}
			if (this.tableData.indexOf(this.form.reward) != -1) {
				this.$message.error('不同时间范围的奖励不能一样');
				return false;
			}
			let max_data_nuum = 0;
			this.tableData.forEach((item, index) => {
				if (item.hour > this.form.hour) {
					max_data_nuum = index;
				}
			});
			if (this.form.hour == 24) {
				if (this.tableData[0].reward >= this.form.reward) {
					this.$message.error(
						'该时间范围内的奖励值不能小于下一个区间的奖励'
					);
					return false;
				}
			} else {
				if (this.tableData[max_data_nuum].reward <= this.form.reward) {
					this.$message.error(
						'该时间范围内的奖励值不能大于上一个区间的奖励'
					);
					return false;
				} else if (
					this.tableData[max_data_nuum + 1] &&
					this.tableData[max_data_nuum + 1].reward >= this.form.reward
				) {
					this.$message.error(
						'该时间范围内的奖励值不能小于下一个区间的奖励'
					);
					return false;
				}
			}
			this.tableData.push(this.form);
			this.get_data(0, 1);
		},
		deleteRow(index, rows) {
			this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					rows.splice(index, 1);
					this.get_data(0, 2);
				})
				.catch(() => {
					//   this.$message({
					//     type: 'info',
					//     message: '已取消删除'
					//   });
				});
		},
		goEdit(index, rows) {
			this.dialogFormVisible = true;
			this.form = JSON.parse(JSON.stringify(rows[index]));
			rows.splice(index, 1);
		},
		addList() {
			let obj = {
				types: '等于',
				hour: 0,
				reward: 0,
			};
			this.tableData.push(obj);
		},
	},
	components: {
		pageNation: pageNation,
		tableBarActive2: tableBarActive2,
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
