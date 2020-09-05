<template>
	<section id="title_btn">
		<div class="changetab">
			<el-radio-group
				v-model="tabPosition"
				style="margin-bottom: 30px"
				@change="onchangeTabs"
			>
				<el-radio-button label="RK33XX">西柚机</el-radio-button>
				<el-radio-button label="AMS805W">玩客云</el-radio-button>
				<el-radio-button label="AMS905M4C">小米盒子4C</el-radio-button>
				<el-radio-button label="AMS905M4">小米盒子4</el-radio-button>
				<el-radio-button label="PCGRAPE">PC版西柚机</el-radio-button>
			</el-radio-group>
		</div>

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
							prop="rom_version"
							label="版本号"
							width="250"
						></el-table-column>
						<el-table-column
							prop="description"
							label="版本描述"
						></el-table-column>
						<el-table-column label="操作" width="120">
							<template slot-scope="scope">
								<el-button
									@click="
										handleButton(scope.$index, scope.row)
									"
									type="text"
									size="small"
								>
									撤回
								</el-button>
							</template></el-table-column
						>
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
							prop="rom_version"
							label="版本号"
							width="250"
						></el-table-column>
						<el-table-column
							prop="description"
							label="版本描述"
						></el-table-column>
						<el-table-column label="操作" width="120">
							<template slot-scope="scope">
								<el-button
									@click="
										handleButton1(scope.$index, scope.row)
									"
									type="text"
									size="small"
								>
									撤回
								</el-button>
							</template></el-table-column
						>
					</el-table-column>
				</el-table>
			</el-col>
		</el-row>

		<div style="display: flex; justify-content: end;margin-bottom:20px;">
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
					<tableBarActive2pub
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
					></tableBarActive2pub>
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
						style="margin: 10px 0"
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
				<!-- <el-form-item label="设备类型">
                <el-select v-model="form.tab" placeholder="请选择设备类型">
                    <el-option label="RK3228" value="0"></el-option>
                    <el-option label="AMS805" value="1"></el-option>
                </el-select>
            </el-form-item> -->
				<el-form-item label="发布版本">
					<el-select
						v-model="form.versions"
						placeholder="请选择发布版本"
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
				<el-form-item label="发布渠道">
					<el-radio-group
						v-model="form.modelType"
						@change="changeAssign"
					>
						<el-radio label="HTTP" border></el-radio>
						<el-radio label="PTFS" border></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="发布描述">
					<el-input
						type="textarea"
						v-model="form.desc"
						maxlength="100"
						show-word-limit
					></el-input>
				</el-form-item>
				<el-form-item label="发布设备">
					<el-radio-group v-model="form.user" @change="changeAssign">
						<el-radio
							label="全网用户"
							border
							:disabled="allType"
						></el-radio>
						<el-radio
							label="指定设备"
							border
							:disabled="oneType"
						></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="      " v-if="allType">
					<el-radio-group v-model="form.assign">
						<el-radio label="指定账号"></el-radio>
						<!-- <el-button type="text" @click="onclickimport">批量导入</el-button> -->
					</el-radio-group>
					<el-input
						v-model="form.version"
						placeholder="多个账号以,隔开"
						type="textarea"
					></el-input>
				</el-form-item>
				<el-form-item label="发布时间">
					<el-radio-group v-model="form.time" @change="changeTime">
						<el-radio label="立即发布"></el-radio>
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

		<!--撤回-->
		<el-dialog
			:visible.sync="dialogVisible2"
			width="50%"
			:before-close="handleClose"
		>
			<el-form ref="form" :model="form1" label-width="80px">
				<p>
					<b>版本详情</b>
				</p>
				<el-form-item label="发布类型:">
					<span>{{ form1.pushTypeActive }}</span>
				</el-form-item>
				<el-form-item label="发布类型:">
					<span>{{ form1.pushTabActive }}</span>
				</el-form-item>
				<el-form-item label="发布版本:">
					<span>{{ form1.romVersionActive }}</span>
				</el-form-item>
				<el-form-item label="发布渠道:">
					<span>{{ form1.pushModActive }}</span>
				</el-form-item>
				<el-form-item label="发布描述:">
					<span>{{ form1.descriptionActive }}</span>
				</el-form-item>
				<el-form-item label="发布时间:">
					<span>{{ form1.timeActive }}</span>
				</el-form-item>
				<el-form-item label="发布设备:">
					<span v-if="this.userType == '全网用户'">{{
						userType
					}}</span>
					<div v-else>
						<span>指定设备</span>
						<el-button type="text" @click="getBackInfo"
							>发布清单</el-button
						>
					</div>
				</el-form-item>
				<p>
					<b>版本撤回选项</b>
				</p>
				<!-- <el-form-item label="撤回至版本">
                <el-select v-model="form1.backversion" placeholder="请选择版本" style="width:220px;">
                    <el-option v-for="item in versionsListActive" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
                    </el-option>
                </el-select>
            </el-form-item> -->
				<el-form-item label="撤回时间">
					<el-radio-group v-model="form1.time" @change="changeTime">
						<el-radio label="立即撤回"></el-radio>
						<el-radio label="定时撤回"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="     " v-show="timing === '定时撤回'">
					<el-col :span="11">
						<el-date-picker
							type="datetime"
							placeholder="选择日期"
							v-model="form1.date"
							style="300px;"
						></el-date-picker>
					</el-col>
				</el-form-item>
				<div style="text-align: center">
					<el-button type="primary" @click="onSubmitBack"
						>撤回</el-button
					>
					<el-button @click="dialogVisible2 = false">取消</el-button>
				</div>
			</el-form>
		</el-dialog>

		<el-dialog
			class="dialog_active1"
			:before-close="beforeclose"
			:visible.sync="dialogVisible5"
			title="发布清单"
			width="15%"
		>
			<div class="pub_con">
				<p v-for="item in pubUser" :key="item">
					{{ item.snormac != '\n' ? item.snormac : '暂无数据' }}
				</p>
			</div>
		</el-dialog>
	</section>
</template>

<script>
import {
	publishlistApp,
	publishlistRom,
	publishApp,
	getversionApp,
	getversionRom,
	versionlistNew,
	versionlistRom,
	publishRom,
	publishuser,
	rollbackRom,
	publishuserRom,
	hostUrl,
} from '../../api/api.js';
import tableBarActive2 from '../../components/tableBarActive2';
import tableBarActive2pub from '../../components/tableBarActive2pub';
import mySearch from '../../components/mySearch';
import pageNation from '../../components/pageNation';
import { fail } from 'assert';
export default {
	data() {
		return {
			backPushkey: '',
			userType: '',
			operatingStatus1: true,
			tableType: false,
			dialogVisible5: false,
			dialogVisible4: false,
			allType: false,
			oneType: false,
			tabPosition: 'RK33XX',

			form: {
				type: '',
				version: '',
				channel: '',
				desc: '',
				user: '',
				assign: '指定账号',
				modelType: 'HTTP',
				tab: '',
				time: '立即发布',
				date: '',
				versions: '',
			},
			form1: {
				type: '',
				version: '',
				channel: '',
				desc: '',
				user: '',
				assign: 'assign',
				modelType: 'HTTP',
				tab: '',
				time: '立即撤回',
				date: '',
				versions: '',
				backversion: '',
				pushTypeActive: '',
				pushTabActive: '',
			},
			versionsList: [],
			assigning: '',
			timing: '',
			operatingStatus: true,
			dialogVisible: false,
			dialogVisible2: false,
			rowHeader3: [
				{
					prop: 'rom_version',
					label: '版本号',
				},

				{
					prop: 'description',
					label: '版本描述',
				},
			],
			rowHeader2: [
				{
					prop: 'rom_version',
					label: '版本号',
				},
				{
					prop: 'push_mod',
					label: '发布渠道',
				},
				{
					prop: 'description',
					label: '版本描述',
				},
			],
			rowHeader1: [
				{
					prop: 'id',
					label: 'NO',
					width: '100px',
				},
				{
					prop: 'act_types',
					label: '类型',
				},

				{
					prop: 'rom_version',
					label: '版本号',
				},
				{
					prop: 'push_type',
					label: '发布类型',
				},
				{
					prop: 'push_mod',
					label: '发布渠道',
				},

				{
					prop: 'description',
					label: '发布描述',
					width: '400px',
				},
				{
					prop: 'statusActive',
					label: '状态',
				},
				{
					prop: 'time_create',
					label: '发布时间',
				},

				{
					prop: 'timingActive',
					label: '修改时间',
				},
			],
			tableData2: [],
			tableData3: [],
			tableData: [],
			tableData1: [],
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
			pageActive1: 0,
			noClick: true,
			pagePublic: 0,
			pubUser: [],
			dev_type: 0,
			tempRomVersion: '',
			versionsListActive: [],
			backId: '',
			pushKey: '',
			oldversion: '',
			rom_version_active: '',
			newsRom: '',
		};
	},
	mounted: function () {
		//this.queryPublishlist()
		//this.queryVersionlist()

		this.queryPublishlistRom();
		this.queryversionlistRom();
		// this.queryPublishuser()
	},
	methods: {
		//导出地址变量
		UploadUrl() {
			return hostUrl + '/url_mgmt/excel_url';
		},
		//撤回清单
		getBackInfo() {
			this.pagePublic = 0;
			this.blackList();
		},
		//撤回
		onSubmitBack(val) {
			let timetype = 1;
			let timeNums = 0;
			if (this.form1.time == '立即撤回') {
				timetype = 1;
				timeNums = 0;
			} else {
				timetype = 0;
				timeNums = parseInt(this.form1.date / 1000);
				if (timeNums <= Date.parse(new Date()) / 1000) {
					this.$message({
						message: '指定时间不能小于当前时间',
						type: 'error',
					});
					return false;
				}
			}
			// if (this.rom_version_active == 0) {
			//   this.$message({
			//     message: "当前已是最低版本，已经最低版本可撤回",
			//     type: "error"
			//   });
			//   return false;
			// }
			let param = {
				rom_version: this.newsRom,
				// push_type: this.form1.type,
				// dev_type: this.form1.tab,
				// push_mod: this.form1.modelType,
				// description: this.form1.desc,
				atonce: timetype,
				timing: timeNums,
				id: this.backId,
				push_key: this.pushKey,
				dev_type: this.dev_type,
			};
			rollbackRom(param)
				.then((res) => {
					if (res.status == 0) {
						this.dialogVisible2 = false;
						this.$message({
							message: '撤回成功',
							type: 'success',
						});
						this.common.monitoringLogs(
							'撤回',
							'撤回ROM系统包',
							1,
							this.oldversion,
							this.form1.backversion
						);
						this.queryPublishlistRom();
						this.queryversionlistRom();
					} else if (res.status == 1) {
						this.dialogVisible2 = false;
						this.$message({
							message: '当前已经是最低版本,不可以再撤回',
							type: 'warning',
						});
						this.common.monitoringLogs(
							'撤回',
							'撤回ROM系统包',
							1,
							this.oldversion,
							this.form1.backversion
						);
						this.queryPublishlistRom();
						this.queryversionlistRom();
					} else {
						this.$message({
							message: `${res.msg}`,
							type: 'error',
						});
						this.common.monitoringLogs(
							'撤回',
							'撤回ROM系统包',
							0,
							this.oldversion,
							this.form1.backversion
						);
					}
				})
				.catch((error) => {
					this.common.monitoringLogs(
						'撤回',
						'撤回ROM系统包',
						0,
						this.oldversion,
						this.form1.backversion
					);
				});
		},
		//Tab选择改变
		onchangeTabs(val) {
			this.form.versions = '';
			this.pager.page = 1;
			if (val == 'RK33XX') {
				this.dev_type = 0;
				this.queryPublishlistRom();
				this.queryversionlistRom();
			} else if (val == 'AMS805W') {
				this.dev_type = 1;
				this.queryPublishlistRom();
				this.queryversionlistRom();
			} else if (val == 'AMS905M4C') {
				this.dev_type = 2;
				this.queryPublishlistRom();
				this.queryversionlistRom();
			} else if (val == 'AMS905M4') {
				this.dev_type = 3;
				this.queryPublishlistRom();
				this.queryversionlistRom();
			} else if (val == 'PCGRAPE') {
				this.dev_type = 88;
				this.queryPublishlistRom();
				this.queryversionlistRom();
			}
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
			publishuserRom(param)
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
		//发布清单
		blackList() {
			this.dialogVisible5 = true;
			let param = {
				push_key: this.backPushkey,
				page: this.pagePublic,
			};
			publishuserRom(param)
				.then((res) => {
					if (res.status == 0) {
						let tempArr = res.result.cols;
						this.pubUser = this.pubUser.concat(tempArr);

						if (res.result.les_count == 0) {
							return false;
						} else {
							this.pagePublic++;
							this.blackList();
						}
					}
				})
				.catch((error) => {});
		},
		//查询灰度发布
		queryversionlistRom() {
			let param = {
				page: this.pager1.page - 1,
				dev_type: this.dev_type,
			};
			versionlistRom(param)
				.then((res) => {
					if (res.status == 0) {
						// if (res.result.page == 0) {
						//     this.pager1.count = res.result.cols.length * (res.result.page + 1) + res.result.les_count

						// } else {
						//     this.pager1.count = res.result.cols.length + 10 * (res.result.page) + res.result.les_count
						// }
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
						// let obj = {
						//   high_version_info: res.high_version_info,
						//   packet_version: res.packet_version
						// };
						this.tempRomVersion = res.packet_version;
						let teamArr = [];
						if (res.packet_version == '0.0.0') {
							this.tableData3 = [];
						} else {
							this.tableData3 = [];
							this.tableData3.push(res.online_version);
						}
						// this.tableData3 = [];
						this.tableData2 = nowArr;
					} else {
					}
				})
				.catch((error) => {});
		},
		//
		onclickimport() {
			this.dialogVisible4 = true;
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
			if (this.form.type == '正式发布') {
				user_list = [];
			} else {
				user_list = this.form.version.split(',');
			}
			if (this.form.type == '') {
				this.$message({
					message: '请选择发布类型',
					type: 'error',
				});
				return false;
			}
			// if (this.form.tab == "") {
			//     this.$message({
			//         message: "请选择设备类型",
			//         type: "error"
			//     });
			//     return false;
			// }
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
			if (this.form.user == '指定设备') {
				if (this.form.version == '') {
					this.$message({
						message: '请输入指定账号',
						type: 'error',
					});
					return false;
				}
			}
			if (user_list.length > 0) {
				for (var i = 0; i < user_list.length; i++) {
					let nowstr = '';
					if (user_list[i].substring(3, 5) == 'X') {
						nowstr = 88;
					} else {
						nowstr = user_list[i].substring(3, 4);
					}
					if (nowstr != this.dev_type) {
						this.$message({
							message: '请检查输入的SN号是否和设备品牌匹配',
							type: 'error',
						});
						return false;
					}
				}
			}

			let param = {
				rom_version: this.form.versions,
				push_type: this.form.type,
				dev_type: parseInt(this.dev_type),
				push_mod: this.form.modelType,
				description: this.form.desc,
				atonce: timetype,
				timing: timeNums,
				sn_list: user_list,
			};
			publishRom(param)
				.then((res) => {
					if (res.status == 0) {
						this.$message({
							message: '发布成功',
							type: 'success',
						});
						this.common.monitoringLogs('发布', '发布ROM系统包', 1);
						this.dialogVisible = false;
						this.queryPublishlistRom();
						this.queryversionlistRom();
					} else {
						this.$message({
							message: `${res.msg}`,
							type: 'error',
						});
						this.common.monitoringLogs('发布', '发布ROM系统包', 0);
						this.dialogVisible = false;
					}
				})
				.catch((error) => {
					this.common.monitoringLogs('发布', '发布ROM系统包', 0);
				});
		},
		//         //获取历史发布记录
		queryPublishlistRom() {
			// if (this.tabPosition == "RK3328") {
			//   this.dev_type = 0;
			// } else {
			//   this.dev_type = 1;
			// }

			let param = {
				page: this.pager.page - 1,
				dev_type: this.dev_type,
			};
			publishlistRom(param)
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

							if (nowArr[i].push_type == '灰度发布') {
								nowArr[i].push_type_active = '指定设备';
							} else {
								nowArr[i].push_type_active = '全网发布';
							}
							if (nowArr[i].description.length >= 20) {
								nowArr[i].description =
									nowArr[i].description.substr(0, 20) + '...';
							}
							if (nowArr[i].act_type == 1) {
								nowArr[i].act_types = '发布';
							} else {
								nowArr[i].act_types = '撤回';
							}
							if (nowArr[i].time_update == 0) {
								nowArr[i].time_update = '-';
							} else {
								nowArr[i].time_update = this.common.getTimes(
									parseInt(nowArr[i].time_update * 1000)
								);
							}
							if (nowArr[i].status == 0) {
								nowArr[i].statusActive = '未生效';
							} else {
								nowArr[i].statusActive = '已生效';
							}
							if (nowArr[i].timing == 0) {
								nowArr[i].timingActive = nowArr[i].time_update;
							} else {
								nowArr[i].timingActive = this.common.getTimes(
									nowArr[i].timing * 1000
								);
							}
							if (nowArr[i].act_type == 1) {
								nowArr[i].timingActive = '-';
							}
							if (nowArr[i].atonce == 0) {
								nowArr[i].atonceactive = '定时发布';
							} else {
								nowArr[i].atonceactive = '立即发布';
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
				this.form.user = '指定设备';
				this.oneType = false;
				this.allType = true;
			}
		},

		//获取发布版本

		querygetversion() {
			let param = new Object();
			param.page = this.pageActive;
			param.dev_type = this.dev_type;
			param.rom_version = this.tempRomVersion;
			getversionRom(param)
				.then((res) => {
					if (res.status == 0) {
						this.versionsList = [];
						res.result.cols.forEach((item, index) => {
							let obj = {};
							obj.value = item.rom_version;
							obj.label = item.rom_version;
							// obj.chanid = item.chanid

							// obj.label= item.id+"+"+item.chanid+"+"+item.name
							this.versionsList.push(obj);
						});
						if (this.versionsListActive.length == 0) {
							this.rom_version_active == '0';
						} else {
							let nowindex = this.versionsListActive.length - 1;
							this.rom_version_active = this.versionsListActive[
								nowindex
							].value;
						}

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
			this.queryPublishlistRom();
		},
		//分页
		handleCurrentChange1(val) {
			this.pager1.page = val.val;
			this.queryversionlistRom();
		},

		searchInfo() {},
		getShow() {
			this.showState = !this.showState;
		},
		handleButton(val, rows) {

             console.log(val,rows);
            return false;
			this.newsRom = rows.rom_version;

			this.backPushkey = rows.push_key;
			this.userType = '全网用户';
			this.dialogVisible2 = true;
			this.romVersion = rows.rom_version;
			this.oldversion = rows.rom_version;
			if (rows.dev_type == 0) {
				this.form1.pushTabActive = 'RK3328';
			} else if (rows.dev_type == 1) {
				this.form1.pushTabActive = 'AMS805';
			} else if (rows.dev_type == 2) {
				this.form1.pushTabActive = 'AMS905M4C';
			} else if (rows.dev_type == 3) {
				this.form1.pushTabActive = 'AMS905M4';
			} else if (rows.dev_type == 88) {
				this.form1.pushTabActive = 'PCGRAPE';
			}

			this.form1.pushTypeActive = rows.push_type;
			this.form1.pushModActive = rows.push_mod;
			this.form1.romVersionActive = rows.rom_version;
			this.form1.descriptionActive = rows.description;
			this.form1.timeActive = rows.time_create;
			this.form1.timeActive = rows.time_create;
			//this.form1.pushTabActive=rows.
			this.backId = rows.id;
			this.pushKey = rows.push_key;
			this.romVersion = rows.rom_version;
			let param = new Object();
			param.page = this.pageActive1;
			param.dev_type = this.dev_type;
			param.rom_version = this.tempRomVersion;
			param.rom_version = rows.rom_version;
			param.to_version = '0.0.0';
			// param.to_version = "0.0.0";
			//param.to_version= rows.rom_version
			getversionRom(param)
				.then((res) => {
					if (res.status == 0) {
						this.versionsListActive = [];
						res.result.cols.forEach((item, index) => {
							let obj = {};
							obj.value = item.rom_version;
							obj.label = item.rom_version;
							// obj.chanid = item.chanid

							// obj.label= item.id+"+"+item.chanid+"+"+item.name
							this.versionsListActive.push(obj);
						});

						if (this.versionsListActive.length == 0) {
							this.rom_version_active == '0';
						} else {
							let nowindex = this.versionsListActive.length - 1;
							this.rom_version_active = this.versionsListActive[
								nowindex
							].value;
						}
						if (res.result.les_count == 0) {
							return false;
						} else {
							this.pageActive1++;
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
		//灰度撤回

		handleButton1(val, rows) {
           
			this.newsRom = rows.rom_version;
			this.backPushkey = rows.push_key;
			this.userType = '指定设备';
			this.dialogVisible2 = true;
			if (rows.dev_type == 0) {
				this.form1.pushTabActive = 'RK3328';
			} else if (rows.dev_type == 1) {
				this.form1.pushTabActive = 'AMS805W';
			} else if (rows.dev_type == 2) {
				this.form1.pushTabActive = 'AMS905M4C';
			} else if (rows.dev_type == 3) {
				this.form1.pushTabActive = 'AMS905M4';
			} else if (rows.dev_type == 88) {
				this.form1.pushTabActive = 'PCGRAPE';
			}

			this.form1.pushTypeActive = rows.push_type;
			this.form1.pushModActive = rows.push_mod;
			this.form1.romVersionActive = rows.rom_version;
			this.form1.descriptionActive = rows.description;
			if (rows.time_create == 0) {
				this.form1.timeActive = 0;
			} else {
				this.form1.timeActive = this.common.getTimes(
					this.form1.timeActive
				);
			}
			this.form1.timeActive = rows.time_create;
			//this.form1.pushTabActive=rows.
			this.backId = rows.id;
			this.pushKey = rows.push_key;
			this.romVersion = rows.rom_version;
			this.oldversion = rows.rom_version;
			let param = new Object();
			param.page = this.pageActive1;
			param.dev_type = this.dev_type;
			param.rom_version = this.tempRomVersion;
			param.to_version = rows.rom_version;
			getversionRom(param)
				.then((res) => {
					if (res.status == 0) {
						this.versionsListActive = [];
						res.result.cols.forEach((item, index) => {
							let obj = {};
							obj.value = item.rom_version;
							obj.label = item.rom_version;
							// obj.chanid = item.chanid

							// obj.label= item.id+"+"+item.chanid+"+"+item.name
							this.versionsListActive.push(obj);
							if (this.versionsListActive.length == 0) {
								this.rom_version_active = '0';
							} else {
								let nowindex =
									this.versionsListActive.length - 1;
								this.rom_version_active = this.versionsListActive[
									nowindex
								].value;
							}
						});
						if (res.result.les_count == 0) {
							return false;
						} else {
							this.pageActive1++;
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
		add() {
			this.dialogVisible = true;
			this.form.desc = '';
			this.form.versions = '';
			this.form.type = '';
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
	},
	components: {
		pageNation: pageNation,
		tableBarActive2: tableBarActive2,
		mySearch: mySearch,
		tableBarActive2pub: tableBarActive2pub,
	},
};
</script>

<style lang="less">
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

// .upload-demo {
//   // height: 400px;
// }

.version_active {
	.el-form-item {
		margin-bottom: 10px;
	}
}

#title_btn .changetab {
	margin-top: 0px;
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
