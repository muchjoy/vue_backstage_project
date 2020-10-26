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
      <el-tabs type="border-card"  v-model="activeName" @tab-click="handleTabClick">
        <!--动态参数-->
        <el-tab-pane label="动态参数" name="many">
          <!--添加参数-->
          <edit-modular
            size="mini"
            content="添加参数"
            icon=""
            :disabled="isDisable"
            class="editMod"
            @ConfirmStatus="addParameter"
          >
            <template #formInput>
              <edit-input label="动态参数" ref="addInput"></edit-input>
            </template>
          </edit-modular>
          <!--动态参数 表格-->
          <el-table :data="manyDataList" border stripe >
            <!--展开列-->
            <el-table-column type="expand">
              <template slot-scope="scope">
                <!--tag 标签-->
                <el-tag
                  :key="index"
                  v-for="( item2, index ) in scope.row.attr_vals"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(index, scope.row)">
                  {{ item2 }}
                </el-tag>
                <!--动态添加tag-->
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
              </template>
            </el-table-column>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column prop="attr_name" label="参数名称"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <!--修改 editModular组件-->
                <edit-modular
                  content="修改"
                  title="修改动态参数"
                  @OpenHandler="getParameterById(scope.row.attr_id)"
                  @ConfirmStatus="editParameter(scope.row)"
                >
                  <template #formInput>
                    <edit-input label="动态参数" ref="inputData" :DataList="dataListById"></edit-input>
                  </template>
                </edit-modular>
                <!--删除 deleteButton组件-->
                <delete-button content="删除" @confirmDeletion="deteleParameter(scope.row.attr_id)"></delete-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!--静态属性-->
        <el-tab-pane label="静态属性" name="only">
          <!--添加参数-->
          <edit-modular
            size="mini"
            content="添加属性"
            icon=""
            :disabled="isDisable"
            class="editMod"
            @ConfirmStatus="addParameter"
          >
            <template #formInput>
              <edit-input label="静态属性" ref="addInput"></edit-input>
            </template>
          </edit-modular>
          <!--静态参数 表格-->
          <el-table :data="onlyDataList" border stripe >
            <!--展开列-->
            <el-table-column type="expand">
              <template slot-scope="scope">
                <!--tag 标签-->
                <el-tag
                  :key="index"
                  v-for="( item, index ) in scope.row.attr_vals"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(index, scope.row)"
                >
                  {{ item }}
                </el-tag>
                <!--动态添加tag-->
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
              </template>
            </el-table-column>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column prop="attr_name" label="参数名称"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <!--修改 editModular组件-->
                <edit-modular
                  content="修改"
                  title="修改动态参数"
                  @OpenHandler="getParameterById(scope.row.attr_id)"
                  @ConfirmStatus="editParameter(scope.row)"
                >
                  <template #formInput>
                    <edit-input label="动态参数" ref="inputData" :DataList="dataListById"></edit-input>
                  </template>
                </edit-modular>
                <!--删除 deleteButton组件-->
                <delete-button content="删除" @confirmDeletion="deteleParameter(scope.row.attr_id)"></delete-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { getCategories, getAttributes, getDataById, submitConfirm, deleteConfirm, ParameterData, manyParameterData } from '@/network/goods/params'

// 子组件
import editInput from '@/components/goods/paramsFrom/editInput'

export default {
  name: 'params',
  components: {
    editInput
  },
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
      selectedKeys: [],
      activeName: 'many',
      // 动态参数数据列表
      manyDataList: [],
      // 静态参数数据列表
      onlyDataList: [],
      inputVisible: false,
      inputValue: '',
      // 根据id获取到的参数
      dataListById: {}
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
    // 获取动态静态参数列表数据
    async getAttributesList () {
      if (this.selectedKeys.length !== 3) {
        this.selectedKeys.length = 0
        return
      }
      const { meta, data } = await getAttributes(this.cateId, this.activeName)
      try {
        if (meta.status !== 200) {
          return this.$message.error('获取参数失败')
        }
        data.forEach(item => {
          item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
          item.inputVisible = false
          item.inputValue = ''
        })
        // 判断是动态属性还是静态属性数据  attr_vals修改
        if (this.activeName === 'many') {
          this.manyDataList = data
        }
        this.onlyDataList = data
      } catch (e) {
        this.$message.error(e)
      }
    },
    // 打开编辑弹层 根据ID获取参数
    async getParameterById (val) {
      const { meta, data } = await getDataById(this.cateId, val, this.activeName)
      try {
        if (meta.status !== 200) {
          return this.$message.error(`${meta.msg}`)
        }
        this.dataListById = data
      } catch (e) {
        this.$message.error(e)
      }
    },
    // 编辑确认
    async editParameter (val) {
      // 获取表单内容
      const attrName = this.$refs.inputData.DataList.attr_name
      // 判断是否修改了参数
      if (attrName === val.attr_name) {
        return this.$message.error('修改值与原参数一样')
      }
      const info = {
        id: this.cateId,
        attrId: val.attr_id,
        attr_name: attrName,
        attr_sel: this.activeName
      }
      const { meta } = await submitConfirm(info)
      try {
        if (meta.status !== 200) {
          return this.$message.error('更新参数失败')
        }
        this.$message.success('更新参数成功')
        await this.getAttributesList()
      } catch (e) {
        this.$message.error(e)
      }
    },
    // 删除参数
    async deteleParameter (id) {
      const { meta } = await deleteConfirm(this.cateId, id)
      try {
        if (meta.status !== 200) {
          return this.$message.error('删除参数失败')
        }
        this.$message.success('删除参数成功')
      } catch (e) {
        this.$message.error(e)
      }
    },
    // 添加属性
    async addParameter () {
      const name = this.$refs.addInput.DataList.attr_name
      if (!name) {
        return this.$message.error('请添加参数')
      }
      const data = {
        id: this.cateId,
        attr_name: name,
        attr_sel: this.activeName
      }
      const { meta } = await ParameterData(data)
      try {
        if (meta.status !== 201) {
          return this.$message.error('添加参数失败')
        }
        this.$message.success('添加参数成功')
        await this.getAttributesList()
      } catch (e) {
        this.$message.error(e)
      }
    },
    // 添加动态参数
    async addParameterData (row) {
      const info = {
        id: this.cateId,
        attrId: row.attr_id,
        attr_name: row.attr_name,
        attr_sel: row.attr_sel,
        attr_vals: row.attr_vals.join(' ')
      }
      const { meta } = await manyParameterData(info)
      try {
        if (meta.status !== 200) {
          return this.$message.error('更新数据失败')
        }
        this.$message.success('更新数据成功')
      } catch (e) {
        this.$message.error(e)
      }
    },
    // 级联
    handleChange () {
      this.getAttributesList()
    },
    // 标签页切换
    handleTabClick () {
      this.getAttributesList()
    },
    // 点击打开input框
    showInput (row) {
      row.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // input框失去焦点或回车确认
    handleInputConfirm (row) {
      // 先判断是否输入
      if (row.inputValue.trim().length === 0) {
        row.inputValue = ''
        row.inputVisible = false
        return
      }
      // 有输入值
      // 将值存入 attr_vals中
      row.attr_vals.push(row.inputValue.trim())
      // 然后清空重置
      row.inputValue = ''
      row.inputVisible = false
      this.addParameterData(row)
    },
    // 删除tag
    handleClose (i, row) {
      // 删除 attr_vals中的内容
      row.attr_vals.splice(i, 1)
      // 重新渲染
    }
  },
  computed: {
    isDisable () {
      if (this.selectedKeys.length !== 3) {
        return true
      }
      return false
    },
    cateId () {
      if (this.selectedKeys.length === 3) {
        return this.selectedKeys[2]
      }
      return null
    }
  }
}
</script>

<style scoped lang="less">
.cascader {
  margin: 20px 0;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.editMod {
  margin: 0 !important;
}
</style>
