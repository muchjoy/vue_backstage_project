<template>
  <div>
    <!--面包屑-->
    <breadcrumb secondLevel="用户管理" thirdLevel="用户列表"></breadcrumb>
    <!--卡片-->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容"  class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <!--表格-->
      <el-table :data="userList" border stripe>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column prop="mg_state" label="当前用户状态"></el-table-column>
      </el-table>
      <page
        :total="total"
        :pagenum="pagenum"
        @sizeChange="sizeHandle"
        @changSize="handleSize"
      ></page>
    </el-card>
  </div>
</template>

<script>
import { getData } from '@/network/home/users'

export default {
  name: 'user',
  data () {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 1
      },
      userList: [],
      total: 0,
      pagenum: 0
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
        this.pagenum = res.data.pagenum
      } catch (e) {
        this.$message.error(e)
      }
    },
    sizeHandle (val) {
      console.log(val)
      this.queryInfo.pagesize = val
      this.getUsers()
    },
    handleSize (val) {
      this.queryInfo.pagenum = val
      this.getUsers()
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
