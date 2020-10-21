import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'

// 引入全局css样式
import 'element-ui/lib/theme-chalk/index.css'

// 引入初始化样式
import '@/assets/css/global.css'

// 注册全局组件
import breadcrumb from '@/public/breadcrumb'
import page from '@/public/page'
import addDialog from '@/public/addDialog'
import EditModular from '@/public/EditModular'
// 面包屑导航
Vue.component('breadcrumb', breadcrumb)
// 分页
Vue.component('page', page)
// 弹层
Vue.component('addDialog', addDialog)
// 编辑按钮功能组件
Vue.component('EditModular', EditModular)

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
