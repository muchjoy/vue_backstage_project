<template>
  <!--表单-->
  <el-form class="login_form" :model="sortInfo" :rules="sortRules" label-width="100px">
    <!--用户名-->
    <el-form-item prop="sortName" label="分类名称">
      <el-input  v-model="sortInfo.cat_name"></el-input>
    </el-form-item>
    <el-form-item label="父级分类">
      <el-cascader
        v-model="selectedKeys"
        :options="sortList"
        :props="options"
        @change="selectedChange"
        change-on-select
        clearable
      >
      </el-cascader>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'addSortFrom',
  props: {
    sortList: {
      type: Array
    }
  },
  data () {
    return {
      // 级联选择器配置对象
      options: {
        expandTrigger: 'hover',
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      // 选中父级分类数组
      selectedKeys: [],
      // 表单绑定
      sortInfo: {
        cat_pid: 0,
        cat_name: '',
        cat_level: 0
      },
      // 表单验证
      sortRules: {
        sortName: [
          { required: true, message: '分类名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    selectedChange () {
      // 判断是否选中
      if (this.selectedKeys.length > 0) {
        this.sortInfo.cat_pid = this.selectedKeys[this.selectedKeys.length - 1]
        this.sortInfo.cat_level = this.selectedKeys.length
      } else {
        this.sortInfo.cat_pid = 0
        this.sortInfo.cat_level = 0
      }
      // this.$emit('selectedHandler')
    }
  }
}
</script>

<style scoped>
.el-cascader {
  width: 100%;
}
</style>
