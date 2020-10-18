import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由懒加载
const login = () => import('@/components/login')
const home = () => import('@/components/Home')
const welcome = () => import('@/components/Welcome')
const users = () => import('@/components/user')

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/home',
    component: home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: welcome
      },
      {
        path: '/users',
        component: users
      }
    ]
  }
]

const router = new VueRouter({
  // 可以通过mode 指定当前工程的访问 默认 hash 可以指定 history
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const sToken = window.sessionStorage.getItem('token')
  if (!sToken) return next('/login')
  next()
})

export default router
