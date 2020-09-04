<template>
	<section class="myself-container version_active version_active_new">
		<el-row type="flex" justify="space-between">
			<el-col :span="11">
				<el-table
					:data="tableData3"
					class="release_version"
					border
					:cell-style="rowClass"
					:header-cell-style="headClass"
				>
					<el-table-column label="当前发布版本（全网）">
						<el-table-column
							prop="packet_version"
							label="版本号"
							width="250"
						></el-table-column>
						<el-table-column
							prop="high_version_info"
							label="版本描述"
						></el-table-column>
					</el-table-column>
				</el-table>
			</el-col>
			<el-col :span="11">
				<el-table
					:data="tableData2"
					class="release_version"
					border
					:cell-style="rowClass"
					:header-cell-style="headClass"
				>
					<el-table-column label="当前发布版本（灰度）">
						<el-table-column
							prop="packet_version"
							label="版本号"
							width="250"
						></el-table-column>
						<el-table-column
							prop="description"
							label="版本描述"
						></el-table-column>
					</el-table-column>
				</el-table>
			</el-col>
		</el-row>
		<div style="display: flex; justify-content: end">
			<el-button
				type="primary"
				style="margin: 15px 0px 0px 0px"
				@click="add"
				>新增发布</el-button
			>
		</div>

		<div class="devide_table">
			<el-row type="flex" class="row_active">
				<el-col :span="24">
					<tableBarActive2app
						id="rebateSetTable2"
						ref="table2"
						tooltip-effect="dark"
						:tableData="tableData1"
						:clomnSelection="clomnSelection"
						:rowHeader="rowHeader1"
						:tableOption="tableOption2"
						@handleButton="handleButton2"
						:operatingStatus="operatingStatus"
						@toOperating="toOperating"
						@handleSelectionChange="handleSelectionChange"
						@selectCheckBox="selectCheckBox"
						@selectAll="selectAll"
					></tableBarActive2app>
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
		<!--新增发布-->
		<el-dialog
			:visible.sync="dialogVisible"
			width="40%"
			:before-close="handleClose"
		>
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item label="发布类型">
					<el-select
						v-model="form.type"
						placeholder="请选择发布类型"
						@change="onchangeTab"
					>
						<el-option
							label="正式发布"
							value="正式发布"
						></el-option>
						<el-option
							label="灰度发布"
							value="灰度发布"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="发布版本">
					<el-select
						v-model="form.versions"
						placeholder="请选择设备类型"
					>
						<el-option
							v-for="item in versionsList"
							:key="item.value"
							:label="item.label"
							:value="item.value"
							:disabled="item.disabled"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="发布描述">
					<el-input
						type="textarea"
						v-model="form.desc"
						maxlength="100"
						show-word-limit
					></el-input>
				</el-form-item>
				<el-form-item label="发布用户">
					<el-radio-group v-model="form.user" @change="changeAssign">
						<el-radio
							label="全网用户"
							border
							:disabled="allType"
						></el-radio>
						<el-radio
							label="指定用户"
							border
							:disabled="oneType"
						></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="      " v-if="allType">
					<el-radio-group v-model="form.assign">
						<el-radio
							label="指定账号"
							style="margin-left: 12px"
						></el-radio>
						<!-- <el-button type="text" @click="onclickimport">批量导入1</el-button> -->
					</el-radio-group>
					<el-input
						v-model="form.version"
						placeholder=""
						type="textarea"
					></el-input>
				</el-form-item>
				<el-form-item label="发布时间">
					<el-radio-group v-model="form.time" @change="changeTime">
						<el-radio
							label="立即发布"
							style="margin-left: 12px"
						></el-radio>
						<el-radio label="定时发布"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="    " v-show="timing === '定时发布'">
					<el-col :span="11">
						<el-date-picker
							type="datetime"
							placeholder="选择日期"
							value-format="timestamp"
							v-model="form.date"
							style="width: 350px"
						></el-date-picker>
					</el-col>
				</el-form-item>
				<div style="text-align: center">
					<el-button type="primary" @click="onSubmitApp"
						>立即创建</el-button
					>
					<el-button @click="dialogVisible = false">取消</el-button>
				</div>
			</el-form>
		</el-dialog>
		<!--批量导入-->
		<el-dialog class="dialog_active2" :visible.sync="dialogVisible4">
			<div>
				<el-upload
					class="upload-demo"
					ref="upload"
					:limit="1"
					:action="UploadUrl()"
					:on-preview="handlePreview"
					:on-remove="handleRemove"
					:file-list="fileList"
					:on-success="handleAvatarSuccess"
					name="excel"
					:auto-upload="false"
				>
					<el-button
						slot="trigger"
						size="small"
						class="MyctiveButton"
						type="primary"
						>上传Excel文件</el-button
					>
					<el-button type="primary" @click="down" plain id="dwonexcel"
						>下载模板</el-button
					>
					<el-button
						style="
							position: absolute;
							left: 37px;
							bottom: 23px;
							width: 85px;
						"
						size="small"
						type="success"
						@click="submitUpload"
						>导 入</el-button
					>
					<el-button
						style="
							position: absolute;
							left: 130px;
							bottom: 23px;
							width: 85px;
						"
						size="small"
						type="success"
						:disabled="noClick"
						@click="submitUploadOK"
						>确定</el-button
					>
				</el-upload>
				<div class="url_con" v-if="tableType">
					<!-- 表格 -->
					<el-table
						border
						:data="tableList"
						style="width: 100%"
						height="420px"
					>
						<el-table-column label="phone">
							<template slot-scope="scope">
								<span
									v-if="scope.row.urlstatus === false"
									style="color: red"
									>{{ scope.row.phone }}</span
								>
								<span v-else style="color: green">{{
									scope.row.phone
								}}</span>
							</template>
						</el-table-column>
						<el-table-column label="操作">
							<template slot-scope="scope">
								<el-button
									type="text"
									v-if="scope.row.errstatus == 0"
									size="small"
									@click="deleteRow(scope.$index, tableList)"
									style="color: #000000"
									>删除</el-button
								>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>
		</el-dialog>
		<!--发布清单-->

		<el-dialog
			class="dialog_active1"
			:before-close="beforeclose"
			:visible.sync="dialogVisible5"
			title="发布清单"
			width="15%"
		>
			<div class="pub_con">
				<p v-for="item in pubUser" :key="item">{{ item.user }}</p>
			</div>
		</el-dialog>
	</section>
</template>

<script>
import {
	publishlistApp,
	publishApp,
	getversionApp,
	versionlistNew,
	publishuser,
	hostUrl,
} from '../../api/api.js';
import tableBarActive2 from '../../components/tableBarActive2';
import tableBarActive2app from '../../components/tableBarActive2app';

import mySearch from '../../components/mySearch';
import pageNation from '../../components/pageNation';
export default {
	data() {
		return {
			operatingStatus1: false,
			tableType: false,
			dialogVisible5: false,
			dialogVisible4: false,
			allType: false,
			oneType: false,
			tabPosition: 'top',
			form: {
				type: '',
				version: '',
				channel: '',
				desc: '',
				user: '',
				assign: '指定账号',
				time: '立即发布',
				date: '',
				versions: '',
			},
			versionsList: [],
			assigning: '',
			timing: '',
			operatingStatus: true,
			dialogVisible: false,
			dialogVisible2: false,
			rowHeader3: [
				{
					prop: 'packet_version',
					label: '版本号',
				},

				{
					prop: 'high_version_info',
					label: '版本描述',
				},
			],
			rowHeader2: [
				{
					prop: 'packet_version',
					label: '版本号',
				},
				{
					prop: 'description',
					label: '版本描述',
				},
			],
			rowHeader1: [
				{
					prop: 'time_create',
					label: '发布日期',
				},
				{
					prop: 'packet_version',
					label: '版本号',
				},
				{
					prop: 'push_type',
					label: '发布类型',
				},

				{
					prop: 'description',
					label: '发布描述',
					width: '400px',
				},
				{
					prop: 'push_type_active',
					label: '发布用户',
				},
			],
			tableData2: [],
			tableData3: [],
			tableData: [
				{
					version: '测试数据1',
					channel: '测试数据1',
					desc: '测试数据1',
				},
				{
					version: '测试数据2',
					channel: '测试数据2',
					desc: '测试数据2',
				},
			],
			tableData1: [
				{
					version: '测试数据11',
					channel: '测试数据11',
					desc: '测试数据11',
					version1: '测试数据11',
					channel1: '测试数据11',
					desc1: '测试数据11',
				},
				{
					version: '测试数据22',
					channel: '测试数据23',
					desc: '测试数据22',
					version1: '测试数据22',
					channel1: '测试数据23',
					desc1: '测试数据22',
				},
			],
			tableOption: {
				label: '操作',
				options: [
					{
						label: '撤回',
						type: 'primary',
						methods: 'withdraw',
					},
				],
			},
			tableOption1: {
				label: '操作',
				options: [
					{
						label: '撤回',
						type: 'primary',
						methods: 'withdraw',
					},
				],
			},
			tableOption2: {
				label: '操作',
				options: [
					{
						label: '发布清单',
						type: 'primary',
						methods: 'freeze',
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
			pager2: {
				count: 0,
				page: 1,
				rows: 100,
			},
			tableData2: [],
			showState: true,
			dialogVisible3: false,
			pageActive: 0,
			noClick: true,
			pagePublic: 0,
			pubUser: [],
		};
	},
	mounted: function () {
		//this.queryPublishlist()
		//this.queryVersionlist()

		this.queryPublishlistApp();
		this.queryversionlistNew();
		// this.queryPublishuser()
	},
	methods: {
		//导出地址变量
		UploadUrl() {
			return hostUrl + '/url_mgmt/excel_url';
		},
		//关闭回调
		beforeclose() {
			this.dialogVisible5 = false;
			this.pubUser = [];
		},
		//发布清单
		handleButton2(val, row) {
			this.dialogVisible5 = true;
			let param = {
				push_key: row.push_key,
				page: this.pagePublic,
			};
			publishuser(param)
				.then((res) => {
					if (res.status == 0) {
						let tempArr = res.result.cols;
						this.pubUser = this.pubUser.concat(tempArr);

						if (res.result.les_count == 0) {
							return false;
						} else {
							this.pagePublic++;
							this.handleButton2(val, row);
						}
					}
				})
				.catch((error) => {});
		},
		//查询灰度发布
		queryversionlistNew() {
			let param = {
				page: this.pager1.page - 1,
			};
			versionlistNew(param)
				.then((res) => {
					if (res.status == 0) {
						if (res.result.page == 0) {
							this.pager1.count =
								res.result.cols.length * (res.result.page + 1) +
								res.result.les_count;
						} else {
							this.pager1.count =
								res.result.cols.length +
								10 * res.result.page +
								res.result.les_count;
						}
						let nowArr = res.result.cols;
						for (var i = 0; i < nowArr.length; i++) {
							nowArr[i].time_create = this.common.getTimes(
								parseInt(nowArr[i].time_create * 1000)
							);
							nowArr[i].time_update = this.common.getTimes(
								parseInt(nowArr[i].time_update * 1000)
							);

							if (nowArr[i].description.length >= 20) {
								nowArr[i].description =
									nowArr[i].description.substr(0, 20) + '...';
							}
						}
						if (res.high_version_info >= 20) {
							res.high_version_info =
								res.high_version_info.substr(0, 20) + '...';
						}
						let obj = {
							high_version_info: res.high_version_info,
							packet_version: res.packet_version,
						};
						this.tableData3 = [];
						this.tableData3.push(obj);

						this.tableData2 = nowArr;
					} else {
					}
				})
				.catch((error) => {});
		},
		//
		onclickimport() {
			this.dialogVisible4 = true;
			this.$refs.upload.clearFiles();
			this.tableType = false;
		},
		deleteRow(index, rows) {
			rows.splice(index, 1);
			this.errorcount--;
			if (this.errorcount == 0) {
				this.noClick = false;
			}
		},
		//发布APP
		onSubmitApp() {
			let timetype = 1;
			let timeNums = 0;
			let user_list = [];
			if (this.form.time == '立即发布') {
				timetype = 1;
				timeNums = 0;
			} else {
				timetype = 0;
				timeNums = parseInt(this.form.date / 1000);
				if (timeNums <= Date.parse(new Date()) / 1000) {
					this.$message({
						message: '指定时间不能小于当前时间',
						type: 'error',
					});
					return false;
				}
			}
			if (this.form.type == '') {
				this.$message({
					message: '请选择发布类型',
					type: 'error',
				});
				return false;
			}
			if (this.form.versions == '') {
				this.$message({
					message: '请选择发布版本',
					type: 'error',
				});
				return false;
			}
			if (this.form.desc == '') {
				this.$message({
					message: '发布描述不可为空',
					type: 'error',
				});
				return false;
			}
			if (this.form.user == '指定用户') {
				if (this.form.version == '') {
					this.$message({
						message: '请输入指定账号',
						type: 'error',
					});
					return false;
				}
			}

			if (this.form.type == '正式发布') {
				user_list = [];
			} else {
				user_list = this.form.version.split(',');
				var resIDActive = /^1[34578]\d{9}$/;
				for (var i = 0; i < user_list.length; i++) {
					if (resIDActive.test(user_list[i]) == false) {
						this.$message({
							message: '指定账号格式错误',
							type: 'error',
						});
						return false;
					}
				}
			}
			let param = {
				packet_version: this.form.versions,
				push_type: this.form.type,
				description: this.form.desc,
				atonce: timetype,
				timing: timeNums,
				user_list: user_list,
			};

			publishApp(param)
				.then((res) => {
					if (res.status == 0) {
						this.$message({
							message: '发布成功',
							type: 'success',
						});
						this.common.monitoringLogs('发布', '发布app安装包', 1);

						this.dialogVisible = false;
						this.queryPublishlistApp();
						this.queryversionlistNew();
						this.form.versions = '';
					} else {
						this.$message({
							message: `${res.msg}`,
							type: 'error',
						});
						this.common.monitoringLogs('发布', '发布app安装包', 0);

						this.dialogVisible = false;
					}
				})
				.catch((error) => {
					this.common.monitoringLogs('发布', '发布app安装包', 0);
				});
		},
		//         //获取历史发布记录
		queryPublishlistApp() {
			let param = {
				page: this.pager.page - 1,
			};
			publishlistApp(param)
				.then((res) => {
					if (res.status == 0) {
						if (res.result.page == 0) {
							this.pager.count =
								res.result.cols.length * (res.result.page + 1) +
								res.result.les_count;
						} else {
							this.pager.count =
								res.result.cols.length +
								10 * res.result.page +
								res.result.les_count;
						}
						let nowArr = res.result.cols;
						for (var i = 0; i < nowArr.length; i++) {
							nowArr[i].time_create = this.common.getTimes(
								parseInt(nowArr[i].time_create * 1000)
							);
							nowArr[i].time_update = this.common.getTimes(
								parseInt(nowArr[i].time_update * 1000)
							);
							if (nowArr[i].push_type == '灰度发布') {
								nowArr[i].push_type_active = '指定用户';
							} else {
								nowArr[i].push_type_active = '全网发布';
							}
							if (nowArr[i].description.length >= 20) {
								nowArr[i].description =
									nowArr[i].description.substr(0, 20) + '...';
							}
						}
						this.tableData1 = nowArr;
					} else {
						this.$message({
							message: `${res.msg}`,
							type: 'success',
						});
					}
				})
				.catch((error) => {});
		},

		//灰度正式发布选择
		onchangeTab(val) {
			if (val == '正式发布') {
				this.form.user = '全网用户';
				this.oneType = true;
				this.allType = false;
			} else {
				this.form.user = '指定用户';
				this.oneType = false;
				this.allType = true;
			}
		},

		//获取发布版本

		querygetversion() {
			let param = new Object();

			param.page = this.pageActive;
			getversionApp(param)
				.then((res) => {
					if (res.status == 0) {
						this.versionsList = [];
						res.result.cols.forEach((item, index) => {
							let obj = {};
							obj.value = item.packet_version;
							obj.label = item.packet_version;
							// obj.chanid = item.chanid

							// obj.label= item.id+"+"+item.chanid+"+"+item.name
							this.versionsList.push(obj);
						});
						if (res.result.les_count == 0) {
							return false;
						} else {
							this.pageActive++;
							this.querygetversion();
						}
					} else {
						this.$message({
							message: 'IPFS服务出错',
							type: 'success',
						});
					}
				})
				.catch((error) => {});
		},

		//分页
		handleCurrentChange(val) {
			this.pager.page = val.val;
			this.queryPublishlistApp();
		},
		//分页
		handleCurrentChange1(val) {
			this.pager1.page = val.val;
			this.queryversionlistNew();
		},

		searchInfo() {
			alert('搜做');
		},
		getShow() {
			this.showState = !this.showState;
		},
		handleButton(val, rows) {
			if (val == 'withdraw') {
				this.dialogVisible2 = true;
				this.romVersion = rows.rom_version;
			}
		},
		handleButton1(val, rows) {
			if (val == 'withdraw') {
				this.dialogVisible3 = true;
				this.romVersion = rows.rom_version;
			}
		},
		add() {
			this.dialogVisible = true;
			this.form.desc = '';
			this.form.version = '';
			this.form.type = '';
			this.form.version = '';
			this.querygetversion();
		},
		changeTime(value) {
			this.timing = value;
		},
		changeAssign(value) {
			this.assigning = value;
		},
		//确定上传
		submitUploadOK() {
			let tempstr = '';
			for (var i = 0; i < this.tableList.length; i++) {
				tempstr += this.tableList[i].phone + ',';
			}
			tempstr = tempstr.slice(0, -1);
			this.form.version = tempstr;
			this.dialogVisible4 = false;
		},
		goback() {
			this.$router.go(-1);
		},
		//文件列表移除文件
		submitUpload() {
			this.$refs.upload.submit();
		},
		//上传
		handlePreview(file) {},
		//移除上传文件
		beforeRemove(file, fileList) {
			return this.$confirm(`确定移除 ${file.name}？`);
		},
		handleRemove(file, fileList) {},
		//上传成功
		handleAvatarSuccess(res, file) {
			this.message = [];
			this.title = '';
			if (res.status == 0) {
				this.tableType = true;
				var resID = /^1[34578]\d{9}$/;
				this.errorcount = 0;
				for (var i = 0; i < res.data.length; i++) {
					var err = 0;
					if (resID.test(res.data[i].phone) === false) {
						res.data[i].urlstatus = false;
						err++;
					} else {
						res.data[i].urlstatus = true;
					}

					if (err > 0) {
						this.errorcount++;
						res.data[i].errstatus = '0';
					}
				}
				if (this.errorcount == 0) {
					this.noClick = false;
				} else {
					this.noClick = true;
				}

				this.tableList = res.data;
			} else {
				this.$message({
					showClose: true,
					message: '服务器响应超时',
					type: 'error',
				});
			}
		},
		errormove(err, file, fileList) {},
		down() {
			var url = hostUrl + '/static/app_user.xls';
			// window.location.href = url;
			window.open(url, '_blank');
		},
		// 表头样式设置
		headClass() {
			return 'text-align: center;background:#F3F6FB;';
		},
		// 表格样式设置
		rowClass() {
			return 'text-align: center;';
		},
	},
	components: {
		pageNation: pageNation,
		tableBarActive2: tableBarActive2,
		mySearch: mySearch,
		tableBarActive2app: tableBarActive2app,
	},
};
</script>

<style lang="less">
// .release_version .el-table_1_column_1,
// .release_version .el-table_2_column_4 {
// 	background: #fff !important;
// }
.version_active_new .dialog_active2 {
	.el-dialog__body {
		height: 550px;
	}
}

.dialog_active1 {
	.el-dialog__body {
		padding-top: 0px;
	}
}

.el-button {
	padding: 8px 20px;
}
.version_active {
	padding-top: 35px;
	.el-form-item {
		margin-bottom: 10px;
	}
}

.changetab {
	margin-top: 20px;
}

.changetab .grey {
	color: #606266;
}

.changetab .grey.active {
	color: #409eff;
}

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

	.devide_table {
		width: 100%;
		height: auto;
		overflow: hidden;
		margin-top: 20px;
		box-shadow: none !important;

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
}

.pub_con {
	max-height: 500px;
	text-align: center;
	overflow: auto;
}
</style>
