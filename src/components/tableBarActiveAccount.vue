<template>
<el-table border :data="tableData" ref="table" style="width: 100%" @selection-change="handleSelectionChange" @sort-change='tableSortChange' @select="selectCheckBox" @select-all="selectAll" id="rebateSetTable">
    <el-table-column type="selection" width="55" v-if="clomnSelection" :selectable="checkboxT"> </el-table-column>
    <el-table-column v-for="(item,index) in rowHeader" :sortable="item.sortable" :key="index" :prop="item.prop" :label="item.label" :width="item.width">
    </el-table-column>
    <el-table-column :label="tableOption.label" :width="tableOption.width">
        <template slot-scope="scope">
            <el-button @click="toDetail(scope.row)" size="mini">详情</el-button>
            <el-button @click="toChange(scope.row)" size="mini">修改</el-button>
            <el-button @click="changePassword(scope.row)" size="mini">重置密码</el-button>
            <el-button @click="disable(scope.row)" :disabled="scope.row.id == uid || scope.row.id == 6" size="mini">{{ scope.row.status=='禁用'?'启用':'禁用'}}</el-button>
            <el-button @click="toDelete(scope.row)" :disabled="scope.row.id == uid || scope.row.id == 6" size="mini" >删除</el-button>

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
    },
    data() {
        return {
            uid:""

        };
    },
    mounted: function () {
         let tempInfo =JSON.parse(this.get('userInfo'))
            this.uid =tempInfo.id;


    },
    
    methods: {
          checkboxT(row, rowIndex) {
            // console.log(row)
      if (row.id == this.uid || row.id == 6) {
        //if(row.lie =='1'){
        return false; //禁用
      } else {
        return true; //不禁用
      }
    },
          get: function (name) {
    var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;

},
           tableSortChange(val) {
            this.$emit('tableSortChange', val)
        },
       
        clearSelection() {
            this.$refs.table.clearSelection();
        },
        toggleRowSelection(a, b) {
            this.$refs.table.toggleRowSelection(a, b);
        },
         toDetail(val) {
            this.$emit('toDetail', val)
        },

        disable(val) {
            this.$emit('disable', val)
        },
        toChange(val) {
            this.$emit('toChange', val)
        },
        changePassword(val) {
            this.$emit('changePassword', val)
        },

        toDelete(val) {
            this.$emit('toDelete', val)
        },

        handleSelectionChange(val) {
            //  this.multipleSelection = val;
            this.$emit('handleSelectionChange', val)
        },
        selectCheckBox(a, b) {
            //  this.multipleSelection = val;
            this.$emit('selectCheckBox', {
                a,
                b
            })
        },
        selectAll(a) {
            //  this.multipleSelection = val;
            this.$emit('selectAll', a)
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
