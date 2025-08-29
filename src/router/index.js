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
      path: '/studentlogin',
      name: 'studentlogin',
      component: () => import('../views/StudentLogin.vue'),
    },
    {
      path: '/studentdashboard',
      name: 'studentdashboard',
      component: () => import('../views/StudentDashbord.vue'),
    },
    {
      path: '/studentquestions',
      name: 'studentquestions',
      component: () => import('../views/StudentQuestions.vue'),
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
    {
      path: '/student',
      name: 'student',
      component: () => import('../views/Student.vue'),
    },
    {
      path: '/result',
      name: 'result',
      component: () => import('../views/Result.vue'),
    },
    {
      path: '/show-result',
      name: 'show-result',
      component: () => import('../views/ShowResult.vue'),
    }
  ],
})

export default router
