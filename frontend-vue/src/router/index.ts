import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// Views
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
// później dodamy:
// import RecoverPasswordView from '../views/RecoverPasswordView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView,
  },
  {
  path: '/recover-password',
  name: 'recover-password',
  component: () => import('../views/RecoverPasswordView.vue'),
  },
  {
  path: '/reset-password',
  name: 'reset-password',
  component: () => import('../views/ResetPasswordView.vue'),
 },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
