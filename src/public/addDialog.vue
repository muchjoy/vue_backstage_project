<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="30%"
    @close="closeDialog">
    <slot name="inputForm"></slot>
    <!--  取消 确认 按钮  -->
    <span slot="footer" class="dialog-footer">
    <el-button @click="closeDialog">取 消</el-button>
    <el-button type="primary" @click="changeClick">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'addDialog',
  props: {
    title: {
      type: String
    },
    dialogVisible: {
      type: Boolean,
      default: false

    }
  },
  methods: {
    // 取消弹层
    closeDialog () {
      this.$emit('dialogChange')
    },
    // 确认
    changeClick (val) {
      this.$emit('changeHandle')
    }

  }
}
</script>

<style scoped>

</style>
