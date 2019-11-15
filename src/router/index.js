import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Index'
import TestAxios from '../components/test/TestAxios'
import TestVuex from '../components/test/TestVuex'
import Goods from '../components/goods/Goods'
import Seller from '../components/seller/Seller'
import Ratings from '../components/ratings/Ratings'
import TestIcon from '../components/test/TestIcon'
// eslint-disable-next-line no-new
new Vue({
  methods: {
    getData () {
      this.$store.dispatch('getDataAction')
    }
  }
})

Vue.use(Router)
const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/testAxios',
    name: 'TestAxios',
    component: TestAxios
  },
  {
    path: '/testVuex',
    name: 'TestVuex',
    component: TestVuex
  },
  {
    path: '/testIcon',
    name: 'TestIcon',
    component: TestIcon
  },
  {
    path: '/goods',
    name: 'Goods',
    component: Goods
  },
  {
    // path: '/seller/:id',
    path: '/seller',
    name: 'Seller',
    component: Seller
  },
  {
    path: '/ratings',
    name: 'Ratings',
    component: Ratings
  }
]
const router = new Router({
  mode: 'history',
  routes: routes,
  linkActiveClass: 'active'
})
export default router
