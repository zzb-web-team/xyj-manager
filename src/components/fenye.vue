<template>
  <div>
    <el-pagination
    background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagesa"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "pagination",
  data() {
    return {
     
    };
  },
  props: {
    pagesa: {
      type: Number,
      default: 0
    },
    currentPage:{
      type:Number,
      default:1
    }
  },
  mounted() {},
  methods: {
    handleSizeChange(val) {
    //   console.log(`每页 ${val} 条`);
      this.$emit("handleSizeChange", val);
    },
    handleCurrentChange(val) {
    //   console.log(`当前页: ${val}`);
      this.$emit("handleCurrentChange", val);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>