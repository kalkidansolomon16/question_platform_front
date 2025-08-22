import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    
    {
      path: '/about',
      name: 'about',
  
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/',
      name: 'login',
      component: () => import('../views/Login.vue'),
    },
      {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/StudentSignup.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminDashbord.vue'),
    },
    {
      path: '/questions',
      name: 'questions',
      component: () => import('../views/Questions.vue'),
    },
  ],
})

export default router
