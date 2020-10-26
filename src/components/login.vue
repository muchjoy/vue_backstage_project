<template>
  <div class="login">
    <div class="login_box">
      <div class="avatar_box">
        <img src="~@/assets/img.jpg" alt="">
      </div>
      <el-form ref="loginFormRef" class="login_form" :model="form" :rules="loginFormRules">
        <!--用户名-->
        <el-form-item prop="username">
          <el-input class="iptDiv" prefix-icon="iconfont icon-yonghuming" v-model="form.username"></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password">
          <el-input class="iptDiv" type="password" prefix-icon="iconfont icon-mima" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="toLogin">登陆</el-button>
          <el-button type="info" @click="resetBtn">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { Login } from '@/network/login/login'

export default {
  name: 'login',
  data () {
    return {
      form: {
        username: 'admin',
        password: '123456'
      },
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    toLogin () {
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) {
          return
        }
        this.toLogon()
      })
    },
    // 发送请求
    async toLogon () {
      const { meta, data } = await Login(this.form.username, this.form.password)
      try {
        // 先判断是否登陆成功
        if (meta.status !== 200) {
          // 登陆失败 错误提示
          return this.$message.error(meta.msg)
        }
        // 成功 提示
        this.$message.success(meta.msg)
        // 储存token
        window.sessionStorage.setItem('token', data.token)
        // 跳转路由
        await this.$router.push('/home')
      } catch (e) {
        this.$message.error(e)
      }
    },
    resetBtn () {
      // 重置
      this.$refs.loginFormRef.resetFields()
    }
  }
}
</script>

<style scoped lang="less">
  .login {
    width: 100%;
    height: 100%;
    // background-image: url("../assets/t_bg.png");
    background: linear-gradient(to bottom right, #1641AA, #E19BB3) no-repeat 0 0 / cover;
    // background-size: cover;
    // background-color: #2b4b6b;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login_box {
    width: 450px;
    height: 300px;
    //background-color: #ffffff;
    background-color: rgba(0,0,0,.3);
    //opacity: 0.5;
    border-radius: 3px;
    .avatar_box {
      width: 130px;
      height: 130px;
      background-color: transparent;
      border-radius: 50%;
      padding: 10px;
      border: 1px solid #ffffff;
      position: absolute;
      left: 50%;
      transform: translate(-50%,-50%);
      box-shadow: 0 0 20px rgba(0,0,0,.4);
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
  .login_form {
    padding: 30px;
    margin-top: 70px;
  }
  //\deep\ .el-input__inner {
  //  background-color: transparent !important;
  //}
  .btns {
    display: flex;
    justify-content: flex-end;
  }
</style>
