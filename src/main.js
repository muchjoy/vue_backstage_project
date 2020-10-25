import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import ZkTable from 'vue-table-with-tree-grid'
// 富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

// 引入富文本编辑器css
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

// 引入全局css样式
import 'element-ui/lib/theme-chalk/index.css'

// 引入初始化样式
import '@/assets/css/global.css'

// 注册全局组件
import breadcrumb from '@/public/breadcrumb'
import page from '@/public/page'
import addDialog from '@/public/addDialog'
import EditModular from '@/public/EditModular'
import deleteButton from '@/public/deleteButton'
// 面包屑导航
Vue.component('breadcrumb', breadcrumb)
// 分页
Vue.component('page', page)
// 弹层
Vue.component('addDialog', addDialog)
// 编辑按钮功能组件
Vue.component('EditModular', EditModular)
// 删除按钮功能组件
Vue.component('deleteButton', deleteButton)

Vue.use(VueQuillEditor /* { default global options } */)

Vue.use(ElementUI)
Vue.use(ZkTable)

// 注册全局过滤器
// 格式化时间
Vue.filter('getDates', data => {
  const dt = new Date(data)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = dt.getDate()

  const hh = dt.getHours()
  const mm = dt.getMinutes()
  const ss = dt.getSeconds()

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
