<template>
	<el-table
		:data="tableData"
		style="width: 100%"
		@selection-change="handleSelectionChange"
		border
		:cell-style="rowClass"
		:header-cell-style="headClass"
	>
		<el-table-column type="selection" width="55" v-if="clomnSelection">
		</el-table-column>
		<el-table-column
			v-for="(item, index) in rowHeader"
			:key="index"
			:prop="item.prop"
			:label="item.label"
			:width="item.width"
		>
		</el-table-column>
		<el-table-column
			:label="tableOption.label"
			:width="tableOption.width"
			v-if="operatingStatus"
		>
			<template slot-scope="scope">
				<a
					style="color: #6699ff; cursor: pointer"
					size="mini"
					v-for="(item, index) in tableOption.options"
					:key="index"
					:type="item.type"
					@click="handleButton(item.methods, scope.row)"
				>
					{{ item.label }}
				</a>
			</template>
		</el-table-column>
	</el-table>
</template>

<script>
export default {
	props: {
		rowHeader: {
			type: Array,
			default: () => {},
		},
		tableData: {
			type: Array,
			default: () => {},
		},
		tableOption: {
			type: Object,
			default: () => {},
		},
		clomnSelection: {
			type: String,
			default: () => {},
		},
		operatingStatus: {
			type: String,
			default: () => {},
		},
	},
	data() {
		return {};
	},
	mounted: function () {},
	methods: {
		formatter: function () {
			let ar = '1';
			return ar;
		},
		handleButton(methods, row) {
			this.$emit('handleButton', {
				methods: methods,
				row: row,
			});
		},
		handleSelectionChange(val) {
			this.multipleSelection = val;
			this.$emit('handleSelectionChange', val);
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
.el-table {
	font-size: 12px;
}
.el-table th.gutter {
	display: table-cell !important;
}
</style>
