<template>
	<div>
		<section class="myself-container pushing">
			<el-tabs
				type="border-card"
				v-model="activeName"
				@tab-click="onTabclick"
				style="margin-top: 30px"
				v-loading="loading"
			>
				<el-tab-pane label="通知" name="frist">
					<div
						class="device_form"
						style="display: flex; flex-flow: column"
					>
						<el-form ref="form" :model="form" label-width="80px">
							<div class="title">基本设置</div>
							<el-form-item class="label" label="消息标题：">
								<!-- <div class="space"></div> -->
								<el-input
									class="inputStyle"
									type="text"
									placeholder="请输入消息标题"
									v-model="form.title"
									maxlength="20"
									show-word-limit
								></el-input>
							</el-form-item>
							<el-form-item class="label" label="消息内容：">
								<!-- <div class="space"></div> -->
								<el-input
									class="inputStyle"
									type="textarea"
									placeholder="请输入消息内容"
									v-model="form.content"
									maxlength="500"
									show-word-limit
								></el-input>
							</el-form-item>
							<div class="push-active">
								<div class="title">高级设置</div>
								<el-form-item label="发送对象：">
									<el-radio-group
										v-model="form.object"
										@change="changeAssign"
									>
										<el-radio label="所有人"></el-radio>
										<!-- <el-radio label="指定终端"></el-radio> -->
										<el-radio label="指定账号"></el-radio>
									</el-radio-group>
									<div
										class="inputWrap"
										v-show="assign === '指定终端'"
									>
										<el-input
											type="text"
											placeholder="请输入DeviceID，多个终端用逗号分隔"
											v-model="form.deviceId"
										></el-input>
									</div>
									<div
										class="inputWrap"
										v-show="assign === '指定账号'"
										style="width: 250px"
									>
										<el-input
											v-show="assign === '指定账号'"
											type="text"
											placeholder="请输入账号，多个账号用逗号分隔"
											v-model="form.account"
										></el-input>
									</div>
								</el-form-item>
								<el-form-item label="发送时间：">
									<el-radio-group
										v-model="form.time"
										@change="changeTiming"
									>
										<el-radio label="立即发送"></el-radio>
										<el-radio label="定时发送"></el-radio>
									</el-radio-group>
									<div
										class="inputWrap"
										v-show="timing === '定时发送'"
									>
										<el-date-picker
											v-model="form.schedule_time"
											type="datetime"
											value-format="timestamp"
											placeholder="选择日期时间"
										>
										</el-date-picker>
									</div>
								</el-form-item>
								<!-- <el-form-item label="离线保存：">
                                <el-radio-group v-model="form.save" @change="changeOfflineSave">
                                    <el-radio label="不保存"></el-radio>
                                    <el-radio label="保存"></el-radio>
                                </el-radio-group>
                                <div class="inputWrap" v-show=" offlineSave === '保存' ">
                                    <span>保存</span>
                                    <el-input class="saveTime" type="number" v-model="form.saveTime" @mousewheel.native.prevent></el-input>
                                    <span>小时，该时段之后再上线的用户将收不到推送</span>
                                </div>
                            </el-form-item> -->
							</div>
						</el-form>
						<div class="bottom" style="text-align: center">
							<el-button
								type="primary"
								@click="onSubmitResult"
								size="small"
								>发布</el-button
							>
							<el-button size="small">取消</el-button>
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="公告" name="second">
					<div class="crop-demo">
						<img :src="cropImg" class="pre-img" />
						<div class="crop-demo-btn">
							上传封面图
							<input
								class="crop-input"
								type="file"
								name="image"
								accept="image/*"
								@change="setImage"
							/>
						</div>
					</div>

					<el-dialog
						title="裁剪图片"
						:visible.sync="dialogVisible"
						width="500px"
					>
						<vue-cropper
							ref="cropper"
							:src="imgSrc"
							:ready="cropImage"
							:zoom="cropImage"
							:cropmove="cropImage"
							preview=".preview"
							style="width: 100%; height: 300px"
						></vue-cropper>
						<span slot="footer" class="dialog-footer">
							<el-button @click="cancelCrop">取 消</el-button>
							<el-button type="primary" @click="onUpload"
								>确 定</el-button
							>
						</span>
					</el-dialog>
					<div id="editor">
						<mavon-editor
							style="height: 100%"
							v-model="handbook"
							@save="saveClick"
							@htmlCode="htmlCode"
						></mavon-editor>
						<!-- <div><el-button @click="saveClickOwn" type="primary"  style="margin-top:20px;">保存</el-button></div>  -->
					</div>
					<el-form
						ref="form"
						:model="form"
						label-width="80px"
						style="margin-top: 80px"
					>
						<div class="push-active" style="margin-top: 20px">
							<div class="title">基本设置</div>
							<el-form-item class="label" label="消息标题：">
								<!-- <div class="space"></div> -->
								<el-input
									class="inputStyle"
									type="text"
									placeholder="请输入消息标题"
									v-model="form.title"
									maxlength="20"
									show-word-limit
								></el-input>
							</el-form-item>
							<el-form-item class="label" label="消息内容：">
								<!-- <div class="space"></div> -->
								<el-input
									class="inputStyle"
									type="textarea"
									placeholder="请输入消息内容"
									v-model="form.content"
									maxlength="500"
									show-word-limit
								></el-input>
							</el-form-item>
							<div class="title">高级设置</div>
							<el-form-item label="发送对象：">
								<el-radio-group
									v-model="form.object"
									@change="changeAssign"
								>
									<el-radio label="所有人"></el-radio>
									<!-- <el-radio label="指定终端"></el-radio> -->
									<el-radio label="指定账号"></el-radio>
								</el-radio-group>
								<div
									class="inputWrap"
									v-show="assign === '指定终端'"
								>
									<el-input
										type="text"
										placeholder="请输入DeviceID，多个终端用逗号分隔"
										v-model="form.deviceId"
									></el-input>
								</div>
								<div
									class="inputWrap"
									v-show="assign === '指定账号'"
									style="width: 250px"
								>
									<el-input
										v-show="assign === '指定账号'"
										type="text"
										placeholder="请输入账号，多个账号用逗号分隔"
										v-model="form.account"
									></el-input>
								</div>
							</el-form-item>
							<el-form-item label="发送时间：">
								<el-radio-group
									v-model="form.time"
									@change="changeTiming"
								>
									<el-radio label="立即发送"></el-radio>
									<el-radio label="定时发送"></el-radio>
								</el-radio-group>
								<div
									class="inputWrap"
									v-show="timing === '定时发送'"
								>
									<el-date-picker
										v-model="form.schedule_time"
										type="datetime"
										value-format="timestamp"
										placeholder="选择日期时间"
									>
									</el-date-picker>
								</div>
							</el-form-item>
						</div>
					</el-form>
					<div class="bottom" style="text-align: center">
						<el-button type="primary" @click="onSubmitResult"
							>发布</el-button
						>
						<el-button>取消</el-button>
					</div>
				</el-tab-pane>
			</el-tabs>
		</section>
	</div>
</template>

<script>
import tableBarActive2 from '../../components/tableBarActive2';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import mySearch from '../../components/mySearch';
import pageNation from '../../components/pageNation';
import { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
import { pushImmediate, pushOntimer, saveimage, savehtml } from '../../api/api';
export default {
	data() {
		return {
			loading: false,
			activeName: 'frist',
			handbook: '',
			form: {
				push_type: '',
				audience: [],
				title: '',
				content: '',
				object: '所有人',
				device_types: 0,
				time: '立即发送',
				schedule_time: '',
				save: '不保存',
				saveTime: '',
				deviceId: '',
				account: '',
				push_user_name: '',
				push_name: '123456',
				pic_url: '',
				notice_url: '',
			},
			assign: '',
			timing: '',
			offlineSave: '',
			imgSrc: '',
			cropImg: '',
			dialogVisible: false,
			data: null,
			imgBase: '',
			defaultSrc: require('../../assets/logo.png'),
			htmlText: '',
			seqNo: '',
		};
	},
	created() {
		this.cropImg = this.defaultSrc;
	},
	mounted: function () {
		var user = JSON.parse(this.get('userInfo'));
		this.form.push_user_name = user.username || '';
	},
	methods: {
		//清楚切换TAB时清楚 消息标题内容
		onTabclick(val) {
			this.form.title = '';
			this.form.content = '';
			this.form.schedule_time = '';
			this.form.time = '立即发送';
		},
		//获取存在cookies中的userInfo信息
		get: function (name) {
			var v = window.document.cookie.match(
				'(^|;) ?' + name + '=([^;]*)(;|$)'
			);

			return v ? v[2] : null;
		},
		changeAssign(value) {
			this.assign = value;
		},
		changeTiming(value) {
			this.timing = value;
		},
		changeOfflineSave(value) {
			this.offlineSave = value;
		},
		getData() {
			this.data = JSON.stringify(this.$refs.cropper.getData(), null, 4);
		},
		setImage(e) {
			const file = e.target.files[0];
			if (!file.type.includes('image/')) {
				return;
			}
			const reader = new FileReader();
			reader.onload = (event) => {
				this.dialogVisible = true;
				this.imgSrc = event.target.result;
				this.$refs.cropper &&
					this.$refs.cropper.replace(event.target.result);
			};
			reader.readAsDataURL(file);
		},
		cropImage() {
			this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
			this.imgBase = this.$refs.cropper.getCroppedCanvas().toDataURL();
		},
		cancelCrop() {
			this.dialogVisible = false;
			this.cropImg = this.defaultSrc;
		},
		imageuploaded(res) {},
		handleError() {
			this.$notify.error({
				title: '上传失败',
				message: '图片上传接口上传失败，可更改为自己的服务器接口',
			});
		},
		saveClickOwn() {
			this.saveClick();
		},
		saveClick(val, render) {
			this.htmlText = render;
			let tempHtml = '';
			tempHtml =
				'<!DOCTYPE html>' +
				'<html>' +
				'<head>' +
				"<meta charset='utf-8'>" +
				'<body>' +
				'<div>' +
				this.htmlText +
				'</div>' +
				'</body' +
				'</head>' +
				'</html>';

			let param = {
				data: tempHtml,
			};
			savehtml(param)
				.then((res) => {
					if (res.status == 0) {
						this.form.notice_url = res.msg;
					}
				})
				.catch((error) => {});
		},
		//立即创建推送
		onSubmit() {
			if (this.form.title == '') {
				this.$message({
					message: '消息标题不能为空',
					type: 'error',
				});
				return false;
			}
			if (this.form.content == '') {
				this.$message({
					message: '消息内容不能为空',
					type: 'error',
				});
				return false;
			}
			let param = new Object();
			param = this.form;
			param.schedule_time = parseInt(param.schedule_time / 1000);
			param.query_type = 1;
			param.seq_no = '';

			this.activeName == 'frist'
				? (param.push_type = 0)
				: (param.push_type = 1);
			if (param.object == '所有人') {
				param.audience_type = 0;
				param.audience = [];
			} else {
				param.audience_type = 1;
				param.audience = param.account.split(',');
			}

			if (param.time == '立即发送') {
				// 立即发送
				this.loading = true;
				pushImmediate(param)
					.then((res) => {
						if (res.status == 0) {
							this.seqNo = res.data.seqno;

							setTimeout(this.onSubmitResult, 0);
						} else {
						}
					})
					.catch((error) => {
						this.common.monitoringLogs('发布', '发布通知', 0);
					});
			} else {
				// 定时推送
				if (
					param.schedule_time <= parseInt(new Date().getTime() / 1000)
				) {
					this.$message({
						message: '指定时间不能小于当前时间',
						type: 'error',
					});
					param.schedule_time = '';
					return false;
				}
				this.loading = true;
				pushOntimer(param)
					.then((res) => {
						if (res.status == 0) {
							this.seqNo = res.data.seqno;

							setTimeout(this.onSubmitResult, 0);
						} else {
						}
					})
					.catch((error) => {
						this.common.monitoringLogs('发布', '发布通知', 0);
					});
			}
		},
		//第二次请求
		onSubmitResult() {
			if (this.form.title == '') {
				this.$message({
					message: '消息标题不能为空',
					type: 'error',
				});
				return false;
			}
			if (this.form.content == '') {
				this.$message({
					message: '消息内容不能为空',
					type: 'error',
				});
				return false;
			}
			let param = new Object();
			param = this.form;
			param.schedule_time = this.form.schedule_time / 1000;
			param.query_type = 2;
			param.seq_no = this.seqNo;

			this.activeName == 'frist'
				? (param.push_type = 0)
				: (param.push_type = 1);
			if (param.object == '所有人') {
				param.audience_type = 0;
				param.audience = [];
			} else {
				param.audience_type = 1;
				param.audience = param.account.split(',');
			}
			if (param.time == '立即发送') {
				// 立即发送
				pushImmediate(param)
					.then((res) => {
						if (res.status == 0) {
							this.loading = false;
							this.$message({
								message: '推送成功',
								type: 'success',
							});
							this.common.monitoringLogs('发布', '发布通知', 1);
							this.form.title = '';
							this.form.content = '';
							this.form.schedule_time = '';
						} else {
							this.loading = false;
							this.$message({
								message: '推送失败',
								type: 'error',
							});
							this.common.monitoringLogs('发布', '发布通知', 0);
						}
					})
					.catch((error) => {
						this.loading = false;
						this.common.monitoringLogs('发布', '发布通知', 0);
					});
			} else {
				// 定时推送
				if (
					param.schedule_time <= parseInt(new Date().getTime() / 1000)
				) {
					this.$message({
						message: '指定时间不能小于当前时间',
						type: 'error',
					});
					param.schedule_time = '';
					return false;
				}
				pushOntimer(param)
					.then((res) => {
						if (res.status == 0) {
							this.loading = false;

							this.$message({
								message: '推送成功',
								type: 'success',
							});
							this.common.monitoringLogs('发布', '发布通知', 1);
							this.form.title = '';
							this.form.content = '';
							this.form.schedule_time = '';
						} else {
							this.loading = false;

							this.$message({
								message: '推送失败',
								type: 'error',
							});
							this.common.monitoringLogs('发布', '发布通知', 0);
						}
					})
					.catch((error) => {
						this.loading = false;

						this.common.monitoringLogs('发布', '发布通知', 0);
					});
			}
		},
		onUpload() {
			this.dialogVisible = false;
			let param = {
				data: this.imgBase,
			};
			saveimage(param)
				.then((res) => {
					if (res.status == 0) {
						this.form.pic_url = res.data;
					}
				})
				.catch((error) => {});
		},
		htmlCode() {},
	},
	components: {
		pageNation,
		tableBarActive2,
		mySearch,
		mavonEditor,
		VueCropper,
	},
};
</script>

<style lang="less">
.el-tabs--border-card {
	box-shadow: none;
}
.myself-container {
	&.pushing {
		.push-active {
			.el-form-item__content {
				margin-left: 0px !important;
			}
		}
	}

	.device_form {
		.title {
			height: 40px;
			line-height: 40px;
			background: #f2f2f2;
			margin: 10px;
			padding-left: 10px;
		}

		.space {
			width: 100%;
			height: 40px;
		}

		.inputStyle {
			margin-left: -80px;
			width: 250px;
		}

		.el-form-item {
			margin-bottom: 0px;
			margin-left: 10px;

			.inputWrap {
				height: 60px;
				line-height: 60px;

				margin: 10px;
				padding-left: 10px;

				.saveTime {
					width: 50px;
				}
			}
		}

		.bottom {
			margin-top: 30px;
			margin-bottom: 40px;
		}
	}

	#editor {
		// margin: auto;
		// width: 80%;
		height: 580px;
	}

	.pre-img {
		width: 100px;
		height: 100px;
		background: #f8f8f8;
		border: 1px solid #eee;
		border-radius: 5px;
	}

	.crop-demo {
		display: flex;
		align-items: flex-end;
		margin-bottom: 20px;
	}

	.crop-demo-btn {
		position: relative;
		width: 100px;
		height: 40px;
		line-height: 40px;
		padding: 0 15px;
		margin-left: 30px;
		background-color: #409eff;
		color: #fff;
		font-size: 14px;
		border-radius: 4px;
		box-sizing: border-box;
	}

	.crop-input {
		position: absolute;
		width: 100px;
		height: 40px;
		left: 0;
		top: 0;
		opacity: 0;
		cursor: pointer;
	}
}
.myself-container.pushing .device_form .el-form-item {
	margin-bottom: 10px;
}
.pushing {
	padding-bottom: 30px;
}
</style>
