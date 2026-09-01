import { createRouter, createWebHistory } from 'vue-router'

import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'

const router = createRouter({
history: createWebHistory(import.meta.env.BASE_URL),

routes: [
{
path: '/workouts',
name: 'workouts',
component: DashboardView,
meta: {
requiresAuth: true,
},
},


{
  path: '/register',
  name: 'register',
  component: RegisterView,
},

{
  path: '/login',
  name: 'login',
  component: LoginView,
},


],
})

router.beforeEach((to) => {
const accessToken = localStorage.getItem('accessToken')

if (to.meta.requiresAuth && !accessToken) {
return {
name: 'login',
}
}

if (
(to.name === 'login' || to.name === 'register') &&
accessToken
) {
return {
name: 'workouts',
}
}
})

export default router
