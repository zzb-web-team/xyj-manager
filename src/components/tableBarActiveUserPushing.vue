<template>
	<el-table
		border
		:data="tableData"
		ref="table"
		style="width: 100%"
		@selection-change="handleSelectionChange"
		@sort-change="tableSortChange"
		@select="selectCheckBox"
		@select-all="selectAll"
		id="rebateSetTable"
		:cell-style="rowClass"
		:header-cell-style="headClass"
	>
		<el-table-column type="selection" width="55" v-if="clomnSelection">
		</el-table-column>
		<el-table-column
			v-for="(item, index) in rowHeader"
			:sortable="item.sortable"
			:key="index"
			:prop="item.prop"
			:label="item.label"
			:width="item.width"
		>
		</el-table-column>
		<el-table-column :label="tableOption.label" :width="tableOption.width">
			<template slot-scope="scope">
				<el-button @click="toDetails(scope.row)" size="mini"
					>详情</el-button
				>
				<el-button
					@click="disable(scope.row)"
					size="mini"
					v-if="scope.row.Notice_status == '待发送'"
					>撤回</el-button
				>
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
		reserveselection: {
			type: Boolean,
			default: () => {},
		},
	},
	data() {
		return {};
	},
	mounted: function () {},
	methods: {
		tableSortChange(val) {
			this.$emit('tableSortChange', val);
		},
		clearSelection() {
			this.$refs.table.clearSelection();
		},
		toggleRowSelection(a, b) {
			this.$refs.table.toggleRowSelection(a, b);
		},

		disable(val) {
			this.$emit('disable', val);
		},
		toDetails(val) {
			this.$emit('toDetails', val);
		},
		changePassword(val) {
			this.$emit('changePassword', val);
		},

		toDelete(val) {
			this.$emit('toDelete', val);
		},

		handleSelectionChange(val) {
			//  this.multipleSelection = val;
			this.$emit('handleSelectionChange', val);
		},
		selectCheckBox(a, b) {
			//  this.multipleSelection = val;
			this.$emit('selectCheckBox', {
				a,
				b,
			});
		},
		selectAll(a) {
			//  this.multipleSelection = val;
			this.$emit('selectAll', a);
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
