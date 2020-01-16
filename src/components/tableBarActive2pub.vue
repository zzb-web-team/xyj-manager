<template>
<el-table border :data="tableData" ref="table" style="width: 100%" @selection-change="handleSelectionChange" @sort-change='tableSortChange' @select="selectCheckBox" @select-all="selectAll" id="rebateSetTable">
    <el-table-column type="selection" width="55" v-if="clomnSelection"> </el-table-column>
    <el-table-column v-for="(item,index) in rowHeader" :key="index" :sortable="item.sortable"  :prop="item.prop" :label="item.label" :width="item.width">
    </el-table-column>
       <el-table-column :label="tableOption.label" :width="tableOption.width" v-if="operatingStatus">
        <template slot-scope="scope">
         
            <div v-if="scope.row.push_type=='灰度发布'" style="color:#6699ff;cursor: pointer;" size="mini" v-for="(item,index) in tableOption.options" :key="index" :type="item.type" @click="handleButton(item.methods,scope.row)">
               发布清单
            </div>
              <div v-else>
               -
            </div>
        </template>
    </el-table-column>
</el-table>
</template>

<script>
export default {
    props: {
        rowHeader: {
            type: Array,
            default: () => {}
        },
        tableData: {
            type: Array,
            default: () => {}
        },
        tableOption: {
            type: Object,
            default: () => {}
        },
        clomnSelection: {
            type: String,
            default: () => {

            }
        },
        reserveselection: {
            type: Boolean,
            default: () => {

            }
        },
           operatingStatus:{
            type:Boolean,
            default:()=>{
                
            }
        }
    },
    data() {
        return {

        };
    },
    mounted: function () {

    },
    methods: {
          tableSortChange(val) {
            this.$emit('tableSortChange', val)
        },
        clearSelection() {
            this.$refs.table.clearSelection();
        },
        toggleRowSelection(a, b) {
            this.$refs.table.toggleRowSelection(a, b);
        },

        toOperating(val) {
            this.$emit('toOperating', val)
        },
        toChange(val) {
            this.$emit('toChange', val)
        },
        toRelease(val) {
            this.$emit('toRelease', val)
        },

        toSet(val) {
            this.$emit('toSet', val)
        },

        handleSelectionChange(val) {
            this.$emit('handleSelectionChange', val)
        },
         selectCheckBox(a,b) {
            this.$emit('selectCheckBox', {a,b})
        },
          selectAll(a) {
            this.$emit('selectAll', a)
        },
        handleButton(val,rows){
            this.$emit('handleButton',val,rows)
        }
    }
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
