import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'

// 引入全局css样式
import 'element-ui/lib/theme-chalk/index.css'

// 引入初始化样式
import '@/assets/css/global.css'

// 注册全局组件
import breadcrumb from '@/views/breadcrumb'
import page from '@/views/page'
// 面包屑导航
Vue.component('breadcrumb', breadcrumb)
// 分页
Vue.component('page', page)

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
