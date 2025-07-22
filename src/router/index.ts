import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import CodeBlockView from '@/views/CodeBlockView.vue'
import FlipClockView from '@/views/FlipClockView.vue'
import SignatureBoxView from '@/views/SignatureBoxView.vue'
import MockTerminalView from '@/views/MockTerminalView.vue'
import MultiSelectView from '@/views/MultiSelectView.vue'
import NewtonsCradleView from '@/views/NewtonsCradleView.vue'
import BallPitView from '@/views/BallPitView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView
    },
    {
      path: '/flip_clock',
      name: 'Flip clock',
      component: FlipClockView
    },
    {
      path: '/code_block',
      name: 'Code block',
      component: CodeBlockView
    },
    {
      path: '/signature_box',
      name: 'Signature box',
      component: SignatureBoxView
    },
    {
      path: '/mock_terminal',
      name: 'Mock terminal',
      component: MockTerminalView
    },
    {
      path: '/multi_select',
      name: 'Multi select',
      component: MultiSelectView
    },
    {
      path: '/newtons_cradle',
      name: "Newton's cradle",
      component: NewtonsCradleView
    },
    {
      path: '/ball_pit',
      name: 'Ball pit',
      component: BallPitView
    },
    {
      path: '/:pathMatch(.*)',
      name: 'Not found',
      component: MainView
    }
  ]
})

// Used in the App.vue component to determine the direction of the transition
router.afterEach((to, from) => {
  const indexTo = router.getRoutes().findIndex((route) => route.path === to.path)
  const indexFrom = router.getRoutes().findIndex((route) => route.path === from.path)

  const transition = indexTo < indexFrom ? 'slide-down' : 'slide-up'
  to.meta.transition = transition
})

export default router
