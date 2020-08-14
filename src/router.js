import Vue from 'vue'
import Router from 'vue-router'
import World from './views/World.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'world',
      component: World
    },
    {
      path: '/countries',
      name: 'countries',
      component: () => import('./views/Countries.vue')
    },
    {
      path: '/country/:country',
      name: 'country',
      component: () => import('./views/Country.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    }
  ]
})
