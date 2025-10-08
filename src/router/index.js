import { createRouter, createWebHistory } from 'vue-router'
import DashBoard from '../views/dashboard.vue'
import Login from '../views/login.vue'
import Register from '../views/register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
      path: "/",
      name: "dashboard",
      component: DashBoard,
      
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      
    },],
})

export default router
