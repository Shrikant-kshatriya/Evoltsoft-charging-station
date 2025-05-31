import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue';
import Dashboard from '@/views/Dashboard.vue';
import Map from '@/views/Map.vue';
import Register from '@/views/Register.vue';
import Home from '@/views/Home.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/map',
      name: 'map',
      component: Map,
    } 
  ],
})

export default router
