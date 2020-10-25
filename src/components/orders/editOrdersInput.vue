<template>
  <!--表单-->
  <el-form class="login_form" :model="addressInfo" :rules="addressRules" label-width="80px">
    <!--用户名-->
    <el-form-item prop="address" label="省市区/县">
      <el-cascader
        v-model="value"
        :options="options"
        :props="{ expandTrigger: 'hover' }"
        @change="handleChange"></el-cascader>
    </el-form-item>
    <el-form-item prop="detailedAddress" label="详细地址">
      <el-input  v-model="addressInfo.detailedAddress"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'editOrdersInput',
  data () {
    return {
      addressInfo: {
        address: [],
        detailedAddress: ''
      },
      addressRules: {
        address: [
          { required: true, message: '地址', trigger: 'blur' }
        ],
        detailedAddress: [
          { required: true, message: '角色描述', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleChange () {
      console.log(this.addressInfo.address)
    }
  }
}
</script>

<style scoped>

</style>
