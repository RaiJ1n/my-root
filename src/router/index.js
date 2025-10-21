import { createRouter, createWebHistory } from 'vue-router'
import DashBoard from '../views/dashboard.vue'
import Login from '../views/login.vue'
import Register from '../views/register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashBoard,
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
  ],
})


router.beforeEach(async (to, from, next) => {
  await checkAuth();
//   await Todo();
  console.log(isAuthenticated.value);

  if (to.meta.requiresAuth && !isAuthenticated.value) return next("/login");

  if (
    to.name === "login" &&
    to.meta.requiresAuth === false &&
    isAuthenticated.value
  ) {
    return next("/list");
  }
  if (
    to.name === "register" &&
    to.meta.requiresAuth === false &&
    isAuthenticated.value
  ) {
    return next("/");
  }
  next();
});

export default router
