<template>
  <!--表单-->
  <el-form class="login_form" :model="editList" :rules="userInfoRules" label-width="70px">
    <!--用户名-->
    <el-form-item prop="username" label="用户名">
      <el-input  v-model="editList.username" :disabled="isdisabled"></el-input>
    </el-form-item>
    <el-form-item prop="email" label="邮箱">
      <el-input  v-model="editList.email"></el-input>
    </el-form-item>
    <el-form-item prop="mobile" label="手机">
      <el-input  v-model="editList.mobile"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'editFrom',
  props: {
    editList: {
      type: Object,
      default () {
        return {
          username: '',
          email: '',
          mobile: ''
        }
      }
    }
  },
  data () {
    return {
      isdisabled: true,
      userInfoRules: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '长度 11 位 ', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
