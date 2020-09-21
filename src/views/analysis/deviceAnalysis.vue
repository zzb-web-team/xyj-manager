<template>
	<section class="myself-container">
		<!-- <div class="switch_tab">
			<el-radio-group
				v-model="radio1"
				@change="onchangeTab"
				style="
					display: flex;
					justify-content: flex-start;
				"
			>
				<el-radio-button label="在线时长"></el-radio-button>
				<el-radio-button label="离线次数"></el-radio-button>
			</el-radio-group>
		</div> -->
		<div class="user-title" style="margin-bottom: 20px">
			<el-row
				type="flex"
				justify="start"
				style="margin-bottom: 24px; flex-wrap: wrap"
			>
			</el-row>
			<el-row
				type="flex"
				justify="start"
				style="margin-bottom: 24px; flex-wrap: wrap"
			>
				<!-- <el-col :span="3">
					<el-date-picker
						size="small"
						placeholder="选择日期时间"
						v-model="valueActive"
						type="date"
						align="left"
						@change="gettimes"
					></el-date-picker>
				</el-col> -->
				<el-col :span="3">
					<el-date-picker
						size="small"
						v-model="valueele"
						type="dates"
						placeholder="时间对比"
						@change="timeChange"
					>
					</el-date-picker>
					<el-select
						size="small"
						v-model="versointime1"
						placeholder="时段对比"
						@change="changePeriod"
						v-if="timeArr"
					>
						<el-option
							v-for="item in options1"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						>
						</el-option>
					</el-select>
				</el-col>

				<el-col :span="3">
					<el-select
						size="small"
						v-model="eqp_brd"
						placeholder="请选择设备品牌"
						@change="search_devtype"
					>
						<el-option label="全部" value="*"></el-option>
						<el-option
							v-for="item in eqp_brds"
							:key="item.name"
							:label="item.name"
							:value="item.name"
						></el-option>
					</el-select>
				</el-col>
				<el-col :span="3">
					<el-select
						size="small"
						v-model="dev_type"
						placeholder="请选择设备型号"
					>
						<el-option label="全部" value="*"></el-option>
						<el-option
							v-for="item in dev_types"
							:key="item"
							:label="item"
							:value="item"
						></el-option>
					</el-select>
				</el-col>
				<el-col :span="3">
					<el-select
						size="small"
						v-model="pri_chan_prv"
						placeholder="请选择一级渠道"
					>
						<el-option label="全部" value="*"></el-option>
						<el-option
							v-for="item in pri_chan_prvs"
							:key="item"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-col>
				<el-col :span="3">
					<el-select
						size="small"
						v-model="scd_chan_prv"
						placeholder="请选择二级渠道商"
					>
						<el-option label="全部" value="*"></el-option>
						<el-option
							v-for="item in scd_chan_prvs"
							:key="item"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-col>
				<!-- <el-col :span="3">
					<el-select
						size="small"
						v-model="devicetype"
						placeholder="请选择"
						@change="changeType"
					>
						<el-option
							v-for="item in options11"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						>
						</el-option>
					</el-select>
				</el-col> -->
				<el-col :span="3">
					<el-select
						size="small"
						v-model="versointype"
						placeholder="请选择"
						:disabled="disableTab"
					>
						<el-option label="全部版本" value="*">
						</el-option>
						<el-option
							v-for="item in options"
							:key="item"
							:label="item"
							:value="item"
						>
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="5">
					<el-button
						size="small"
						type="primary"
						style="margin-left: 20px"
						@click="onsumbit()"
						>确定</el-button
					>
					<el-button
						size="small"
						style="margin-left: 20px"
						@click="reset()"
						>重置</el-button
					>
				</el-col>
			</el-row>
		</div>
		<div class="devive_tab">
			<div class="device_tab_on">
				<div class="device_form" style="display: flex;space-between">
					<div
						id="myEchart"
						style="width: 100%; height: 700px; margin-top: 50px"
					></div>
					<div
						v-if="bin_show"
						style="
							width: 760px;
							height: 700px;
							margin-top: 50px;
							margin-left: 50px;
						"
					>
						<div
							id="myEchart_bin"
							style="width: 100%; height: 260px; margin-top: 50px"
						></div>
						<div class="devide_table">
							<el-row type="flex" class="row_active">
								<el-col :span="24">
									<el-table
										border
										:data="tableDatanew11"
										ref="table"
										style="width: 100%"
										:cell-style="rowClass"
										:header-cell-style="headClass"
										id="rebateSetTable"
									>
										<el-table-column
											prop="timeStamp"
											label="在线时长(OT)"
										>
											<template slot-scope="scope">
												<div
													style="
														display: flex;
														align-items: center;
													"
												>
													<i
														style="
															background: #5da7fd;
															border-radius: 2px;
															width: 10px;
															height: 10px;
															display: inline-block;
															margin-right: 15px;
														"
														:style="{
															background:
																scope.row
																	.background,
														}"
													></i>
													{{ scope.row.timeStamp }}
												</div>
											</template>
										</el-table-column>
										<el-table-column
											prop="deviceCnt"
											label="设备数"
										></el-table-column>
										<el-table-column
											prop="percent"
											label="占比(%)"
										></el-table-column>
									</el-table>
								</el-col>
							</el-row>
							<el-row
								type="flex"
								style="
									display: flex;
									justify-content: end;
									margin: 20px 0;
								"
							>
								<el-col :span="6">
									<pageNation
										:pager="pager"
										@handleSizeChange="handleSizeChange"
										@handleCurrentChange="
											handleCurrentChange
										"
									></pageNation>
								</el-col>
							</el-row>
						</div>
					</div>
				</div>
			</div>
			<!-- <div class="device_tab_on" >
				<div
					class="device_form device_form_active"
					style="display: flex;space-between"
				>
					<div
						id="myEchart1"
						style="width: 90%; height: 500px; margin-top: 50px"
					></div>
					<div
						style="
							height: 500px;
							display: flex;
							align-items: flex-end;
							justify-content: flex-start;
							white-space: nowrap;
						"
					>
						日累计离线次数
					</div>
				</div>
				<div class="devide_table">
					<el-row type="flex" class="row_active">
						<el-col :span="24">
							<tableBarActive2
								id="rebateSetTable"
								ref="table1"
								tooltip-effect="dark"
								:tableData="tableDatanew22"
								:clomnSelection="clomnSelection"
								:rowHeader="rowHeader1"
								:tableOption="tableOption1"
								@handleButton="handleButton"
								:operatingStatus="operatingStatus"
								@toOperating="toOperating"
								@handleSelectionChange="handleSelectionChange"
								@selectCheckBox="selectCheckBox"
								@selectAll="selectAll"
							></tableBarActive2>
						</el-col>
					</el-row>
					<el-row
						type="flex"
						style="
							display: flex;
							justify-content: flex-end;
							margin: 20px 0;
						"
					>
						<el-col :span="6">
							<pageNation
								:pager="pager1"
								@handleSizeChange1="handleSizeChange1"
								@handleCurrentChange1="handleCurrentChange1"
							></pageNation>
						</el-col>
					</el-row>
				</div>
			</div> -->
		</div>
	</section>
</template>

<script>
import echarts from 'echarts';
import tableBarActive2 from '../../components/tableBarActive2';
import {
	device_online_curve,
	device_online_table,
	query_playdata_table,
	device_online,
	device_offline,
	device_typerom_all,
	device_online_analyse_curve,
	device_online_analyse_table,
} from '../../api/api';
import pageNation from '../../components/pageNation';
import common from '../../common/js/util.js';

export default {
	data() {
		return {
			disableTab: true,
			valueActive:
				new Date(new Date().toLocaleDateString()).getTime() -
				24 * 60 * 60 * 1000,
			timeArr: false,
			valueele: '',
			versointype: '*',
			devicetype: '-1',
			versointime1: '0',
			options: [
				// {
				//   value: "",
				//   label: "全部版本",
				// },
				// {
				//   value: "3.2.2",
				//   label: "3.2.2",
				// },
				// {
				//   value: "3.2.3",
				//   label: "3.2.3",
				// },
			],
			options11: [],
			options1: [
				{
					value: '0',
					label: '全部时段',
				},
				{
					value: '1',
					label: '00:00:00-05:59:59',
				},
				{
					value: '2',
					label: '06:00:00-11:59:59',
				},
				{
					value: '3',
					label: '12:00:00-17:59:59',
				},
				{
					value: '4',
					label: '18:00:00-23:59:59',
				},
			],
			radio1: '在线时长',
			showType: true,
			shoudzyx: false,
			showzdyz: false,

			valueTime4: '',
			activeName: 'first',
			value1: [
				new Date(2000, 10, 10, 10, 10),
				new Date(2000, 10, 11, 10, 10),
			],
			value2: '',
			rowHeader: [
				{
					prop: 'timeStamp',
					label: '日累计在线时长(OT)',
				},
				{
					prop: 'num',
					label: '设备数',
				},
				{
					prop: 'percent',
					label: '占比(%)',
				},
			],
			rowHeader1: [
				{
					prop: 'timeStamp',
					label: '离线次数区间',
				},
				{
					prop: 'num',
					label: '设备数',
				},
				{
					prop: 'percent',
					label: '占比(%)',
				},
			],
			eqp_brd: '',
			eqp_brds: [
				{ name: 'linux', childen: ['PCGRAPE'] },
				{ name: 'grapefruit', childen: ['RK33XX'] },
				{ name: '迅雷', childen: ['AMS805W'] },
				{ name: '小米', childen: ['AMS905M4C', 'AMS905M4'] },
				{ name: '创维', childen: ['AMS805QP1'] },
				{ name: '斐讯', childen: ['AMS905N1'] },
				{ name: '腾讯', childen: ['AMS905JG1S'] },
			],
			pri_chan_prv: '',
			pri_chan_prvs: [
				{
					value: 'f.computer.unknown.pcgrapefruit',
					label: 'PC版西柚机',
				},
				{
					value: 'f.harddiskbox.grapefruit.grapefruit',
					label: '西柚机',
				},
				{
					value: 'f.harddiskbox.xunlei.onethingcloud',
					label: '玩客云',
				},
				{
					value: 'f.tvbox.xiaomi.xiaomi4c',
					label: '小米盒子4C',
				},
				{
					value: 'f.tvbox.xiaomi.xiaomi4',
					label: '小米盒子4',
				},
				{
					value: 'f.tvbox.skyworth.skyworthqplus1',
					label: '创维Q+一代',
				},
				{
					value: 'f.tvbox.phicomm.phicommn1',
					label: '斐讯N1盒子',
				},
				{
					value: 'f.tvbox.tencent.tencentjg1s',
					label: '企鹅极光1S',
				},
				{
					value: 'f.computer.unknown.yunlian',
					label: '云链',
				},
				{
					value: 'f.computer.unknown.hk',
					label: '香港运维',
				},
				{
					value: 'f.computer.unknown.rouji-kernel2-3',
					label: 'rouji-kernel2-3',
				},
				{
					value: 'f.computer.unknown.rouji-kernel4-5',
					label: 'rouji-kernel4-5',
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
			dev_type: '',
			dev_types: [],
			tableDatanew11: [],
			data: ['0次', '1-3次', '4-6次', '6-10次', '>10次'],
			tableDatanew22: [],
			tableData: [],
			tableData1: [],
			starttime: '',
			endtime: '',
			onLineX: [],
			onLineY: [],
			offLineX: [],
			offLineY: [],
			tableData2: [],
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
			onlinePer: 0,
			avgOnlineTimeInSec: 0,
			offlinePer: 0,
			avgofflineTimeInSec: 0,
			flag: 1,
			pageActives: 1,
			compareArr: [],
			romArr: [],
			timeCompared: false,
			timeComparedArr: [],
			bin_show: true,
			bin_list: [
				{ value: 0, name: 'OT<=1h', background: '#5DA7FD' },
				{ value: 0, name: '1h<OT<=5h', background: '#F86656' },
				{ value: 0, name: '5h<OT<=10h', background: '#F8B156' },
				{ value: 0, name: '10h<OT<=15h', background: '#F8E356' },
				{ value: 0, name: '15h<OT<=20h', background: '#56F89B' },
				{ value: 0, name: '20h<OT<24h', background: '#56F8F6' },
				{ value: 0, name: 'OT<=24h', background: '#56BDF8' },
			],
		};
	},
	mounted() {
		//this.configure();

		// this.queryOnlineinfo();
		// this.queryOnlineTable();
		// this.drawLine();
		// this.queryTypeInfo();
		// this.querydeviceOnline();
		this.get_echarts_data();
	},
	beforeDestroy() {
		if (!this.chart) {
			return;
		}
		this.chart.dispose();
		this.chart = null;
	},
	methods: {
		//获取图表数据
		get_echarts_data() {
			let params = new Object();
			params.nodeId = '*';
			params.region = '*';
			params.city = '*';
			params.isp = '*';
			params.time_unit = '60';
			params.firstChannel =
				this.pri_chan_prv == '' ? '*' : this.pri_chan_prv;
			params.secondChannel =
				this.scd_chan_prv == '' ? '*' : this.scd_chan_prv;
			params.deviceName = this.eqp_brd == '' ? '*' : this.eqp_brd;
			params.deviceType = this.dev_type == '' ? '*' : this.dev_type;
			params.romVersion = this.versointype == '' ? '*' : this.versointype;
			params.compareTime = this.compareArr;
			params.orderBy = 1;
			params.business_type = 0;
			params.business_scene = '*';
			device_online_analyse_curve(params)
				.then((res) => {
					if (res.status == 0) {
						let data_arr = [];
						for (let k in res.data) {
							let obj = {};
							obj.name = this.common.getTimes(k * 1000);
							obj.data = res.data[k];
							obj.type = 'bar';
							data_arr.push(obj);
							if (params.compareTime.length == 1) {
								res.data[k].forEach((item, index) => {
									this.bin_list[index] = item;
								});
							}
						}
						this.get_table_data();
						this.$nextTick(() => {
							this.drawLine(data_arr);
							if (params.compareTime.length == 0) {
								this.drawLine_bin();
							}
						});
					} else {
						this.$message.error(res.err_msg);
					}
				})
				.catch((error) => {});
		},
		//获取表格数据
		get_table_data() {
			this.tableDatanew11 = [];
			let params = new Object();
			params.nodeId = '*';
			params.region = '*';
			params.city = '*';
			params.isp = '*';
			params.time_unit = '60';
			params.firstChannel =
				this.pri_chan_prv == '' ? '*' : this.pri_chan_prv;
			params.secondChannel =
				this.scd_chan_prv == '' ? '*' : this.scd_chan_prv;
			params.deviceName = this.eqp_brd == '' ? '*' : this.eqp_brd;
			params.deviceType = this.dev_type == '' ? '*' : this.dev_type;
			params.romVersion = this.versointype == '' ? '*' : this.versointype;
			params.compareTime = this.compareArr;
			params.orderBy = 1;
			params.business_type = 0;
			params.business_scene = '*';
			if (params.compareTime.length < 1) {
				this.bin_show = true;
			} else {
				this.bin_show = false;
			}
			device_online_analyse_table(params)
				.then((res) => {
					if (res.status == 0) {
						res.list.forEach((item) => {
							let obj = {};
							if (item.onlineTime == 'times0') {
								obj.timeStamp = 'OT<1h';
								obj.background = '#5DA7FD';
							} else if (item.onlineTime == 'times1') {
								obj.timeStamp = '1h＜OT<5h';
								obj.background = '#F86656';
							} else if (item.onlineTime == 'times2') {
								obj.timeStamp = '5h＜OT<10h';
								obj.background = '#F8B156';
							} else if (item.onlineTime == 'times3') {
								obj.timeStamp = '10h＜OT<15h';
								obj.background = '#F8E356';
							} else if (item.onlineTime == 'times4') {
								obj.timeStamp = '15h＜OT<20h';
								obj.background = '#56F89B';
							} else if (item.onlineTime == 'times5') {
								obj.timeStamp = '20h＜OT<24h';
								obj.background = '#56F8F6';
							} else if (item.onlineTime == 'times6') {
								obj.timeStamp = 'OT=24h';
								obj.background = '#56BDF8';
							}
							obj.deviceCnt = item.deviceCnt;
							obj.percent = item.percent;
							this.tableDatanew11.push(obj);
						});
					} else {
						this.$message.error(res.err_msg);
					}
				})
				.catch((error) => {});
		},
		//品牌筛选型号
		search_devtype() {
			this.devtype_value = '';
			var indexOf_child = (this.eqp_brds || []).findIndex(
				(item) => item.name == this.eqp_brd
			);
			if (indexOf_child == -1) {
				this.dev_types = [];
			} else {
				this.dev_types = this.eqp_brds[indexOf_child].childen;
			}
		},
		//选这类型过滤版本
		changeType(val) {
			this.versointype = '*';
			this.options = [];

			if (val == -1) {
				this.disableTab = true;
				this.options = this.romArr[0].romSet.concat(
					this.romArr[1].romSet
				);
			} else {
				this.disableTab = false;
				this.options = this.romArr[val - 1].romSet;
			}
			let tempArr = [];
			//tempArr[0]="全部版本"
			// options.unshift("全部版本")
			this.options = tempArr.concat(this.options);
			// this.options.unshift("全部版本");
			// this.options.forEach((item, index) => {
			//   if (index != this.options.lastIndexOf(item)) {
			//     this.options.splice(index, 1);
			//   }
			// });
		},
		//查询西柚机所有版本
		queryTypeInfo() {
			this.options11 = [];
			this.options = [];
			let param = {};
			let obj2 = {
				value: '-1',
				label: '全部类型',
			};
			this.options11.push(obj2);
			device_typerom_all(param)
				.then((res) => {
					let tempArr = res.data;
					this.romArr = res.data;

					for (var i = 0; i < tempArr.length; i++) {
						let obj = {};
						let obj1 = {};

						if (tempArr[i].type == 0) {
							(obj.value = tempArr[i].type),
								(obj.label = '测试类型1');
							this.options = tempArr[i].romSet;
						} else if (tempArr[i].type == 1) {
							(obj.value = tempArr[i].type),
								(obj.label = 'RK3328');
							this.options = tempArr[i].romSet;
						} else if (tempArr[i].type == 2) {
							(obj.value = tempArr[i].type),
								(obj.label = 'AMS805');
							this.options = tempArr[i].romSet;
						}
						this.options11.push(obj);
					}
				})
				.catch((error) => {});
		},
		//时段选择
		changePeriod(val) {
			this.timeCompared = true;
			let compareArrActive = [];

			for (var i = 0; i < this.compareArr.length; i++) {
				if (val == 0) {
					compareArrActive.push(this.compareArr[i]);
				} else if (val == 1) {
					compareArrActive.push(this.compareArr[i] + 3600 * 6);
				} else if (val == 2) {
					compareArrActive.push(this.compareArr[i] + 3600 * 12);
				} else if (val == 3) {
					compareArrActive.push(this.compareArr[i] + 3600 * 18);
				} else if (val == 4) {
					compareArrActive.push(this.compareArr[i] + 3600 * 24);
				}
			}
			this.timeComparedArr = compareArrActive;
		},
		//对比时间确认
		timeChange() {
			this.compareArr = [];
			if (this.valueele != '' && this.valueele != null) {
				for (var i = 0; i < this.valueele.length; i++) {
					this.compareArr.push(this.valueele[i].getTime() / 1000);
				}
			}
		},
		onchangeTab(val) {
			this.radio1 = val;
			if (val == '在线时长') {
				this.showType = true;
				this.timeArr = false;
				this.valueele = '';

				this.versointype = '*';
				this.devicetype = '-1';
				this.timeComparedArr = [];
				this.compareArr = [];
				this.versointime1 = '0';
				(this.valueActive =
					new Date(new Date().toLocaleDateString()).getTime() -
					24 * 60 * 60 * 1000),
					this.querydeviceOnline();

				//this.flag = 1;
			} else {
				//this.flag = 0;
				this.showType = false;
				this.versointype = '*';
				this.devicetype = '-1';
				this.timeArr = true;
				this.valueele = '';
				this.timeComparedArr = [];
				this.compareArr = [];
				this.versointime1 = '0';
				(this.valueActive =
					new Date(new Date().toLocaleDateString()).getTime() -
					24 * 60 * 60 * 1000),
					this.querydeviceOffline();
			}
		},

		showzdyx() {
			this.shoudzyx = !this.shoudzyx;
		},

		//确定查询
		onsumbit() {
			this.get_echarts_data();
		},
		//重置
		reset() {
			this.valueele = '';
			this.compareArr = [];
			this.eqp_brd = '';
			this.dev_type = '';
			this.pri_chan_prv = '';
			this.scd_chan_prv = '';
			this.versointype = '';
			this.timeChange();

			this.get_echarts_data();
		},
		handleSizeChange() {},
		//分页
		handleCurrentChange(val) {
			this.pager.page = val.val;
			this.queryOnlineTable();
		},
		handleSizeChange1() {},
		//分页
		handleCurrentChange1(val) {
			this.pager1.page = val.val;
			this.queryOnlineTable();
		},
		handleClick(tab) {
			if (tab.index == 0) {
				this.queryOnlineTable();
			} else {
				this.querydeviceOffline();
			}
		},

		querydeviceOnline() {
			let nowtime = '';
			if (this.valueActive == '' || this.valueActive == null) {
				let tempTime = new Date(
					new Date().toLocaleDateString()
				).getTime();
				nowtime = Math.floor(tempTime - 3600 * 24 * 1000) / 1000;
			} else {
				nowtime = Math.floor(this.valueActive / 1000);
			}
			let paramActive = {};
			let dayList = [];
			let tempArrfirst = [];
			tempArrfirst[0] = nowtime;

			paramActive.dayList = tempArrfirst.concat(this.compareArr);
			paramActive.dayList = Array.from(new Set(paramActive.dayList));
			if (paramActive.dayList.length <= 1) {
				this.bin_show = true;
			} else {
				this.bin_show = false;
			}
			if (this.devicetype == '-1') {
				paramActive.type = '*';
			} else {
				paramActive.type = this.devicetype;
			}
			if (this.versointype == '全部版本') {
				paramActive.version = '*';
			} else {
				paramActive.version = this.versointype;
			}
			// (paramActive.version = this.versointype);
			device_online(paramActive)
				.then((res) => {
					if (res.status == 0) {
						if (paramActive.dayList.length <= 1) {
							res.data.totalList.forEach((item) => {
								if (item.type == '1') {
									this.bin_list[0].value = item.num;
								} else if (item.type == '2') {
									this.bin_list[1].value = item.num;
								} else if (item.type == '3') {
									this.bin_list[2].value = item.num;
								} else if (item.type == '4') {
									this.bin_list[3].value = item.num;
								} else if (item.type == '5') {
									this.bin_list[4].value = item.num;
								} else if (item.type == '6') {
									this.bin_list[5].value = item.num;
								}
							});
						}
						this.tableDatanew11 = [];
						let tempArr = res.data.dayList[0].devNumList;
						tempArr.forEach((element) => {
							element.percent = (element.percent * 100).toFixed(
								2
							);
						});
						let tempArrActive = [];
						tempArrActive = res.data.dayList;
						let nowArr = [];
						var list = {
							1: {
								timeStamp: 'OT<=1h',
								num: 0,
								percent: 0,
								label: labelOption,
								background: '#5DA7FD',
							},
							2: {
								timeStamp: '1h<OT<=5h',
								num: 0,
								percent: 0,
								label: labelOption,
								background: '#F86656',
							},
							3: {
								timeStamp: '5h<OT<=10h',
								num: 0,
								percent: 0,
								label: labelOption,
								background: '#F8B156',
							},
							4: {
								timeStamp: '10h<OT<=15h',
								num: 0,
								percent: 0,
								label: labelOption,
								background: '#F8E356',
							},
							5: {
								timeStamp: '15h<OT<=20h',
								num: 0,
								percent: 0,
								label: labelOption,
								background: '#56F89B',
							},
							6: {
								timeStamp: '20h<OT<=24h',
								num: 0,
								percent: 0,
								label: labelOption,
								background: '#56F8F6',
							},
							7: {
								timeStamp: 'OT=24h',
								num: 0,
								percent: 0,
								label: labelOption,
								background: '#56BDF8',
							},
						};
						for (var i = 0; i < tempArr.length; i++) {
							list[tempArr[i].type].num = tempArr[i].num;
							list[tempArr[i].type].percent = tempArr[i].percent;
						}
						for (let key in list) {
							this.tableDatanew11.push(list[key]);
						}
						var list1 = [];
						for (var j = 0; j < tempArrActive.length; j++) {
							list1[j] = [0, 0, 0, 0, 0, 0];
							for (
								var k = 0;
								k < tempArrActive[j].devNumList.length;
								k++
							) {
								list1[j][
									tempArrActive[j].devNumList[k].type - 1
								] = tempArrActive[j].devNumList[k].num;
							}
						}
						let echarsArr = [];
						for (var i = 0; i < list1.length; i++) {
							let obj = {
								type: 'bar',
								data: list1[i],
							};
							echarsArr.push(obj);
						}
						this.drawLine(echarsArr);
						this.drawLine_bin();
					}
				})
				.catch((error) => {});
		},
		querydeviceOffline() {
			let tempTime = new Date(new Date().toLocaleDateString()).getTime();
			let nowtime = Math.floor(tempTime - 3600 * 24 * 1000) / 1000;
			if (this.valueActive == '' || this.valueActive == null) {
				let tempTime = new Date(
					new Date().toLocaleDateString()
				).getTime();
				nowtime = Math.floor(tempTime - 3600 * 24 * 1000) / 1000;
			} else {
				if (this.versointime1 == 0) {
					nowtime = this.valueActive / 1000;
				} else if (this.versointime1 == 1) {
					nowtime = this.valueActive / 1000 + 3600 * 6;
				} else if (this.versointime1 == 2) {
					nowtime = this.valueActive / 1000 + 3600 * 12;
				} else if (this.versointime1 == 3) {
					nowtime = this.valueActive / 1000 + 3600 * 18;
				} else if (this.versointime1 == 4) {
					nowtime = this.valueActive / 1000 + 3600 * 24;
				}
			}
			let paramActive = {};
			let dayList = [];
			let arrActive = [];
			if (this.timeCompared == false) {
				arrActive = this.compareArr;
			} else {
				arrActive = this.timeComparedArr;
			}
			let tempArrfirst = [];
			tempArrfirst[0] = nowtime;

			paramActive.dayList = tempArrfirst.concat(arrActive);
			paramActive.dayList = Array.from(new Set(paramActive.dayList));

			if (this.devicetype == '-1') {
				paramActive.type = '*';
			} else {
				paramActive.type = this.devicetype;
			}

			if (this.versointype == '全部版本') {
				paramActive.version = '';
			} else {
				paramActive.version = this.versointype;
			}
			device_offline(paramActive)
				.then((res) => {
					if (res.status == 0) {
						this.tableDatanew22 = [];
						let tempArr = res.data.dayList[0].devNumList;
						tempArr.forEach((element) => {
							element.percent = (element.percent * 100).toFixed(
								2
							);
						});
						let tempArrActive = res.data.dayList;

						let nowArr = [];
						var list = {
							1: { timeStamp: '0次', num: 0, percent: 0 },
							2: { timeStamp: '1-3次', num: 0, percent: 0 },
							3: { timeStamp: '4-6次', num: 0, percent: 0 },
							4: { timeStamp: '7-10次', num: 0, percent: 0 },
							5: { timeStamp: '>10次', num: 0, percent: 0 },
						};
						for (var i = 0; i < tempArr.length; i++) {
							list[tempArr[i].type].num = tempArr[i].num;
							list[tempArr[i].type].percent = tempArr[i].percent;
						}
						for (let key in list) {
							this.tableDatanew22.push(list[key]);
						}
						var list1 = [];
						for (var j = 0; j < tempArrActive.length; j++) {
							list1[j] = [0, 0, 0, 0, 0];
							for (
								var k = 0;
								k < tempArrActive[j].devNumList.length;
								k++
							) {
								list1[j][
									tempArrActive[j].devNumList[k].type - 1
								] = tempArrActive[j].devNumList[k].num;
							}
						}
						let echarsArr = [];
						for (var i = 0; i < list1.length; i++) {
							let obj = {
								type: 'bar',
								data: list1[i],
							};
							echarsArr.push(obj);
						}
						this.drawLine1(echarsArr);
					}
				})
				.catch((error) => {});
		},
		// 表头样式设置
		headClass() {
			return 'text-align: center;background:#F3F6FB;height:58px;';
		},
		// 表格样式设置
		rowClass() {
			return 'text-align: center;';
		},

		drawLine(list) {
			let time_arr = [];
			list.forEach((item) => {
				time_arr.push(item.name);
			});
			let myChart = echarts.init(document.getElementById('myEchart')); //这里是为了获得容器所在位置
			window.onresize = myChart.resize();
			let options = {
				color: [
					'#5EA7FD',
					'#F86656',
					'#F8B256',
					'#F8E356',
					'#56F89C',
					'#56F8F6',
					'#57BDF8',
				],
				title: {
					text: '设备数（台）',
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow',
					},
				},
				legend: {
					data: time_arr,
				},
				grid: {
					left: '2%',
					right: '2%',
					bottom: '5%',
					containLabel: true,
				},
				xAxis: [
					{
						type: 'category',
						axisTick: { show: false },
						name: '日累计在线时长(OT)',
						data: [
							'OT<=1h',
							'1h<OT<=5h',
							'5h<OT<=10h',
							'10h<OT<=15h',
							'15h<OT<=20h',
							'20h<OT<24h',
							'OT=24h',
						],
					},
				],
				yAxis: [
					{
						type: 'value',
					},
				],
				barMaxWidth: 30,
				series: list,
				// color:"#0A7BFF"
			};
			myChart.clear();
			myChart.setOption(options, true);
			//myChart1.setOption(options);
		},
		drawLine_bin() {
			let _this = this;
			let myChart_bin = echarts.init(
				document.getElementById('myEchart_bin')
			); //这里是为了获得容器所在位置
			window.onresize = myChart_bin.resize();

			let option = {
				title: {
					text: '',
					subtext: '',
					left: 'center',
				},
				tooltip: {
					trigger: 'item',
					formatter: '{a} <br/>{b} : {c} ({d}%)',
				},
				series: [
					{
						name: '访问来源',
						type: 'pie',
						radius: '55%',
						center: ['50%', '60%'],
						data: _this.bin_list,
						// [
						// 	{ value: 335, name: 'OT<=1h' },
						// 	{ value: 310, name: '1h<OT<=5h' },
						// 	{ value: 234, name: '5h<OT<=10h' },
						// 	{ value: 135, name: '10h<OT<=15h' },
						// 	{ value: 1548, name: '15h<OT<=20h' },
						// 	{ value: 120, name: '20h<OT<=24h' },
						// ],
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)',
							},
						},
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)',
							},
							normal: {
								color: function (params) {
									//自定义颜色
									var colorList = [
										'#5EA7FD',
										'#F86656',
										'#F8B256',
										'#F8E356',
										'#56F89C',
										'#56F8F6',
										'#57BDF8',
									];
									return colorList[params.dataIndex];
								},
							},
						},
					},
				],
			};
			myChart_bin.clear();
			myChart_bin.setOption(option, true);
		},
		drawLine1(list) {
			let myChart = echarts.init(document.getElementById('myEchart1')); //这里是为了获得容器所在位置
			window.onresize = myChart.resize();

			var posList = [
				'left',
				'right',
				'top',
				'bottom',
				'inside',
				'insideTop',
				'insideLeft',
				'insideRight',
				'insideBottom',
				'insideTopLeft',
				'insideTopRight',
				'insideBottomLeft',
				'insideBottomRight',
			];

			app.configParameters = {
				rotate: {
					min: -90,
					max: 90,
				},
				align: {
					options: {
						left: 'left',
						center: 'center',
						right: 'right',
					},
				},
				verticalAlign: {
					options: {
						top: 'top',
						middle: 'middle',
						bottom: 'bottom',
					},
				},
				position: {
					options: echarts.util.reduce(
						posList,
						function (map, pos) {
							map[pos] = pos;
							return map;
						},
						{}
					),
				},
				distance: {
					min: 0,
					max: 100,
				},
			};

			app.config = {
				rotate: 90,
				align: 'left',
				verticalAlign: 'middle',
				position: 'insideBottom',
				distance: 15,
				onChange: function () {
					var labelOption = {
						normal: {
							rotate: app.config.rotate,
							align: app.config.align,
							verticalAlign: app.config.verticalAlign,
							position: app.config.position,
							distance: app.config.distance,
						},
					};
					myChart.setOption({
						series: [
							{
								label: labelOption,
							},
							{
								label: labelOption,
							},
							{
								label: labelOption,
							},
							{
								label: labelOption,
							},
						],
					});
				},
			};

			var labelOption = {
				show: true,
				position: app.config.position,
				distance: app.config.distance,
				align: app.config.align,
				verticalAlign: app.config.verticalAlign,
				rotate: app.config.rotate,
				formatter: '{c}  {name|{a}}',
				fontSize: 12,
				rich: {
					name: {
						textBorderColor: '#fff',
					},
				},
			};

			let options = {
				color: ['#003366', '#006699', '#4cabce', '#e5323e'],
				title: {
					text: '设备数（台）',
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow',
					},
				},
				legend: {
					data: ['Forest', 'Steppe', 'Desert', 'Wetland'],
				},
				grid: {
					left: '2%',
					right: '2%',
					bottom: '5%',
					containLabel: true,
				},

				xAxis: [
					{
						type: 'category',
						axisTick: { show: false },
						data: ['0次', '1-3次', '4-6次', '7-10次', '>10次'],
					},
				],
				yAxis: [
					{
						type: 'value',
					},
				],
				series: list,
			};
			myChart.clear();
			myChart.setOption(options, true);
			//myChart1.setOption(options);
		},
	},
	components: {
		tableBarActive2,
		pageNation,
	},
};
</script>

<style lang="less">
.myself-container {
	.devive_tab {
		width: 100%;
		height: auto;

		.switch_tab {
			right: 9%;
			height: 40px;
			float: right;
			// background: red;
		}

		.device_tab_on {
			margin-top: 35px;
		}
	}

	.device_form {
		&.device_form_active {
			position: relative;
		}

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

.user-item {
	border: 1px solid #ebeef5;
}
</style>
