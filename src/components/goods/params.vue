<template>
  <div>
    <!--面包屑-->
    <breadcrumb secondLevel="商品管理" thirdLevel="参数列表"></breadcrumb>
    <!--卡片区-->
    <el-card>
      <!--警告提示-->
      <el-alert
        title="注意：只允许为第三级分类设置相关参数！"
        type="warning"
        effect="dark"
        show-icon
        :closable="false"
      >
      </el-alert>
      <!--级联选择器-->
      <div class="cascader">
        <span>选择商品分类：</span>
        <el-cascader
          v-model="selectedKeys"
          :options="categoriesList"
          :props="options"
          @change="handleChange">
        </el-cascader>
      </div>
      <!--卡片化-->
      <el-tabs type="border-card">
        <!--动态参数-->
        <el-tab-pane label="动态参数">
          <el-button type="primary" disabled size="mini">添加参数</el-button>
        </el-tab-pane>
        <!--静态属性-->
        <el-tab-pane label="静态属性">
          <el-button type="primary" disabled size="mini">添加属性</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { getCategories } from '@/network/goods/params'

export default {
  name: 'params',
  data () {
    return {
      // 所有商品分类数据列表
      categoriesList: [],
      // 级联选择器配置对象
      options: {
        expandTrigger: 'hover',
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      // 级联选择器选中项绑定值
      selectedKeys: []
    }
  },
  mounted () {
    this.getCategoriesList()
  },
  methods: {
    // 获取商品分类列表
    async getCategoriesList () {
      const { data, meta } = await getCategories()
      try {
        if (meta.status !== 200) {
          return this.$message.error('获取商品分类失败')
        }
        this.categoriesList = data
      } catch (e) {
        this.$message.error(e)
      }
    },
    handleChange () {
      if (this.selectedKeys.length !== 3) {
        this.selectedKeys.length = 0
        return
      }
      console.log(this.selectedKeys)
    }
  }
}
</script>

<style scoped lang="less">
.cascader {
  margin: 20px 0;
}
</style>
