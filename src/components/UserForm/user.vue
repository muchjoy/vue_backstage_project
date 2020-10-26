<template>
  <div>
    <!--面包屑-->
    <breadcrumb secondLevel="用户管理" thirdLevel="用户列表"></breadcrumb>
    <!--卡片-->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容"  class="input-with-select" v-model="queryInfo.query">
            <el-button slot="append" icon="el-icon-search" @click="getUsers"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!--表格-->
      <el-table :data="userList" border stripe >
        <el-table-column type="index" align="center"></el-table-column>
        <el-table-column prop="username" label="姓名" align="center"></el-table-column>
        <el-table-column prop="mobile" label="电话" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
        <el-table-column prop="role_name" label="角色" align="center"></el-table-column>
        <el-table-column label="当前用户状态">
          <template v-slot="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="getUserInfo(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="180px">
          <template v-slot="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click=editUserInfo(scope.row.id)></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUser(scope.row.id)"></el-button>
            <el-tooltip effect="dark" content="修改权限" placement="top">
              <el-button type="warning" icon="el-icon-setting" size="mini" @click="getPower(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!--  分页  -->
      <page
        :total="total"
        :pagenum="queryInfo.pagenum"
        :pagesize="queryInfo.pagesize"
        @sizeChange="sizeHandle"
        @changSize="handleSize"
      ></page>
    </el-card>

    <!-- 添加用户弹层  关闭dialogChange  确认-->
    <add-dialog
      :dialogVisible="dialogVisible"
      title="添加用户"
      @dialogChange="dialogHandler"
      @changeHandle="handleChange"
    >
      <template #inputForm>
        <form-input ref="inputForm"></form-input>
      </template>
    </add-dialog>

    <!--编辑弹层-->
    <add-dialog
      title="编辑用户"
      :dialogVisible="editDialog"
      @dialogChange="editDialogClose"
      @changeHandle="editFromSubmit"
    >
      <template #inputForm>
        <edit-from :editList="editList" ref="editInputForm"></edit-from>
      </template>
    </add-dialog>

    <!--修改权限弹框-->
    <add-dialog
      :dialogVisible="powerEditJudge"
      title="分配角色"
      @dialogChange="powerClose"
      @changeHandle="distributionUser"
    >
      <template #inputForm>
        <div>
          <p>当前的用户: {{ userInfo.username }}</p>
          <p>当前的权限: {{ userInfo.role_name }}</p>
          <p>分配新角色:
            <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in powerList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id">
            </el-option>
            </el-select>
          </p>
        </div>
      </template>
    </add-dialog>
  </div>
</template>

<script>
// 请求
import { getData, modifyUser, addUserInfo, editUser, editSubmit, deleteUser, getPower, powerEdit } from '@/network/home/users'

// 组件
import formInput from '@/components/UserForm/addUserForm'
import editFrom from '@/components/UserForm/editFrom'

export default {
  name: 'user',
  components: {
    formInput,
    editFrom
  },
  data () {
    return {
      queryInfo: {
        query: '',
        // 当前页数
        pagenum: 1,
        // 当前每页条数
        pagesize: 4
      },
      // 用户信息
      userList: [],
      // 用户个数
      total: 0,
      // 添加用户弹层关闭判断
      dialogVisible: false,
      // 收集添加用户表单信息
      userInfoList: {},
      // 编辑弹层关闭判断
      editDialog: false,
      // 修改权限弹层判断
      powerEditJudge: false,
      // 编辑请求数据列表
      editList: {},
      // 单层用户信息
      userInfo: {},
      // 权限列表
      powerList: [],
      value: null
    }
  },
  created () {
    this.getUsers()
  },
  methods: {
    // 获取用户信息
    async getUsers () {
      try {
        const res = await getData(this.queryInfo)
        if (res.meta.status !== 200) {
          return this.$message.error(`${res.meta.msg}`)
        }
        this.userList = res.data.users
        this.total = res.data.total
      } catch (e) {
        this.$message.error(e)
      }
    },
    // 修改用户信息
    async getUserInfo (val) {
      try {
        const res = await modifyUser(val.id, val.mg_state)
        if (res.meta.status !== 200) {
          this.$message.error(`${res.meta.msg}`)
        }
        this.$message.success('用户状态修改成功')
      } catch (e) {
        this.$message.error(e)
      }
    },
    // 添加用户
    async handleChange () {
      this.userInfoList = this.$refs.inputForm.addUserForm
      const res = await addUserInfo(this.userInfoList)
      try {
        if (res.meta.status !== 201) {
          return this.$message.error(`${res.meta.msg}`)
        }
        this.$message.success(`${res.meta.msg}`)
        // 重新请求 渲染
        await this.getUsers()
        // 关闭弹层
        this.dialogHandler()
      } catch (e) {
        this.$message.error(e)
      }
    },
    // 编辑用户信息获取
    async editUserInfo (val) {
      // 打开弹层
      this.editDialog = true
      // 发送请求
      const res = await editUser(val)
      try {
        if (res.meta.status !== 200) {
          return this.$message.error(`${res.meta.msg}`)
        }
        this.editList = res.data
      } catch (e) {
        this.$message.error(e)
      }
    },
    // 编辑用户信息确认
    async editFromSubmit () {
      const { id, email, mobile } = this.$refs.editInputForm.editList
      const res = await editSubmit(id, email, mobile)
      try {
        if (res.meta.status !== 200) {
          return this.$message.error(`${res.meta.msg}`)
        }
        this.$message.success(`${res.meta.msg}`)
        // 重新渲染页面
        await this.getUsers()
        // 关闭弹层
        this.editDialog = false
      } catch (e) {
        this.$message.error(e)
      }
    },
    // 根据id 删除用户
    async removeUser (val) {
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
      const res = await deleteUser(val)
      if (res.meta.status !== 200) {
        return this.$message.error(`${res.meta.msg}`)
      }
      this.$message.success(`${res.meta.msg}`)
      await this.getUsers()
      // 判断页面数量
    },
    // 获取角色列表
    async getPower (val) {
      this.userInfo = val
      // 打开弹层
      this.powerEditJudge = true
      // 获取角色列表
      const res = await getPower()
      try {
        if (res.meta.status !== 200) {
          return this.$message.error(`${res.meta.msg}`)
        }
        this.powerList = res.data
      } catch (e) {
        this.$message.error(e)
      }
    },
    // 点击重新分配角色
    async distributionUser () {
      if (!this.value) {
        return this.$message.error('请选择新的角色')
      }
      const { meta } = await powerEdit(this.userInfo.id, this.value)
      try {
        if (meta.status !== 200) {
          return this.$message.error(`${meta.msg}`)
        }
        this.$message.success(`${meta.msg}`)
        this.powerEditJudge = false
        this.value = ''
      } catch (e) {
        this.$message.error(e)
      }
    },
    // 每页个数
    sizeHandle (val) {
      this.queryInfo.pagesize = val
      this.getUsers()
    },
    // 第几页
    handleSize (val) {
      this.queryInfo.pagenum = val
      this.getUsers()
    },
    // 取消弹层添加用户
    dialogHandler () {
      this.dialogVisible = false
      this.$refs.inputForm.$children[0].resetFields()
    },
    // 编辑用户取消弹层
    editDialogClose () {
      this.editDialog = false
    },
    // 分配角色弹层取消
    powerClose () {
      this.powerEditJudge = false
    }
  }
}
</script>

<style scoped>

</style>
