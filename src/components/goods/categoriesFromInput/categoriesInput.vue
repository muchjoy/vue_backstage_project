<template>
  <!--表单-->
  <el-form class="login_form" :model="sortInfo" :rules="sortRules" label-width="80px">
    <!--用户名-->
    <el-form-item prop="sortName" label="分类名称">
      <el-input  v-model="sortInfo.cat_name"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'categoriesInput',
  props: {
    sortInfo: {
      type: Object,
      default () {
        return {
          cat_name: ''
        }
      }
    }
  },
  data () {
    return {
      sortRules: {
        sortName: [
          { required: true, message: '分类名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
