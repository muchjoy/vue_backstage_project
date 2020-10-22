import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由懒加载
const login = () => import('@/components/login')
const home = () => import('@/components/Home')
const welcome = () => import('@/components/Welcome')
const users = () => import('@/components/user')
const rights = () => import('@/components/power/rights')
const roles = () => import('@/components/power/roles')
const goods = () => import('@/components/goods')
const params = () => import('@/components/params')
const categories = () => import('@/components/categories')

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/home',
    component: home,
    name: 'home',
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        component: welcome
      },
      {
        path: '/users',
        name: 'users',
        component: users
      },
      {
        path: '/rights',
        name: 'rights',
        component: rights
      },
      {
        path: '/roles',
        name: 'roles',
        component: roles
      },
      {
        path: '/goods',
        name: 'goods',
        component: goods
      },
      {
        path: '/params',
        name: 'params',
        component: params
      },
      {
        path: '/categories',
        name: 'categories',
        component: categories
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
