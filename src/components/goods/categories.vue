<template>
  <div>
    <!--面包屑-->
    <breadcrumb secondLevel="商品管理" thirdLevel="商品分类"></breadcrumb>
    <!--卡片区-->
    <el-card>
      <!--添加分类-->
      <edit-modular
        content="添加分类"
        icon=""
        size=""
        title="添加分类"
        class="btnEdit"
        @OpenHandler="openChange"
        @ConfirmStatus="confirmAddSort"
      >
        <template #formInput>
          <add-sort-from :sortList="parentList" ref="addInput"></add-sort-from>
        </template>
      </edit-modular>
      <!--树形表格-->
      <zk-table
        index-text="#"
        :data="categoriesList"
        border
        show-index
        :show-row-hover="false"
        :expand-type="false"
        :selection-type="false"
        :columns="columns"
      >
        <!--是否有效-->
        <template slot="isOk" slot-scope="scope">
          <i class="el-icon-success" v-if="scope.row.cat_deleted === false" style="color: lightgreen"></i>
          <i class="el-icon-error" v-else style="color: red"></i>
        </template>
        <!--排序-->
        <template slot="sort" slot-scope="scope">
          <el-tag effect="dark" :type="getTagType(scope.row.cat_level)">{{ tagList[scope.row.cat_level]['text'] }}</el-tag>
        </template>
        <!--操作-->
        <template slot="operation" slot-scope="scope">
          <!--编辑 使用了 editModular 封装组件-->
          <edit-modular
            content="编辑"
            title="修改分类"
            @ConfirmStatus="confirmHandler(scope.row)"
          >
          <!--插入表单-->
           <template #formInput>
             <categories-input :sortInfo="scope.row" ref="sortRef"></categories-input>
           </template>
          </edit-modular>
          <!--删除-->
          <delete-button @confirmDeletion="deleteBtn(scope.row.cat_id)" content="删除" type="分类"></delete-button>
        </template>
      </zk-table>
      <!--分页-->
      <page
        :pagenum="queryInfo.pagenum"
        :pagesize="queryInfo.pagesize"
        :total="total"
        @sizeChange="sizeChangeHandler"
        @changSize="pagenumChangeHandler"
      ></page>
    </el-card>
  </div>
</template>

<script>
import { getCategories, deleteSort, modifySort, getParent, addSort } from '@/network/goods/categories'

// 子组件
import categoriesInput from '@/components/goods/categoriesFromInput/categoriesInput'
import addSortFrom from '@/components/goods/categoriesFromInput/addSortFrom'

export default {
  name: 'categories',
  components: {
    categoriesInput,
    addSortFrom
  },
  data () {
    return {
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name'
        },
        {
          label: '是否有效',
          type: 'template',
          template: 'isOk'
        },
        {
          label: '排序',
          type: 'template',
          template: 'sort'
        },
        {
          label: '操作',
          type: 'template',
          template: 'operation'
        }
      ],
      // Tag 标签
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
      },
      queryInfo: {
        type: [3],
        pagenum: 1,
        pagesize: 4
      },
      // 商品分类数据列表
      categoriesList: [],
      // 父级分类数据
      parentList: [],
      // 总条数
      total: null
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    // 获取商品分类数据列表
    async getList () {
      const { data, meta } = await getCategories(this.queryInfo)
      try {
        if (meta.status !== 200) {
          return this.$message.error('获取分类列表失败')
        }
        this.categoriesList = data.result
        this.total = data.total
      } catch (e) {
        this.$message.error(e)
      }
    },
    // 获取父级分类数据类表
    async getParentList () {
      const { meta, data } = await getParent()
      try {
        if (meta.status !== 200) {
          this.$message.error('获取父级分类失败')
        }
        this.parentList = data
      } catch (e) {
        this.$message.error(e)
      }
    },
    // 删除
    async deleteBtn (val) {
      const { meta } = await deleteSort(val)
      try {
        if (meta.status !== 200) {
          return this.$message.error('删除分类失败')
        }
        this.$message.success('删除分类成功')
        await this.getList()
      } catch (e) {
        this.$message.error(e)
      }
    },
    // 修改分类
    async confirmHandler (val) {
      const name = this.$refs.sortRef.sortInfo.cat_name
      const { meta } = await modifySort(val.cat_id, name)
      try {
        if (meta.status !== 200) {
          return this.$message.error('更新分类名称失败')
        }
        this.$message.success('更新分类名称成功')
      } catch (e) {
        this.$message.error(e)
      }
    },
    // 添加分类
    async confirmAddSort () {
      const info = this.$refs.addInput.sortInfo
      const { meta } = await addSort(info)
      try {
        if (meta.status !== 201) {
          return this.$message.error('添加失败')
        }
        this.$message.success('添加分类成功')
        await this.getList()
      } catch (e) {
        this.$message.error(e)
      }
    },
    // 打开弹层
    openChange () {
      this.getParentList()
    },
    // 修改每页显示
    sizeChangeHandler (val) {
      this.queryInfo.pagesize = val
      this.getList()
    },
    // 修改当前页数
    pagenumChangeHandler (val) {
      this.queryInfo.pagenum = val
      this.getList()
    },
    // tag 类型
    getTagType (val) {
      return this.tagList[val].type
    }
  }
}
</script>

<style scoped>
.btnEdit {
  margin: 0 0 20px !important;
}
</style>
