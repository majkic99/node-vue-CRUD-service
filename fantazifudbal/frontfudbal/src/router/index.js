import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Timovi from '../views/Timovi.vue'
import Fudbaleri from '../views/Fudbaleri.vue'
import EditFudbaler from "@/views/EditFudbaler";
import EditTim from "@/views/EditTim";
import Tim from "@/views/Tim";
import Fudbaler from "@/views/Fudbaler";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/timovi',
    name: 'Timovi',
    component: Timovi
  },
  {
    path: '/fudbaleri',
    name: 'Fudbaleri',
    component: Fudbaleri
  },
  {
    path: '/editTim',
    name: 'EditTim',
    component: EditTim
  },
  {
    path: '/editFudbaler',
    name: 'EditFudbaler',
    component: EditFudbaler
  },
  {
    path: '/timovi/:id',
    name: 'timovi',
    component: Tim
  },
  {
    path: '/fudbaleri/:id',
    name: 'fudbaleri',
    component: Fudbaler
  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
