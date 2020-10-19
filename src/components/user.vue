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
          <template>
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            <el-tooltip effect="dark" content="修改权限" placement="top">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
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
  </div>
</template>

<script>
import { getData, modifyUser, addUserInfo } from '@/network/home/users'

import formInput from '@/views/addUserForm'

export default {
  name: 'user',
  components: {
    formInput
  },
  data () {
    return {
      queryInfo: {
        query: '',
        // 当前页数
        pagenum: 1,
        // 当前每页条数
        pagesize: 1
      },
      userList: [],
      total: 0,
      dialogVisible: false
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
        console.log(res)
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
      const res = await addUserInfo()
      console.log(res)
    },
    sizeHandle (val) {
      console.log(val)
      this.queryInfo.pagesize = val
      this.getUsers()
    },
    handleSize (val) {
      this.queryInfo.pagenum = val
      this.getUsers()
    },
    // 取消弹层
    dialogHandler () {
      this.dialogVisible = false
      console.log(this.$refs)
    }
  },
  watch: {
    queryInfo: {
      handler (val) {
        console.log(val)
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>
