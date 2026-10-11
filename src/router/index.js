import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PlansView from '../views/PlansView.vue'
import SessionsView from '../views/SessionsVue.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/plans', name: 'plans', component: PlansView },
    { path: '/sessions', name: 'sessions', component: SessionsView }
  ]
})

export default router