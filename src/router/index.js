import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'

Vue.use(VueRouter)

var whiteList = ['/', '/about', '/404', '/403']

const routes = [
  {
    path: '/403',
    component: () => import('@/views/403'),
    meta: {
      hiddenNavbar: true,
      hiddenFooter: true
    }
  }, {
    path: '/404',
    component: () => import('@/views/404'),
    meta: {
      hiddenNavbar: true,
      hiddenFooter: true
    }
  }, {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home'),
    meta: {
      hiddenNavbar: true,
      hiddenFooter: true
    }
  }, {
    path: '/boss/main',
    component: () => import('@/views/boss/product_flow'),
    meta: {
      roles: ['boss']
    }
  }, {
    path: '/user/main',
    component: () => import('@/views/user/publish'),
    meta: {
      roles: ['user']
    }
  }, {
    path: '/boss/center',
    component: () => import('@/views/boss/profile'),
    meta: {
      roles: ['boss']
    }
  }, {
    path: '/user/center',
    component: () => import('@/views/user/profile'),
    meta: {
      roles: ['user']
    }
  },

  { path: '/about', component: () => import('@/views/About.vue') },

  { path: '/usertest', name: 'usertest', component: () => import('@/views/Test') },
  { path: '/bosstest', name: 'bosstest', component: () => import('@/views/Test') },

  { path: '*', redirect: '/404' }
]

const router = new VueRouter({
  linkActiveClass: 'active',
  routes
})

// https://www.jianshu.com/p/986776a20352
router.beforeEach((to, from, next) => {
  if (store.state.token) { // 判断是否有token
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (!store.state.roles) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetInfo').then(() => {
          if (!to.meta.roles || to.meta.roles.indexOf(store.state.roles) > -1) {
            next(to)
          } else {
            next('/403')
          }
        })
      } else {
        next() // 当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/') // 否则全部重定向到登录页
      store.state.showLogin = true
    }
  }
})

export default router
