<template>
	<section class="myself-container">
		<div class="devide_table">
			<el-row
				type="flex"
				class="title_btn"
				style="display: flex; justify-content: flex-start"
			>
				<el-col
					:span="2"
					style="display: flex; justify-content: flex-start"
				>
					<el-button type="primary" @click="upload"
						>上传应用包</el-button
					>
				</el-col>
				<el-col :span="2">
					<el-button type="primary" @click="golink()"
						>版本发布</el-button
					>
				</el-col>
			</el-row>
			<el-row type="flex" class="row_active">
				<el-col :span="24">
					<el-table
						:data="tableData"
						border
						style="width: 100%"
						:cell-style="rowClass"
						:header-cell-style="headClass"
					>
						<el-table-column prop="packet_name" label="应用包名">
						</el-table-column>
						<el-table-column prop="packet_size" label="文件大小">
						</el-table-column>
						<el-table-column prop="packet_md5" label="MD5">
						</el-table-column>
						<!-- <el-table-column prop="packet_hash" label="hashid">
							<template slot-scope="scope">{{
								scope.row.packet_hash | show_hash
							}}</template>
						</el-table-column> -->
						<!-- <el-table-column
							prop="ptfs_file_upload_status"
							label="是否上传到IPFS节点"
							width="150px"
						>
							<template slot-scope="scope">
								<div
									style="
										display: flex;
										justify-content: center;
										align-items: center;
									"
								>
									
									<div v-if="scope.row.packet_hash == ''">
										未上传<br />
										<el-button
											size="mini"
											type="primary"
											style=""
											@click="uploadApp(scope.row)"
											>重新上传</el-button
										>
									</div>
									<div
										v-else-if="
											scope.row.ptfs_file_upload_status ==
											0
										"
									>
										正在上传
									</div>
									<div v-else>已上传</div>
								</div>
							</template>
						</el-table-column> -->
						<el-table-column prop="packet_version" label="版本号">
						</el-table-column>
						<el-table-column label="文件描述" width="250">
							<template slot-scope="scope">
								<div>
									{{
										scope.row.packet_description
											| show_description
									}}
								</div>
							</template>
						</el-table-column>
						<el-table-column
							prop="time_create"
							label="上传日期"
							width="170"
						>
						</el-table-column>
						<el-table-column
							prop="time_update"
							label="最近修改"
							width="170"
						>
						</el-table-column>
						<el-table-column label="操作" width="260">
							<template slot-scope="scope">
								<el-button
									@click="handleEdit(scope.row)"
									type="text"
									size="small"
									>修改</el-button
								>
								<el-button
									type="text"
									size="small"
									@click="handleDelete(scope.row)"
									>删除</el-button
								>
							</template>
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
		<!-- 详情弹窗 -->
		<el-dialog
			title="新增发布"
			:visible.sync="dialog"
			custom-class="customWidth"
			width="30%"
		>
			<div class="add-sdk">
				<div
					class="item"
					style="
						align-items: flex-start;
						display: flex;
						justify-content: center;
					"
				>
					<div class="item_l" style="margin-top: 10px">应用包：</div>
					<div class="item-r" style="position: relative">
						<!-- <el-button class="choose-file" size="mini">请选择要上传的文件</el-button> -->
						<div
							style="width: 350px; height: 16px; margin-top: 10px"
						>
							<input
								id="f"
								ref="test"
								class="choose-input"
								type="file"
								name="file"
								@change="upFile"
							/>
						</div>
						<!-- <el-button type="primary" class="onchoose-file" @click="upFile()" :disabled="disableStatus">确定</el-button> -->
						<!-- 进度条
            <span id="per">{{perNum}}</span>% -->
						<div
							style="
								width: 350px;
								height: 16px;
								background-color: #999;
								margin-top: 20px;
							"
						>
							<div
								style="
									height: 16px;
									background-color: #67c23a;
									text-align: right;
								"
								id="loading"
								v-bind:style="{ width: widthData + '%' }"
							>
								{{ perNum }}%
							</div>
						</div>
						<div id="result" style="margin-top: 10px"></div>
						<div class="uploadInfo" v-if="uploadType">
							<p>包名:{{ uploadForm.name }}</p>
							<p>文件大小:{{ uploadForm.size }}</p>
							<p>MD5:{{ uploadForm.md5 }}</p>
							<p>文件哈希:{{ uploadForm.hashid }}</p>
							<p>包版本:{{ uploadForm.version }}</p>
							<p>包地址:{{ uploadForm.url }}</p>
						</div>
						<div>
							<!-- <el-input v-model="uploadinput" placeholder="请输入描述" style="width:350px;"></el-input> -->
							<el-input
								type="textarea"
								:autosize="{ minRows: 4, maxRows: 6 }"
								v-model="uploadinput"
								placeholder="请输入描述"
							>
							</el-input>
						</div>
						<div
							style="
								display: flex;
								justify-content: center;
								margin-left: -30px;
								margin-top: 20px;
							"
						>
							<el-button type="primary" @click="onsumbitUpload()"
								>上传</el-button
							>
							<el-button @click="dialog = false">取消</el-button>
						</div>
					</div>
				</div>
			</div>
		</el-dialog>
		<!-- 修改详情 -->
		<el-dialog
			title="修改描述"
			:visible.sync="dialogEdit"
			custom-class="customWidth"
			width="20%"
		>
			<div class="edit">
				<el-input v-model="editInfo"></el-input>
			</div>
			<div
				style="display: flex; justify-content: center; margin-top: 20px"
			>
				<el-button type="primary" @click="onEdit">确定</el-button>
				<el-button @click="dialogEdit = false">取消</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
import tableBar from '../../components/tableBar';

import tableBarActive2 from '../../components/tableBarActive2';
import mySearch from '../../components/mySearch';
import pageNation from '../../components/pageNation';
import {
	uploadzip,
	applogList,
	savePacket,
	queryPacket,
	uploadpftsNew,
	editDescription,
	deletePacket,
	hostUrl,
} from '../../api/api.js';
export default {
	data() {
		return {
			editInfo: '',
			dialogEdit: false,
			uploadinput: '',
			uploadType: false,
			uploadForm: {},
			perNum: 0,
			widthData: 0,
			dialog: false,
			dialogVisible: false,
			dialogVisible2: false,

			tableData: [],
			tableOption: {
				label: '操作',
				options: [
					{
						label: '修改',
						type: 'danger',
						methods: 'edit',
					},
					{
						label: '删除',
						type: 'danger',
						methods: 'delete',
					},
				],
			},
			pager: {
				count: 0,
				page: 1,
				rows: 100,
			},
			showState: true,
			editId: '',
			deleteId: '',
		};
	},
	filters: {
		show_hash(data) {
			if (data == '' || data == 0) {
				return '--';
			} else {
				return data;
			}
		},
	},
	mounted: function () {
		this.queryInfo();
	},
	methods: {
		//发布设置跳转
		golink() {
			this.$router.push({
				path: '/AppVersion',
			});
		},
		//确认修改、
		onEdit() {
			let param = {
				id: this.editId,
				packet_description: this.editInfo,
			};
			editDescription(param)
				.then((res) => {
					if (res.status == 0) {
						this.dialogEdit = false;
						this.$message({
							message: '修改成功',
							type: 'success',
						});
						this.queryInfo();
					} else {
						this.$message({
							message: '修改失败',
							type: 'error',
						});
						this.dialogEdit = false;
						this.queryInfo();
					}
				})
				.catch((error) => {});
		},
		//APP删除
		handleDelete(row) {
			// this.dialogEdit = true
			this.deleteId = row.id;
			this.$confirm('即将删除该安装包，是否继续？', '提示', {
				type: 'warning',
			})
				.then((res) => {
					let param = {
						id: this.deleteId,
					};
					deletePacket(param)
						.then((res) => {
							if (res.status == 0) {
								this.$message({
									message: '删除成功',
									type: 'success',
								});
								this.queryInfo();
							} else {
								this.$message({
									message: '删除失败',
									type: 'error',
								});
								this.queryInfo();
							}
						})
						.catch((error) => {});
				})
				.catch((error) => {});
		},
		//APP修改
		handleEdit(row) {
			this.dialogEdit = true;
			this.editInfo = row.packet_description;
			this.editId = row.id;
		},
		//APP 文件上传到节点
		uploadApp(row) {
			let param = {
				url: row.packet_url,
			};
			uploadpftsNew(param)
				.then((res) => {
					if (res.status == 0) {
						this.$message({
							message: '正在上传至IPFS',
							type: 'success',
						});
						this.queryInfo();
					} else {
						this.$message({
							message: '上传失败',
							type: 'error',
						});
						this.queryInfo();
					}
				})
				.catch((error) => {});
		},

		//确认上传
		onsumbitUpload() {
			let param = {
				packet_name: this.uploadForm.name,
				packet_size: this.uploadForm.size,
				packet_md5: this.uploadForm.md5,
				packet_version: this.uploadForm.version,
				packet_url: this.uploadForm.url,
				packet_description: this.uploadinput,
			};
			if (this.uploadinput == '') {
				this.$message({
					message: '发布描述不能为空',
					type: 'error',
				});
				return false;
			}
			savePacket(param)
				.then((res) => {
					if (res.status == 0) {
						this.$message({
							message: '上传成功',
							type: 'success',
						});
						this.queryInfo();
						this.dialog = false;
						this.common.monitoringLogs('新增', '新增App应用包', 1);
					} else if (res.status == -900) {
						this.$message({
							message: '该dist包已经上传，请勿重复上传！',
							type: 'error',
						});
						this.common.monitoringLogs('新增', '新增App应用包', 0);
					} else {
						this.$message({
							message: '上传失败',
							type: 'error',
						});
						this.common.monitoringLogs('新增', '新增App应用包', 0);
					}
				})
				.catch((error) => {
					this.common.monitoringLogs('新增', '新增App应用包', 0);
				});
		},
		//分页选择
		handleCurrentChange(val) {
			this.pager.page = val.val;
			this.queryInfo();
		},
		//分偏上传
		upFile() {
			let _this = this;

			var file = document.getElementById('f');
			var f = file.files[0];
			if (f == undefined) {
				this.$message({
					type: 'warning',
					message: '请选择要上传的文件',
				});
				return false;
			}
			this.disableStatus = true;
			var totalSize = f.size;
			if (totalSize == 0) {
				this.$message({
					message: '请选择文件SIZE大于0文件',
					type: 'success',
				});
				return false;
			}
			var len = 2 * 1024 * 1024;
			var tota_temp = Math.ceil(totalSize / len);
			var start = 0;
			var end = start + len;
			var index = 1;

			var blobSlice =
				File.prototype.mozSlice ||
				File.prototype.webkitSlice ||
				File.prototype.slice;

			var fileReader = new FileReader();

			function sliceandpost() {
				//if (start >= totalSize)return;
				//if (index >= tota_temp)return;

				var temp = f.slice(start, end);
				var formData = new FormData();
				formData.append('file', temp);
				formData.append('fileName', f.name);
				formData.append('num', index);
				formData.append('start', start);
				formData.append('end', end);
				formData.append('totalSize', totalSize);
				formData.append('total', tota_temp);
				var url = hostUrl + '/admin/uploadzip';
				var xhr = new XMLHttpRequest();
				xhr.onreadystatechange = onchange;
				xhr.open('POST', url);
				xhr.send(formData);

				function onchange() {
					// 4 = "loaded"
					if (xhr.readyState == 4) {
						// 200 = "OK"
						if (xhr.status == 200) {
							//var headers =  JSON.parse(xhr.responseText);
							var headers = JSON.parse(xhr.response);
							//分片上传成功
							if (headers.status == 0) {
								index = index + 1;
								// 改变下一次截取的位置
								start = end;
								end = start + len;
								// 因为截取可能超过totalSize，判断最后一次截取是否大于totalSize如果大于就直接让end等于totalSize
								if (end > totalSize) {
									end = totalSize;
								}
								_this.widthData = Math.floor(
									(index / tota_temp) * 100
								);
								_this.perNum = Math.floor(
									(index / tota_temp) * 100
								);
								// document.getElementById("loading").style.width = Math.floor(index / tota_temp * 100) + "%";
								// document.getElementById('per').innerHTML = Math.floor(index / tota_temp * 100)
								sliceandpost();
							} else if (headers.status == 1) {
								_this.widthData = 100;
								_this.perNum = 100;
								document.getElementById('result').innerHTML =
									'上传成功:' + headers.msg;
								_this.sdkUrl = headers.url;
								//_this.dialog = false
								// _this.queryInfo()
								_this.uploadForm = headers;
								_this.uploadType = true;
								_this.disableStatus = false;
							} else if (headers.status == -900) {
								_this.$message({
									message: `${headers.msg}`,
									type: 'error',
								});
							}
						} else {
							alert(
								'Problem retrieving XML data:' + xhr.statusText
							);
						}
					}
				}
			}
			sliceandpost();
		},
		queryInfo() {
			let param = new Object();
			param.page = this.pager.page - 1;
			queryPacket(param)
				.then((res) => {
					if (res.status != 0) {
						this.$message({
							message: `${res.msg}`,
							type: 'error',
						});
					} else {
						let nowarractive = res.result.cols;
						let nowarrLength =
							res.result.page * 10 +
							nowarractive.length +
							res.result.les_count;
						this.pager.count = nowarrLength;
						this.dataNum = nowarrLength;

						for (var i = 0; i < nowarractive.length; i++) {
							nowarractive[i].time_create = this.common.getTimes(
								parseInt(nowarractive[i].time_create * 1000)
							);
							nowarractive[i].time_update = this.common.getTimes(
								parseInt(nowarractive[i].time_update * 1000)
							);
							if (nowarractive[i].packet_size == 0) {
								nowarractive[i].packet_size = 0;
							} else {
								nowarractive[
									i
								].packet_size = this.common.formatByteActive(
									nowarractive[i].packet_size
								);
							}
							if (
								nowarractive[i].packet_description.length >= 20
							) {
								nowarractive[i].packet_description =
									nowarractive[i].packet_description.substr(
										0,
										20
									) + '...';
							}
						}
						this.tableData = nowarractive;
					}
				})
				.catch((error) => {
					this.$message({
						message: '网络出错，请重新请求',
						type: 'error',
					});
				});
		},
		searchInfo() {
			alert('搜做');
		},
		getShow() {
			this.showState = !this.showState;
		},
		upload() {
			if (this.$refs.test == undefined) {
			} else {
				this.$refs.test.value = '';
				document.getElementById('result').innerText = '';
				this.uploadinput = '';
			}
			this.disableStatus = false;
			this.dialog = true;
			this.perNum = 0;
			this.uploadType = false;
			this.widthData = 0;
		},
		publish() {
			this.$router.push({
				path: '/AppVersion',
			});
		},
		handleButton(val, rows) {
			if (val == 'edit') {
				this.dialogVisible2 = true;
			} else if (val == 'freeze') {
				this.$router.push({
					path: '/userInfo',
				});
			}
		},
		addAccout() {
			this.dialogVisible = true;
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
		tableBar: tableBar,
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
		margin-top: 0px !important;
		.el-table td,
		.el-table th {
			padding: 6px 0px;
		}
		.title_btn {
			margin-bottom: 25px;
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
</style>
