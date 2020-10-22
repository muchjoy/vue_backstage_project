<template>
<!--删除按钮和弹出提示框  功能组件-->
<!-- confirmDeletion 点击确定触发的自定义事件
     content : 按钮显示的文字内容
-->
  <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeBtn">{{ content }}</el-button>
</template>

<script>
export default {
  name: 'deleteButton',
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  methods: {
    async removeBtn () {
      const confirmUser = await this.$confirm(
        '此操作将永久删除该文件, 是否继续?', '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      if (confirmUser !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      // 点击确认后 触发自定义事件
      this.$emit('confirmDeletion')
    }
  }
}
</script>

<style scoped>

</style>
