<template>
  <!--表单-->
  <el-form class="login_form" :model="addUserForm" :rules="userInfoRules" label-width="70px">
    <!--用户名-->
    <el-form-item prop="username" label="用户名">
      <el-input  v-model="addUserForm.username"></el-input>
    </el-form-item>
    <el-form-item prop="password" label="密码">
      <el-input  v-model="addUserForm.password"></el-input>
    </el-form-item>
    <el-form-item prop="email" label="邮箱">
      <el-input  v-model="addUserForm.email"></el-input>
    </el-form-item>
    <el-form-item prop="mobile" label="手机">
      <el-input  v-model="addUserForm.mobile"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'formInput',
  data () {
    return {
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      userInfoRules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
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
