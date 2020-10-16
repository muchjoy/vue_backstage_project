import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'

// 引入全局css样式
import 'element-ui/lib/theme-chalk/index.css'

// 引入初始化样式
import '@/assets/css/global.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
