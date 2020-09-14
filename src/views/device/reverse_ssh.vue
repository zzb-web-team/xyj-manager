<template>
	<div>
		<!--  -->
		<div class="title_search">
			<el-row type="flex" :gutter="20">
				<el-col :span="3"
					><el-input
						size="small"
						v-model="input"
						placeholder="请输入设备SN"
						@keyup.enter.native="search_data"
					></el-input
				></el-col>
				<el-col :span="12">
					<el-row type="flex" :gutter="20" justify="space-between">
						<el-col :span="5">
							<!-- <span>地区：</span> -->
							<el-select
								size="small"
								v-model="area_value"
								placeholder="请选择地区"
								@change="search_data"
							>
								<el-option label="全部" value="-1"></el-option>
								<el-option
									v-for="item in options"
									:key="item.id"
									:label="item.label"
									:value="item.label"
								>
								</el-option> </el-select
						></el-col>
						<el-col :span="5">
							<!-- <span>ipv格式：</span> -->
							<el-select
								size="small"
								v-model="ipv_value"
								placeholder="请选择ipv格式"
								@change="search_data"
							>
								<el-option label="全部" value="-1"></el-option>
								<el-option
									label="ipv4"
									value="ipv4"
								></el-option>
								<el-option
									label="ipv6"
									value="ipv6"
								></el-option>
							</el-select>
						</el-col>
						<el-col :span="5">
							<!-- <span>设备品牌：</span> -->
							<el-select
								size="small"
								v-model="brand_value"
								placeholder="请选择设备品牌"
								@change="search_devtype"
							>
								<el-option label="全部" value="-1"></el-option>
								<el-option
									v-for="(item, idnex) in eqp_brds"
									:key="item.name"
									:label="item.name"
									:value="item.name"
								>
								</el-option> </el-select></el-col
						><el-col :span="5">
							<!-- <span>设备型号：</span> -->
							<el-select
								size="small"
								v-model="devtype_value"
								placeholder="请选择设备型号"
								@change="search_data"
							>
								<el-option label="全部" value="-1"></el-option>
								<el-option
									v-for="item in dev_types"
									:key="item"
									:label="item"
									:value="item"
								>
								</el-option> </el-select
						></el-col>
						<el-col :span="5">
							<!-- <span>ROM版本：</span> -->
							<el-select
								size="small"
								v-model="rom_value"
								placeholder="请选择ROM版本"
								@change="search_data"
							>
								<el-option label="全部" value="-1"></el-option>
								<el-option
									v-for="item in roms"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								>
								</el-option> </el-select
						></el-col>
					</el-row>
				</el-col>
				<el-button @click="search_data" size="small" type="primary"
					>确定</el-button
				>
				<el-button @click="reset" size="small"
					>重置</el-button
				>
			</el-row>
		</div>
		<!--  -->
		<div style="margin: 25px 0">
			<el-button type="primary" @click="search_data">刷新设备</el-button>
		</div>
		<!--  -->
		<el-table
			:data="tableData"
			border
			style="width: 100%"
			:cell-style="rowClass"
			:header-cell-style="headClass"
		>
			<el-table-column prop="dev_ip" label="IP"></el-table-column>
			<el-table-column prop="dev_sn" label="设备SN"> </el-table-column>
			<el-table-column prop="mac_addrs" label="MAC地址"></el-table-column>
			<el-table-column prop="cpu_id" label="CPU-ID"></el-table-column>
			<el-table-column prop="dev_ver" label="版本"></el-table-column>
			<el-table-column prop="region" label="地区"
				><template slot-scope="scope">{{
					scope.row.region ? scope.row.region : '--'
				}}</template></el-table-column
			>
			<el-table-column prop="ip_type" label="IPV格式"
				><template slot-scope="scope">{{
					scope.row.ip_type ? scope.row.ip_type : '--'
				}}</template></el-table-column
			>
			<el-table-column prop="dev_brand" label="设备品牌"
				><template slot-scope="scope">{{
					scope.row.dev_brand ? scope.row.dev_brand : '--'
				}}</template></el-table-column
			>
			<el-table-column prop="dev_model" label="设备型号"
				><template slot-scope="scope">{{
					scope.row.dev_model ? scope.row.dev_model : '--'
				}}</template></el-table-column
			>
			<el-table-column label="操作">
				<template slot-scope="scope"
					><el-button
						size="mini"
						type="primary"
						@click="handleDelete(scope.$index, scope.row)"
						>链接</el-button
					></template
				>
			</el-table-column>
		</el-table>
		<!--  -->
		<div class="con_Pagination">
			<pageNation
				:pager="pager"
				@handleSizeChange="handleSizeChange"
				@handleCurrentChange="handleCurrentChange"
			></pageNation>
		</div>
		<!--  -->
		<el-dialog
			title=""
			:visible.sync="dialogVisible"
			ref="el_set_cmd"
			width="80%"
			helght="80%"
			class="ssh_con_dialog"
		>
			<!-- <span>这是一段信息</span> -->
			<iframe
				:src="cmdsrc"
				frameborder="0"
				id="myiframe"
				style="width: 100%; height: 100%"
			></iframe>
			<!-- <span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false"
					>确 定</el-button
				>
			</span> -->
		</el-dialog>
	</div>
</template>

<script>
import pageNation from '../../components/pageNation';
import { upload, publishlistRom } from '../../api/api';
import common from '../../common/js/util.js';
export default {
	data() {
		return {
			eqp_brds: [
				{ name: 'linux', childen: ['PCGRAPE'] },
				{ name: 'grapefruit', childen: ['RK33XX'] },
				{ name: '迅雷', childen: ['AMS805W'] },
				{ name: '小米', childen: ['AMS905M4C', 'AMS905M4'] },
				{ name: '创维', childen: ['AMS805QP1'] },
				{ name: '斐讯', childen: ['AMS905N1'] },
				{ name: '腾讯', childen: ['AMS905JG1S'] },
			],
			dev_types: [],
			options: [
				{ id: '44', label: '广东' },
				{ id: '11', label: '北京' },
				{ id: '33', label: '浙江' },
				{ id: '35', label: '福建' },
				{ id: '42', label: '湖北' },
				{ id: '31', label: '上海' },
				{ id: '32', label: '江苏' },
				{ id: '12', label: '天津' },
				{ id: '13', label: '河北' },
				{ id: '14', label: '山西' },
				{ id: '15', label: '内蒙古' },
				{ id: '21', label: '辽宁' },
				{ id: '22', label: '吉林' },
				{ id: '23', label: '黑龙江' },
				{ id: '34', label: '安徽' },
				{ id: '36', label: '江西' },
				{ id: '37', label: '山东' },
				{ id: '41', label: '河南' },
				{ id: '43', label: '湖南' },
				{ id: '45', label: '广西' },
				{ id: '46', label: '海南' },
				{ id: '50', label: '重庆' },
				{ id: '51', label: '四川' },
				{ id: '52', label: '贵州' },
				{ id: '53', label: '云南' },
				{ id: '54', label: '西藏' },
				{ id: '61', label: '陕西' },
				{ id: '62', label: '甘肃' },
				{ id: '63', label: '青海' },
				{ id: '64', label: '宁夏' },
				{ id: '65', label: '新疆' },
				{ id: '71', label: '台湾' },
				{ id: '81', label: '香港' },
				{ id: '82', label: '澳门' },
			],
			roms: [
				// {
				// 	value: '1.2.21',
				// 	label: '1.2.21',
				// },
				// {
				// 	value: '1.2.20',
				// 	label: '1.2.20',
				// },
				// {
				// 	value: '1.2.19',
				// 	label: '1.2.19',
				// },
				// {
				// 	value: '1.2.18',
				// 	label: '1.2.18',
				// },
				// {
				// 	value: '1.2.17',
				// 	label: '1.2.17',
				// },
				// {
				// 	value: '1.2.16',
				// 	label: '1.2.16',
				// },
				// {
				// 	value: '1.2.11',
				// 	label: '1.2.11',
				// },
				// {
				// 	value: '1.2.10',
				// 	label: '1.2.10',
				// },
				// {
				// 	value: '1.1.9',
				// 	label: '1.1.9',
				// },
				// {
				// 	value: '1.0.56',
				// 	label: '1.0.56',
				// },
				// {
				// 	value: '1.0.5',
				// 	label: '1.0.5',
				// },
				// {
				// 	value: '1.0.3',
				// 	label: '1.0.3',
				// },
				// {
				// 	value: '1.0.1',
				// 	label: '1.0.1',
				// },
			],
			tableData: [
				// {
				// 	dev_ip: '192.10.365.20',
				// 	dev_sn: 'SMEX2020RTU1177',
				// 	mac_addrs: '00:0c:29:b3:da:14',
				// 	cpu_id: 'c2482cf62c5d915a',
				// 	dev_ver: '1.0.5',
				// 	online_time: '2020-08-21 15:22:12',
				// 	on_duration: 1561,
				// },
			],
			input: '',
			area_value: '',
			ipv_value: '',
			brand_value: '',
			devtype_value: '',
			rom_value: '',
			pager: {
				count: 0,
				page: 1,
				rows: 100,
			},
			page: 0,
			dialogVisible: false,
			smdsrc: '',
		};
	},
	filters: {
		formatDevTime: function (b) {
			let e = new Date(b * 1000);
			let year = e.getFullYear();
			let month = e.getMonth() + 1;
			let day = e.getDate();
			let hh = e.getHours() < 10 ? '0' + e.getHours() : e.getHours();
			let mm =
				e.getMinutes() < 10 ? '0' + e.getMinutes() : e.getMinutes();
			let ss =
				e.getSeconds() < 10 ? '0' + e.getSeconds() : e.getSeconds();
			let endTime = `${year}-${month}-${day} ${hh}:${mm}:${ss}`;
			return endTime;
		},
		getDuration(value) {
			if (value <= 0) return 0 + '秒';
			let theTime = parseInt(value); // 需要转换的时间秒
			let theTime1 = 0; // 分
			let theTime2 = 0; // 小时
			let theTime3 = 0; // 天
			if (theTime > 60) {
				theTime1 = parseInt(theTime / 60);
				theTime = parseInt(theTime % 60);
				if (theTime1 > 60) {
					theTime2 = parseInt(theTime1 / 60);
					theTime1 = parseInt(theTime1 % 60);
					if (theTime2 > 24) {
						//大于24小时
						theTime3 = parseInt(theTime2 / 24);
						theTime2 = parseInt(theTime2 % 24);
					}
				}
			}
			let result = '';
			if (theTime > 0) {
				result = '' + parseInt(theTime) + '秒';
			}
			if (theTime1 > 0) {
				result = '' + parseInt(theTime1) + '分钟' + result;
			}
			if (theTime2 > 0) {
				result = '' + parseInt(theTime2) + '小时' + result;
			}
			if (theTime3 > 0) {
				result = '' + parseInt(theTime3) + '天' + result;
			}
			return result;
		},
	},
	mounted() {
		this.get_data_list();
		this.get_rom_list();
	},
	components: { pageNation },
	methods: {
		get_data_list() {
			let parame = new Object();
			parame.dev_sn = this.input != '' ? this.input : -1;
			parame.region = this.area_value != '' ? this.area_value : -1;
			parame.ip_type = this.ipv_value != '' ? this.ipv_value : -1;
			parame.dev_brand = this.brand_value != '' ? this.brand_value : -1;
			parame.dev_model =
				this.devtype_value != '' ? this.devtype_value : -1;
			parame.rom_ver = this.rom_value != '' ? this.rom_value : -1;
			parame.page = this.pager.page - 1;
			upload(parame)
				.then((res) => {
					if (res.status == 0) {
						this.tableData = res.data;
						this.pager.count = res.total_item;
					} else {
						this.$message.errro(res.message);
					}
				})
				.catch((error) => {});
		},
		//获取rom版本
		get_rom_list() {
			let params = new Object();
			params.dev_type = 0;
			if (this.brand_value == '' || this.brand_value == '-1') {
				return false;
			} else if (this.brand_value == 'linux') {
				params.dev_type = 88;
			} else if (this.brand_value == 'grapefruit') {
				params.dev_type = 0;
			} else if (this.brand_value == '迅雷') {
				params.dev_type = 1;
			} else if (this.brand_value == '小米') {
				params.dev_type = 2;
			} else if (this.brand_value == '创维') {
				return false;
			} else if (this.brand_value == '斐讯') {
				return false;
			} else {
				return false;
			}
			params.page = this.page;
			if (this.page == 0) {
				this.roms = [];
			}
			publishlistRom(params)
				.then((res) => {
					if (res.status == 0) {
						res.result.cols.forEach((item, index) => {
							let obj = {};
							obj.value = item.rom_version;
							obj.label = item.rom_version;
							this.roms.push(obj);
						});
						if (res.result.les_count != 0) {
							this.page++;
							this.get_rom_list();
						} else {
							return false;
						}
					}
				})
				.catch((error) => {});
		},
		search_data() {
			this.pager.page = 1;
			this.get_data_list();
		},
		reset() {
			this.input = '';
			this.area_value = '';
			this.ipv_value = '';
			this.brand_value = '';
			this.devtype_value = '';
			this.rom_value = '';
			this.pager.page = 1;
			this.get_data_list();
		},
		search_devtype() {
			this.pager.page = 1;
			this.devtype_value = '';
			var indexOf_child = (this.eqp_brds || []).findIndex(
				(item) => item.name == this.brand_value
			);
			if (indexOf_child == -1) {
				this.dev_types = [];
			} else {
				this.dev_types = this.eqp_brds[indexOf_child].childen;
			}
			this.get_data_list();
			this.get_rom_list();
		},
		//操作
		handleDelete(index, row) {
			this.dialogVisible = true;
			this.$refs.el_set_cmd.$el.firstChild.style.height = '80%';
			this.cmdsrc =
				'http://106.15.189.182:9999' + '?dev_sn=' + row.dev_sn;
		},
		handleSizeChange() {},
		//翻页
		handleCurrentChange(val) {
			this.pager.page = val.val;
			this.get_data_list();
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

<style lang="less">
.ssh_con_dialog .el-dialog {
	height: 80% !important;
	overflow: auto;
}
.ssh_con_dialog .el-dialog .el-dialog__body {
	height: 85% !important;
}
.title_search {
	margin-top: 20px;
}

.con_Pagination {
	margin: 20px 0;
	text-align: right;
}
.terminal {
	height: 100%;
}
</style>
