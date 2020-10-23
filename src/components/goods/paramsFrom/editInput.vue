<template>
  <el-form class="login_form" :model="DataList" :rules="manyRules" label-width="100px">
    <!--用户名-->
    <el-form-item prop="sortName" :label="label">
      <el-input  v-model="DataList.attr_name"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'editInput',
  props: {
    DataList: {
      type: Object,
      default () {
        return {
          attr_name: ''
        }
      }
    },
    label: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      manyRules: {
        sortName: [
          { required: true, message: '参数名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
