<template>
  <div>
    <!--面包屑-->
    <breadcrumb secondLevel="权限管理" thirdLevel="权限列表"></breadcrumb>
    <!--卡片-->
    <el-card>
      <!-- 表格区 -->
      <el-table
        :data="powerList"
        style="width: 100%"
        border
        stripe
      >
        <!--索引-->
        <el-table-column type="index" align="center"></el-table-column>
        <!--权限名称-->
        <el-table-column prop="authName" label="权限名称" align="center"></el-table-column>
        <!--路径-->
        <el-table-column prop="path" label="路径" align="center"></el-table-column>
        <!--权限等级-->
        <el-table-column label="权限等级" align="center">
          <template slot-scope="scope">
            <el-tag :type="getTagType(scope.row.level)">{{ tagList[scope.row.level]['text'] }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import { rightsList } from '@/network/power/rights'

export default {
  name: 'Power',
  data () {
    return {
      powerList: [],
      tagList: {
        0: {
          type: '',
          text: '一级'
        },
        1: {
          type: 'success',
          text: '二级'
        },
        2: {
          type: 'warning',
          text: '三级'
        }
      }
    }
  },
  mounted () {
    // 获取权限列表
    this.getList()
  },
  methods: {
    // 获取权限列表请求
    async getList () {
      const res = await rightsList()
      try {
        if (res.meta.status !== 200) {
          return this.$message.error(`${res.meta.msg}`)
        }
        // this.$message.success(`${res.meta.msg}`)
        this.powerList = res.data
      } catch (e) {
        this.$message.error(e)
      }
    },
    getTagType (val) {
      return this.tagList[val].type
    }
  }
}
</script>

<style scoped>

</style>
