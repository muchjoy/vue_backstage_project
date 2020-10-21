<template>
  <!--表单-->
  <el-form class="login_form" :model="powerInfo" :rules="userPowerRules" label-width="80px">
    <!--用户名-->
    <el-form-item prop="roleName" label="角色名称">
      <el-input  v-model="powerInfo.roleName"></el-input>
    </el-form-item>
    <el-form-item prop="roleDesc" label="角色描述">
      <el-input  v-model="powerInfo.roleDesc"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'editForm',
  props: {
    powerInfo: {
      type: Object,
      default () {
        return {
          roleName: '',
          roleDesc: ''
        }
      }
    }
  },
  data () {
    return {
      userPowerRules: {
        roleName: [
          { required: true, message: '角色名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '角色描述', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
