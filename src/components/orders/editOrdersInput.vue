<template>
  <!--表单-->
  <el-form class="login_form" :model="addressInfo" :rules="addressRules" label-width="100px">
    <!--用户名-->
    <el-form-item prop="address" label="省市区/县">
      <el-cascader
        :options="citydata"
        :props="{ expandTrigger: 'hover' }"
        @change="handleChange"></el-cascader>
    </el-form-item>
    <el-form-item prop="detailedAddress" label="详细地址">
      <el-input  v-model="addressInfo.detailedAddress"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import citydata from './citydata'

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
      },
      citydata
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
.el-cascader {
  width: 100%;
}
</style>
