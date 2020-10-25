<template>
  <div>
    <!--面包屑-->
    <breadcrumb secondLevel="数据统计" thirdLevel="数据报表"></breadcrumb>
    <!--卡片区-->
    <el-card>
      <div id="main"></div>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
import _ from 'lodash'
import { getData } from '@/network/reports/reports'
export default {
  name: 'reports',
  data () {
    return {
      options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    }
  },
  async mounted () {
    // 初始化echarts实例
    const myChart = echarts.init(document.getElementById('main'))
    // 发送请求
    const { meta, data } = await getData()
    try {
      if (meta.status !== 200) {
        return this.$message.error(meta.msg)
      }
      // 合并
      const result = _.merge(data, this.options)
      // 展示数据
      myChart.setOption(result)
    } catch (e) {
      this.$message.error(e)
    }
  }
}
</script>

<style scoped>
#main {
  width: 800px;
  height: 400px;
}
</style>
