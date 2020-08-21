<template>
	<div>
		<!--  -->
		<div class="title_search">
			<el-row type="flex" :gutter="20">
				<el-col :span="3"
					><el-input
						v-model="input"
						placeholder="请输入设备SN"
						@keyup.enter.native="search_data"
					></el-input
				></el-col>
				<el-col :span="3">
					<!-- <span>地区：</span> -->
					<el-select
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
				<el-col :span="3">
					<!-- <span>ipv格式：</span> -->
					<el-select
						v-model="ipv_value"
						placeholder="请选择ipv格式"
						@change="search_data"
					>
						<el-option label="全部" value="-1"></el-option>
						<el-option label="ipv4" value="ipv4"></el-option>
						<el-option label="ipv6" value="ipv6"></el-option>
					</el-select>
				</el-col>
				<el-col :span="3">
					<!-- <span>设备品牌：</span> -->
					<el-select
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
				><el-col :span="3">
					<!-- <span>设备型号：</span> -->
					<el-select
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
				<el-col :span="3">
					<!-- <span>ROM版本：</span> -->
					<el-select
						v-model="rom_value"
						placeholder="请选择ROM版本"
						@change="search_data"
					>
						<el-option
							v-for="item in roms"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						>
						</el-option> </el-select
				></el-col>
				<el-button @click="search_data">搜索</el-button>
				<el-button @click="reset">重置</el-button>
			</el-row>
		</div>
		<!--  -->
		<div style="margin: 10px 0;">
			<el-button type="primary" @click="search_data">刷新设备</el-button>
		</div>
		<!--  -->
		<el-table :data="tableData" border style="width: 100%;">
			<el-table-column prop="ip" label="IP"> </el-table-column>
			<el-table-column prop="dev_sn" label="设备SN"> </el-table-column>
			<el-table-column prop="mac_addrs" label="MAC地址">
			</el-table-column>
			<el-table-column prop="cpu_id" label="CPU-ID"> </el-table-column>
			<el-table-column prop="dev_ver" label="版本"> </el-table-column>
			<el-table-column prop="on_duration" label="在线时长">
			</el-table-column>
			<el-table-column prop="online_time" label="在线时间">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button
						size="mini"
						type="primary"
						@click="handleDelete(scope.$index, scope.row)"
						>链接</el-button
					>
				</template>
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
				src="http://106.15.189.182:9999"
				frameborder="0"
				id="myiframe"
				style="width: 100%; height: 100%;"
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
import { upload } from '../../api/api';
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
				{
					value: '-1',
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
			tableData: [
				{
					ip: '192.10.365.20',
					dev_sn: 'SMEX5421ZLO8664',
					mac_addrs: '00:0c:29:b3:da:14',
					cpu_id: 'c2482cf62c5d915a',
					dev_ver: '1.0.5',
					online_time: '2020-08-21 15:22:12',
					on_duration: 18,
				},
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
			dialogVisible: false,
		};
	},
	filters: {
		TimeConversion(data) {
			if (data <= 0) return 0 + 'S';
			if (data < 60) {
				return data + 'S';
			} else if (data < 3600) {
				return parseInt(data / 60) + '分钟' + (data % 60) + 'S';
			}
		},
	},
	mounted() {
		this.get_data_list();
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
					console.log(res);
					this.tableData = res;
				})
				.catch((error) => {
					console.log(error);
				});
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
		},
		//操作
		handleDelete(index, row) {
			console.log(index, row);
			this.dialogVisible = true;
			this.$refs.el_set_cmd.$el.firstChild.style.height = '80%';
		},
		handleSizeChange() {},
		//翻页
		handleCurrentChange(val) {
			this.pager.page = val.val;
			this.get_data_list();
		},
	},
};
</script>

<style lang="less" scoped>
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
	margin: 10px 0;
	text-align: right;
}
</style>
