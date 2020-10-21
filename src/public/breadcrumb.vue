<template>
<!--
    需要传入:
      secondLevel: 二级
      thirdLevel: 三级
-->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{ secondLevel }}</el-breadcrumb-item>
    <el-breadcrumb-item>{{ thirdLevel }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'breadcrumb',
  props: {
    secondLevel: {
      type: String
    },
    thirdLevel: {
      type: String
    }
  }
}
</script>

<style scoped>

</style>
