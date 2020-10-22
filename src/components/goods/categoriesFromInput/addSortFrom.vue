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
        clearable change-on-select
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
      selectedKeys: [],
      sortInfo: {
        cat_name: ''
      },
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
      console.log(this.selectedKeys)
      this.$emit('selectedHandler')
    }
  }
}
</script>

<style scoped>

</style>
