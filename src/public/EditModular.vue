<template>
<!--这是 按钮弹层功能 组件
  按钮可以传入的值:
     type: 按钮类型, 不传值为primary
     content: 按钮中间的文字内容
     icon: 按钮图标, 不传值为编辑图标
     size: 按钮大小, 默认为小按钮
  弹层可以传入的值:
      title: 标题
      dialogVisible: 布尔值 控制弹层开关
  弹层触发的自定义事件:
      OpenHandler: 自定义事件, 打开弹层触发
      ConfirmStatus: 自定义事件, 点击确认按钮触发
      dialogChange: 自定义事件, 取消关闭弹层触发
-->
 <div style="display: inline-block; margin: 0 7px">
  <!--按钮-->
   <el-button :disabled="disabled" :type="type" :icon="icon" :size="size" @click="openAddDialog">{{ content }}</el-button>
  <!--弹层-->
   <el-dialog
     :title="title"
     :visible="dialogVisible"
     width="50%"
     @close="closeDialog">
     <slot name="formInput"></slot>
     <!--  取消 确认 按钮  -->
     <span slot="footer" class="dialog-footer">
    <el-button @click="closeDialog">取 消</el-button>
    <el-button type="primary" @click="confirmBtn">确 定</el-button>
  </span>
   </el-dialog>
 </div>
</template>
<script>
export default {
  name: 'EditModular',
  props: {
    size: {
      type: String,
      default: 'mini'
    },
    content: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: 'primary'
    },
    icon: {
      type: String,
      default: 'el-icon-edit'
    },
    title: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
    // 打开弹层
    openAddDialog () {
      this.dialogVisible = true
      this.$emit('OpenHandler')
    },
    // 关闭弹层
    closeDialog () {
      this.dialogVisible = false
      this.$emit('dialogChange')
    },
    confirmBtn () {
      this.dialogVisible = false
      this.$emit('ConfirmStatus')
    }
  }
}
</script>

<style scoped>

</style>
