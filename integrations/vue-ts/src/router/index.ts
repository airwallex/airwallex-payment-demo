import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/card',
      name: 'card',
      component: () => import('../components/card.vue'),
    },
    {
      path: '/hpp',
      name: 'hpp',
      component: () => import('../components/hpp.vue'),
    },
    {
      path: '/drop-in',
      name: 'dropIn',
      component: () => import('../components/dropIn.vue'),
    },
    {
      path: '/split-card',
      name: 'splitCard',
      component: () => import('../components/splitCard.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'instructions',
      component: () => import('../components/instructions.vue'),
    },
  ],
})

export default router
