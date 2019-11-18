<template>
<div class="search-con">
    <i class="el-icon-search" @click="searchInfo" style="color:#606266"></i>
    <el-input class="search-input" v-model="searchText" placeholder="账号，用户名"></el-input>
</div>
</template>

<script>
export default {
    props:{
        searchText:{
            type:String,
            default:()=>{}
        }
    },
    methods:{
          searchInfo() {
            this.$emit('searchInfo',)
        },
    }
}
</script>

<style lang="less">
   .search-con{
        width: 250px;
        height: 40px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-bottom: 1px solid #999999;
        i{

        }
           .search-input{
           .el-input__inner{
               border: none;
               background: none;
           }
        }

    }

</style>
