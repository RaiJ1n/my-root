import { createRouter, createWebHistory } from 'vue-router'
import DashBoard from '../views/dashboard.vue'
import Login from '../views/login.vue'
import Register from '../views/register.vue'
import { useAuth } from '../store/authStore.js'
import Profile from '../views/profile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashBoard,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { requiresAuth: false },
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { requiresAuth: false },
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const { checkAuth, isAuthenticated } = useAuth()
  checkAuth()

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    return next('/login')
  }

  if ((to.name === 'login' || to.name === 'register') && isAuthenticated.value) {
    return next('/')
  }

  next()
})

export default router
