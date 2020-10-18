<template>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[1, 2, 4, 8]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
</template>

<script>
export default {
  name: 'page',
  props: {
    total: {
      type: Number,
      default: 0
    },
    pagenum: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      currentPage: 0
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条` + '每页显示数量')
      this.$emit('sizeChange', val)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}` + '当前第几页')
      this.$emit('changSize', val)
    }
  }
}
</script>

<style scoped>

</style>
