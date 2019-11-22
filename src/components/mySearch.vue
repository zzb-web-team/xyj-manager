<template>

</template>

<script>
export default {
    props:{
        searchText:{
            type:String,
            default:()=>{}
        },
        placeholder:{
            type:String,
            default:()=>{

            }
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
   

</style>
