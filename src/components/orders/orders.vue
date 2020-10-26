<template>
  <div>
    <!--面包屑-->
    <breadcrumb secondLevel="订单管理" thirdLevel="订单列表"></breadcrumb>
    <!--卡片区-->
    <el-card>
      <!--搜索框-->
      <el-row :gutter="10">
        <el-col :span="8">
          <el-input placeholder="请输入内容"  class="input-with-select" v-model="queryInfo.query">
            <el-button slot="append" icon="el-icon-search" @click="getOrders"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!--表格区-->
      <el-table :data="ordersList" border stripe>
        <el-table-column type="index" align="center"></el-table-column>
        <el-table-column prop="order_number" label="订单编号"></el-table-column>
        <el-table-column prop="order_price" label="订单价格"></el-table-column>
        <!--是否付款-->
        <el-table-column label="是否付款">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.pay_status === 1" effect="dark" size="mini">已付款</el-tag>
            <el-tag v-else type="danger" effect="dark" size="mini">未付款</el-tag>
          </template>
        </el-table-column>
        <!--是否发货-->
        <el-table-column label="是否发货">
          <template slot-scope="scope">
            <span>{{ scope.row.is_send === 1 ? '是' : '否'  }}</span>
          </template>
        </el-table-column>
        <!--下单时间-->
        <el-table-column label="下单时间">
          <template slot-scope="scope">
            {{ scope.row.create_time | getDates }}
          </template>
        </el-table-column>
        <!--操作-->
        <el-table-column label="操作">
          <template>
            <!--编辑-->
            <edit-modular title="修改地址"
            >
              <template #formInput>
                <edit-orders-input></edit-orders-input>
              </template>
            </edit-modular>
            <el-button type="success" effect="dark" size="mini">
              <i class="el-icon-location"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <page
        :pagesize="queryInfo.pagesize"
        :pagenum="queryInfo.pagenum"
        :total="total"
        @sizeChange="changeSize"
        @changSize="pagenumChange"
      ></page>
    </el-card>
  </div>
</template>

<script>
import { getDataList } from '@/network/orders/orders'

import editOrdersInput from '@/components/orders/editOrdersInput'

export default {
  name: 'orders',
  components: {
    editOrdersInput
  },
  data () {
    return {
      // 订单请求参数
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 8
      },
      // 订单详情数据列表
      ordersList: [],
      // 订单总数
      total: null
    }
  },
  mounted () {
    this.getOrders()
  },
  methods: {
    // 获取订单
    async getOrders () {
      console.log(this.queryInfo)
      const { meta, data } = await getDataList(this.queryInfo)
      try {
        if (meta.status !== 200) {
          return this.$message.error(meta.msg)
        }
        this.ordersList = data.goods
        this.total = data.total
      } catch (e) {
        this.$message.error(e)
      }
    },
    // 每页条数
    changeSize (val) {
      console.log(val)
      this.queryInfo.pagesize = val
      this.getOrders()
    },
    // 当前页数
    pagenumChange (val) {
      console.log(val)
      this.queryInfo.pagenum = val
      this.getOrders()
    }
  }
}
</script>

<style scoped>

</style>
