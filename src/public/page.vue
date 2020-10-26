<template>
<!--分页功能组件-->
<!--
  可传入的值:
    pagesize: 每页条数
    pagenum: 当前页数
    total: 总数
  可触发的事件:
    sizeChange: 修改每页显示数量触发
    changSize: 修改当前页数 触发
-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[1, 2, 4, 8]"
      :page-size="pagesize"
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
    },
    pagesize: {
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
      this.$emit('sizeChange', val)
    },
    handleCurrentChange (val) {
      this.$emit('changSize', val)
    }
  }
}
</script>

<style scoped>

</style>
