import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Danmu from '../components/danmu.vue'

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/danmu',
    name: 'Danmu',
    component: Danmu
  }
]

const router = new VueRouter({
  routes
})

export default router
