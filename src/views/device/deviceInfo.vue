<template>
	<section class="myself-container deviceinfo">
		<!-- <div class="user-title">
      <el-row>
        <el-col :span="5">
          <div class="user-item">
            <div class="item-count">{{bound_dev_cnt}}</div>
            <div class="item-text">已绑定设备</div>
          </div>
        </el-col>
        <el-col :span="5" style="margin-left:30px;">
          <div class="user-item">
            <div class="item-count">{{online_dev_cnt}}</div>
            <div class="item-text">在线设备</div>
          </div>
        </el-col>
      </el-row>
    </div> -->
		<div class="device_form">
			<el-form ref="form" :model="form" style="margin-top: 20px">
				<el-row type="flex">
					<el-form-item>
						<el-input
							size="small"
							placeholder="设备SN、名称、IP、MAC地址或节点ID"
							v-model="searchText"
							@keyup.enter.native="onSubmitKey"
						>
							<i
								slot="prefix"
								class="el-input__icon el-icon-search"
								@click="onSubmitKey"
							></i>
						</el-input>
					</el-form-item>
					<el-col :span="20">
						<el-row type="flex">
							<el-form-item
								label="一级渠道商"
								style="display: flex; width: 270px"
							>
								<el-select
									size="small"
									v-model="pri_chan_prv"
									placeholder="请选择"
								>
									<el-option
										label="全部"
										value=""
									></el-option>
									<el-option
										v-for="item in pri_chan_prvs"
										:key="item"
										:label="item.label"
										:value="item.value"
									></el-option>
								</el-select>
							</el-form-item>
							<el-form-item
								label="二级渠道商"
								style="display: flex; width: 270px"
							>
								<el-select
									size="small"
									v-model="scd_chan_prv"
									placeholder="请选择"
								>
									<el-option
										label="全部"
										value=""
									></el-option>

									<el-option
										v-for="item in pri_chan_prvs"
										:key="item"
										:label="item.second_label"
										:value="item.value"
									></el-option>
								</el-select>
							</el-form-item>
							<el-form-item
								label="设备品牌"
								style="display: flex; width: 270px"
							>
								<el-select
									size="small"
									v-model="eqp_brd"
									placeholder="请选择"
								>
									<el-option
										label="全部"
										value=""
									></el-option>
									<el-option
										v-for="item in eqp_brds"
										:key="item"
										:label="item"
										:value="item"
									></el-option>
								</el-select>
							</el-form-item>
							<el-form-item
								label="设备类型"
								style="display: flex; width: 270px"
							>
								<el-select
									size="small"
									v-model="eqp_type"
									placeholder="请选择"
								>
									<el-option
										label="全部"
										value=""
									></el-option>
									<el-option
										v-for="item in eqp_types"
										:key="item"
										:label="item"
										:value="item"
									></el-option>
								</el-select>
							</el-form-item>
							<el-form-item
								label="设备型号"
								style="display: flex; width: 270px"
							>
								<el-select
									size="small"
									v-model="dev_type"
									placeholder="请选择"
								>
									<el-option
										v-for="item in dev_types"
										:key="item.value"
										:label="item.label"
										:value="item.value"
									></el-option>
								</el-select>
							</el-form-item>

							<el-form-item
								label="操作系统"
								style="display: flex; width: 290px"
							>
								<el-select
									size="small"
									v-model="op_sys"
									placeholder="请选择"
								>
									<el-option
										v-for="item in op_syss"
										:key="item.value"
										:label="item.label"
										:value="item.value"
									></el-option>
								</el-select>
							</el-form-item>
						</el-row>
					</el-col>
				</el-row>
				<el-row type="flex" class="row_activess">
					<el-form-item
						label="ROM"
						style="display: flex; width: 230px"
					>
						<el-select
							v-model="rom_version"
							size="small"
							placeholder="请选择"
						>
							<el-option
								v-for="item in roms"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item
						label="设备状态"
						style="display: flex; width: 270px"
					>
						<el-select
							v-model="online_state"
							size="small"
							placeholder="请选择"
						>
							<el-option label="全部" value="-1"></el-option>

							<el-option
								v-for="item in onlineStates"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item
						label="绑定"
						style="display: flex; width: 230px"
					>
						<el-select
							size="small"
							v-model="bind_flag"
							placeholder="请选择"
							@change="onChange2"
						>
							<el-option
								v-for="item in bindFlags"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="注册时间" style="display: flex">
						<el-date-picker
							size="small"
							v-model="bind_start_ts"
							type="datetimerange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							:picker-options="pickerOptions"
						>
						</el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" size="small" @click="search"
							>搜索</el-button
						>
					</el-form-item>
					<el-form-item>
						<el-button size="small" @click="resetInfo"
							>重置</el-button
						>
					</el-form-item>
				</el-row>
				<div></div>
			</el-form>
		</div>
		<div class="devide_table">
			<el-row
				type="flex"
				class="row_active"
				style="display: flex; justify-content: flex-end"
			>
				<el-col style="display: flex; justify-content: flex-end">
					<el-button
						type="primary"
						@click="toexportExcel"
						size="small"
						>导出</el-button
					>
				</el-col>
			</el-row>
			<el-row type="flex" class="row_active">
				<el-col>
					<el-table
						:data="tableData"
						border
						width="100%"
						@sort-change="changeTableSort"
						@selection-change="handleSelectionChange"
						:cell-style="rowClass"
						:header-cell-style="headClass"
					>
						<el-table-column type="selection" width="55">
						</el-table-column>
						<el-table-column
							prop="dev_sn"
							label="设备SN"
							width="150px"
						></el-table-column>
						<el-table-column
							prop="pri_chan_prv"
							label="一级渠道商"
							:formatter="formatOne"
						></el-table-column>
						<el-table-column
							prop="scd_chan_prv"
							label="二级渠道商"
							:formatter="formatTwo"
						></el-table-column>
						<el-table-column
							prop="eqp_brd"
							label="设备品牌"
						></el-table-column>
						<el-table-column
							prop="eqp_type"
							label="设备类型"
						></el-table-column>
						<el-table-column
							prop="hd_type"
							label="硬件类型"
						></el-table-column>
						<el-table-column
							prop="dev_type"
							label="设备型号"
						></el-table-column>
						<el-table-column
							prop="op_sys"
							label="操作系统"
						></el-table-column>
						<el-table-column
							prop="rom_version"
							label="ROM版本"
						></el-table-column>
						<el-table-column
							prop="dev_name"
							label="设备名称"
						></el-table-column>
						<el-table-column
							prop="dev_mac"
							label="MAC地址"
						></el-table-column>
						<el-table-column
							prop="cpu_id"
							label="CPU-ID"
						></el-table-column>
						<el-table-column
							prop="total_cap"
							:formatter="formatDevCap"
							label="总容量"
						></el-table-column>
						<el-table-column
							prop="dev_ip"
							label="设备IP"
						></el-table-column>
						<el-table-column
							prop="online_state"
							:formatter="formatState"
							label="设备状态"
						></el-table-column>
						<el-table-column
							prop="bind_flag"
							:formatter="formatBind"
							label="是否绑定"
							width="80px"
						></el-table-column>
						<el-table-column
							prop="bind_timestamp"
							:formatter="formatDevTime"
							width="150"
							label="绑定时间"
							:sortable="'custom'"
						></el-table-column>
						<el-table-column
							prop="ipfs_id"
							label="节点ID"
							width="200px"
						></el-table-column>
						<el-table-column
							prop="bind_user_id"
							label="绑定用户ID"
							:formatter="formatBindUserId"
						></el-table-column>
						<el-table-column
							label="操作"
							fixed="right"
							width="250px"
						>
							<template slot-scope="scope">
								<div
									style="
										display: flex;
										justify-content: flex-start;
									"
								>
									<el-button
										:disabled="
											scope.row.online_state != 1 &&
											scope.row.online_state != 101
										"
										@click="shut(scope.row)"
										type="text"
										size="small"
										>关机</el-button
									>
									<el-button
										:disabled="
											scope.row.online_state != 1 &&
											scope.row.online_state != 101
										"
										type="text"
										@click="restart(scope.row)"
										size="small"
										>重启</el-button
									>
									<!-- <el-button v-else :disabled="true" type="text" size="small">强制解绑</el-button> -->
									<!-- <el-button v-show="scope.row.bind_flag===0" type="text" @click="tie(scope.row)" size="small">绑定</el-button> -->
									<el-button
										v-if="
											scope.row.bind_flag === 0 ||
											scope.row.bind_flag === 102
										"
										type="text"
										@click="tieactive(scope.row)"
										size="small"
										>绑定</el-button
									>
									<el-button
										v-else
										@click="untied(scope.row)"
										type="text"
										size="small"
										>强制解绑</el-button
									>
								</div>
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
			<el-row type="flex">
				<el-button size="small" style="width: 60px" @click="allOn"
					>重启</el-button
				>

				<el-button size="small" style="width: 60px" @click="allOff"
					>关机</el-button
				>
			</el-row>
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
		<el-dialog
			:visible.sync="dialogVisibleactive"
			width="20%"
			:before-close="handleClose"
		>
			<el-form ref="form">
				<el-form-item label="">
					<div style="float: left; width: 150px; text-align: right">
						请输入需要绑定ID:
					</div>
					<el-input
						v-model="user_id_active"
						style="float: left; width: 200px; margin-left: 10px"
					></el-input>
				</el-form-item>
				<el-form-item label="">
					<div style="float: left; width: 150px; text-align: right">
						请输入需要绑定昵称
					</div>
					<el-input
						v-model="active_dev_name"
						style="float: left; width: 200px; margin-left: 10px"
						maxlength="10"
					></el-input>
				</el-form-item>

				<div style="text-align: center">
					<el-button type="primary" @click="onSubmitBind"
						>确定</el-button
					>
					<el-button @click="dialogVisibleactive = false"
						>取消</el-button
					>
				</div>
			</el-form>
		</el-dialog>
	</section>
</template>

<script>
import tableBarActive2 from '../../components/tableBarActive2';
import mySearch from '../../components/mySearch';
import pageNation from '../../components/pageNation';
import {
	devicelist, //table查询
	device_cnt_overview, //查询title
	change_device_bind_state, //强制解绑
	ctrl_node_state, //关机重启
	web_change_device_state,
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
			pri_chan_prv: '',
			pri_chan_prvs: [
				{
					value: 'pc.linux.pcgrapefruit.pcgrapefruit',
					label: 'PC版西柚机',
					second_label: 'PC版西柚机',
				},
				{
					value: 'harddiskbox.grapefruit.grapefruit.grapefruit',
					label: '西柚机',
					second_label: '西柚机',
				},
				{
					value: 'harddiskbox.xunlei.nethingcloud.onethingcloud',
					label: '玩客云',
					second_label: '玩客云',
				},
				{
					value: 'tvbox.xiaomi.xiaomi.xiaomi4c',
					label: '小米',
					second_label: '小米盒子4C',
				},
				{
					value: 'tvbox.xiaomi.xiaomi.xiaomi4',
					label: '小米',
					second_label: '小米盒子4',
				},
				{
					value: 'tvbox.skyworth.kyworth.skyworthqplus1',
					label: '创维',
					second_label: '创维Q+一代',
				},
				{
					value: 'tvbox.phicomm.phicommn.phicommn1',
					label: '斐讯',
					second_label: '斐讯N1盒子',
				},
				{
					value: 'tvbox.tencent.tencentjg.tencentjg1s',
					label: '企鹅极光',
					second_label: '企鹅极光1S',
				},
				{
					value: 'pc.linux.yunlian.yunlian',
					label: '云链',
					second_label: '云链',
				},
				{
					value: 'pc.linux.hk.hk',
					label: '香港运维',
					second_label: '云链',
				},
				{
					value: 'pc.linux.rouji.kernel2-3',
					label: 'rouji',
					second_label: 'rouji-kernel2-3',
				},
				{
					value: 'pc.linux.rouji.kernel2-3',
					label: 'rouji',
					second_label: 'rouji-kernel4-5',
				},
			],
			scd_chan_prv: '',
			scd_chan_prvs: [
				{
					value: 's.computer.unknown.pcgrapefruit',
					label: 'PC版西柚机',
				},
				{
					value: 's.harddiskbox.grapefruit.grapefruit',
					label: '西柚机',
				},
				{
					value: 'f.computer.unknown.yunlian',
					label: '云链',
				},
				{
					value: 's.computer.unknown.hk',
					label: '香港运维',
				},
				{
					value: 's.computer.unknown.rouji-kernel2-3',
					label: 'rouji-kernel2-3',
				},
				{
					value: 's.computer.unknown.rouji-kernel4-5',
					label: 'rouji-kernel4-5',
				},
			],
			op_sys: '',
			op_syss: [
				{
					value: '',
					label: '全部',
				},
				{
					value: 'linux',
					label: 'linux',
				},
				{
					value: 'android',
					label: 'android',
				},
				{
					value: 'windows',
					label: 'windows',
				},
			],
			eqp_brd: '',
			eqp_brds: ['grapefruit', '迅雷', '小米', '创维', '斐讯', '腾讯'],
			eqp_type: '',
			eqp_types: ['PC服务器', '硬盘盒子', '电视盒子', 'PC服务器'],
			bind_user_tel_num: '',
			IDvalue: '',
			dialogVisible: false,
			dialogVisible2: false,
			searchText: '',
			bound_dev_cnt: '',
			online_dev_cnt: '',
			rotate: false,
			operatingStatus: true,
			clomnSelection: false,
			dialogVisibleactive: false,
			reserveselection: true,
			rom_version: '',
			dev_type: '',
			online_state: '-1',
			bind_flag: '-1',
			bind_start_ts: '',
			bind_end_ts: '',
			dev_types: [
				{
					value: '',
					label: '全部',
				},
				{
					value: 'RK33XX',
					label: 'RK33XX',
				},
				{
					value: 'AMS805W',
					label: 'AMS805W',
				},
				{
					value: 'AMS905M4C',
					label: 'AMS905M4C',
				},
				{
					value: 'AMS905M4',
					label: 'AMS905M4',
				},
				{
					value: 'AMS805QP1',
					label: 'AMS805QP1',
				},
				{
					value: 'AMS905N1',
					label: 'AMS905N1',
				},
				{
					value: 'AMS905JG1S',
					label: 'AMS905JG1S',
				},
			],
			onlineStates: [
				{
					value: 0,
					label: '离线',
				},
				{
					value: 1,
					label: '在线',
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
			bindFlags: [
				{
					value: '-1',
					label: '全部',
				},
				{
					value: '0',
					label: '否',
				},
				{
					value: '1',
					label: '是',
				},
			],
			roms: [
				{
					value: '',
					label: '全部',
				},
				{
					value: '1.2.21',
					label: '1.2.21',
				},
				{
					value: '1.2.20',
					label: '1.2.20',
				},
				{
					value: '1.2.19',
					label: '1.2.19',
				},
				{
					value: '1.2.18',
					label: '1.2.18',
				},
				{
					value: '1.2.17',
					label: '1.2.17',
				},
				{
					value: '1.2.16',
					label: '1.2.16',
				},
				{
					value: '1.2.11',
					label: '1.2.11',
				},
				{
					value: '1.2.10',
					label: '1.2.10',
				},
				{
					value: '1.1.9',
					label: '1.1.9',
				},
				{
					value: '1.0.56',
					label: '1.0.56',
				},
				{
					value: '1.0.5',
					label: '1.0.5',
				},
				{
					value: '1.0.3',
					label: '1.0.3',
				},
				{
					value: '1.0.1',
					label: '1.0.1',
				},
			],
			tableData: [],
			tableOption: {
				label: '操作',
				options: [
					{
						label: '关机',
						type: 'primary',
						methods: 'shutdown',
					},
					{
						label: '重启',
						type: 'danger',
						methods: 'restart',
					},
					{
						label: '解绑',
						type: 'danger',
						methods: 'untied',
					},
				],
			},
			pager: {
				count: 0,
				page: 1,
				rows: 100,
			},
			showState: false,
			tableData2: [],
			pageActive: 0,
			user_id_active: '',
			dev_sn_active: '',
			bind_user_tel_num: '',
			order_type: 1,
			active_dev_name: '',
			multipleSelection: [],
			snId: [],
		};
	},
	mounted() {
		this.getOverview();
		this.getInfo();
	},
	methods: {
		//获取所选ID
		handleSelectionChange(val) {
			let _this = this;
			this.multipleSelection = val;
			this.snId = [];
			this.multipleSelection.forEach(function (item, index) {
				_this.snId.push(item.dev_sn);
			});
		},
		//批量重启
		allOff() {
			if (this.snId.length == 0) {
				this.$message({
					type: 'error',
					message: '请至少勾选一项',
				});
				return false;
			}

			//关机
			this.$confirm('确定批量关机?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					this.closeRestore(2, this.snId);
				})
				.catch(() => {
					// this.$message({
					// 	type: 'info',
					// 	message: '已取消',
					// });
				});
		},
		//批量关机
		allOn(rows) {
			if (this.snId.length == 0) {
				this.$message({
					type: 'error',
					message: '请至少勾选一项',
				});
				return false;
			}
			//关机
			this.$confirm('确定批量重启?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					this.closeRestore(1, this.snId);
				})
				.catch(() => {
					// this.$message({
					// 	type: 'info',
					// 	message: '已取消',
					// });
				});
		},
		//排序w
		changeTableSort(column) {
			if (column.prop == 'bind_timestamp') {
				if (column.order == 'descending') {
					this.order_type = 1;
				} else {
					this.order_type = 2;
				}
				this.pager.page = 1;
				this.getInfo();
			}
		},
		tieactive(val) {
			this.user_id_active = '';
			this.active_dev_name = '';
			this.dev_sn_active = val.dev_sn;
			this.dialogVisibleactive = true;
		},

		//绑定
		onSubmitBind() {
			let param = new Object();
			if (this.user_id_active.length == 0) {
				this.$message({
					message: '绑定ID不能为空',
					type: 'error',
				});
				return false;
			}
			if (this.active_dev_name.length == 0) {
				this.$message({
					message: '昵称不能为空',
					type: 'error',
				});
				return false;
			}
			if (!/^[\u4E00-\u9FA5A-Za-z0-9_]+$/.test(this.active_dev_name)) {
				this.$message({
					message: '昵称格式不对',
					type: 'error',
				});
				return false;
			}
			(param.bind_type = 1),
				(param.user_id = parseInt(this.user_id_active)),
				(param.dev_sn = this.dev_sn_active),
				(param.bind_user_tel_num = this.bind_user_tel_num),
				(param.dev_name = this.active_dev_name);
			web_change_device_state(param)
				.then((res) => {
					if (res.status == 0 && res.err_code == 0) {
						this.$message({
							message: '绑定成功',
							type: 'success',
						});
						this.dialogVisibleactive = false;
					} else if (res.status == -4 && res.err_code == 236) {
						this.$message({
							message: '同一用户下绑定昵称不可以',
							type: 'error',
						});
					} else if (res.status == 0 && res.err_code == 225) {
						this.$message({
							message: '设备不存在,无法绑定！',
							type: 'error',
						});
					} else {
						this.$message({
							message: res.err_msg,
							type: 'error',
						});
					}

					this.getInfo();
				})
				.catch((error) => {
					this.$message({
						message: '后台服务出错',
						type: 'error',
					});
				});
		},
		//回车键搜索
		onSubmitKey() {
			this.getInfo();
		},

		//导出的方法
		exportExcel() {
			require.ensure([], () => {
				const {
					export_json_to_excel,
				} = require('../../excel/Export2Excel');
				const tHeader = [
					'设备SN',
					'设备类型',
					'ROM',
					'设备名称',
					'MAC地址',
					'CPU-ID',
					'总容量',
					'设备IP',
					'设备状态',
					'是否绑定',
					'绑定时间',
					'节点ID',
					'绑定用户ID',
				];
				// 上面设置Excel的表格第一行的标题
				const filterVal = [
					'dev_sn',
					'dev_type',
					'rom_version',
					'dev_name',
					'dev_mac',
					'cpu_id',
					'total_cap',
					'dev_ip',
					'online_state',
					'bind_flag',
					'bind_timestamp',
					'ipfs_id',
					'bind_user_id',
				];

				// 上面的index、nickName、name是tableData里对象的属性
				const list = this.tableData2; //把data里的tableData存到list
				const data = this.formatJson(filterVal, list);
				export_json_to_excel(tHeader, data, '设备信息表');
			});
		},
		formatJson(filterVal, jsonData) {
			return jsonData.map((v) => filterVal.map((j) => v[j]));
		},
		//重置
		resetInfo() {
			this.pager.page = 1;
			this.searchText = '';
			this.bind_end_ts = '';
			this.bind_flag = '-1';
			this.bind_start_ts = '';
			this.dev_type = '';
			this.eqp_type = '';
			this.online_state = '-1';
			this.rom_version = '';
			(this.pri_chan_prv = ''),
				(this.scd_chan_prv = ''),
				(this.op_sys = ''),
				this.getInfo();
		},
		formatJson(filterVal, jsonData) {
			return jsonData.map((v) => filterVal.map((j) => v[j]));
		},
		formatDevCap(row) {
			if (row.total_cap == 0) {
				return 0 + 'GB';
			} else {
				return this.common.formatByteActive(row.total_cap);
			}
		},
		formatDevType(row) {
			if (row.dev_type === 1) {
				return 'RK3328';
			} else {
				return 'AMS805';
			}
		},
		formatDevTime(row) {
			return this.common.getTimes(row.bind_timestamp * 1000);
		},
		formatState(row) {
			if (row.online_state === 0) {
				return '离线';
			} else if (row.online_state === 1) {
				return '在线';
			} else if (row.online_state === 2) {
				return ' 非法设备';
			} else if (row.online_state === 3) {
				return '在线';
			} else if (row.online_state === 100) {
				return '非法设备';
			} else if (row.online_state === 101) {
				return '离线';
			} else if (row.online_state === 99) {
				return '非法设备';
			} else if (row.online_state === 1000) {
				return '重启中';
			} else if (row.online_state === 1001) {
				return '关机中';
			}
		},
		formatBind(row) {
			if (row.bind_flag === 0 || row.bind_flag === 102) {
				return '否';
			} else if (row.bind_flag === 1) {
				return '是';
			}
		},
		formatOne(data) {
			if (data.pri_chan_prv == '' || data.pri_chan_prv == 0) {
				return '--';
			}
			let nowstr = data.pri_chan_prv + '';
			return nowstr.split('|')[1];
		},
		formatTwo(data) {
			if (data.scd_chan_prv == '' || data.scd_chan_prv == 0) {
				return '--';
			}
			let nowstr = data.scd_chan_prv + '';
			return nowstr.split('|')[1];
		},
		formatBindUserId(row) {
			if (row.bind_user_id == 0 || row.bind_user_id == '') {
				return '--';
			} else {
				return row.bind_user_id;
			}
		},
		getInfo() {
			var data = {
				pri_chan_prv: this.pri_chan_prv,
				scd_chan_prv: this.scd_chan_prv,
				op_sys: this.op_sys,
				hd_type: '',
				eqp_brd: this.eqp_brd,
				eqp_type: this.eqp_type,
				ipfs_id: '',
				bind_user_id: 0,
				order_type: this.order_type,
				page_no: this.pager.page - 1,
				page_size: 10,
				dev_type: this.dev_type,
				online_state: parseInt(this.online_state),
				rom_version: this.rom_version === '' ? '' : this.rom_version,
				bind_flag:
					this.bind_flag === '-1' ? -1 : Number(this.bind_flag),

				bind_start_ts:
					this.bind_start_ts === ''
						? -1
						: this.bind_start_ts == null
						? -1
						: new Date(this.bind_start_ts[0]).getTime() / 1000,
				bind_end_ts:
					this.bind_start_ts === ''
						? -1
						: this.bind_start_ts == null
						? -1
						: new Date(this.bind_start_ts[1]).getTime() / 1000,
			};
			let SME = /^SME[0-9a-zA-Z]{1}[0-9]{4}[0-9a-zA-Z]{7}$/;
			// let cpuid = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{9}$/;
			let macaddress = /^([0-9a-f]{2}:){5}[0-9a-f]{2}$/;
			let devip = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
			if (this.searchText != '') {
				if (SME.test(this.searchText) == true) {
					data.dev_sn = this.searchText;
					data.dev_name = '';
					data.dev_ip = '';
					data.dev_mac = '';
				} else if (macaddress.test(this.searchText) == true) {
					data.dev_sn = '';
					data.dev_name = '';
					data.dev_ip = '';
					data.dev_mac = this.searchText;
				} else if (devip.test(this.searchText) == true) {
					data.dev_sn = '';
					data.dev_name = '';
					data.dev_ip = this.searchText;
					data.dev_mac = '';
				} else {
					data.dev_sn = '';
					data.dev_name = this.searchText;
					data.dev_ip = '';
					data.dev_mac = '';
				}
			} else {
				data.dev_sn = '';
				data.dev_name = '';
				data.dev_ip = '';
				data.dev_mac = '';
			}

			// if (this.judgeString(this.searchText)) {
			//   var param = Object.assign(this.judgeString(this.searchText), data);
			// } else {
			//   this.$message.error(
			//     "请输入正确的设备SN、设备名称、MAC地址、设备IP、节点ID"
			//   );
			//   return;
			// }
			devicelist(data)
				.then((res) => {
					if (res.status === 0) {
						this.tableData = res.data.dev_list;
						this.pager.count = res.data.total_num;
						this.pager.rows = res.data.total_page;
					} else {
						this.$message({
							message: `${res.err_msg}`,
							type: 'error',
						});
					}
				})
				.catch((error) => {
					this.$message({
						message: '网络出错，请重新请求',
						type: 'error',
					});
				});
		},
		toexportExcel() {
			var data = {
				pri_chan_prv: this.pri_chan_prv,
				scd_chan_prv: this.scd_chan_prv,
				op_sys: this.op_sys,
				hd_type: '',
				eqp_brd: this.eqp_brd,
				eqp_type: this.eqp_type,
				ipfs_id: '',
				bind_user_id: 0,
				order_type: this.order_type,
				page_no: this.pageActive,
				page_size: 10,
				dev_type: this.dev_type,
				online_state: parseInt(this.online_state),
				rom_version: this.rom_version === '' ? '' : this.rom_version,
				bind_flag:
					this.bind_flag === '-1' ? -1 : Number(this.bind_flag),

				bind_start_ts:
					this.bind_start_ts === ''
						? -1
						: this.bind_start_ts == null
						? -1
						: new Date(this.bind_start_ts).getTime() / 1000,
				bind_end_ts:
					this.bind_end_ts === ''
						? -1
						: this.bind_end_ts == null
						? -1
						: new Date(this.bind_end_ts).getTime() / 1000,
			};
			let SME = /^SME[0-9a-zA-Z]{1}[0-9]{4}[0-9a-zA-Z]{7}$/;
			// let cpuid = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{9}$/;
			let macaddress = /^([0-9a-f]{2}:){5}[0-9a-f]{2}$/;
			let devip = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
			if (this.searchText != '') {
				if (SME.test(this.searchText) == true) {
					data.dev_sn = this.searchText;
					data.dev_name = '';
					data.dev_ip = '';
					data.dev_mac = '';
				} else if (macaddress.test(this.searchText) == true) {
					data.dev_sn = '';
					data.dev_name = '';
					data.dev_ip = '';
					data.dev_mac = this.searchText;
				} else if (devip.test(this.searchText) == true) {
					data.dev_sn = '';
					data.dev_name = '';
					data.dev_ip = this.searchText;
					data.dev_mac = '';
				} else {
					data.dev_sn = '';
					data.dev_name = this.searchText;
					data.dev_ip = '';
					data.dev_mac = '';
				}
			} else {
				data.dev_sn = '';
				data.dev_name = '';
				data.dev_ip = '';
				data.dev_mac = '';
			}
			devicelist(data)
				.then((res) => {
					if (res.status === 0) {
						//this.tableData2 = res.data.dev_list;
						// this.pager.count = res.data.total_num;
						// this.pager.rows = res.data.total_page;
						this.pageActive = res.data.cur_page;
						let tempArr = [];
						tempArr = res.data.dev_list;
						for (var i = 0; i < tempArr.length; i++) {
							switch (tempArr[i].online_state) {
								case 0:
									tempArr[i].online_state = '离线';
									break;
								case 1:
									tempArr[i].online_state = '在线';
									break;
								default:
									tempArr[i].online_state = '非法设备';
							}
							switch (tempArr[i].bind_flag) {
								case 0:
									tempArr[i].bind_flag = '是';
									break;
								case 1:
									tempArr[i].bind_flag = '否';
									break;
							}

							switch (tempArr[i].total_cap) {
								case 0:
									tempArr[i].total_cap = '0GB';
									break;
								default:
									tempArr[i].total_cap =
										(
											tempArr[i].total_cap /
											1024 /
											1024 /
											1024
										).toFixed(2) + 'GB';
							}
							switch (tempArr[i].bind_timestamp) {
								case 0:
									tempArr[i].bind_timestamp = '暂无';
									break;
								default:
									tempArr[
										i
									].bind_timestamp = this.common.getTimes(
										tempArr[i].bind_timestamp * 1000
									);
							}
							switch (tempArr[i].dev_type) {
								case 2:
									tempArr[i].dev_type = 'AMS805';
									break;
								default:
									tempArr[i].dev_type = 'RRK328';
							}
						}
						if (res.data.cur_page >= res.data.total_page) {
							this.exportExcel();
							this.common.monitoringLogs(
								'导出',
								'导出设备信息表',
								1
							);
						} else {
							this.tableData2 = this.tableData2.concat(
								res.data.dev_list
							);
							this.pageActive++;
							this.toexportExcel();
						}
					} else {
						this.$message({
							message: `${res.err_msg}`,
							type: 'error',
						});
						this.common.monitoringLogs('导出', '导出设备信息表', 0);
					}
				})
				.catch((error) => {
					this.common.monitoringLogs('导出', '导出设备信息表', 0);
					// this.$message({
					//     message: "网络出错，请重新请求",
					//     type: "error"
					// });
				});
		},

		getOverview() {
			device_cnt_overview()
				.then((res) => {
					if (res.status === 0) {
						this.bound_dev_cnt = res.data.bound_dev_cnt;
						this.online_dev_cnt = res.data.online_dev_cnt;
					}
				})
				.catch((error) => {
					this.$message({
						message: '网络出错，请重新请求',
						type: 'error',
					});
				});
		},
		comfirmUntiedactive() {
			let obj = {
				// login_token: "8vAmfX19fX3gkqggfX19fQ++",
				bind_user_tel_num: '',
				dev_sn: this.dev_sn_active,
				user_id: this.user_id_active,
				bind_type: 0, // 0 表示解绑； 1 表示绑定
				dev_name: '',
			};
			web_change_device_state(obj)
				.then((res) => {
					if (res.status === 0) {
						this.$message({
							message: '解绑成功',
							type: 'success',
						});
						this.getInfo();
					} else {
						this.$message({
							message: `${res.err_msg}`,
							type: 'error',
						});
					}
				})
				.catch((error) => {
					this.$message({
						message: '网络出错，请重新请求',
						type: 'error',
					});
				});
		},
		comfirmUntied(type, sn) {
			let obj = {
				login_token: '8vAmfX19fX3gkqggfX19fQ++',
				bind_user_tel_num: '',
				dev_sn: sn,
				ctrl_token: '8vAmfX19fX3gkqggfX19fQ++',
				bind_type: type, // 0 表示解绑； 1 表示绑定
			};
			change_device_bind_state(obj)
				.then((res) => {
					if (res.status === 0) {
						this.$message({
							message: type === 0 ? '解绑成功' : '绑定成功',
							type: 'success',
						});
						this.getInfo();
					} else {
						this.$message({
							message: `${res.err_msg}`,
							type: 'error',
						});
					}
				})
				.catch((error) => {
					this.$message({
						message: '网络出错，请重新请求',
						type: 'error',
					});
				});
		},
		closeRestore(type, sn) {
			let obj = {
				login_token: '8vAmfX19fX1NeaggfX19fQ==',
				dev_sn: sn, // 需要重启的设备sn
				extra_info: {
					ctrl_type: type, // 1 表示重启(已实现)；2 表示 关机(当前西柚机客户端还未实现此功能)
				},
			};
			ctrl_node_state(obj)
				.then((res) => {
					if (res.status === 0) {
						this.$message({
							message: type === 1 ? '重启成功' : '关机成功',
							type: 'success',
						});
						this.getInfo();
					} else {
						if (res.err_msg.indexOf('不在线，无法操作') != -1) {
							let err_message = res.err_msg.replace(
								/不在线，无法操作;/gi,
								`,\n`
							);
							this.$alert(
								err_message + '<p>不在线，无法操作</p>',
								'警告',
								{
									dangerouslyUseHTMLString: true,
									confirmButtonText: '确定',
									callback: (action) => {},
								}
							);
						} else {
							this.$message({
								message: `${err_message}`,
								type: 'error',
							});
						}
					}
				})
				.catch((error) => {
					this.$message({
						message: '网络出错，请重新请求',
						type: 'error',
					});
				});
		},
		getShow() {
			this.showState = !this.showState;
			this.rotate = !this.rotate;
		},
		untied(rows) {
			this.user_id_active = rows.bind_user_id;
			this.dev_sn_active = rows.dev_sn;
			this.$confirm('确定解绑?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					this.comfirmUntiedactive();
				})
				.catch((error) => {
					this.$message({
						type: 'info',
						message: '已取消解绑',
					});
				});
		},
		tie(rows) {
			this.$confirm('确定绑定?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					this.comfirmUntied(1, rows.dev_sn);
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消绑定',
					});
				});
		},
		shut(rows) {
			//关机
			this.$confirm('确定关机?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					this.snId = [];
					this.snId.push(rows.dev_sn);
					this.closeRestore(2, this.snId);
				})
				.catch(() => {
					// this.$message({
					// 	type: 'info',
					// 	message: '已取消关机',
					// });
				});
		},
		restart(rows) {
			//重启
			this.$confirm('确定重启?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					this.snId = [];
					this.snId.push(rows.dev_sn);
					this.closeRestore(1, this.snId);
				})
				.catch(() => {
					// this.$message({
					// 	type: 'info',
					// 	message: '已取消重启',
					// });
				});
		},
		search() {
			this.pager.page = 1;
			this.getInfo();
		},
		addAccout() {
			this.dialogVisible = true;
		},
		handleCurrentChange(val) {
			this.pager.page = val.val;
			this.getInfo();
		},
		judgeString(str) {
			const reg3 = /^(SMM)[0-9]{9}$/;
			const reg5 = /^[\u4E00-\u9FA5A-Za-z0-9]{4,20}$/;
			const reg7 = /^\d+$/;
			if (reg3.test(str)) {
				return {
					dev_sn: str,
				};
			} else if (reg5.test(str) && !reg7.test(str) && !reg3.test(str)) {
				return {
					dev_name: str,
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
		tableBarActive2: tableBarActive2,
		mySearch: mySearch,
	},
};
</script>

<style lang="less" scoped>
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

	background: #ffffff;
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
            .el-button{
                padding: 0 15px !important;
            }
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
