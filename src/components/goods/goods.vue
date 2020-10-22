<template>
  <div>
    <!--面包屑 使用封装组件breadcrumb-->
    <breadcrumb secondLevel="商品管理" thirdLevel="商品列表"></breadcrumb>
    <!--卡片区-->
    <el-card>
      <!--添加商品按钮-->
      <el-row :gutter="10">
        <el-col :span="8">
          <el-input placeholder="请输入内容"  class="input-with-select" v-model="queryInfo.query">
            <el-button slot="append" icon="el-icon-search" @click="getGoodList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加商品</el-button>
        </el-col>
      </el-row>
      <!--表格区-->
      <el-table :data="goodsList" border stripe>
        <!--索引-->
        <el-table-column type="index" align="center"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称"></el-table-column>
        <el-table-column prop="goods_price" label="商品价格(元)"></el-table-column>
        <el-table-column prop="goods_number" label="商品数量"></el-table-column>
        <el-table-column prop="upd_time" label="创建时间">
          <template slot-scope="scope">
            {{ scope.row.upd_time | getDates}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <!-- 编辑按钮, 使用封装组件deleteButton -->
            <edit-modular
              title="编辑商品"
            >
            </edit-modular>
            <!-- 删除按钮, 使用封装组件deleteButton -->
            <delete-button @confirmDeletion="removeGoods(scope.row.goods_id)"></delete-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <page
      :total="total"
      :pagesize="queryInfo.pagesize"
      :pagenum="queryInfo.pagenum"
      @sizeChange="sizeChangeHandler"
      @changSize="pageNumChange"
      >
      </page>
    </el-card>
  </div>
</template>

<script>
import { getGoods, deleteGoods } from '@/network/goods/goods'

export default {
  name: 'goods',
  data () {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      // 商品列表数据
      goodsList: [],
      // 商品总数
      total: null
    }
  },
  mounted () {
    this.getGoodList()
  },
  methods: {
    // 获取商品列表数据
    async getGoodList () {
      const { meta, data } = await getGoods(this.queryInfo)
      try {
        if (meta.status !== 200) {
          return this.$message.error('获取商品列表失败')
        }
        this.goodsList = data.goods
        this.total = data.total
      } catch (e) {
        this.$message.error(e)
      }
    },
    // 删除商品
    async removeGoods (val) {
      const { meta } = await deleteGoods(val)
      try {
        if (meta.status !== 200) {
          return this.$message.error('删除商品失败')
        }
        this.$message.success(`${meta.msg}`)
      } catch (e) {
        this.$message.error(e)
      }
    },
    // 修改每页数量
    sizeChangeHandler (val) {
      this.queryInfo.pagesize = val
      this.getGoodList()
    },
    // 当前第几页
    pageNumChange (val) {
      this.queryInfo.pagenum = val
      this.getGoodList()
    }
  },
  filters: {
    getDates (val) {
      const dt = new Date(val)
      const y = dt.getFullYear()
      const m = dt.getMonth() + 1
      const d = dt.getDate()

      const hh = dt.getHours()
      const mm = dt.getMinutes()
      const ss = dt.getSeconds()

      return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    }
  }
}
</script>

<style scoped>

</style>
